import React, { useState } from "react";
import { Upload, X, ArrowUpCircle } from "lucide-react";

// --- Configuration Constants ---
const shareCategories = ["Books", "Electronics", "Clothing", "Sports", "Stationery", "Other"];
const conditions = ["Like New", "Good", "Fair", "Worn"];
const MAX_IMAGES = 5;
// Indigo is the new accent color (based on user's blue request)
// Blue is used for the primary action button for maximum visibility

const PostItem = ({ onPost }) => {
  const [item, setItem] = useState({
    name: "",
    category: shareCategories[0],
    detail: "",
    reservedUntil: "",
    condition: conditions[0],
    images: [], // Now an array to store multiple images
  });
  const [previewImages, setPreviewImages] = useState([]); // Array for preview URLs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Calculate how many more files can be added (max 5)
    const filesToAdd = MAX_IMAGES - previewImages.length;
    const newFiles = files.slice(0, filesToAdd);

    if (newFiles.length > 0) {
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prev) => [...prev, reader.result]);
          setItem((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
        };
        reader.readAsDataURL(file);
      });
      // Clear input value to allow selecting the same file again if needed
      e.target.value = null;
    }
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setItem((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if at least one image is uploaded
    if (!item.name || !item.detail || item.images.length === 0) {
      console.error("Please fill in all required fields and upload at least one image.");
      return;
    }
    onPost?.(item);
    // Reset state
    setItem({ name: "", category: shareCategories[0], detail: "", reservedUntil: "", condition: conditions[0], images: [] });
    setPreviewImages([]);
  };

  const isMaxImages = previewImages.length >= MAX_IMAGES;

  return (
    // Responsive Container: Now using Indigo border color
    <div className="max-w-xl lg:max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-6 lg:p-10 rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] border-t-[10px] border-indigo-600 transition duration-300 mt-8 mb-8 lg:mt-12 lg:mb-12"> 
      
      {/* Title Section - Updated to deep Indigo */}
      <div className="text-center mb-10 lg:mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-800 mb-2 tracking-tighter">Share an Asset</h1>
        <p className="text-base lg:text-lg text-gray-500 font-medium">Lend resources easily within your community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7 lg:space-y-9">
        
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-extrabold text-gray-700 mb-4 text-center tracking-wider uppercase">
            Upload Photos ({previewImages.length}/{MAX_IMAGES})
          </label>
          
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            
            {/* Display uploaded images */}
            {previewImages.map((image, index) => (
              <div key={index} className="w-28 h-28 relative group shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-200">
                <img src={image} alt={`Preview ${index + 1}`} className="h-full w-full object-cover transition duration-300 transform group-hover:scale-105" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  // Enhanced remove button styling
                  className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-2xl opacity-90 group-hover:opacity-100 transform group-hover:scale-110 border-2 border-white"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Upload Button/Area - Indigo styling */}
            {!isMaxImages && (
              <div className="w-28 h-28 flex flex-col justify-center items-center border-2 border-dashed border-indigo-400 rounded-2xl p-4 text-center cursor-pointer hover:border-indigo-600 transition duration-300 bg-indigo-50/70 hover:bg-indigo-100/70">
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center justify-center h-full w-full">
                  <Upload size={30} className="text-indigo-600 mb-2" />
                  <span className="text-xs font-bold text-indigo-700 transition tracking-wide">Add Photo</span>
                  <input 
                    id="imageUpload" 
                    type="file" 
                    accept=".png,.jpg,.jpeg,.gif" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    multiple 
                  />
                </label>
              </div>
            )}
          </div>
          {/* Error message */}
          {previewImages.length === 0 && (
            <p className="text-xs text-red-500 mt-3 text-center">
              <span className="font-semibold">Important:</span> Please upload at least one image to proceed.
            </p>
          )}
        </div>
        
        {/* Form Fields - Sleek Focus and Rounded Inputs - Indigo Focus */}
        <div className="space-y-4 lg:space-y-6">
          
          {/* Item Title */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Item Title</label>
            <input 
              type="text" 
              name="name" 
              value={item.name} 
              onChange={handleChange} 
              placeholder="e.g., Organic Chemistry Textbook, 4th Edition" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm lg:text-base" 
              required 
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select 
              name="category" 
              value={item.category} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm lg:text-base"
            >
              {shareCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="detail" className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea 
              name="detail" 
              rows="4" 
              value={item.detail} 
              onChange={handleChange} 
              placeholder="Briefly describe the item and why you're sharing it." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm lg:text-base" 
              required 
            />
          </div>

          {/* Condition and Reserved Until - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label htmlFor="condition" className="block text-sm font-bold text-gray-700 mb-2">Condition</label>
              <select 
                name="condition" 
                value={item.condition} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm lg:text-base"
              >
                {conditions.map((cond) => <option key={cond} value={cond}>{cond}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="reservedUntil" className="block text-sm font-bold text-gray-700 mb-2">Reserved Until (Optional)</label>
              <input 
                type="date" 
                name="reservedUntil" 
                value={item.reservedUntil} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-sm lg:text-base" 
              />
            </div>
          </div>
        </div>

        {/* Submit Button - Updated to Blue */}
        <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              // Using Blue shades for the button
              className="max-w-xs px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-full shadow-lg shadow-blue-600/50 hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-3 text-base lg:text-lg tracking-wider"
            >
              <ArrowUpCircle size={20} /> 
              Post Item
            </button>
        </div>
      </form>
    </div>
  );
};

export default PostItem;
