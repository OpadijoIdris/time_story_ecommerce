import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Cloudinary } from '@cloudinary/url-gen/index'
import AdminDashboard from './pages/Admin.jsx'
import Layout from './components/Layout.jsx'
import LandingPage from "./pages/landingPage";
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Contact from "./pages/contacts";
import About from "./pages/aboutUs";
import AllProducts from "./pages/users/allProducts";
import UserDashboard from "./pages/users/userDashboard";
// import Dashboard from "./dashboard";
// import AllUsers from "./AllUsers.jsx";
// import AdminProducts from "./adminProducts";



function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dizz525li'
    }
  });
  
  return (
     <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<AdminDashboard />} />

          {/* User Routes */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<Layout><Contact /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/all-products" element={<Layout><AllProducts /></Layout>} />
          <Route path="/dashboard/*" element={<UserDashboard />} />
        </Routes>
     </BrowserRouter>
  )
}

export default App
