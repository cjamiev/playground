import { HomeSVG } from 'components/icons/HomeSVG';
import { ClipboardSVG } from 'components/icons/ClipboardSVG';
import { ArchiveSVG } from 'components/icons/ArchiveSVG';
import { FlaskSVG } from 'components/icons/FlaskSVG';
import { LinkSVG } from 'components/icons/LinkSVG';
import { DirectorySVG } from 'components/icons/DirectorySVG';
import { SettingSVG } from 'components/icons/SettingSVG';
import { TextSVG } from 'components/icons/TextSVG';

export const navigationMap = [
  {
    label: 'Home',
    url: '/home',
    icon: HomeSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'File',
    url: '/file',
    icon: ArchiveSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Clipboard',
    url: '/clipboard',
    icon: ClipboardSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Generator',
    url: '/generator',
    icon: TextSVG,
    props: {
      transform: 'scale(0.4) translate(-5,21)',
      text: '</>'
    }
  },
  {
    label: 'Experiment',
    url: '/experiment',
    icon: FlaskSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Mock Server',
    url: '/mockserver',
    icon: LinkSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Project',
    url: '/project',
    icon: DirectorySVG,
    isAtBottom: true,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  },
  {
    label: 'Settings',
    url: '/config',
    icon: SettingSVG,
    isAtBottom: true,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    }
  }
];