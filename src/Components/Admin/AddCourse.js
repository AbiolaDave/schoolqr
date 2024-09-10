import axios from "axios";
import { useFormik } from "formik";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import * as yup from "yup";

const AddCourse = (props) => {
  const [course, setCourse] = useState("");
  const [allLecturersDetails, setAllLecturerDetails] = useState([]);
  const [assignLecturer, setAssignedLecturer] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [admin, setadmin] = useState("");
  const [Id, setId] = useState("");
  const [uniqueId, setuniqueId] = useState("");
  const [displayDetails, setDisplayDetails] = useState(false);
  const qrRef = useRef(null);

  let url = "https://school-backend-n4tv.onrender.com/admin/adminpage";

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
  };

  useEffect(() => {
    let url = "https://school-backend-n4tv.onrender.com/admin/alllecturers";
    axios.post(url, props).then((response) => {
      if (response) {
        console.log(response.data);
        setAllLecturerDetails(response.data.lecturers);
      } else {
        console.log(response.data);
        window.alert("error getting it");
      }
    });
  }, [props]);

  useEffect(() => {
    setLecturerFirstname();
  }, [allLecturersDetails]);

  const setLecturerFirstname = async () => {
    let userName = [];
    {
      allLecturersDetails.map(
        (each, index) => (
          (userName = [...userName, each.firstname]), setFirstname(userName)
        )
      );
    }
  };

  const handleAssignCounter = (index, value) => {
    const newAssignedLecturer = [...assignLecturer];
    newAssignedLecturer[index] = value;
    setAssignedLecturer(newAssignedLecturer);
    formik.setFieldValue(`assignedLecturer[${index}]`, value);
  };

  const formik = useFormik({
    initialValues: {
      courseName: "",
      courseCode: "",
      courseDetails: "",
      assignedLecturer1: "",
      assignedLecturer2: "",
    },
    onSubmit: (values) => {
      let randomNumber = Math.floor(Math.random() * 900) + 100;
      setId(randomNumber);
      let unique = formik.values.courseCode + randomNumber;
      setuniqueId(unique);
      if (window.confirm("Add New Event?")) {
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }

        let eventObj = {
          ...values,
          qrCode: uniqueId,
          courseId: randomNumber,
          uniqueId: unique,
          admin: props.admin,
        };

        console.log( values, "dataaa");

          axios.post(url, eventObj).then((response) => {
            if (!response.data.status) {
              console.log(response.data.message, "nooooooooo");
            } else {
              console.log(response.data.message, "oooooo");
              window.alert("You Can download course Qr-Code below");
              setCourse(response.data.form);
              setDisplayDetails(true);
            }
          });
        formik.resetForm();
      }
    },

    validationSchema: yup.object().shape({
      courseName: yup.string().required("This field is required"),
      courseCode: yup.string().required("This field is required"),
      courseDetails: yup.string().required("This field is required"),
      assignLecturer1: yup.string(),
      assignedLecturer2: yup.string(),
    }),
  });
  return (
    <>
      <div className="create">
        <div className="cointainer col-5 col-sm-4 mx-auto p-3 mt-5  ">
          <div className="text-center text-success fw-bold">
            {/* <div>Hello {props.admin}</div> */}
            <h1 className="fw-bold">Add New Course</h1>
          </div>
          <div>
            <form action="" onSubmit={formik.handleSubmit}>
              <label htmlFor="courseName" className="text-success fw-bold">
                Course Title
              </label>
              <input
                className={
                  formik.touched.courseName && formik.errors.courseName
                    ? "form-control mx-3  text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                type="text"
                placeholder="Enter Course Title"
                name="courseName"
                onChange={formik.handleChange}
                value={formik.values.courseName}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.courseName && formik.errors.courseName}
              </div>
              <label htmlFor="courseCode" className="text-success fw-bold">
                Course Code
              </label>
              <input
                className={
                  formik.touched.courseCode && formik.errors.courseCode
                    ? "form-control mx-3  text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                type="text"
                placeholder="Enter Course Code"
                name="courseCode"
                onChange={formik.handleChange}
                value={formik.values.courseCode}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.courseCode && formik.errors.courseCode}
              </div>
              <label htmlFor="courseDetails" className="text-success fw-bold">
                Course Details
              </label>
              <textarea
                className={
                  formik.touched.courseDetails && formik.errors.courseDetails
                    ? "form-control mx-3  text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                type="text"
                placeholder="Enter Course Details"
                name="courseDetails"
                onChange={formik.handleChange}
                value={formik.values.courseDetails}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.courseDetails && formik.errors.courseDetails}
              </div>
              {
                <>
                  <label className="text-success fw-bold" htmlFor="">
                    Assign lecturer to Course:
                  </label>
                  <select
                    className="form-control my-2 text-success"
                    name="assignedLecturer1"
                    onChange={formik.handleChange}
                    value={formik.values.assignLecturer1}
                  >
                    <option value="" label="Assign Lecturer 1" />
                    {firstname.map((lecturer, idx) => (
                      <option key={idx} value={lecturer}>
                        {lecturer}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-control my-2 text-success"
                    name="assignedLecturer2"
                    onChange={formik.handleChange}
                    value={formik.values.assignedLecturer2}
                  >
                    <option value="" label="Assign Lecturer 2(optional)" />
                    {firstname.map((lecturer, idx) => (
                      <option key={idx} value={lecturer}>
                        {lecturer}
                      </option>
                    ))}
                  </select>
                </>
              }

              <div className="p-5 text-center">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3 "
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
          {displayDetails ? (
            <>
              <div>
                <p>Course Title: {course.courseName}</p>
                <p>Course Code: {course.courseCode}</p>
                <p>Course Details: {course.courseDetails}</p>
              </div>
              <div className="text-success fw-bold d-flex">
                QR-Code:
                <div className="mt-3 mx-2" ref={qrRef}>
                  <QRCode
                    size={456}
                    style={{ height: "auto", maxWidth: "100%", width: "70%" }}
                    value={uniqueId}
                    id="qrCanvas"
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
              <button
                className="btn btn-success form-control mt-3 col-3"
                onClick={downloadQRCode}
              >
                Download QR Code
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AddCourse;
