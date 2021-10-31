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

const NAV_ITEMS = Object.values(ROUTES);
const ONE_SECOND = 1000;
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
    const navItemClass =
      currentUrl === item.url || (history.location.pathname === '/' && item.url === ROUTES.HOME.url)
        ? 'navigation__links-item navigation__links-item--active'
        : 'navigation__links-item';
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

    return (
      <div key={item.url} className={navItemClass} onClick={handleClick}>
        {item.label}
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
      <div className="navigation__links">{renderNavItems}</div>
      <div>
        <Dropdown
          classNames={DROPDOWN_CLASSNAMES}
          label="Commands"
          values={commands.map(item => ({ label: item.label, value: item.value, selected: false }))}
          onChange={({ values }) => {
            const selected = values.find(item => item.selected);

            dispatch(executeCommand(selected.value));
          }}
        />
      </div>
      <div>
        <Dropdown
          classNames={DROPDOWN_CLASSNAMES}
          label="Links"
          values={links.map(item => ({ label: item.label, value: item.value, selected: false }))}
          onChange={({ values }) => {
            const selected = values.find(item => item.selected);

            window.open(selected.value, '_blank');
          }}
        />
      </div>
    </nav>
  );
});

export default Navigation;
