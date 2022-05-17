import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateConfig } from './configActions';
import Table from 'components/table';
import Button, { IconButton } from 'components/button';
import Text from 'components/form/Text';
import { ICON_TYPES } from 'constants/icon';

const linkTableHeaders = [
  { label: 'Link', className: 'flex--four' },
  { label: 'Description', className: 'flex--two' },
  { label: 'Action', className: 'flex--one'}
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
        <tr key={linkItem.value} className="flex--horizontal">
          <td className="flex--four">{linkItem.value}</td>
          <td className="flex--two">
            <Text
              placeholder={linkItem.label}
              selected={linkItem.label}
              onChange={({ selected }) => {
                const updatedLinkConfig = linkConfiguration.map(item => {
                  if(item.value === linkItem.value) {
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
          </td>
          <td className="flex--one">
            <IconButton type={ICON_TYPES.TRASH} onClick={() => {
              const updatedLinkConfig = linkConfiguration.filter(item => item.value !== linkItem.value);

              onChange(updatedLinkConfig);
            }} />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2> Link Configuration </h2>
      <div className="container--center">
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
            setNewLink({ label: selected, value: newLink.value});
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
