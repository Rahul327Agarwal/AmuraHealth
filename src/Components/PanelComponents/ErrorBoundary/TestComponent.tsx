import React from "react";
import TimeManagementHome from "../TimeManagement/TimeManagementHome";
// import TimeManagementHome from '../LibraryComponentsNew/TimeManagement/TimeManagementHome';
import ErrorBoundary from "./ErrorBoundary";
import ErrorScreen from "./ErrorScreen/ErrorScreen";

export default function TestComponent() {
  return (
    <ErrorBoundary fallbackUI={<ErrorScreen />}>
      <TimeManagementHome
        selectedClient={undefined}
        sessions={undefined}
        childEventTrigger={undefined}
        panel={undefined}
      />
    </ErrorBoundary>
  );
}
