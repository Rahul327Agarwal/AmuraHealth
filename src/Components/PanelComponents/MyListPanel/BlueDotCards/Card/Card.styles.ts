import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<any>()((theme, { isBorderRadius, isSelected }) => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: isSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    flexDirection: 'column',
    borderBottom: '2px solid #fff',
    cursor: 'pointer',
    borderRadius: isBorderRadius ? '8px' : '0px',
    '& *': { boxSizing: 'border-box' },
    position: 'relative',
    // padding: '12px 20px',
  },

  nameContainerHead: {
    display: 'grid',
    gridTemplateColumns: 'auto 22px',
    alignItems: 'center',
    marginBottom: '8px',
    gap: '10',
  },
  nameConatinerHeadMenu: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
  },
  textStyle: {
    color: theme.palette.colors.gray[500],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '&.textEnd': {
      textAlign: 'end',
    },
  },
  userNametext: {
    color: theme.palette.colors.gray[900],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    flex: 1,
  },

  timeLineWrapperExtended: {
    // height: '20px',
  },
  detailsContainer: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    height: '56px',
    // marginBottom: '12px',
    width: 'inherit',
  },
  createdCon: {
    display: 'grid',
    flexDirection: 'column',
  },
  madeCon: {
    display: 'grid',
    flexDirection: 'column',
  },
}));
