"use client";

import { useState, useEffect } from "react";
import { IconEye } from "@tabler/icons-react";
import { IconEyeOff } from "@tabler/icons-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";

const schema = Yup.object().shape({
  username: Yup.string().required("Please enter your username!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

export default function Login() {
  const [login, { isSuccess, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const { name, username, role, access_token } = useSelector(
    (state: any) => state.auth,
  );

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ username, password }) => {
      await login({ username, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isSuccess && access_token) {
      setCookie("access_token", access_token);
      setCookie("name", name);
      setCookie("username", username);
      setCookie("role", role);
      redirect("/");
    }
  }, [isSuccess, access_token, name, username, role]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="mt-[-80px] min-h-screen flex-col bg-[url('/greeting.webp')] bg-cover bg-no-repeat">
      <div className="flex h-screen max-w-7xl items-center p-12 xl:mx-auto xl:p-0">
        <div className="mt-[5%] h-3/4 w-1/3 rounded-xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm">
          <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={values.username}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
                <div
                  className="absolute right-3.5 top-3.5 cursor-pointer"
                  onClick={passwordToggle}
                >
                  {showPassword ? (
                    <IconEyeOff size={16} />
                  ) : (
                    <IconEye size={16} />
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-1/2 select-none rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
