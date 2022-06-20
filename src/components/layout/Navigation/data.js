import { ArchiveSVG, ClipboardSVG, DirectorySVG, FlaskSVG, HomeSVG, SettingSVG, TextSVG } from 'components/atoms/Icons';

export const navigationMap = [
  {
    label: 'Home',
    url: '/home',
    icon: HomeSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    isFirst: true,
    labelShift: '-5px'
  },
  {
    label: 'Experiment',
    url: '/experiment',
    icon: FlaskSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    labelShift: '-35px'
  },
  {
    label: 'Generator',
    url: '/generator',
    icon: TextSVG,
    props: {
      transform: 'scale(0.4) translate(-7,25)',
      text: '</>'
    },
    labelShift: '-30px'
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: SettingSVG,
    isAtBottom: true,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    isLast: true,
    labelShift: '-15px'
  }
];
