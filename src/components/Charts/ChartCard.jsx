
function ChartCard({ children, title }) {
  return (
    <div className="min-w-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 space-y-4 p-4">
      <p className="  text-gray-800 dark:text-gray-800 mx-auto text-center">{title}</p>
      {children}
    </div>
  );
}

export default ChartCard;
