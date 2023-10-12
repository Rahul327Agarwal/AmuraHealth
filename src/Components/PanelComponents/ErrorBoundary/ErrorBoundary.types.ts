import { ReactNode } from "react";

export interface ErrorBoundaryProps {
  fallbackUI?: ReactNode;
  children?: any;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
