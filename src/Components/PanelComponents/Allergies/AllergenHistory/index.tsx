import React from 'react';
import { IProps } from './AllergenHistory.types';
import { makeStyles } from 'tss-react/mui';
import { getFormattedDate } from './../../../../Common/Common.functions';

const useStyles = makeStyles()({
  spanOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
});
export const AllergenHistory: React.FC<IProps> = (props) => {
  const { classes } = useStyles();
  let updatedOn = getFormattedDate(props.updatedOn);
  const { panelWidth, isExpanded } = props;
  return (
    <div style={{ padding: '6px 0px' }} key={props.key}>
      {updatedOn && (
        <div
          className=""
          key={props.key}
          style={{
            display: 'grid',
            gridGap: '1.5%',
            gridTemplateColumns: panelWidth && parseFloat(panelWidth) > 376 ? '23% 68% 6%' : '26% 56% 15%',
          }}
        >
          <div>
            <span>{updatedOn}</span>
          </div>
          <div className={isExpanded ? '' : classes.spanOverflow}>
            <span>{props.AllergenDescription}</span>
          </div>
        </div>
      )}
    </div>
  );
};
