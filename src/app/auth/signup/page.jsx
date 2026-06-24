"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  FieldError,
  Description,
  Checkbox,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
  const [role, setRole] = useState("member");
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    data.role = role;

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log("Submitting signup data:", data);
    try {
      const { data: session, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.imageUrl || undefined,
        role: data.role,
        plan: "free",
      });

      if (error) {
        console.error("Signup error details:", error);
        alert(error.message || "An error occurred during registration.");
        return;
      }

      console.log("Logged in session info:", session);
      alert("Signup Successful!");
    } catch (err) {
      console.error("Unexpected authentication failure:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    /* Perfectly centered container on the screen */
    <div className="min-h-screen w-full bg-[#EDF3E7] flex items-center justify-center p-4 md:p-6 selection:bg-[#6B8E23]/30">
      
      {/* Medium sized (max-w-4xl) side-by-side glassmorphic card */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-white/40 backdrop-blur-xl">
        
        {/* LEFT COLUMN: Main Form Inputs */}
        <div className="p-8 lg:p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/30">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#2F3A2F] tracking-tight">
              Create Your Account
            </h1>
            <p className="mt-1 text-sm text-[#5D6B57]">
              Join FitSphere and start your fitness journey
            </p>
          </div>

          <Form id="signup-form" className="flex flex-col gap-4" onSubmit={onSubmit}>
            {/* Full Name */}
            <TextField
              isRequired
              name="name"
              validate={(value) =>
                value.length < 3 ? "Name must be at least 3 characters" : null
              }
            >
              <Label className="text-xs font-semibold text-[#2F3A2F]">Full Name</Label>
              <Input placeholder="John Doe" className="mt-1 h-11" />
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email";
                }
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-[#2F3A2F]">Email Address</Label>
              <Input placeholder="john@example.com" className="mt-1 h-11" />
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) return "Minimum 8 characters";
                if (!/[A-Z]/.test(value)) return "Must contain uppercase";
                if (!/[0-9]/.test(value)) return "Must contain a number";
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-[#2F3A2F]">Password</Label>
              <Input placeholder="Enter password" className="mt-1 h-11" />
              <Description className="text-[11px] text-[#5D6B57]/70 mt-0.5">
                8+ chars, 1 uppercase, 1 number
              </Description>
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>

            {/* Confirm Password */}
            <TextField isRequired name="confirmPassword" type="password">
              <Label className="text-xs font-semibold text-[#2F3A2F]">Confirm Password</Label>
              <Input placeholder="Re-enter password" className="mt-1 h-11" />
              <FieldError className="text-xs text-red-500 mt-0.5" />
            </TextField>
          </Form>
        </div>

        {/* RIGHT COLUMN: Profile details, terms, and Actions */}
        <div className="p-8 lg:p-10 flex flex-col justify-between bg-white/20 backdrop-blur-md">
          
          <div className="flex flex-col gap-5">
            {/* Role Selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#2F3A2F] block">Select Role</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  aria-label="Select Member Role"
                  onClick={() => setRole("member")}
                  className={`rounded-xl border h-12 text-sm transition font-medium tracking-wide shadow-sm ${
                    role === "member"
                      ? "border-[#6B8E23] bg-[#6B8E23] text-white shadow-md shadow-[#6B8E23]/20"
                      : "border-gray-300/70 bg-white/50 text-[#2F3A2F] hover:bg-white/80"
                  }`}
                >
                  Member
                </button>
                <button
                  type="button"
                  aria-label="Select Trainer Role"
                  onClick={() => setRole("trainer")}
                  className={`rounded-xl border h-12 text-sm transition font-medium tracking-wide shadow-sm ${
                    role === "trainer"
                      ? "border-[#6B8E23] bg-[#6B8E23] text-white shadow-md shadow-[#6B8E23]/20"
                      : "border-gray-300/70 bg-white/50 text-[#2F3A2F] hover:bg-white/80"
                  }`}
                >
                  Trainer
                </button>
              </div>
              {role === "trainer" && (
                <p className="text-[11px] text-amber-700 font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  Trainer accounts require admin approval.
                </p>
              )}
            </div>

            {/* Profile Picture and Image URL Input */}
            <div className="space-y-2">
              <TextField name="imageUrl" value={imageUrl} onChange={setImageUrl}>
                {/* Visual Label linked correctly inside the component wrapper */}
                <Label className="text-xs font-semibold text-[#2F3A2F]">Profile Image URL</Label>
                <Input placeholder="Select an image if or profile Image URL" className="h-11 mt-1" />
              </TextField>
              
              {/* Preview Box */}
              <div className="flex items-center gap-3 rounded-xl border border-white/40 bg-white/30 p-2 mt-2">
                <div className="h-12 w-12 rounded-xl bg-gray-200/50 border border-white/50 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Avatar Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-400/40" />
                  )}
                </div>
                <span className="text-xs font-medium text-[#5D6B57]">Avatar Preview</span>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="pt-2">
              <Checkbox name="terms" isRequired className="text-xs text-[#5D6B57] font-medium">
                I agree to Terms & Privacy Policy
              </Checkbox>
            </div>
          </div>

          {/* Action and Submit Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Button
              form="signup-form"
              type="submit"
              className="h-12 w-full rounded-xl bg-[#6B8E23] text-white hover:bg-[#5A7A1E] transition-all font-semibold text-sm shadow-md flex gap-2 items-center justify-center"
            >
              <Check className="w-4 h-4" />
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative my-1 flex items-center w-full">
              <div className="flex-grow border-t border-gray-300/50"></div>
              <span className="mx-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">OR</span>
              <div className="flex-grow border-t border-gray-300/50"></div>
            </div>

            {/* Google Signup Button */}
            <Button 
              variant="secondary" 
              aria-label="Sign up with Google"
              className="h-12 w-full rounded-xl border border-gray-300/70 bg-white/60 hover:bg-white/90 transition-all font-semibold text-sm text-[#2F3A2F]"
            >
              Sign up with Google
            </Button>
            
            {/* Login Navigation Link */}
            <p className="text-center text-xs text-[#5D6B57] w-full mt-1">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#6B8E23] hover:underline ml-1">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}