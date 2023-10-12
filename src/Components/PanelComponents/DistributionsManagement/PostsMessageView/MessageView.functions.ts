import moment from 'moment';
import { SNIPPETS_ID } from '../Summary/Summary.function';

export const showingResponseMsgs = (data: any) => {
  switch (data.type) {
    case 'select':
      return data.options?.toString().replace(/,/g, ' or ');
    case 'multiSelect':
      return data.options?.toString().replace(/,/g, ' and ');
    case 'textField':
      return 'Text response';
    default:
      return '';
  }
};

const getdate = (datetime: any) => {
  var dateformat = moment(new Date(datetime)).format('DD/MM/YYYY');
  var date = new Date(datetime);
  var hours = parseInt((date.getHours() < 10 ? '0' : '') + date.getHours());

  var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  var newformat = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var modifiedHours = '';
  if (hours < 10) {
    modifiedHours = '0' + hours;
  } else {
    modifiedHours += hours;
  }

  return dateformat + ' ' + modifiedHours + ':' + minutes + ' ' + newformat;
};
export const getMessageSnippetValue = (snippet: any, snippetType: any, collectionType: any) => {
  const { message, values, configuration, response } = snippet || {};
  if (snippetType === SNIPPETS_ID.TO_BE_SHARED && (collectionType === 'KBM' || collectionType === 'QMT')) return values || '';
  if (message) return message;
  if (Array.isArray(values)) return values.join(', ');
  if (Array.isArray(configuration)) {
    let snippetString = '';
    configuration.forEach(({ type, value, datetime }) => {
      const valueData = value ? value : datetime ? getdate(datetime) : '';
      if (value == type) snippetString += `${type}\n`;
      else snippetString += `${type} : ${valueData} \n`;
    });
    return snippetString;
  }
  if (response) return showingResponseMsgs(response);

  return '';
};
