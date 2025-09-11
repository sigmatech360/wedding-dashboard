import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";


import { UserManagement } from "../Screens/UserManagement";
import { UserDetail } from "../Screens/UserManagement/UserDetail";
import { AddUser } from "../Screens/UserManagement/AddUser";
import { EditUser } from "../Screens/UserManagement/EditUser";


import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";
import { EditVendor } from "../Screens/VendorManagement/EditVendor";
import { VendorManagement } from "../Screens/VendorManagement";
import { VendorDetail } from "../Screens/VendorManagement/VendorDetail";
import { AddVendor } from "../Screens/VendorManagement/AddVendor";
import { HiredVendors } from "../Screens/HiredVendors";
import { FeedbackManagement } from "../Screens/FeedbackManagement";
import FeedbackDetails from "../Screens/FeedbackManagement/FeedbackDetails";
import useFirebaseMessaging from "../useFirebaseMessaging";


export default function AdminRouter() {
  useFirebaseMessaging();
  return (
    <BrowserRouter basename="/wedding-admin" >
      <Routes>
        <Route path="/" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />

        <Route path="/feedback-management" element={<ProtectedRoutes Components={FeedbackManagement} />} />
        <Route path="/feedback-management/:id" element={<ProtectedRoutes Components={FeedbackDetails} />} />

        <Route path="/vendor-management" element={<ProtectedRoutes Components={VendorManagement} />} />
        <Route path="/add-vendor" element={<ProtectedRoutes Components={AddVendor} />} />
        <Route path="/vendor-management/vendor-details/:id" element={<ProtectedRoutes Components={VendorDetail} />} />
        <Route path="/vendor-management/edit-vendor/:id" element={<ProtectedRoutes Components={EditVendor} />} />

        {/* end  */}
        <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} />
        <Route path="/user-detail/:id" element={<ProtectedRoutes Components={UserDetail} />} />
        <Route path="/add-user/" element={<ProtectedRoutes Components={AddUser} />} />
        <Route path="/edit-user/:id" element={<ProtectedRoutes Components={EditUser} />} />

        <Route path="/hired-vendors" element={<ProtectedRoutes Components={HiredVendors} />} />

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
