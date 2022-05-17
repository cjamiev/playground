import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { executeCommand } from 'components/global/globalActions';
import { SCFooter, SCFooterBtnGroup, SCFooterBtn, SCFooterList, SCFooterListBtn } from './styles';
import { copyToClipboard } from 'helper/copy';

const ZERO = 0;

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
  const dispatch = useDispatch();
  const [mode, setMode] = useState('');

  const showCommands = () => setMode('c');
  const showLinks = () => setMode('l');
  const showPaste = () => setMode('p');
  const close = () => setMode('');

  return <SCFooter>
    <SCFooterBtnGroup>
      <SCFooterBtn onClick={showCommands}>C</SCFooterBtn>
      <SCFooterBtn onClick={showLinks}>L</SCFooterBtn>
      <SCFooterBtn onClick={showPaste}>P</SCFooterBtn>
      <SCFooterBtn onClick={close}>x</SCFooterBtn>
    </SCFooterBtnGroup>
    <SCFooterList isCommandsVisible={mode !== ''}>
      <FooterList mode={mode} />
    </SCFooterList>
  </SCFooter>;
};

export default PageFooter;
