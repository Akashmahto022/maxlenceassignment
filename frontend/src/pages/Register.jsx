import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleAuthWrapper from "../components/GoogleAuthWrapper";

const Register = () => {
  const url = "http://localhost:8000";
  const [previewImage, setPreviewImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      userProfileImage: "",
    },
  });

  const navigate = useNavigate();

  const uploadImage = watch("userProfileImage");

  useEffect(() => {
    if (uploadImage && uploadImage[0]) {
      const file = uploadImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [uploadImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.userPassword);
    formData.append("userProfileImage", data.userProfileImage[0]);

    try {
      const response = await axios.post(
        `${url}/api/v1/user/register`,
        formData
      );
      if (response.data) {
        setResponseData(response.data);
        navigate("/login");
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
          Register
        </h2>
        {responseData && (
          <p className="flex justify-center items-center text-red-600 text-xl">
            {responseData}
            <Link to={"/login"} className="mx-1 text-blue-700 underline">
              Login
            </Link>
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="avatar"
            >
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("userProfileImage", {
                required: "Image is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.image && (
              <p className="text-red-500">{errors.userProfileImage.message}</p>
            )}
            {previewImage && (
              <div className="flex justify-center items-center gap-2 mt-2">
                <p>Image Preview:</p>
                <img
                  src={previewImage}
                  alt="profile image"
                  className="w-20 h-20 object-cover border rounded"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Rgister
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
