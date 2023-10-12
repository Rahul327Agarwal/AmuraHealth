import { removeTeamAndMeFromMessage } from "../Chat.functions";
import {
  globalChannelVariables,
  IComponentMessage,
  IProps,
} from "../Chat.types";
import { getSearchResultDetails } from "./chatUtils";
import { checkSearchStartsWithSyntax } from "./validations";

export const handleSearch = (
  search: string,
  messagesComponent: Array<IComponentMessage>,
  currentSearchIndex: number,
  setCurrentSearchIndex: Function,
  setSearchInput: Function,
  searchIndices: Array<any>,
  setSearchIndices: Function,
  setHighLightSearch: Function
) => {
  setSearchInput(search);
  if (search.length > 2) {
    let syntaxFlag = checkSearchStartsWithSyntax(search);
    let replaceSearch = syntaxFlag
      ? removeTeamAndMeFromMessage(search).trim()
      : search;
    let indices = getSearchResultDetails(
      replaceSearch,
      messagesComponent,
      syntaxFlag,
      search
    );
    if (indices.length) {
      setCurrentSearchIndex(
        currentSearchIndex === -1
          ? indices.length
          : indices.indexOf(searchIndices[currentSearchIndex])
      );
    } else {
      setCurrentSearchIndex(-1);
    }
    setSearchIndices(indices);
    setHighLightSearch(replaceSearch);
  } else {
    setCurrentSearchIndex(-1);
    setSearchIndices([]);
    setHighLightSearch("");
  }
};
