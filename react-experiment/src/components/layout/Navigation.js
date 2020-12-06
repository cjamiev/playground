import React from 'react';

export const Navigation = ({ routes }) => {
  const renderRoutes = routes.map((item) => {
    return (
      <li>
        <a href={item.href}>item.label</a>
      </li>
    );
  });

  return <ul>{renderRoutes}</ul>;
};
