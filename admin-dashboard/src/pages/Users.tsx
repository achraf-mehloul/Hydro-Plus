import { useEffect, useState } from 'react';
import { getAllUsers, toggleUserStatus, deleteUser } from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { User } from '../types';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(userId: number, currentStatus: boolean) {
    await toggleUserStatus(userId, !currentStatus);
    await loadUsers();
  }

  async function handleDeleteUser(userId: number) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      await deleteUser(userId);
      await loadUsers();
    }
  }

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'full_name', header: 'الاسم الكامل' },
    { key: 'email', header: 'البريد الإلكتروني' },
    { key: 'phone', header: 'رقم الهاتف' },
    { key: 'wilaya', header: 'الولاية' },
    { key: 'role', header: 'الدور', render: (v: string) => <StatusBadge status={v} /> },
    { key: 'is_active', header: 'الحالة', render: (v: boolean) => v ? '✅ نشط' : '❌ معطل' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-96">جاري تحميل المستخدمين...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <span className="text-gray-500">إجمالي: {users.length} مستخدم</span>
      </div>

      <DataTable
        columns={columns}
        data={users}
        onAction={(action, row) => {
          if (action === 'edit') {
            handleToggleStatus(row.id, row.is_active);
          } else if (action === 'delete') {
            handleDeleteUser(row.id);
          }
        }}
      />
    </div>
  );
}