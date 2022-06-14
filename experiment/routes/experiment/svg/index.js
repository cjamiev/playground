import { ArchiveSVG } from './ArchiveSVG';
import { ArrowCircleSVG } from './ArrowCircleSVG';
import { BellSVG } from './BellSVG';
import { BlockSVG } from './BlockSVG';
import { BoardSVG } from './BoardSVG';
import { CalculatorSVG } from './CalculatorSVG';
import { CalendarClockSVG } from './CalendarClockSVG';
import { CaretSVG } from './CaretSVG';
import { CheckMarkSVG } from './CheckMarkSVG';
import { CircleSVG } from './CircleSVG';
import { ClipboardSVG } from './ClipboardSVG';
import { ClockSVG } from './ClockSVG';
import { CloseSVG } from './CloseSVG';
import { CodeBraceSVG } from './CodeBraceSVG';
import { ControllerSVG } from './ControllerSVG';
import { CopyFileSVG } from './CopyFileSVG';
import { DataSVG } from './DataSVG';
import { DiceSVG } from './DiceSVG';
import { DirectorySVG } from './DirectorySVG';
import { DownArrowSVG } from './DownArrowSVG';
import { DownloadSVG } from './DownloadSVG';
import { ExitSVG } from './ExitSVG';
import { EyeSVG } from './EyeSVG';
import { FileSVG } from './FileSVG';
import { FlaskSVG } from './FlaskSVG';
import { GraphSVG } from './GraphSVG';
import { GridSVG } from './GridSVG';
import { HeartBeatSVG } from './HeartBeatSVG';
import { HomeSVG } from './HomeSVG';
import { ImageSVG } from './ImageSVG';
import { InfoSVG } from './InfoSVG';
import { LinkSVG } from './LinkSVG';
import { LockSVG } from './LockSVG';
import { MinusSVG } from './MinusSVG';
import { MoonSVG } from './MoonSVG';
import { PauseSVG } from './PauseSVG';
import { PenSVG } from './PenSVG';
import { PlaySVG } from './PlaySVG';
import { PlusSVG } from './PlusSVG';
import { PowerSwitchSVG } from './PowerSwitchSVG';
import { ProfileSVG } from './ProfileSVG';
import { RefreshSVG } from './RefreshSVG';
import { SaveSVG } from './SaveSVG';
import { SearchSVG } from './SearchSVG';
import { SettingSVG } from './SettingSVG';
import { SoundSVG } from './SoundSVG';
import { StarSVG } from './StarSVG';
import { StopSVG } from './StopSVG';
import { SunSVG } from './SunSVG';
import { TextSVG } from './TextSVG';
import { ToggleSVG } from './ToggleSVG';
import { TrashSVG } from './TrashSVG';
import { TriangleSVG } from './TriangleSVG';
import { TripleSVG } from './TripleSVG';
import { TripleDotSVG } from './TripleDotSVG';

const svgMap = {
  Archive: ArchiveSVG,
  ArrowCircle: ArrowCircleSVG,
  Bell: BellSVG,
  Block: BlockSVG,
  Board: BoardSVG,
  Calculator: CalculatorSVG,
  CalendarClock: CalendarClockSVG,
  Caret: CaretSVG,
  CheckMark: CheckMarkSVG,
  Circle: CircleSVG,
  Clipboard: ClipboardSVG,
  Clock: ClockSVG,
  Close: CloseSVG,
  CodeBrace: CodeBraceSVG,
  Controller: ControllerSVG,
  CopyFile: CopyFileSVG,
  Data: DataSVG,
  Dice: DiceSVG,
  Directory: DirectorySVG,
  DownArrow: DownArrowSVG,
  Download: DownloadSVG,
  Exit: ExitSVG,
  Eye: EyeSVG,
  File: FileSVG,
  Flask: FlaskSVG,
  Graph: GraphSVG,
  Grid: GridSVG,
  HeartBeat: HeartBeatSVG,
  Home: HomeSVG,
  Image: ImageSVG,
  Info: InfoSVG,
  Link: LinkSVG,
  Lock: LockSVG,
  Minus: MinusSVG,
  Moon: MoonSVG,
  Pause: PauseSVG,
  Pen: PenSVG,
  Play: PlaySVG,
  Plus: PlusSVG,
  PowerSwitch: PowerSwitchSVG,
  Profile: ProfileSVG,
  Refresh: RefreshSVG,
  Save: SaveSVG,
  Search: SearchSVG,
  Setting: SettingSVG,
  Sound: SoundSVG,
  Star: StarSVG,
  Stop: StopSVG,
  Sun: SunSVG,
  Text: TextSVG,
  Toggle: ToggleSVG,
  Trash: TrashSVG,
  Triangle: TriangleSVG,
  Triple: TripleSVG,
  TripleDot: TripleDotSVG
};

const entryMapper = (entry) => {
  return {
    ...entry,
    subcomponents: entry.subcomponents ? entry.subcomponents.map((item) => entryMapper(item)) : [],
    component: svgMap[entry.component]
  };
};

const svgDataMapper = (data) => {
  return data.map((entry) => entryMapper(entry));
};

export default svgDataMapper;
