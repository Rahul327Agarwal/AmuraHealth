import { PMS_S3 } from '../../../../../Utils';
import SuccessToast from './../../../../../Common/SuccessToaster';
import ErrorToaster from './../../../../../Common/ErrorToaster';

export const getpostData = async (sessions, postId) => {
  try {
    let postSummarydata = await PMS_S3.getObject(`pms-ql-posts/${postId}/myPost.json`, import.meta.env.VITE_CLIENT_BUCKET, {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
    });
    return postSummarydata;
  } catch (error) {
    console.log(error, 'postdata fetch error');
  }
};

export const filterPostThatAreAllowedToBranch = (collectionData, maindata): Array<any> => {
  let posts1 = collectionData?.posts?.filter(
    (data) => data.postId !== maindata.postId && ['multiSelect', 'select'].includes(data.postType)
  );
  let posts2 = [].concat.apply(
    [],
    collectionData.subCollections?.map((subdata) =>
      subdata.posts?.filter((pdata) => pdata.postId !== maindata.postId && ['multiSelect', 'select'].includes(pdata.postType))
    )
  );
  return [...posts1, ...posts2];
};

export const formatPostData = (postData, colors) => {
  let copyOfColors = JSON.parse(JSON.stringify(colors));
  const response = postData?.responses;
  let tempbranchpost = [];
  let tempParentIndex = [];
  let branchpostId = [];
  let responseAndColorMap: any = {};
  postData?.branching?.map((data, index) => {
    data?.responses.map((val) => {
      let idx = response.indexOf(val);
      tempParentIndex.push(idx);
      // tempcolormapobj = { ...tempcolormapobj, [idx]: colors[tempactiveindex] };
    });
    tempbranchpost = [
      ...tempbranchpost,
      {
        ...data,
        color: Object.keys(colors)[index],
        parentIndex: tempParentIndex,
      },
    ];
    tempParentIndex.forEach((value) => {
      responseAndColorMap[value] = Object.keys(colors)[index];
    });
    delete copyOfColors[Object.keys(colors)[index]];
    tempParentIndex = [];
    branchpostId.push(data.postId);
  });
  return { responseAndColorMap, availableColors: copyOfColors, tempbranchpost };
};

export const getBranchingpostData = async (sessions, collection, postId) => {
  try {
    let postSummarydata = await PMS_S3.getObject(
      `pms-ql-collections/${collection.collectionType}/${collection?.topics?.tenant?.snippet}/${collection.collectionId}/${postId}/myPostBranching.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
      }
    );
    if (postSummarydata?.Error) {
      console.error(postSummarydata?.Error);
      return {};
    }
    return postSummarydata;
  } catch (error) {
    console.log(error, 'postdata fetch error');
    return {};
  }
};
export const getBranchingpostDataWithSubSubCollectionId = async (sessions, collection, postId, SubSubCollectionId) => {
  try {
    let postSummarydata = await PMS_S3.getObject(
      `pms-ql-collections/${collection.collectionType}/${collection?.topics?.tenant?.snippet}/${SubSubCollectionId}/${postId}/myPostBranching.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
      }
    );
    if (postSummarydata?.Error) {
      console.error(postSummarydata?.Error);
      return {};
    }
    return postSummarydata;
  } catch (error) {
    console.log(error, 'postdata fetch error');
    return {};
  }
};

export const AddBranching = async (props, payload, panelId: string) => {
  try {
    const response: any = PMS_S3.postData({
      ...payload,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: props.sessions.id_token,
      method: 'POST',
    });
    console.log('response in the branching', response);
    if (response.Error) ErrorToaster(response.Error, panelId, 'error');
    else {
      SuccessToast('Branching for the post is done successfully', panelId, 'success');
      return response;
    }
  } catch (error) {}
};

export const branchingChanged = (existingBranchingSrc, currentBranchingSrc) => {
  let existingBranching = existingBranchingSrc.sort((a, b) => a.postId.localeCompare(b.postId));
  let currentBranching = currentBranchingSrc.sort((a, b) => a.postId.localeCompare(b.postId));
  if (existingBranching.length !== currentBranching.length) {
    return true;
  }
  for (let index = 0; index < existingBranching.length; index++) {
    let branchingOfPost = currentBranching.find((post) => post.postId === existingBranching[index].postId);
    if (!branchingOfPost) {
      return true;
    }
    if (branchingOfPost.parentIndex.length !== existingBranching[index].parentIndex.length) {
      return true;
    }
    const existingBranchingResponse = branchingOfPost.parentIndex.sort((a, b) => a.localeCompare(b));
    for (let j = 0; j < existingBranching[index].parentIndex.length; j++) {
      let currentBranchingResponse = existingBranchingResponse.find(
        (response) => response === existingBranching[index].parentIndex[j]
      );
      if (currentBranchingResponse === undefined) {
        return true;
      }
    }
  }
  return false;
};
