import ShoppingBag from "@mui/icons-material/ShoppingBag";
import {
    FolderRounded, GroupsIcon, PieChartIcon, RateReviewIcon, SpaceDashboardIcon, AdjustIcon, AccountBalanceIcon,
    AcUnitIcon, AdsClickIcon, AnimationIcon, AppsOutageIcon, AssessmentIcon, AssistantIcon, AutoAwesomeMosaicIcon,
    AutoAwesomeMotionIcon, AutoGraphIcon, BatchPredictionIcon, BeenhereIcon, CompressIcon, DesktopMacIcon,
    SettingsIcon, LogoutIcon, HubIcon
} from "./MateiralImage";

export const ADMIN_SIDEBAR_LIST = [
    { id: '1', label: 'Dashboard', icon: SpaceDashboardIcon, navigation: "/admin_dashboard" },
    {
        id: '2',
        label: 'Customer',
        groupIcon: GroupsIcon,
        children: [
            { id: '2.1', label: 'Customers', icon: GroupsIcon, navigation: "/admin_user_list" },
            { id: '2.2', label: 'Reviews', icon: RateReviewIcon, navigation: "/admin_product_revies" },
            { id: '2.3', label: 'Cart', icon: ShoppingBag, navigation: "/admin_cart" }
        ],
    },
    {
        id: '3',
        label: 'Catlog',
        groupIcon: PieChartIcon,
        children: [
            { id: '3.1', label: 'Product', icon: FolderRounded, navigation: "/admin_product" },
            { id: '3.2', label: 'Category', icon: FolderRounded, navigation: "/admin_category" },
            { id: '3.3', label: 'Sub-Category', icon: FolderRounded, navigation: "/admin_sub_category" },
            { id: '3.4', label: 'Attributes', icon: FolderRounded, navigation: "/admin_attributes" },
            { id: '3.5', label: 'Attributes Families', icon: FolderRounded, navigation: "/admin_family_attributes" },
            { id: '3.6', label: 'Color Variant', icon: FolderRounded, navigation: "/admin_color_variant" }
        ],
    },
    {
        id: '4',
        label: 'Sale',
        groupIcon: PieChartIcon,
        children: [
            { id: '4.1', label: 'Order', icon: FolderRounded, navigation: "/admin_order" },
            { id: '4.2', label: 'Shipment', icon: FolderRounded, navigation: "/admin_shipment" }
        ],
    },
    {
        id: '5',
        label: 'Marketing',
        groupIcon: PieChartIcon,
        children: [
            { id: '5.1', label: 'Contact Us', icon: FolderRounded, navigation: "/admin_contact_us" }
        ],
    },
    {
        id: '6',
        label: 'CMS',
        groupIcon: PieChartIcon,
        children: [
            { id: '6.1', label: 'Pages', icon: FolderRounded, navigation: "/admin_refreal_pages" },
            { id: '6.2', label: 'Slider', icon: FolderRounded, navigation: "/admin_slider" },
            { id: '6.3', label: 'Blog', icon: FolderRounded, navigation: "/admin_blogs" },
        ],
    },
    {
        id: '7',
        label: 'Softwares',
        groupIcon: PieChartIcon,
        children: [
            { id: '7.1', label: 'Software', icon: FolderRounded, navigation: "/admin_software" }
        ],
    },
    {
        id: '8',
        label: 'ATL Equipments',
        groupIcon: PieChartIcon,
        children: [
            { id: '8.1', label: 'Category', icon: FolderRounded, navigation: "/admin_attributes" }
        ],
    },
    {
        id: '9',
        label: 'Setting',
        groupIcon: PieChartIcon,
        children: [
            { id: '9.1', label: 'Role', icon: FolderRounded, navigation: "/admin_role" },
            { id: '9.2', label: 'Management', icon: FolderRounded, navigation: "/admin_management" },
            { id: '9.3', label: 'Permission', icon: FolderRounded, navigation: "/admin_role_permission" },
            { id: '9.4', label: 'General Setting', icon: FolderRounded, navigation: "/admin_general_setting" },
        ],
    },
    { id: '10', label: 'Transaction', icon: SpaceDashboardIcon, navigation: "/admin_dashboard" },
    { id: '11', label: 'Logout', icon: SpaceDashboardIcon, navigation: "logout" }
];