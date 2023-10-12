/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { ZenObservable } from 'zen-observable-ts';


export type IRegisterEvent = (patientId: string, eventName: string, handler: Function) => Promise<ZenObservable.Subscription>;
export type IUnRegisterEvent = (observable: ZenObservable.Subscription) => void;

export type CreateEvent = {
  user_name: string;
  event_name?: string | null;
  timestamp?: string | null;
};

export type Event = {
  __typename: 'Event';
  user_name?: string;
  event_name?: string | null;
  timestamp?: string | null;
};

export type UpdateEvent = {
  user_name: string;
  event_name?: string | null;
  timestamp?: string | null;
};

export type CreateEventMutationVariables = {
  input?: CreateEvent;
};

export type CreateEventMutation = {
  createEvent?: {
    __typename: 'Event';
    user_name: string;
    event_name?: string | null;
    timestamp?: string | null;
  } | null;
};

export type UpdateEventMutationVariables = {
  input?: UpdateEvent;
};

export type UpdateEventMutation = {
  updateEvent?: {
    __typename: 'Event';
    user_name: string;
    event_name?: string | null;
    timestamp?: string | null;
  } | null;
};

export type GetEventQueryVariables = {
  user_name?: string;
  event_name?: string | null;
};

export type GetEventQuery = {
  getEvent?: {
    __typename: 'Event';
    user_name: string;
    event_name?: string | null;
    timestamp?: string | null;
  } | null;
};

export type OnCreateEventSubscriptionVariables = {
  user_name?: string | null;
  event_name?: string | null;
};

export type OnCreateEventSubscription = {
  onCreateEvent?: {
    __typename: 'Event';
    user_name: string;
    event_name?: string | null;
    timestamp?: string | null;
  } | null;
};

export type OnUpdateEventSubscriptionVariables = {
  user_name?: string | null;
  event_name?: string | null;
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?: {
    __typename: 'Event';
    user_name: string;
    event_name?: string | null;
    timestamp?: string | null;
  } | null;
};
