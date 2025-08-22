import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sidebarData } from '../../data/Dsidebar&Header';
import { NavLink } from 'react-router-dom'; // ✅ use react-router-dom
import { LuArrowRightLeft } from "react-icons/lu";
import { toggleExpand } from '../../redux-rtk/uiSlice';

const DSidebar = () => {
  const dispatch = useDispatch();
  const isExpand = useSelector(state => state.ui.isExpand);

  const handleToggleExpand = () => {
    dispatch(toggleExpand());
  };

  return (
    <div className='relative'>
      {/* Expand/Collapse Toggle Button */}
      <LuArrowRightLeft
        className='absolute top-0 right-0 cursor-pointer text-white'
        onClick={handleToggleExpand}
      />

      {sidebarData.map((group, idx) => (
        <div key={idx} className="sidebar-group my-7 text-zinc-200">
          <h1 className={`font-semibold my-3 text-white ${isExpand ? "text-2xl" : "text-lg tracking-tighter"}`}>
            {group.title}
          </h1>

          {group.items.map((item, idx) => (
            <NavLink
              to={item.link}
              key={idx}
              end
              className={({ isActive }) =>
                `relative group flex items-center gap-2 text-lg mt-1 px-1 my-3 hover:border-l-2 hover:text-contestRed
                ${isActive ? "border-l-4 text-contestRed border-contestRed" : "border-transparent"}`
              }
            >
              {/* Icon */}
              <item.icon className={`${!isExpand ? "text-2xl shrink-0" : ""}`} />

              {/* Title (visible only if expanded) */}
              <span>{isExpand && item.title}</span>

              {/* Tooltip (for collapsed view only) */}
              <div
                className={`absolute left-full hidden bg-white text-contestRed text-xs rounded px-2 py-1 whitespace-nowrap 
                ${isExpand ? "group-hover:hidden" : "group-hover:block"}`}
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DSidebar;
