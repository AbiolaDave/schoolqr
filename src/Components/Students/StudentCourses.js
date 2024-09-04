import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSender } from "../redux/newEvent";

const StudentCourses = (props) => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const sender = useSelector((state) => state.newEvent.sender);

  useEffect(() => {
    console.log(props, props.student);
    const sendReq = async () => {
      try {
        let url = "http://localhost:5007/student/courses";
        let student = props.user;
        const response = await axios.post(url, { student });
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          localStorage.token = response.data.token;
          window.alert("found");
          console.log(response.data, "message");
          setEvents(response.data.courses);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    sendReq();
  }, [props.student, props.AdminqrCode]);

  useEffect(() => {
    let studentToken = localStorage.studentToken;
    if (studentToken) {
      if (!sender.length) {
        dispatch(setSender(props.user));
      }
    } else {
      console.log("err");
    }
  }, [dispatch, props.user, sender]);
  return (
    <div className="showEvent">
      <div className="coc">
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">All Courses</h3>
        </div>
        <div className="text-success">
          {events.length > 0 ? (
            events.map((eachEvent) => (
              <>
                <div className="coc">
                  <ul
                    className="text-success mx-auto mb-5"
                    key={eachEvent.courseId}
                  >
                    <li>
                      <Link
                        className="listing"
                        onClick={() => dispatch(setSender(props.user))}
                        to={`/adminpage/${eachEvent.courseId}`}
                        key={eachEvent.courseId}
                      >
                        {console.log(events, eachEvent.courseId)}
                        <p>Course Title: {eachEvent.courseName}</p>
                        <p>Course Code: {eachEvent.courseCode}</p>
                        <p>Course Details: {eachEvent.courseDetails}</p>
                        <p>
                          Lcturer: {eachEvent.assignedLecturer1},{" "}
                          {eachEvent.assignedLecturer2}
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ))
          ) : (
            <div className="coc">
              <p>No events found...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
