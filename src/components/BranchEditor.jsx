// // File: BranchEditor.jsx
// import { useState, useRef, useEffect } from "react";
// import { branchHeroData, branchData } from "../data/branchData";
// import ViewDetails from "../shared/ViewDetails";

// const BranchEditor = () => {
//   // const [hero, setHero] = useState(branchHeroData);
//   const [branches, setBranches] = useState(branchData);
//   const [showHeroModal, setShowHeroModal] = useState(false);
//   const [editBranch, setEditBranch] = useState(null);
//   const [showBranchModal, setShowBranchModal] = useState(false);
//   const [formBranch, setFormBranch] = useState({
//     district: "",
//     address: "",
//     description: "",
//     images: [],
//   });
//   const [formHero, setFormHero] = useState({
//     title: "",
//     des: "",
//     image: null,
//   });
//   const [confirmAction, setConfirmAction] = useState(null);

//   const branchImageInputRef = useRef(null);

//   // useEffect(() => {
//   //   if (showHeroModal) {
//   //     setFormHero({
//   //       title: hero.data.title,
//   //       des: hero.data.des,
//   //       image: hero.img
//   //     });
//   //   }
//   // }, [showHeroModal]);

//   useEffect(() => {
//     if (showBranchModal && editBranch) {
//       setFormBranch({
//         district: editBranch.district,
//         address: editBranch.address,
//         description: editBranch.description,
//         images: [...editBranch.images],
//       });
//     } else if (showBranchModal) {
//       setFormBranch({
//         district: "",
//         address: "",
//         description: "",
//         images: [],
//       });
//     }
//   }, [showBranchModal, editBranch]);

//   // const handleHeroSave = () => {
//   //   setHero({
//   //     img: formHero.image,
//   //     data: {
//   //       title: formHero.title,
//   //       des: formHero.des,
//   //       btn: false
//   //     }
//   //   });
//   //   setShowHeroModal(false);
//   // };

//   const handleBranchSave = () => {
//     if (
//       !formBranch.district ||
//       !formBranch.address ||
//       !formBranch.description ||
//       formBranch.images.length === 0
//     )
//       return;
//     if (editBranch) {
//       const updated = branches.map((b) =>
//         b.id === editBranch.id ? { ...formBranch, id: editBranch.id } : b
//       );
//       setBranches(updated);
//     } else {
//       setBranches([...branches, { ...formBranch, id: Date.now() }]);
//     }
//     setShowBranchModal(false);
//   };

//   const handleImageUpload = (e, isHero = false) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const imageUrl = URL.createObjectURL(file);
//     if (isHero) {
//       setFormHero({ ...formHero, image: imageUrl });
//     } else {
//       if (formBranch.images.length >= 8) return;
//       setFormBranch({
//         ...formBranch,
//         images: [...formBranch.images, imageUrl],
//       });
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = formBranch.images.filter((_, i) => i !== index);
//     setFormBranch({ ...formBranch, images: newImages });
//   };

//   const confirmAndExecute = (message, action) => {
//     setConfirmAction({ message, action });
//   };

//   const handleConfirm = () => {
//     confirmAction.action();
//     setConfirmAction(null);
//   };

//   return (
//     <div className="p-4 space-y-10 xl:px-40">
//       {/* Hero Section */}
//       {/* <section className="bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-3xl font-bold mb-4 text-headerColorHover">Current Hero</h2>
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 space-y-2">
//             <h3 className="text-2xl font-semibold">{hero.data.title}</h3>
//             <p className="text-gray-600">{hero.data.des}</p>
//           </div>
//           <img src={hero.img} alt="Hero" className="w-full lg:w-1/3 rounded" />
//         </div>
//         <button
//           className="mt-4 px-6 py-2 bg-headerColor text-white rounded hover:bg-headerColorHover"
//           onClick={() => setShowHeroModal(true)}
//         >
//           Edit
//         </button>
//       </section> */}

//       {/* Hero Edit Modal */}
//       {/* {showHeroModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
//             <h3 className="text-xl font-bold">Edit Hero Section</h3>
//             <input
//               className="w-full border px-3 py-2 rounded"
//               value={formHero.title}
//               onChange={(e) => setFormHero({ ...formHero, title: e.target.value })}
//               placeholder="Title"
//             />
//             <textarea
//               className="w-full border px-3 py-2 rounded"
//               value={formHero.des}
//               onChange={(e) => setFormHero({ ...formHero, des: e.target.value })}
//               placeholder="Description"
//             />
//             <div className="space-y-2">
//               <p className="font-medium">Image Preview:</p>
//               {formHero.image && <img src={formHero.image} alt="Preview" className="rounded w-full" />}
//               <input
//                 type="file"
//                 onChange={(e) => handleImageUpload(e, true)}
//               />
//             </div>
//             <div className="flex justify-between">
//               <button onClick={() => setShowHeroModal(false)} className="px-4 py-2 border rounded">Cancel</button>
//               <button
//                 onClick={handleHeroSave}
//                 className="px-4 py-2 bg-headerColor text-white rounded hover:bg-headerColorHover"
//               >Save</button>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* Branch List */}
//       <section className="bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-3xl font-bold mb-4 text-headerColorHover">
//           Current Branches
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
//           {branches.map((branch) => (
//             <div
//               key={branch.id}
//               className="relative border rounded-lg overflow-hidden group bg-gray-50"
//             >
//               <div className="flex">
//                 <img
//                   src={branch.images[0]}
//                   alt="Branch"
//                   className="w-1/2 h-32 object-cover"
//                 />
//                 <div className="flex-1 p-2">
//                   <h3 className="text-lg font-bold text-blue-700">
//                     {branch.district}
//                   </h3>
//                   <p className="text-sm text-gray-500">{branch.address}</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {branch.description}
//                   </p>
//                 </div>
//               </div>
//               <div className="absolute bottom-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition">
//                 <button
//                   className="bg-headerColor hover:bg-headerColorHover text-white px-3 py-1 rounded"
//                   onClick={() => {
//                     setEditBranch(branch);
//                     setShowBranchModal(true);
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-contestRed hover:bg-red-800 text-white px-3 py-1 rounded"
//                   onClick={() =>
//                     confirmAndExecute(
//                       "Are you sure you want to delete this branch?",
//                       () =>
//                         setBranches(branches.filter((b) => b.id !== branch.id))
//                     )
//                   }
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div
//             onClick={() => {
//               setEditBranch(null);
//               setShowBranchModal(true);
//             }}
//             className="border-2 border-dashed rounded-lg flex items-center justify-center p-6 cursor-pointer hover:bg-gray-200"
//           >
//             + Add Branch
//           </div>
//         </div>
//       </section>

//       {/* Branch Modal */}
//       {showBranchModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
//             <h3 className="text-xl font-bold">
//               {editBranch ? "Edit Branch" : "Add Branch"}
//             </h3>
//             <div className="space-y-2">
//               <p className="font-medium">
//                 Images ({formBranch.images.length}/8):
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {formBranch.images.map((img, idx) => (
//                   <div key={idx} className="relative w-16 h-16">
//                     <img
//                       src={img}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded"
//                     />
//                     <button
//                       className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                       onClick={() => handleRemoveImage(idx)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//                 {formBranch.images.length < 8 && (
//                   <button
//                     className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xl"
//                     onClick={() => branchImageInputRef.current.click()}
//                   >
//                     +
//                   </button>
//                 )}
//               </div>
//               <input
//                 type="file"
//                 ref={branchImageInputRef}
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />
//             </div>
//             <input
//               className="w-full border px-3 py-2 rounded"
//               value={formBranch.district}
//               onChange={(e) =>
//                 setFormBranch({ ...formBranch, district: e.target.value })
//               }
//               placeholder="District"
//             />
//             <input
//               className="w-full border px-3 py-2 rounded"
//               value={formBranch.address}
//               onChange={(e) =>
//                 setFormBranch({ ...formBranch, address: e.target.value })
//               }
//               placeholder="Address"
//             />
//             <textarea
//               className="w-full border px-3 py-2 rounded"
//               value={formBranch.description}
//               onChange={(e) =>
//                 setFormBranch({ ...formBranch, description: e.target.value })
//               }
//               placeholder="Description"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={() => setShowBranchModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleBranchSave}
//                 className={`px-4 py-2 rounded text-white ${
//                   formBranch.district &&
//                   formBranch.address &&
//                   formBranch.description &&
//                   formBranch.images.length > 0
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-gray-300 cursor-not-allowed"
//                 }`}
//                 disabled={
//                   !formBranch.district ||
//                   !formBranch.address ||
//                   !formBranch.description ||
//                   formBranch.images.length === 0
//                 }
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Save All */}
//       <div className="text-center">
//         <button
//           className="px-8 py-2 bg-headerColorHover text-white rounded hover:bg-headerColor"
//           onClick={() =>
//             confirmAndExecute(
//               "Are you sure you want to save all changes?",
//               () => {}
//             )
//           }
//         >
//           Save All Changes
//         </button>
//       </div>

//       {/* Confirmation Modal */}
//       {confirmAction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-4 text-center">
//             <p className="text-lg font-semibold">{confirmAction.message}</p>
//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 className="px-4 py-2 border rounded"
//                 onClick={() => setConfirmAction(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-contestRed text-white rounded hover:bg-red-700"
//                 onClick={handleConfirm}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BranchEditor;
