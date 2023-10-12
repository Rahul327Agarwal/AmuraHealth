import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { useCriteriaOptions, useFetchCollection } from '../../PostCollections/Components/AddCollection/AddCollection.hook';
import CollectionPreview2 from '../CollectionPreview2/CollectionPreview2';
import PostPreview from '../PostPreview2/PostPreview2';
import { setDisabledaddtBtnInPreview } from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import { ActionType, AddCollectionProps } from './AddCollection.types';
import AddCollectionComp from '../../PostCollections/Components/AddCollection/AddCollection';

const AddCollection = (props: AddCollectionProps) => {
  const { sessions } = props;
  const dispatch = useDispatch();
  const { uniqueType, tenantId, uniqueId }: any = useSelector((state: IRootState) => state.AllPostData);

  const cardData = { collectionType: uniqueType, tenantId, collectionId: uniqueId };

  const [action, setAction] = useState<ActionType>({ screen: 'ADD_COLLECTION', payload: {} });

  const goBack = useDFGoBack();

  const criteries = useCriteriaOptions(sessions);

  const initHook = useFetchCollection({ sessions, ...cardData }, uniqueId);
  const { setCollectionsList, setPostsList } = initHook;

  const onPostPreview = (postId: any, postType: any) => {
    setAction({ screen: 'POST_PREVIEW', payload: { postId } });
  };

  const onCollectionPreview = (subCollectionId: any) => {
    setAction({
      screen: 'COLLECTION_PREVIEW',
      payload: { subCollectionId },
    });
  };

  const onBackToPreview = () => {
    dispatch(setDisabledaddtBtnInPreview(false));
    goBack('D');
  };

  switch (action.screen) {
    case 'ADD_COLLECTION':
      return (
        <AddCollectionComp
          {...initHook}
          {...criteries}
          sessions={sessions}
          onBack={onBackToPreview}
          onPostPreview={onPostPreview}
          onCollectionPreview={onCollectionPreview}
        />
      );
    case 'POST_PREVIEW':
      return (
        <PostPreview
          sessions={props.sessions}
          removeThisPost={(id: any) => {
            setPostsList((pre) => pre.filter((post: any) => post.postId != id));
            setAction({ screen: 'ADD_COLLECTION', payload: {} });
          }}
          postId={action?.payload.postId}
          setActionType={setAction}
          collectionId={cardData.collectionId}
          distributionType={cardData.collectionType}
        />
      );
    case 'COLLECTION_PREVIEW':
      return (
        <CollectionPreview2
          sessions={props.sessions}
          setActionType={setAction}
          collectionId={cardData.collectionId}
          subCollectionId={action?.payload.subCollectionId}
          removeThisPostCollection={(id: any) => {
            setCollectionsList((pre) => pre.filter((post: any) => post.collectionId != id));
            setAction({ screen: 'ADD_COLLECTION', payload: {} });
          }}
          distributionType={cardData.collectionType}
        />
      );
  }
};

export default AddCollection;
