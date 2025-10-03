const db = require("../../DB/config");

const materialIcon = [
    "AccountBalanceIcon",
    "AdjustIcon",
    "SpaceDashboardIcon",
    "RateReviewIcon",
    "ShoppingBagIcon",
    "PieChartIcon",
    "GroupsIcon",
    "FolderRounded",
    "AcUnitIcon",
    "AdsClickIcon",
    "AnimationIcon",
    "AppsOutageIcon",
    "AssessmentIcon",
    "AssistantIcon",
    "AutoAwesomeMosaicIcon",
    "AutoAwesomeMotionIcon",
    "AutoGraphIcon",
    "BatchPredictionIcon",
    "BeenhereIcon",
    "CompressIcon",
    "HubSharpIcon",
    "LayersClearSharpIcon"
]

const PermissionFamily = db.permissionFamily;
const adminNavBarList = async () => {

    const ADMIN_SIDEBAR_LIST = [
        { id: '1', label: 'Dashboard', icon: "SpaceDashboardIcon", navigation: "/admin_dashboard" },
        {
            id: '2',
            label: 'Customer',
            groupIcon: "GroupsIcon",
            children: [
                { id: '2.1', label: 'Customers', icon: "GroupsIcon", navigation: "/admin_user_list" },
                { id: '2.2', label: 'Reviews', icon: "RateReviewIcon", navigation: "/admin_product_revies" },
                { id: '2.3', label: 'Cart', icon: "ShoppingBagIcon", navigation: "/admin_cart" }
            ],
        },
        {
            id: '3',
            label: 'Catlog',
            groupIcon: "HubIcon",
            children: [
                { id: '3.1', label: 'Product', icon: "CompressIcon", navigation: "/admin_product" },
                { id: '3.2', label: 'Category', icon: "AnimationIcon", navigation: "/admin_category" },
                { id: '3.3', label: 'Sub-Category', icon: "AdsClickIcon", navigation: "/admin_sub_category" },
                { id: '3.4', label: 'Attributes', icon: "AcUnitIcon", navigation: "/admin_attributes" },
                { id: '3.5', label: 'Attributes Families', icon: "AppsOutageIcon", navigation: "/admin_family_attributes" },
                { id: '3.6', label: 'Color Variant', icon: "AutoGraphIcon", navigation: "/admin_color_variant" }
            ],
        },
        {
            id: '4',
            label: 'Sale',
            groupIcon: "PieChartIcon",
            children: [
                { id: '4.1', label: 'Order', icon: "HubSharpIcon", navigation: "/admin_order" },
                { id: '4.2', label: 'Shipment', icon: "LayersClearSharpIcon", navigation: "/admin_shipment" }
            ],
        },
        {
            id: '5',
            label: 'Marketing',
            groupIcon: "AutoGraphIcon",
            children: [
                { id: '5.1', label: 'Contact Us', icon: "BatchPredictionIcon", navigation: "/admin_contact_us" }
            ],
        },
        {
            id: '6',
            label: 'CMS',
            groupIcon: "AutoAwesomeMotionIcon",
            children: [
                { id: '6.1', label: 'Pages', icon: "AutoAwesomeMosaicIcon", navigation: "/admin_refreal_pages" },
                { id: '6.2', label: 'Slider', icon: "AutoAwesomeMotionIcon", navigation: "/admin_slider" },
                { id: '6.3', label: 'Blog', icon: "AdjustIcon", navigation: "/admin_blogs" },
            ],
        },
        {
            id: '7',
            label: 'Softwares',
            groupIcon: "DesktopMacIcon",
            children: [
                { id: '7.1', label: 'Software', icon: "BeenhereIcon", navigation: "/admin_software" }
            ],
        },
        {
            id: '8',
            label: 'ATL Equipments',
            groupIcon: "AssistantIcon",
            children: [
                { id: '8.1', label: 'Category', icon: "CompressIcon", navigation: "/admin_attributes" }
            ],
        },
        {
            id: '9',
            label: 'Setting',
            groupIcon: "SettingsIcon",
            children: [
                { id: '9.1', label: 'Role', icon: "AppsOutageIcon", navigation: "/admin_role" },
                { id: '9.2', label: 'Management', icon: "AccountBalanceIcon", navigation: "/admin_management" },
                { id: '9.3', label: 'Permission', icon: "FolderRounded", navigation: "/admin_role_permission" },
                { id: '9.4', label: 'General Setting', icon: "SettingsIcon", navigation: "/admin_general_setting" },
            ],
        },
        { id: '10', label: 'Transaction', icon: "LayersClearSharpIcon", navigation: "/admin_transaction" },
        { id: '11', label: 'Track Log', icon: "AssessmentIcon", navigation: "/admin_track_log" },
        { id: '12', label: 'Logout', icon: "LogoutIcon", navigation: "logout" }
    ];

    return ADMIN_SIDEBAR_LIST;

}

const noPermissionNavBarList = async () => {
    const ADMIN_SIDEBAR_LIST = [
        { id: '1', label: 'Dashboard', icon: "SpaceDashboardIcon", navigation: "/admin_dashboard" },
        { id: '11', label: 'Logout', icon: "SettingsIcon", navigation: "logout" }
    ];

    return ADMIN_SIDEBAR_LIST;
}

const managemntNavBarList = async (permissionFamily) => {
    let ADMIN_SIDEBAR_LIST = [];
    let finalArray = [];
    if (permissionFamily.length !== 0) {
        const duplicatesArray = permissionFamily.filter((item, index) =>
            permissionFamily.some((elem, idx) => elem.permissionSlug === item.permissionSlug && idx !== index));

        let count = {};
        permissionFamily.forEach(value => {
            count[value.permissionSlug] = (count[value.permissionSlug] || 0) + 1;
        });
        let uniqueArray = [];
        permissionFamily.forEach(value => {
            if (count[value.permissionSlug] === 1) {
                uniqueArray.push(value);
            }
        });

        let singleItemArray = uniqueArray.map((item) => {
            const randomNumber = Math.floor(Math.random() * 22);
            const id = item.id;
            const label = item.name;
            const icon = materialIcon[randomNumber]
            const navigation = item.url;

            return {
                id, label, icon, navigation
            }
        });

        let catlogDupArray = duplicatesArray.filter((item) => {
            return item.group === "Catlog"
        });

        let customerDupArray = duplicatesArray.filter((item) => {
            return item.group === "Customer"
        });

        let saleDupArray = duplicatesArray.filter((item) => {
            return item.group === "Sale"
        });

        let marketingDupArray = duplicatesArray.filter((item) => {
            return item.group === "Marketing"
        });

        let cmsDupArray = duplicatesArray.filter((item) => {
            return item.group === "CMS"
        });

        let softwaresDupArray = duplicatesArray.filter((item) => {
            return item.group === "Softwares"
        });

        let atlEquipDupArray = duplicatesArray.filter((item) => {
            return item.group === "Atl Equpment"
        });

        let settingDupArray = duplicatesArray.filter((item) => {
            return item.group === "Setting"
        });

        let transactionDupArray = duplicatesArray.filter((item) => {
            return item.group === "Manage Transaction"
        });

        let dashboardArray = { id: "dashboard", label: "Dashboard", icon: "SpaceDashboardIcon", navigation: "/admin_dashboard" };
        finalArray.push(dashboardArray);

        if (catlogDupArray.length !== 0) {
            let catlogArray = {
                id: 'catlog',
                label: 'Catlog',
                groupIcon: "HubIcon",
                children: catlogDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }

            finalArray.push(catlogArray)
        }

        if (customerDupArray.length !== 0) {
            let customerArray = {
                id: 'customer',
                label: 'Customer',
                groupIcon: "GroupsIcon",
                children: customerDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(customerArray)
        }

        if (saleDupArray.length !== 0) {
            let saleArray = {
                id: 'sale',
                label: 'Sale',
                groupIcon: "PieChartIcon",
                children: saleDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(saleArray)
        }

        if (marketingDupArray.length !== 0) {
            let marketingArray = {
                id: 'marketing',
                label: 'Marketing',
                groupIcon: "AutoGraphIcon",
                children: marketingDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(marketingArray)
        }

        if (cmsDupArray.length !== 0) {
            let cmsArray = {
                id: 'cms',
                label: 'CMS',
                groupIcon: "AutoAwesomeMotionIcon",
                children: cmsDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(cmsArray)
        }

        if (softwaresDupArray.length !== 0) {
            let softwareArray = {
                id: 'softwares',
                label: 'Softwares',
                groupIcon: "DesktopMacIcon",
                children: softwaresDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(softwareArray)
        }

        if (atlEquipDupArray.length !== 0) {
            let atlArray = {
                id: 'atlEqup',
                label: 'Atl Equpment',
                groupIcon: "AssistantIcon",
                children: atlEquipDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(atlArray)
        }

        if (settingDupArray.length !== 0) {
            let settingArray = {
                id: 'setting',
                label: 'Setting',
                groupIcon: "SettingsIcon",
                children: settingDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(settingArray)
        }

        if (transactionDupArray.length !== 0) {
            let transactionArray = {
                id: 'transaction',
                label: 'Transaction',
                groupIcon: "LayersClearSharpIcon",
                children: transactionDupArray.map((item) => {
                    const randomNumber = Math.floor(Math.random() * 22);
                    const id = item.id;
                    const label = item.name;
                    const icon = materialIcon[randomNumber]
                    const navigation = item.url;

                    return {
                        id, label, icon, navigation
                    }
                }),
            }
            finalArray.push(transactionArray)
        }

        finalArray = finalArray.concat(singleItemArray)

        let logoutArray = { id: "logout", label: "Logout", icon: "LogoutIcon", navigation: "logout" };
        finalArray.push(logoutArray);

        return ADMIN_SIDEBAR_LIST = finalArray;
    } else {
        return ADMIN_SIDEBAR_LIST = [];
    }
}

module.exports = { adminNavBarList, noPermissionNavBarList, managemntNavBarList }