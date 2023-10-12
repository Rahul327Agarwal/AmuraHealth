import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  main: {
    padding: '32px',
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  logo: {
    margin: '32px 0px',
  },
  patientDiv: {
    marginBottom: '32px',
  },
  patientName: {
    fontSize: '28px',
    fontWeight: 700,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  issuedOn: {
    fontSize: '20px',
    fontWeight: 600,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  serialNumber: {
    fontSize: '16px',
    fontWeight: 600,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  issuedOnDiv: {
    marginBottom: '32px',
  },
  linksDiv: {
    display: 'grid',
    gridGap: '32px',
    '@media (min-width: 800px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    },
  },
  linkTitle: {
    fontSize: '20px',
    fontWeight: 600,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  linkSubTitle: {
    fontSize: '18px',
    fontWeight: 400,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  advantageTitle: {
    fontSize: '16px',
    fontWeight: 600,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  advantageSubTitle: {
    fontSize: '16px',
    fontWeight: 400,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  linkTitleDiv: {
    marginBottom: '16px',
  },
  advantageDiv: {
    marginBottom: '16px',
    '@media (min-width: 800px)': {
      minHeight: '64px',
    },
  },
  downloadInfo: {
    fontSize: '16px',
    fontWeight: 400,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  actualLink: {
    '&:hover': {
      textDecoration: 'underline',
    },
    fontSize: '16px',
    fontWeight: 400,
    //fontfamily: "Inter",
    color: '#0464ff',
    lineHeight: '1.25',
    cursor: 'pointer',
  },
  actualLinkSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
  downloadInfoDiv: {
    marginBottom: '8px',
  },
  linkSubTitleDesc: {
    fontSize: '16px',
    fontWeight: 600,
    //fontfamily: "Inter",
    color: '#000000',
    lineHeight: '1.25',
  },
}));
