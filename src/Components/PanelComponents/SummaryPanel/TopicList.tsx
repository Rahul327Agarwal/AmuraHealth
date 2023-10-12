import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCardInSummary } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import {
  AllergensIcon,
  Education,
  LogoutCircularIcon,
  PatientAsk,
  Protocol,
  RegistrationSnippetIcon,
  ReportsIcon,
  Roles,
  Sensitivity,
  SocialPlatformIcon,
} from './SummaryPanel.svg';
import { IRootState } from './../../../DisplayFramework/State/store';
import { doesUserHaveClickAccess, doesUserHaveViewAccess } from './../../../Utilities/AccessPermissions';
import { checkSocialPlatformData } from './SummaryPanel.function';
import { useStyles } from './SummaryPanel.styles';
import { ConditionIcon, NotesIcon } from './SummaryPanel.svg';
import { ISnippet, TopicListProps } from './SummaryPanel.types';
import TopicCard from './TopicCard';

const TopicList = (props: TopicListProps) => {
  const selectedCardInSummary = useSelector((state: IRootState) => state.dashboard.selectedCardInSummary);
  const loggedInUser = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const { data, itemClicked, selectedPanelName, setSelectedPanelName } = props;
  const dispatch = useDispatch();
  const handleClick = (value: string) => {
    setSelectedPanelName(value);
    dispatch(setSelectedCardInSummary(value));
    props.itemClicked(value);
  };

  useEffect(() => {
    setSelectedPanelName('');
  }, [props.patientId]);

  useEffect(() => {
    if (selectedCardInSummary === '') setSelectedPanelName('');
  }, [selectedCardInSummary]);

  const { Topics, Synopsis } = data;

  const { classes } = useStyles();
  const emptySnippet = {} as ISnippet;
  const allergen = data?.Topics?.Allergens ? data?.Topics?.Allergens : emptySnippet;
  const symptoms = data?.Topics?.Symptoms ? data?.Topics?.Symptoms : emptySnippet;
  const conditions = data?.Topics?.Conditions ? data?.Topics?.Conditions : emptySnippet;
  const foodSensitivities = data?.Topics?.FoodSensitivities ? data?.Topics?.FoodSensitivities : emptySnippet;
  const protocol = data?.Topics?.Protocol ? data?.Topics?.Protocol : emptySnippet;
  const education = data?.Topics?.education ? data?.Topics?.education : emptySnippet;

  const biomarkers = data?.Topics?.myReports ? data?.Topics?.myReports : [];

  const registration = data?.Topics?.registration?.Snippet ? data?.Topics?.registration?.Snippet : '';

  const roles = data?.Topics?.Roles?.amura ? data?.Topics?.Roles?.amura : '';
  const patientAsk = data?.Synopsis?.Objective || '';
  const notesdata = data?.Topics?.myNotes || '';
  const socialPlatformData = checkSocialPlatformData(Synopsis);
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );

  return (
    <div className={classes.featureWrap}>
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3N') && (
        <TopicCard
          icon={<Education />}
          heading={'Education'}
          description={education?.Snippet || '+ Add Details'}
          handleClick={() => {
            handleClick('Education');
          }}
          selected={selectedPanelName === 'Education'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3M') && (
        <TopicCard
          icon={<RegistrationSnippetIcon />}
          heading={'Registration with professional bodies'}
          description={registration || '+ Add Details'}
          handleClick={() => {
            handleClick('RegistrationSnippet');
          }}
          selected={selectedPanelName === 'RegistrationSnippet'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3J') && (
        <TopicCard
          icon={<PatientAsk />}
          heading={'Health Objective'}
          description={patientAsk || '+ Add Details'}
          handleClick={() => {
            handleClick('HealthObjective');
          }}
          selected={selectedPanelName === 'HealthObjective'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3I') && (
        <TopicCard
          icon={<NotesIcon />}
          heading={'Notes'}
          description={notesdata?.Snippet || '+ Add Details'}
          handleClick={() => {
            handleClick('notes');
          }}
          selected={selectedPanelName === 'notes'}
        />
      )}

      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3K') && (
        <TopicCard
          heading={'Amura mission'}
          description={'No Data' || '+ Add Details'}
          handleClick={() => {
            // handleClick(''); //'HealthObjective'
          }}
          selected={selectedPanelName === 'HealthObjective'}
          withoutIcon={true}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3A') && (
        <TopicCard
          icon={<ConditionIcon />}
          heading={'Conditions'}
          description={
            conditions.Snippet ||
            (!doesUserHaveClickAccess(accessPermissionsForThisClient, 'Diagnosis', 'Diagnosis.3B') ? 'No Data' : '+ Add Details')
          }
          handleClick={() => {
            handleClick('conditions');
          }}
          selected={selectedPanelName === 'conditions'}
        />
      )}

      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3B') && (
        <TopicCard
          icon={<AllergensIcon />}
          heading={'Allergens'}
          description={
            allergen.Snippet ||
            (!doesUserHaveClickAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.3A') ? 'No Data' : '+ Add Details')
          }
          handleClick={() => {
            handleClick('allergens');
          }}
          selected={selectedPanelName === 'allergens'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3C') && (
        <TopicCard
          icon={<Sensitivity />}
          heading={'Food Sensitivities'}
          description={
            foodSensitivities.Snippet ||
            (!doesUserHaveClickAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.3A')
              ? 'No Data'
              : '+ Add Details')
          }
          handleClick={() => {
            handleClick('foodSensitivities');
          }}
          selected={selectedPanelName === 'foodSensitivities'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3D') && (
        <TopicCard
          icon={<ReportsIcon />}
          heading={'Reports'}
          description={
            (biomarkers || []).map((ele) => ele).join(', ') ||
            (!doesUserHaveViewAccess(accessPermissionsForThisClient, 'ReportEntry', 'ReportEntry') ? 'No Data' : '+ Add Details')
          }
          handleClick={() => {
            handleClick('biomarkers');
          }}
          selected={selectedPanelName === 'biomarkers'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3G') && (
        <TopicCard
          icon={<Protocol />}
          heading={'Protocol'}
          description={protocol.Snippet || 'No Data'}
          handleClick={() => {
            handleClick('protocol');
          }}
          selected={selectedPanelName === 'protocol'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3H') && (
        <TopicCard
          icon={<Roles />}
          heading={'Roles'}
          description={roles || '+ Add Details'}
          handleClick={() => {
            handleClick('roles');
          }}
          selected={selectedPanelName === 'roles'}
        />
      )}
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Summary', 'Summary.3L') && (
        <TopicCard
          icon={<SocialPlatformIcon />}
          heading={'Social platforms'}
          description={socialPlatformData || '+ Add Details'}
          handleClick={() => {
            handleClick('SocialPlatforms');
          }}
          selected={selectedPanelName === 'SocialPlatforms'}
        />
      )}
      {loggedInUser.id === props.patientId && (
        <TopicCard
          icon={<LogoutCircularIcon />}
          heading={'Login & Logout'}
          description={'Mobile, Username, Email, Password'}
          handleClick={() => {
            handleClick('loginLogout');
          }}
          selected={selectedPanelName === 'loginLogout'}
        />
      )}
    </div>
  );
};

export default TopicList;
