export const VISIBLE_KEY = { POST: "POST", SUB_POST: "SUB_POST" };
export const POST_KEYS = { PA: "PA", PT: "PT" };

export const VISIBLE_KEY_PAYLOAD = {
  TITLE: "title",
  DESCRIPTON: "description",
  WELCOME: "welcomeMessage",
  THANKYOU: "thankYouMessage",
  HEADING: "heading",
};

export const setPostObject = (
  posts: Array<any>,
  filesObject: Object,
  level: number = 0,
  uniqueId: string = "",
  invisibleKeysObj?: Object
) => {
  posts?.forEach((data, index) => {
    const newLevel = level + index + 1;
    const uniqueIdA = `${uniqueId}_${POST_KEYS.PA}_${newLevel}${index}`;
    const uniqueIdT = `${uniqueId}_${POST_KEYS.PT}_${newLevel}${index}`;
    const uniqueIdI = `${uniqueId}_${VISIBLE_KEY.POST}_${newLevel}${index}`;
    if (data?.topics?.attachment?.file) {
      filesObject[uniqueIdA] = data?.topics?.attachment?.file;
    }
    if (data?.topics?.thumbnail?.file) {
      filesObject[uniqueIdT] = data?.topics?.thumbnail?.file;
    }
    if (invisibleKeysObj) {
      invisibleKeysObj[uniqueIdI] = data?.invisibleKeys || [];
    }
  });
  return { filesObject, invisibleKeysObj };
};

export const setSubPostObject = (
  subCollections: Array<any>,
  filesObject: Object,
  level: number = 0,
  invisibleKeysObj?: Object
) => {
  subCollections?.forEach((data, index) => {
    console.log(data,"each subcollectionsdata")

    const newLevel = level + index + 1;
    const uniqueIdI = `${VISIBLE_KEY.SUB_POST}_${newLevel}${index}`;
    if (data?.posts?.length) {
      setPostObject(data.posts, filesObject, newLevel, uniqueIdI, invisibleKeysObj);
    }
    if (data?.subCollections?.length) {
      setSubPostObject(data?.subCollections, filesObject, newLevel, invisibleKeysObj);
    }
    if (invisibleKeysObj) {
      invisibleKeysObj[uniqueIdI] = data.invisibleKeys || [];
    }
  });
  return { filesObject, invisibleKeysObj };
};

export const setPostInvisibleKeysEmpty = (posts: Array<any>) => {
  if (!posts?.length) return [];
  return posts.map((d1) => ({ ...d1, invisibleKeys: [] }));
};

export const setSubCollectionInvisibleKeysEmpty = (subCollections: Array<any>) => {
  if (!subCollections?.length) return [];
  return subCollections.map((data) => {
    let posts = data.posts || [];
    let subCollections = data.subCollections || [];
    if (posts) posts = setPostInvisibleKeysEmpty(posts);
    if (subCollections) subCollections = setSubCollectionInvisibleKeysEmpty(subCollections);

    return { ...data, posts, subCollections, invisibleKeys: [] };
  });
};

export const setPostInvisiblekey = (posts: Array<any>, invisibleKeysObject: Object, level: number = 0, uniqueId: string = "") => {
  if (!posts?.length) return [];
  return posts.map((data, index) => ({
    order: data?.order,
    postId: data?.postId,
    postType: data?.postType,
    hasResponse: data?.hasResponse,
    heading: data?.topics?.heading?.snippet,
    description: data?.topics?.description?.snippet,
    invisibleKeys: invisibleKeysObject?.[`${uniqueId}_${VISIBLE_KEY.POST}_${level + index + 1}${index}`] || data.invisibleKeys,
  }));
};
export const setSubPostInvisiblekey = (subCollections: Array<any>, invisibleKeysObject: Object, level: number = 0) => {
  if (!subCollections?.length) return [];
  return subCollections.map((data, index) => {
    const newLevel = level + index + 1;
    const uniqueIdI = `${VISIBLE_KEY.SUB_POST}_${newLevel}${index}`;
    let posts = data.posts || [];
    let subCollections = data.subCollections || [];
    if (posts) {
      posts = setPostInvisiblekey(posts, invisibleKeysObject, newLevel, uniqueIdI);
    }
    if (subCollections) {
      subCollections = setSubPostInvisiblekey(subCollections, invisibleKeysObject, newLevel);
    }
    return {
      collectionName: data?.collectionName,
      parentCollectionId: data?.parentCollectionId,
      subCollectionId: data.subCollectionId,
      numberOfPosts: data?.numberOfPosts,
      posts,
      subCollections,
      invisibleKeys: invisibleKeysObject?.[uniqueIdI] || data.invisibleKeys,
    };
  });
};

export const subCollectionData: any = {
  parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
  numberOfPosts: 1,
  posts: [
    {
      postType: "audio",
      author: "1",
      topics: {
        heading: {
          snippet: "Question post",
        },
        thumbnail: {
          snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
          file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
          isAttachment: true,
        },
        attachment: {
          snippet: "file_example_MP3_700KB.mp3",
          file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
          type: "audio",
          isAttachment: true,
        },
        distributionChannel: {
          snippet: ["whatsApp", "facebook"],
        },
        response: {
          snippet: ["1", "2", "3", "4", "5", "6"],
          type: "select",
        },
      },
      hasResponse: true,
      tenantId: "amura",
      userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      createdOn: "2022-10-06T17:00:45.730Z",
      REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
      updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      updatedOn: "2022-10-06T18:31:03.105Z",
      postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
      invisibleKeys: [],
    },
    {
      postType: "audio",
      author: "2",
      topics: {
        heading: {
          snippet: "Question post",
        },
        thumbnail: {
          snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
          file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
          isAttachment: true,
        },
        attachment: {
          snippet: "file_example_MP3_700KB.mp3",
          file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
          type: "audio",
          isAttachment: true,
        },
        distributionChannel: {
          snippet: ["whatsApp", "facebook"],
        },
        response: {
          snippet: ["1", "2", "3", "4", "5", "6"],
          type: "select",
        },
      },
      hasResponse: true,
      tenantId: "amura",
      userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      createdOn: "2022-10-06T17:00:45.730Z",
      REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
      updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      updatedOn: "2022-10-06T18:31:03.105Z",
      postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
      invisibleKeys: ["heading"],
    },
  ],
  subCollections: [
    {
      parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
      numberOfPosts: 1,
      posts: [
        {
          postType: "audio",
          author: "3",
          topics: {
            heading: {
              snippet: "Question post",
            },
            thumbnail: {
              snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
              file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
              isAttachment: true,
            },
            attachment: {
              snippet: "file_example_MP3_700KB.mp3",
              file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
              type: "audio",
              isAttachment: true,
            },
            distributionChannel: {
              snippet: ["whatsApp", "facebook"],
            },
            response: {
              snippet: ["1", "2", "3", "4", "5", "6"],
              type: "select",
            },
          },
          hasResponse: true,
          tenantId: "amura",
          userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
          createdOn: "2022-10-06T17:00:45.730Z",
          REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
          updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
          updatedOn: "2022-10-06T18:31:03.105Z",
          postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
          invisibleKeys: [],
        },
      ],
      subCollections: [
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "4",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
            {
              postType: "audio",
              author: "5",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
          ],
          subCollections: [],
          subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
          collectionName: "Testing",
          topics: {
            collectionName: {
              snippet: "Testing",
            },
            description: {
              snippet: "my description here",
            },
            title: {
              snippet: "change",
            },
            distributionChannel: {
              snippet: ["Test package 2", "Test package 3"],
            },
            welcomeMessage: {
              snippet: "welcome",
            },
            privacy: {
              snippet: "privacy",
            },
            thankYouMessage: {
              snippet: "thankyou guys",
            },
          },
          invisibleKeys: ["title"],
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "6",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: ["heading"],
            },
          ],
          subCollections: [],
          subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
          collectionName: "Testing",
          topics: {
            collectionName: {
              snippet: "Testing",
            },
            description: {
              snippet: "my description here",
            },
            title: {
              snippet: "change",
            },
            distributionChannel: {
              snippet: ["Test package 2", "Test package 3"],
            },
            welcomeMessage: {
              snippet: "welcome",
            },
            privacy: {
              snippet: "privacy",
            },
            thankYouMessage: {
              snippet: "thankyou guys",
            },
          },
          invisibleKeys: ["thankYouMessage", "welcomeMessage"],
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "7",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
          ],
          subCollections: [],
          subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
          collectionName: "Testing",
          topics: {
            collectionName: {
              snippet: "Testing",
            },
            description: {
              snippet: "my description here",
            },
            title: {
              snippet: "change",
            },
            distributionChannel: {
              snippet: ["Test package 2", "Test package 3"],
            },
            welcomeMessage: {
              snippet: "welcome",
            },
            privacy: {
              snippet: "privacy",
            },
            thankYouMessage: {
              snippet: "thankyou guys",
            },
          },
          invisibleKeys: [],
        },
      ],
      subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
      collectionName: "Testing",
      topics: {
        collectionName: {
          snippet: "Testing",
        },
        description: {
          snippet: "my description here",
        },
        title: {
          snippet: "change",
        },
        distributionChannel: {
          snippet: ["Test package 2", "Test package 3"],
        },
        welcomeMessage: {
          snippet: "welcome",
        },
        privacy: {
          snippet: "privacy",
        },
        thankYouMessage: {
          snippet: "thankyou guys",
        },
      },
      invisibleKeys: ["description", "welcomeMessage"],
    },
    {
      parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
      numberOfPosts: 1,
      posts: [
        {
          postType: "audio",
          author: "8",
          topics: {
            heading: {
              snippet: "Question post",
            },
            thumbnail: {
              snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
              file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
              isAttachment: true,
            },
            attachment: {
              snippet: "file_example_MP3_700KB.mp3",
              file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
              type: "audio",
              isAttachment: true,
            },
            distributionChannel: {
              snippet: ["whatsApp", "facebook"],
            },
            response: {
              snippet: ["1", "2", "3", "4", "5", "6"],
              type: "select",
            },
          },
          hasResponse: true,
          tenantId: "amura",
          userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
          createdOn: "2022-10-06T17:00:45.730Z",
          REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
          updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
          updatedOn: "2022-10-06T18:31:03.105Z",
          postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
          invisibleKeys: ["heading"],
        },
      ],
      subCollections: [
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "9",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
          ],
          subCollections: [],
          subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
          collectionName: "Testing",
          topics: {
            collectionName: {
              snippet: "Testing",
            },
            description: {
              snippet: "my description here",
            },
            title: {
              snippet: "change",
            },
            distributionChannel: {
              snippet: ["Test package 2", "Test package 3"],
            },
            welcomeMessage: {
              snippet: "welcome",
            },
            privacy: {
              snippet: "privacy",
            },
            thankYouMessage: {
              snippet: "thankyou guys",
            },
          },
          invisibleKeys: [],
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "10",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
          ],
          subCollections: [],
          subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
          collectionName: "Testing",
          topics: {
            collectionName: {
              snippet: "Testing",
            },
            description: {
              snippet: "my description here",
            },
            title: {
              snippet: "change",
            },
            distributionChannel: {
              snippet: ["Test package 2", "Test package 3"],
            },
            welcomeMessage: {
              snippet: "welcome",
            },
            privacy: {
              snippet: "privacy",
            },
            thankYouMessage: {
              snippet: "thankyou guys",
            },
          },
          invisibleKeys: ["title", "thankYouMessage"],
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "11",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
            {
              postType: "audio",
              author: "12",
              topics: {
                heading: {
                  snippet: "Question post",
                },
                thumbnail: {
                  snippet: "Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/5b43bb68-4e77-4462-8702-5611a72cd988/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif",
                  isAttachment: true,
                },
                attachment: {
                  snippet: "file_example_MP3_700KB.mp3",
                  file: "pms-ql-notes-file/dc282155-8dde-455b-a5cb-100d6b22e025/8231ea27-dc4d-4309-849d-6fb33f23db01/file_example_MP3_700KB.mp3",
                  type: "audio",
                  isAttachment: true,
                },
                distributionChannel: {
                  snippet: ["whatsApp", "facebook"],
                },
                response: {
                  snippet: ["1", "2", "3", "4", "5", "6"],
                  type: "select",
                },
              },
              hasResponse: true,
              tenantId: "amura",
              userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              createdOn: "2022-10-06T17:00:45.730Z",
              REQ_ID: "182b1268-1ac2-41aa-b4f1-fdd1200d1486",
              updatedBy: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
              updatedOn: "2022-10-06T18:31:03.105Z",
              postId: "dc282155-8dde-455b-a5cb-100d6b22e025",
              invisibleKeys: [],
            },
          ],
          subCollections: [],
          subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
          collectionName: "Testing",
          topics: {
            collectionName: {
              snippet: "Testing",
            },
            description: {
              snippet: "my description here",
            },
            title: {
              snippet: "change",
            },
            distributionChannel: {
              snippet: ["Test package 2", "Test package 3"],
            },
            welcomeMessage: {
              snippet: "welcome",
            },
            privacy: {
              snippet: "privacy",
            },
            thankYouMessage: {
              snippet: "thankyou guys",
            },
          },
          invisibleKeys: [],
        },
      ],
      subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
      collectionName: "Testing",
      topics: {
        collectionName: {
          snippet: "Testing",
        },
        description: {
          snippet: "my description here",
        },
        title: {
          snippet: "change",
        },
        distributionChannel: {
          snippet: ["Test package 2", "Test package 3"],
        },
        welcomeMessage: {
          snippet: "welcome",
        },
        privacy: {
          snippet: "privacy",
        },
        thankYouMessage: {
          snippet: "thankyou guys",
        },
      },
      invisibleKeys: [],
    },
  ],
  invisibleKeys: ["title", "description", "thankYouMessage"],
  subCollectionId: "b166ecdd-f932-4223-ab7d-bb022c401286",
  collectionName: "Testing",
  topics: {
    collectionName: {
      snippet: "Testing",
    },
    description: {
      snippet: "my description here",
    },
    title: {
      snippet: "change",
    },
    distributionChannel: {
      snippet: ["Test package 2", "Test package 3"],
    },
    welcomeMessage: {
      snippet: "welcome",
    },
    privacy: {
      snippet: "privacy",
    },
    thankYouMessage: {
      snippet: "thankyou guys",
    },
  },
};
