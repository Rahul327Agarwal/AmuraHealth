import { Avatar } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './SubSummaryPannel.styles';
import { IProps, Reference } from './SubSummaryPannel.types';
import SummarySubSnippet from './SummarySubSnippet/SummarySubSnippet';

const StaffSummaryPanel = (props: IProps) => {
  const { data, onSnippetClick } = props;
  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();
  const [showOptions, setShowOptions] = useState(true);
  const [allData, setAllData] = useState<any>(data.Synopsis || {});
  const [lessData, setLessData] = useState({} as any);
  const [moreData, setMoreData] = useState({} as any);

  useEffect(() => {
    setAllData(data?.Synopsis);
  }, [data.Synopsis]);
  useEffect(() => {
    let genderData = `${allData?.Age}${allData?.Gender ? '/' : ''}${allData?.Gender}*`;
    //console.log(genderData);

    let DateOfBirth =
      allData.DateOfBirth && new Date(allData.DateOfBirth).toString() !== 'Invalid Date'
        ? `${format(new Date(allData.DateOfBirth), 'dd/MM/yyyy')}`
        : '';
    //console.log(DateOfBirth)
    const cloneData = JSON.parse(JSON.stringify(data?.Synopsis));
    if (DateOfBirth) {
      cloneData.DateOfBirth = DateOfBirth;
    }
    if (genderData) {
      cloneData.genderData = genderData;
    }
    if (allData?.PreferredLanguages) {
      let languages = allData.PreferredLanguages.join && allData.PreferredLanguages.join(', ');
      cloneData['PreferredLanguages'] = languages;
    }
    const filteredName = Object.keys(cloneData).filter((value) => cloneData[value]);
    setAllData(cloneData);
    const removeunwantedData = [
      'employeeId',
      'City',
      'Mobile',
      'EMail',
      'DateOfBirth',
      // 'createdOn',
      'bloodGroup',
      'emergencyContact',
    ];
    // setMoreData(JSON.parse(JSON.stringify(removeunwantedData)));
    setLessData(JSON.parse(JSON.stringify(removeunwantedData)));
  }, [data]);
  return (
    <div className={classes.mainContainer}>
      {showOptions && lessData.length > 1 && (
        <div className={classes.dataContainer}>
          <div className={classes.optionscontainer}>
            {lessData.map((data: any) => (
              <SummarySubSnippet
                icon={(Reference as any)[`${data}`]?.icon}
                title={(Reference as any)[`${data}`]?.displayName}
                textValue={allData[`${data}`]}
                onClick={props.onSnippetClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default StaffSummaryPanel;
