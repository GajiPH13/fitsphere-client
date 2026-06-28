
"use client";

import React from "react";
import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  FieldError,
  Description,
} from "@heroui/react";
import { Toaster, toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/member",
      });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formPayload = {};

    formData.forEach((value, key) => {
      formPayload[key] = value.toString();
    });

    const { email, password } = formPayload;

    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });

      if (response.error) {
        toast.error("Invalid email or password.");
        return;
      }

      const role = response.data?.user?.role || "member";

      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "trainer") router.push("/dashboard/trainer");
      else router.push("/dashboard/member");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-[#EDF3E7] dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-6 md:p-10 selection:bg-[#6B8E23]/30 transition-colors">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden shadow-2xl border border-white/40 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md">
          <div className="hidden md:flex relative overflow-hidden bg-[#F4F8F1] dark:bg-zinc-900 p-12 text-[#2F3A2F] dark:text-zinc-100 flex-col justify-between backdrop-blur-xl border-r border-white/20 dark:border-zinc-800">
            <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Welcome Back to
                <span className="block mt-2 text-[#2F3A2F] dark:text-zinc-50">
                  FitSphere
                </span>
              </h1>

              <p className="mt-4 max-w-sm text-sm lg:text-base text-[#2F3A2F]/80 dark:text-zinc-300 leading-relaxed">
                Continue your fitness journey with expert trainers, premium
                classes, and a thriving community.
              </p>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/20 dark:border-zinc-800 bg-white/10 dark:bg-zinc-950/40 p-5 backdrop-blur-lg max-w-sm mt-8">
              <p className="text-sm text-[#3e4c3e] dark:text-zinc-300 leading-relaxed italic">
                "FitSphere helped me stay consistent and finally reach my
                fitness goals."
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 dark:bg-zinc-800 border border-white/30 dark:border-zinc-700 backdrop-blur-sm" />
                <div>
                  <p className="text-sm font-semibold">Alex Morgan</p>
                  <p className="text-xs text-white/70 dark:text-zinc-400">
                    Premium Member
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/20 dark:bg-zinc-800/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 dark:bg-zinc-800/10 blur-2xl" />
          </div>

          <div className="flex items-center justify-center p-8 lg:p-12 bg-white/60 dark:bg-zinc-900/20 backdrop-blur-xl">
            <div className="w-full max-w-md">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#2F3A2F] dark:text-zinc-50 tracking-tight">
                  Sign In
                </h2>

                <p className="mt-1.5 text-sm text-[#5D6B57] dark:text-zinc-400">
                  Login to access your dashboard
                </p>
              </div>

              <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Please enter a valid email address";
                    }

                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-[#2F3A2F] dark:text-zinc-200">
                    Email
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    className="mt-1 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
                  />
                  <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1" />
                </TextField>

                <TextField
                  isRequired
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "Password must be at least 8 characters";
                    }

                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-[#2F3A2F] dark:text-zinc-200">
                    Password
                  </Label>
                  <Input
                    placeholder="Enter your password"
                    className="mt-1 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
                  />
                  <Description className="text-xs text-[#5D6B57]/70 dark:text-zinc-400 mt-1">
                    Must be at least 8 characters
                  </Description>
                  <FieldError className="text-xs text-red-500 dark:text-red-400 mt-1" />
                </TextField>

                <div className="w-full text-right -mt-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#6B8E23] dark:text-zinc-400 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#6B8E23] dark:bg-zinc-800 hover:bg-[#5A7A1E] dark:hover:bg-zinc-700 transition-colors text-white font-medium shadow-md mt-2"
                >
                  Sign In
                </Button>

                <div className="relative my-2 flex items-center w-full">
                  <div className="flex-grow border-t border-gray-300/60 dark:border-zinc-800" />
                  <span className="mx-3 text-xs font-medium text-gray-400 dark:text-zinc-500">
                    OR
                  </span>
                  <div className="flex-grow border-t border-gray-300/60 dark:border-zinc-800" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="h-12 w-full cursor-pointer rounded-full border border-gray-300/70 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 hover:bg-white/80 dark:hover:bg-zinc-900 transition-all font-medium text-sm text-[#2F3A2F] dark:text-zinc-200"
                >
                  Continue with Google
                </button>

                <p className="text-center text-xs text-[#5D6B57] dark:text-zinc-400 w-full mt-2">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="font-semibold text-[#6B8E23] dark:text-zinc-300 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}