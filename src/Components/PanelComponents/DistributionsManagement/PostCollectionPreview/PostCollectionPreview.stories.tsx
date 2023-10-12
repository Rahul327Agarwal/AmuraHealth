import { Meta, Story } from "@storybook/react";
import React from "react";
import PostCollectionPreview from "./PostCollectionPreviewDemo";
import { IPostCollectionPreviewProps } from "./PostCollectionPreview.types";

export default {
  title: "New Library Components/PostCollectionPreview",
  parameters: {
    backgrounds: {
      default: "Light",
      values: [
        { name: "Dark", value: "#000000" },
        { name: "Panel", value: "#1B1B1B" },
        { name: "Light", value: "#FFFFFF" },
      ],
    },
  },
  component: PostCollectionPreview,
} as Meta;

const TemplatePrimary: Story<IPostCollectionPreviewProps> = (args) => <PostCollectionPreview {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  handleInvisibleKey: () => {},
  descriptionSnippet: "checking desription",
  invisibleKeys: {},
  collectionNameSnippet: "Refresh",
  titleSnippet: "checking the issue",
  welcomeMessageSnippet: "my welcome",
  thankYouMessageSnippet: "thankyou",
  posts: [
    {
      postType: "audio",
      author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      topics: {
        heading: {
          snippet: '"Audio Post"',
        },
        description: {
          snippet: "changing the post",
        },
        thumbnail: {
          snippet: "SampleJPGImage_500kbmb (1).jpg",
          file: "pms-ql-notes-file/3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa/c5e5aa68-dafa-4257-9597-56bba817aad1/SampleJPGImage_500kbmb (1).jpg",
          isAttachment: true,
        },
        attachment: {
          snippet: "file_example_MP3_700KB.mp3",
          file: "pms-ql-notes-file/3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa/b74fae71-612e-4aae-96af-e09993e7b25a/file_example_MP3_700KB.mp3",
          type: "audio",
          isAttachment: true,
        },
        distributionChannel: {
          snippet: ["facebook", "whatsApp"],
        },
        response: {
          snippet: [],
          type: "textField",
        },
      },
      hasResponse: true,
      tenantId: "amura",
      userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      createdOn: "2022-10-06T11:15:32.837Z",
      REQ_ID: "23a30305-0fd9-484f-8606-e5ddd06882db",
      updatedBy: "948aee3d-6712-48a9-a03b-c926f5f99915",
      updatedOn: "2022-10-12T07:15:47.397Z",
      postId: "3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa",
    },
    {
      postType: "audio",
      author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      topics: {
        heading: {
          snippet: '"Audio Post"',
        },
        description: {
          snippet: "changing the post",
        },
        thumbnail: {
          snippet: "SampleJPGImage_500kbmb (1).jpg",
          file: "pms-ql-notes-file/3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa/c5e5aa68-dafa-4257-9597-56bba817aad1/SampleJPGImage_500kbmb (1).jpg",
          isAttachment: true,
        },
        attachment: {
          snippet: "file_example_MP3_700KB.mp3",
          file: "pms-ql-notes-file/3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa/b74fae71-612e-4aae-96af-e09993e7b25a/file_example_MP3_700KB.mp3",
          type: "audio",
          isAttachment: true,
        },
        distributionChannel: {
          snippet: ["facebook", "whatsApp"],
        },
        response: {
          snippet: [],
          type: "textField",
        },
      },
      hasResponse: true,
      tenantId: "amura",
      userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      createdOn: "2022-10-06T11:15:32.837Z",
      REQ_ID: "23a30305-0fd9-484f-8606-e5ddd06882db",
      updatedBy: "948aee3d-6712-48a9-a03b-c926f5f99915",
      updatedOn: "2022-10-12T07:15:47.397Z",
      postId: "3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa",
    },
    {
      postType: "audio",
      author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      topics: {
        heading: {
          snippet: '"Audio Post"',
        },
        description: {
          snippet: "changing the post",
        },
        thumbnail: {
          snippet: "SampleJPGImage_500kbmb (1).jpg",
          file: "pms-ql-notes-file/3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa/c5e5aa68-dafa-4257-9597-56bba817aad1/SampleJPGImage_500kbmb (1).jpg",
          isAttachment: true,
        },
        attachment: {
          snippet: "file_example_MP3_700KB.mp3",
          file: "pms-ql-notes-file/3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa/b74fae71-612e-4aae-96af-e09993e7b25a/file_example_MP3_700KB.mp3",
          type: "audio",
          isAttachment: true,
        },
        distributionChannel: {
          snippet: ["facebook", "whatsApp"],
        },
        response: {
          snippet: [],
          type: "textField",
        },
      },
      hasResponse: true,
      tenantId: "amura",
      userId: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
      createdOn: "2022-10-06T11:15:32.837Z",
      REQ_ID: "23a30305-0fd9-484f-8606-e5ddd06882db",
      updatedBy: "948aee3d-6712-48a9-a03b-c926f5f99915",
      updatedOn: "2022-10-12T07:15:47.397Z",
      postId: "3cffe411-ab49-4e3c-b4f0-2d3a7097dcaa",
    },
  ],
  subCollections: [
    {
      parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
      numberOfPosts: 1,
      posts: [
        {
          postType: "audio",
          author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
        {
          postType: "audio",
          author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
      ],
      subCollections: [
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
          ],
          subCollections: [
            {
              parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
              numberOfPosts: 1,
              posts: [
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
                },
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
            {
              parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
              numberOfPosts: 1,
              posts: [
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
            {
              parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
              numberOfPosts: 1,
              posts: [
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
          ],
          subCollections: [
            {
              parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
              numberOfPosts: 1,
              posts: [
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
                },
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
            {
              parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
              numberOfPosts: 1,
              posts: [
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
            {
              parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
              numberOfPosts: 1,
              posts: [
                {
                  postType: "audio",
                  author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
    },
    {
      parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
      numberOfPosts: 1,
      posts: [
        {
          postType: "audio",
          author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
      ],
      subCollections: [
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
    },
    {
      parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
      numberOfPosts: 1,
      posts: [
        {
          postType: "audio",
          author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
      ],
      subCollections: [
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
            },
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
        },
        {
          parentCollectionId: "635185a6-9789-4080-bbed-e6abc1d7ac0c",
          numberOfPosts: 1,
          posts: [
            {
              postType: "audio",
              author: "82861a0a-2770-40e0-8cad-6aed691ed7cf",
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
    },
  ],
  mediaURLs: {},
  level: 0,
};
