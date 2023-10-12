import format from 'date-fns/format';
import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { usePanelNavigation } from '../../../../DisplayFramework/DisplayFramework.hooks';
import { useScrollDetection } from '../../../../Utilities/Hooks';
import { Author, Calendar, CalendarNew } from '../../../SVGs/Common';
import TopicCard from '../../SummaryPanel/TopicCard';
import { DEFAULT_SNIPPETS, getSnippetValue } from './Summary.function';
import { useStyles } from './Summary.styles';
import { IProps } from './Summary.types';

const Summary = (props: IProps) => {
  const { injectComponent, handleSelectSnippet, selectedTopic, authorName, lastUpdatedDate, snippets, customStyle } = props;
  const panelNavigation = usePanelNavigation();
  const { onScroll, isPanelScrolled } = useScrollDetection();

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.summarybody} ${customStyle}`}>
      <i className={classes.inject}>{injectComponent}</i>
      <div className={`${classes.flexrow} ${isPanelScrolled && classes.shadow}`}>
        <div>
          <div className={classes.flexrow2}>
            <span className={classes.span}>{<Author />}</span>
            <span className={`${classes.p1} ${commonClasses.sm10Regular}`}>AUTHOR</span>
          </div>
          <p className={`${classes.p2} ${commonClasses.body15Regular}`} title={authorName}>
            {authorName}
          </p>
        </div>
        <div>
          <div className={classes.flexrow2}>
            <span className={classes.span}>{<CalendarNew />}</span>
            <span className={`${classes.p1} ${commonClasses.sm10Regular}`}>Last Updated date</span>
          </div>
          <p className={`${classes.p2} ${commonClasses.body15Regular}`}>
            {format(new Date(lastUpdatedDate || new Date()), 'dd/MM/yyyy')}
          </p>
        </div>
      </div>
      <div className={classes.hr} />
      <section className={classes.topiccard} onScroll={(e) => onScroll(e?.currentTarget?.scrollTop)}>
        {snippets?.map((data) => {
          const snippetsdata: any = { ...DEFAULT_SNIPPETS[data?.id], ...data };

          const content = getSnippetValue(snippetsdata.snippet);

          return (
            <TopicCard
              key={data?.id}
              icon={snippetsdata?.icon}
              heading={snippetsdata?.heading}
              description={content}
              handleClick={
                snippetsdata?.heading === 'Tenant'
                  ? () => {}
                  : () => {
                      handleSelectSnippet(snippetsdata);
                      panelNavigation.navigateToPanel('C');
                    }
              }
              selected={selectedTopic === snippetsdata?.id}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Summary;
