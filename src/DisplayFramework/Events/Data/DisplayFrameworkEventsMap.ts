import { IEventMap } from '../DFEvents.types';

const displayFrameworkEventsMap = {
  HomeList: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyList',
      },
      {
        targetPanelName: 'T',
        targetComponentName: 'MyTeam',
      },
      {
        targetPanelName: 'M',
        targetComponentName: 'MySettingsNew',
      },
      // {
      //   targetPanelName: 'R',
      //   targetComponentName: 'MyRecipes',
      // },
    ],
  },
  MyList: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyList',
      },
    ],
  },
  onMyListSelect: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyList',
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
    ],
  },
  onSchedulerCalendar: {
    targetPanels: [
      {
        targetPanelName: 'R',
        targetComponentName: 'SchedulerCalendar',
      },
    ],
  },
  onSchedulerCalendarClose: {
    targetPanels: [
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onCancelEventEdit: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
    ],
  },
  onTimeMangement: {
    targetPanels: [
      {
        targetPanelName: 'C',
        targetComponentName: 'EventCreation',
      },
    ],
  },
  onChat: {
    targetPanels: [
      {
        targetPanelName: 'C',
        targetComponentName: 'Chat',
      },
    ],
  },

  // MyList
  onClientSelect: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'MyCustomer',
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'UnderConstruction', //'ClientProgress',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'Chat',
        DRank: 500,
      },
      {
        targetPanelName: 'R',
        targetComponentName: 'NameCardResources',
      },
    ],
  },
  onEventCardSelect: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'MyCustomer',
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'UnderConstruction', //'ClientProgress',
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
        DRank: 500,
      },
      {
        targetPanelName: 'R',
        targetComponentName: 'NameCardResources',
      },
    ],
  },
  // ReporteesMyList
  onReporteesClientSelect: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'MyCustomer',
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'UnderConstruction', //'ClientProgress',
      },
      // {
      //   targetPanelName: 'C',
      //   targetComponentName: 'Chat',
      //   DRank: 500,
      // },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  MyCustomer: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'MyCustomer',
      },
    ],
  },
  ClientProgress: {
    targetPanels: [
      {
        targetPanelName: 'D',
        targetComponentName: 'ClientProgress',
      },
    ],
  },

  // MyCustomer
  onReassignClientSelect: {
    targetPanels: [
      {
        targetPanelName: 'R',
        targetComponentName: 'CareTeam',
      },
    ],
  },
  onCloseUtilityPanel: {
    targetPanels: [
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },

  //
  //
  //
  //  Converted from old
  //
  //
  //

  onBotCardSelect: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyListOld',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      // {
      //  targetPanelName: 'D',
      //   targetComponentName: null,
      // },
    ],
  },
  onDistributionSelect: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'DistributionsList',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onCreateNewCard: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: 'DistributionsChat',
      },
    ],
  },
  showingEmpty: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
    ],
  },
  emptyAllPanels: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      {
        targetPanelName: 'R',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
    ],
  },

  onDistributionListCardClick: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'DistributionsSummary',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'D',
        targetComponentName: 'DistributionsPreview',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'DistributionsChat',
        DRank: 500,
      },
    ],
  },
  onAddDistributonCollection: {
    eventType: 'samePanelEvent',
    targetPanels: [
      // {
      //   targetPanelName: 'S',
      //   targetComponentName: 'DistributionsSummary',
      // },
      {
        targetPanelName: 'D',
        targetComponentName: 'DistributionsAddCollection',
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'DistributionsPreview',
      // },
      // {
      //   targetPanelName: 'C',
      //   targetComponentName: 'DistributionsChat',
      // },
    ],
  },
  onPhleboCardSelect: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PhlebotomyView',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'ClientProgress',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'Chat',
      },
    ],
  },
  HistorySummary: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'HistorySummary',
      },
    ],
  },
  onMyToolsClose: {
    targetPanels: [],
  },
  onMyTenantSelect: {
    targetPanels: [
      // {
      //   targetPanelName: 'H',
      //   targetComponentName: 'TenantList',
      // },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onMyListRefresh: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      {
        targetPanelName: 'R',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onRefreshReportee: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onMyListRefreshWithCustomerMinified: {
    targetPanels: [
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
    ],
  },
  onBotSelect: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'BotSummary',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'ClientProgress',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'Chat',
        DRank: 500,
      },
    ],
  },
  onCancelTenantAdd: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onAccordionChange: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onTenantAdd: {
    targetPanels: [
      // {
      //  targetPanelName: 'S',
      //   targetComponentName: 'RegisterTenant',
      // },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onAssignStafftoClient: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AssignStaff',
      // },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
    ],
  },
  onAssignmentClient: {
    targetPanels: [
      {
        targetPanelName: 'W',
        targetComponentName: 'CareTeam',
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'ClientProgress',
      },
    ],
  },
  onPostmanagementCardClick: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PostManagementSummary',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'D',
        targetComponentName: 'PostManagementPreview',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'PostChat',
        DRank: 500,
      },
    ],
  },
  onPostCollectionsCardClick: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PostCollectionsSummary',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'D',
        targetComponentName: 'PostCollectionPreview',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'PostCollectionChat',
        DRank: 500,
      },
    ],
  },
  onBackOfConfigureBranching: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PostCollectionsSummary',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'PostCollectionPreview',
        DRank: 500,
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'PostCollectionChat',
      },
    ],
  },
  // onBranchingToggle: {
  //   targetPanels: [
  //     {
  //       targetPanelName: 'S',
  //       targetComponentName: 'PostCollectionsSummary',
  //     },
  //     {
  //       targetPanelName: 'W',
  //       targetComponentName: null,
  //     },
  //     {
  //       targetPanelName: 'D',
  //       targetComponentName: 'PostCollectionPreview',
  //       DRank: 500,
  //     },
  //   ],
  // },
  AddPosts: {
    eventType: 'samePanelEvent',
    targetPanels: [
      // {
      //   targetPanelName: 'S',
      //   targetComponentName: 'PostCollectionsSummary',
      // },
      {
        targetPanelName: 'D',
        targetComponentName: 'PostCollectionAddPosts',
        DRank: 500,
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'PostCollectionPreview',
      },
      // {
      //   targetPanelName: 'C',
      //   targetComponentName: 'PostCollectionChat',
      // },
    ],
  },
  PostPreview1: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PostCollectionsSummary',
      },
      {
        targetPanelName: 'W',
        targetComponentName: 'PostPreview1',
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'PostCollectionPreview',
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'PostCollectionChat',
      },
    ],
  },
  onaddPostmanagementCard: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'PostChat',
      },
    ],
  },
  onaddPostCollectionCard: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: 'PostCollectionChat',
      },
    ],
  },
  onPostSelect: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'PostManagementList',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onPostsCollectionsSelect: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'PostCollections',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
    ],
  },
  onTeamAssignmentClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'ClientListTabs',
      // },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
    ],
  },
  onTeamAssignment: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AssignTeamAndSnippet',
      // },
    ],
  },
  onTeamAssignmentPlusClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'R',
      //   targetComponentName: 'DoctorCardList',
      // },
    ],
  },
  onTeamAssignmentConfirm: {
    targetPanels: [
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onAdminConditionAdd: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminConditionAdd',
      // },
    ],
  },
  onAdminConditionView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminConditionView',
      // },
    ],
  },
  onAdminBiomarkerAdd: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminBiomarkerAdd',
      // },
    ],
  },
  onCountryClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminCountryAdd',
      // },
    ],
  },
  onAdminCountryView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminCountryView',
      // },
    ],
  },
  onAdminBiomarkerView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminBiomarkerView',
      // },
    ],
  },
  onAdminBiomarkerGroupAdd: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminBiomarkerGroupAdd',
      // },
    ],
  },
  onAdminBiomarkerGroupView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminBiomarkerGroupView',
      // },
    ],
  },
  onAdminInvestigationTypeAdd: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminInvestigationTypeAdd',
      // },
    ],
  },
  onAdminInvestigationTypeView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminInvestigationTypeView',
      // },
    ],
  },
  onAdminCurrencyAdd: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminCurrencyAdd',
      // },
    ],
  },
  onAdminCurrenciesView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminCurrenciesView',
      // },
    ],
  },
  onCompleteStaffAdd: {
    targetPanels: [
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
    ],
  },
  onSelectTenant: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'MyTenant',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
    ],
  },
  onDiagnosticConditionSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'DiagnosticCondition',
        DRank: 500,
      },
      {
        targetPanelName: 'D',
        targetComponentName: 'UnderConstruction',
      },
    ],
  },

  onRolesSelect: {
    eventType: 'samePanelEvent',

    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'RolesBrowse',
      },
    ],
  },
  onAllergensSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'Allergens',
        DRank: 500,
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'ClientProgress',
      // },
    ],
  },
  onHealthObjective: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'HealthObjective',
        DRank: 500,
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'ClientProgress',
      // },
    ],
  },
  onFoodSensitivitiesSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'FoodSensitivities',
        DRank: 500,
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'ClientProgress',
      // },
    ],
  },
  onSymptomsSelect: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'Symptoms',
      // },
      {
        targetPanelName: 'D',
        targetComponentName: 'ClientProgress',
      },
    ],
  },
  EditReport: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'ReportAddEdit',
      },
    ],
  },
  onInvestigationReportSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'InvestigationReportsPanel',
        DRank: 500,
      },
    ],
  },
  onInvestigationReportSelectFrom4tH: {
    targetPanels: [
      {
        targetPanelName: 'W',
        targetComponentName: 'InvestigationReportsPanel',
      },
    ],
  },
  // RemoveReportDetailedPage: {
  //   targetPanels: [
  //     {
  //       targetPanelName: 'D',
  //       targetComponentName: 'ReportView',
  //     },
  //   ],
  // },
  onGeneratePrescriptionSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'GeneratePrescription',
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'ClientProgress',
      // },
    ],
  },
  onPrescriptionClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'Prescription',
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'Prescription',
      // },
    ],
  },
  onInvestigationReportEntrySelect: {
    targetPanels: [],
  },
  Fab: {
    targetPanels: [],
  },
  onMyProfileSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'ClientProfile',
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onPatientBasicProfileSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PatientBasicProfile',
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onPatientDetailedProfileSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PatientDetailedProfileHome',
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onPatientDetailedProfileEdit: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'PatientDetailedProfile',
      },
    ],
  },
  onSocialPlatformDetails: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'SocialProfileView',
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onSocialPlatformDetailsEdit: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'SocialProfileEditView',
      },
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onRoleClick: {
    targetPanels: [],
  },
  onSpecalityClick: {
    targetPanels: [],
  },
  onNutrientClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminNutrientAdd',
      // },
    ],
  },
  onNutrientGroup: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminNutrientGroupAdd',
      // },
    ],
  },
  onLanguageClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminLanguageAdd',
      // },
    ],
  },
  onAdminRoleView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminRoleView',
      // },
    ],
  },
  onAdminSpecalitiesView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminSpecalityView',
      // },
    ],
  },
  onAdminNutrientView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminNutrientView',
      // },
    ],
  },
  onAdminNutrientGroupView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminNutrientGroupView',
      // },
    ],
  },
  onAdminLanguageView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminLanguageView',
      // },
    ],
  },
  onIngredientView: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminIngredientView',
      // },
    ],
  },
  onIngredientClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'W',
      //   targetComponentName: 'AdminIngredientAdd',
      // },
    ],
  },
  onProtocolSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'HistoryPrescriptionView',
        DRank: 500,
      },
      // {
      //   targetPanelName: 'D',
      //   targetComponentName: 'ClientProgress',
      // },
    ],
  },
  onSurveySelect: {
    targetPanels: [
      // {
      //  targetPanelName: 'D',
      //   targetComponentName: 'Survey',
      // },
    ],
  },
  onFAQSelect: {
    targetPanels: [
      // {
      //  targetPanelName: 'D',
      //   targetComponentName: 'FAQ',
      // },
    ],
  },
  onAssignGCClick: {
    targetPanels: [
      // {
      //  targetPanelName: 'D',
      //   targetComponentName: 'AssignGC',
      // },
    ],
  },
  onProfileClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'auto',
        targetComponentName: 'MyProfile',
      },
    ],
  },
  onRecipeClick: {
    targetPanels: [
      // {
      //   targetPanelName: 'R',
      //   targetComponentName: 'MyRecipes',
      // },
    ],
  },
  onViewReport: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'ReportView',
      },
    ],
  },
  onPDFView: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'auto',
        targetComponentName: 'PDFViewer',
      },
    ],
  },
  onMediaPreview: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'auto',
        targetComponentName: 'MediaViewer',
      },
    ],
  },
  onReportClose: {
    targetPanels: [
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
    ],
  },
  onViewReportHistory: {
    targetPanels: [
      // {
      //   targetPanelName: 'R',
      //   targetComponentName: 'ReportEditHistory',
      // },
    ],
  },
  onNotesDiagnosticConditionSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'NotesBrowse',
      },
    ],
  },
  onNotesCardClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      // {
      //   targetPanelName: 'S',
      //   targetComponentName: 'NotesBrowse',
      // },
      {
        targetPanelName: 'S',
        targetComponentName: 'NoteHistory',
      },
    ],
  },
  onNoteEdit: {
    eventType: 'samePanelEvent',
    targetPanels: [
      // {
      //   targetPanelName: 'S',
      //   targetComponentName: 'NotesBrowse',
      // },
      {
        targetPanelName: 'S',
        targetComponentName: 'NotesAdd',
      },
    ],
  },
  onNoteAdd: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'NotesAdd',
      },
    ],
  },

  onNotesHistoryCancelSelect: {
    targetPanels: [
      {
        targetPanelName: 'D',
        targetComponentName: 'ClientProgress',
      },
    ],
  },
  onbulkReassignClick: {
    targetPanels: [
      // {
      //  targetPanelName: 'D',
      //   targetComponentName: 'BulkReassignment',
      // },
    ],
  },
  onEditRole: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'UserRoleAssignmentNew',
      },
    ],
  },
  onCancelRole: {
    targetPanels: [
      {
        targetPanelName: 'D',
        targetComponentName: 'UnderConstruction',
      },
    ],
  },
  onEventSelect: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'EventCardList',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'R',
        targetComponentName: 'SchedulerCalendar',
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onEventDelete: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'R',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onEventEditClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'auto',
        targetComponentName: 'EventCreation',
      },
    ],
  },
  onEventCancleClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'auto',
        targetComponentName: 'EventDetails',
      },
      {
        targetPanelName: 'S',
        targetComponentName: 'EventDetails',
      },
    ],
  },
  onEventCancleResourceClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'auto',
        targetComponentName: 'SchedulerCalendar',
      },
      // {
      //   targetPanelName: 'S',
      //   targetComponentName: 'EventDetails',
      // },
    ],
  },
  onEventCardClick: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'EventDetails',
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
      {
        targetPanelName: 'R',
        targetComponentName: 'SchedulerCalendar',
      },
    ],
  },
  onEventEditinResourceClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'R',
        targetComponentName: 'EventCreation',
      },
      // {
      //   targetPanelName: 'S',
      //   targetComponentName: null,
      // },
    ],
  },
  onEventCreactionClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'EventCreation',
      },
    ],
  },
  onCreateEventClick: {
    targetPanels: [
      {
        targetPanelName: 'W',
        targetComponentName: 'EventCreation',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
    ],
  },
  onCloseWorkPanelOnly: {
    targetPanels: [
      // {
      //      targetPanelName: 'R',
      //    targetComponentName: null,
      //},
    ],
  },
  onShowUsersPanel: {
    targetPanels: [
      {
        targetPanelName: 'R',
        targetComponentName: 'StaffListView',
      },
    ],
  },
  onReporteesList: {
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'ReporteesView',
      },
    ],
  },
  onBulkMoveCardClick: {
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'BulkSummaryPanel',
      },
    ],
  },
  onRegistrationSnippetClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'RegistrationsSnippet',
      },
    ],
  },
  onEducationSelect: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'EducationPanel',
      },
    ],
  },
  onReadyToAssignClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'BulkAssignmentList',
      },
    ],
  },
  onEmptyWorkPanel: {
    targetPanels: [
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
    ],
  },
  onBlueDotClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'BlueDotCards',
      },
    ],
  },
  onMyListManageStatusClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyListManageStatus',
      },
    ],
  },
  onMyListFilterCardClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyListFilterCard',
      },
    ],
  },
  onMyListManageTabClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyListManageTab',
      },
    ],
  },
  onMyListManageGroupClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MyListManageGroup',
      },
    ],
  },
  onReporteeCreateFilterClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'ReporteeCreateFilter',
      },
    ],
  },
  onReporteeFilterPanelClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'ReporteeFilterPanel',
      },
    ],
  },
  onMoveBtnClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'H',
        targetComponentName: 'MoveCardRequestHome',
      },
      {
        targetPanelName: 'S',
        targetComponentName: null,
      },
      {
        targetPanelName: 'W',
        targetComponentName: null,
      },
      {
        targetPanelName: 'C',
        targetComponentName: null,
      },
      {
        targetPanelName: 'D',
        targetComponentName: null,
      },
    ],
  },
  onModifyStaffClick: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'ChangeStaffMember',
      },
    ],
  },

  onNoResults: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'ChangeStaffMember',
      },
    ],
  },
  onManualChange: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'ChangeStaffMemberManual',
      },
    ],
  },
  onLoginLogoutSnippet: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'LoginLogoutSnippet',
      },
    ],
  },
  onAddRegistrationsSnippet: {
    eventType: 'samePanelEvent',
    targetPanels: [
      {
        targetPanelName: 'S',
        targetComponentName: 'AddRegistrationsSnippet',
      },
    ],
  },

  //
  //
  //
  //
  //
  //
} satisfies IEventMap;

export default displayFrameworkEventsMap;
export type IEventName = keyof typeof displayFrameworkEventsMap;
