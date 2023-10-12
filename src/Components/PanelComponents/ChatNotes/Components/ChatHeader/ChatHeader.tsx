import WifiOffIcon from '@mui/icons-material/WifiOff';
import { IconButton } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { IRootState, useAppSelector } from '../../../../../DisplayFramework/State/store';
// import { ChatIcon, EducationIcon, NutrientsIcon, RecipeIconDark, SurveyIcon } from '../../../../SVGs/Common';
import { useFilterChat, useSurveyCollection } from '../../ChatNotes.hooks';
import { ChatFilters } from '../../ChatNotes.types';
import ChatSearch from '../ChatSearch/ChatSearch';
import { getUserTime } from './ChatHeader.functions';
import { useIsTyping } from './ChatHeader.hooks';
import { useStyles } from './ChatHeader.styles';
import { ChatIcon, ChatSearchIcon, EducationIcon, NutrientsIcon, RecipeIconDark, SurveyIcon } from './ChatHeader.svg';
import { ChatTabs, IProps } from './ChatHeader.types';

function ChatHeader(props: IProps) {
  const { title, isOnline = true, messageBodyRef, messages, virtualMessages } = props;

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const { setChatFilterType, chatFilterType } = useFilterChat();
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [time, setTime] = React.useState(moment().format(' HH:mm'));
  const [disableNavIcons, setDisableNavIcons] = React.useState(true);
  const [selectedChatTab, setSelectedChatTab] = React.useState<ChatTabs>('CHAT_TAB');
  const { currentlyTypingUser } = useIsTyping();
  const { surveyCountData, isLoading: isFetchingSurveyData } = useSurveyCollection(messages);

  let intervalId = React.useRef<any>();
  let {
    Synopsis: { TimeZone = '' },
  } = useAppSelector((state) => {
    return state.dashboard.myCustomer;
  });

  useEffect(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    if (TimeZone) {
      setTime(getUserTime(TimeZone));
      intervalId.current = setInterval(() => {
        setTime(getUserTime(TimeZone));
      }, 60000);
    }
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [TimeZone]);

  return (
    <div className={`${classes.headerWrapper}`}>
      <div className={classes.headerContainer}>
        {isSearchActive ? (
          <ChatSearch
            messages={messages}
            messageBodyRef={messageBodyRef}
            onBack={() => {
              setIsSearchActive(false);
            }}
            virtualMessages={virtualMessages}
          />
        ) : (
          <>
            <section className={classes.mainTitle}>
              <span className={`${commonClasses.body17Medium}`}>{title}</span>
              <section className={classes.rightSide}>
                {!isOnline && <WifiOffIcon className={classes.offlineIcon} />}
                <span>{time}</span>
                <IconButton className={classes.backButton} onClick={() => setIsSearchActive((prev) => !prev)}>
                  <ChatSearchIcon />
                </IconButton>
              </section>
            </section>

            <div className={`${classes.subTitleWrapper}`}>
              {currentlyTypingUser && (
                <section className={`${classes.subTitle} ${commonClasses.caption12Regular}`}>
                  {currentlyTypingUser} is typing...
                </section>
              )}
              <div className={`${classes.surveyDetails}`}>
                {surveyCountData.totalSurveyCollections > 0 &&
                  surveyCountData.pendingSurveyCollections > 0 &&
                  !isFetchingSurveyData && (
                    <div>
                      {surveyCountData.pendingSurveyCollections}/{surveyCountData.totalSurveyCollections} threads pending.
                      <strong className={''} onClick={() => setChatFilterType(ChatFilters.SURVEY)}>
                        Show
                      </strong>
                    </div>
                  )}
              </div>
            </div>
          </>
        )}
      </div>
      {/* sub header */}
      {!isSearchActive && (
        <div className={`${classes.IconsTab}`}>
          <span
            className={`${classes.eachIocn} ${chatFilterType === ChatFilters.ALL ? classes.selectedTab : ''}`}
            onClick={() => setChatFilterType(ChatFilters.ALL)}
          >
            <ChatIcon />
          </span>
          <span
            className={
              disableNavIcons
                ? `${classes.disableIcon}`
                : `${classes.eachIocn} ${selectedChatTab === 'EDUCATION_TAB' ? classes.selectedTab : ''}`
            }
          >
            <EducationIcon />
          </span>
          <span
            className={
              disableNavIcons
                ? `${classes.disableIcon}`
                : `${classes.eachIocn} ${selectedChatTab === 'NUTRIENTS_TAB' ? classes.selectedTab : ''}`
            }
          >
            <RecipeIconDark />
          </span>
          <span
            className={
              disableNavIcons
                ? `${classes.disableIcon}`
                : `${classes.eachIocn} ${selectedChatTab === 'RECIPE_TAB' ? classes.selectedTab : ''}`
            }
          >
            <NutrientsIcon />
          </span>
          <span
            className={`${classes.eachIocn} ${chatFilterType === ChatFilters.SURVEY ? classes.selectedTab : ''}`}
            onClick={() => setChatFilterType(ChatFilters.SURVEY)}
          >
            <SurveyIcon />
          </span>
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatHeader);
