import React, { useEffect, useState } from 'react';
import Text from 'components/form/Text';
import { PlusSVG } from 'components/icons/PlusSVG';
import { MinusSVG } from 'components/icons/MinusSVG';

const ItemCreator = ({ data, placeholder, onChange }) => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div>
      {items.map((val) => {
        return (
          <div key={val} className="flex--horizontal">
            <label className="item-creator__label">{val}</label>
            <svg
              aria-label="Remove Item"
              width="20"
              height="20"
              viewBox="0 0 53 53"
              onClick={() => {
                const filteredItems = items.filter((i) => i !== val);
                setItems(filteredItems);
                onChange(filteredItems);
              }}
            >
              <MinusSVG />
            </svg>
          </div>
        );
      })}
      <div className="flex--horizontal">
        <Text
          placeholder={placeholder}
          selected={currentItem}
          onChange={({ selected }) => {
            setCurrentItem(selected);
          }}
        />
        {currentItem && (
          <svg
            aria-label="Add Item"
            width="20"
            height="20"
            viewBox="0 0 53 53"
            onClick={() => {
              const updatedItems = items.concat(currentItem);
              setItems(updatedItems);
              setCurrentItem('');
              onChange(updatedItems);
            }}
          >
            <PlusSVG />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ItemCreator;
