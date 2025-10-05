import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './authentication/login';
import Register from './authentication/register';

//admin-view import
import AdminRegister from './authentication/adminregister';
import AdminLayout from './Admin-Frontend/Components/AdminLayout';
import MenuManagement from './Admin-Frontend/Pages/MenuManagement';
import Orders from './Admin-Frontend/Pages/Orders';
import Customers from './Admin-Frontend/Pages/Customers';
import Reports from './Admin-Frontend/Pages/Reports';
import Settings from './Admin-Frontend/Pages/Settings';

//user-view import 
/*import Header from "./User-Frontend/components/header";
import Footer from "./User-Frontend/components/header";
import Home from "./User-Frontend/pages/home";
import Menu from "./User-Frontend/pages/menu";
import Cart from "./User-Frontend/pages/cart";
import Billing from "./User-Frontend/pages/billing";
import Profile from "./User-Frontend/pages/profile";
import Support from "./User-Frontend/pages/support";
import Intro from "./User-Frontend/pages/intro";
*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="menumanagement" element={<MenuManagement />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

          
        </Route>
      </Routes>
    </Router>
  );
}
/*
<Route path="/" element={<Home />} />
<Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/intro" element={<Intro />} />          
*/
export default App;