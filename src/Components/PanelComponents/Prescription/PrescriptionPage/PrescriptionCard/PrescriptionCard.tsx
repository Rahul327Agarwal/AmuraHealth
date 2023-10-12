import React from 'react';
import { getFileNameFromAttachmentURL } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';
import { useStyles } from '../PrescriptionPage.styles';
import { getFile } from './PrescriptionCard.functions';
import { IProps } from './PrescriptionCard.types';

export default function PrescriptionCard(props: IProps) {
  const { title, subTitle, advantages, links, patientName } = props;
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.linkTitleDiv}>
        <div>
          <span className={classes.linkTitle}>{title}</span>
        </div>
        {subTitle && (
          <div>
            <span className={classes.linkSubTitle}>{subTitle}</span>
          </div>
        )}
      </div>
      {advantages && (
        <div className={classes.advantageDiv}>
          <span className={classes.advantageTitle}> {'Advantages: '}</span>
          <span className={classes.advantageSubTitle}>{advantages}</span>
        </div>
      )}
      <div className={classes.downloadInfo}>
        <span className={classes.downloadInfo}>{'You can click on the links below to download the prescription, etc.'}</span>
      </div>
      <div>
        <ul>
          {links.map((link, index) => {
            return (
              <li key={link.link}>
                <div>
                  <div>
                    <span className={classes.linkSubTitleDesc}>{link.title}</span>
                    <span className={classes.actualLinkSubtitle}>{` - `}</span>
                    <span
                      className={classes.actualLink}
                      onClick={async () => {
                        const w = window.open('', '_blank');
                        let url: any = await getFile(
                          `${import.meta.env.VITE_DOWNLOAD_PRESCRIPTIONS_PAGE}?key=pms-ql-prescription/${link.link}`,
                          `${patientName.trim().replace(' ', '-')}-${link.downloadTitle}-${getFileNameFromAttachmentURL(
                            link.link,
                            true,
                            true
                          )}`,
                          'GET_BLOB_URL'
                        );
                        w.location = url;
                        return {};
                      }}
                    >
                      {`View `}
                    </span>
                    <span className={classes.actualLinkSubtitle}>|</span>
                    <span
                      className={classes.actualLink}
                      onClick={async () => {
                        let url: any = await getFile(
                          `${import.meta.env.VITE_DOWNLOAD_PRESCRIPTIONS_PAGE}?key=pms-ql-prescription/${link.link}`,
                          `${patientName.trim().replace(' ', '-')}-${link.downloadTitle}-${getFileNameFromAttachmentURL(
                            link.link,
                            true,
                            true
                          )}`,
                          'GET_BLOB_URL'
                        );
                        let linkObj = document.createElement('a');
                        linkObj.style.display = 'none';
                        linkObj.href = url;
                        linkObj.setAttribute(
                          'download',
                          '' +
                            `${patientName.trim().replace(' ', '-')}-${link.downloadTitle}-${getFileNameFromAttachmentURL(
                              link.link,
                              true,
                              true
                            )}`
                        );
                        document.body.appendChild(linkObj);
                        linkObj.click();
                        linkObj.remove();
                        return {};
                      }}
                    >
                      {` Download`}
                    </span>
                  </div>
                  <div>
                    <span className={classes.actualLinkSubtitle}>{link.subTitle}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <div>
              <div>
                <span
                  className={classes.actualLink}
                  onClick={async () => {
                    for (const element of links) {
                      let w = window.open('', '_blank');
                      let url: any = await getFile(
                        `${import.meta.env.VITE_DOWNLOAD_PRESCRIPTIONS_PAGE}?key=pms-ql-prescription/${element.link}`,
                        `${patientName.trim().replace(' ', '-')}-${element.downloadTitle}-${getFileNameFromAttachmentURL(
                          element.link,
                          true,
                          true
                        )}`,
                        'GET_BLOB_URL'
                      );
                      w.location = url;
                    }
                  }}
                >
                  {'View all '}
                </span>
                <span className={classes.actualLinkSubtitle}>|</span>
                <span
                  className={classes.actualLink}
                  onClick={() => {
                    links.forEach((link) => {
                      getFile(
                        `${import.meta.env.VITE_DOWNLOAD_PRESCRIPTIONS_PAGE}?key=pms-ql-prescription/${link.link}`,
                        `${patientName.trim().replace(' ', '-')}-${link.downloadTitle}-${getFileNameFromAttachmentURL(
                          link.link,
                          true,
                          true
                        )}`,
                        'DOWNLOAD'
                      );
                    });
                  }}
                >
                  {' Download all'}
                </span>
              </div>
              <div>
                <span className={classes.actualLinkSubtitle}>{'click here to view/download all at once'}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
