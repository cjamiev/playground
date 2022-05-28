import React from 'react';
import { useDispatch } from 'react-redux';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Button from 'components/button';
import { parseObject, isJSONString } from 'type-check';

const TWO = 2;

const JsonOperations = ({ content, onChange }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex--vertical">
      <h3> JSON </h3>
      <Button
        label="Validate"
        onClick={() => {
          dispatch(dismissAlert());
          const isValid = isJSONString(content);
          if (isValid) {
            onChange(JSON.stringify(JSON.parse(content), undefined, TWO));
          }
          const message = isValid ? 'Valid' : 'NOT Valid';
          const status = isValid ? 'success' : 'error';
          dispatch(createAlert({ content: message, status }));
        }}
      />
      <Button
        label="Stringify"
        onClick={() => {
          onChange(
            JSON.stringify(content)
              .replace(/\\n/g, '')
              .replace(/"/g, '\'')
              .replace(/\\'/g, '"')
              .replace(/\w+:/g, (matched) => {
                return `"${matched.replace(':', '')}":`;
              })
          );
        }}
      />
      <Button
        label="Parse"
        onClick={() => {
          const parsed = parseObject(content.replace(/\"/g, '\\"').replace(/\'/g, '"'));
          if (parsed) {
            onChange(parsed);
          }
        }}
      />
      <Button
        label="Object"
        onClick={() => {
          const result = content
            .replace(/['|"]{/g, '{')
            .replace(/}['|"]/g, '}')
            .replace(/["]\w+["]:/g, (matched) => {
              return matched.replace(/["]/g, '');
            });
          onChange(result);
        }}
      />
    </div>
  );
};

export default JsonOperations;
