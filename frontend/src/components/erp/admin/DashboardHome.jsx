


export default function DashboardHome() {
  const cards = [
    { title: "total teacher" },
    { title: "total students" },
   
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
             
            <h3 className="mt-4 font-semibold">{card.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
