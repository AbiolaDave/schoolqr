import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MainNavbar from "../MainNavbar";

const Grade = () => {
  let unique;
  let coord;

  const createNewEvent = useSelector((state) => state);
  const sender = useSelector((state) => state.newEvent.sender);
  const dispatch = useDispatch();
  const [event, setEvent] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [tableIndex, setTableIndex] = useState([]);
  const [records, setRecords] = useState([]);
  const [studentRecord, setStudentRecord] = useState([]);
  const [startButton, setstartButton] = useState(false);
  const [TotalStudent, setTotalStudent] = useState([]);
  const [scanQrCode, setscanQrCode] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://school-backend-n4tv.onrender.com/admin/adminpage/${courseId}`
        );
        console.log(response, response.data);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [courseId]);

  useEffect(() => {}, []);

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
  };

  const showQr = async () => {
    if (window.confirm("Are you sure you want to start the class?")) {
      let url = "https://school-backend-n4tv.onrender.com/lecturer/setattendance";
      let courseCode = event.courseCode;
      try {
        axios.post(url, { courseCode }).then((response) => {
          if (response.status) {
            window.alert("class has started");
          } else {
            window.alert("failed to start class");
          }
        });
      } catch (error) {
        console.log(error);
      }
      setscanQrCode(true);
    }
  };

  useEffect(() => {
    let url = "https://school-backend-n4tv.onrender.com/lecturer/mystudents";
    let courseCode = event;
    try {
      axios
        .post(url, courseCode)
        .then((response) => {
          if (response.status) {
            setAllStudents(response.data.students);
          } else {
            console.log("no students offering this course");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [event]);

  useEffect(() => {
    let url = "https://school-backend-n4tv.onrender.com/lecturer/records";
    let courseCode = event;
    try {
      axios.post(url, courseCode).then((response) => {
        if (response.data.status) {
          setRecords(response.data.records);
        } else {
          console.log(response.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [event]);

  useEffect(() => {
    console.log(allStudents, "all students array");

    const absentStudents = allStudents.filter(
      (element) =>
        !records.some((each) =>
          each.students.some((student) => student.name === element.firstname)
        )
    );

    records.map((each, index) => {
      each.students.map((student, studentIndex) => {
        {
          setTableIndex(studentIndex);
        }
      });
    });

    records.map((each, index) => {
      each.students.map((student, studentIndex) => {
        setTableIndex(studentIndex);
      });
    });
    setStudentRecord(absentStudents);
  }, [allStudents, records]);

  const viewStudents = () => {
    setstartButton(true);
  };

  return (
    <>
      <MainNavbar />
      <div className="showEvent">
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="mt-2">Course Details</h3>
        </div>
        {event ? (
          <>
            <div className="text-center mt-5 mb-5">
              <h2>{event.eventName}</h2>
              <p>Course Name: {event.courseName}</p>
              <p>Course Code: {event.courseCode}</p>
              <p>Course Details: {event.courseDetails}</p>

              <button onClick={viewStudents} className="btn btn-warning">
                Students
              </button>
            </div>
            <div>
              {startButton ? (
                <div>
                  {allStudents.map((each, index) => (
                    <>
                      <div className="text-center mt-4 mx-auto">
                        <table className="table">
                          <thead>
                            <th>S/N</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Matric No</th>
                            <th>Test</th>
                            <th>Exam</th>
                            <th>Total</th>
                            <th>Grade</th>
                          </thead>
                          <tbody>
                            <td className="col-sm-1 col-1"><p>{index}</p></td>
                            <td className="col-sm-1 col-1"><p>{each.firstname}</p></td>
                            <td className="col-sm-1 col-1">
                              <p>{each.middlename}</p>
                            </td>
                            <td className="col-sm-1 col-1"><p>{each.lastname}</p></td>
                            <td className="col-sm-1 col-1"><p>{each.matricNo}</p></td>
                            <td className="col-sm-1 col-1">
                              <input
                                className="bdl form-control col-sm-1 col-1"
                                type="number"
                              />
                            </td>
                            <td className="col-sm-1 col-1">
                              <input
                                className="bdl form-control col-sm-1 col-1"
                                type="number"
                              />
                            </td>
                            <td className="col-sm-1 col-1">
                              <input
                                className="bdl form-control col-sm-1 col-1"
                                type="number"
                              />
                            </td>
                            <td className="col-sm-1 col-1">
                              <input
                                className="bdl form-control col-sm-1 col-1"
                                type="text"
                              />
                            </td>
                          </tbody>
                        </table>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
export default Grade;
