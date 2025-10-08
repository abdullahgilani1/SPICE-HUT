import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authentication/login';
import Register from './authentication/register';

//admin-view import
import AdminRegister from './authentication/adminregister';
import AdminLayout from './Admin-Frontend/Components/AdminLayout';
import MenuManagement from './Admin-Frontend/Pages/MenuManagement';
import Orders from './Admin-Frontend/Pages/Orders';
import Customers from './Admin-Frontend/Pages/Customers';
import Admins from './Admin-Frontend/Pages/Admins';
import AdminProfile from './Admin-Frontend/Pages/Profile';
import Dashboard from './Admin-Frontend/Pages/Dashboard';
import Reports from './Admin-Frontend/Pages/Reports';
import Settings from './Admin-Frontend/Pages/Settings';

//user-view import

import UserLayout from './User-Frontend/UserLayout.jsx';
import Intro from './User-Frontend/pages/intro.jsx';
import Home from './User-Frontend/pages/Home.jsx';
import Menu from './User-Frontend/pages/Menu.jsx';
import CategoryPage from './User-Frontend/pages/CategoryPage.jsx';
import Support from './User-Frontend/pages/Support.jsx';
import Profile from './User-Frontend/pages/Profile.jsx';
import Cart from './User-Frontend/pages/Cart.jsx';
import { CartProvider } from './User-Frontend/context.cart.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminregister" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="menumanagement" element={<MenuManagement />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="admins" element={<Admins />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Intro />} />
            <Route path="intro" element={<Intro />} />
            <Route path="home" element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:category" element={<CategoryPage />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;