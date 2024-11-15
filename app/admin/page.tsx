export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Total Clients</div>
          <div className="mt-2 text-3xl font-bold">1,234</div>
          <div className="mt-2 text-green-600 text-sm">↑ 12% from last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Active Artists</div>
          <div className="mt-2 text-3xl font-bold">567</div>
          <div className="mt-2 text-green-600 text-sm">↑ 8% from last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Open Jobs</div>
          <div className="mt-2 text-3xl font-bold">89</div>
          <div className="mt-2 text-red-600 text-sm">↓ 3% from last month</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Companies</div>
          <div className="mt-2 text-3xl font-bold">45</div>
          <div className="mt-2 text-green-600 text-sm">↑ 5% from last month</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">New job posted by Company {i}</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}