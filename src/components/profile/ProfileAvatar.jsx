import { useSelector } from "react-redux";

export default function ProfileAvatar() {
    const { user } = useSelector(state => state.auth);
  return (
    <div className="flex flex-col items-center -mt-20">
      <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=86defe&color=fff&rounded=true`}
           alt="Avatar"
           className="w-40 border-4 border-white rounded-full" />
    </div>
  );
}
