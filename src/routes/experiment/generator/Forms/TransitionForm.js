import React, { useEffect, useState } from 'react';
import Text from 'components/form/Text';
import Button from 'components/atoms/Button';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { TRANSITION_TIMING_FUNCTION } from 'constants/css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

const TransitionForm = ({ style, onChange }) => {
  const [transitionAttributes, setTransitionAttributes] = useState('');
  const [currentTransition, setCurrentTransition] = useState({});
  const transitionValues = transitionAttributes
    ? transitionAttributes.split(',').map((entry) => {
      const properties = entry.trim().split(' ');
      const value = {
        property: properties[ZERO],
        duration: properties[ONE],
        timingFunction: properties[TWO],
        delay: properties[THREE]
      };

      return { label: value.property, value, selected: false };
    })
    : [];

  useEffect(() => {
    setTransitionAttributes(style.transition);
  }, [style.transition]);

  return (
    <>
      <div className="flex--horizontal">
        <Dropdown
          label="Edit"
          values={transitionValues}
          onChange={({ values }) => {
            const matched = values.find((item) => item.selected).value;

            setCurrentTransition(matched);
          }}
        />
        <Dropdown
          label="Remove"
          values={transitionValues}
          onChange={({ values }) => {
            const updatedTransition = values
              .filter((item) => !item.selected)
              .map((item) => {
                return `${item.value.property} ${item.value.duration} ${item.value.timingFunction} ${item.value.delay}`;
              })
              .join(', ');

            onChange({ id: 'transition', selected: updatedTransition });
          }}
        />
      </div>
      <div className="form-grid">
        <Text
          label="Property"
          selected={currentTransition.property}
          onChange={({ selected }) => {
            setCurrentTransition({ ...currentTransition, property: selected });
          }}
        />
        <Text
          label="Duration"
          selected={currentTransition.duration}
          onChange={({ selected }) => {
            setCurrentTransition({ ...currentTransition, duration: selected });
          }}
        />
        <Dropdown
          label="Timing Function"
          values={TRANSITION_TIMING_FUNCTION.map((item) =>
            (item.label === currentTransition.timingFunction ? { ...item, selected: true } : item)
          )}
          onChange={({ values }) => {
            const matched = values.find((item) => item.selected);

            setCurrentTransition({ ...currentTransition, timingFunction: matched.label });
          }}
        />
        <Text
          label="Delay"
          selected={currentTransition.delay}
          onChange={({ selected }) => {
            setCurrentTransition({ ...currentTransition, delay: selected });
          }}
        />
      </div>
      <Button
        label="Add"
        isPrimary
        onClick={() => {
          if (
            currentTransition.property &&
            currentTransition.timingFunction &&
            currentTransition.delay &&
            currentTransition.duration
          ) {
            const filteredTransitionValues = transitionValues.filter(
              (entry) => entry.label !== currentTransition.property
            );
            const updatedTransitionValues = filteredTransitionValues
              .map((entry) => entry.value)
              .concat([currentTransition]);
            const updatedTransition = updatedTransitionValues
              .map((entry) => {
                return `${entry.property} ${entry.duration} ${entry.timingFunction} ${entry.delay}`;
              })
              .join(', ');

            onChange({ id: 'transition', selected: updatedTransition });
            setCurrentTransition({});
          }
        }}
      />
    </>
  );
};

export default TransitionForm;
