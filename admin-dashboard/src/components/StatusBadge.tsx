interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    citizen: 'bg-blue-100 text-blue-800',
    government: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800',
  };
  
  const labels: Record<string, string> = {
    pending: '🟡 معلق',
    in_progress: '🔵 قيد المعالجة',
    resolved: '🟢 محلول',
    rejected: '🔴 مرفوض',
    citizen: 'مواطن',
    government: 'حكومة',
    admin: 'مدير',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {labels[status] || status}
    </span>
  );
}