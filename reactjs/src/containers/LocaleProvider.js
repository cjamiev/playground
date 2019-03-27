import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from '../i18n';

export class LocaleProvider extends React.PureComponent {
  render() {
    return (
      <IntlProvider
        locale={this.props.locale || DEFAULT_LOCALE}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children || null)}
      </IntlProvider>
    );
  }
}

LocaleProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

const mapStateToProps = state => {
  return {
    locale: state.language.locale
  };
};

export default connect(mapStateToProps)(LocaleProvider);
