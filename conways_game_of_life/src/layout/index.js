import React, { Suspense, useEffect } from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingSpinner from "../components/LoadingSpinner";
import { ROUTES } from "./ROUTES";

function Layout(props) {
	const location = useLocation();
	const currentPathName = location.pathname.split("/")[1];

	useEffect(() => {
		const route = ROUTES[currentPathName];

		if (route) {
			// Update document title
			document.title = `Game of Life - ${route.title}`;
		}
	}, [currentPathName]);

	// If path is not found, redirect to default route
	if (!currentPathName || !ROUTES[currentPathName]) {
		return <Redirect to="/with-canvas" />;
	}

	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingSpinner />}>
				{Object.entries(ROUTES).map(([key, route]) => (
					<Route
						exact
						key={key}
						path={route.path}
						render={() => {
							const Component = route.component;
							return <Component {...props} />;
						}}
					/>
				))}
			</Suspense>
		</ErrorBoundary>
	);
}

export default Layout;
