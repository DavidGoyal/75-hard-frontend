import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { userExists, userNotExists } from "./redux/reducers/userReducer";
import { RootState } from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
import { server } from "./constants/config";
import { Toaster } from "react-hot-toast";
import { useGetProgressQuery } from "./redux/api/api";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Tasks = lazy(() => import("./pages/Tasks"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
	const dispatch = useDispatch();

	useGetProgressQuery();
	const { user, isLoading } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		axios
			.get(`${server}/api/v1/user/me`, { withCredentials: true })
			.then(({ data }) => dispatch(userExists(data.user)))
			.catch(() => dispatch(userNotExists()));
	}, [dispatch]);

	return isLoading ? (
		<Loader />
	) : (
		<Router>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						element={<ProtectedRoute isAuthenticated={user ? true : false} />}
					>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/gallery" element={<Gallery />} />
					</Route>
					<Route
						path="/login"
						element={
							<ProtectedRoute
								isAuthenticated={user ? false : true}
								redirect="/dashboard"
							>
								<Login />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
			<Toaster position="bottom-center" />
		</Router>
	);
};

export default App;
