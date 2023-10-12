import { API, graphqlOperation } from 'aws-amplify';
import { ZenObservable, Observable } from 'zen-observable-ts';
import * as subscriptions from './mutations';

export async function registerEvent(
  patientId: string,
  eventName: string,
  handler: Function
): Promise<ZenObservable.Subscription> {
  const subscription = API.graphql(
    graphqlOperation(subscriptions.onCreateEvent, {
      user_id: patientId,
      event_name: eventName,
    })
  ) as unknown as Observable<any>;
  if (subscription) {
    const sub = subscription.subscribe({
      next: (createEvent: any) => {
        try {
          if (createEvent?.value?.data.onCreatePmsNotifier) {
            console.log(
              'Refresh call trigerred for ',
              createEvent?.value?.data.onCreatePmsNotifier?.user_id,
              ', ',
              createEvent?.value?.data.onCreatePmsNotifier?.event_name,
              'triggered at FE:: ',
              new Date().toISOString(),
              'trigerred at BE:: ',
              createEvent?.value?.data.onCreatePmsNotifier?.timestamp &&
                new Date(Number(createEvent?.value?.data.onCreatePmsNotifier?.timestamp)).toString() !== 'Invalid Date'
                ? new Date(Number(createEvent?.value?.data.onCreatePmsNotifier?.timestamp)).toISOString()
                : 'No valid time'
            );
            handler(
              createEvent?.value?.data.onCreatePmsNotifier?.last_message
                ? JSON.parse(createEvent?.value?.data.onCreatePmsNotifier?.last_message)
                : ''
            );
          }
        } catch (e) {
          console.error(
            'Error in Refresh call trigerred for ',
            createEvent?.value?.data.onCreatePmsNotifier?.user_id,
            ', ',
            createEvent?.value?.data.onCreatePmsNotifier?.event_name,
            'triggered at FE:: ',
            new Date().toISOString(),
            'trigerred at BE:: ',
            createEvent?.value?.data.onCreatePmsNotifier?.timestamp &&
              new Date(Number(createEvent?.value?.data.onCreatePmsNotifier?.timestamp)).toString() !== 'Invalid Date'
              ? new Date(Number(createEvent?.value?.data.onCreatePmsNotifier?.timestamp)).toISOString()
              : 'No valid time',
            e
          );
        }
      },
      error: (errorMessage: any) => {},
    });
    return sub;
  }
}

export function unRegisterEvent(sub: Promise<ZenObservable.Subscription>) {
  sub.then((subscription: any) => {
    if (subscription) {
      subscription.unsubscribe();
    }
  });
}
export type pushMessage = {
  user_id: string;
  last_message: string;
  event_name: string;
  timestamp: string;
};

/**
 * Method used to send a notification to the user
 */

export async function notifyEvent(event: { input: pushMessage }): Promise<any> {
  const variables = event;
  const response = await API.graphql(graphqlOperation(subscriptions.sendNotification, variables));
  return response;
}
