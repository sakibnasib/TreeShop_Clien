import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import PlantDetails from "../pages/PlantDetails/PlantDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import Statistics from "../pages/Dashbord/Common/Statistics";
import AddPlant from "../pages/Dashbord/Seller/AddPlant";
import MyInventory from "../pages/Dashbord/Seller/MyInventTory";
import ManageUsers from "../pages/Dashbord/Admin/ManageUsers";
import Profile from "../pages/Dashbord/Common/Profile";
import MyOrders from "../pages/Dashbord/Customer/MyOrders";
import ManageOrders from "../pages/Dashbord/Seller/ManageOrders";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

 export const router = createBrowserRouter([
{path:'/',Component:MainLayout,
    children:[
        {path:'/',Component:Home,
          loader:()=>fetch(`${import.meta.env.VITE_API_URL}/plants`),
          hydrateFallbackElement:<LoadingSpinner/>
        },
        {path:'/plant/:id',Component:PlantDetails,
          loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/plant/${params.id}`),
           hydrateFallbackElement:<LoadingSpinner/>
        }
    ]
},
{path:'/login', Component:Login},
{path:'/signup', Component:SignUp},
{path:'/dashboard',element:<PrivateRoute>
  <DashboardLayout/>
</PrivateRoute>
,children:[
  {index:true,element:<PrivateRoute>
    <Statistics/>
  </PrivateRoute>},
  {path:'add-plant',element:<PrivateRoute>
    <AddPlant/>
  </PrivateRoute>},
  {path:'my-inventory',element:<PrivateRoute>
    <MyInventory/>
  </PrivateRoute>},
  {path:'manage-users',
    element:<PrivateRoute>
      <ManageUsers/>
    </PrivateRoute>
  },
  {path:'profile',
    element:<PrivateRoute>
      <Profile/>
    </PrivateRoute>
  },
  {path:'my-orders',element:<PrivateRoute>
    <MyOrders/>
  </PrivateRoute>},
  {path:'manage-orders',
    element:<ManageOrders/>
  }
] 
}
])