import React from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/atoms/Button';
import { noop } from 'utils/noop';

const WizardSection = ({ title, content, buttonList = [] }) => {
  const renderButtons = buttonList.map((item) => {
    if (item.label) {
      return (
        <Button
          key={item.label}
          label={item.label}
          {...item.classProps}
          onClick={() => {
            item.action();
          }}
        />
      );
    }

    return null;
  });

  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>{content}</div>
      <div>{renderButtons}</div>
    </div>
  );
};

export default WizardSection;
