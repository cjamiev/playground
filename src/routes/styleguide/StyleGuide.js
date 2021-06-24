import React, { useState } from 'react';

import Page from 'components/layout';

const StyleGuide = () => {
  const [error, setError] = useState('');

  return (
    <Page title={'CSS Style Guide'} error={error}>
      <div>
        <h2> Buttons </h2>
        <button className="btn btn--primary">Primary Button</button>
        <button className="btn btn--secondary">Secondary Button</button>
      </div>

      <div>
        <h2> Checkbox Buttons </h2>
        <div className="input-field-group input-field-group--vertical">
          <div className="input-field">
            <input id="checkbox1" className="input-field__item" type="checkbox" value=""/>
            <label htmlFor="checkbox1" className="input-field__label"> Checkbox1 </label>
          </div>
          <div className="input-field">
            <input id="checkbox2" className="input-field__item" type="checkbox" value=""/>
            <label htmlFor="checkbox2" className="input-field__label"> Checkbox2 </label>
          </div>
        </div>
      </div>

      <div>
        <h2> Radio Button </h2>
        <div className="input-field-group input-field-group--vertical">
          <div className="input-field">
            <input id="radio1" className="input-field__item" name="radiogroup" type="radio" value=""/>
            <label htmlFor="radio1" className="input-field__label"> Radio1 </label>
          </div>
          <div className="input-field">
            <input id="radio2" className="input-field__item" name="radiogroup" type="radio" value=""/>
            <label htmlFor="radio2" className="input-field__label"> Radio2 </label>
          </div>
        </div>
      </div>

      <div>
        <h2> Links </h2>
        <a className="link" href="https://www.facebook.com/" target="_blank">Facebook</a>
      </div>

      <div>
        <h2> List </h2>
        <div className="list">
          <div className="list__header">Header</div>
          <div className="list__content"> Item 1 </div>
          <div className="list__content">
            <span>Item 2</span>
            <span>Item 21</span>
            <span>Item 22</span>
          </div>
          <div className="list__content list__content--vertical">
            <span>Item 3</span>
            <span>Item 31</span>
            <span>Item 32</span>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default StyleGuide;
