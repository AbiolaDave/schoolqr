import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import countlogo from "../multimedia/attendance-logo1.jpeg";

const LecturerLogin = () => {
  let url = "https://school-backend-n4tv.onrender.com/lecturer/lecturerlogin";
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      lecturerId: "",
    },
    onSubmit: async (values) => {
      console.log(values, "Form Values");
      await axios
        .post(url, values)
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            console.log(
              "hello",
              response.data.status,
              response.data.lecturerToken
            );
            localStorage.lecturerToken =
              response.data.lecturerToken;
            navigate("/lecturerpage");
          } else {
            navigate("/")
            console.log(response.data.message);
          }
        })
        .catch((error) => {
            navigate("/");
          console.error("There was an error!", error);
        });
    },
    validationSchema: yup.object({
      lecturerId: yup
        .string()
        .required("This field is required"),
      password: yup.string().required("This field is required"),
    }),
  });

  return (
    <main className="min-vh-150 backg d-flex justify-content-center align-items-center">
      <div className="container mt-5">
        <div className="row">
          <div className="reg col-3 col-sm-5 mx-auto p-3 rounded-2 mt-5 mb-5 con-box">
            <div className="text-center mt-5">
              <img className="" height="50px" src={countlogo} alt="" />
            </div>
            <h4 className="text-center fw-bold text-success">Lecturer Login</h4>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="lecturerId" className="text-success fw-bold">
                LecturerId:
              </label>
              <input
                type="lecturerId"
                className={
                  formik.touched.lecturerId && formik.errors.lecturerId
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Lecturer Id"
                name="lecturerId"
                onChange={formik.handleChange}
                value={formik.values.lecturerId}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.lecturerId && formik.errors.lecturerId}
              </div>
              <label htmlFor="password" className="text-success fw-bold">
                Password:
              </label>
              <input
                type="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.password && formik.errors.password}
              </div>
              <button
                type="submit"
                className="btn btn-success form-control mt-3 mb-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LecturerLogin;
