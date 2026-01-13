"use client";
import FacebookIcon from "@/public/icons/facebookIcon";
import GoogleIcon from "@/public/icons/googleIcon";
import HideEyeIcon from "@/public/icons/hideEyeIcon";
import ShowEyeIcon from "@/public/icons/showEyeIcon";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePass = (): void => {
    setShowPass((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset({
      password: "",
      email: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fcf9] bg-[radial-gradient(circle_at_top_right,_#d1e7d8_0%,_transparent_40%)] flex flex-col md:flex-row font-sans">
      {/* Left Section: Login Form */}
      <div className="w-full md:w-[40%] border-r-2 border-gray-100 flex flex-col p-8 md:py-18 md:px-12 justify-center items-center relative">
        {/* Top Corner Logo - Visible on all screens */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-10 h-8 rounded flex items-center justify-center">
            <svg width="60px" height="60px" viewBox="0 0 24 24" fill="#064E3B">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,11 17,8 17,8Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Logo</span>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm mt-12 md:mt-3">
          <div className="flex flex-col gap-1 mb-5">
            <h1 className="text-3xl font-medium text-[#064E3B]">
              Welcome back
            </h1>
            <h1 className="text-[#64748B]">Sign in to your account</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="w-full p-3 rounded-xl border-2 border-[#D1FAE5] outline-none focus:border-2 focus:border-[#10B981] transition-all bg-gray-50/30"
              />
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full p-3 rounded-xl border-2 border-[#D1FAE5] outline-none focus:border-2 focus:border-[#10B981] transition-all bg-gray-50/30"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={handlePass}
              >
                {showPass ? <HideEyeIcon /> : <ShowEyeIcon />}
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 items-center px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-green-600" /> Remember
                me
              </label>
              <div className="flex items-center gap-2">
                <span>Forgot Password?</span>
              </div>
            </div>

            <button className="w-full text-white bg-[#10B981] text-white py-3 rounded-full font-semibold shadow-md shadow-green-200 hover:bg-[#059669] transition-all cursor-pointer">
              Login Securely
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex gap-4">
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer">
                <GoogleIcon />
              </button>
              <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer">
                <FacebookIcon />
              </button>
            </div>

            <p className="text-xs text-gray-400">Or continue with:</p>
            <p className="text-sm">
              Don't have account?{" "}
              <Link href="/signUp">
                <span className="text-blue-500 font-semibold cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Branding (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-[60%] justify-center  items-center  py-12">
        <div className="w-full max-w-2xl p-12 flex items-center gap-12 min-h-[400px]">
          {/* Large Branding Logo */}
          <div className="w-1/3 flex justify-center text-[#4ade80]">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,11 17,8 17,8Z" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="w-2/2 border-l-2 border-gray-100 pl-8 space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Yahan App Name</h1>
            <h2 className="text-2xl font-semibold text-gray-600">Head Line</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              choti si dicription jo aapne boli thi yahan par manage ho jayegi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
