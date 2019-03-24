import React from 'react';

const Footer = React.memo(() => {
  return (
    <footer className="page-footer font-small pt-4">
      <div className="footer-copyright text-center py-3">
        © 2019 Copyright: React Boilerplate
        <a href="https://reactjs.org/docs/getting-started.html"> Doc </a>
      </div>
    </footer>
  );
});

export default Footer;