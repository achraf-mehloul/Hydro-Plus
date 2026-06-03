import { useEffect, useState } from 'react';
import { getAllUsers, getAllReports, getWaterStatistics, getAllWaterReadings } from '../api/api';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { User, Report } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingReports: 0,
    resolvedReports: 0,
    totalReadings: 0,
  });
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [users, reports, waterStats, readings] = await Promise.all([
        getAllUsers(),
        getAllReports(),
        getWaterStatistics(),
        getAllWaterReadings(),
      ]);

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter((u: User) => u.is_active).length,
        pendingReports: reports.filter((r: Report) => r.status === 'pending').length,
        resolvedReports: reports.filter((r: Report) => r.status === 'resolved').length,
        totalReadings: readings.length,
      });

      setRecentReports(reports.slice(0, 10));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const reportColumns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'العنوان' },
    { key: 'type', header: 'النوع' },
    { key: 'status', header: 'الحالة', render: (v: string) => <StatusBadge status={v} /> },
    { key: 'wilaya', header: 'الولاية' },
    { key: 'created_at', header: 'التاريخ', render: (v: string) => new Date(v).toLocaleDateString('ar') },
  ];

  const pieData = [
    { name: 'معلقة', value: stats.pendingReports, color: '#fbbf24' },
    { name: 'قيد المعالجة', value: stats.resolvedReports ? 0 : 0, color: '#3b82f6' },
    { name: 'محلولة', value: stats.resolvedReports, color: '#22c55e' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-96">جاري تحميل البيانات...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard title="إجمالي المستخدمين" value={stats.totalUsers} icon="👥" color="bg-blue-100" />
        <StatsCard title="مستخدمين نشطين" value={stats.activeUsers} icon="✅" color="bg-green-100" />
        <StatsCard title="تقارير معلقة" value={stats.pendingReports} icon="⏳" color="bg-yellow-100" />
        <StatsCard title="تقارير محلولة" value={stats.resolvedReports} icon="✔️" color="bg-green-100" />
        <StatsCard title="قراءات المياه" value={stats.totalReadings} icon="💧" color="bg-cyan-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">حالة التقارير</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">إحصائيات سريعة</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>نسبة المستخدمين النشطين</span>
              <span className="font-bold">{((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>نسبة التقارير المحلولة</span>
              <span className="font-bold">{((stats.resolvedReports / (stats.pendingReports + stats.resolvedReports || 1)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">آخر التقارير</h3>
        <DataTable columns={reportColumns} data={recentReports} />
      </div>
    </div>
  );
}