import React from 'react';
import Page from 'components/layout';
import Dropdown from 'components/Dropdown';
import List from 'components/list';

const testData = [
  [
    {
      'type': 'link',
      'label': 'cjamiev/playground ',
      'value': 'https://github.com/cjamiev/playground'
    },
    {
      'type': 'text',
      'value': 'testing123'
    }
  ],
  [
    {
      'type': 'copy',
      'label': 'username',
      'value': 'cjamiev1836'
    }
  ],
  [
    {
      'type': 'timer',
      'label': '35rd Birthday',
      'value': 'March 18, 2023'
    }
  ]
];

const StyleGuide = () => {

  return (
    <Page>
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
        <List header='test header' data={testData} />
      </div>

      <div>
        <h2> Dynamically shown content </h2>
        <div className="tooltip">Hover over me
          <span className="tooltip__text tooltip__text--top">Tooltip text</span>
        </div>

        <br/>

        <Dropdown label='Dropdown' data={[{ value:'item1'}, { value:'item2'}]} />

      </div>
    </Page>
  );
};

export default StyleGuide;
