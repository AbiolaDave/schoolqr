import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Courses = () => {
  let unique;
  let coord;

  const createNewEvent = useSelector((state) => state);
  const sender = useSelector((state) => state.newEvent.sender);
  const dispatch = useDispatch();
  const [event, setEvent] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [record, setRecord] = useState([]);
  const [records, setRecords] = useState([]);
  const [studentRecord, setStudentRecord] = useState([]);
  const [startButton, setstartButton] = useState(false);
  const [scanQrCode, setscanQrCode] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5007/admin/adminpage/${courseId}`
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
      let url = "http://localhost:5007/lecturer/setattendance";
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
    let url = "http://localhost:5007/lecturer/mystudents";
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
    let url = "http://localhost:5007/lecturer/records";
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


  const viewStudents = () => {
    setstartButton(true);
  };

  return (
    <>
      <div className="showEvent">
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="mt-2">Courses</h3>
        </div>
        {event ? (
          <>
            <div className="text-center mt-5 mb-5">
              <h2>{event.eventName}</h2>
              <p>Course Name: {event.courseName}</p>
              <p>Course Code: {event.courseCode}</p>
              <p>Course Details: {event.courseDetails}</p>

              {records ? (
                <>
                  {records.map((each, index) => (
                    <div key={index}>
                      <table>
                        <thead>
                          <th>
                            <h4>Day {index + 1}</h4>
                          </th>
                          <th>bbb</th>
                          <th>ccc</th>
                          <th>ddd</th>
                          <th>eee</th>
                        </thead>
                        <tbody>
                          <td>aaa</td>
                          <td>aaa</td>
                          <td>aaa</td>
                          <td>aaa</td>
                          <td>aaa</td>
                        </tbody>
                      </table>
                      <h4>Day {index + 1}</h4>
                      {each.students.map((student, sIndex) => (
                        <>
                          <p key={sIndex}>
                            {student.name} - {student.matricNo}
                          </p>
                        </>
                      ))}
                    </div>
                  ))}
                </>
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

              {/* <button className="btn btn-success mt-3 mx-3" onClick={showQr}>
                Start Class
              </button> */}
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
                      <div>{each.firstname}</div>
                      <div>{each.matricNo}</div>
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
export default Courses;
