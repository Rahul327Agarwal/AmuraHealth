import { CircularProgress, Tooltip } from '@mui/material';
import { CompletedIcon, DeleteIcon, ErrorIcon, PictureIcon, RemoveIcon, RightFrontIcon } from './DragAndUploadFile.svg';
import { useStyles } from './DragAndUploadFile.styles';
import { PreviewProps } from './DragAndUploadFile.types';

const endIcon = (status, classes, progress) => {
  switch (status) {
    case 'LOADING':
      return (
        <span className={classes.loaderDiv}>
          <CircularProgress variant="determinate" value={progress} />
          <span className={classes.progressLabel}>{progress}%</span>
        </span>
      );
    case 'COMPLETED':
      return <CompletedIcon />;
    case 'ERROR':
      return (
        <Tooltip title="Only images are allowed." arrow>
          <ErrorIcon />
        </Tooltip>
      );
    case 'OK':
      return <RemoveIcon />;
    case 'TRY_AGAIN':
      return `Try Again ${(<RightFrontIcon />)}`;
    case 'DELETE':
      return <DeleteIcon />;
  }
};

export default function PreviewImage(props: PreviewProps) {
  const { files, setFiles, progress, status } = props;
  const { classes } = useStyles();

  const handleClick = (index, status) => {
    switch (status) {
      case 'LOADING':
        break;
      case 'COMPLETED':
        break;
      case 'ERROR':
        break;
      case 'OK':
      case 'DELETE':
        const temp = [...files];
        temp.splice(index, 1);
        setFiles(temp);
        break;
      case 'TRY_AGAIN':
        break;
    }
  };

  return (
    <>
      {files.length
        ? files?.map((data, index) => (
            <div className={classes.previewBox} key={index}>
              <span className={`${classes.icons} ${classes.pictureIcon}`}>
                <PictureIcon />
              </span>
              <span className={classes.imageName}>{data?.file?.name || data?.name}</span>
              <span className={classes.iconEnd} onClick={() => handleClick(index, status || data?.status)}>
                {endIcon(status || data?.status, classes, progress)}
              </span>
            </div>
          ))
        : null}
    </>
  );
}
