import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const navigate = useNavigate()


    const onSubmit = (data) => {
        console.log('form data', data)
        navigate("/")
    }


    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w
      -full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                    Login
                </h2>
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
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder='Enter Your Email Addres'

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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register