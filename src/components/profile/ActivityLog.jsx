export default function ActivityLog() {
  const entries = [
    { text: 'Profile informations changed.', time: '3 min ago' },
    { text: 'Connected with Colby Covington.', time: '15 min ago' },
    // ...
  ];
  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h4 className="text-xl font-bold text-gray-900">Activity log</h4>
      <div className="relative px-4">
        <div className="absolute inset-y-0 left-8 border border-dashed border-opacity-20 border-secondary"></div>
        {entries.map((e, i) => (
          <div key={i} className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <p className="text-sm">{e.text}</p>
              <p className="text-xs text-gray-500">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
