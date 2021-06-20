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
        <div class="input-field-group input-field-group--vertical">
          <div class="input-field">
            <input id="checkbox1" class="input-field__item" type="checkbox" value=""/>
            <label for="checkbox1" class="input-field__label"> Checkbox1 </label>
          </div>
          <div class="input-field">
            <input id="checkbox2" class="input-field__item" type="checkbox" value=""/>
            <label for="checkbox2" class="input-field__label"> Checkbox2 </label>
          </div>
        </div>
      </div>

      <div>
        <h2> Radio Button </h2>
        <div class="input-field-group input-field-group--vertical">
          <div class="input-field">
            <input id="radio1" class="input-field__item" name="radiogroup" type="radio" value=""/>
            <label for="radio1" class="input-field__label"> Radio1 </label>
          </div>
          <div class="input-field">
            <input id="radio2" class="input-field__item" name="radiogroup" type="radio" value=""/>
            <label for="radio2" class="input-field__label"> Radio2 </label>
          </div>
        </div>
      </div>

      <div>
        <h2> Links </h2>
        <a class="link" href="https://www.facebook.com/" target="_blank">Facebook</a>
      </div>
    </Page>
  );
};

export default StyleGuide;
