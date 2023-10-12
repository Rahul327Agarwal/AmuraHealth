import { IChatMessage } from '../../ChatMessage/ChatMessage.types';

export function removeHighlightedSpans(htmlContent: string): string {
  const modifiedContent = htmlContent.replace(/<span\s+data-highlighted\s*=\s*"true"\s*>(.*?)<\/span>/g, '$1');
  return modifiedContent;
}

export function addHighlightedSpans(eleContent: string, regex: RegExp): string {
  return eleContent.replace(regex, (match) => `<span data-highlighted="true">${match}</span>`);
}

export function getSearchedString(message: IChatMessage): string {
  let searchedString = message?.message;
  if (message?.knowledgeBasePost) {
    searchedString = message?.knowledgeBasePost?.knowledgeBasePostTopics?.description?.snippet || '';
  }
  return searchedString?.toLowerCase();
}
