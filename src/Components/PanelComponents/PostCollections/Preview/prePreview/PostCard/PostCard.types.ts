import { ThreeDotActionMenuOption } from '../../../ThreeDotActionMenu/ThreeDotActionMenu.types';

export interface IProps {
  profilePic?: any;
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
  handlecardClick?: Function;
  toggled?: boolean;
  postId?: string;
  maindata?: any;
  disableKebabMenu?: boolean;
  setDisableKebabMenu?: Function;
}
