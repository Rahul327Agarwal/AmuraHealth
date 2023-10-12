import { IconButton } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { getVoiceNoteFromURL } from '../../../../Common/Common.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CrossIcon } from '../../../SVGs/Common';
import { getEsDataforUsers, getFinalCollectionPreview, getHeaderKeyByCollectionType } from '../DistributionsMgt.functions';
import PostCollectionPreview from '../PostCollectionPreview/PostCollectionPreview';
import { VISIBLE_KEY, setPostObject, setSubPostObject } from '../PostCollectionPreview/PostCollectionPreview.function';
import { FinalPreviewProps } from '../Preview/Preview.types';
import { SNIPPETS_ID } from './../Summary/Summary.function';
import { useStyles } from './FinalPreview.styles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const defaultUniqueId = `${VISIBLE_KEY.SUB_POST}_${0}${0}`;

const FinalPreview = (props: FinalPreviewProps) => {
  const { sessions, setAction, collectionId, collectionType } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();

  const [mediaFiles, setMediaFiles] = useState({});
  const [mediaURLs, setMediaURLs] = useState({});
  const [collectionData, setCollectionData] = useState<any>({});

  const { headerKey } = useMemo(() => getHeaderKeyByCollectionType(collectionType), [collectionType]);

  useEffect(() => {
    if (collectionId) {
      (async () => {
        let response = await getFinalCollectionPreview(sessions, collectionId);
        if (!response) {
          ErrorToaster('Something went wrong! Please try again later', panelId, 'error');
          return;
        }
        if (response.topics[SNIPPETS_ID.CONSUMERS]) {
          const nameData = await getEsDataforUsers(panelId, response.topics[SNIPPETS_ID.CONSUMERS]?.snippet);
          response.topics[SNIPPETS_ID.CONSUMERS].snippet = nameData;
        }
        if (response.topics[SNIPPETS_ID.VIEW_ACCESS]) {
          const nameData = await getEsDataforUsers(panelId, response.topics[SNIPPETS_ID.VIEW_ACCESS]?.snippet);
          response.topics[SNIPPETS_ID.VIEW_ACCESS].snippet = nameData;
        }

        setCollectionData(response);
        const filesObject = {};
        setPostObject(response.posts, filesObject, 0, defaultUniqueId);
        setSubPostObject(response.subCollections, filesObject, 0);
        setMediaFiles(filesObject);
      })();
    }
  }, [collectionId]);

  useEffect(() => {
    if (Object.keys(mediaFiles).length) {
      (async () => {
        const filesURLObject = {};
        for (const key in mediaFiles) {
          const element = mediaFiles[key];
          if (element) {
            const fileURL: any = await getVoiceNoteFromURL(sessions, element);
            filesURLObject[key] = fileURL || '';
          }
        }
        setMediaURLs(filesURLObject);
      })();
    }
  }, [mediaFiles]);

  const handleCose = () => {
    setAction({ screen: 'PREVIEW', payload: {} });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.previewHeader}>
        <div className={`${commonClasses.body17Medium} ${classes.headerText}`}>
          {(((collectionData?.topics && collectionData.topics) || {})[headerKey] &&
            ((collectionData?.topics && collectionData.topics) || {})[headerKey].snippet) ||
            ''}
        </div>
        <IconButton onClick={handleCose}>{<CrossIcon />}</IconButton>
      </div>
      <div className={classes.previewScrollBody}>
        <PostCollectionPreview
          headerKey={headerKey}
          topics={collectionData?.topics || {}}
          mediaURLs={mediaURLs}
          uniqueId={defaultUniqueId}
          posts={collectionData.posts}
          subCollections={collectionData.subCollections}
          level={0}
          sessions={sessions}
        />
      </div>
    </div>
  );
};

export default FinalPreview;
