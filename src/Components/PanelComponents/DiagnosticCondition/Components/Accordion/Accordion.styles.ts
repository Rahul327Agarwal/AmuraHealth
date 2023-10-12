import { makeStyles } from 'tss-react/mui';
import { STYLES } from '../../DiagnosticCondition.utils';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  accordionContainer: {
    background: '#F8F8F8',
    borderRadius: '8px',
    padding: `${STYLES.accorXPadding}px`,
    '& .header': {
      display: 'grid',
      gridGap: `${STYLES.accorGap}px`,
      gridTemplateColumns: `${STYLES.accorIconWidth}px auto`,
      marginBottom: '10px',
    },
    '& .arrowIcon': {
      display: 'flex',
      cursor: 'pointer',
      //marginTop: '6px',
      '& svg': {
        transition: '.3s ease',
      },
      '&.rotate svg': {
        transform: 'rotate(180deg)',
      },
    },
    '& .headerBox': {
      width: '100%',
      '& .contentBox': {
        display: 'flex',
        //alignItems: 'center',
        gap: '15px',
        width: '100%',
        marginBottom: '12px',
        '& .title': {
          flexGrow: 1,
          color: '#252427',
          cursor: 'pointer',
        },
        '& .diagnosticIcon, & .diagnosticIcon, & .tripledotIcon': {
          cursor: 'pointer',
        },
        '& .disableCursorStyle': {
          cursor: 'unset !important',
        },
      },
      '& .description': {
        wordBreak: 'break-word',
        color: '#5C5A61',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        cursor: 'pointer',
      },
    },
    '& .childrenBody': {
      display: 'grid',
      gridGap: `${STYLES.accorGap}px`,
      gridTemplateColumns: `${STYLES.accorIconWidth}px auto`,
    },
    '& .bottomBox': {
      padding: '15px',
      '& .bottomQuestion': {
        fontSize: '15px',
        color: '#252427',
        marginBottom: '15px',
      },
      '& .buttonWrapper': {
        width: 'max-content',
        display: 'inline-block',
        marginBottom: '20px',
      },
    },
    '& .bottomContentBox': {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      width: 'calc(100% + 1px)',
      marginTop: '30px',
      '& .title': {
        flexGrow: 1,
        color: '#252427',
      },
      '& .diagnosticIcon, & .diagnosticIcon': {
        cursor: 'pointer',
      },
    },
  },
  linebarBox: {
    width: '100%',
    height: '4px',
    display: 'flex',
    '& .barlength': {
      height: 'inherit',
      display: 'inline-block',
      position: 'relative',
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '6px',
        height: '6px',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#5C5A61',
        borderRadius: '50%',
        zIndex: 1,
      },
      '&:last-child': {
        '&::after': {
          content: "''",
          position: 'absolute',
          width: '6px',
          height: '6px',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#5C5A61',
          borderRadius: '50%',
          zIndex: 1,
        },
      },
    },
  },
}));
