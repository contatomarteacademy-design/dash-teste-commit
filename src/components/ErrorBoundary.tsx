import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary-gray-light flex items-center justify-center p-6">
          <div className="bg-white rounded-xl p-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-primary-black mb-4">Erro ao carregar aplicação</h1>
            <p className="text-primary-gray-text mb-4">Ocorreu um erro ao renderizar a aplicação:</p>
            <pre className="bg-primary-gray-light p-4 rounded-lg text-sm overflow-auto">
              {this.state.error?.message || 'Erro desconhecido'}
              {this.state.error?.stack && (
                <div className="mt-2 text-xs opacity-75">{this.state.error.stack}</div>
              )}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary-black text-white rounded-lg hover:bg-opacity-90"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



