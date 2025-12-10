import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import type { TypeCake } from "./features/cakes/cakesAPI";
import React, { useState } from "react";



// Pages
import Landingpage from "./components/pages/Landingpage";
import { About } from "./components/about/About";
import  Contact  from "./components/contact/Contact";
import { Cakes } from "./components/cakes/Cakes";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Verification } from "./components/login/verification";
import  {Footer} from "./components/footer/Footer";

// Dashboards
import AdminDashboard from "./dashboard/adminDashboard/content/AdminDashboard";
import CustomerDashboard from "./dashboard/customerDashboard/content/customerDashboard";


import UsersPage from "./dashboard/adminDashboard/content/users/users";
import CakesPage from "./dashboard/adminDashboard/content/cakes/cakespage";
import OrdersPage from "./dashboard/adminDashboard/content/orders/orderspage";
import AnalyticsPage from "./dashboard/adminDashboard/content/analytics/Analyticspage";
import BrowseCakes from "./dashboard/customerDashboard/content/cakes/browsecakes";
import UserSection from "./dashboard/customerDashboard/content/users/Customer"; 

import CustomersOrdersPage from "./dashboard/customerDashboard/content/orders/Customersorderspage";
import CheckoutPage from "./dashboard/customerDashboard/content/checkout/Checkoutpage";










function App() {
  const isadmin = useSelector((state: RootState) => state.user.user?.role === "admin");
  const iscustomer = useSelector((state: RootState) => state.user.user?.role === "customer");
 const [cart, setCart] = useState<TypeCake[]>([]);
  const currentUserId = 1;
const clearCart = () => setCart([]);
  const router = createBrowserRouter([
   
    { path: "/", element: <Landingpage /> },
    { path: "/about", element: <About /> },
    { path: "/cakes", element: <Cakes /> },
    { path: "/login", element: <Login key={Date.now()} /> },
    { path: "/register", element: <Register /> },
    { path: "/contact", element: <Contact/> },
    { path: "/verification", element: <Verification  /> },
    { path: "/footer", element: <Footer/> },

    
    {
        path: "/admin/dashboard",
  element: <AdminDashboard />,
      children: [
         {
      index: true,
      element: <UsersPage />,
    },
        {
          path: "users",
          element: <UsersPage />, 
        },
        {
          path: "cakes",
          element: <CakesPage />, 
        },
       {
          path: "orders",
          element: <OrdersPage/>, 
        },
       
         {
          path: "analytics",
          element: <AnalyticsPage/> 
        },
        
      ],
    },

    {
       path: "/customer/dashboard",
  element: <CustomerDashboard />,
      children: [
        {
      index: true,
      element:<BrowseCakes cart={cart} setCart={setCart} />,
    },
        {
          path: "cakes",
          element:<BrowseCakes cart={cart} setCart={setCart} />,
        },
         
        
                  {
                     path: "users",
               element: <UserSection />,
                  },

       {
       path: "orders",
       element: <CustomersOrdersPage/>
       },
        {
  path: "checkout",
  element: (
    <CheckoutPage
      cart={cart}
      clearCart={clearCart}
      removeItem={(cakeId) => setCart(prev => prev.filter(cake => cake.cakeId !== cakeId))}
      currentUserId={currentUserId} 
    />
  ),
},

        
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
          },
        }}
      />
    </>
  );
}

export default App;
