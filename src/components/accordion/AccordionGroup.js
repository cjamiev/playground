import React, { useState } from 'react';
import './accordion.css';

const ZERO = 0;
const ONE = 1;

export const AccordionGroup = React.memo(({ data }) => {
  const [collapsedList, setCollapsedList] = useState(Array.from({length: data.length}, (v, i) => true) );

  const toggle = (i) => {
    const updatedCollapsedList = collapsedList.map((item, index) => {
      if(index === i) {
        return !item;
      }

      return true;
    });
    setCollapsedList(updatedCollapsedList);
  };

  const accordions = data.map((item, index) => {
    const isTop = index === ZERO;
    const isBottom = data.length === index + ONE;
    const isCollapsed = collapsedList[index];
    const labelClass = isTop ? 'accordion__label accordion__label--top' : isBottom && isCollapsed ? 'accordion__label accordion__label--bottom' : 'accordion__label';
    const contentClass = isBottom ? 'accordion__content accordion__content--bottom' : 'accordion__content';

    return (
      <div key={`accordion-item-${item.label}-${index}`}className="accordion">
        <div className={labelClass} onClick={() => { toggle(index); }}>{item.label}</div>
        {!isCollapsed && <div className={contentClass}>{item.content}</div>}
      </div>
    );
  });

  return (<div className='accordion-group'>{accordions}</div>);
});