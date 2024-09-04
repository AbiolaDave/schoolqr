import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

const SelectCourse = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let url = "https://school-backend-n4tv.onrender.com/student/selectcourse";
    let user = props.user;

    axios
      .post(url, user)
      .then((response) => {
        if (response.data.status) {
          setCourses(response.data.courses);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err, "error occurred");
      });
  }, [props.user]);

  const formik = useFormik({
    initialValues: {
      courseNames: [],
    },
    onSubmit: (values) => {
      let url = "https://school-backend-n4tv.onrender.com/student/addstudentcourse";
      let user = props.user
      if (window.confirm("Add New Event?")) {
        let eventObj = {
          ...values,
        };

        console.log(eventObj, "checkbox", values)

        axios.post(url, {eventObj, user}).then((response) => {
          if (!response.data.status) {
            window.alert("failed to add course")
            console.log(response.data.message, "nooooooooo");
          } else {
            console.log(response.data.message, "oooooo");
            window.alert("Your Course has been added successfully");
          }
        });
        formik.resetForm();
      }
    },
    validationSchema: yup.object().shape({
      courseNames: yup.array().min(1, "At least one course must be selected"),
    }),
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      formik.setFieldValue("courseNames", [
        ...formik.values.courseNames,
        value,
      ]);
    } else {
      formik.setFieldValue(
        "courseNames",
        formik.values.courseNames.filter((course) => course !== value)
      );
    }
  };

  return (
    <>
      <div className="create">
        <div className="container col-5 col-sm-4 mx-auto p-3 mt-5">
          <div className="text-center text-success fw-bold">
            <h1 className="fw-bold">Select Offered Course</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="courseNames" className="text-success fw-bold">
              Courses
            </label>
            <div>
              {courses.map((each, index) => (
                <div key={index}>
                  <p>Course Name: {each.courseName}</p>
                  <p>Course Code: {each.courseCode}</p>
                  <input
                    type="checkbox"
                    name="courseNames"
                    value={each.courseCode}
                    onChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </div>
            <div className="text-danger">
              {formik.touched.courseNames && formik.errors.courseNames}
            </div>
            <div className="p-5 text-center">
              <button
                type="submit"
                className="btn btn-success form-control mt-3"
              >
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SelectCourse;
