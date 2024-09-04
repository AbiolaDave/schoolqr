import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSender } from "../redux/newEvent";

const ViewStudents = (props) => {
  const [events, setEvents] = useState([]);
  const [lecturers, setlecturers] = useState("");
  const dispatch = useDispatch();

  const sender = useSelector((state) => state.newEvent.sender);

  useEffect(() => {
    console.log(props, props.admin);
    const sendReq = async () => {
      try {
        let url =
          "https://school-backend-n4tv.onrender.com/admin/adminpage/students";
        let admin = props.admin;
        let AdminqrCode = props.AdminqrCode;
        const response = await axios.post(url, { admin, AdminqrCode });
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          localStorage.token = response.data.token;
          console.log(response.data.message, "message");
          setEvents(response.data.student);
          console.log(AdminqrCode);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    sendReq();
  }, [props.admin, props.AdminqrCode]);

  useEffect(() => {
    let countertoken = localStorage.Countertoken;
    if (countertoken) {
      if (!sender.length) {
        dispatch(setSender(props.user));
      }
    } else {
      console.log("err");
    }
  }, [dispatch, props.user, sender]);
  return (
    <div className="showEvent">
      <div className="coco">
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">All Students</h3>
        </div>
        <div className="text-success">
          {events.length > 0 ? (
            events.map((eachEvent, index) => (
              <>
                <div className="coco">
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
                        <table className="table">
                          <thead>
                            <tr>
                              <td>S/N</td>
                              <td>First Name</td>
                              <td>Last Name</td>
                              <td>Middle Name</td>
                              <td>Email</td>
                              <td>Gender</td>
                              <td>Address</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{index}</td>
                              <td>{eachEvent.firstname}</td>
                              <td>{eachEvent.lastname}</td>
                              <td>{eachEvent.middlename}</td>
                              <td>{eachEvent.email}</td>
                              <td>{eachEvent.gender}</td>
                              <td>{eachEvent.address}</td>
                            </tr>
                          </tbody>
                        </table>
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

export default ViewStudents;
