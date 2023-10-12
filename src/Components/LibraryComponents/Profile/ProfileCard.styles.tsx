import { makeStyles } from 'tss-react/mui';
import { IProps } from './ProfileCard.types';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme) => ({
  profileWrap: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.colors.system.white,
    padding: '15px',
  },
  profilePic: {
    height: '52px',
    width: '52px',
    borderRadius: '50%',
    background: 'red',
    margin: '0px 14px 0px 0px',
  },
  profileContent: {
    width: '76%',
  },
  nameWrap: {
    marginBottom: '4px',
  },
  profileName: {
    color: theme.palette.colors.gray[900],
    display: 'inline-block',
    marginRight: '17px',
  },
  ratingIcon: {
    marginRight: '5px',
  },
  ratingValue: {},
  radioBtnWrap: {
    width: '15%',
  },
  profileContentWrap: {
    display: 'flex',
    width: '83%',
    justifyContent: 'space-between',
    paddingTop: '6px',
  },
}));
