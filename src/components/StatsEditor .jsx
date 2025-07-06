import React, { useState, useEffect } from 'react';
import { statsData } from '../data/data';
import { FaUniversity, FaStethoscope, FaGraduationCap, FaTools } from 'react-icons/fa';

const iconMap = {
  university: FaUniversity,
  medical: FaStethoscope,
  graduation: FaGraduationCap,
  tools: FaTools,
  engineering: FaTools,
};

const StatsEditor = () => {
  const [stats, setStats] = useState([]);
  const [newStat, setNewStat] = useState({
    title: '',
    count: '',
    description: '',
    category: 'university',
    color1: '#6b46c1',
    color2: '#2c5282',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Normalize statsData: ensure color1, color2, icon are set properly
    const fixedData = statsData.map((stat) => {
      let color1 = '#6b46c1';
      let color2 = '#2c5282';

      if (Array.isArray(stat.backgroundGradient)) {
        [color1, color2] = stat.backgroundGradient;
      } else if (typeof stat.backgroundGradient === 'string') {
        const parts = stat.backgroundGradient.split(',');
        if (parts.length === 2) {
          color1 = parts[0].trim();
          color2 = parts[1].trim();
        }
      }

      // Use iconMap based on category, fallback to FaTools
      const icon = iconMap[stat.category] || stat.icon || FaTools;

      return {
        ...stat,
        color1,
        color2,
        icon,
      };
    });
    setStats(fixedData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStat((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditStat = () => {
    if (!newStat.title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!newStat.count.trim()) {
      alert('Please enter a count');
      return;
    }

    const stat = {
      title: newStat.title.trim(),
      count: newStat.count.trim(),
      description: newStat.description.trim(),
      icon: iconMap[newStat.category] || FaTools,
      backgroundGradient: [newStat.color1, newStat.color2],
      category: newStat.category,
      color1: newStat.color1,
      color2: newStat.color2,
    };

    if (isEditing) {
      const updatedStats = [...stats];
      updatedStats[editIndex] = stat;
      setStats(updatedStats);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setStats([stat, ...stats]);
    }

    setNewStat({
      title: '',
      count: '',
      description: '',
      category: 'university',
      color1: '#6b46c1',
      color2: '#2c5282',
    });
  };

  const handleEdit = (index) => {
    const stat = stats[index];
    setNewStat({
      title: stat.title || '',
      count: stat.count || '',
      description: stat.description || '',
      category: stat.category || 'university',
      color1: stat.color1 || (stat.backgroundGradient ? stat.backgroundGradient[0] : '#6b46c1'),
      color2: stat.color2 || (stat.backgroundGradient ? stat.backgroundGradient[1] : '#2c5282'),
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      const updated = [...stats];
      updated.splice(index, 1);
      setStats(updated);
      if (isEditing && editIndex === index) {
        setIsEditing(false);
        setEditIndex(null);
        setNewStat({
          title: '',
          count: '',
          description: '',
          category: 'university',
          color1: '#6b46c1',
          color2: '#2c5282',
        });
      }
    }
  };

  return (
    <div className="p-4 space-y-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Stats Editor</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-3">
          <input
            name="title"
            value={newStat.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />
          <input
            name="count"
            value={newStat.count}
            onChange={handleInputChange}
            placeholder="Count"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={newStat.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded h-24 resize-none break-words"
            style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
          />
          <select
            name="category"
            value={newStat.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="university">University</option>
            <option value="medical">Medical</option>
            <option value="graduation">Graduation</option>
            <option value="engineering">Engineering</option>
            <option value="tools">Tools</option>
          </select>

          {/* Color pickers */}
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm mb-1 font-medium">Color 1</label>
              <input
                type="color"
                name="color1"
                value={newStat.color1}
                onChange={handleInputChange}
                className="w-16 h-10 p-0 border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Color 2</label>
              <input
                type="color"
                name="color2"
                value={newStat.color2}
                onChange={handleInputChange}
                className="w-16 h-10 p-0 border rounded cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleAddOrEditStat}
            className="bg-headerColor text-white px-4 py-2 rounded w-full mt-4"
          >
            {isEditing ? 'Save Changes' : 'Add Stat'}
          </button>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center p-6 border rounded shadow max-w-md">
          <div
            style={{
              background: `linear-gradient(to bottom right, ${newStat.color1}, ${newStat.color2})`,
            }}
            className="rounded-full w-32 h-32 flex flex-col items-center justify-center text-white font-bold text-center p-4 select-none"
          >
            {/* Icon with fallback */}
            {React.createElement(iconMap[newStat.category] || FaTools, {
              className: 'text-5xl mb-1',
            })}
            <span className="text-base">{newStat.title}</span>
          </div>
          <p
            className="text-center text-sm mt-4 px-2 break-words"
            style={{ overflowX: 'hidden', wordWrap: 'break-word', whiteSpace: 'normal' }}
          >
            {newStat.description}
          </p>
          <p className="text-lg font-bold mt-2">{newStat.count}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon || FaTools;
          return (
            <div
              key={idx}
              className="p-4 border rounded shadow hover:shadow-lg flex flex-col max-w-md items-center justify-center"
            >
              <div
                style={{
                  background: `linear-gradient(to bottom right, ${stat.color1}, ${stat.color2})`,
                }}
                className="rounded-full w-28 h-28 flex flex-col items-center justify-center text-white font-bold text-center p-3 select-none"
              >
                {React.createElement(Icon, { className: 'text-4xl mb-1' })}
                <span className="text-sm truncate">{stat.title}</span>
              </div>
              <p
                className="text-sm mt-4 flex-grow px-1 break-words"
                style={{ overflowX: 'hidden', whiteSpace: 'normal' }}
              >
                {stat.description}
              </p>
              <p className="text-lg font-bold mt-3">{stat.count}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(idx)}
                  className="text-sm text-white bg-blue-500 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-sm text-white bg-red-500 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsEditor;
