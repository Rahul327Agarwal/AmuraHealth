import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import PageHeader from '../PageHeader/PageHeader';
import { useStyles } from './KnowledgeBaseCard.styles';
import { IKnowledgeBaseDetailed } from './KnowledgeBaseCard.types';
import { BackArrowIcon, SendIcon2 } from './KnowledgeBaseCard.svg';
import { useState } from 'react';

const KnowledgeBaseDetailed = (props: IKnowledgeBaseDetailed) => {
  const { setExpandedView, cardData, onSubmit } = props;
  const { heading, description } = cardData;
  const [disable, setDisable] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const handleScroll = (e) => {
    const parenttop = e.target.getBoundingClientRect().top;
    const element = document.querySelector('.mydescription');
    const KBheader = document.querySelector('.KBheader');
    const top = element.getBoundingClientRect().top - parenttop;
    KBheader.setAttribute('data-shadow', `${top <= 14}`);
    setShowHeader(top <= 14);
  };

  return (
    <div className={classes.expendedViewMainContainer}>
      <div className={`KBheader ${classes.headerDiv}`}>
        <PageHeader
          customStyle={classes.headerWrapper}
          startAdornment={
            <BackArrowIcon
              className={classes.cursorPointer}
              onClick={() => {
                setExpandedView(false);
              }}
            />
          }
          headerContent={showHeader ? heading?.snippet : ``}
          endAdornment={
            <SendIcon2
              onClick={() => {
                setDisable(true);
                onSubmit(cardData.tenant.snippet, cardData.postId, setDisable);
              }}
              className={disable ? classes.disable : ''}
            />
          }
        />
      </div>
      <div className={classes.scrollBody} onScroll={handleScroll}>
        <div className={`${classes.heading} ${commonClass.body20Medium}`}>{heading?.snippet || ''}</div>
        <div className={`mydescription ${classes.description} ${commonClass.body15Regular}`}>{description?.snippet || ''}</div>
      </div>
    </div>
  );
};

export default KnowledgeBaseDetailed;
