import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Components/Admin/createEvents.css";
import "../Components/Admin/eventList.css";
import FooterComp from "../Components/FooterComp";
import MainNavbar from "../Components/MainNavbar";
import MarkAttendance from "../Components/Students/MarkAttendance";
import SelectCourse from "../Components/Students/SelectCourse";
import StudentCourses from "../Components/Students/StudentCourses";
import StudentProfile from "../Components/Students/StudentProfile";
import StudentsBody from "../Components/Students/StudentsBody";
import StudentsMenu from "../Components/Students/StudentsMenu";
import { resetPage } from "../Components/redux/newEvent";

const StudentPage = () => {
  const dispatch = useDispatch();
  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent, "admin page");

  let token = localStorage.studentToken;
  let navigate = useNavigate();
  let url = "https://school-backend-n4tv.onrender.com/student/studentpage";

  const [user, setuser] = useState("");
  const [admin, setadmin] = useState("");
  const [userName, setuserName] = useState("");
  const [AdminqrCode, setAdminqrCode] = useState("");
  const [notification, setnotification] = useState([]);
  const [counterNotification, setcounterNotification] = useState([]);

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
          navigate("/home");
        } else {
          setuser(response.data.matricNo);
          setadmin(response.data.admin);
          setAdminqrCode(response.data.AdminqrCode);
          setuserName(response.data.userName);
          console.log(response.data.firstname);
          dispatch(resetPage());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, []);

  let componentToDisplay;

  if (createNewEvent.newEvent.createEvent === "empty") {
    componentToDisplay = <StudentsBody user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "profile") {
    componentToDisplay = <StudentProfile user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewcourses") {
    componentToDisplay = <StudentCourses user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewlecturers") {
    componentToDisplay = <MarkAttendance user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewstudents") {
    componentToDisplay = <SelectCourse user={user} admin={admin} />;
  } else {
    componentToDisplay = <div></div>;
  }

  return (
    <>
      <MainNavbar notification={notification} />
      <div className="d-flex">
        <StudentsMenu />
        {componentToDisplay}
      </div>
      <div className="">
        <FooterComp />
      </div>
    </>
  );
};

export default StudentPage;
