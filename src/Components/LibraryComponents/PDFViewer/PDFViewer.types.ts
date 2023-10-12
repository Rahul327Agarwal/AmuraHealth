export interface IProps {
  url: string;
  sessions: any;
  panel?: any;
  setShowPDF:Function;
  isLoading?:boolean;
  setIsLoading?:Function;
}

export interface IStyleProps {
  isImage: boolean;
  totalPages: number;
  currentPageNumber: number;
}
