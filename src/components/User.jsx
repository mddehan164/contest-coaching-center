import React, { useState } from 'react'
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';


const User = ({logout}) => {
      const [click, setClick] = useState(false);
      const { user } = useStateContext();
      const feature = [ 
        { feature: "Profile", action: "", link: "profile"}, { feature: "Logout", action: logout }
      ];
  return (
    <div
        className="rounded-full w-10 aspect-square cursor-pointer relative"
        onClick={() => setClick(!click)}
            >
        <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=86defe&color=fff&rounded=true`}
            alt="User Avatar"
            className="rounded-full w-10 aspect-square hover:bg-headerColor hover:w-12"
        />
        <div
            className={`${
            click ? "absolute" : "hidden"
          } min-h-40 min-w-32 bg-transparent text-headerColorHover top-10 right-0 rounded-md text-start p-2 text-lg shadow-lg`}
        >
            {feature.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={item.action ? item.action : null}
                className="block w-full py-1 md:text-lg hover:rounded-md hover:bg-headerColor hover:text-white px-2 border-b-2 border-headerColor bg-white"
              >
                {item.feature}
              </Link>
            ))}
        </div>
    </div>
  )
}

export default User
