import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Page from './Page';

const pathname = '/home';
const ZERO = 0;
const defaultProps = {
  sidePanelContent: 'test-sidepanelcontent',
  children: <div>content</div>,
  footerComponent: <div>footer</div>
};

describe('Page', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Page, defaultProps, {}, pathname);

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByText('footer')).toBeInTheDocument();
  });

  it('checks sidepanel does not show', () => {
    reduxTestWrapper(Page, { children: 'content'}, {}, pathname);

    expect(screen.queryByText('(|)')).not.toBeInTheDocument();
  });

  it('checks side panel', () => {
    reduxTestWrapper(Page, defaultProps, {}, pathname);

    expect(screen.queryByText(defaultProps.sidePanelContent)).not.toBeInTheDocument();

    const sidePanelButton = screen.getByText('(|)');
    fireEvent.click(sidePanelButton);

    expect(screen.getByText(defaultProps.sidePanelContent)).toBeInTheDocument();

    fireEvent.click(sidePanelButton);

    expect(screen.queryByText(defaultProps.sidePanelContent)).not.toBeInTheDocument();
  });
});