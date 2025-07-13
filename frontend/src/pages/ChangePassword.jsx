import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const ChangePassword = () => {
  const url = "http://localhost:8000";
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("form data", data);
    try {
      const response = await axios.post(
        `${url}/api/v1/user/change-password`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log(response.data);
        setResponseData(response.data.message);
        alert("password reset successfully");
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
          Enter New Password
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
              htmlFor="password"
            >
              New Password
            </label>
            <input
              {...register("password", {
                required: "New Password is Reuired",
              })}
              placeholder="Enter your new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "confirm Password is Reuired",
              })}
              placeholder="Enter your confirm password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
