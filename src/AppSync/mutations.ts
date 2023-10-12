/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription onCreatePmsNotifier($user_id: String, $event_name: String) {
    onCreatePmsNotifier(user_id: $user_id, event_name: $event_name) {
      user_id
      event_name
      timestamp
      last_message
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($user_name: String, $event_name: String) {
    onUpdateEvent(user_name: $user_name, event_name: $event_name) {
      user_name
      event_name
      timestamp
    }
  }
`;

export const sendNotification = /* GraphQL */ `
  mutation CreatePmsNotifierInput($input: CreatePmsNotifierInput!) {
    createPmsNotifier(input: $input) {
      user_id
      event_name
      timestamp
      last_message
    }
  }
`;
