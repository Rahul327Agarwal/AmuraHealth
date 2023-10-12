import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  headerWrap: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    background: '#FFFFFF',
    padding: '16px 16px',
    '& .swiper ': {
      width: '100%',
      padding: '0 25px',
    },
    '& .swiper-button-next:after, .swiper-button-prev:after': {
      fontSize: '20px',
    },
    '& .swiper-button-prev': {
      color: '#5C5A61',
      top: '12px',
      left: '0',
    },
    '& .swiper-button-next': {
      color: '#5C5A61',
      top: '12px',
      right: '0',
    },
  },
  activeCircle: {
    position: 'relative',
    '&::after': {
      margin: '0 auto',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      borderBottom: '5px solid #A6A6A6',
      content: "''",
      position: 'absolute',
      display: 'block',
      bottom: '0px',
    },
  },
  semiactiveCircle: {
    position: 'relative',
    '&::after': {
      margin: '0 auto',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      borderBottom: '5px solid #E1E1E1',
      content: "''",
      position: 'absolute',
      display: 'block',
      bottom: '0px',
    },
  },
  active: {
    position: 'relative',
    '&::after': {
      margin: '0 auto',
      width: '12px',
      height: '3px',
      borderRadius: '12px',
      borderBottom: '3px solid #A6A6A6',
      content: "''",
      position: 'absolute',
      display: 'block',
      bottom: '0px',
    },
  },
  semiactive: {
    position: 'relative',
    '&::after': {
      margin: '0 auto',
      width: '12px',
      height: '3px',
      borderRadius: '12px',
      borderBottom: '3px solid #E1E1E1',
      content: "''",
      position: 'absolute',
      display: 'block',
      bottom: '0px',
    },
  },

  passive: {},
  slide: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: 'auto',
    width: 'min-content',
    '& svg': {
      height: '27px',
      width: '27px',
      paddingBottom: '5px',
    },
  },
  // semiactive: {
  //   position: 'relative',
  //   '&::after': {
  //     margin: '0 auto',
  //     width: '12px',
  //     borderBottom: '3px solid #E1E1E1',
  //     content: "''",
  //     position: 'absolute',
  //     display: 'block',
  //     bottom: '0px',
  //   },
  // },
}));
