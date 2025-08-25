// "use client";

// import { useContext, useState, useEffect, useRef } from "react";
// import { ResumeContext } from "../context/ResumeContext";
// import { AlertCircle, X, Loader2, ChevronDown } from "lucide-react";
// import { useRouter } from "next/router";
// import { BASE_URL } from "../Constant/constant";
// import { useTranslation } from "react-i18next";
// import axiosInstance from "../utils/axiosInstance";
// import Cropper from "react-easy-crop";

// const PersonalInformation = () => {
//   const { i18n, t } = useTranslation();
//   const language = i18n.language;
//   const {
//     resumeData,
//     setResumeData,
//     handleProfilePicture,
//     handleChange,
//     resumeStrength,
//     setResumeStrength,
//     deleteProfilePicture,
//   } = useContext(ResumeContext);
//   const router = useRouter();
//   const { improve } = router.query;

//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [countryCodes, setCountryCodes] = useState([]);
//   const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
//   const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
//   const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India
//   const [isLoading, setIsLoading] = useState({
//     jobTitle: false,
//     location: false,
//     autoFix: false,
//     countryCodes: false,
//   });
//   const [resolvedFields, setResolvedFields] = useState({});

//   // Image cropping states
//   const [showCropModal, setShowCropModal] = useState(false);
//   const [cropImage, setCropImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const dummyImage =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

//   useEffect(() => {
//     const fetchCountryCodes = async () => {
//       setIsLoading((prev) => ({ ...prev, countryCodes: true }));
//       try {
//         const response = await axiosInstance.get(
//           `/api/user/countries?lang=${language}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           const sortedCountries = data.data.sort((a, b) =>
//             a.name.localeCompare(b.name)
//           );
//           setCountryCodes(sortedCountries);
//         }
//       } catch (error) {
//         console.error("Error fetching country codes:", error);
//       }
//       setIsLoading((prev) => ({ ...prev, countryCodes: false }));
//     };

//     fetchCountryCodes();
//   }, [language]);

//   const fetchJobTitles = async (keyword) => {
//     if (!keyword || keyword.length < 1) {
//       setJobTitleSuggestions([]);
//       return;
//     }

//     setIsLoading((prev) => ({ ...prev, jobTitle: true }));
//     try {
//       const response = await axiosInstance.get(
//         `/api/user/job-title?job_title_keyword=${encodeURIComponent(
//           keyword
//         )}&lang=${language}`
//       );

//       const jobTitles = response.data.data.map((item) => item.name);
//       setJobTitleSuggestions(jobTitles);
//       setShowJobTitleDropdown(true);
//     } catch (error) {
//       console.error("Error fetching job titles:", error);
//     }
//     setIsLoading((prev) => ({ ...prev, jobTitle: false }));
//   };

//   const fetchLocations = async (keyword) => {
//     if (!keyword || keyword.length < 1) {
//       setLocationSuggestions([]);
//       return;
//     }

//     setIsLoading((prev) => ({ ...prev, location: true }));
//     try {
//       const response = await axiosInstance.get(
//         `/api/user/locations?locations=${encodeURIComponent(
//           keyword
//         )}&lang=${language}`
//       );
//       const data = response.data;
//       const locations = data.data.location_names.map((item) => item);
//       setLocationSuggestions(locations);
//       setShowLocationDropdown(true);
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//     setIsLoading((prev) => ({ ...prev, location: false }));
//   };

//   const handleAutoFix = async (field, content) => {
//     if (!content) return;

//     setIsLoading((prev) => ({ ...prev, autoFix: true }));

//     try {
//       let endpoint = "";
//       let key = "";

//       if (field === "name") {
//         endpoint = "/ai-username";
//         key = "user name";
//       } else if (field === "position") {
//         endpoint = "/ai-jobtitle";
//         key = "job title";
//       } else if (field === "contactInformation") {
//         endpoint = "/ai-contact";
//         key = "contact information";
//       }

//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `${BASE_URL}/api/user${endpoint}?lang=${language}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`,
//           },
//           body: JSON.stringify({
//             key: key,
//             keyword: "auto improve",
//             content: content,
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         if (data.data.resume_analysis) {
//           let updatedValue = null;

//           if (field === "name") {
//             updatedValue = data.data.resume_analysis.user_name;
//           } else if (field === "position") {
//             updatedValue = data.data.resume_analysis.job_title;
//           } else if (field === "contactInformation") {
//             updatedValue = data.data.resume_analysis.contact;
//           }

//           if (updatedValue) {
//             const event = {
//               target: {
//                 name: field,
//                 value: updatedValue,
//               },
//             };
//             handleChange(event);
//             setActiveTooltip(null);

//             // Clear errors for this field
//             if (resumeStrength?.personal_info_strenght) {
//               const updatedStrength = {
//                 ...resumeStrength,
//                 personal_info_strenght: {
//                   ...resumeStrength.personal_info_strenght,
//                   [field]: [],
//                 },
//               };
//               setResumeStrength(updatedStrength);
//             }
//           }
//         }
//       }
//     } catch (error) {
//       console.error(`Error auto-fixing ${field}:`, error);
//     } finally {
//       setIsLoading((prev) => ({ ...prev, autoFix: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const maxLengths = {
//       name: 30,
//       position: 40,
//       contactInformation: 10,
//       email: 50,
//       address: 50,
//     };

//     // Check if value exceeds max length for the field
//     if (maxLengths[name] && value.length > maxLengths[name]) {
//       return;
//     }
//     handleChange(e);

//     if (name === "position") {
//       fetchJobTitles(value);
//     } else if (name === "address") {
//       fetchLocations(value);
//     }
//   };

//   const selectSuggestion = (field, value) => {
//     const event = {
//       target: { name: field, value },
//     };
//     handleChange(event);
//     if (field === "position") {
//       setShowJobTitleDropdown(false);
//     } else {
//       setShowLocationDropdown(false);
//     }
//   };

//   const selectCountryCode = (country) => {
//     const newCountryCode = `+${country.phonecode}`;
//     setSelectedCountryCode(newCountryCode);

//     // Update contact information with new country code
//     if (resumeData.contactInformation) {
//       const updatedContact = {
//         target: {
//           name: "contactInformation",
//           value: `${newCountryCode} ${resumeData.contactInformation.replace(
//             /^(\+\d+\s*)?/,
//             ""
//           )}`,
//         },
//       };
//       handleChange(updatedContact);
//     }

//     setShowCountryCodeDropdown(false);
//   };

//   // const hasErrors = (field) => {
//   //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
//   //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
//   // };

//   const getSuggestions = (field) => {
//     return resumeStrength?.personal_info_strenght?.[field] || [];
//   };

//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowJobTitleDropdown(false);
//       setShowLocationDropdown(false);
//       setShowCountryCodeDropdown(false);
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const formFields = [
//     { field: "name", placeholder: "Full Name", type: "text" },
//     {
//       field: "position",
//       placeholder: "Job Title",
//       type: "text",
//       hasSuggestions: true,
//     },
//     {
//       field: "contactInformation",
//       placeholder: "Contact Number",
//       type: "tel",
//       hasCountryCode: true,
//     },
//     { field: "email", placeholder: "Email", type: "email" },
//     {
//       field: "address",
//       placeholder: "Address",
//       type: "text",
//       hasSuggestions: true,
//     },
//   ];

//   const hasErrors = (field) => {
//     const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
//     const fieldValue = resumeData[field]?.trim(); // Trim to check for empty values

//     // Check for empty required fields
//     if (!fieldValue) return true;

//     // Special validation for contact information
//     if (field === "contactInformation") {
//       const isValidContact = /^(\+\d{1,3}\s?)?\(?\d+\)?[\d\s\-]+$/.test(
//         fieldValue
//       );
//       if (!isValidContact) return true;
//     }

//     // Check for API-reported errors
//     return Array.isArray(strengthInfo) && strengthInfo.length > 0;
//   };

//   const handleContactChange = (e) => {
//     const { value } = e.target;
//     const fullContactValue = `${value.replace(/^(\+\d+\s*)?/, "")}`;

//     const updatedContact = {
//       target: {
//         name: "contactInformation",
//         value: fullContactValue,
//       },
//     };
//     handleChange(updatedContact);
//   };
//   // console.log(resumeStrength, "rss");
//   const markAsResolved = (field) => {
//     // Mark this field as resolved
//     setResolvedFields((prev) => ({ ...prev, [field]: true }));

//     // Also clear any errors in the resumeStrength for this field
//     if (resumeStrength?.personal_info_strenght) {
//       const updatedStrength = {
//         ...resumeStrength,
//         personal_info_strenght: {
//           ...resumeStrength.personal_info_strenght,
//           [field]: [],
//         },
//       };
//       // console.log(updatedStrength, "ups");
//       setResumeStrength(updatedStrength);
//     }

//     // Close the tooltip
//     setActiveTooltip(null);
//   };
//   const fileInputRef = useRef(null);

//   // Enhanced delete function that also resets the file input
//   const handleDelete = (e) => {
//     deleteProfilePicture(e);

//     // Reset the file input to clear the filename
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   // Image cropping functions
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setCropImage(event.target.result);
//         setShowCropModal(true);
//         // Reset crop and zoom for new image
//         setCrop({ x: 0, y: 0 });
//         setZoom(1);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const createImage = (url) =>
//     new Promise((resolve, reject) => {
//       const image = new Image();
//       image.addEventListener("load", () => resolve(image));
//       image.addEventListener("error", (error) => reject(error));
//       image.src = url;
//     });

//   const getCroppedImg = async (imageSrc, pixelCrop) => {
//     const image = await createImage(imageSrc);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const maxSize = Math.max(image.width, image.height);
//     const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

//     canvas.width = safeArea;
//     canvas.height = safeArea;

//     ctx.translate(safeArea / 2, safeArea / 2);
//     ctx.translate(-safeArea / 2, -safeArea / 2);

//     ctx.drawImage(
//       image,
//       safeArea / 2 - image.width * 0.5,
//       safeArea / 2 - image.height * 0.5
//     );

//     const data = ctx.getImageData(0, 0, safeArea, safeArea);

//     canvas.width = pixelCrop.width;
//     canvas.height = pixelCrop.height;

//     ctx.putImageData(
//       data,
//       0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
//       0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
//     );

//     return new Promise((resolve) => {
//       canvas.toBlob(
//         (blob) => {
//           resolve(blob);
//         },
//         "image/jpeg",
//         0.9
//       );
//     });
//   };

//   const applyCrop = async () => {
//     if (!cropImage || !croppedAreaPixels) return;

//     try {
//       const croppedImage = await getCroppedImg(cropImage, croppedAreaPixels);
//       const croppedImageUrl = URL.createObjectURL(croppedImage);

//       // Update the resume data with cropped image
//       setResumeData((prev) => ({
//         ...prev,
//         profilePicture: croppedImageUrl,
//       }));

//       setShowCropModal(false);
//       setCropImage(null);
//       setCrop({ x: 0, y: 0 });
//       setZoom(1);
//       setCroppedAreaPixels(null);
//     } catch (error) {
//       console.error("Error cropping image:", error);
//     }
//   };

//   const cancelCrop = () => {
//     setShowCropModal(false);
//     setCropImage(null);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCroppedAreaPixels(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   // Prevent browser navigation when crop modal is open
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (showCropModal) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (showCropModal && e.key === "Escape") {
//         e.preventDefault();
//         cancelCrop();
//       }
//     };

//     if (showCropModal) {
//       window.addEventListener("beforeunload", handleBeforeUnload);
//       document.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [showCropModal]);

//   return (
//     <div className="flex flex-col gap-3 w-full items-center md:mt-10 md:px-10 max-h-[400px] overflow-y-auto">
//       {/* Progress Bar */}
//       <div className="w-full max-w-2xl mb-6">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium text-gray-700">
//             Step 1 of 9: Personal Information
//           </span>
//           <span className="text-sm text-gray-500">
//             {Math.round((1 / 9) * 100)}%
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-3">
//           <div
//             className="bg-teal-600 h-3 rounded-full transition-all duration-300 ease-in-out"
//             style={{ width: `${(1 / 9) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       <h2 className="text-2xl md:text-3xl font-semibold text-black">
//         {t("builder_forms.personal_info.details_info")}
//       </h2>

//       <div className="flex flex-col items-center gap-6 w-full">
//         <div className="flex flex-col items-center gap-4">
//           <div className="relative">
//             <img
//               src={resumeData.profilePicture || dummyImage}
//               alt="Profile"
//               className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
//             />

//             {resumeData.profilePicture && (
//               <button
//                 onClick={handleDelete}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
//                 aria-label="Delete profile picture"
//               >
//                 ✕
//               </button>
//             )}
//           </div>

//           <input
//             ref={fileInputRef}
//             type="file"
//             name="profileImage"
//             accept="image/*"
//             className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
//             onChange={handleImageUpload}
//           />
//         </div>

//         {/* Image Crop Modal */}
//         {showCropModal && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//             onClick={(e) => {
//               if (e.target === e.currentTarget) {
//                 cancelCrop();
//               }
//             }}
//           >
//             <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-black">
//                   Adjust Profile Picture
//                 </h3>
//                 <button
//                   onClick={cancelCrop}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="mb-4 flex gap-2 flex-wrap">
//                 <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md">
//                   <span className="text-sm text-gray-600">
//                     Drag to move • Pinch to zoom
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-md">
//                   <span className="text-sm text-blue-600">
//                     Zoom: {Math.round(zoom * 100)}%
//                   </span>
//                 </div>
//               </div>

//               <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
//                 <Cropper
//                   image={cropImage}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                   showGrid={true}
//                   cropSize={{ width: 200, height: 200 }}
//                   style={{
//                     containerStyle: {
//                       width: "100%",
//                       height: "100%",
//                       backgroundColor: "#f3f4f6",
//                     },
//                     cropAreaStyle: {
//                       border: "2px solid white",
//                       boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
//                     },
//                     mediaStyle: {
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                     },
//                   }}
//                 />
//               </div>

//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   onClick={cancelCrop}
//                   className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={applyCrop}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col gap-4 w-full max-w-xl">
//           {formFields.map(
//             ({ field, placeholder, type, hasSuggestions, hasCountryCode }) => (
//               <div
//                 key={field}
//                 className="relative group"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex items-center relative">
//                   {/* If field has a country code (for contact number) */}

//                   {hasCountryCode && (
//                     <div className="relative w-full">
//                       <div className="flex items-center">
//                         <input
//                           type={type}
//                           placeholder={t(
//                             `builder_forms.personal_info.placeholders.${field}`
//                           )}
//                           name={field}
//                           className={`w-full p-2 pl-2 border rounded-md outline-none transition-colors ${
//                             improve && hasErrors(field)
//                               ? "border-red-500 focus:border-red-600"
//                               : "border-gray-300 focus:border-blue-500"
//                           }`}
//                           value={
//                             resumeData[field]
//                               ? resumeData[field].replace(/^(\+\d+\s*)?/, "")
//                               : ""
//                           }
//                           onChange={
//                             field === "contactInformation"
//                               ? handleContactChange
//                               : handleInputChange
//                           }
//                           minLength={3}
//                           maxLength={10}
//                         />

//                         {/* Error Icon for Contact Information */}
//                         {improve &&
//                           hasErrors(field) &&
//                           !resolvedFields[field] && (
//                             <button
//                               type="button"
//                               className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
//                               onClick={() =>
//                                 setActiveTooltip(
//                                   activeTooltip === field ? null : field
//                                 )
//                               }
//                               aria-label="Show suggestions"
//                             >
//                               <AlertCircle className="w-5 h-5" />
//                             </button>
//                           )}
//                       </div>
//                     </div>
//                   )}

//                   {/* If field does NOT have a country code */}
//                   {!hasCountryCode && (
//                     <div className="relative w-full">
//                       {/* Input Field */}
//                       <input
//                         type={type}
//                         // placeholder={placeholder}
//                         placeholder={t(
//                           `builder_forms.personal_info.placeholders.${field}`
//                         )}
//                         name={field}
//                         className={`w-full p-2 border rounded-md outline-none transition-colors ${
//                           improve && hasErrors(field)
//                             ? "border-red-500 focus:border-red-600"
//                             : "border-gray-300 focus:border-blue-500"
//                         }`}
//                         value={resumeData[field] || ""}
//                         onChange={handleInputChange}
//                         onFocus={() => {
//                           if (field === "position")
//                             setShowJobTitleDropdown(true);
//                           if (field === "address")
//                             setShowLocationDropdown(true);
//                         }}
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             if (field === "address")
//                               setShowLocationDropdown(false);
//                             if (field === "position")
//                               setShowJobTitleDropdown(false);
//                           }
//                         }}
//                       />

//                       {/* Error Icon for Other Fields */}
//                       {improve &&
//                         hasErrors(field) &&
//                         !resolvedFields[field] && (
//                           <button
//                             type="button"
//                             className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
//                             onClick={() =>
//                               setActiveTooltip(
//                                 activeTooltip === field ? null : field
//                               )
//                             }
//                             aria-label="Show suggestions"
//                           >
//                             <AlertCircle className="w-5 h-5" />
//                           </button>
//                         )}

//                       {/* Loading Indicator for Job Title & Address Suggestions */}
//                       {hasSuggestions &&
//                         isLoading[
//                           field === "position" ? "jobTitle" : "location"
//                         ] && (
//                           <div className="absolute right-8 top-2">
//                             <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//                           </div>
//                         )}
//                     </div>
//                   )}
//                 </div>

//                 {hasSuggestions &&
//                   (field === "position"
//                     ? showJobTitleDropdown && jobTitleSuggestions?.length > 0
//                     : showLocationDropdown &&
//                       locationSuggestions?.length > 0) && (
//                     <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                       {(field === "position"
//                         ? jobTitleSuggestions
//                         : locationSuggestions
//                       ).map((suggestion, index) => (
//                         <div
//                           key={index}
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
//                           onClick={() => selectSuggestion(field, suggestion)}
//                         >
//                           {suggestion}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                 {activeTooltip === field && hasErrors(field) && (
//                   <div className="absolute z-50 left-8 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
//                     <div className="p-4 border-b border-gray-700">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <AlertCircle className="w-5 h-5 text-red-400" />
//                           <span className="font-medium text-black">
//                             {t("builder_forms.personal_info.suggestions")}
//                           </span>
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           {(field === "name" || field === "position") && (
//                             <button
//                               onClick={() =>
//                                 handleAutoFix(field, resumeData[field])
//                               }
//                               disabled={
//                                 isLoading.autoFix || !resumeData[field]?.trim()
//                               }
//                               className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               {isLoading.autoFix ? (
//                                 <Loader2 className="w-4 h-4 animate-spin" />
//                               ) : (
//                                 t("builder_forms.personal_info.auto_fix")
//                               )}
//                             </button>
//                           )}
//                           <button
//                             onClick={() => markAsResolved(field)}
//                             className="px-3 py-1 text-sm font-medium text-white bg-purple-600 rounded-md shadow hover:bg-pink-600 transition-all"
//                           >
//                             {t("builder_forms.personal_info.mark_resolved")}
//                           </button>
//                           <button
//                             onClick={() => setActiveTooltip(null)}
//                             className="text-black transition-colors"
//                           >
//                             <X className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       {getSuggestions(field).map((msg, i) => (
//                         <div
//                           key={i}
//                           className="flex items-start space-x-3 mb-3 last:mb-0"
//                         >
//                           <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
//                           <p className="text-black text-sm">{msg}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;
"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, X, Loader2, ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { BASE_URL } from "../Constant/constant";
import { useTranslation } from "react-i18next";
import axiosInstance from "../utils/axiosInstance";

const PersonalInformation = () => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const {
    resumeData,
    setResumeData,
    handleProfilePicture,
    handleChange,
    resumeStrength,
    setResumeStrength,
    deleteProfilePicture,
  } = useContext(ResumeContext);
  const router = useRouter();
  const { improve } = router.query;

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India
  const [isLoading, setIsLoading] = useState({
    jobTitle: false,
    location: false,
    autoFix: false,
    countryCodes: false,
  });
  const [resolvedFields, setResolvedFields] = useState({});

  const dummyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  useEffect(() => {
    const fetchCountryCodes = async () => {
      setIsLoading((prev) => ({ ...prev, countryCodes: true }));
      try {
        const response = await axiosInstance.get(
          `/api/user/countries?lang=${language}`
        );
        if (response.ok) {
          const data = await response.json();
          const sortedCountries = data.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCountryCodes(sortedCountries);
        }
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
      setIsLoading((prev) => ({ ...prev, countryCodes: false }));
    };

    fetchCountryCodes();
  }, [language]);

  const fetchJobTitles = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setJobTitleSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, jobTitle: true }));
    try {
      const response = await axiosInstance.get(
        `/api/user/job-title?job_title_keyword=${encodeURIComponent(
          keyword
        )}&lang=${language}`
      );

      const jobTitles = response.data.data.map((item) => item.name);
      setJobTitleSuggestions(jobTitles);
      setShowJobTitleDropdown(true);
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
    setIsLoading((prev) => ({ ...prev, jobTitle: false }));
  };

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, location: true }));
    try {
      const response = await axiosInstance.get(
        `/api/user/locations?locations=${encodeURIComponent(
          keyword
        )}&lang=${language}`
      );
      const data = response.data;
      const locations = data.data.location_names.map((item) => item);
      setLocationSuggestions(locations);
      setShowLocationDropdown(true);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoading((prev) => ({ ...prev, location: false }));
  };

  const handleAutoFix = async (field, content) => {
    if (!content) return;

    setIsLoading((prev) => ({ ...prev, autoFix: true }));

    try {
      let endpoint = "";
      let key = "";

      if (field === "name") {
        endpoint = "/ai-username";
        key = "user name";
      } else if (field === "position") {
        endpoint = "/ai-jobtitle";
        key = "job title";
      } else if (field === "contactInformation") {
        endpoint = "/ai-contact";
        key = "contact information";
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/user${endpoint}?lang=${language}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: key,
            keyword: "auto improve",
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data.resume_analysis) {
          let updatedValue = null;

          if (field === "name") {
            updatedValue = data.data.resume_analysis.user_name;
          } else if (field === "position") {
            updatedValue = data.data.resume_analysis.job_title;
          } else if (field === "contactInformation") {
            updatedValue = data.data.resume_analysis.contact;
          }

          if (updatedValue) {
            const event = {
              target: {
                name: field,
                value: updatedValue,
              },
            };
            handleChange(event);
            setActiveTooltip(null);

            // Clear errors for this field
            if (resumeStrength?.personal_info_strenght) {
              const updatedStrength = {
                ...resumeStrength,
                personal_info_strenght: {
                  ...resumeStrength.personal_info_strenght,
                  [field]: [],
                },
              };
              setResumeStrength(updatedStrength);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error auto-fixing ${field}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, autoFix: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const maxLengths = {
      name: 30,
      position: 40,
      contactInformation: 10,
      email: 50,
      address: 50,
    };

    // Check if value exceeds max length for the field
    if (maxLengths[name] && value.length > maxLengths[name]) {
      return;
    }
    handleChange(e);

    if (name === "position") {
      fetchJobTitles(value);
    } else if (name === "address") {
      fetchLocations(value);
    }
  };

  const selectSuggestion = (field, value) => {
    const event = {
      target: { name: field, value },
    };
    handleChange(event);
    if (field === "position") {
      setShowJobTitleDropdown(false);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const selectCountryCode = (country) => {
    const newCountryCode = `+${country.phonecode}`;
    setSelectedCountryCode(newCountryCode);

    // Update contact information with new country code
    if (resumeData.contactInformation) {
      const updatedContact = {
        target: {
          name: "contactInformation",
          value: `${newCountryCode} ${resumeData.contactInformation.replace(
            /^(\+\d+\s*)?/,
            ""
          )}`,
        },
      };
      handleChange(updatedContact);
    }

    setShowCountryCodeDropdown(false);
  };

  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };

  const getSuggestions = (field) => {
    return resumeStrength?.personal_info_strenght?.[field] || [];
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowJobTitleDropdown(false);
      setShowLocationDropdown(false);
      setShowCountryCodeDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const formFields = [
    { field: "name", placeholder: "Full Name", type: "text" },
    {
      field: "position",
      placeholder: "Job Title",
      type: "text",
      hasSuggestions: true,
    },
    {
      field: "contactInformation",
      placeholder: "Contact Number",
      type: "tel",
      hasCountryCode: true,
    },
    { field: "email", placeholder: "Email", type: "email" },
    {
      field: "address",
      placeholder: "Address",
      type: "text",
      hasSuggestions: true,
    },
  ];

  const hasErrors = (field) => {
    const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
    const fieldValue = resumeData[field]?.trim(); // Trim to check for empty values

    // Check for empty required fields
    if (!fieldValue) return true;

    // Special validation for contact information
    if (field === "contactInformation") {
      const isValidContact = /^(\+\d{1,3}\s?)?\(?\d+\)?[\d\s\-]+$/.test(
        fieldValue
      );
      if (!isValidContact) return true;
    }

    // Check for API-reported errors
    return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  };

  const handleContactChange = (e) => {
    const { value } = e.target;
    const fullContactValue = `${value.replace(/^(\+\d+\s*)?/, "")}`;

    const updatedContact = {
      target: {
        name: "contactInformation",
        value: fullContactValue,
      },
    };
    handleChange(updatedContact);
  };
  // console.log(resumeStrength, "rss");
  const markAsResolved = (field) => {
    // Mark this field as resolved
    setResolvedFields((prev) => ({ ...prev, [field]: true }));

    // Also clear any errors in the resumeStrength for this field
    if (resumeStrength?.personal_info_strenght) {
      const updatedStrength = {
        ...resumeStrength,
        personal_info_strenght: {
          ...resumeStrength.personal_info_strenght,
          [field]: [],
        },
      };
      // console.log(updatedStrength, "ups");
      setResumeStrength(updatedStrength);
    }

    // Close the tooltip
    setActiveTooltip(null);
  };
  const fileInputRef = useRef(null);

  // Enhanced delete function that also resets the file input
  const handleDelete = (e) => {
    deleteProfilePicture(e);

    // Reset the file input to clear the filename
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center md:mt-10 md:px-10 max-h-[400px] overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-black">
        {t("builder_forms.personal_info.details_info")}
      </h2>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={resumeData.profilePicture || dummyImage}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
            />

            {resumeData.profilePicture && (
              <button
                onClick={handleDelete}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Delete profile picture"
              >
                ✕
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            name="profileImage"
            accept="image/*"
            className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
            onChange={handleProfilePicture}
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          {formFields.map(
            ({ field, placeholder, type, hasSuggestions, hasCountryCode }) => (
              <div
                key={field}
                className="relative group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center relative">
                  {/* If field has a country code (for contact number) */}

                  {hasCountryCode && (
                    <div className="relative w-full">
                      <div className="flex items-center">
                        <input
                          type={type}
                          placeholder={t(
                            `builder_forms.personal_info.placeholders.${field}`
                          )}
                          name={field}
                          className={`w-full p-2 pl-2 border rounded-md outline-none transition-colors ${
                            improve && hasErrors(field)
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          value={
                            resumeData[field]
                              ? resumeData[field].replace(/^(\+\d+\s*)?/, "")
                              : ""
                          }
                          onChange={
                            field === "contactInformation"
                              ? handleContactChange
                              : handleInputChange
                          }
                          minLength={3}
                          maxLength={10}
                        />

                        {/* Error Icon for Contact Information */}
                        {improve &&
                          hasErrors(field) &&
                          !resolvedFields[field] && (
                            <button
                              type="button"
                              className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
                              onClick={() =>
                                setActiveTooltip(
                                  activeTooltip === field ? null : field
                                )
                              }
                              aria-label="Show suggestions"
                            >
                              <AlertCircle className="w-5 h-5" />
                            </button>
                          )}
                      </div>
                    </div>
                  )}

                  {/* If field does NOT have a country code */}
                  {!hasCountryCode && (
                    <div className="relative w-full">
                      {/* Input Field */}
                      <input
                        type={type}
                        // placeholder={placeholder}
                        placeholder={t(
                          `builder_forms.personal_info.placeholders.${field}`
                        )}
                        name={field}
                        className={`w-full p-2 border rounded-md outline-none transition-colors ${
                          improve && hasErrors(field)
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                        value={resumeData[field] || ""}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (field === "position")
                            setShowJobTitleDropdown(true);
                          if (field === "address")
                            setShowLocationDropdown(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (field === "address")
                              setShowLocationDropdown(false);
                            if (field === "position")
                              setShowJobTitleDropdown(false);
                          }
                        }}
                      />

                      {/* Error Icon for Other Fields */}
                      {improve &&
                        hasErrors(field) &&
                        !resolvedFields[field] && (
                          <button
                            type="button"
                            className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
                            onClick={() =>
                              setActiveTooltip(
                                activeTooltip === field ? null : field
                              )
                            }
                            aria-label="Show suggestions"
                          >
                            <AlertCircle className="w-5 h-5" />
                          </button>
                        )}

                      {/* Loading Indicator for Job Title & Address Suggestions */}
                      {hasSuggestions &&
                        isLoading[
                          field === "position" ? "jobTitle" : "location"
                        ] && (
                          <div className="absolute right-8 top-2">
                            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                          </div>
                        )}
                    </div>
                  )}
                </div>

                {hasSuggestions &&
                  (field === "position"
                    ? showJobTitleDropdown && jobTitleSuggestions?.length > 0
                    : showLocationDropdown &&
                      locationSuggestions?.length > 0) && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {(field === "position"
                        ? jobTitleSuggestions
                        : locationSuggestions
                      ).map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => selectSuggestion(field, suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}

                {activeTooltip === field && hasErrors(field) && (
                  <div className="absolute z-50 left-8 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="font-medium text-black">
                            {t("builder_forms.personal_info.suggestions")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {(field === "name" || field === "position") && (
                            <button
                              onClick={() =>
                                handleAutoFix(field, resumeData[field])
                              }
                              disabled={
                                isLoading.autoFix || !resumeData[field]?.trim()
                              }
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isLoading.autoFix ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                t("builder_forms.personal_info.auto_fix")
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => markAsResolved(field)}
                            className="px-3 py-1 text-sm font-medium text-white bg-purple-600 rounded-md shadow hover:bg-pink-600 transition-all"
                          >
                            {t("builder_forms.personal_info.mark_resolved")}
                          </button>
                          <button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      {getSuggestions(field).map((msg, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 mb-3 last:mb-0"
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                          <p className="text-black text-sm">{msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
