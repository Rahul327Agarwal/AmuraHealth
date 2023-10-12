import { makeStyles } from 'tss-react/mui';
import { IProps } from './GrabSwiper.types';

interface IStyle extends IProps {
  isDragging: boolean;
  backgroundColor?: string;
  paddingHorizontal?: number;
  isLeftEnd?: boolean;
  isRightEnd?: boolean;
}

export const useStyles = makeStyles<IStyle>()((_, props) => {
  return {
    root: { display: 'flex', alignItems: 'center', gap: '10px', width: '100%' },

    arrow: { cursor: 'pointer' },
    swiperContainer: {
      paddingTop: props.paddingHorizontal ?? '0px',
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      overflow: 'auto',
      scrollBehavior: props.isDragging ? 'auto' : 'smooth',
      cursor: props.isDragging ? 'grabbing' : 'grab',
      background: props.backgroundColor ?? 'transparent',
      flexGrow: 1,

      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    slide: {
      width: 'fit-content',

      pointerEvents: props.isDragging ? 'none' : 'auto',
      display: 'flex',
      gap: props.gap ? props.gap : '10px',

      userSelect: 'none',
    },

    navigationIcon: {
      cursor: 'pointer',
    },
    navigationLeft: {
      opacity: props.isLeftEnd ? 0.3 : 1,
      pointerEvents: props.isLeftEnd ? 'none' : 'auto',
    },
    navigationRight: {
      opacity: props.isRightEnd ? 0.3 : 1,
      pointerEvents: props.isRightEnd ? 'none' : 'auto',
    },
  };
});
