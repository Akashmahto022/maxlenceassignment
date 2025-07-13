import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleAuthWrapper from "../components/GoogleAuthWrapper";
const Register = () => {
  const url = "http://localhost:8000";
  const [responseData, setResponseData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("form data", data);
    try {
      const response = await axios.post(`${url}/api/v1/user/userlogin`, data, {
        withCredentials: true,
      });
      if (response.data) {
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setResponseData(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w
      -full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        {responseData && (
          <p className="flex justify-center items-center text-red-600 text-xl">
            {responseData}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Your Email Addres"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div className="">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is Reuired",
              })}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3 flex justify-end items-end mt-2">
            <Link to={"/reset-password"} className="text-blue-700">
              forget password
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
          <div className="flex flex-col justify-center items-center">
            <p>Or</p>
            {/* register with goole */}
            <GoogleAuthWrapper
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
