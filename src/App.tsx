import { Component, type ErrorInfo, type ReactNode } from "react";
import MonteLanding from "./components/monte/MonteApp";

type AppErrorBoundaryState = {
  error: Error | null;
};

class AppErrorBoundary extends Component<{ children: ReactNode }, AppErrorBoundaryState> {
  override state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Monte page failed to render", error, info.componentStack);
  }

  override render() {
    if (this.state.error) {
      return (
        <main className="min-h-screen bg-background p-8 text-foreground">
          <h1 className="text-xl font-semibold">Monte could not load</h1>
          <p className="mt-2 text-sm text-muted-foreground">{this.state.error.message}</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <MonteLanding />
    </AppErrorBoundary>
  );
}
