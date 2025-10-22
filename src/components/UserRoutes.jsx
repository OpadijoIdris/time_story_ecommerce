import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../pages/landingPage";
import Login from "../pages/loginPage";
import Register from "../pages/registerPage";
import Contact from "../pages/contacts";
import About from "../pages/aboutUs";
import AllProducts from "../pages/users/allProducts";
import UserDashboard from "../pages/users/userDashboard";
import AdminRoutes from "../pages/admin/AdminRoutes";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/all-products" element={<Layout><AllProducts /></Layout>} />
            <Route path="/dashboard/*" element={<UserDashboard />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    )
}

export default UserRoutes;
