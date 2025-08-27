export const LoginPath = Object.freeze({
    path: '/login',
    title: 'Login',
});

export const ForgetPasswordPath = Object.freeze({
    path: '/forget-password',
    title: 'Forget Password',
});

export const DashboardPath = Object.freeze({
    path: '/',
    title: 'Dashboard',
});

export const SettingsPath = Object.freeze({
    path: '/settings',
    title: 'Settings',
});

export const ViewStrategyPath = Object.freeze({
    path: '/view-strategy',
    title: 'View Strategy',
});

export const TodaySalePath = Object.freeze({
    path: '/today-sale',
    title: 'Today Sale',
});

export const PreviousWinnersPath = Object.freeze({
    path: '/previous-winners',
    title: 'Previous Winners',
});

export const SellersPath = Object.freeze({
    path: '/sellers',
    title: 'Sellers',
});

export const SellerDetailsPath = Object.freeze({
    path: '/seller-details/:sellerId',
    subPath: '/seller-details/',
    title: 'Sellers Details',
});

export const GameTypesPath = Object.freeze({
    path: '/game-types',
    title: 'Game Types',
});

export const AnalyticsPath = Object.freeze({
    path: '/analytics',
    title: 'Analytics',
});

export const UserPath = Object.freeze({
    path: '/user-roles',
    title: 'User Roles',
});

// others
export const LocalStorageKeyEnum = Object.freeze({
    AUTH: 'quickdraw-auth',
});

export const SelectedSliceTypeEnum = Object.freeze({
    VIEW: 'view',
    UPDATE: 'update',
    DELETE: 'delete',
    ADD: 'add',
});

export const RolesEnum = Object.freeze({
    ADMIN: 'admin',
    SUPER_ADMIN: 'super-admin',
    MODERATOR: 'moderator',
});