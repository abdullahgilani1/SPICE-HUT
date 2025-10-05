import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingCart, FiSettings, FiUser, FiLogOut, FiX } from "react-icons/fi";

const links = [
  { to: "/admin/menumanagement", label: "Menu Management", icon: <FiHome /> },
  { to: "/admin/orders", label: "Orders", icon: <FiShoppingCart /> },
  { to: "/admin/customers", label: "Customers", icon: <FiUsers /> },
  { to: "/admin/settings", label: "Content Management", icon: <FiSettings /> },
];

export default function Sidebar({ collapsed, open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication data here (e.g., localStorage)
    localStorage.clear();
    // Redirect to login page
    navigate("/login");
  };

  // Mobile: overlay sidebar
  const mobileSidebar = (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-70 z-50"
        onClick={() => setOpen(false)}
      />
      <aside
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-orange-400 to-orange-600 text-white flex flex-col justify-between z-60 shadow-lg transition-transform duration-300"
      >
        <div>
          <div className="flex items-center justify-between p-4 border-b border-blue-800">
            <span className="text-2xl font-bold tracking-wide">Admin</span>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      location.pathname === link.to
                        ? "bg-black shadow font-semibold"
                        : "hover:bg-gray-700 hover:shadow"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-blue-800 flex flex-col gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black transition-colors" onClick={() => {}}>
            <FiUser size={20} />
            Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors" onClick={handleLogout}>
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );

  // Desktop: collapsible sidebar
  const desktopSidebar = (
    <aside
      className={`hidden md:flex h-full bg-gradient-to-b from-orange-400 to-orange-600 text-white flex-col justify-between z-40 shadow-lg transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{ minWidth: collapsed ? "4rem" : "16rem" }}
    >
      <div>
        <div className={`flex items-center justify-between p-4 border-b border-white ${collapsed ? "justify-center" : ""}`}>
          {!collapsed && <span className="text-2xl font-bold tracking-wide">Admin</span>}
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all justify-center ${collapsed ? "" : "justify-start"} ${
                    location.pathname === link.to
                      ? "bg-blue-600 shadow font-semibold"
                      : "hover:bg-blue-500 hover:shadow"
                  }`}
                  title={link.label}
                >
                  {link.icon}
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-white flex flex-col gap-3 items-center">
        <button className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-black transition-colors justify-center" onClick={() => {}}>
          <FiUser size={20} />
          {!collapsed && <span>Profile</span>}
        </button>
        <button className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-red-600 transition-colors justify-center" onClick={handleLogout}>
          <FiLogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile sidebar */}
      {open && mobileSidebar}
      {/* Desktop sidebar */}
      {desktopSidebar}
    </>
  );
}
