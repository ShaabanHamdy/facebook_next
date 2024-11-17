"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

interface RegisterModalProps {
  onClose: () => void;
}

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  bDay: string;
  bMonth: string;
  bYear: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().matches(
      /^01[0-2][0-9]{8}$/,
      "Please provide a valid Egyptian mobile number"
    ).required("Mobile number is required"),
    gender: Yup.string().required("gender  is required"),
    bDay: Yup.string().required("day date is required"),
    bMonth: Yup.string().required("month date is required"),
    bYear: Yup.string().required("year date is required"),
    password: Yup.string()
    .matches(
      /^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$/,
      "Password must contain at least two uppercase letters and one special character"
    )
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleRegister = async (values: RegisterFormValues) => {
    console.log(values);
    try {
      const data = await axios.post("http://localhost:5000/user/signup", values); // Replace with your registration API endpoint
      console.log(data);
      toast.success("Registration successful!");
      onClose();
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-scroll">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <div className=" text-[20px] flex justify-end ">
          <div
            onClick={onClose}
            className="border-2 p-1 rounded-md cursor-pointer"
          >
            X
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">
          Create a new account
        </h2>
        <Formik<RegisterFormValues>
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            bDay: "",
            bMonth: "",
            bYear: "",
            gender: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          <Form className="space-y-2">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="mobile"
              component="div"
              className="text-red-500 text-sm"
            />
            {/* =============================================== */}
            {/* <Field
              type="date"
              name="birthDate"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="birthDate"
              component="div"
              className="text-red-500 text-sm"
              /> */}
            {/* =================================================== */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">
                Birth of date
              </label>
              <ErrorMessage
                name="bDay"
                component="div"
                className="text-red-500 text-sm"
              />
              <ErrorMessage
                name="bMonth"
                component="div"
                className="text-red-500 text-sm"
              />
              <ErrorMessage
                name="bYear"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="flex space-x-2">
                <Field
                  name="bDay"
                  as="select"
                  className="w-full p-2 border dark:bg-gray-700 dark:text-white rounded"
                >
                  <option>Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Field>
                <Field
                  name="bMonth"
                  as="select"
                  className="w-full p-2 border dark:bg-gray-700 dark:text-white rounded"
                >
                  <option value="">Month</option>
                  {months.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </Field>
                <Field
                  name="bYear"
                  as="select"
                  className="w-full p-2 border dark:bg-gray-700 dark:text-white rounded"
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label>Gender</label>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="flex items-center justify-around space-x-6">
                <label className="flex items-center justify-between space-x-7 border border-gray-300 p-2 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Male</span>
                  <Field type="radio" name="gender" value="male"></Field>
                </label>
                <label className="flex items-center justify-between space-x-7 border border-gray-300 p-2 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    Female
                  </span>
                  <Field type="radio" name="gender" value="female"></Field>
                </label>
              </div>
            </div>
            {/* =================================================== */}
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterModal;
