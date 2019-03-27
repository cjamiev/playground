import React from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

import messages from './messages';
import { appLocales } from '../i18n';
import { changeLocale } from '../actions/localeActions';

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

const mapStateToProps = state => {
  return {
    locale: state.language.get('locale')
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
)(Sandbox);
