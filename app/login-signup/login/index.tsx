"use client";
import { signInUser } from "@/app/services/auth";
import FacebookIcon from "@/public/icons/facebookIcon";
import GoogleIcon from "@/public/icons/googleIcon";
import HideEyeIcon from "@/public/icons/hideEyeIcon";
import ShowEyeIcon from "@/public/icons/showEyeIcon";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/app/components/GoogleAuthButton";

type Inputs = {
  email: string;
  password: string;
};

const inputClass =
  "w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors";

const LoginPage = () => {
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
  } = useForm<Inputs>();

  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: (result) => {
      //  Success logic
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Logged in successfully!");
      reset(); // Form reset
      router.push("/User");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "An error occurred";
      toast.error(msg);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate(data);
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
            Welcome back!
          </h1>

          <p className="text-white/85 leading-relaxed mb-10">
            Sign in to continue learning, managing your courses, or growing your
            teaching business.
          </p>

          <Link href="/signUp">
            <div className="inline-block border border-white/40 text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer w-fit">
              Don't have an account? Sign up.
            </div>
          </Link>
        </div>

        {/* Right: Form panel */}
        <div className="w-full md:w-3/5 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text text-center mb-10">
            Login to your account
          </h1>

          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className={inputClass}
              />

              <div
                className="absolute right-0 bottom-3 cursor-pointer"
                onClick={handlePass}
              >
                {showPass ? <HideEyeIcon /> : <ShowEyeIcon />}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-text-muted">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>

              <button
                type="button"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full border border-primary text-primary py-3.5 rounded-full font-semibold hover:bg-primary hover:text-black transition-colors cursor-pointer"
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              ) : (
                "Login"
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

export default LoginPage;
