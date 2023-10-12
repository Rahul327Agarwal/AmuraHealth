import { ThreeDotActionMenuOption } from '../../ThreeDotActionMenu/ThreeDotActionMenu.types';

export interface IProps {
  imageURL?: string;
  name?: string;
  username?: string;
  userId?: string;
  mainDescription?: string;
  setAction?: Function;
  noThreeDot?: boolean;
  postType?: string;
  totalPost?: string;
  threeDotOptions?: Array<ThreeDotActionMenuOption>;
  handleThreeDotAction?: Function;
  invisibleKeys?: Array<string>;
  handleCardClick?: any;
  borderColor?: Array<any>;
}
