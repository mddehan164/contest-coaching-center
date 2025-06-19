import React from 'react'

const NavbarBtn = (props) => {
  return (
    <button className={`max-sm:py-2 max-sm:px-6 max-sm:rounded-md sm:py-2 sm:px-4 bg-${props.data.navbar.navBtnColor} px-6 py-4 text-white rounded-lg hover:bg-${props.data.navbar.navBtnHoverColor}`}>
      {
        props.data.navbar.navBtn
      }
    </button>
  )
}

export default NavbarBtn

// import React, { useState } from 'react';

// const Tabs = () => {
//   const [activeTab, setActiveTab] = useState('Admission');
//   const tabList = ['Admission', 'Administration', 'Department'];

//   return (
//     <div className="flex gap-2 bg-gray-100 p-4">
//       {tabList.map(tab => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-4 py-2 rounded-t-md border-t-2 border-x-2
//             ${activeTab === tab ? 'bg-white text-black border-red-500' : 'bg-[#c74a3a] text-white border-transparent'}
//             transition duration-300 ease-in-out`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Tabs;

