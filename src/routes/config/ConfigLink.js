import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import { Table } from './ConfigTable';
import Button from 'components/button';
import Text from 'components/form/Text';
import { TrashSVG } from 'components/icons/TrashSVG';
import {
  SCTableCell,
  SCTableCellIcon,
  SCTableCellSvg,
  SCTableCellText
} from './styles';

const linkTableHeaders = [
  { label: 'Link' },
  { label: 'Description' },
  { label: 'Action' }
];

const ConfigLink = ({globalLinks, configLinks, onChange}) => {
  const dispatch = useDispatch();
  const [newLink, setNewLink] = useState({ label: '', value: ''});
  const [linkConfiguration, setLinkConfiguration] = useState([]);

  useEffect(() => {
    setLinkConfiguration(configLinks);
  },[configLinks]);

  const renderLinkCells = () => {
    return linkConfiguration.map(linkItem => {
      return (
        <tr key={linkItem.id}>
          <SCTableCell isFirstCell>
            <SCTableCellText>
              <Text
                placeholder={linkItem.value}
                selected={linkItem.value}
                onChange={({ selected }) => {
                  const updatedLinkConfig = linkConfiguration.map(item => {
                    if(item.id === linkItem.id) {
                      return {
                        ...item,
                        value: selected
                      };
                    }

                    return item;
                  });

                  setLinkConfiguration(updatedLinkConfig);
                }}
              />
            </SCTableCellText>
          </SCTableCell>
          <SCTableCell>
            <SCTableCellText>
              <Text
                placeholder={linkItem.label}
                selected={linkItem.label}
                onChange={({ selected }) => {
                  const updatedLinkConfig = linkConfiguration.map(item => {
                    if(item.id === linkItem.id) {
                      return {
                        ...item,
                        label: selected
                      };
                    }

                    return item;
                  });

                  setLinkConfiguration(updatedLinkConfig);
                }}
              />
            </SCTableCellText>
          </SCTableCell>
          <SCTableCellIcon>
            <SCTableCellSvg
              aria-label='Delete'
              width="45"
              height="53"
              viewBox="0 0 53 53">
              <TrashSVG
                transform={'scale(0.6) translate(35,-2)'}
                onClick={() => {
                  const updatedLinkConfig = linkConfiguration.filter(item => item.value !== linkItem.value);

                  onChange(updatedLinkConfig);
                }} />
            </SCTableCellSvg>
          </SCTableCellIcon>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Links </h2>
      <div>
        <Table
          headers={linkTableHeaders}
          body={renderLinkCells(global.links)}
        />
        <Button
          classColor="primary"
          label="Update Links"
          onClick={() => {
            onChange(linkConfiguration);
          }}
        />
        <Text
          placeholder='Link'
          selected={newLink.value}
          onChange={({ selected }) => {
            setNewLink({ label: newLink.label, value: selected});
          }}
        />
        <Text
          placeholder='Description'
          selected={newLink.label}
          onChange={({ selected }) => {
            setNewLink({ label: selected, value: newLink.value, id: linkConfiguration.length});
          }}
        />
        <Button
          classColor="primary"
          label="Add Link"
          onClick={() => {
            if(newLink.label && newLink.value) {
              const updatedLinks = [newLink].concat(linkConfiguration);

              setNewLink({ label: '', value: ''});
              onChange(updatedLinks);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ConfigLink;
