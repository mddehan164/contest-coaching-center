import { AnalyticsPath, DashboardPath, GameTypesPath, PreviousWinnersPath, RolesEnum, SellersPath, SettingsPath, TodaySalePath, UserPath, } from "./enums";
import {
    AnalyticsSvg, CoinSvg, DashboardSvg, FacebookSvg, GameTypeSvg, GroupUserSvg, InstagramSvg, LinkedinSvg, SellersSvg, SettingsSvg, SpeedMeterSvg, TodaySaleSvg, TrophySvg, TwitterSvg, UserSvg
} from "./svgs";

// dashboard sidebar menu items
export const sidebarItems = [
    {
        to: DashboardPath.path,
        text: DashboardPath.title,
        icon: <DashboardSvg />,
        activePath: "dashboard",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MODERATOR],
    },
    {
        to: TodaySalePath.path,
        text: TodaySalePath.title,
        icon: <TodaySaleSvg />,
        activePath: "todaySale",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MODERATOR],
    },
    {
        to: PreviousWinnersPath.path,
        text: PreviousWinnersPath.title,
        icon: <TrophySvg />,
        activePath: "trophy",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MODERATOR],
    },
    {
        to: SellersPath.path,
        text: SellersPath.title,
        icon: <SellersSvg />,
        activePath: "sellers",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MODERATOR],
    },
    {
        to: GameTypesPath.path,
        text: GameTypesPath.title,
        icon: <GameTypeSvg />,
        activePath: "gameType",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MODERATOR],
    },
    {
        to: AnalyticsPath.path,
        text: AnalyticsPath.title,
        icon: <AnalyticsSvg />,
        activePath: "analytics",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN],
    },
    {
        to: UserPath.path,
        text: UserPath.title,
        icon: <UserSvg />,
        activePath: "user",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN],
    },

    // settings
    {
        to: SettingsPath.path,
        text: SettingsPath.title,
        icon: <SettingsSvg />,
        activePath: "settings",
        roles: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.MODERATOR],
    },
];

export const footerLinks = [
    {
        name: 'LinkedIn',
        icon: <LinkedinSvg cls="w-4 h-4 md:w-6 md:h-6" />,
        path: '#'
    },
    {
        name: 'Twitter',
        icon: <TwitterSvg cls="w-4 h-4 md:w-6 md:h-6" />,
        path: '#'
    },
    {
        name: 'Instagram',
        icon: <InstagramSvg cls="w-4 h-4 md:w-6 md:h-6" />,
        path: '#'
    },
    {
        name: 'Facebook',
        icon: <FacebookSvg cls="w-4 h-4 md:w-6 md:h-6" />,
        path: '#'
    },
];

export const settingsOptions = [
    {
        _id: 1,
        label: 'Email',
        value: 'alex.andrew@example.com',
        buttonText: 'Change Email'
    },
    {
        _id: 2,
        label: 'Password',
        buttonText: 'Change Password'
    },
    {
        _id: 3,
        label: 'Logout',
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        buttonText: 'Logout',
        buttonCss: '!bg-status-error hover:!bg-status-error/80'
    }
];

export const roleOptions = [
    { value: RolesEnum.SUPER_ADMIN, label: 'Super Admin' },
    { value: RolesEnum.ADMIN, label: 'Admin' },
    { value: RolesEnum.MODERATOR, label: 'Moderator' },
];

export const dashboardCardData = [
    {
        _id: 1,
        value: 2000000,
        suffiex: 'AED',
        title: 'Total Sales',
        icon: <SpeedMeterSvg />,
        bgCls: 'bg-main-200',
        iconBg: 'bg-main-500',
    },
    {
        _id: 2,
        value: 1000000,
        suffiex: 'AED',
        title: 'Prize Given',
        icon: <CoinSvg />,
        bgCls: 'bg-[#CEF7E5]',
        iconBg: 'bg-[#00E280]',
    },
    {
        _id: 3,
        value: 66225,
        suffiex: '',
        title: 'Sellers',
        icon: <GroupUserSvg />,
        bgCls: 'bg-[#F9EFDC]',
        iconBg: 'bg-[#FFCE67]',
    },
    {
        _id: 4,
        value: 148550,
        suffiex: '',
        title: 'Ticket Sold',
        icon: <SpeedMeterSvg />,
        bgCls: 'bg-[#E9E2FF]',
        iconBg: 'bg-[#A487FF]',
    },
];

export const durationOptions = [
    { _id: 1, value: 'today', label: 'Today' },
    { _id: 1, value: 'this-month', label: 'This Month' },
    { _id: 1, value: 'this-year', label: 'This Year' },
];

export const gameNameOptions = [
    { _id: 111, label: 'All', value: '' },
    { _id: 1, label: 'Lucky 7', value: 'lucky-7' },
    { _id: 2, label: 'Super 6', value: 'super-6' },
    { _id: 3, label: 'Fantasy 5', value: 'fantasy-5' },
    { _id: 4, label: 'King 4', value: 'king-4' },
    { _id: 5, label: 'Pick 3', value: 'pick-3' },
    { _id: 6, label: 'Pick 1', value: 'pick-1' },
];

export const todaySaleTabs = [
    { label: 'Sales', value: 'sales' },
    { label: `Draw Result`, value: 'todays-draw' },
];

export const sellerDetailCardData = [
    {
        _id: 1,
        value: 20000,
        suffiex: 'AED',
        title: 'Total Sales',
        icon: <CoinSvg />,
        bgCls: 'bg-main-200',
        iconBg: 'bg-main-500',
    },
    {
        _id: 2,
        value: 148550,
        suffiex: '',
        title: 'Sold Tickets',
        icon: <SpeedMeterSvg />,
        bgCls: 'bg-[#F9EFDC]',
        iconBg: 'bg-[#FFCE67]',
    },
    {
        _id: 3,
        value: 5000,
        suffiex: 'AED',
        title: 'Prize Given',
        icon: <CoinSvg />,
        bgCls: 'bg-[#CEF7E5]',
        iconBg: 'bg-[#00E280]',
    },

    {
        _id: 4,
        value: 5000,
        suffiex: 'AED',
        title: 'Due',
        icon: <SpeedMeterSvg />,
        bgCls: 'bg-[#E9E2FF]',
        iconBg: 'bg-[#A487FF]',
    },
];