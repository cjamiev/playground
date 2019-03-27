import React from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

import messages from './messages';
import { appLocales } from '../i18n';
import { changeLocale } from '../actions/localeActions';

const Footer = React.memo((props) => {
  const content = appLocales.map(value => (
    <option key={value} value={value}>{value}</option>
  ));

  return (
    <footer className="page-footer font-small pt-4">
      <div className="footer-copyright text-center py-3">
        © 2019 Copyright: React Boilerplate
        <a href="https://reactjs.org/docs/getting-started.html"> Doc </a>
        <p>
          <FormattedMessage {...messages.startProjectMessage} />
        </p>
        <select value={props.locale} onChange={props.onLocaleToggle}>
          {content}
        </select>
      </div>
    </footer>
  );
});

const mapStateToProps = state => {
  return {
    locale: state.language.locale
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);