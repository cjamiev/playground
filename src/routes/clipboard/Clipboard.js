import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClipboard } from './clipboardActions';
import { createAlert } from 'components/alert/alertActions';
import { openGlobalModal } from 'components/modal/globalModalActions';
import Page from 'components/layout';
import List from 'components/list';
import Tabs from 'components/tabs';
import Text from 'components/form/Text';
import ComponentWrapper from 'components/ComponentWrapper';
import { ClipboardForm } from 'components/clipboardform';
import './clipboard.css';

const ZERO = 0;

const ClipboardTab = (props) => {
  return (
    <div className="clipboard__container">
      {props.clip.map(entry => {
        return <List key={entry.title} header={entry.title} data={entry.data} />;
      })}
    </div>
  );
};

const Clipboard = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const { clipboard, error } = useSelector(state => state.clipboard);
  const result = useSelector(state => state.list.commandResponse);
  const TABS = Object.keys(clipboard).map(filename => {
    const name = filename.split('.')[ZERO];

    return { title: name, component: ComponentWrapper(ClipboardTab,{ clip:clipboard[name] })};
  });
  const memoizedData = useMemo(() => {
    const data = [];

    Object.keys(clipboard).forEach(filename => {
      const name = filename.split('.')[ZERO];
      const tab = clipboard[name];
      const sectionData = tab.map(item => item.data);
      sectionData.forEach(entry => {
        entry.forEach(item => data.push(item));
      });
    });

    return data;
  }, [clipboard]);

  useEffect(() => {
    dispatch(loadClipboard());
  }, [dispatch]);

  useEffect(() => {
    if(result) {
      dispatch(openGlobalModal({ title: 'Command Results', message: result }));
    }
  }, [dispatch, result]);

  useEffect(() => {
    if(error.message) {
      dispatch(createAlert({ content: error.message, status: 'error' }));
    }
  }, [dispatch, error.message]);

  const handleFilterChange = ({ selected }) => {
    setFilter(selected);
  };

  const filteredData = memoizedData.length > ZERO && memoizedData.filter(entry => {
    return entry.some(item => {
      return item.label.toUpperCase().includes(filter.toUpperCase());
    });
  });

  return (
    <Page sidePanelContent={<ClipboardForm clipboard={clipboard} />} isSidePanelWide={true}>
      <Text placeholder='Filter' selected={filter} onChange={handleFilterChange} />
      {TABS.length > ZERO && !filter && <Tabs data={TABS} />}
      {filter && <List header={`filtered by ${filter}`} data={filteredData || []} />}
    </Page>
  );
};

export default Clipboard;
