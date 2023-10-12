import axios from 'axios';
import ErrorToaster from '../../../../../Common/ErrorToaster';

export const answerSurveyMessage = async (panelId: string, answer: any, patientId: string, survey: any) => {
  try {
    return await axios.post(`${import.meta.env.VITE_ANSWER_SURVEY_WA_MESSAGE}`, {
      patientId,
      questionnaireId: survey.collectionId,
      answer,
      nthQuestion: survey.currentPostOrder,
    });
  } catch (error) {
    ErrorToaster('Something went wrong', panelId, 'error');
  }
};

export const answerSurveySend = async (panelId: string, patientId: string, survey: any) => {
  try {
    return await axios.post(`${import.meta.env.VITE_ANSWER_SURVEY_WA_MESSAGE_SEND_QUESTION}`, {
      patientId,
      questionnaireId: survey.collectionId,
    });
  } catch (error) {
    ErrorToaster('Something went wrong', panelId, 'error');
  }
};
