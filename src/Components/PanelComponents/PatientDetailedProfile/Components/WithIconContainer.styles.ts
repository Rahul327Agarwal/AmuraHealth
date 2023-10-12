import { makeStyles } from 'tss-react/mui';
import { IWithIconContainerProps } from './WithIconContainer.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IWithIconContainerProps>()(
  (theme, { rowGap, columnGap, alignStart, alignEnd, iconMarginTop, Label, iconTranslateY, noStartingGap }) => ({
    iconContainerBox: {
      display: noStartingGap ? null : 'grid',
      rowGap: rowGap || '24px',
      columnGap: columnGap || '5px',
      alignItems: alignStart ? 'flex-start' : alignEnd ? 'flex-end' : 'center',
      gridTemplateColumns: '30px 1fr',
      // alignItems: 'end',
    },

    iconWrapper: {
      marginTop: iconMarginTop ? iconMarginTop : '',
      transform: `translateY(${iconTranslateY ?? '0px'})`,
    },
    iconChildrenBox: {
      gridArea: Label ? '2/2' : '1/2',
      display: 'grid',
      gridAutoFlow: 'column',
      gap: '30px',
      alignItems: 'start',
    },
    iconStyle: {
      marginBottom: '5px',
    },

    primaryText: {
      color: '#A6A6A6',
    },
  })
);
