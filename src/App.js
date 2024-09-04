import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminBody from "./Components/Admin/AdminBody";
import AdminMenu from "./Components/Admin/AdminMenu";
import AdminProfile from "./Components/Admin/AdminProfile";
import Courses from "./Components/Admin/Courses";
import ChooseRegistration from "./Components/ChooseRegistration";
import Grade from "./Components/Lecturer/Grade";
import StartCourse from "./Components/Lecturer/StartCourse";
import AdminLogin from "./Pages/AdminLogin";
import AdminPage from "./Pages/AdminPage";
import AdminRegister from "./Pages/AdminRegister";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import LecturerLogin from "./Pages/LecturerLogin";
import LecturerPage from "./Pages/LecturerPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StudentLogin from "./Pages/StudentLogin";
import StudentPage from "./Pages/StudentPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/adminbody" element={<AdminBody />} />
        <Route path="/studentpage" element={<StudentPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/lecturerpage" element={<LecturerPage />} />
        <Route path="/lecturerlogin" element={<LecturerLogin />} />
        <Route path="/chooseregister" element={<ChooseRegistration />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/adminpage/:courseId" element={<Courses />} />
        <Route path="/lecturer/:courseId" element={<StartCourse />} />
        <Route path="/grade/:courseId" element={<Grade />} />
      </Routes>
    </>
  );
}

export default App;
