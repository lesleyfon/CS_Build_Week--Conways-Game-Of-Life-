import React from "react";

// Define routes
export const ROUTES = {
	og: {
		component: React.lazy(() => import("./original")),
		path: "/og",
		title: "Original Game",
	},
	"with-canvas": {
		component: React.lazy(() => import("./withCanvas")),
		path: "/with-canvas",
		title: "Canvas Version",
		default: true,
	},
	"*": {
		component: React.lazy(() => import("../components/NotFound.js")),
		path: "*",
	},
};
