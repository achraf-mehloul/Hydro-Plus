import { useEffect, useState } from 'react';
import { getAllReports } from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Report } from '../types';

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const data = await getAllReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.status === filter);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'العنوان' },
    { key: 'type', header: 'النوع' },
    { key: 'status', header: 'الحالة', render: (v: string) => <StatusBadge status={v} /> },
    { key: 'wilaya', header: 'الولاية' },
    { key: 'user_id', header: 'رقم المستخدم' },
    { key: 'created_at', header: 'التاريخ', render: (v: string) => new Date(v).toLocaleString('ar') },
  ];

  const statusCount = {
    all: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    in_progress: reports.filter(r => r.status === 'in_progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    rejected: reports.filter(r => r.status === 'rejected').length,
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">جاري تحميل التقارير...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة التقارير</h1>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.entries(statusCount).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === key
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {key === 'all' ? 'الكل' : key === 'pending' ? 'معلق' : key === 'in_progress' ? 'قيد المعالجة' : key === 'resolved' ? 'محلول' : 'مرفوض'}
            <span className="mr-2 px-2 py-0.5 rounded-full bg-gray-200 text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filteredReports} />
    </div>
  );
}