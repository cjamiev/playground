import './displaycode.css';
import { copyToClipboard } from '../../../utils/copy';

/*
*  Main Div:
*   mk-background: #2e2e2e;
*  Span colors:
*   mk-comments: #797979
*   mk-white: #d6d6d6
*   mk-yellow: #e5b567
*   mk-orange: #e87d3e
*   mk-green: #b4d273
*   mk-purple: #9e86c8
*   mk-red: #b05279
*   mk-blue: #6c99bb  
*  First Span Indent:
*   indent-1 (up to 7)
*  Line Div:
*   line
*/

const DisplayCode = ({ children, content = 'no content' }) => {
  return (
    <div className='mk-background'>
      <button className='copy-btn' onClick={() => { copyToClipboard(content) }}>Copy</button>
      <code>
        {children}
      </code>
    </div>
  );
};

export default DisplayCode;
