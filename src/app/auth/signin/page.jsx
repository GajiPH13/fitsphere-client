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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
//   const onSubmit =async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const data = {};

//     formData.forEach((value, key) => {
//       data[key] = value.toString();
//     });

//     console.log(data);
//     const { email, password } = data;
//     try {
//     const { data, error } = await authClient.signIn.email({
//     email, // required
//     password, // required
//     // rememberMe: true,
//     callbackURL: "/",
// });
// console.log("Sign-in response:", data);
//   } catch (error) {
//     // show toast
//     console.error("Sign-in error:", error);
//   }
//   const role = data?.user?.role || "member";
//   console.log("User role:", role);
//   };
const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const formPayload = {}; // Renamed to avoid mixing up with the auth response

  formData.forEach((value, key) => {
    formPayload[key] = value.toString();
  });

  const { email, password } = formPayload;
  
  try {
    // 1. We remove callbackURL entirely so better-auth doesn't force a page reload
    const response = await authClient.signIn.email({
      email, 
      password,
      // callbackURL: "/", <-- Removed to prevent the millisecond flash/vanish
    });

    if (response.error) {
      console.error("Sign-in error from server:", response.error);
      // show toast for error
      return;
    }

    // 2. Access the user data safely inside the try block from the response
    console.log("Sign-in response data:", response.data);
    
    const role = response.data?.user?.role || "member";
    console.log("User role:", role);

    // 3. Now that you can see the log, you can handle your dashboard routing manually!
    if (role === "admin") router.push("/dashboard/admin");
    else if (role === "trainer") router.push("/dashboard/trainer");
    else router.push("/dashboard/member");

  } catch (error) {
    // show toast for unexpected crashes
    console.error("Sign-in unexpected exception:", error);
  }
};
  return (
    <div className="min-h-screen bg-[#EDF3E7] flex items-center justify-center p-4 sm:p-6 md:p-10 selection:bg-[#6B8E23]/30">
      {/* CENTRALIZED CONTAINER CARD */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-white/40 backdrop-blur-md">
        
        {/* LEFT BRANDING PANEL */}
        <div className="hidden md:flex relative overflow-hidden bg-[#F4F8F1] p-12 text-[#2F3A2F] flex-col justify-between backdrop-blur-xl border-r border-white/20">
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Welcome Back to
              <span className="block mt-2 text-[#2F3A2F]">FitSphere</span>
            </h1>

            <p className="mt-4 max-w-sm text-sm lg:text-base text-[#2F3A2F] leading-relaxed">
              Continue your fitness journey with expert trainers,
              premium classes, and a thriving community.
            </p>
          </div>

          {/* Glassmorphic Testimonial */}
          <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg max-w-sm mt-8">
            <p className="text-sm text-[#3e4c3e] leading-relaxed italic">
              “FitSphere helped me stay consistent and finally
              reach my fitness goals.”
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm"></div>
              <div>
                <p className="text-sm font-semibold">Alex Morgan</p>
                <p className="text-xs text-white/70">
                  Premium Member
                </p>
              </div>
            </div>
          </div>

          {/* Decorative blur circles */}
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="flex items-center justify-center p-8 lg:p-12 bg-white/60 backdrop-blur-xl">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#2F3A2F] tracking-tight">
                Sign In
              </h2>

              <p className="mt-1.5 text-sm text-[#5D6B57]">
                Login to access your dashboard
              </p>
            </div>

            <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {/* Email */}
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
                <Label className="text-sm font-medium text-[#2F3A2F]">Email</Label>
                <Input placeholder="john@example.com" className="mt-1" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Password */}
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
                <Label className="text-sm font-medium text-[#2F3A2F]">Password</Label>
                <Input placeholder="Enter your password" className="mt-1" />
                <Description className="text-xs text-[#5D6B57]/70 mt-1">
                  Must be at least 8 characters
                </Description>
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Forgot Password */}
              <div className="w-full text-right -mt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#6B8E23] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-[#6B8E23] hover:bg-[#5A7A1E] transition-colors text-white font-medium shadow-md mt-2"
              >
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative my-2 flex items-center w-full">
                <div className="flex-grow border-t border-gray-300/60"></div>
                <span className="mx-3 text-xs font-medium text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-300/60"></div>
              </div>

              {/* Google Login */}
              <Button
                variant="secondary"
                className="h-12 w-full rounded-full border border-gray-300/70 bg-white/50 hover:bg-white/80 transition-all font-medium text-sm text-[#2F3A2F]"
              >
                Continue with Google
              </Button>

              {/* Sign Up */}
              <p className="text-center text-xs text-[#5D6B57] w-full mt-2">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-[#6B8E23] hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </Form>
          </div>
        </div>

      </div>
    </div>
  );
}