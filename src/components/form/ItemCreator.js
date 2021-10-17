import React, { useEffect, useState } from 'react';
import { IconButton } from 'components/button';
import Text from 'components/form/Text';
import { ICON_TYPES, ICON_SIZES } from 'constants/icon';

const ItemCreator = ({ data, placeholder, onChange }) => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div>
      {items.map(val => {
        return(
          <div key={val} className="flex--horizontal">
            <label className="item-creator__label">{val}</label>
            <IconButton
              type={ICON_TYPES.MINUS}
              size={ICON_SIZES.EXTRA_SMALL}
              onClick={() => {
                const filteredItems = items.filter(i => i !== val);
                setItems(filteredItems);
                onChange(filteredItems);
              }}
            />
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
        {currentItem && <IconButton
          type={ICON_TYPES.PLUS}
          size={ICON_SIZES.EXTRA_SMALL}
          onClick={() => {
            const updatedItems = items.concat(currentItem);
            setItems(updatedItems);
            setCurrentItem('');
            onChange(updatedItems);
          }}
        />}
      </div>
    </div>
  );
};

export default ItemCreator;
