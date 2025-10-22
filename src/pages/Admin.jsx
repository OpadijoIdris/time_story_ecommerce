import { useState } from "react";
import Products from "./admin/adminProducts.jsx";
import { Home, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import Dashboard from "./admin/dashboard.jsx";
import AllUsers from "./admin/AllUsers.jsx";

export default function AdminDashboard() {

  const [setDashboard, isSetDashboard] = useState(false);
  const [setProducts, isSetProducts] = useState(false);
  const [setCustomers, isSetCustomers] = useState(false);

   
  return (
    <div className="">

        <aside className="w-64 bg-gray-900 text-gray-100 h-fit flex flex-col justify-between p-4 fixed">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
        <nav className="space-y-4">
          <a onClick={() => {
            isSetDashboard(true);
            isSetProducts(false);
            isSetCustomers(false);
          }} href="#" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-md">
            <Home className="w-5 h-5" /> Dashboard
          </a>
          <a onClick={() => {
            isSetDashboard(false);
            isSetProducts(true);
            isSetCustomers(false);
          }} href="#" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-md">
            <Package className="w-5 h-5" /> Products
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-md">
            <ShoppingCart className="w-5 h-5" /> Orders
          </a>
          <a onClick={() => {
            isSetDashboard(false);
            isSetProducts(false);
            isSetCustomers(true);
          }} href="#" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-md">
            <Users className="w-5 h-5" /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-md">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
      </div>
      <button className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded-md mt-6">
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </aside>
    <div className="ml-64 p-3">
      {setDashboard && (
        <div><Dashboard /></div>
      )}

      {setProducts && (
        <div><Products /></div>
      )}

      {setCustomers && (
        <div><AllUsers /></div>
      )}


    </div>
        

    </div>
  );
}
