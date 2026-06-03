import { useEffect, useState } from 'react';
import { getAllWaterReadings } from '../api/api';
import DataTable from '../components/DataTable';
import { WaterReading } from '../types';

export default function WaterReadings() {
  const [readings, setReadings] = useState<WaterReading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReadings();
  }, []);

  async function loadReadings() {
    try {
      const data = await getAllWaterReadings();
      setReadings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'user_id', header: 'رقم المستخدم' },
    { key: 'reading_value', header: 'القراءة', render: (v: number) => `${v} m³` },
    { key: 'reading_date', header: 'التاريخ', render: (v: string) => new Date(v).toLocaleString('ar') },
  ];

  const totalReadings = readings.reduce((sum, r) => sum + r.reading_value, 0);
  const averageReading = readings.length > 0 ? totalReadings / readings.length : 0;

  if (loading) {
    return <div className="flex items-center justify-center h-96">جاري تحميل القراءات...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">قراءات المياه</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">إجمالي القراءات</p>
          <p className="text-3xl font-bold">{readings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">إجمالي الاستهلاك</p>
          <p className="text-3xl font-bold">{totalReadings.toFixed(2)} m³</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">متوسط القراءة</p>
          <p className="text-3xl font-bold">{averageReading.toFixed(2)} m³</p>
        </div>
      </div>

      <DataTable columns={columns} data={readings} />
    </div>
  );
}