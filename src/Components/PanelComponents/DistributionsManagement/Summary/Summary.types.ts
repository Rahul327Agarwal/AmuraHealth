export interface IProps {
  handleSelectSnippet: Function;
  selectedTopic: string;
  injectComponent?: any;
  authorName: string;
  lastUpdatedDate: string | Date;
  snippets: Array<SnippetObject>;
  customStyle?: string;
}
export interface SnippetObject {
  id: string;
  snippet?: string;
  heading?: string;
  icon?: React.ReactElement;
  headerText?: string;
}
