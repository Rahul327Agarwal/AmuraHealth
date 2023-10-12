import React from 'react';
import { IProps } from './SensitivityHistory.types';
import { getFormattedDate } from '../../../../Common/Common.functions';
import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  spanOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
}));
export const SensitivityHistory: React.FC<IProps> = (props) => {
  const { classes } = useStyles();
  let updatedOn = getFormattedDate(props.updatedOn);
  const { panelWidth, sensitivityDescription, isExpanded } = props;
  return (
    <div style={{ padding: '6px 0px' }}>
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
            <span>{sensitivityDescription}</span>
          </div>
        </div>
      )}
    </div>
  );
};
