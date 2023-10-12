import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { id } from 'date-fns/locale';
import { amura_consulting_physician } from './AccessPermissions/AmuraConsultingPhysician';
import { L1HealthCoach, L2HealthCoach } from './AccessPermissions/AmuraHealthCoach';
import { HR, HrLevel1, TalentAcquisitionLevel1 } from './AccessPermissions/AmuraHR';
import { L1TeamAssigner } from './AccessPermissions/AmuraTeamAssigner';
import { L1TreatingDoctor, L2TreatingDoctor } from './AccessPermissions/AmuraTreatingDoctor';
import { DataEntryRoles } from './AccessPermissions/DataEntryRoles';
import { Amura_CEO } from './AccessPermissions/AmuraCEO';
import { L1DiagnosticDoctor } from './AccessPermissions/AmuraDiagnosticDoctor';
import { BasicUser } from './BasicUser';

const AccessSlice = createSlice({
  name: 'Chat',
  initialState: {
    //'L3 - Intake Doctor_TA': { Summary:{  "Summary.Bulk": "Clickable"} },
    roleToClient: '',
    accessPermissionsForThisClient: {} as any,
    accessPermissions: {
      'basic-user': BasicUser,
      amura_consulting_physician: amura_consulting_physician,
      'L1 - Treating Doctor': L1TreatingDoctor,
      'L2 - Treating Doctor': L2TreatingDoctor,
      'L3 - Treating Doctor': L2TreatingDoctor,
      'L1 - Health Coach': L1HealthCoach,
      'L2 - Health Coach': L2HealthCoach,
      'L3 - Health Coach': L2HealthCoach,
      'L4 - Health Coach': L2HealthCoach,
      'L1 - Diagnostic Doctor': L1DiagnosticDoctor,

      Amura_CEO_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L1 - Diagnostic Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L1 - Health Coach_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L1 - Intake Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },

      'L1 - Treating Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      L1_dataentry_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L2 - Diagnostic Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L2 - Health Coach_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L2 - Intake Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L2 - Treating Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      L2_HEC_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      L2_Limitless_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      L2_dataentry_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L3 - Diagnostic Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L3 - Health Coach_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L3 - Intake Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L3 - Treating Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      L3_dataentry_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L4 - Diagnostic Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L4 - Intake Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      'L4 - Treating Doctor_TA': { Summary: { 'Summary.Bulk': 'Clickable' } },
      amura_consulting_physician_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      amura_guidance_counselor_level1_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      amura_guidance_counselor_level2_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      hr_level1_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },
      talent_acquisition_level1_TA: { Summary: { 'Summary.Bulk': 'Clickable' } },

      'L2 - Diagnostic Doctor': amura_consulting_physician,
      'L3 - Diagnostic Doctor': amura_consulting_physician,
      'L4 - Diagnostic Doctor': amura_consulting_physician,
      'L1 - Intake Doctor': L1TreatingDoctor,
      'L2 - Intake Doctor': L2TreatingDoctor,
      'L3 - Intake Doctor': L2TreatingDoctor,
      'L1 - Team Assigner': L1TeamAssigner,
      hr_level1: HrLevel1,
      HR_Level1: HrLevel1,
      talent_acquisition_level1: TalentAcquisitionLevel1,
      HR: HR,
      'be7f1559-a300-4ad3-83fa-521c7845464a': DataEntryRoles,
      L1_dataentry: DataEntryRoles,
      L2_dataentry: DataEntryRoles,
      L3_dataentry: DataEntryRoles,
      L3_Limitless: amura_consulting_physician,
      L2_Limitless: amura_consulting_physician,
      L1_Limitless: amura_consulting_physician,
      L1_HEC: amura_consulting_physician,
      L2_HEC: amura_consulting_physician,
      L3_HEC: amura_consulting_physician,
      Amura_CEO: Amura_CEO,
      amura_primary_health_coach: {
        Allergies: {
          Allergies: 'Viewable',
          'Allergies.2A': 'Clickable',
          'Allergies.1': 'Viewable',
          'Allergies.2': 'Viewable',
          'Allergies.3': 'Viewable',
          'Allergies.4': 'Viewable',
          'Allergies.5': 'Viewable',
          'Allergies.3A': 'Clickable',
        },
        Calendar: {
          Calendar: 'Viewable',
          'Calendar.1': 'Viewable',
          'Calendar.2': 'Viewable',
          'Calendar.3': 'Viewable',
          'Calendar.1A': 'Viewable',
          'Calendar.1B': 'Clickable',
          'Calendar.1C': 'Clickable',
          'Calendar.1D': 'Clickable',
          'Calendar.1E': 'Viewable',
        },
        Diagnosis: {
          Diagnosis: 'Viewable',
          'Diagnosis.1': 'Viewable',
          'Diagnosis.2': 'Viewable',
          'Diagnosis.3': 'Hidden',
          'Diagnosis.3A': 'Hidden',
          'Diagnosis.3B': 'Hidden',
          'Diagnosis.1C': 'Viewable',
          'Diagnosis.1D': 'Viewable',
          'Diagnosis.1E': 'Viewable',
        },
        FoodSensitivities: {
          FoodSensitivities: 'Viewable',
          'FoodSensitivities.1': 'Viewable',
          'FoodSensitivities.2': 'Viewable',
          'FoodSensitivities.3': 'Viewable',
          'FoodSensitivities.4': 'Viewable',
          'FoodSensitivities.5': 'Viewable',
          'FoodSensitivities.3A': 'Clickable',
          'FoodSensitivities.2A': 'Clickable',
        },
        PrescriptionGenerate: {
          PrescriptionGenerate: 'Hidden',
          'PrescriptionGenerate.1': 'Hidden',
          'PrescriptionGenerate.2': 'Hidden',
          'PrescriptionGenerate.3': 'Hidden',
          'PrescriptionGenerate.4': 'Hidden',
          'PrescriptionGenerate.5': 'Hidden',
          'PrescriptionGenerate.6': 'Hidden',
        },
        PrescriptionHistory: {
          PrescriptionHistory: 'Viewable',
          'PrescriptionHistory.1': 'Viewable',
          'PrescriptionHistory.2': 'Viewable',
          'PrescriptionHistory.2A': 'Viewable',
          'PrescriptionHistory.2B': 'Clickable',
        },
        PrescriptionView: {
          PrescriptionView: 'Viewable',
          'PrescriptionView.1': 'Viewable',
          'PrescriptionView.2': 'Viewable',
          'PrescriptionView.3': 'Viewable',
          'PrescriptionView.4': 'Viewable',
          'PrescriptionView.5': 'Viewable',
          'PrescriptionView.6': 'Viewable',
          'PrescriptionView.6A': 'Viewable',
          'PrescriptionView.6B': 'Viewable',
          'PrescriptionView.6C': 'Disabled',
          'PrescriptionView.5A': 'Clickable',
        },
        ReportEntry: {
          ReportEntry: 'Hidden',
          'ReportEntry.1': 'Viewable',
          'ReportEntry.2': 'Clickable',
          'ReportEntry.3': 'Clickable',
          'ReportEntry.4': 'Clickable',
          'ReportEntry.5A': 'Clickable',
          'ReportEntry.5B': 'Hidden',
          'ReportEntry.5C': 'Clickable',
          'ReportEntry.5D': 'Hidden',
          'ReportEntry.5E': 'Hidden',
        },
        ReportsBrowse: {
          ReportsBrowse: 'Viewable',
          'ReportsBrowse.2': 'Viewable',
          'ReportsBrowse.3': 'Viewable',
          'ReportsBrowse.3A': 'Clickable',
          'ReportsBrowse.2A': 'Viewable',
          'ReportsBrowse.2A1': 'Clickable',
          'ReportsBrowse.2A2': 'Clickable',
        },
        Summary: {
          Summary: 'Viewable',
          'Summary.2A': 'Viewable',
          'Summary.2B': 'Viewable',
          'Summary.2C': 'Viewable',
          'Summary.2D': 'Viewable',
          'Summary.2E': 'Viewable',
          'Summary.2F': 'Viewable',
          'Summary.2G': 'Viewable',
          'Summary.2H': 'Viewable',
          'Summary.2I': 'Viewable',
          'Summary.2J': 'Viewable',
          'Summary.2K': 'Viewable',
          'Summary.2L': 'Hidden',
          'Summary.1': 'Viewable',
          'Summary.2': 'Viewable',
          'Summary.3': 'Viewable',
          'Summary.1C': 'Hidden',
          'Summary.3A': 'Clickable',
          'Summary.3B': 'Clickable',
          'Summary.3C': 'Clickable',
          'Summary.3D': 'Clickable',
          'Summary.3E': 'Clickable',
          'Summary.3F': 'Clickable',
          'Summary.3G': 'Clickable',
          'Summary.3I': 'Clickable',
          'Summary.3J': 'Clickable',
        },
        PatientBasicProfileDetails: {
          PatientBasicProfileDetails: 'Viewable',
          'PatientBasicProfileDetails.1': 'Viewable', //height
          'PatientBasicProfileDetails.2': 'Viewable', //weight
          'PatientBasicProfileDetails.3': 'Viewable', //DateOfBirth
          'PatientBasicProfileDetails.3A': 'Viewable', //date_of_birth
          'PatientBasicProfileDetails.4': 'Viewable', //Gender
          'PatientBasicProfileDetails.4A': 'Viewable', //genderData
          'PatientBasicProfileDetails.4B': 'Viewable', //userTypedGender
          'PatientBasicProfileDetails.4C': 'Viewable', //MedicallyModifiedGender
          'PatientBasicProfileDetails.5': 'Viewable', //HealthType
          'PatientBasicProfileDetails.6': 'Viewable', //ConditionsInterested
          'PatientBasicProfileDetails.7': 'Viewable', //FoodRestriction
          'PatientBasicProfileDetails.8': 'Viewable', //DietPreference
          'PatientBasicProfileDetails.9': 'Viewable', //Cuisine
          'PatientBasicProfileDetails.9A': 'Viewable', //cuisine
          'PatientBasicProfileDetails.10': 'Disabled', //PreferredLanguages
          'PatientBasicProfileDetails.10A': 'Disabled', //language_preference
          'PatientBasicProfileDetails.11': 'Viewable', //Mobile
          'PatientBasicProfileDetails.12': 'Disabled', //whatsAppNumber
          'PatientBasicProfileDetails.13': 'Disabled', //ResidingCountry
          'PatientBasicProfileDetails.14': 'Disabled', //Nationality
          'PatientBasicProfileDetails.15': 'Disabled', //location
          'PatientBasicProfileDetails.16': 'Disabled', //City
          'PatientBasicProfileDetails.17': 'Viewable', //EMail
          'PatientBasicProfileDetails.17A': 'Viewable', //email
          'PatientBasicProfileDetails.18': 'Viewable', //bloodGrp
          'PatientBasicProfileDetails.19': 'Disabled', //emergencyContact
          'PatientBasicProfileDetails.20': 'Disabled', //USDatabase
          'PatientBasicProfileDetails.21': 'Disabled', //SocialPlatforms
          'PatientBasicProfileDetails.22': 'Viewable', //sex
        },
        PrescriptionHistory2C: { PrescriptionHistory2C: 'Disabled' },
        InvestigationReports: { 'InvestigationReports.1': 'Viewable' },
      },
      amura_secondary_health_coach: {
        Allergies: {
          Allergies: 'Viewable',
          'Allergies.2A': 'Clickable',
          'Allergies.1': 'Viewable',
          'Allergies.2': 'Viewable',
          'Allergies.3': 'Viewable',
          'Allergies.4': 'Viewable',
          'Allergies.5': 'Viewable',
          'Allergies.3A': 'Clickable',
        },
        Calendar: {
          Calendar: 'Viewable',
          'Calendar.1': 'Viewable',
          'Calendar.2': 'Viewable',
          'Calendar.3': 'Viewable',
          'Calendar.1A': 'Viewable',
          'Calendar.1B': 'Clickable',
          'Calendar.1C': 'Clickable',
          'Calendar.1D': 'Clickable',
          'Calendar.1E': 'Viewable',
        },
        Diagnosis: {
          Diagnosis: 'Viewable',
          'Diagnosis.1': 'Viewable',
          'Diagnosis.2': 'Viewable',
          'Diagnosis.3': 'Hidden',
          'Diagnosis.3A': 'Hidden',
          'Diagnosis.3B': 'Hidden',
          'Diagnosis.1C': 'Viewable',
          'Diagnosis.1D': 'Viewable',
          'Diagnosis.1E': 'Viewable',
        },
        FoodSensitivities: {
          FoodSensitivities: 'Viewable',
          'FoodSensitivities.1': 'Viewable',
          'FoodSensitivities.2': 'Viewable',
          'FoodSensitivities.3': 'Viewable',
          'FoodSensitivities.4': 'Viewable',
          'FoodSensitivities.5': 'Viewable',
          'FoodSensitivities.3A': 'Clickable',
          'FoodSensitivities.2A': 'Clickable',
        },
        PrescriptionGenerate: {
          PrescriptionGenerate: 'Hidden',
          'PrescriptionGenerate.1': 'Hidden',
          'PrescriptionGenerate.2': 'Hidden',
          'PrescriptionGenerate.3': 'Hidden',
          'PrescriptionGenerate.4': 'Hidden',
          'PrescriptionGenerate.5': 'Hidden',
          'PrescriptionGenerate.6': 'Hidden',
        },
        PrescriptionHistory: {
          PrescriptionHistory: 'Viewable',
          'PrescriptionHistory.1': 'Viewable',
          'PrescriptionHistory.2': 'Viewable',
          'PrescriptionHistory.2A': 'Viewable',
          'PrescriptionHistory.2B': 'Clickable',
        },
        PrescriptionView: {
          PrescriptionView: 'Viewable',
          'PrescriptionView.1': 'Viewable',
          'PrescriptionView.2': 'Viewable',
          'PrescriptionView.3': 'Viewable',
          'PrescriptionView.4': 'Viewable',
          'PrescriptionView.5': 'Viewable',
          'PrescriptionView.6': 'Viewable',
          'PrescriptionView.6A': 'Viewable',
          'PrescriptionView.6B': 'Viewable',
          'PrescriptionView.6C': 'Disabled',
          'PrescriptionView.5A': 'Clickable',
        },
        ReportEntry: {
          ReportEntry: 'Hidden',
          'ReportEntry.1': 'Viewable',
          'ReportEntry.2': 'Clickable',
          'ReportEntry.3': 'Clickable',
          'ReportEntry.4': 'Clickable',
          'ReportEntry.5A': 'Clickable',
          'ReportEntry.5B': 'Hidden',
          'ReportEntry.5C': 'Clickable',
          'ReportEntry.5D': 'Hidden',
          'ReportEntry.5E': 'Hidden',
        },
        ReportsBrowse: {
          ReportsBrowse: 'Viewable',
          'ReportsBrowse.2': 'Viewable',
          'ReportsBrowse.3': 'Viewable',
          'ReportsBrowse.3A': 'Clickable',
          'ReportsBrowse.2A': 'Viewable',
          'ReportsBrowse.2A1': 'Clickable',
          'ReportsBrowse.2A2': 'Clickable',
        },
        Summary: {
          Summary: 'Viewable',
          'Summary.2A': 'Viewable',
          'Summary.2B': 'Viewable',
          'Summary.2C': 'Viewable',
          'Summary.2D': 'Viewable',
          'Summary.2E': 'Viewable',
          'Summary.2F': 'Viewable',
          'Summary.2G': 'Viewable',
          'Summary.2H': 'Viewable',
          'Summary.2I': 'Viewable',
          'Summary.2J': 'Viewable',
          'Summary.2K': 'Viewable',
          'Summary.2L': 'Hidden',
          'Summary.1': 'Viewable',
          'Summary.2': 'Viewable',
          'Summary.3': 'Viewable',
          'Summary.1C': 'Hidden',
          'Summary.3A': 'Clickable',
          'Summary.3B': 'Clickable',
          'Summary.3C': 'Clickable',
          'Summary.3D': 'Clickable',
          'Summary.3E': 'Clickable',
          'Summary.3F': 'Clickable',
          'Summary.3G': 'Clickable',
          'Summary.3I': 'Clickable',
          'Summary.3J': 'Clickable',
        },
        PatientBasicProfileDetails: {
          PatientBasicProfileDetails: 'Viewable',
          'PatientBasicProfileDetails.1': 'Viewable', //height
          'PatientBasicProfileDetails.2': 'Viewable', //weight
          'PatientBasicProfileDetails.3': 'Viewable', //DateOfBirth
          'PatientBasicProfileDetails.3A': 'Viewable', //date_of_birth
          'PatientBasicProfileDetails.4': 'Viewable', //Gender
          'PatientBasicProfileDetails.4A': 'Viewable', //genderData
          'PatientBasicProfileDetails.4B': 'Viewable', //userTypedGender
          'PatientBasicProfileDetails.4C': 'Viewable', //MedicallyModifiedGender
          'PatientBasicProfileDetails.5': 'Viewable', //HealthType
          'PatientBasicProfileDetails.6': 'Viewable', //ConditionsInterested
          'PatientBasicProfileDetails.7': 'Viewable', //FoodRestriction
          'PatientBasicProfileDetails.8': 'Viewable', //DietPreference
          'PatientBasicProfileDetails.9': 'Viewable', //Cuisine
          'PatientBasicProfileDetails.9A': 'Viewable', //cuisine
          'PatientBasicProfileDetails.10': 'Disabled', //PreferredLanguages
          'PatientBasicProfileDetails.10A': 'Disabled', //language_preference
          'PatientBasicProfileDetails.11': 'Viewable', //Mobile
          'PatientBasicProfileDetails.12': 'Disabled', //whatsAppNumber
          'PatientBasicProfileDetails.13': 'Disabled', //ResidingCountry
          'PatientBasicProfileDetails.14': 'Disabled', //Nationality
          'PatientBasicProfileDetails.15': 'Disabled', //location
          'PatientBasicProfileDetails.16': 'Disabled', //City
          'PatientBasicProfileDetails.17': 'Viewable', //EMail
          'PatientBasicProfileDetails.17A': 'Viewable', //email
          'PatientBasicProfileDetails.18': 'Viewable', //bloodGrp
          'PatientBasicProfileDetails.19': 'Disabled', //emergencyContact
          'PatientBasicProfileDetails.20': 'Disabled', //USDatabase
          'PatientBasicProfileDetails.21': 'Disabled', //SocialPlatforms
          'PatientBasicProfileDetails.22': 'Viewable', //sex
        },
        PrescriptionHistory2C: { PrescriptionHistory2C: 'Disabled' },
        InvestigationReports: { 'InvestigationReports.1': 'Viewable' },
      },
      amura_guidance_counselor_level1: {
        Mylist: {
          Mylist: 'Viewable',
          'Mylist.1': 'Clickable',
          'Mylist.2': 'Viewable',
        },
        Allergies: {
          Allergies: 'Viewable',
          'Allergies.2A': 'Disabled',
          'Allergies.1': 'Viewable',
          'Allergies.2': 'Viewable',
          'Allergies.3': 'Viewable',
          'Allergies.4': 'Hidden',
          'Allergies.5': 'Hidden',
          'Allergies.3A': 'Disabled',
        },
        Calendar: {
          Calendar: 'Viewable',
          'Calendar.1': 'Viewable',
          'Calendar.2': 'Viewable',
          'Calendar.3': 'Viewable',
          'Calendar.1A': 'Viewable',
          'Calendar.1B': 'Clickable',
          'Calendar.1C': 'Clickable',
          'Calendar.1D': 'Clickable',
          'Calendar.1E': 'Viewable',
        },
        Diagnosis: {
          Diagnosis: 'Viewable',
          'Diagnosis.1': 'Viewable',
          'Diagnosis.2': 'Viewable',
          'Diagnosis.3': 'Hidden',
          'Diagnosis.3A': 'Hidden',
          'Diagnosis.3B': 'Hidden',
          'Diagnosis.1C': 'Viewable',
          'Diagnosis.1D': 'Viewable',
          'Diagnosis.1E': 'Viewable',
        },
        FoodSensitivities: {
          FoodSensitivities: 'Viewable',
          'FoodSensitivities.1': 'Viewable',
          'FoodSensitivities.2': 'Viewable',
          'FoodSensitivities.3': 'Viewable',
          'FoodSensitivities.4': 'Hidden',
          'FoodSensitivities.5': 'Hidden',
          'FoodSensitivities.3A': 'Disabled',
          'FoodSensitivities.2A': 'Disabled',
        },
        PrescriptionGenerate: {
          PrescriptionGenerate: 'Hidden',
          'PrescriptionGenerate.1': 'Hidden',
          'PrescriptionGenerate.2': 'Hidden',
          'PrescriptionGenerate.3': 'Hidden',
          'PrescriptionGenerate.4': 'Hidden',
          'PrescriptionGenerate.5': 'Hidden',
          'PrescriptionGenerate.6': 'Hidden',
        },
        PrescriptionHistory: {
          PrescriptionHistory: 'Viewable',
          'PrescriptionHistory.1': 'Viewable',
          'PrescriptionHistory.2': 'Viewable',
          'PrescriptionHistory.2A': 'Viewable',
          'PrescriptionHistory.2B': 'Clickable',
        },
        PrescriptionView: {
          PrescriptionView: 'Viewable',
          'PrescriptionView.1': 'Viewable',
          'PrescriptionView.2': 'Viewable',
          'PrescriptionView.3': 'Viewable',
          'PrescriptionView.4': 'Viewable',
          'PrescriptionView.5': 'Viewable',
          'PrescriptionView.6': 'Viewable',
          'PrescriptionView.6A': 'Viewable',
          'PrescriptionView.6B': 'Viewable',
          'PrescriptionView.6C': 'Disabled',
          'PrescriptionView.5A': 'Clickable',
        },
        ReportEntry: {
          ReportEntry: 'Hidden',
          'ReportEntry.1': 'Viewable',
          'ReportEntry.2': 'Clickable',
          'ReportEntry.3': 'Clickable',
          'ReportEntry.4': 'Clickable',
          'ReportEntry.5A': 'Clickable',
          'ReportEntry.5B': 'Hidden',
          'ReportEntry.5C': 'Clickable',
          'ReportEntry.5D': 'Hidden',
          'ReportEntry.5E': 'Hidden',
        },
        ReportsBrowse: {
          ReportsBrowse: 'Viewable',
          'ReportsBrowse.2': 'Viewable',
          'ReportsBrowse.3': 'Viewable',
          'ReportsBrowse.3A': 'Disabled',
          'ReportsBrowse.2A': 'Viewable',
          'ReportsBrowse.2A1': 'Viewable',
          'ReportsBrowse.2A2': 'Clickable',
        },
        Summary: {
          Summary: 'Viewable',
          'Summary.2A': 'Viewable',
          'Summary.2B': 'Viewable',
          'Summary.2C': 'Viewable',
          'Summary.2D': 'Viewable',
          'Summary.2E': 'Viewable',
          'Summary.2F': 'Viewable',
          'Summary.2G': 'Viewable',
          'Summary.2H': 'Viewable',
          'Summary.2I': 'Viewable',
          'Summary.2J': 'Viewable',
          'Summary.2K': 'Viewable',
          'Summary.2L': 'Hidden',
          'Summary.1': 'Viewable',
          'Summary.2': 'Viewable',
          'Summary.3': 'Viewable',
          'Summary.1C': 'Hidden',
          'Summary.3A': 'Clickable',
          'Summary.3B': 'Clickable',
          'Summary.3C': 'Clickable',
          'Summary.3D': 'Clickable',
          'Summary.3E': 'Clickable',
          'Summary.3F': 'Clickable',
          'Summary.3G': 'Hidden',
          'Summary.3I': 'Clickable',
          'Summary.3J': 'Clickable',
        },
        PatientBasicProfileDetails: {
          PatientBasicProfileDetails: 'Viewable',
          'PatientBasicProfileDetails.1': 'Viewable', //height
          'PatientBasicProfileDetails.2': 'Viewable', //weight
          'PatientBasicProfileDetails.3': 'Viewable', //DateOfBirth
          'PatientBasicProfileDetails.3A': 'Viewable', //date_of_birth
          'PatientBasicProfileDetails.4': 'Viewable', //Gender
          'PatientBasicProfileDetails.4A': 'Viewable', //genderData
          'PatientBasicProfileDetails.4B': 'Viewable', //userTypedGender
          'PatientBasicProfileDetails.4C': 'Viewable', //MedicallyModifiedGender
          'PatientBasicProfileDetails.5': 'Viewable', //HealthType
          'PatientBasicProfileDetails.6': 'Viewable', //ConditionsInterested
          'PatientBasicProfileDetails.7': 'Viewable', //FoodRestriction
          'PatientBasicProfileDetails.8': 'Viewable', //DietPreference
          'PatientBasicProfileDetails.9': 'Viewable', //Cuisine
          'PatientBasicProfileDetails.9A': 'Viewable', //cuisine
          'PatientBasicProfileDetails.10': 'Disabled', //PreferredLanguages
          'PatientBasicProfileDetails.10A': 'Disabled', //language_preference
          'PatientBasicProfileDetails.11': 'Viewable', //Mobile
          'PatientBasicProfileDetails.12': 'Disabled', //whatsAppNumber
          'PatientBasicProfileDetails.13': 'Disabled', //ResidingCountry
          'PatientBasicProfileDetails.14': 'Disabled', //Nationality
          'PatientBasicProfileDetails.15': 'Disabled', //location
          'PatientBasicProfileDetails.16': 'Disabled', //City
          'PatientBasicProfileDetails.17': 'Viewable', //EMail
          'PatientBasicProfileDetails.17A': 'Viewable', //email
          'PatientBasicProfileDetails.18': 'Viewable', //bloodGrp
          'PatientBasicProfileDetails.19': 'Disabled', //emergencyContact
          'PatientBasicProfileDetails.20': 'Disabled', //USDatabase
          'PatientBasicProfileDetails.21': 'Disabled', //SocialPlatforms
          'PatientBasicProfileDetails.22': 'Viewable', //sex
        },
        PrescriptionHistory2C: { PrescriptionHistory2C: 'Disabled' },
        InvestigationReports: { 'InvestigationReports.1': 'Viewable' },
        RMPanel: {
          RMPanel: 'Clickable',
          'RMPanel.2': 'Clickable',
        },
      },
      amura_guidance_counselor_level2: {
        Mylist: {
          Mylist: 'Viewable',
          'Mylist.1': 'Clickable',
          'Mylist.2': 'Viewable',
        },
        Allergies: {
          Allergies: 'Viewable',
          'Allergies.2A': 'Disabled',
          'Allergies.1': 'Viewable',
          'Allergies.2': 'Viewable',
          'Allergies.3': 'Viewable',
          'Allergies.4': 'Hidden',
          'Allergies.5': 'Hidden',
          'Allergies.3A': 'Disabled',
        },
        Calendar: {
          Calendar: 'Viewable',
          'Calendar.1': 'Viewable',
          'Calendar.2': 'Viewable',
          'Calendar.3': 'Viewable',
          'Calendar.1A': 'Viewable',
          'Calendar.1B': 'Clickable',
          'Calendar.1C': 'Clickable',
          'Calendar.1D': 'Clickable',
          'Calendar.1E': 'Viewable',
        },
        Diagnosis: {
          Diagnosis: 'Viewable',
          'Diagnosis.1': 'Viewable',
          'Diagnosis.2': 'Viewable',
          'Diagnosis.3': 'Hidden',
          'Diagnosis.3A': 'Hidden',
          'Diagnosis.3B': 'Hidden',
          'Diagnosis.1C': 'Viewable',
          'Diagnosis.1D': 'Viewable',
          'Diagnosis.1E': 'Viewable',
        },
        FoodSensitivities: {
          FoodSensitivities: 'Viewable',
          'FoodSensitivities.1': 'Viewable',
          'FoodSensitivities.2': 'Viewable',
          'FoodSensitivities.3': 'Viewable',
          'FoodSensitivities.4': 'Hidden',
          'FoodSensitivities.5': 'Hidden',
          'FoodSensitivities.3A': 'Disabled',
          'FoodSensitivities.2A': 'Disabled',
        },
        PrescriptionGenerate: {
          PrescriptionGenerate: 'Hidden',
          'PrescriptionGenerate.1': 'Hidden',
          'PrescriptionGenerate.2': 'Hidden',
          'PrescriptionGenerate.3': 'Hidden',
          'PrescriptionGenerate.4': 'Hidden',
          'PrescriptionGenerate.5': 'Hidden',
          'PrescriptionGenerate.6': 'Hidden',
        },
        PrescriptionHistory: {
          PrescriptionHistory: 'Viewable',
          'PrescriptionHistory.1': 'Viewable',
          'PrescriptionHistory.2': 'Viewable',
          'PrescriptionHistory.2A': 'Viewable',
          'PrescriptionHistory.2B': 'Clickable',
        },
        PrescriptionView: {
          PrescriptionView: 'Viewable',
          'PrescriptionView.1': 'Viewable',
          'PrescriptionView.2': 'Viewable',
          'PrescriptionView.3': 'Viewable',
          'PrescriptionView.4': 'Viewable',
          'PrescriptionView.5': 'Viewable',
          'PrescriptionView.6': 'Viewable',
          'PrescriptionView.6A': 'Viewable',
          'PrescriptionView.6B': 'Viewable',
          'PrescriptionView.6C': 'Disabled',
          'PrescriptionView.5A': 'Clickable',
        },
        ReportEntry: {
          ReportEntry: 'Hidden',
          'ReportEntry.1': 'Viewable',
          'ReportEntry.2': 'Clickable',
          'ReportEntry.3': 'Clickable',
          'ReportEntry.4': 'Clickable',
          'ReportEntry.5A': 'Clickable',
          'ReportEntry.5B': 'Hidden',
          'ReportEntry.5C': 'Clickable',
          'ReportEntry.5D': 'Hidden',
          'ReportEntry.5E': 'Hidden',
        },
        ReportsBrowse: {
          ReportsBrowse: 'Viewable',
          'ReportsBrowse.2': 'Viewable',
          'ReportsBrowse.3': 'Viewable',
          'ReportsBrowse.3A': 'Disabled',
          'ReportsBrowse.2A': 'Viewable',
          'ReportsBrowse.2A1': 'Viewable',
          'ReportsBrowse.2A2': 'Clickable',
        },
        Summary: {
          Summary: 'Viewable',
          'Summary.2A': 'Viewable',
          'Summary.2B': 'Viewable',
          'Summary.2C': 'Viewable',
          'Summary.2D': 'Viewable',
          'Summary.2E': 'Viewable',
          'Summary.2F': 'Viewable',
          'Summary.2G': 'Viewable',
          'Summary.2H': 'Viewable',
          'Summary.2I': 'Viewable',
          'Summary.2J': 'Viewable',
          'Summary.2K': 'Viewable',
          'Summary.2L': 'Hidden',
          'Summary.1': 'Viewable',
          'Summary.2': 'Viewable',
          'Summary.3': 'Viewable',
          'Summary.1C': 'Hidden',
          'Summary.3A': 'Clickable',
          'Summary.3B': 'Clickable',
          'Summary.3C': 'Clickable',
          'Summary.3D': 'Clickable',
          'Summary.3E': 'Clickable',
          'Summary.3F': 'Clickable',
          'Summary.3G': 'Hidden',
          'Summary.3I': 'Clickable',
          'Summary.3J': 'Clickable',
        },
        PatientBasicProfileDetails: {
          PatientBasicProfileDetails: 'Viewable',
          'PatientBasicProfileDetails.1': 'Viewable', //height
          'PatientBasicProfileDetails.2': 'Viewable', //weight
          'PatientBasicProfileDetails.3': 'Viewable', //DateOfBirth
          'PatientBasicProfileDetails.3A': 'Viewable', //date_of_birth
          'PatientBasicProfileDetails.4': 'Viewable', //Gender
          'PatientBasicProfileDetails.4A': 'Viewable', //genderData
          'PatientBasicProfileDetails.4B': 'Viewable', //userTypedGender
          'PatientBasicProfileDetails.4C': 'Viewable', //MedicallyModifiedGender
          'PatientBasicProfileDetails.5': 'Viewable', //HealthType
          'PatientBasicProfileDetails.6': 'Viewable', //ConditionsInterested
          'PatientBasicProfileDetails.7': 'Viewable', //FoodRestriction
          'PatientBasicProfileDetails.8': 'Viewable', //DietPreference
          'PatientBasicProfileDetails.9': 'Viewable', //Cuisine
          'PatientBasicProfileDetails.9A': 'Viewable', //cuisine
          'PatientBasicProfileDetails.10': 'Disabled', //PreferredLanguages
          'PatientBasicProfileDetails.10A': 'Disabled', //language_preference
          'PatientBasicProfileDetails.11': 'Viewable', //Mobile
          'PatientBasicProfileDetails.12': 'Disabled', //whatsAppNumber
          'PatientBasicProfileDetails.13': 'Disabled', //ResidingCountry
          'PatientBasicProfileDetails.14': 'Disabled', //Nationality
          'PatientBasicProfileDetails.15': 'Disabled', //location
          'PatientBasicProfileDetails.16': 'Disabled', //City
          'PatientBasicProfileDetails.17': 'Viewable', //EMail
          'PatientBasicProfileDetails.17A': 'Viewable', //email
          'PatientBasicProfileDetails.18': 'Viewable', //bloodGrp
          'PatientBasicProfileDetails.19': 'Disabled', //emergencyContact
          'PatientBasicProfileDetails.20': 'Disabled', //USDatabase
          'PatientBasicProfileDetails.21': 'Disabled', //SocialPlatforms
          'PatientBasicProfileDetails.22': 'Viewable', //sex
        },
        PrescriptionHistory2C: { PrescriptionHistory2C: 'Disabled' },
        InvestigationReports: { 'InvestigationReports.1': 'Viewable' },
        RMPanel: {
          RMPanel: 'Clickable',
          'RMPanel.1': 'Clickable',
          'RMPanel.2': 'Clickable',
        },
      },
      '9d830acd-4853-48d7-bdf2-dabddcf7728a': {
        Allergies: {
          Allergies: 'Hidden',
          'Allergies.2A': 'Hidden',
          'Allergies.1': 'Hidden',
          'Allergies.2': 'Hidden',
          'Allergies.3': 'Hidden',
          'Allergies.4': 'Hidden',
          'Allergies.5': 'Hidden',
          'Allergies.3A': 'Hidden',
        },
        Calendar: {
          Calendar: 'Viewable',
          'Calendar.1': 'Viewable',
          'Calendar.2': 'Viewable',
          'Calendar.3': 'Viewable',
          'Calendar.1A': 'Viewable',
          'Calendar.1B': 'Clickable',
          'Calendar.1C': 'Clickable',
          'Calendar.1D': 'Clickable',
          'Calendar.1E': 'Viewable',
        },
        Diagnosis: {
          Diagnosis: 'Hidden',
          'Diagnosis.1': 'Hidden',
          'Diagnosis.2': 'Hidden',
          'Diagnosis.3': 'Hidden',
          'Diagnosis.3A': 'Hidden',
          'Diagnosis.3B': 'Hidden',
          'Diagnosis.1C': 'Hidden',
          'Diagnosis.1D': 'Hidden',
          'Diagnosis.1E': 'Hidden',
        },
        FoodSensitivities: {
          FoodSensitivities: 'Hidden',
          'FoodSensitivities.1': 'Hidden',
          'FoodSensitivities.2': 'Hidden',
          'FoodSensitivities.3': 'Hidden',
          'FoodSensitivities.4': 'Hidden',
          'FoodSensitivities.5': 'Hidden',
          'FoodSensitivities.3A': 'Hidden',
          'FoodSensitivities.2A': 'Hidden',
        },
        PrescriptionGenerate: {
          PrescriptionGenerate: 'Hidden',
          'PrescriptionGenerate.1': 'Hidden',
          'PrescriptionGenerate.2': 'Hidden',
          'PrescriptionGenerate.3': 'Hidden',
          'PrescriptionGenerate.4': 'Hidden',
          'PrescriptionGenerate.5': 'Hidden',
          'PrescriptionGenerate.6': 'Hidden',
        },
        PrescriptionHistory: {
          PrescriptionHistory: 'Hidden',
          'PrescriptionHistory.1': 'Hidden',
          'PrescriptionHistory.2': 'Hidden',
          'PrescriptionHistory.2A': 'Hidden',
          'PrescriptionHistory.2B': 'Hidden',
        },
        PrescriptionView: {
          PrescriptionView: 'Hidden',
          'PrescriptionView.1': 'Hidden',
          'PrescriptionView.2': 'Hidden',
          'PrescriptionView.3': 'Hidden',
          'PrescriptionView.4': 'Hidden',
          'PrescriptionView.5': 'Hidden',
          'PrescriptionView.6': 'Hidden',
          'PrescriptionView.6A': 'Hidden',
          'PrescriptionView.6B': 'Hidden',
          'PrescriptionView.6C': 'Hidden',
          'PrescriptionView.5A': 'Hidden',
        },
        ReportEntry: {
          ReportEntry: 'Hidden',
          'ReportEntry.1': 'Hidden',
          'ReportEntry.2': 'Hidden',
          'ReportEntry.3': 'Hidden',
          'ReportEntry.4': 'Hidden',
        },
        ReportsBrowse: {
          ReportsBrowse: 'Hidden',
          'ReportsBrowse.2': 'Hidden',
          'ReportsBrowse.3': 'Hidden',
          'ReportsBrowse.3A': 'Hidden',
          'ReportsBrowse.2A': 'Hidden',
          'ReportsBrowse.2A1': 'Hidden',
          'ReportsBrowse.2A2': 'Hidden',
        },
        Summary: {
          Summary: 'Viewable',
          'Summary.2A': 'Viewable',
          'Summary.2B': 'Viewable',
          'Summary.2C': 'Viewable',
          'Summary.2D': 'Viewable',
          'Summary.2E': 'Viewable',
          'Summary.2F': 'Hidden',
          'Summary.2G': 'Hidden',
          'Summary.2H': 'Viewable',
          'Summary.2I': 'Hidden',
          'Summary.2J': 'Viewable',
          'Summary.2K': 'Hidden',
          'Summary.2L': 'Viewable',
          'Summary.1': 'Viewable',
          'Summary.2': 'Viewable',
          'Summary.3': 'Viewable',
          'Summary.1C': 'Hidden',
          'Summary.3A': 'Hidden',
          'Summary.3B': 'Hidden',
          'Summary.3C': 'Hidden',
          'Summary.3D': 'Hidden',
          'Summary.3E': 'Hidden',
          'Summary.3F': 'Hidden',
          'Summary.3G': 'Hidden',
          'Summary.3I': 'Clickable',
          'Summary.3J': 'Clickable',
        },
        PrescriptionHistory2C: { PrescriptionHistory2C: 'Hidden' },
        InvestigationReports: { 'InvestigationReports.1': 'Hidden' },
        RMPanel: {
          RMPanel: 'Clickable',
          'RMPanel.1': 'Clickable',
          'RMPanel.2': 'Clickable',
        },
      },
    } as any,
  },
  reducers: {
    setRoleToClient: (state, action: PayloadAction<any>) => {
      state.roleToClient = action.payload;
      let accessPermissions = JSON.parse(JSON.stringify(state.accessPermissions));
      if (Object.keys(accessPermissions).length > 0 && accessPermissions[action.payload]) {
        state.accessPermissionsForThisClient = accessPermissions[action.payload];
      } else {
        state.accessPermissionsForThisClient = {};
      }
    },
    setAccessPermissionJSON: (state, action: PayloadAction<any>) => {
      state.accessPermissions = action.payload;
    },
  },
});
export const { setRoleToClient, setAccessPermissionJSON } = AccessSlice.actions;
export default AccessSlice.reducer;
