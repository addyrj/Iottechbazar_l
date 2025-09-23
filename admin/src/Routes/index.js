import React from 'react'
import App from "../App";
import AdminDashboard from "../Resources/Admin/Screens/AdminDashboard"
import ErrorPage from "../Resources/Admin/Screens/ErrorPage";
import AdminProduct from "../Resources/Admin/Screens/Catlog/AdminProduct";
import AdminCategory from "../Resources/Admin/Screens/Catlog/AdminCategory";
import AdminSubCategory from "../Resources/Admin/Screens/Catlog/AdminSubCategory";
import AdminAttributes from "../Resources/Admin/Screens/Catlog/AdminAttributes";
import AdminBlog from "../Resources/Admin/Screens/Cms/AdminBlog";
import AdminRefrealPages from "../Resources/Admin/Screens/Cms/AdminRefrealPages";
import AdminSlider from "../Resources/Admin/Screens/Cms/AdminSlider";
import AdminCart from "../Resources/Admin/Screens/Customer/AdminCart";
import AdminReview from "../Resources/Admin/Screens/Customer/AdminReview";
import AdminUserList from "../Resources/Admin/Screens/Customer/AdminUserList";
import ContactUs from "../Resources/Admin/Screens/Marketing/ContactUs";
import AdminOrder from "../Resources/Admin/Screens/Sale/AdminOrder";
import AdminShipment from "../Resources/Admin/Screens/Sale/AdminShipment";
import GeneralSetting from "../Resources/Admin/Screens/Setting/GeneralSetting";
import AdminSoftware from "../Resources/Admin/Screens/Software/AdminSoftware";
import BaseActivity from '../Resources/Admin/Layout/BaseActivity';
import { createBrowserRouter } from 'react-router-dom';
import AdminAddProduct from '../Resources/Admin/Screens/Catlog/AdminAddProduct';
import AdminEditProduct from '../Resources/Admin/Screens/Catlog/AdminEditProduct';
import AdminAddCategory from '../Resources/Admin/Screens/Catlog/AdminAddCategory';
import AdminAddSubCategory from '../Resources/Admin/Screens/Catlog/AdminAddSubCategory';
import AdminAttributeFamily from '../Resources/Admin/Screens/Catlog/AdminAttributeFamily';
import AdminAddAttribue from '../Resources/Admin/Screens/Catlog/AdminAddAttribue';
import AdminAddAttribueFamily from '../Resources/Admin/Screens/Catlog/AdminAddAttribueFamily';
import AdminRole from '../Resources/Admin/Screens/Setting/AdminRole';
import AdminManagement from '../Resources/Admin/Screens/Setting/AdminManagement';
import AdminAddManagement from '../Resources/Admin/Screens/Setting/AdminAddManagement';
import AdminAddRole from '../Resources/Admin/Screens/Setting/AdminAddRole';
import AdminRolePermission from '../Resources/Admin/Screens/Setting/AdminRolePermission';
import AdminAddRolePermission from '../Resources/Admin/Screens/Setting/AdminAddRolePermission';
import AdminLogin from '../Resources/Admin/Screens/AdminLogin';
import AdminColorVariant from '../Resources/Admin/Screens/Catlog/AdminColorVariant';
import AdminAddColorVaraint from '../Resources/Admin/Screens/Catlog/AdminAddColorVaraint';
import AdminUpdateReview from '../Resources/Admin/Screens/Customer/AdminUpdateReview';
import Transaction from '../Resources/Admin/Screens/Sale/Transaction';
import AdminAddPage from '../Resources/Admin/Screens/Cms/AdminAddPage';
import AdminAddSlider from '../Resources/Admin/Screens/Cms/AdminAddSlider';
import AdminAddBlog from '../Resources/Admin/Screens/Cms/AdminAddBlog';
import EditContactUsQuery from '../Resources/Admin/Screens/Marketing/EditContactUsQuery';
import AdminTrackLog from '../Resources/Admin/Screens/AdminTrackLog';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <AdminLogin />
            },
            {
                path: "/admin_login",
                element: <AdminLogin />
            },
            {
                path: "/admin_dashboard",
                element: <BaseActivity><AdminDashboard /></BaseActivity>
            },
            {
                path: "admin_product",
                element: <BaseActivity><AdminProduct /></BaseActivity>
            },
            {
                path: "admin_category",
                element: <BaseActivity><AdminCategory /></BaseActivity>
            },
            {
                path: "admin_sub_category",
                element: <BaseActivity><AdminSubCategory /></BaseActivity>
            },
            {
                path: "admin_add_sub_category",
                element: <BaseActivity><AdminAddSubCategory /></BaseActivity>
            },
            {
                path: "admin_attributes",
                element: <BaseActivity><AdminAttributes /></BaseActivity>
            },
            {
                path: "admin_family_attributes",
                element: <BaseActivity><AdminAttributeFamily /></BaseActivity>
            },
            {
                path: "admin_add_attributes",
                element: <BaseActivity><AdminAddAttribue /></BaseActivity>
            },
            {
                path: "admin_add_family_attributes",
                element: <BaseActivity><AdminAddAttribueFamily /></BaseActivity>
            },
            {
                path: "admin_add_product",
                element: <BaseActivity><AdminAddProduct /></BaseActivity>
            },
            {
                path: "admin_edit_product",
                element: <BaseActivity><AdminEditProduct /></BaseActivity>
            },
            {
                path: "admin_add_category",
                element: <BaseActivity><AdminAddCategory /></BaseActivity>
            },
            {
                path: "admin_blogs",
                element: <BaseActivity><AdminBlog /></BaseActivity>
            },
            {
                path: "admin_slider",
                element: <BaseActivity><AdminSlider /></BaseActivity>
            },
            {
                path: "admin_refreal_pages",
                element: <BaseActivity><AdminRefrealPages /></BaseActivity>
            },
            {
                path: "admin_cart",
                element: <BaseActivity><AdminCart /></BaseActivity>
            },
            {
                path: "admin_product_revies",
                element: <BaseActivity><AdminReview /></BaseActivity>
            },
            {
                path: "admin_user_list",
                element: <BaseActivity><AdminUserList /></BaseActivity>
            },
            {
                path: "admin_contact_us",
                element: <BaseActivity><ContactUs /></BaseActivity>
            },
            {
                path: "admin_order",
                element: <BaseActivity><AdminOrder /></BaseActivity>
            },
            {
                path: "admin_shipment",
                element: <BaseActivity><AdminShipment /></BaseActivity>
            },
            {
                path: "admin_general_setting",
                element: <BaseActivity><GeneralSetting /></BaseActivity>
            },
            {
                path: "admin_software",
                element: <BaseActivity><AdminSoftware /></BaseActivity>
            },
            {
                path: "admin_role",
                element: <BaseActivity><AdminRole /></BaseActivity>
            },
            {
                path: "admin_management",
                element: <BaseActivity><AdminManagement /></BaseActivity>
            },
            {
                path: "admin_add_management",
                element: <BaseActivity><AdminAddManagement /></BaseActivity>
            },
            {
                path: "admin_add_role",
                element: <BaseActivity><AdminAddRole /></BaseActivity>
            },
            {
                path: "admin_role_permission",
                element: <BaseActivity><AdminRolePermission /></BaseActivity>
            },
            {
                path: "admin_add_role_permission",
                element: <BaseActivity><AdminAddRolePermission /></BaseActivity>
            },
            {
                path: "admin_color_variant",
                element: <BaseActivity><AdminColorVariant /></BaseActivity>
            },
            {
                path: "admin_add_color_variant",
                element: <BaseActivity><AdminAddColorVaraint /></BaseActivity>
            },
            {
                path: "admin_update_review",
                element: <BaseActivity><AdminUpdateReview /></BaseActivity>
            },
            {
                path: "admin_transaction",
                element: <BaseActivity><Transaction /></BaseActivity>
            },
            {
                path: "admin_add_legal_page",
                element: <BaseActivity><AdminAddPage /></BaseActivity>
            },
            {
                path: "admin_add_slider",
                element: <BaseActivity><AdminAddSlider /></BaseActivity>
            },
            {
                path: "admin_add_blogs",
                element: <BaseActivity><AdminAddBlog /></BaseActivity>
            },
            {
                path: "admin_edit_conatct_query",
                element: <BaseActivity><EditContactUsQuery /></BaseActivity>
            },
            {
                path: "admin_track_log",
                element: <BaseActivity><AdminTrackLog /></BaseActivity>
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }
])
export default router