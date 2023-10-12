import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingScreen from '../Components/PanelComponents/ErrorBoundary/ErrorScreen/LoadingScreen';
import AuthProvider from '../Components/Registration/RegistrationProvider';

const RegisterStaff = lazy(() => import('../Components/Registration/Staff/Login'));
const SchedularCall = lazy(() => import('../Components/LibraryComponents/NewCallSchedulerWizard/NewCallSchedulerWizard'));
const PrescriptionPage = lazy(() => import('../Components/PanelComponents/Prescription/PrescriptionPage'));
const RegisterThankYoupage = lazy(() => import('../Components/Registration/Thankyou/Login'));
const Register = lazy(() => import('../Components/Registration/RegisterUserWithoutOTP/Register'));
const NewLogin = lazy(() => import('../Components/Registration/Login/Login'));
const NewVerify = lazy(() => import('../Components/Registration/Verify/Verify'));
const GCDashboard = lazy(() => import('../Components/LibraryComponents/GCDashboard/GCDashboard'));
const DisplayFramework = lazy(() => import('../DisplayFramework/DisplayFramework'));

export default function AppRoutes() {
  const commonRoutes = (
    <>
      <Route path="/staff" element={<RegisterStaff />} />
      <Route path="/scheduleACall" element={<SchedularCall />} />
      <Route path="/PrescriptionPage" element={<PrescriptionPage />} />
      <Route path="/thankYou" element={<RegisterThankYoupage />} />
      <Route path="/refer" element={<Register />} />
    </>
  );

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider
        noAuthChildren={
          <Routes>
            <Route path="*" element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<NewLogin />} />
            <Route path="/verify" element={<NewVerify />} />
            {commonRoutes}
            {/*  */}
            {/* <Route path="/signUp" element={<NewSignUp />} /> */}
            {/* <Route path="/personalInfo" element={<PersonalInformation />} /> */}
            {/* <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
          </Routes>
        }
      >
        <Routes>
          <Route path="*" element={<Navigate to={'/home'} />} />
          <Route path="/home" element={<DisplayFramework />} />
          <Route path="/LeadsDashboard" element={<GCDashboard />} />
          {commonRoutes}
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}
