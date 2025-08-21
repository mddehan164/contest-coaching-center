import React from "react";

const HeroEditModal = ({
  formHero,
  setFormHero,
  onClose,
  onSave,
  handleImageUpload,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded max-w-md w-full space-y-4">
      <h3 className="text-xl font-bold">Edit Hero Section</h3>
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Title"
        value={formHero.title}
        onChange={(e) => setFormHero({ ...formHero, title: e.target.value })}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Subtitle"
        value={formHero.subtitle}
        onChange={(e) => setFormHero({ ...formHero, subtitle: e.target.value })}
      />
      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Description"
        value={formHero.des}
        onChange={(e) => setFormHero({ ...formHero, des: e.target.value })}
      />
      <div>
        {formHero.image && (
          <img src={formHero.image} className="rounded mb-2 w-[70%]" />
        )}
        <input type="file" onChange={(e) => handleImageUpload(e, true)} />
      </div>
      <div className="flex justify-between">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-headerColor text-white rounded hover:bg-headerColorHover"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default HeroEditModal;
