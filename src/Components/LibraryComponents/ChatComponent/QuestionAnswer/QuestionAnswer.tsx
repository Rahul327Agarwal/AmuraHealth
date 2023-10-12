import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { DescriptionIcon, HeadingIcon, QuestionIcon, ResponseNewIcon } from '../../../SVGs/Common';

import { useStyles } from './QuestionAnswer.styles';
import { QuestionAnswerProps } from './QuestionAnswer.types';
const ICON_OBJECT = {
  heading: <HeadingIcon />,
  collectionName: <HeadingIcon />,
  title: <HeadingIcon />,
  description: <DescriptionIcon />,
  welcomeMessage: <DescriptionIcon />,
  thankYouMessage: <DescriptionIcon />,
  response: <ResponseNewIcon />,
};
const QuestionAnswer = (props: QuestionAnswerProps) => {
  const { question, iconType } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const isAnswer = false;

  return (
    <section className={classes.qaSection}>
      <main className={classes.qaBox}>
        <div
          className={
            isAnswer
              ? `${commonClasses.caption12Medium} ${classes.question1}`
              : `${commonClasses.body17Medium} ${classes.question2}`
          }
        >
          <span>{ICON_OBJECT[iconType as keyof typeof ICON_OBJECT] || <QuestionIcon />}</span> <span> {question}</span>
        </div>
        {isAnswer && <div className={`${commonClasses.body15Regular} ${classes.answer}`}>Yeah I have cough and headache</div>}
      </main>
      {isAnswer && <footer className={`${commonClasses.caption12Regular} ${classes.qaFooter}`}>Done at 09:34 AM</footer>}
    </section>
  );
};

export default QuestionAnswer;
