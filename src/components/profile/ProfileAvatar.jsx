import { useStateContext } from "../../context/ContextProvider";

export default function ProfileAvatar() {
    const { user } = useStateContext();
  return (
    <div className="flex flex-col items-center -mt-20">
      <img src={`https://ui-avatars.com/api/?name=${user? user.name : null}&background=86defe&color=fff&rounded=true`}
           alt="Avatar"
           className="w-40 border-4 border-white rounded-full" />
    </div>
  );
}
