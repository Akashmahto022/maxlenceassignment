import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const url = "http://localhost:8000";
  const [responseData, setResponseData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("form data", data);
    try {
      const response = await axios.post(
        `${url}/api/v1/user/request/reset-password`,
        data
      );
      if (response.data) {
        setResponseData(response.data.message);
        console.log(response.data);
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
          for forget password enter your email
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
              placeholder="Enter Your Email Address"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
