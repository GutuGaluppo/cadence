import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AppProviders } from "./app/providers/AppProvider";

type RuntimeGuardState = {
  error: Error | null;
};

class RuntimeGuard extends React.Component<
  React.PropsWithChildren,
  RuntimeGuardState
> {
  state: RuntimeGuardState = {
    error: null,
  };

  private handleWindowError = (event: ErrorEvent) => {
    this.setState({
      error: event.error instanceof Error
        ? event.error
        : new Error(event.message || "Unknown runtime error"),
    });
  };

  private handleRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;

    this.setState({
      error: reason instanceof Error
        ? reason
        : new Error(typeof reason === "string" ? reason : "Unhandled rejection"),
    });
  };

  static getDerivedStateFromError(error: Error): RuntimeGuardState {
    return { error };
  }

  componentDidMount() {
    window.addEventListener("error", this.handleWindowError);
    window.addEventListener("unhandledrejection", this.handleRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleWindowError);
    window.removeEventListener("unhandledrejection", this.handleRejection);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "#16171c",
            color: "#f5f5f5",
            fontFamily: "DM Sans, system-ui, sans-serif",
          }}
        >
          <div
            style={{
              width: "min(100%, 560px)",
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.72,
              }}
            >
              Runtime Error
            </p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
              {this.state.error.message}
            </p>
            {this.state.error.stack && (
              <pre
                style={{
                  margin: "14px 0 0",
                  whiteSpace: "pre-wrap",
                  fontSize: 11,
                  lineHeight: 1.5,
                  opacity: 0.84,
                }}
              >
                {this.state.error.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RuntimeGuard>
      <AppProviders>
        <App />
      </AppProviders>
    </RuntimeGuard>
  </React.StrictMode>,
);
