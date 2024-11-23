import React from "react";
// ... existing code ...

// Error boundary component
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Layout Error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ textAlign: "center", padding: "2rem" }}>
					Something went wrong. Please try refreshing the page.
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;