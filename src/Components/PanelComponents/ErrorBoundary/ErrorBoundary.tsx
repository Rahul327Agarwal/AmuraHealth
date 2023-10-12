import React from 'react';
import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';
import ErrorScreen from './ErrorScreen/ErrorScreen';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('!!ErrorBoundary', error);

    return { hasError: true };
  }

  //   componentDidCatch(error: Error, errorInfo: any) {
  //     console.log('!!error', error, errorInfo);
  //     this.setState({ hasError: true });
  //   }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI ?? <ErrorScreen />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
