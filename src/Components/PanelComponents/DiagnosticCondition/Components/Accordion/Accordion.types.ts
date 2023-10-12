import { MouseEventHandler } from 'react';

export interface AccordionProps {
  children: any;
  title: string;
  machineIcon: any;
  humanIcon: any;
  description: string;
  onAccordionTitleClicked: MouseEventHandler;
  onHumanIconClick: Function;
  openAccordion: boolean;
  setAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  onThreeDotMenuSelect: () => void;
}
