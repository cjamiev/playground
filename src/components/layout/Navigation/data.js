import {
  ArchiveSVG,
  CardSVG,
  ClipboardSVG,
  DirectorySVG,
  DropdownSVG,
  FlaskSVG,
  FormSVG,
  HomeSVG,
  ListSVG,
  SettingSVG,
  TableSVG,
  TextSVG
} from 'components/atoms/Icons';

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
    label: 'Table',
    url: '/table',
    icon: TableSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    labelShift: '-5px'
  },
  {
    label: 'Card',
    url: '/card',
    icon: CardSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    labelShift: '0px'
  },
  {
    label: 'List',
    url: '/list',
    icon: ListSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    labelShift: '5px'
  },
  {
    label: 'Dropdown',
    url: '/dropdown',
    icon: DropdownSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    labelShift: '-30px'
  },
  {
    label: 'Form',
    url: '/form',
    icon: FormSVG,
    props: {
      transform: 'scale(0.6) translate(6,6)'
    },
    labelShift: '-2px'
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
