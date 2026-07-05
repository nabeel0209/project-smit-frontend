"use client";

import FacebookIcon from "@/public/icons/facebookIcon";
import GoogleIcon from "@/public/icons/googleIcon";
import HideEyeIcon from "@/public/icons/hideEyeIcon";
import ShowEyeIcon from "@/public/icons/showEyeIcon";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpUser } from "@/app/services/auth";
import { signUpCreator } from "@/app/services/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from "@/app/services/auth.store";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";

const registerSchema = yup.object({
  name: yup.string().required().min(3, "name must be atleast 3 chars"),
  dob: yup.string().required("date of Birth is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email (e.g. abc@gmail.com)",
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .max(20, "Maximum 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "Password must contain at least 1 letter and 1 number.",
    ),
  gender: yup
    .string()
    .nullable()
    .defined()
    .transform((value) => (value === "" ? null : value)),
  rememberMe: yup
    .boolean()
    .optional()
    .nullable()
    .defined()
    .transform((value) => (value === "" ? null : value)),
});

type Inputs = yup.InferType<typeof registerSchema>;

const inputClass =
  "w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors";

const SignUpPage = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePass = (): void => {
    setShowPass((prev) => !prev);
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (result) => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Account created successfully! ");
      reset(); // Form clear karein
      router.push("/User");
    },

    onError: (err: any) => {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      toast.error(msg);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formatedData = {
      ...data,
      dob: new Date(data.dob),
    };
    mutate(formatedData);
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-border-soft overflow-hidden flex flex-col md:flex-row">
        {/* Left: Brand panel */}
        <div className="w-full md:w-2/5 bg-primary p-10 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <Link href="/" className="flex gap-3 items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary font-bold text-sm">
                L
              </div>
              <span className="text-lg font-semibold text-white">
                Learnix Labs
              </span>
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-16 md:mt-0">
            Come join us!
          </h1>
          <p className="text-white/85 leading-relaxed mb-10">
            We&apos;re excited to have you here. Create an account to start
            learning, or start selling your own courses.
          </p>

          <Link href="/login">
            <div className="inline-block border border-white/40 text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer w-fit">
              Already have an account? Log in.
            </div>
          </Link>
        </div>

        {/* Right: Form panel */}
        <div className="w-full md:w-3/5 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text text-center mb-10">
            Create an account
          </h1>

          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className={inputClass}
              />
              {errors.name && (
                <span className="text-red-500 text-[13px]">
                  {errors?.name?.message}
                </span>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className={inputClass}
              />
              {errors.email && (
                <span className="text-red-500 text-[13px]">
                  {errors?.email?.message}
                </span>
              )}
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col w-1/2">
                <input
                  type="date"
                  placeholder="Date of Birth"
                  {...register("dob", { required: true })}
                  className={`${inputClass} text-text-muted`}
                />
                {errors.dob && (
                  <span className="text-red-500 text-[13px]">
                    {errors?.dob?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <select
                  className={`${inputClass} appearance-none cursor-pointer text-text-muted`}
                  defaultValue=""
                  {...register("gender")}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className={inputClass}
              />
              {errors.password && (
                <span className="text-red-500 text-[13px]">
                  {errors?.password?.message}
                </span>
              )}

              <div
                className="absolute right-0 bottom-3 cursor-pointer"
                onClick={handlePass}
              >
                {showPass ? <HideEyeIcon /> : <ShowEyeIcon />}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-text-muted">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="accent-primary"
              />
              Remember me
            </label>

            <button
              disabled={isPending}
              className="w-full border border-primary text-primary py-3.5 rounded-full font-semibold hover:bg-primary hover:text-black transition-colors cursor-pointer"
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              ) : (
                "Signup"
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border-soft" />
                <span className="text-xs text-text-muted whitespace-nowrap">
                  or
                </span>
                <div className="flex-1 h-px bg-border-soft" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <GoogleAuthButton />

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-border-soft text-text text-sm font-medium py-3 px-4 rounded-full hover:border-primary hover:bg-surface transition-colors cursor-pointer"
                >
                  <FacebookIcon />
                  <span className="truncate">Continue with Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
