import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MainNavbar from "../MainNavbar";

const StartCourse = () => {
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
<<<<<<< HEAD
      let url =
        "https://school-backend-n4tv.onrender.com/lecturer/setattendance";
=======
      let url = "https://school-backend-n4tv.onrender.com/lecturer/setattendance";
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
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

<<<<<<< HEAD
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
=======
    records.map((each, index)=>{
        each.students.map((student, studentIndex)=>{
            {
              setTableIndex(studentIndex);
            }
        })
    })

    records.map((each, index)=>{
        each.students.map((student, studentIndex)=>{
            setTableIndex(studentIndex)
        })
    })
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
    setStudentRecord(absentStudents);
  }, [allStudents, records]);

  const viewStudents = () => {
    setstartButton(true);
  };

  return (
    <>
<<<<<<< HEAD
      <MainNavbar />
      <div className="showEvent">
        <div className="container text-center mx-auto med">
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

                {records.length > 0 ? (
                  records.map((each, index) => (
                    <div key={index}>
                      <h4>Date: {each.date}</h4>
                      <div>
                        <h5>Attendance Records:</h5>
                        {each.students.map((student, studentIndex) => (
                          <>
                            <table className="table">
                              <thead>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>MatricNo</th>
                                <th>Status</th>
                              </thead>
                              <tbody>
                                <td>{studentIndex + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.matricNo}</td>
                                <td>Present</td>
                              </tbody>
                            </table>
                          </>
                        ))}
                      </div>

                      <div>
                        {studentRecord.map((absentStudent, absentIndex) => (
=======
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

              {records.length > 0 ? (
                records.map((each, index) => (
                  <div key={index}>
                    <h4>Date: {each.date}</h4>
                    <div>
                      <h5>Attendance Records:</h5>
                      {each.students.map((student, studentIndex) => (
                        <>
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
                          <table className="table">
                            <thead>
                              <th>S/N</th>
                              <th>Name</th>
                              <th>MatricNo</th>
                              <th>Status</th>
                            </thead>
                            <tbody>
<<<<<<< HEAD
                              <td>{tableIndex + absentIndex + 2}</td>
                              <td>{absentStudent.firstname}</td>
                              <td>{absentStudent.matricNo}</td>
                              <td>Absent</td>
                            </tbody>
                          </table>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>Nothing</h1>
                  </div>
                )}

                {scanQrCode ? (
                  <>
                    <div className="mt-3 mb-3" ref={qrRef}>
                      <QRCode
                        size={456}
                        style={{
                          height: "350px",
                          maxWidth: "350px",
                          width: "50%",
                        }}
                        value={event.uniqueId}
                        id="qrCanvas"
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <div className="text-center container col-4">
                      <button
                        className="btn btn-success form-control mt-3 col-3"
                        onClick={downloadQRCode}
                      >
                        Download QR Code
                      </button>
                    </div>
                  </>
                ) : null}

                <button className="btn btn-success mt-3 mx-3" onClick={showQr}>
                  Start Class
                </button>
              </div>
              <div className="mx-auto text-center">
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
                            </thead>
                            <tbody>
                              <td>{index}</td>
                              <td>{each.firstname}</td>
                              <td>{each.middlename}</td>
                              <td>{each.lastname}</td>
                              <td>{each.matricNo}</td>
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
=======
                              <td>{studentIndex + 1}</td>
                              <td>{student.name}</td>
                              <td>{student.matricNo}</td>
                              <td>Present</td>
                            </tbody>
                          </table>
                        </>
                      ))}
                    </div>

                    <div>
                      {studentRecord.map((absentStudent, absentIndex) => (
                        <table className="table">
                          <thead>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>MatricNo</th>
                            <th>Status</th>
                          </thead>
                          <tbody>
                            <td>{tableIndex + absentIndex + 2}</td>
                            <td>{absentStudent.firstname}</td>
                            <td>{absentStudent.matricNo}</td>
                            <td>Absent</td>
                          </tbody>
                        </table>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <h1>Nothing</h1>
                </div>
              )}

              {scanQrCode ? (
                <>
                  <div className="mt-3 mb-3" ref={qrRef}>
                    <QRCode
                      size={456}
                      style={{
                        height: "350px",
                        maxWidth: "350px",
                        width: "50%",
                      }}
                      value={event.uniqueId}
                      id="qrCanvas"
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className="text-center container col-4">
                    <button
                      className="btn btn-success form-control mt-3 col-3"
                      onClick={downloadQRCode}
                    >
                      Download QR Code
                    </button>
                  </div>
                </>
              ) : null}

              <button className="btn btn-success mt-3 mx-3" onClick={showQr}>
                Start Class
              </button>
            </div>
            <div className="mx-auto text-center">
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
                          </thead>
                          <tbody>
                            <td>{index}</td>
                            <td>{each.firstname}</td>
                            <td>{each.middlename}</td>
                            <td>{each.lastname}</td>
                            <td>{each.matricNo}</td>
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
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
      </div>
    </>
  );
};
export default StartCourse;
