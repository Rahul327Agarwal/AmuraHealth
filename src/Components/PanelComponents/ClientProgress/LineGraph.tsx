import React from 'react';

import { Line } from 'react-chartjs-2';
import { makeStyles } from 'tss-react/mui';
import { DefaultOptions } from './ClientProgress.types';
import { PMS_LOCALE } from '../../../Utils';

interface IProps {
  isDisabled: boolean;
  buttonProps: any;
  title: string;
  data: any;
  messageProps?: string;
}

const useStyles = makeStyles()(() => ({
  chartText: {
    fontWeight: 500,
    fontSize: '16px',
  },

  rootChart: {
    borderBottom: '1px solid #595A5A',
    margin: '12px',
    color: '#252427',
    '&:hover': {
      color: '#252427',
    },
  },

  chartHeader: {
    display: 'grid',
    gridTemplateColumns: '80% 20%',
  },
}));
export default function LineGraph(props: IProps) {
  const { buttonProps, title, data, messageProps, isDisabled } = props;
  const { classes } = useStyles();
  return (
    <>
      {isDisabled ? (
        <div key={title} className={classes.rootChart}>
          <div className={classes.chartHeader}>
            <div className={classes.chartText}>
              {PMS_LOCALE.translate(title)}
              <span style={{ marginLeft: '15px' }}>{messageProps ? messageProps : ''}</span>
            </div>
            {buttonProps}
          </div>
          <Line
            key={`Chart-${title}`}
            height={120}
            // TODO: type="line"
            options={DefaultOptions}
            data={JSON.parse(JSON.stringify(data))}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
