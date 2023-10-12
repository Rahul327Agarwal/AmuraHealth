import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { doesUserHaveViewAccess } from '../../../../Utilities/AccessPermissions';
import { FBSocial, InstaSocial, LinkedInSocial, TwitterSocial, UpArrowIcon, YoutubeSocial } from '../SummaryPanel.svg';
import { useStyles } from './SubSummaryPannel.styles';
import { IProps, Reference, optionsDetailsWithIDS, subSummaryOptions } from './SubSummaryPannel.types';
import SummarySubSnippet from './SummarySubSnippet/SummarySubSnippet';

const SubSummaryPannel = (props: IProps) => {
  const { data, onSnippetClick, SetSubSummaryLoaded } = props;

  const { classes } = useStyles();
  const CommonStyles = useCommonStyles();

  const [showOptions, setShowOptions] = useState(true);

  const [allData, setAllData] = useState<any>(data.Synopsis || {});
  const [lessData, setLessData] = useState({} as any);
  const [moreData, setMoreData] = useState({} as any);

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let optionsData = subSummaryOptions.filter((option) =>
    doesUserHaveViewAccess(accessPermissionsForThisClient, 'PatientBasicProfileDetails', optionsDetailsWithIDS[option])
  );
  useEffect(() => {
    SetSubSummaryLoaded && SetSubSummaryLoaded(false);
    let allData = JSON.parse(JSON.stringify(data.Synopsis || {}));
    let genderData = `${allData?.Age}${allData?.Age && allData?.Gender ? '/' : ''}${allData?.Gender}${
      allData?.isModifiedGender && (allData?.MedicallyModifiedGender || allData?.userTypedGender) ? ' >' : ''
    } ${allData?.MedicallyModifiedGender || ''} ${allData?.userTypedGender || ''}`;

    if (!allData?.Age && !allData?.Gender && !allData?.MedicallyModifiedGender && !allData?.userTypedGender) {
      genderData = '-';
    }
    let height = '';
    if (allData?.height && allData?.height.includes('~')) {
      let feet = allData?.height.split('~')[0];
      let inches = allData?.height.split('~')[1].split(' ')[0];
      height = inches && +inches !== 0 ? `${feet ? feet : 0}.${inches} Feet` : `${feet} Feet`;
    }
    let DateOfBirth =
      allData.DateOfBirth && new Date(allData.DateOfBirth).toString() !== 'Invalid Date'
        ? `${format(new Date(allData.DateOfBirth), 'yyyy-MM-dd')}`
        : '';

    const cloneData = JSON.parse(JSON.stringify(allData));
    if (DateOfBirth) {
      cloneData.DateOfBirth = DateOfBirth;
    }
    if (height) {
      cloneData.height = height;
    }
    if (genderData) {
      cloneData.genderData = genderData;
    }
    if (allData?.PreferredLanguages) {
      let languages = Array.isArray(allData.PreferredLanguages)
        ? allData.PreferredLanguages?.join(', ')
        : allData.PreferredLanguages;

      cloneData['PreferredLanguages'] = languages;
    }
    if (allData?.Cuisine && allData?.PreferredLanguages?.join) {
      let Cuisine = allData.Cuisine?.join && allData.Cuisine?.join(', ');
      cloneData['Cuisine'] = Cuisine;
    }
    const filteredName = Object.keys(cloneData).filter((value) => {
      return value;
    });
    // sort the keys in the order of dataOrder
    filteredName.sort((a, b) => {
      return optionsData.indexOf(a) - optionsData.indexOf(b);
    });

    let keys = [
      { value: 'facebookUrl', svg: <FBSocial /> },
      { value: 'twitterUrl', svg: <TwitterSocial /> },
      { value: 'instagramUrl', svg: <InstaSocial /> },
      { value: 'youtubeUrl', svg: <YoutubeSocial /> },
      { value: 'linkedInUrl', svg: <LinkedInSocial /> },
    ];
    let component = [];
    keys.forEach((key) => {
      if (cloneData[key.value]) {
        component.push(key.svg);
      }
    });
    cloneData.SocialPlatforms = <div style={{ display: 'flex', gap: '20px' }}>{component}</div>;

    setAllData(cloneData);
    setMoreData(optionsData);
    setLessData(optionsData.slice(0, 10));
  }, [data]);

  if (data.Synopsis.Error) {
    SetSubSummaryLoaded && SetSubSummaryLoaded(true);
    return <></>;
  }

  return (
    <div className={classes.mainContainer} onClick={onSnippetClick}>
      {showOptions && moreData.length === 1 && (
        <div className={classes.dataContainer}>
          <div className={classes.optionscontainer2}>
            {lessData.map((data: any) => (
              <SummarySubSnippet
                icon={(Reference as any)[`${data}`]?.icon}
                title={(Reference as any)[`${data}`]?.displayName}
                textValue={allData[`${data}`]}
                onClick={onSnippetClick}
              />
            ))}
            {SetSubSummaryLoaded && SetSubSummaryLoaded(true)}
          </div>
        </div>
      )}
      {showOptions && lessData.length > 1 && (
        <div className={classes.dataContainer}>
          <div className={classes.optionscontainer}>
            {lessData.map((data: any) => (
              <SummarySubSnippet
                icon={(Reference as any)[`${data}`]?.icon}
                title={(Reference as any)[`${data}`]?.displayName}
                textValue={allData[`${data}`]}
                onClick={onSnippetClick}
              />
            ))}
            {SetSubSummaryLoaded && SetSubSummaryLoaded(true)}
          </div>
        </div>
      )}
      {!showOptions && moreData.length > 1 && (
        <div className={classes.dataContainer}>
          <div className={classes.optionscontainer2}>
            {moreData.map((data: any) => (
              <SummarySubSnippet
                icon={(Reference as any)[`${data}`]?.icon}
                title={(Reference as any)[`${data}`]?.displayName}
                textValue={allData[`${data}`]}
                completeView={true}
                onClick={onSnippetClick}
              />
            ))}
            {SetSubSummaryLoaded && SetSubSummaryLoaded(true)}
          </div>

          <span
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            className={`${classes.showOtionStyle} ${CommonStyles.caption12Medium}`}
          >
            Show less {<UpArrowIcon />}
          </span>
        </div>
      )}
    </div>
  );
};
export default SubSummaryPannel;
