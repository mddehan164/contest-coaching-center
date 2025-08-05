export default function ProfileActions() {
  return (
    <div className="flex items-center justify-center space-x-4 mt-2">
      <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm space-x-2">
        {/* plus user svg */}
        <span>Connect</span>
      </button>
      <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm space-x-2">
        {/* chat svg */}
        <span>Message</span>
      </button>
    </div>
  );
}
