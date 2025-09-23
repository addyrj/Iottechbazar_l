import React, { useEffect } from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { unstable_useTreeItem2 as useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import "../Constants/MateiralImage"
import toast from "react-hot-toast";
import Stack from '@mui/material/Stack';
import styledComp from 'styled-components';
import {
    TreeItem2Checkbox,
    TreeItem2Content,
    TreeItem2IconContainer,
    TreeItem2Label,
    TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FolderRounded, GroupsIcon, PieChartIcon, RateReviewIcon, SpaceDashboardIcon, AdjustIcon, AccountBalanceIcon,
    AcUnitIcon, AdsClickIcon, AnimationIcon, AppsOutageIcon, AssessmentIcon, AssistantIcon, AutoAwesomeMosaicIcon,
    AutoAwesomeMotionIcon, AutoGraphIcon, BatchPredictionIcon, BeenhereIcon, CompressIcon, DesktopMacIcon,
    SettingsIcon, LogoutIcon, HubIcon, ShoppingBagIcon, LayersClearSharpIcon, HubSharpIcon
} from "../Constants/MateiralImage";
import { getNavSideBarList } from '../../../Database/Action/AdminAction';

function DotIcon() {
    return (
        <Box
            sx={{
                width: 6,
                height: 6,
                borderRadius: '70%',
                bgcolor: 'warning.main',
                display: 'inline-block',
                verticalAlign: 'middle',
                zIndex: 1,
                mx: 1,
            }}
        />
    );
}

const getAllItemsWithChildrenItemIds = (navbarList) => {
    const itemIds = [];
    const registerItemId = (item) => {
        if (item.children?.length) {
            itemIds.push(item.id);
            item.children.forEach(registerItemId);
        }
    };

    navbarList.forEach(registerItemId);

    return itemIds;
};

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
    color:
        theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[400],
    position: 'relative',
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: theme.spacing(3.5),
    },
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
    flexDirection: 'row-reverse',
    borderRadius: theme.spacing(0.7),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    fontWeight: 500,
    [`&.Mui-expanded `]: {
        '&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.primary.dark,
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            left: '16px',
            top: '44px',
            height: 'calc(100% - 48px)',
            width: '1.5px',
            backgroundColor:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[300]
                    : theme.palette.grey[700],
        },
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.mode === 'light' ? theme.palette.primary.main : 'white',
    },
    [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
        backgroundColor:
            theme.palette.mode === 'light'
                ? theme.palette.primary.main
                : theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
        },
    });

    return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)({
    color: 'inherit',
    fontFamily: 'Bona Nova SC',
    fontWeight: 500,
});

function CustomLabel({ icon: Icon, expandable, children, ...other }) {
    return (
        <TreeItem2Label
            {...other}
            sx={{
                display: 'flex',
                alignItems: 'center',
                color: "white",
                paddingY: "5px"
            }}
        >
            {Icon && (
                <Box
                    component={Icon}
                    className="labelIcon"
                    color="inherit"
                    sx={{ mr: 1, fontSize: '1.2rem' }}
                />
            )}

            <StyledTreeItemLabelText variant="body2">{children}</StyledTreeItemLabelText>
            {expandable && <DotIcon />}
        </TreeItem2Label>
    );
}

const isExpandable = (reactChildren) => {
    if (Array.isArray(reactChildren)) {
        return reactChildren.length > 0 && reactChildren.some(isExpandable);
    }
    return Boolean(reactChildren);
};

const getIconFromFileType = (fileType) => {
    switch (fileType) {
        case 'SpaceDashboardIcon':
            return SpaceDashboardIcon;
        case 'HubIcon':
            return HubIcon;
        case 'GroupsIcon':
            return GroupsIcon;
        case 'PieChartIcon':
            return PieChartIcon;
        case 'folder':
            return FolderRounded;
        case 'AutoGraphIcon':
            return AutoGraphIcon;
        case 'AutoAwesomeMotionIcon':
            return AutoAwesomeMotionIcon;
        case 'DesktopMacIcon':
            return DesktopMacIcon;
        case 'AssistantIcon':
            return AssistantIcon;
        case 'SettingsIcon':
            return SettingsIcon;
        case 'AccountBalanceIcon':
            return AccountBalanceIcon;
        case 'AdjustIcon':
            return AdjustIcon;
        case 'RateReviewIcon':
            return RateReviewIcon;
        case 'ShoppingBagIcon':
            return ShoppingBagIcon;
        case 'FolderRounded':
            return FolderRounded;
        case 'AcUnitIcon':
            return AcUnitIcon;
        case 'AdsClickIcon':
            return AdsClickIcon;
        case 'AnimationIcon':
            return AnimationIcon;
        case 'AppsOutageIcon':
            return AppsOutageIcon;
        case 'AssessmentIcon':
            return AssessmentIcon;
        case 'AutoAwesomeMosaicIcon':
            return AutoAwesomeMosaicIcon;
        case 'BatchPredictionIcon':
            return BatchPredictionIcon;
        case 'BeenhereIcon':
            return BeenhereIcon;
        case 'CompressIcon':
            return CompressIcon;
        case 'HubSharpIcon':
            return HubSharpIcon;
        case 'LayersClearSharpIcon':
            return LayersClearSharpIcon;
        case 'LogoutIcon':
            return LogoutIcon;
        case "SettingsIcon":
            return SettingsIcon;
        default:
            return FolderRounded;
    }
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
    const { id, itemId, label, disabled, children, ...other } = props;

    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getCheckboxProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
        publicAPI,
    } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

    const item = publicAPI.getItem(itemId);
    const expandable = isExpandable(children);
    let icon;
    if (expandable) {
        icon = getIconFromFileType(item.groupIcon);
    } else if (item.icon) {
        icon = getIconFromFileType(item.icon)
    }

    return (
        <TreeItem2Provider itemId={itemId}>
            <StyledTreeItemRoot {...getRootProps(other)}>
                <CustomTreeItemContent
                    {...getContentProps({
                        className: clsx('content', {
                            'Mui-expanded': status.expanded,
                            'Mui-selected': status.selected,
                            'Mui-focused': status.focused,
                            'Mui-disabled': status.disabled,
                        }),
                    })}
                >
                    <TreeItem2IconContainer {...getIconContainerProps()}>
                        <TreeItem2Icon status={status} />
                    </TreeItem2IconContainer>
                    <TreeItem2Checkbox {...getCheckboxProps()} />
                    <CustomLabel
                        {...getLabelProps({ icon, expandable: expandable && status.expanded })}
                    />
                </CustomTreeItemContent>
                {children && <TransitionComponent {...getGroupTransitionProps()} />}
            </StyledTreeItemRoot>
        </TreeItem2Provider>
    );
});

const CustomNavSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const apiRef = useTreeViewApiRef();
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [expandedItems, setExpandedItems] = React.useState([]);
    const navbarList = useSelector((state) => state.AdminReducer.navbarList);

    useEffect(() => {
        dispatch(getNavSideBarList({ navigate: navigate }))
        // if (expandedItems.length === 0) {
        //     navigate("/admin_dashboard");
        // }
    }, [dispatch])

    const handleSelectedItemsChange = (event, itemId) => {
        if (itemId == null) {
            setSelectedItem(null);
        } else {
            setSelectedItem(apiRef.current.getItem(itemId));
            if (apiRef.current.getItem(itemId).navigation === "logout") {
                localStorage.removeItem("iottechAdminToken");
                navigate("/admin_login");
                toast.success("Logout successfull");
            } else {
                navigate(apiRef.current.getItem(itemId).navigation)
            }
        }
    };

    const handleExpandedItemsChange = (event, itemIds) => {
        setExpandedItems(itemIds);
    };

    const handleExpandClick = () => {
        setExpandedItems((oldExpanded) =>
            oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds(navbarList) : [],
        );
    };
    return (
        <Wrapper>
            <Stack spacing={2}>
                <p onClick={handleExpandClick} style={{
                    color: "white", fontWeight: 500,
                    marginLeft: "15px", marginTop: "10px", cursor: "pointer"
                }}>
                    {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
                </p>
                <Box sx={{ marginTop: "5px" }}>
                    <RichTreeView
                        items={navbarList}
                        defaultExpandedItems={['1']}
                        apiRef={apiRef}
                        defaultSelectedItems="1"
                        sx={{ height: 'fit-content', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                        slots={{ item: CustomTreeItem }}
                        selectedItems={selectedItem?.id ?? null}
                        onSelectedItemsChange={handleSelectedItemsChange}
                        expandedItems={expandedItems}
                        onExpandedItemsChange={handleExpandedItemsChange}
                    />
                </Box>
            </Stack>
        </Wrapper>
    )
}

const Wrapper = styledComp.section`
.css-19d0qwr-MuiTreeItem2-iconContainer svg {
    font-size: 18px;
    color : white
}
`;

export default CustomNavSidebar
