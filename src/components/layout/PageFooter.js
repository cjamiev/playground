import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCommand } from 'components/global/globalActions';
import { SCFooter, SCFooterBtnGroup, SCFooterBtn, SCFooterList, SCFooterListBtn } from './styles';
import { copyToClipboard } from 'helper/copy';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { StarSVG } from 'components/icons/StarSVG';
import { CopyFileSVG } from 'components/icons/CopyFileSVG';
import { PlaySVG } from 'components/icons/PlaySVG';

const FooterList = ({mode}) => {
  const { commands, links, paste } = useSelector(state => state.config);

  if(mode === 'c') {
    return <>{commands.map((item, index) => {
      return (
        <SCFooterListBtn
          key={item.label}
          onClick={() => { dispatch(executeCommand(item.value));}}
        >
          {item.label}
        </SCFooterListBtn>
      );
    })}</>;
  }
  if(mode === 'l') {
    return <>{links.map((item, index) => {
      return (
        <SCFooterListBtn
          key={item.label}
          onClick={() => { window.open(item.value, '_blank');}}
        >
          {item.label}
        </SCFooterListBtn>
      );
    })}</>;
  }
  if(mode === 'p') {
    return <>{paste.map((item, index) => {
      return (
        <SCFooterListBtn
          key={item.label}
          onClick={() => { copyToClipboard(item.value);}}
        >
          {item.label}
        </SCFooterListBtn>
      );
    })}</>;
  } else {
    return null;
  }
};

const PageFooter = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [mode, setMode] = useState('');
  useOnClickOutside(ref, () => setMode(''));

  const showCommands = () => setMode('c');
  const showLinks = () => setMode('l');
  const showPaste = () => setMode('p');

  return <SCFooter ref={ref}>
    <SCFooterBtnGroup>
      <SCFooterBtn isActive={mode === 'c'} onClick={showCommands}>
        <svg
          aria-label='Commands'
          width="45"
          height="53"
          viewBox="0 0 53 53">
          <PlaySVG transform='scale(0.7) translate(10,6)'/>
          <PlaySVG transform='scale(0.7) translate(20,6)'/>
        </svg>
      </SCFooterBtn>
      <SCFooterBtn isActive={mode === 'l'} onClick={showLinks}>
        <svg
          aria-label='Favorite Links'
          width="45"
          height="53"
          viewBox="0 0 53 53">
          <StarSVG transform='scale(0.7) translate(10,6)'/>
        </svg>
      </SCFooterBtn>
      <SCFooterBtn isActive={mode === 'p'} onClick={showPaste}>
        <svg
          aria-label='Copy and Paste'
          width="45"
          height="53"
          viewBox="0 0 53 53">
          <CopyFileSVG transform='scale(0.7) translate(10,6)'/>
        </svg>
      </SCFooterBtn>
    </SCFooterBtnGroup>
    <SCFooterList isVisible={mode !== ''}>
      <FooterList mode={mode} />
    </SCFooterList>
  </SCFooter>;
};

export default PageFooter;
