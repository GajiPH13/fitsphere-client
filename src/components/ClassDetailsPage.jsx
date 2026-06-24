// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";

// export default function ClassDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();
//   // console.log(session);
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const userId = session?.user?.id;

//   const [classData, setClassData] = useState(null);
//   const [isBooked, setIsBooked] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [favoriteLoading, setFavoriteLoading] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       if (!id || isPending) return;

//       if (!userId) {
//         router.push("/signin");
//         return;
//       }

//       try {
//         setLoading(true);

//         const classRes = await fetch(`${API_URL}/api/classes/${id}`);

//         if (!classRes.ok) {
//           throw new Error("Class not found");
//         }

//         const classResult = await classRes.json();

//         const bookingRes = await fetch(
//           `${API_URL}/api/bookings/check?userId=${userId}&classId=${id}`,
//         );
//         const bookingResult = await bookingRes.json();

//         const favoriteRes = await fetch(
//           `${API_URL}/api/favorites/check?userId=${userId}&classId=${id}`,
//         );
//         const favoriteResult = await favoriteRes.json();

//         setClassData(classResult);
//         setIsBooked(Boolean(bookingResult.alreadyBooked));
//         setIsFavorite(Boolean(favoriteResult.isFavorite));
//       } catch (error) {
//         console.error("Failed to load class details:", error);
//         setClassData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id, userId, isPending, API_URL, router]);
//   const role = session?.user?.role || "member";
//   const plan = session?.user?.plan || "free";

//   const getRequiredPlan = () => {
//     if (role === "trainer") return "elite-trainer";
//     if (role === "member") return "starter";
//     return null;
//   };
//   const handleBookNow = async () => {
//     if (!userId) {
//       router.push("/signin");
//       return;
//     }

//     if (isBooked) {
//       alert("You have already booked this class");
//       return;
//     }

//     if (role === "admin") {
//       alert("Admin cannot book classes");
//       return;
//     }

//     if (plan === "free") {
//       const requiredPlan = getRequiredPlan();

//       router.push(`/priceing?=${requiredPlan}&redirect=/classes/${id}`);

//       return;
//     }

//     setBookingLoading(true);

//     try {
//       const res = await fetch(`${API_URL}/api/bookings`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           classId: id,
//         }),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         alert(result.message || "Booking failed");
//         return;
//       }

//       setIsBooked(true);

//       router.push(`/payment/${id}`);
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert("Something went wrong");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const handleFavorite = async () => {
//     if (!userId || !id) {
//       alert("Please login first");
//       router.push("/signin");
//       return;
//     }

//     setFavoriteLoading(true);

//     try {
//       const res = await fetch(`${API_URL}/api/favorites`, {
//         method: isFavorite ? "DELETE" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           classId: id,
//         }),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         alert(result.message || "Favorite action failed");
//         return;
//       }

//       setIsFavorite(!isFavorite);

//       alert(
//         isFavorite
//           ? "Favorite removed successfully"
//           : "Successfully added to your favorites!",
//       );
//     } catch (error) {
//       console.error("Favorite error:", error);
//       alert("Something went wrong");
//     } finally {
//       setFavoriteLoading(false);
//     }
//   };

//   if (loading || isPending) {
//     return <p className="p-10 text-center">Loading class details...</p>;
//   }

//   if (!classData) {
//     return <p className="p-10 text-center">Class not found</p>;
//   }

//   return (
//     <main className="min-h-screen bg-[#EDF3E7] px-6 py-12">
//       <section className="mx-auto grid max-w-6xl gap-10 rounded-[32px] border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
//         <div>
//           <Image
//             src={classData.image}
//             alt={classData.title}
//             width={600}
//             height={560}
//             className="h-140 w-full rounded-[28px] object-cover"
//           />
//         </div>

//         <div>
//           <span className="rounded-full bg-[#DDE5D0] px-4 py-2 text-sm font-semibold text-[#556B2F]">
//             {classData.level}
//           </span>

//           <h1 className="mt-6 text-5xl font-bold text-[#2F3A2F]">
//             {classData.title}
//           </h1>

//           <p className="mt-3 text-lg text-[#5D6B57]">
//             with {classData.trainer}
//           </p>

//           <p className="mt-6 leading-8 text-[#4B5A42]">
//             {classData.description}
//           </p>

//           <div className="mt-8 grid grid-cols-2 gap-4">
//             <Info label="Duration" value={classData.duration} />
//             <Info label="Capacity" value={classData.capacity} />
//             <Info label="Enrolled" value={classData.enrolledCount || 0} />
//             <Info label="Rating" value={classData.rating} />
//             <Info label="Schedule" value={classData.schedule || "Not set"} />
//             <Info label="Price" value={`$${classData.price || 0}`} />
//           </div>

//           <div className="mt-10 flex flex-col gap-4 sm:flex-row">
//             <button
//               onClick={handleBookNow}
//               disabled={isBooked || bookingLoading}
//               className={`w-full rounded-full py-4 font-semibold text-white ${
//                 isBooked
//                   ? "cursor-not-allowed bg-gray-400"
//                   : "bg-[#6B8E23] hover:brightness-110"
//               }`}
//             >
//               {/* {bookingLoading
//                 ? "Processing..."
//                 : isBooked
//                   ? "Already Booked"
//                   : "Book Now"} */}
//               {bookingLoading
//                 ? "Processing..."
//                 : isBooked
//                   ? "Already Booked"
//                   : plan === "free"
//                     ? "Subscribe to Book"
//                     : "Book Now"}
//             </button>

//             <button
//               onClick={handleFavorite}
//               disabled={favoriteLoading}
//               className="w-full rounded-full border border-[#A3B18A] py-4 font-semibold text-[#2F3A2F]"
//             >
//               {favoriteLoading
//                 ? "Updating..."
//                 : isFavorite
//                   ? "Remove Favorite"
//                   : "Add to Favorites"}
//             </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function Info({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-white/70 p-4">
//       <p className="text-sm text-[#5D6B57]">{label}</p>
//       <p className="mt-1 font-semibold text-[#2F3A2F]">{value}</p>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = session?.user?.id;

  const role = session?.user?.role || "member";
  const plan = session?.user?.plan || "free";

  const isFreeUser = plan === "free";
  const isMemberWithPlan = role === "member" && ["starter", "pro"].includes(plan);
  const isTrainerWithPlan = role === "trainer" && plan === "trainer";

  const [classData, setClassData] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id || isPending) return;

      if (!userId) {
        router.push("/signin");
        return;
      }

      try {
        setLoading(true);

        const classRes = await fetch(`${API_URL}/api/classes/${id}`);

        if (!classRes.ok) {
          throw new Error("Class not found");
        }

        const classResult = await classRes.json();

        const bookingRes = await fetch(
          `${API_URL}/api/bookings/check?userId=${userId}&classId=${id}`
        );
        const bookingResult = await bookingRes.json();

        const favoriteRes = await fetch(
          `${API_URL}/api/favorites/check?userId=${userId}&classId=${id}`
        );
        const favoriteResult = await favoriteRes.json();

        setClassData(classResult);
        setIsBooked(Boolean(bookingResult.alreadyBooked));
        setIsFavorite(Boolean(favoriteResult.isFavorite));
      } catch (error) {
        console.error("Failed to load class details:", error);
        setClassData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, userId, isPending, API_URL, router]);

  const handleBookNow = async () => {
    if (!userId) {
      router.push("/signin");
      return;
    }

    if (role === "admin") {
      alert("Admin cannot book classes");
      return;
    }

    if (isFreeUser) {
      alert("Please subscribe to a plan before booking classes.");
      router.push(`/priceing?redirect=/classes/${id}`);
      return;
    }

    if (isTrainerWithPlan) {
      alert("Trainer accounts cannot book classes.");
      return;
    }

    if (!isMemberWithPlan) {
      alert("Your current plan does not allow class booking.");
      return;
    }

    if (isBooked) {
      alert("You have already booked this class");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId: id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Booking failed");
        return;
      }

      setIsBooked(true);
      alert("Class booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!userId || !id) {
      alert("Please login first");
      router.push("/signin");
      return;
    }

    if (role === "admin") {
      alert("Admin cannot add favorites");
      return;
    }

    if (isFreeUser) {
      alert("Please subscribe to a plan before adding favorites.");
      router.push(`/priceing?redirect=/classes/${id}`);
      return;
    }

    if (!isMemberWithPlan && !isTrainerWithPlan) {
      alert("Your current plan does not allow favorites.");
      return;
    }

    if (isFavorite) {
      alert("This class is already in your favorites.");
      return;
    }

    setFavoriteLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          classId: id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Favorite action failed");
        return;
      }

      setIsFavorite(true);
      alert("Successfully added to your favorites!");
    } catch (error) {
      console.error("Favorite error:", error);
      alert("Something went wrong");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading || isPending) {
    return <p className="p-10 text-center">Loading class details...</p>;
  }

  if (!classData) {
    return <p className="p-10 text-center">Class not found</p>;
  }

  return (
    <main className="min-h-screen bg-[#EDF3E7] px-6 py-12">
      <section className="mx-auto grid max-w-6xl gap-10 rounded-[32px] border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
        <div>
          <Image
            src={classData.image}
            alt={classData.title}
            width={600}
            height={560}
            className="h-140 w-full rounded-[28px] object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-[#DDE5D0] px-4 py-2 text-sm font-semibold text-[#556B2F]">
            {classData.level}
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[#2F3A2F]">
            {classData.title}
          </h1>

          <p className="mt-3 text-lg text-[#5D6B57]">
            with {classData.trainer}
          </p>

          <p className="mt-6 leading-8 text-[#4B5A42]">
            {classData.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Info label="Duration" value={classData.duration} />
            <Info label="Capacity" value={classData.capacity} />
            <Info label="Enrolled" value={classData.enrolledCount || 0} />
            <Info label="Rating" value={classData.rating} />
            <Info label="Schedule" value={classData.schedule || "Not set"} />
            <Info label="Price" value={`$${classData.price || 0}`} />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleBookNow}
              disabled={isBooked || bookingLoading || isTrainerWithPlan}
              className={`w-full rounded-full py-4 font-semibold text-white ${
                isBooked || isTrainerWithPlan
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[#6B8E23] hover:brightness-110"
              }`}
            >
              {bookingLoading
                ? "Processing..."
                : isBooked
                ? "Already Booked"
                : isTrainerWithPlan
                ? "Trainer Cannot Book"
                : isFreeUser
                ? "Subscribe to Book"
                : "Book Now"}
            </button>

            <button
              onClick={handleFavorite}
              disabled={favoriteLoading || isFavorite}
              className={`w-full rounded-full border py-4 font-semibold ${
                isFavorite
                  ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
                  : "border-[#A3B18A] text-[#2F3A2F]"
              }`}
            >
              {favoriteLoading
                ? "Updating..."
                : isFavorite
                ? "Saved to Favorites"
                : isFreeUser
                ? "Subscribe to Save"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4">
      <p className="text-sm text-[#5D6B57]">{label}</p>
      <p className="mt-1 font-semibold text-[#2F3A2F]">{value}</p>
    </div>
  );
}