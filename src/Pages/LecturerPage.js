import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddLecturer from "../Components/Admin/AddLecturer";
import AddStudent from "../Components/Admin/AddStudent";
import AdminBody from "../Components/Admin/AdminBody";
import ViewStudents from "../Components/Admin/ViewStudents";
import FooterComp from "../Components/FooterComp";
import CoursesGrade from "../Components/Lecturer/CoursesGrade";
import LecturerCourses from "../Components/Lecturer/LecturerCourses";
import LecturerMenu from "../Components/Lecturer/LecturerMenu";
import LecturerProfile from "../Components/Lecturer/LecturerProfile";
import ViewAttendance from "../Components/Lecturer/ViewAttendance";
import MainNavbar from "../Components/MainNavbar";
import "./adminPage.css";
import "../Components/Admin/createEvents.css";
import "../Components/Admin/eventList.css";

const LecturerPage = () => {
  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent, "admin page");

  let token = localStorage.lecturerToken;
  let navigate = useNavigate();
  let url = "http://localhost:5007/lecturer/lecturerpage";

  const [user, setuser] = useState("");
  const [admin, setadmin] = useState("");
  const [userName, setuserName] = useState("");
  const [AdminqrCode, setAdminqrCode] = useState("");
  const [notification, setnotification] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (!response.data.status) {
          console.log(response.data.status, "here error");
          navigate("/lecturerlogin");
        } else {
          setuser(response.data.firstname);
          setadmin(response.data.admin);
          setAdminqrCode(response.data.AdminqrCode);
          setuserName(response.data.userName);
          console.log(userName);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/lecturerlogin");
      });
  }, []);

  let componentToDisplay;

  if (createNewEvent.newEvent.createEvent === "empty") {
    componentToDisplay = <AdminBody user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "profile") {
    componentToDisplay = <LecturerProfile user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "addcourse") {
    componentToDisplay = (
      <ViewAttendance user={user} admin={admin} AdminqrCode={AdminqrCode} />
    );
  } else if (createNewEvent.newEvent.createEvent === "addlecturer") {
    componentToDisplay = <AddLecturer user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "addstudent") {
    componentToDisplay = <AddStudent user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewcourses") {
    componentToDisplay = <LecturerCourses user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewlecturers") {
    componentToDisplay = <CoursesGrade user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewstudents") {
    componentToDisplay = <ViewStudents user={user} admin={admin} />;
  } else {
    componentToDisplay = <div></div>;
  }

  return (
    <>
      <MainNavbar notification={notification} />
      <div className="d-flex">
        <LecturerMenu />
        {componentToDisplay}
      </div>
      <div className="">
        <FooterComp />
      </div>
    </>
  );
};

export default LecturerPage;
