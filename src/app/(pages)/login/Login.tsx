"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import RegisterModal from "../register/Register";
import facebookLogo from "../../images/Facebook-Logo.png";
import Image from "next/image";
import { useRouter } from 'next/navigation';
interface LoginValues {
  identifier: string;
  password: string;
}
interface ErrorResponse {
  message: string;
}

const Login: React.FC = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [errorBack, setBackError] = useState("");
  const router = useRouter();
  const loginSchema = Yup.object().shape({
    identifier: Yup.string()
      .required("Email or Mobile is required")
      .matches(
        /^(\S+@\S+\.\S+|\d{10,15})$/,
        "Must be a valid email or mobile number"
      ),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$/,
        "Password must contain at least two uppercase letters and one special character"
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values: LoginValues) => {
    

    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        values
      ); 
      
      if (data.message == "success") {
        localStorage.setItem("token", data.token);
        setBackError("")
        toast.success("Login successful!");
        router.push('/home');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error("Login failed. Please try again.");
      
      if (axiosError.response) {
        setBackError(axiosError.response.data.message)
        // console.log(axiosError.response.data.message); // TypeScript will now recognize `message`
      } else {
        // console.log("An unknown error occurred.");
      }
      
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Toaster />
      {/* Left Div with Logo */}
      <div className="mx-5   h-[60vh] w-[40%]">
        <div className=" h-[160px]">
          <Image
            src={facebookLogo}
            alt="facebook Logo"
            width={400}
            priority
          ></Image>
        </div>
        <h2 className="text-[30px]">
          Facebook helps you connect and share with the people in your life.
        </h2>
      </div>
      <div className="rounded-lg w-[30%] shadow-lg bg-white  p-8">
        {/* Right Div with Login Form */}
        <div className="">
          {/* <h2 className="text-2xl font-semibold text-center mb-4">Login</h2> */}
          <Formik
            initialValues={{ identifier: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="identifier"
                  placeholder="Enter email or mobile number"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="identifier"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {errorBack === "invalid email  information" && <div className="text-red-500 pt-1">{errorBack}</div>}
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border border-blue-500 rounded"
                  />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                  />
                  {errorBack === "invalid password information" && <div className="text-red-500 pt-1">{errorBack}</div>}
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded font-bold text-lg"
              >
                Log in
              </button>
              <p className="text-blue-700 text-center">Forgotten password?</p>
              <hr />
              <button
                type="button"
                className="w-full p-2 bg-green-300 rounded mt-2"
                onClick={() => setRegisterModalOpen(true)}
              >
                Create new account
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setRegisterModalOpen(false)} />
      )}
    </div>
  );
};

export default Login;
