export const VISIBLE_KEY_PAYLOAD = {
  TITLE: 'title',
  DESCRIPTON: 'description',
  WELCOME: 'welcomeMessage',
  THANKYOU: 'thankYouMessage',
  HEADING: 'heading',
};
export const POST_OPTIONS: any = [
  {
    title: 'Hide',
    type: 'label',
    value: 'HIDE',
    subMenu: [
      { title: 'Title', value: VISIBLE_KEY_PAYLOAD.HEADING, type: 'checkbox' },
      { title: 'Description', value: VISIBLE_KEY_PAYLOAD.DESCRIPTON, type: 'checkbox' },
    ],
  },
  // { title: "Configure Branching", value: "CONFIGURE_BRANCHING", type: "label" },
  // { title: "Delete", value: "DELETE", type: "label", disable: true },
];

export const SUB_COLLECTION_OPTIONS: any = [
  {
    title: 'Hide',
    type: 'label',
    value: 'HIDE',
    subMenu: [
      // { title: "Title", value: VISIBLE_KEY_PAYLOAD.TITLE, type: "checkbox" },
      { title: 'Description', value: VISIBLE_KEY_PAYLOAD.DESCRIPTON, type: 'checkbox' },
      { title: 'Welcome', value: VISIBLE_KEY_PAYLOAD.WELCOME, type: 'checkbox' },
      { title: 'Thankyou', value: VISIBLE_KEY_PAYLOAD.THANKYOU, type: 'checkbox' },
    ],
  },
  // { title: "Delete", value: "DELETE", type: "label", disable: true },
];
