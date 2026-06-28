// "use client";

// import React, { useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// export default function CreateTrainerClassPage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
//   const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

//   const user = session?.user;
//   const role = user?.role;

//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     image: "", // This will store the secure URL string returned by ImgBB
//     description: "",
//     category: "Yoga",
//     level: "Beginner",
//     duration: "",
//     capacity: "",
//     price: "",
//     schedule: "",
//     location: "",
//   });

//   if (isPending) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
//         <div className="animate-pulse text-lg font-medium text-[#2F3A2F]">
//           Checking permissions...
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     router.push("/auth/signin");
//     return null;
//   }

//   if (role !== "trainer") {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
//         <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/60 p-8 text-center shadow-xl backdrop-blur-xl">
//           <h1 className="text-3xl font-bold text-red-800">Access Denied</h1>
//           <p className="mt-3 text-[#5D6B57]">
//             Only verified trainers can create fitness classes.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Asynchronous Image Upload handler to ImgBB
//   const handleImageUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!IMGBB_API_KEY) {
//       alert("ImgBB API key missing. Please check your environment configuration.");
//       return;
//     }

//     setUploadingImage(true);

//     const uploadData = new FormData();
//     uploadData.append("image", file);

//     try {
//       const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//         method: "POST",
//         body: uploadData,
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // Feed the resulting hosted URL straight into your existing state layout
//         setFormData((prev) => ({
//           ...prev,
//           image: data.data.url,
//         }));
//       } else {
//         alert(data.error?.message || "Failed to host image on ImgBB.");
//       }
//     } catch (error) {
//       console.error("ImgBB upload error:", error);
//       alert("Error uploading image. Please try another file.");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.image) {
//       alert("Please wait for your image to finish uploading or drop a new one.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const classData = {
//         title: formData.title,
//         image: formData.image,
//         description: formData.description,
//         category: formData.category,
//         level: formData.level,
//         duration: formData.duration,
//         capacity: formData.capacity,
//         price: formData.price,
//         schedule: formData.schedule,
//         location: formData.location,
//         trainerId: user.id,
//         trainerName: user.name,
//         status: "pending",
//       };

//       const res = await fetch(`${API_URL}/api/classes`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": user.id,
//         },
//         body: JSON.stringify(classData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to submit class.");
//         return;
//       }

//       alert("Class submitted successfully and is pending admin approval.");
//       router.push("/dashboard/trainer/classes");
//     } catch (error) {
//       console.error("Create class error:", error);
//       alert("Something went wrong while creating class.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#EDF3E7] p-4 sm:p-6 lg:p-8">
//       {/* Abstract Glowing Background Nodes */}
//       <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#6B8E23]/20 blur-3xl" />
//       <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#A3B18A]/30 blur-3xl" />

//       <section className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/40 bg-white/40 shadow-2xl backdrop-blur-xl lg:grid-cols-12">
        
//         {/* LEFT COLUMN: Context & Active User Specs */}
//         <div className="flex flex-col justify-between bg-gradient-to-br from-white/30 to-[#DDE5D0]/20 p-8 sm:p-12 lg:col-span-5 lg:border-r lg:border-white/30">
//           <div>
//             <span className="inline-block rounded-full bg-[#6B8E23]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A6318]">
//               Trainer Portal
//             </span>
//             <h1 className="mt-4 text-4xl font-black tracking-tight text-[#2F3A2F] sm:text-5xl">
//               Create a New Class
//             </h1>
//             <p className="mt-4 text-base leading-relaxed text-[#5D6B57]">
//               Design and market your routine. Fill out the details to submit your session layout for administrative verification.
//             </p>
//           </div>

//           {/* Profile Badge */}
//           <div className="mt-12 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-md">
//             <div className="flex items-center gap-4">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B8E23] text-lg font-bold text-white shadow-sm">
//                 {user.name ? user.name.charAt(0).toUpperCase() : "T"}
//               </div>
//               <div>
//                 <p className="text-xs font-medium uppercase tracking-wider text-[#5D6B57]">
//                   Hosting Trainer
//                 </p>
//                 <h4 className="text-lg font-bold text-[#2F3A2F]">{user.name}</h4>
//               </div>
//             </div>
            
//             <div className="mt-4 flex items-center justify-between border-t border-[#A3B18A]/20 pt-3 text-xs">
//               <span className="text-[#5D6B57]">Submission Status:</span>
//               <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700">
//                 <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
//                 Pending Review
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: The Input form */}
//         <div className="p-8 sm:p-12 lg:col-span-7 bg-white/20">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Class Title</label>
//               <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="e.g., Morning Vinyasa Flow"
//                 required
//                 className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//               />
//             </div>

//             {/* Glassmorphic ImgBB File Upload Selector */}
//             <div>
//               <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Banner Image</label>
//               <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-white/80 bg-white/40 p-6 text-center backdrop-blur-sm transition hover:bg-white/60">
//                 {formData.image ? (
//                   <div className="w-full space-y-3">
//                     <img 
//                       src={formData.image} 
//                       alt="Preview" 
//                       className="mx-auto max-h-40 rounded-lg object-cover shadow-sm"
//                     />
//                     <p className="text-xs text-emerald-700 font-medium truncate px-4">
//                       ✓ Hosted successfully on ImgBB
//                     </p>
//                     <label className="inline-block cursor-pointer text-xs font-bold text-[#6B8E23] hover:underline">
//                       Replace Image
//                       <input 
//                         type="file" 
//                         accept="image/*" 
//                         onChange={handleImageUpload} 
//                         className="hidden" 
//                       />
//                     </label>
//                   </div>
//                 ) : (
//                   <label className="flex w-full cursor-pointer flex-col items-center justify-center py-4">
//                     <div className="flex flex-col items-center justify-center space-y-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-[#5D6B57]">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
//                       </svg>
//                       <p className="text-sm font-medium text-[#2F3A2F]">
//                         {uploadingImage ? "Uploading file directly to server..." : "Click to select banner media"}
//                       </p>
//                       <p className="text-xs text-[#5D6B57]">PNG, JPG, or WEBP formats supported</p>
//                     </div>
//                     <input 
//                       type="file" 
//                       accept="image/*" 
//                       onChange={handleImageUpload} 
//                       disabled={uploadingImage}
//                       className="hidden" 
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Describe what students should expect, required gear, and the overall rhythm..."
//                 rows="3"
//                 required
//                 className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//               />
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Category</label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full appearance-none rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//                 >
//                   <option>Yoga</option>
//                   <option>HIIT</option>
//                   <option>Strength</option>
//                   <option>Cardio</option>
//                   <option>Pilates</option>
//                   <option>Boxing</option>
//                   <option>Zumba</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Target Level</label>
//                 <select
//                   name="level"
//                   value={formData.level}
//                   onChange={handleChange}
//                   className="w-full appearance-none rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//                 >
//                   <option>Beginner</option>
//                   <option>Intermediate</option>
//                   <option>Advanced</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Duration</label>
//                 <input
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   placeholder="e.g., 60 mins"
//                   required
//                   className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Total Capacity</label>
//                 <input
//                   name="capacity"
//                   type="number"
//                   value={formData.capacity}
//                   onChange={handleChange}
//                   placeholder="e.g., 25"
//                   required
//                   className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//                 />
//               </div>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Price ($)</label>
//                 <input
//                   name="price"
//                   type="number"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="e.g., 20"
//                   required
//                   className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Schedule</label>
//                 <input
//                   name="schedule"
//                   value={formData.schedule}
//                   onChange={handleChange}
//                   placeholder="e.g., Tue, Thu - 7:00 AM"
//                   required
//                   className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">Location Setup</label>
//               <input
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="e.g., Room B / Zoom Link"
//                 required
//                 className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading || uploadingImage}
//               className="mt-4 w-full rounded-xl bg-[#6B8E23] py-4 text-base font-bold text-white shadow-lg transition duration-200 hover:bg-[#5A781D] hover:shadow-[#6B8E23]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-400"
//             >
//               {loading ? "Publishing Class..." : uploadingImage ? "Waiting for Image Host..." : "Publish Class Layout"}
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
// import {Folder, FolderOpen} from '@gravity-ui/icons';
import {FolderArrowUpIn} from '@gravity-ui/icons';

export default function CreateTrainerClassPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const user = session?.user;
  const role = user?.role;

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    category: "Yoga",
    level: "Beginner",
    duration: "",
    capacity: "",
    price: "",
    schedule: "",
    location: "",
  });

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/auth/signin");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EDF3E7]">
        <div className="animate-pulse text-lg font-medium text-[#2F3A2F]">
          Checking permissions...
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (role !== "trainer") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF3E7] px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/60 p-8 text-center shadow-xl backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-red-800">Access Denied</h1>
          <p className="mt-3 text-[#5D6B57]">
            Only verified trainers can create fitness classes.
          </p>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMGBB_API_KEY) {
      toast.error("ImgBB API key missing.");
      return;
    }

    setUploadingImage(true);

    const uploadData = new FormData();
    uploadData.append("image", file);

    const uploadPromise = async () => {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to upload image.");
      }

      setFormData((prev) => ({
        ...prev,
        image: data.data.url,
      }));

      return "Image uploaded successfully.";
    };

    try {
      await toast.promise(uploadPromise(), {
        loading: "Uploading image...",
        success: (message) => message,
        error: (err) => err.message || "Image upload failed.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const openCreateModal = (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("Unauthorized. Trainer ID is missing.");
      return;
    }

    setLoading(true);

    const classData = {
      title: formData.title,
      image: formData.image,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      duration: formData.duration,
      capacity: formData.capacity,
      price: formData.price,
      schedule: formData.schedule,
      location: formData.location,
      trainerId: user.id,
      trainerName: user.name,
      status: "pending",
    };

    const createPromise = async () => {
      const res = await fetch(`${API_URL}/api/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify(classData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit class.");
      }

      setIsOpen(false);

      return "Class submitted successfully and is pending admin approval.";
    };

    try {
      await toast.promise(createPromise(), {
        loading: "Submitting class...",
        success: (message) => message,
        error: (err) => err.message || "Something went wrong.",
      });

      router.push("/dashboard/trainer/classes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#EDF3E7] p-4 sm:p-6 lg:p-8">
      <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#6B8E23]/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#A3B18A]/30 blur-3xl" />

      <section className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/40 bg-white/40 shadow-2xl backdrop-blur-xl lg:grid-cols-12">
        <div className="flex flex-col justify-between bg-gradient-to-br from-white/30 to-[#DDE5D0]/20 p-8 sm:p-12 lg:col-span-5 lg:border-r lg:border-white/30">
          <div>
            <span className="inline-block rounded-full bg-[#6B8E23]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A6318]">
              Trainer Portal
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#2F3A2F] sm:text-5xl">
              Create a New Class
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#5D6B57]">
              Design and market your routine. Fill out the details to submit
              your session layout for administrative verification.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B8E23] text-lg font-bold text-white shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "T"}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#5D6B57]">
                  Hosting Trainer
                </p>
                <h4 className="text-lg font-bold text-[#2F3A2F]">
                  {user.name}
                </h4>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#A3B18A]/20 pt-3 text-xs">
              <span className="text-[#5D6B57]">Submission Status:</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                Pending Review
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/20 p-8 sm:p-12 lg:col-span-7">
          <form onSubmit={openCreateModal} className="space-y-5">
            <InputField
              label="Class Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Morning Vinyasa Flow"
            />

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">
                Banner Image
              </label>

              <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-white/80 bg-white/40 p-6 text-center backdrop-blur-sm transition hover:bg-white/60">
                {formData.image ? (
                  <div className="w-full space-y-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mx-auto max-h-40 rounded-lg object-cover shadow-sm"
                    />

                    <p className="truncate px-4 text-xs font-medium text-emerald-700">
                      ✓ Hosted successfully on ImgBB
                    </p>

                    <label className="inline-block cursor-pointer text-xs font-bold text-[#6B8E23] hover:underline">
                      Replace Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex w-full cursor-pointer flex-col items-center justify-center py-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-sm font-medium text-[#2F3A2F]">
                        <FolderArrowUpIn className="h-10 w-10" />
                        {uploadingImage
                          ? "Uploading file..."
                          : "Click to select banner media"}
                      </p>

                      <p className="text-xs text-[#5D6B57]">
                        PNG, JPG, or WEBP formats supported
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what students should expect..."
                rows="3"
                required
                className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={["Yoga", "HIIT", "Strength", "Cardio", "Pilates", "Boxing", "Zumba"]}
              />

              <SelectField
                label="Target Level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                options={["Beginner", "Intermediate", "Advanced"]}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 60 mins"
              />

              <InputField
                label="Total Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 25"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Price ($)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 20"
              />

              <InputField
                label="Schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="e.g., Tue, Thu - 7:00 AM"
              />
            </div>

            <InputField
              label="Location Setup"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Room B / Zoom Link"
            />

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="mt-4 w-full rounded-xl bg-[#6B8E23] py-4 text-base font-bold text-white shadow-lg transition duration-200 hover:bg-[#5A781D] hover:shadow-[#6B8E23]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Publishing Class..."
                : uploadingImage
                  ? "Waiting for Image Host..."
                  : "Publish Class Layout"}
            </button>
          </form>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-black text-[#2F3A2F]">
              Submit Class
            </h2>

            <p className="mt-4 text-[#4B5A42]">
              Are you sure you want to submit{" "}
              <span className="font-bold text-[#2F3A2F]">
                {formData.title}
              </span>{" "}
              for admin approval?
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your class will appear publicly only after admin approval.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="bordered"
                onPress={() => setIsOpen(false)}
                isDisabled={loading}
              >
                Cancel
              </Button>

              <Button
                color="primary"
                onPress={handleSubmit}
                isDisabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] placeholder-gray-400 backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2F3A2F]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-white/60 bg-white/50 p-4 text-[#2F3A2F] backdrop-blur-sm transition focus:border-[#6B8E23] focus:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20"
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}