import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Comman/Navbar';
import VerifyEmail from './pages/VerifyEmail';
import MyProfile from './components/core/DashBoard/MyProfile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from './pages/Error'
import EnrolledCourses from './components/core/DashBoard/EnrolledCourses';
import Cart from "./components/core/Cart/index";
import About from './pages/About';
import AddCourses from './components/core/AddCourses/index';
import CourseDetails from './pages/CourseDetails';
import Coursesall from './components/core/All-Courses/Coursesall';
import ContactUs from './pages/Contact';
import MyCourses from './components/core/All-Courses/MyCourse';
import CoursePlayer from './pages/CoursePlayer'
import Settings from "./components/core/DashBoard/Settings";
// import Footer from './components/Comman/Footer'
import AdminDashboard from './components/core/DashBoard/AdminDashboard';
function App() {
  return (
    <div className="w-[100vw] v-[100vh] ">


      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route path="/course/:courseId" element={
  <PrivateRoute>
    <CoursePlayer />
  </PrivateRoute>
} />

<Route path="/Contact" element={<ContactUs />} />

        <Route path="*" element={<Error />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Nested routes inside dashboard */}
          {/* <Route index element={<MyProfile />} /> default page */}
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route path="/dashboard/add-courses" element={<AddCourses />} />
          {/* Add more nested dashboard routes here, e.g., settings */}
            <Route path="/dashboard/all-courses" element={<Coursesall />} />
                      <Route path="/dashboard/my-courses" element={<MyCourses />} />
                      <Route path="/dashboard/instructor" element={<AdminDashboard />} />


         </Route>


      </Routes>

    {/* <Footer/> */}

    </div>
  );
}

export default App;
