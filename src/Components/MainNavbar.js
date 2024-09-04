import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import countlogo from "../multimedia/attendance-logo1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  startNewEvent,
  profile,
  addCourse,
  addLecturer,
  addStudent,
  viewCourses,
  viewLecturers,
  viewStudents,
} from "../Components/redux/newEvent";
library.add(faCoffee);

const style = {
  backgroundColor: "green",
};

const MainNavbar = (props) => {
  const dispatch = useDispatch();

  const createNewEvent = useSelector((state) => state);

  const [numb, setnumb] = useState(0);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    console.log(props, "from navbar");
    if (props.notification && props.notification.length > 0) {
      setnumb(props.notification.length);
      setvisible(true);
    }
  }, [props.notification]);

  let navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={style}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img className="mx-2" height="50px" src={countlogo} alt="" />
            <h3 className="text-white fw-bold fs-2">SmartTrack</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/adminlogin"
                >
                  Admin
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/studentlogin"
                >
                  Student
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/lecturerlogin"
                >
                  Lecturer
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  onClick={() => dispatch(profile())}
                >
                  Profile
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/"
                >
                  Contact Us
                </a>
              </li>
              <div className="nav-det nav-det2">
                <li className="nav-item mx-3">
                  <div
                    onClick={() => dispatch(addCourse())}
                    className=" nav-link text-light fw-bold fs-5"
                  >
                    <h5 className="fw-bold">Add Course</h5>
                  </div>
                </li>
                <li className="nav-item mx-3">
                  <div
                    onClick={() => dispatch(addLecturer())}
                    className="nav-link text-light fw-bold fs-5"
                  >
                    <h5 className="fw-bold">Add Lecturer</h5>
                  </div>
                </li>
                <li className="nav-item mx-3">
                  <div
                    onClick={() => dispatch(addStudent())}
                    className="nav-link text-light fw-bold fs-5"
                  >
                    <h5 className="fw-bold">Add Students</h5>
                  </div>
                </li>
                <li className="nav-item mx-3">
                  <div
                    onClick={() => dispatch(viewCourses())}
                    className="nav-link text-light fw-bold fs-5"
                  >
                    <h5 className="fw-bold">View Courses</h5>
                  </div>
                </li>
                <li className="nav-item mx-3">
                  <div
                    onClick={() => dispatch(viewStudents())}
                    className="nav-link text-light fw-bold fs-5"
                  >
                    <h5 className="fw-bold">All Sudents</h5>
                  </div>
                </li>
                <li className="nav-item mx-3">
                  <div
                    onClick={() => dispatch(viewLecturers())}
                    className="nav-link text-light fw-bold fs-5"
                  >
                    <h5 className="fw-bold">All Lecturers</h5>
                  </div>
                  <li className="nav-item mx-3">
                    <div
                      onClick={() => dispatch(viewLecturers())}
                      className="nav-link text-light fw-bold fs-5"
                    >
                      <h5 className="fw-bold">Grade</h5>
                    </div>
                  </li>{" "}
                  <li className="nav-item mx-3">
                    <div
                      onClick={() => dispatch(viewCourses())}
                      className="nav-link text-light fw-bold fs-5"
                    >
                      <h5 className="fw-bold">View Courses</h5>
                    </div>
                  </li>{" "}
                  <li className="nav-item mx-3">
                    <div
                      onClick={() => dispatch(viewLecturers())}
                      className="nav-link text-light fw-bold fs-5"
                    >
                      <h5 className="fw-bold">Mark Attendance</h5>
                    </div>
                  </li>
                  <li className="nav-item mx-3">
                    <div
                      onClick={() => dispatch(viewStudents())}
                      className="nav-link text-light fw-bold fs-5"
                    >
                      <h5 className="fw-bold">Select Course</h5>
                    </div>
                  </li>{" "}
                </li>
              </div>
              {visible && (
                <li className="nav-item mx-3">
                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faBell}
                      size="2xl"
                      style={{ color: "#ffffff" }}
                    />
                    <div className="num fw-bold">
                      <p>{numb}</p>
                    </div>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <div className="d-flex mx-2" role="search">
                  <a
                    href="#login"
                    className="btn-lg btn mx- btn-outline-light"
                    onClick={login}
                  >
                    Log Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
