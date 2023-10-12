import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import KnowledgeBaseCard from '../../LibraryComponents/KnowledgeBaseCard/KnowledgeBaseCard';
import { IcardData } from '../../LibraryComponents/KnowledgeBaseCard/KnowledgeBaseCard.types';
import KnowledgeBaseDetailed from '../../LibraryComponents/KnowledgeBaseCard/KnowledgeBaseDetailedView';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import SearchField from '../../LibraryComponents/SearchField/SearchField';
import { SubmitKbPost, getKBData } from './KnowledgeBaseShare.functions';
import { useStyles } from './KnowledgeBaseShare.styles';
import { IProps } from './KnowledgeBaseShare.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function KnowledgeBaseShare(props: IProps) {
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const [cardData, setCardData] = useState<Array<IcardData>>([]);
  const [expandedView, setExpandedView] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<IcardData>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setSearchValue('');
    setCardData([]);
    setExpandedView(false);
  }, [props.patientId]);
  const onSearch = async (searchvalue) => {
    setSearchValue(searchvalue);
    if (searchvalue.length < 3) {
      setCardData([]);
      return;
    }
    setIsLoading(true);
    const KBData = await getKBData(panelId, searchvalue, props.sessions.id_token);
    setCardData(KBData);
    setIsLoading(false);
  };

  const debounceSearchFun: Function = debounce(onSearch, 500);

  switch (expandedView) {
    case false:
      return (
        <div className={classes.rootContainer}>
          <div className={classes.searchField}>
            <SearchField value={searchValue} placeholder="Search Knowledge Base" handleSearch={debounceSearchFun} autoFocus />
          </div>
          <div className={classes.scrollBody}>
            {isLoading && (
              <>
                <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
                <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
                <MUISkeleton animation="wave" variant="rectangular" height="135px" width="100%" style={{ margin: '20px 0px' }} />
              </>
            )}
            {!isLoading &&
              cardData?.map((data) => {
                return (
                  <div
                    onClick={() => {
                      setExpandedView(true);
                      setSelectedCardData(data);
                    }}
                  >
                    <KnowledgeBaseCard
                      {...data}
                      onSubmit={(tenant, postId, setDisable) => {
                        SubmitKbPost(panelId, props, tenant, postId, setDisable, setExpandedView);
                      }}
                    />
                  </div>
                );
              })}
            {!isLoading && searchValue && cardData?.length === 0 && (
              <div className={classes.noData}>
                <span>No result Found.</span>
              </div>
            )}
          </div>
        </div>
      );
    case true:
      return (
        <KnowledgeBaseDetailed
          setExpandedView={setExpandedView}
          cardData={selectedCardData}
          onSubmit={(tenant, postId, setDisable) => {
            SubmitKbPost(panelId, props, tenant, postId, setDisable, setExpandedView);
          }}
        />
      );
  }
}
