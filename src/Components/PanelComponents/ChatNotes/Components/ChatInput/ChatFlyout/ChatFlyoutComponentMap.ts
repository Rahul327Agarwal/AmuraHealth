import React from 'react';
import BookingAvaibility from '../../../../../LibraryComponents/CallSchedulerWizards/CallWizard/BookingAvaibility';
import BPPopUp from '../../../../../LibraryComponents/ChatComponent/BPPopUp/BPPopUp';
import BloodGlucosePopUp from '../../../../../LibraryComponents/ChatComponent/BloodGlucosePopUp/BloodGlucosePopUp';
import BlueDotClosePopUp from '../../../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp';
import BlueDotPopUp from '../../../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotPopUp';
import CallPopUp from '../../../../../LibraryComponents/ChatComponent/CallPopUp/CallPopUp';
import ReferPopUp from '../../../../../LibraryComponents/ChatComponent/ReferPopUp/ReferPopUp';
import WeightPopUp from '../../../../../LibraryComponents/ChatComponent/WeightPopUp/WeightPopUp';
import SurveyRedoPopup from '../../SurveyComp/SurveyRedoPopUp';
import SurveySelectPopUp from '../../SurveyComp/SurveySelectPopUp';
import SurveyTextFieldAnswer from '../../SurveyComp/SurveyTextFieldAnswer';
import SurveyPopUp from '../../SurveyComp/SurveyPopUp/SurveyPopUp';
import { ChatAttachment } from '../ChatAttachment/ChatAttachment';

export type ChatFlyoutCommonProps = {};

export type ChatFlyoutComponentMapType = {
  [key in string]: {
    component: React.FunctionComponent<any>;
    disableInputOnOpen?: boolean;
  };
};

export const chatFlyoutComponentMap = {
  fileUpload: {
    component: ChatAttachment,
  },
  callSchedule: {
    component: CallPopUp,
    disableInputOnOpen: true,
  },
  callWizard: {
    component: BookingAvaibility,
    disableInputOnOpen: true,
  },
  bluedot: {
    component: BlueDotPopUp,
    disableInputOnOpen: true,
  },
  bluedotClose: {
    component: BlueDotClosePopUp,
    disableInputOnOpen: true,
  },
  weight: {
    component: WeightPopUp,
    disableInputOnOpen: true,
  },
  BP: {
    component: BPPopUp,
    disableInputOnOpen: true,
  },
  BloodGlucose: {
    component: BloodGlucosePopUp,
    disableInputOnOpen: true,
  },
  survey: {
    component: SurveyPopUp,
    disableInputOnOpen: true,
  },
  refer: {
    component: ReferPopUp,
    disableInputOnOpen: true,
  },
  redoSurvey: {
    component: SurveyRedoPopup,
    disableInputOnOpen: true,
  },
  surveySelectPopUp: {
    component: SurveySelectPopUp,
    disableInputOnOpen: true,
  },
  surveyTextAnswer: {
    component: SurveyTextFieldAnswer,
    disableInputOnOpen: true,
  },
} satisfies ChatFlyoutComponentMapType;

export type ChatFlyoutsKey = keyof typeof chatFlyoutComponentMap;
