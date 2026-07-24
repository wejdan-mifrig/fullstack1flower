// ============================================================
// 📄 src/App.js
// ============================================================

import React from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./Pages/Hero/Hero.jsx";
import Contact from "./Pages/Sidpages/Contact.jsx";
import About from "./Pages/Sidpages/About.jsx";
// ✅ تم تصحيح الاستيراد (بحرف كبير C)
import Carts from "./Pages/Sidpages/Carts.jsx";
import Event from "./Pages/Sidpages/Eventde.jsx";
import Shop from "./Pages/Sidpages/Shop.jsx";

import Wedding from "./Pages/Eventdepages/Wedding.jsx";
import Birthday from "./Pages/Eventdepages/Birthday.jsx";
import Graduation from "./Pages/Eventdepages/Graduation.jsx";
import Newborn from "./Pages/Eventdepages/Newborn.jsx";

import Register from "./Components/Auth/Register.jsx";
import Login from "./Components/Auth/Login.jsx";

import { Toaster } from "react-hot-toast";

import User from "./Pages/User/User.jsx";
import Aboutuser from "./Pages/User/Aboutuser.jsx";
import Birthdayuser from "./Pages/User/Birthdayuser.jsx";
import Bookuser from "./Pages/User/Bookuser.jsx";
import Contactuser from "./Pages/User/Contactuser.jsx";
import Eventuser from "./Pages/User/Eventuser.jsx";
import Graduationuser from "./Pages/User/Graduationuser.jsx";
import Mybooking from "./Pages/User/Mybooking.jsx";
import Myprofile from "./Pages/User/Myprofile.jsx";
import Newbornuser from "./Pages/User/Newbornuser.jsx";
import Reviewuser from "./Pages/User/reviewuser.jsx";
import Shopuser from "./Pages/User/Shopuser.jsx";
import Weddinguser from "./Pages/User/Weddinguser.jsx";
import Cart from "./Pages/User/Cart.jsx";

import Admin from "./Pages/Admin/Adminpages/Admin.jsx";
import AdminCat from "./Pages/Admin/Adminpages/Admincat.jsx";
import AdminMass from "./Pages/Admin/Adminpages/Adminmass.jsx";
import AdminPro from "./Pages/Admin/Adminpages/Adminpro.jsx";
import AdminUser from "./Pages/Admin/Adminpages/Adminuser.jsx";
import AddForm from "./Pages/Admin/AdminComponants/AddForm.jsx";
import EditUser from "./Pages/Admin/Adminpages/EditUser.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Hero />} />

        {/* الصفحات العامة */}
        <Route path="/event-decoration" element={<Event />} />
        <Route path="/book-event" element={<Event />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* ✅ تم تصحيح استخدام المكون (بحرف كبير C) */}
        <Route path="/carts" element={<Carts />} />

        {/* أنواع الفعاليات */}
        <Route path="/events/wedding" element={<Wedding />} />
        <Route path="/events/birthday" element={<Birthday />} />
        <Route path="/events/graduation" element={<Graduation />} />
        <Route path="/events/newborn" element={<Newborn />} />

        {/* صفحات المصادقة */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* صفحات المستخدم */}
        <Route path="/user" element={<User />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/bookuser" element={<Bookuser />} />
        <Route path="/eventsuser" element={<Eventuser />} />
        <Route path="/shopuser" element={<Shopuser />} />
        <Route path="/aboutuser" element={<Aboutuser />} />
        <Route path="/contactuser" element={<Contactuser />} />
        <Route path="/reviewsuser" element={<Reviewuser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/weddinguser" element={<Weddinguser />} />
        <Route path="/birthdayuser" element={<Birthdayuser />} />
        <Route path="/graduationuser" element={<Graduationuser />} />
        <Route path="/newbornuser" element={<Newbornuser />} />

        {/* صفحات الأدمن */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/categories" element={<AdminCat />} />
        <Route path="/admin/messages" element={<AdminMass />} />
        <Route path="/admin/products" element={<AdminPro />} />
        <Route path="/admin/users" element={<AdminUser />} />
        <Route path="/admin/add/:type" element={<AddForm />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;