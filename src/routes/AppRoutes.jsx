import { createBrowserRouter, Navigate } from "react-router-dom";
import MyLayout from "../layout/myLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home";
import AdminLogin from "../pages/AdminLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AllCourse from "../pages/AllCourse";
import AddCourse from "../pages/AddCourse";
import AllExam from "../pages/AllExam";
import CreateExam from "../pages/CreateExam";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <AdminLogin /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <AdminDashboard /> },
      { path: "/dashboard/courses", element: <AllCourse /> },
      { path: "/dashboard/courses/add", element: <AddCourse /> },
      { path: "/dashboard/exams", element: <AllExam /> },
      { path: "/dashboard/exams/create", element: <CreateExam /> }
    ],
  },
]);

export default router;