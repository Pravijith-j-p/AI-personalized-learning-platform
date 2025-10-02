export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome back, Learner 👋</h2>
      <p className="text-gray-700 mb-6">
        Here’s your personalized learning dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold">📚 Recommendations</h3>
          <p className="text-sm text-gray-600">AI-curated learning for you</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold">📈 Progress</h3>
          <p className="text-sm text-gray-600">Track your completed lessons</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold">⚡ Performance</h3>
          <p className="text-sm text-gray-600">Your learning pace insights</p>
        </div>
      </div>
    </div>
  );
}
