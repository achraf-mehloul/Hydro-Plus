import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onAction?: (action: string, row: any) => void;
}

export default function DataTable({ columns, data, onAction }: DataTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  {col.header}
                </th>
              ))}
              {onAction && <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">إجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                  </td>
                ))}
                {onAction && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => onAction('edit', row)} className="text-blue-600 hover:text-blue-800">✏️</button>
                      <button onClick={() => onAction('delete', row)} className="text-red-600 hover:text-red-800">🗑️</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">لا توجد بيانات</div>
      )}
    </div>
  );
}