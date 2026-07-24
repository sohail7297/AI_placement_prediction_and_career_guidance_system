import React from 'react';
import { AlertOctagon, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/Buttons';
import { Card } from '../ui/Cards';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full min-h-[300px] flex items-center justify-center p-6 font-sans">
          <Card glowColor="purple" hoverEffect={false} className="max-w-md w-full p-6 text-center space-y-4 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base font-bold font-heading text-white tracking-wide">
                Something went wrong
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                An unexpected rendering error occurred in this module. Our SDE engine intercepted it safely.
              </p>
            </div>

            {this.state.error && (
              <pre className="p-3 rounded bg-slate-950/80 border border-white/5 text-[10px] font-mono text-red-300 overflow-x-auto text-left max-h-24">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}

            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={this.handleReset}
                icon={<RefreshCcw className="w-3.5 h-3.5" />}
              >
                Reload Module
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
