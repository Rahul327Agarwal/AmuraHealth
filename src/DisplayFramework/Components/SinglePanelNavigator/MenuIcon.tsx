import { IPanelId } from '../../Core/DFCore.types';
import { ChatIcon, DashboardIcon, HomeIcon, SummaryIcon, RecipeIconDark } from '../Icons/Icons';

export const panelIconsMap: Record<IPanelId, React.ReactNode> = {
  C: <ChatIcon />,
  D: <DashboardIcon />,
  H: <HomeIcon />,
  M: undefined,
  R: <RecipeIconDark inheritFill />,
  S: <SummaryIcon />,
  T: undefined,
  W: undefined,
};

export const SinglePanelViewNavigatorIcon = (props: { children: React.ReactNode; isSelected?: boolean; disabled?: boolean }) => (
  <div
    style={{
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.disabled ? 'transparent' : props.isSelected ? '#E9E8E8' : 'white',
      borderRadius: '50%',
      position: 'relative',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      opacity: props.disabled ? 0.5 : 1,
      transition: 'all 0.2s',
      fill: '#5C5A61',
    }}
  >
    {props.children}
  </div>
);
