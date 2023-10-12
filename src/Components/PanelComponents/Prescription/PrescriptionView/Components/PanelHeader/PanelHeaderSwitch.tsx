import CustomSwitch from '../CustomSwitch';
import Header from './PanelHeader';
interface IProps {
  title: string;
  isActive: boolean;
  isActiveChange: Function;
  loadingFlag?: boolean;
}
export default function PanelHeaderSwitch(props: IProps) {
  return (
    <Header
      title={props.title}
      loadingFlag={props.loadingFlag}
      iconTray={
        <div style={{ paddingTop: '-6px' }}>
          <CustomSwitch isActive={props.isActive} isActiveChange={props.isActiveChange} />
        </div>
      }
    />
  );
}
