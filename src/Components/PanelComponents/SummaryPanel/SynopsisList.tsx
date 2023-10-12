import React from 'react';
import { FragileBordered, GenderIcon, GlobeIcon, NormalHealth, SummaryIcon, VegIcon } from './SummaryPanel.svg';
import { useStyles } from './SummaryPanel.styles';
import { synopsisListprops } from './SummaryPanel.types';
import SynopsisItem from './SynopsisItem';

const SynopsisList = (props: synopsisListprops) => {
  const { classes } = useStyles();
  const { data } = props;
  const { Synopsis } = data;
  let genderData = `${Synopsis?.Gender}${Synopsis?.Age ? '/' : ''}${Synopsis?.Age}`;
  return (
    <ul className={classes.listingWrap}>
      <SynopsisItem icon={<GenderIcon />} heading={genderData} />
      <SynopsisItem icon={<VegIcon />} heading={Synopsis?.DietPreference} />
      <SynopsisItem icon={<GlobeIcon />} heading={Synopsis?.Nationality} />
      <SynopsisItem
        icon={Synopsis?.HealthType === 'Fragile' ? <FragileBordered /> : <NormalHealth />}
        heading={Synopsis?.HealthType}
      />
      <SynopsisItem icon={<SummaryIcon />} heading={Synopsis?.Location} />
    </ul>
  );
};

export default SynopsisList;
