// import { IconButton } from "@mui/material";
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { DownArrowIcon, UpArrowIcon } from '../../SVGs/Common';
import CommonHeader from '../Windash/CommonHeader';

import { useStyles } from './MinimizeCard.styles';
import { IProps } from './MinimizeCard.types';
import MinimizedQuestionnaireCard from './Cards/QuestionnaireCard';
import MinimizedEventCard from './Cards/EventCard';
import MinimizedTeamListCard from './Cards/TeamListCard';
import MinimizedRecipeCard from './Cards/RecipeCard';
import MinimizedLMSCard from './Cards/LMSCard';

export default function MinimizeCard(props: IProps) {
  const { current_screen, setScreen, screen, view, handlePanelComponentsHeights } = props;

  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  // const [cardContent, setCardConetnt] = useState("events");
  const renderDrawerContent = (current_screen) => {
    switch (current_screen) {
      case 'people':
        return (
          <div className={classes.wrapperMylist}>
            <span className={`${classes.heading} ${commonClass.body17Medium}`}>Todo</span>
          </div>
        );
      case 'postCollections':
        return (
          <div className={classes.wrapperMylist}>
            <span className={`${classes.heading} ${commonClass.body17Medium}`}>Todo</span>
          </div>
        );
      case 'postmanagement':
        return (
          <div className={classes.wrapperMylist}>
            <span className={`${classes.heading} ${commonClass.body17Medium}`}>Todo</span>
          </div>
        );
      case 'configuration':
        return (
          <div className={classes.wrapperMylist}>
            <span className={`${classes.heading} ${commonClass.body17Medium}`}>Todo</span>
          </div>
        );
      case 'Polls':
        return (
          <div className={classes.wrapperMylist}>
            <span className={`${classes.heading} ${commonClass.body17Medium}`}>Todo</span>
          </div>
        );
      case 'KnowledgeBase':
        return (
          <div className={classes.wrapperMylist}>
            <span className={`${classes.heading} ${commonClass.body17Medium}`}>Todo</span>
          </div>
        );
      case 'Questionnaire':
        return <MinimizedQuestionnaireCard />;
      case 'events':
        return <MinimizedEventCard />;
      case 'TeamList':
        return <MinimizedTeamListCard />;
      case 'Recipes':
        return <MinimizedRecipeCard />;
      case 'LMS':
        return <MinimizedLMSCard />;
      // default:
      //   return object1;
    }
  };
  return (
    <div className={classes.wrap}>
      <CommonHeader
        current_screen={current_screen}
        setScreen={setScreen}
        view={view}
        onClick={(view, current_screen) => handlePanelComponentsHeights(view, current_screen)}
        screen={screen}
      />
      <div className={`${classes.primary}`}>{renderDrawerContent(current_screen)}</div>
    </div>
  );
}
