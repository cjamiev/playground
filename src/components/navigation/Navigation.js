import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  closeSidePanel,
  closeGlobalModal,
  hideLoadingModal,
  executeCommand
} from 'components/global/globalActions';
import { dismissAlert } from 'components/alert/alertActions';
import { ROUTES } from 'constants/routes';
import { getFormattedClock, getFormattedDate } from 'clock';
import Dropdown from 'components/form/Dropdown';
import HomeIcon from './HomeIcon';
import FileIcon from './FileIcon';
import FlaskIcon from './FlaskIcon';
import DataIcon from './DataIcon';
import DirectoryIcon from './DirectoryIcon';
import CodeIcon from './CodeIcon';
import ConnectionIcon from './ConnectionIcon';
import SettingsIcon from './SettingsIcon';

const NAV_ITEMS = Object.values(ROUTES);
const ONE_SECOND = 1000;
const iconMap = {
  'Home': HomeIcon,
  'File': FileIcon,
  'Clipboard': DataIcon,
  'Generator': CodeIcon,
  'Experiment': FlaskIcon,
  'Project': DirectoryIcon,
  'Mock Server': ConnectionIcon,
  'Config': SettingsIcon
};
const DROPDOWN_CLASSNAMES = {
  container: 'navigation__dropdown-container',
  label: 'navigation__dropdown-label',
  content: 'navigation__dropdown-content',
  item: 'navigation__dropdown-item'
};

const Navigation = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentUrl, setCurrentUrl] = useState(history.location.pathname);
  const [clock, setClock] = useState(getFormattedClock());
  const { commands, links } = useSelector(state => state.config);

  const renderNavItems = NAV_ITEMS.map((item) => {
    const isActiveItem = currentUrl === item.url || (history.location.pathname === '/' && item.url === ROUTES.HOME.url);
    const iconClass = isActiveItem ? 'navigation__icon--active navigation__icon' : 'navigation__icon';
    const handleClick = () => {
      if (currentUrl !== item.url) {
        history.push(item.url);
        setCurrentUrl(item.url);
        dispatch(closeGlobalModal());
        dispatch(hideLoadingModal());
        dispatch(dismissAlert());
        dispatch(closeSidePanel());
      }
    };

    const IconSVG = iconMap[item.label];

    return (
      <div key={item.url} onClick={handleClick} className="navigation__links-item">
        <svg
          aria-label={`${item.label} Page`}
          className={iconClass}
          width="53"
          height="53"
          viewBox="0 0 53 53">
          <IconSVG />
        </svg>
      </div>
    );
  });

  setInterval(() => {
    setClock(getFormattedClock());
  }, ONE_SECOND);

  return (
    <nav className="navigation">
      <div className="navigation__time">
        <span className="navigation__time_label">{clock}</span>
        <span className="navigation__time_label">{getFormattedDate().date}</span>
        <span className="navigation__time_label">{getFormattedDate().week}</span>
      </div>
      <div className="navigation__quick-ops">
        {commands.length ? <div>
          <Dropdown
            classNames={DROPDOWN_CLASSNAMES}
            label="Commands"
            values={commands.map(item => ({ label: item.label, value: item.value, selected: false }))}
            onChange={({ values }) => {
              const selected = values.find(item => item.selected);

              dispatch(executeCommand(selected.value));
            }}
          />
        </div> : <></>}
        {links.length ? <div>
          <Dropdown
            classNames={DROPDOWN_CLASSNAMES}
            label="Links"
            values={links.map(item => ({ label: item.label, value: item.value, selected: false }))}
            onChange={({ values }) => {
              const selected = values.find(item => item.selected);

              window.open(selected.value, '_blank');
            }}
          />
        </div> : <></>}
      </div>
      <div className="navigation__links">{renderNavItems}</div>
    </nav>
  );
});

export default Navigation;
