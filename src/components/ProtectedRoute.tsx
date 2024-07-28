import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
	isAuthenticated: boolean;
	children?: React.ReactNode;
	redirect?: string;
};

const ProtectedRoute = ({
	isAuthenticated,
	children,
	redirect = "/",
}: Props) => {
	if (!isAuthenticated) {
		return <Navigate to={redirect} />;
	}
	return children ? children : <Outlet />;
};

export default ProtectedRoute;
