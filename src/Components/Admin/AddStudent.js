import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./addLecturer.css";

const AddStudent = () => {
  let url = "https://school-backend-n4tv.onrender.com/admin/studentregister";
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      password: "",
      matricNo: "",
      profile_picture: null,
      phone_no: "",
      address: "",
      relationship_status: "single",
      gender: "male",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status) {
          console.log(response.data);
          window.confirm("Student has been added successfully");
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
      formik.resetForm();
    },
    validationSchema: yup.object({
      firstname: yup.string().required("This field is required"),
      lastname: yup.string().required("This field is required"),
      middlename: yup.string().required("This field is required"),
      matricNo: yup.string().required("This field is required"),
      email: yup
        .string()
        .required("This field is required")
        .email("Please enter a valid email"),
      password: yup.string().required("This field is required"),
      profile_picture: yup.mixed().required("Upload your image"),
      phone_no: yup.number().required("Pleases enter your phone number"),
      gender: yup
        .string()
        .required("This field is required")
        .oneOf(["male", "female"], "Please select a valid option"),
    }),
  });
  return (
    <main className="min-vh-200 lect d-flex justify-content-center align-items-center">
<<<<<<< HEAD
      <div className="container mt-5 med">
=======
      <div className="container mt-5">
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
        <div className="row">
          <div className="reg col-3 col-sm-5 mx-auto p-3 rounded-2 mt-5 mb-5">
            <div className="text-center mt-5">
              {/* <img className="" height="50px" src={countlogo} alt="" /> */}
            </div>
            <h4 className="text-center fw-bold text-success">
              Register Student
            </h4>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="firstname" className="text-success fw-bold">
                Firstname:
              </label>
              <input
                type="text"
                className={
                  formik.touched.firstname && formik.errors.firstname
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Firstname"
                name="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.firstname && formik.errors.firstname}
              </div>{" "}
              <label htmlFor="lastname" className="text-success fw-bold">
                Lastname:
              </label>
              <input
                type="text"
                className={
                  formik.touched.lastname && formik.errors.lastname
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Lastname"
                name="lastname"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
              <label htmlFor="middlename" className="text-success fw-bold">
                Middlename:
              </label>
              <input
                type="text"
                className={
                  formik.touched.middlename && formik.errors.middlename
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Middlename"
                name="middlename"
                onChange={formik.handleChange}
                value={formik.values.middlename}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.middlename && formik.errors.middlename}
              </div>
              <label htmlFor="matricNo" className="text-success fw-bold">
                Matric No:
              </label>
              <input
                type="text"
                className={
                  formik.touched.matricNo && formik.errors.matricNo
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Matric No"
                name="matricNo"
                onChange={formik.handleChange}
                value={formik.values.matricNo}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.matricNo && formik.errors.matricNo}
              </div>
              <label htmlFor="email" className="text-success fw-bold">
                Email:
              </label>
              <input
                type="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.email && formik.errors.email}
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
              <label htmlFor="address" className="text-success fw-bold">
                Home Address:
              </label>
              <input
                type="text"
                className={
                  formik.touched.address && formik.errors.address
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Enter your address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.address && formik.errors.address}
              </div>
              <label htmlFor="phone_no" className="text-success fw-bold">
                Phone Number:
              </label>
              <input
                type="text"
                className={
                  formik.touched.phone_no && formik.errors.phone_no
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Enter your phone number"
                name="phone_no"
                onChange={formik.handleChange}
                value={formik.values.phone_no}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.phone_no && formik.errors.phone_no}
              </div>
              <label htmlFor="" className="text-success fw-bold">
                Relationship Status:
              </label>
              <label htmlFor="Single" className="text-success mx-1">
                Single
                <input
                  type="radio"
                  name="relationship_status"
                  value="single"
                  className="text-success mx-2"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              <label htmlFor="married" className="text-success mt-3 mb-3 mx-1">
                Married
                <input
                  type="radio"
                  name="relationship_status"
                  value="married"
                  className="text-success mx-2"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              <label htmlFor="widowed" className="text-success mt-3 mb-3 mx-1">
                Widowed
                <input
                  type="radio"
                  name="relationship_status"
                  value="widowed"
                  className="text-success mx-2"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              <div className="text-danger">
                {formik.touched.relationship_status &&
                  formik.errors.relationship_status}
              </div>
              <label htmlFor="profile_picture" className="text-success fw-bold">
                Profile Picture:
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png, jpg"
                className={
                  formik.touched.profile_picture &&
                  formik.errors.profile_picture
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                name="profile_picture"
                onChange={(event) => {
                  formik.setFieldValue(
                    "profile_picture",
                    event.currentTarget.files[0]
                  );
                }}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.profile_picture &&
                  formik.errors.profile_picture}
              </div>
              <label htmlFor="" className="text-success fw-bold">
                Gender:
              </label>
              <label htmlFor="" className="text-success mx-3">
                Male
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="text-success mx-2"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              <label htmlFor="" className="text-success mt-3 mb-3 mx-3">
                Female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="text-success mx-2"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              <div className="text-danger">
                {formik.touched.gender && formik.errors.gender}
              </div>
              <button
                type="submit"
                className="btn btn-success form-control mt-3 mb-2"
              >
                Submit
              </button>
              <div className="text-center text-success fw-bold">
                <a className="text-success" href="/adminlogin">
                  <p>Login as Admin</p>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddStudent;
