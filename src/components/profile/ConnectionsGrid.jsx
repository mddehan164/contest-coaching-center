export default function ConnectionsGrid() {
  const connections = [
    { name:'Diane Aguilar', role:'UI/UX Design at Upwork', img:'...connection1.jpg' },
    // আট থেকে দশটা বা যেগুলো দরকার
  ];
  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-gray-900">Connections (532)</h4>
        <button title="View All">{/* dots icon */}</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">
        {connections.map((c,i) => (
          <div key={i} className="flex flex-col items-center hover:text-blue-600 text-gray-800">
            <img src={c.img} alt={c.name} className="w-16 rounded-full"/>
            <p className="text-sm font-bold mt-1">{c.name}</p>
            <p className="text-xs text-gray-500 text-center">{c.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
