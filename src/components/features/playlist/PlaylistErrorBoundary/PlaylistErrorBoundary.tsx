import { Component, ReactNode } from 'react';
import { getDerivedStateFromError, handleError, getDefaultFallback } from './PlaylistErrorBoundary.helpers';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class PlaylistErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError = getDerivedStateFromError;

    public componentDidCatch = handleError;

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || getDefaultFallback(() => this.setState({ hasError: false }));
        }

        return this.props.children;
    }
} 