
// "use client";

// import React, { useEffect, useState } from "react";
// import ClassCard from "../../components/ClassCard";
// import Link from "next/link";
// import { Pagination } from "@heroui/react";

// export default function AllClasses() {
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // --- Pagination States tied to Backend Metrics ---
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(4);
//   const [totalItems, setTotalItems] = useState(20);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     const fetchClasses = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/classes?page=${page}&limit=${itemsPerPage}`
//         );
       
//         if (!res.ok) {
//           throw new Error("Failed to fetch classes");
//         }

//         const data = await res.json();
        
//         setClasses(data.classes || []);
//         setTotalPages(data.totalPages || 1);
//         setTotalItems(data.totalItems || 0);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClasses();
//   }, [page]); // Runs whenever HeroUI updates the current page index

//   // --- HeroUI Helper to render Ellipsis & Number Arrays ---
//   const getPageNumbers = () => {
//     const pages = [];
//     pages.push(1);

//     if (page > 3) {
//       pages.push("ellipsis");
//     }

//     const start = Math.max(2, page - 1);
//     const end = Math.min(totalPages - 1, page + 1);

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     if (page < totalPages - 2) {
//       pages.push("ellipsis");
//     }

//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   // Dynamic Item Counters
//   const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
//   const endItem = Math.min(page * itemsPerPage, totalItems);

//   if (loading) {
//     return (
//       <section className="px-30 py-20">
//         <p className="text-center text-lg text-[#2F3A2F]">Loading classes...</p>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="px-30 py-20">
//         <p className="text-center text-red-500">{error}</p>
//       </section>
//     );
//   }

//   return (
//     <section className="px-30 py-20 bg-[#e9f0e4]/40 backdrop-blur-xl border border-[#c7d6b8]/40 shadow-lg">
//       <div className="flex justify-between items-center mb-12">
//         <div>
//           <h2 className="text-4xl font-bold text-[#2F3A2F]">
//             All Classes
//           </h2>
//           <p className="mt-2 text-[#5D6B57]">
//             Join expertly designed training sessions
//           </p>
//         </div>

//         <Link href="/allclasses" className="hidden md:block px-5 py-3 rounded-full border border-[#A3B18A]">
//           View All →
//         </Link>
//       </div>

//       {/* Classes Grid Display */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//         {classes.map((item) => (
//           <ClassCard key={item._id || item.title} item={item} />
//         ))}
//       </div>

//       {/* --- HeroUI Primitive Pagination Matrix --- */}
//       <Pagination className="w-full flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#c7d6b8]/30 pt-8">
//         <Pagination.Summary className="text-sm font-medium text-[#5D6B57]">
//           Showing {startItem}-{endItem} of {totalItems} results
//         </Pagination.Summary>

//         <Pagination.Content className="flex items-center gap-2">
//           {/* Previous Controls */}
//           <Pagination.Item>
//             <Pagination.Previous 
//               isDisabled={page === 1} 
//               onPress={() => setPage((p) => p - 1)}
//               className="px-4 py-2 rounded-full border border-[#A3B18A] text-[#2F3A2F] bg-white/80 transition hover:bg-[#e9f0e4] disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               <Pagination.PreviousIcon className="inline mr-1" />
//               <span>Previous</span>
//             </Pagination.Previous>
//           </Pagination.Item>

//           {/* Core Page Map Blocks */}
//           {getPageNumbers().map((p, i) =>
//             p === "ellipsis" ? (
//               <Pagination.Item key={`ellipsis-${i}`}>
//                 <Pagination.Ellipsis className="px-3 py-2 text-[#5D6B57]" />
//               </Pagination.Item>
//             ) : (
//               <Pagination.Item key={p}>
//                 <Pagination.Link 
//                   isActive={p === page} 
//                   onPress={() => setPage(p)}
//                   className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
//                     p === page 
//                       ? "bg-[#2F3A2F] text-white border-[#2F3A2F]" 
//                       : "border-[#A3B18A] text-[#2F3A2F] bg-white/80 hover:bg-[#e9f0e4]"
//                   }`}
//                 >
//                   {p}
//                 </Pagination.Link>
//               </Pagination.Item>
//             )
//           )}

//           {/* Next Controls */}
//           <Pagination.Item>
//             <Pagination.Next 
//               isDisabled={page === totalPages} 
//               onPress={() => setPage((p) => p + 1)}
//               className="px-4 py-2 rounded-full border border-[#A3B18A] text-[#2F3A2F] bg-white/80 transition hover:bg-[#e9f0e4] disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               <span>Next</span>
//               <Pagination.NextIcon className="inline ml-1" />
//             </Pagination.Next>
//           </Pagination.Item>
//         </Pagination.Content>
//       </Pagination>
//     </section>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import ClassCard from "../../components/ClassCard";
import Link from "next/link";
import { Pagination } from "@heroui/react";

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");

  // --- Pagination States ---
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        // Appended &search parameter dynamically to the API call
        const res = await fetch(
          `http://localhost:5000/api/classes?page=${page}&limit=${itemsPerPage}&search=${searchQuery}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await res.json();
        
        setClasses(data.classes || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.totalItems || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Simple debounce/cleanup mechanism to prevent hitting the database on every single keystroke
    const delayDebounceFn = setTimeout(() => {
      fetchClasses();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, searchQuery]); // Re-runs when the page OR the search query changes

  // Reset pagination to page 1 whenever user searches
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  // --- HeroUI Helper to render Ellipsis & Number Arrays ---
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Dynamic Item Counters
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  if (error) {
    return (
      <section className="px-30 py-20">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="px-30 py-20 bg-[#e9f0e4]/40 backdrop-blur-xl border border-[#c7d6b8]/40 shadow-lg">
      
      {/* --- HORIZONTAL HEADER & SEARCH BAR BLOCK --- */}
      <div className="flex flex-col items-center  
       gap-6 mb-12 border-b
       border-[#c7d6b8]/30 pb-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#2F3A2F]">
            All Classes
          </h2>
          <p className="mt-2 text-[#5D6B57]">
            Join expertly designed training sessions
          </p>
        </div>

        {/* Dynamic Search Box Input */}
        <div className="relative w-full lg:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {/* SVG Search Icon */}
            <svg 
              className="w-5 h-5 text-[#5D6B57]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search classes by title or trainer..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-5 py-3 rounded-full border border-[#A3B18A] bg-white/80 text-[#2F3A2F] focus:outline-none focus:ring-2 focus:ring-[#2F3A2F]/20 placeholder-[#5D6B57]/60 transition-all text-sm"
          />
        </div>
      </div>

      {/* Classes Grid Display / Handling Loading State Fluidly inside the wrapper */}
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <p className="text-lg text-[#2F3A2F]">Loading target classes...</p>
        </div>
      ) : classes.length === 0 ? (
        <div className="h-96 flex flex-col justify-center items-center text-center">
          <p className="text-xl font-medium text-[#2F3A2F]">No classes found</p>
          <p className="text-sm text-[#5D6B57] mt-1">Try checking your spelling or search for something else.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {classes.map((item) => (
            <ClassCard key={item._id || item.title} item={item} />
          ))}
        </div>
      )}

      {/* --- HeroUI Primitive Pagination Matrix --- */}
      {(!loading && classes.length > 0) && (
        <Pagination className="w-full flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#c7d6b8]/30 pt-8">
          <Pagination.Summary className="text-sm font-medium text-[#5D6B57]">
            Showing {startItem}-{endItem} of {totalItems} results
          </Pagination.Summary>

          <Pagination.Content className="flex items-center gap-2">
            <Pagination.Item>
              <Pagination.Previous 
                isDisabled={page === 1} 
                onPress={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-full border border-[#A3B18A] text-[#2F3A2F] bg-white/80 transition hover:bg-[#e9f0e4] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Pagination.PreviousIcon className="inline mr-1" />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>

            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis className="px-3 py-2 text-[#5D6B57]" />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link 
                    isActive={p === page} 
                    onPress={() => setPage(p)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      p === page 
                        ? "bg-[#2F3A2F] text-white border-[#2F3A2F]" 
                        : "border-[#A3B18A] text-[#2F3A2F] bg-white/80 hover:bg-[#e9f0e4]"
                    }`}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}

            <Pagination.Item>
              <Pagination.Next 
                isDisabled={page === totalPages} 
                onPress={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-full border border-[#A3B18A] text-[#2F3A2F] bg-white/80 transition hover:bg-[#e9f0e4] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <Pagination.NextIcon className="inline ml-1" />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      )}
    </section>
  );
}