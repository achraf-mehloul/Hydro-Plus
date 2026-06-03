import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'الرئيسية' },
    { path: '/users', icon: '👥', label: 'المستخدمين' },
    { path: '/reports', icon: '📋', label: 'التقارير' },
    { path: '/water', icon: '💧', label: 'قراءات المياه' },
    { path: '/settings', icon: '⚙️', label: 'الإعدادات' },
  ];
  
  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-gray-900 text-white shadow-xl z-50">
      <div className="p-6 text-center border-b border-gray-700">
        <div className="text-4xl mb-2">💧</div>
        <h2 className="text-xl font-bold">تطبيق المياه</h2>
        <p className="text-gray-400 text-sm">لوحة تحكم المدير</p>
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <button
          onClick={logout}
          className="sidebar-link w-full text-right mt-10 text-red-400 hover:text-red-300"
        >
          <span className="text-xl">🚪</span>
          <span>تسجيل الخروج</span>
        </button>
      </nav>
    </aside>
  );
}