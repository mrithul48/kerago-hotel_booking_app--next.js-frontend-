export const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number ;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:shadow-md transition">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};