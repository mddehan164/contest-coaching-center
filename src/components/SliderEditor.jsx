import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sliderData } from "../data/data";

const MAX_SLIDERS = 8;
const MAX_DELETE = 6;
const MAX_SIZE_MB = 2;
const RATIO = 8 / 3;
const MIN_SLIDERS = 2;

const SliderEditor = () => {
  const [sliders, setSliders] = useState(() =>
    sliderData.map((s, i) => ({
      id: Date.now() + i,
      title: `${i + 1}st slider`,
      preview: s.preview || "",
    }))
  );

  const [deletedCount, setDeletedCount] = useState(0);
  const [changed, setChanged] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const fileInputRef = useRef();
  const editIndexRef = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (changed) {
        e.preventDefault();
        e.returnValue = "Your data is unsaved. Are sure to procceed?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [changed]);

  const handleAddSlider = () => {
    if (sliders.length >= MAX_SLIDERS) return;
    editIndexRef.current = null;
    fileInputRef.current.click();
  };

  const handleEditSlider = (index) => {
    editIndexRef.current = index;
    fileInputRef.current.click();
  };

  const validateImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (Math.abs(ratio - RATIO) > 0.01 || file.size > MAX_SIZE_MB * 1024 * 1024) {
          alert("You uploaded image must be 8:3 ratio and file size limit max. 2MB");
          return;
        }
        callback(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    validateImage(file, (src) => {
      if (editIndexRef.current !== null) {
        const updated = [...sliders];
        updated[editIndexRef.current].preview = src;
        setSliders(updated);
      } else {
        const newId = Date.now();
        const newSlider = {
          id: newId,
          title: `${sliders.length + 1}st slider`,
          preview: src,
        };
        setSliders((prev) => [...prev, newSlider]);
      }
      setChanged(true);
    });
  };

  const handleDeleteSlider = (index) => {
    if (sliders.length <= MIN_SLIDERS) {
      alert("Must need min. 2 Sliders");
      return;
    }
    if (deletedCount >= MAX_DELETE) return;
    const updated = sliders.filter((_, i) => i !== index);
    updated.forEach((s, i) => (s.title = `${i + 1}st slider`));
    setSliders(updated);
    setDeletedCount((prev) => prev + 1);
    setChanged(true);
  };

  const handleSave = () => {
    setChanged(false);
    setDeletedCount(0);
    alert("Saved Successfully");
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    const items = [...sliders];
    const draggedItem = items[dragItem.current];
    items.splice(dragItem.current, 1);
    items.splice(dragOverItem.current, 0, draggedItem);
    items.forEach((s, i) => (s.title = `${i + 1}st slider`));
    setSliders(items);
    setChanged(true);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl xl:text-4xl font-bold">Edit sliders</h2>
        <button
          onClick={handleAddSlider}
          disabled={sliders.length >= MAX_SLIDERS}
          className="px-4 py-2 bg-headerColorHover hover:bg-headerColor text-white rounded disabled:bg-gray-400"
        >
          Add Slider
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {sliders.map((slider, idx) => (
          <motion.div
            layout
            key={slider.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragEnter={() => handleDragEnter(idx)}
            onDragEnd={handleDrop}
            className="relative group bg-gray-300 aspect-[8/3] rounded overflow-hidden shadow cursor-move"
          >
            <img
              src={slider.preview}
              alt="slider"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex flex-col justify-between p-2 text-sm">
              <div className="flex justify-between">
                <button
                  className="bg-headerColor hover:bg-headerColorHover hover:text-white text-black px-2 py-1 rounded"
                  onClick={() => handleEditSlider(idx)}
                >
                  Edit
                </button>
                <button
                  className="bg-contestRed hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteSlider(idx)}
                  disabled={deletedCount >= MAX_DELETE || sliders.length <= MIN_SLIDERS}
                >
                  Delete
                </button>
              </div>
              <button
                className="bg-black hover:bg-zinc-800 text-white px-2 py-1 rounded self-center"
                onClick={() => setFullscreenImage(slider.preview)}
              >
                Preview
              </button>
            </div>
            <p className="absolute bottom-1 left-1 text-xs text-white">
              {slider.title}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mb-6">
        You can Drag to move position and tap to Edit or Delete
      </p>

      <div className="text-right">
        <button
          onClick={handleSave}
          disabled={!changed}
          className="px-5 py-2 bg-headerColorHover hover:bg-headerColor text-white rounded disabled:bg-gray-400"
        >
          Save Changes
        </button>
      </div>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={fullscreenImage}
              alt="Fullscreen Preview"
              className="max-w-full max-h-full rounded shadow-lg"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/70 px-3 py-1 rounded"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SliderEditor;
