import React from "react";

// Simple loading component
const LoadingSpinner = () => (
	<div style={{ textAlign: "center", padding: "2rem", fontSize: "1.2rem", color: "#666" }}>
		Loading<span style={{ animation: "spin 1s linear infinite" }}>...</span>
	</div>
);

export default LoadingSpinner;
