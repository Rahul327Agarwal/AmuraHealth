import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
    radioStyle: {
        color: theme.palette.colors.gray[500],
        '&.Mui-checked': {
            color: theme.palette.colors.gray[900],
         }
     },
     formControlActive: {
        "& .MuiFormControlLabel-root": {
            margin: "8px",
        },
         "& .MuiTypography-root": {
           color: `${theme.palette.colors.gray[900]} !important`,
           marginLeft: "24px",
           fontFamily: "Graphik !important",
           fontSize: "15px",
           lineHeight: "20px",
           fontWeight: 400,
           fontStyle: "normal",
        }
     },
     formControl: {
        "& .MuiFormControlLabel-root": {
            margin: "8px",
        },
         "& .MuiTypography-root": {
           color: `${theme.palette.colors.gray[500]} !important`,
           marginLeft: "24px",
           fontFamily: "Graphik !important",
           fontSize: "15px",
           lineHeight: "20px",
           fontWeight: 400,
           fontStyle: "normal",
         }
     },
   }));
 