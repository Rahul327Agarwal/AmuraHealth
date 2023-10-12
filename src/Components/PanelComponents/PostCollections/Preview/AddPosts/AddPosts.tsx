import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDFGoBack } from '../../../../../DisplayFramework/Events/DFEvents';
import Branching from '../../Branching2/Configure/Branching';
import SubPostPreview from '../SubPostPreview/SubPostPreview';
import Preview from '../postPreview1/postPreview1';
import { IRootState } from './../../../../../DisplayFramework/State/store';
import { Actions, AddPostProps } from './AddPosts.types';
import AddCollection from '../../Components/AddCollection/AddCollection';
import { useCriteriaOptions, useFetchCollection } from '../../Components/AddCollection/AddCollection.hook';

export default function AddPosts(props: AddPostProps) {
  const { childEventTrigger, sessions, cardData } = props;

  const fetchProps = {
    sessions,
    collectionId: cardData?.collectionId,
    collectionType: cardData?.collectionType,
    tenantId: cardData?.tenantId,
  };

  const goBack = useDFGoBack();

  const [actionType, setActionType] = useState<Actions>('HOME');
  const [carddetails, setCardDetails] = useState({ postId: '', postType: '', subCollectionId: '' });

  const uniqueId = useSelector((state: IRootState) => state.AllPostData.uniqueId);
  const branchingdata = useSelector((state: IRootState) => state.Branching.BranchingCardData);

  const criteries = useCriteriaOptions(props?.sessions);

  const initHook = useFetchCollection(fetchProps, uniqueId);
  const { setCollectionsList, setPostsList } = initHook;

  useEffect(() => {
    if (branchingdata?.postId) setActionType('BRANCHING');
    else setActionType('HOME');
  }, [branchingdata]);

  const onPostPreview = (postId: any, postType: any) => {
    setCardDetails((pre) => ({ ...pre, postId, postType }));
    setActionType('PREVIEW');
  };

  const onCollectionPreview = (subCollectionId: any) => {
    setCardDetails((pre) => ({ ...pre, subCollectionId }));
    setActionType('SUB_COLLECTION_PREVIEW');
  };

  const onBackToPreview = () => {
    goBack('D');
  };

  switch (actionType) {
    case 'HOME':
      return (
        <AddCollection
          {...initHook}
          {...criteries}
          sessions={sessions}
          onBack={onBackToPreview}
          onPostPreview={onPostPreview}
          onCollectionPreview={onCollectionPreview}
        />
      );
    case 'PREVIEW':
      return (
        <Preview
          sessions={sessions}
          removeThisPost={(id: any) => {
            setActionType('HOME');
            setPostsList((pre) => pre.filter((post: any) => post.postId != id));
          }}
          postId={carddetails.postId}
          postType={carddetails.postType}
          setActionType={setActionType}
        />
      );
    case 'SUB_COLLECTION_PREVIEW':
      return (
        <SubPostPreview
          sessions={sessions}
          setActionType={setActionType}
          collectionId={uniqueId}
          subCollectionId={carddetails.subCollectionId}
          removeThisPostCollection={(id: any) => {
            setActionType('HOME');
            setCollectionsList((pre) => pre.filter((post: any) => post.collectionId != id));
          }}
        />
      );
    case 'BRANCHING':
      return (
        <Branching
          cardData={cardData}
          sessions={sessions}
          setActionType={setActionType}
          selectedClient={props.selectedClient}
          childEventTrigger={childEventTrigger}
        />
      );
  }
}
