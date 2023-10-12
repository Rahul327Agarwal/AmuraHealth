import { PMS_LOCALE } from '../../../../Utils';
import { AddIcon, FileIcon, subDeleteIcon } from '../ReportEntry.svg';
import { downloadFile } from './ReportAttachments.functions';
import { useStyles } from './ReportAttachments.styles';
import { IProps } from './ReportAttachments.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ReportAttachments(props: IProps) {
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const { fileList, reportId, sessions } = props;
  const fileListCmp = fileList?.length
    ? fileList.map((item) => {
        return (
          <div key={item.name} className={classes.fileContainer}>
            <div className={classes.margingForIcon}>{<FileIcon />}</div>
            <div
              id={`submit${item.name}`}
              data-testid="DownLoadFile"
              className={classes.fileTitile}
              title={item.name}
              onClick={() => downloadFile(panelId, item, sessions)}
            >
              {PMS_LOCALE.translate(item.name)}
            </div>
            <div onClick={() => props.deleteFile(item.name)} className={`${props.editReport ? classes.displayNone : ''}`}>
              {subDeleteIcon}
            </div>
          </div>
        );
      })
    : '';

  return (
    <div>
      {reportId ? (
        <div className={`${classes.uploadedReports} ${classes.marginTop30px}`}>
          <div className={classes.uploadedLabel}>{PMS_LOCALE.translate('Uploaded Reports')}</div>
          <div onClick={props.handleOpen} className={`${!props.editReport ? classes.displayNone : ''}`}>
            <AddIcon className={classes.addIcon} />
          </div>
        </div>
      ) : (
        ''
      )}

      {fileList.length ? (
        <div key="List" className={classes.fileStore}>
          {fileListCmp}
        </div>
      ) : (
        <div className={classes.emptyContainer} title="No reports uploaded">
          {PMS_LOCALE.translate('No reports uploaded')}
        </div>
      )}
    </div>
  );
}
