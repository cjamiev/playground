import React from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import messages from './messages';
import { appLocales } from '../i18n';
import { changeLocale } from '../containers/LanguageProvider/actions';
import { makeSelectLocale } from '../containers/LanguageProvider/selectors';

export class Sandbox extends React.PureComponent {
  render() {
    const content = appLocales.map(value => (
      <option key={value} value={value}>{value}</option>
    ));

    return (
      <>
        <p>
          <FormattedMessage {...messages.startProjectMessage} />
        </p>
        <select value={this.props.locale} onChange={this.props.onLocaleToggle}>
          {content}
        </select>
      </>
    );
  }
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sandbox);
