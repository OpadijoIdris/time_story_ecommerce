import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="bg-white font-serif">
      <div className="fixed top-0 z-50 w-full bg-gray-100 h-20 p-5">
        <nav className="flex justify-between">
          <div className="flex justify-between gap-5">
            <NavLink to="/">
              <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">TimeStory</h1>
            </NavLink>
          </div>
          <div className="flex justify-between gap-5 text-gray-800">
            <NavLink to="/" className={({ isActive }) => isActive ? "border-b-2 border-pink-500" : ""}><h1>Home</h1></NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "border-b-2 border-pink-500" : ""}><h1>About</h1></NavLink>
            <NavLink to="/all-products" className={({ isActive }) => isActive ? "border-b-2 border-pink-500" : ""}><h1>Shop</h1></NavLink>
            <NavLink to="/contacts" className={({ isActive }) => isActive ? "border-b-2 border-pink-500" : ""}><h1>Contacts</h1></NavLink>
          </div>
          <div className="flex justify-between gap-2">
            <NavLink to={'/login'}><button className="bg-black text-white hover:bg-gray-900 rounded-lg px-4 py-2 mx-2">Sign In</button></NavLink>
            <NavLink to={'/register'}><button className='bg-gray-600 text-white hover:bg-gray-700 rounded-lg px-4 py-2 '>Sign Up</button></NavLink>
          </div>
        </nav>
      </div>
      <main className="pt-20">{children}</main>
    </div>
  );
};

export default Layout;
