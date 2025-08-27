import classNames from "classnames";
import { jwtDecode } from "jwt-decode";
import { errorNotify, successNotify } from "./notify";

export const cx = classNames;

export const getStatusColor = (status) => {
    switch (status) {
        case 'need-docs':
        case 'declined':
            return 'text-status-error';
        case 'approved':
            return 'text-status-success';
        case 'solved':
            return 'text-status-success';
        case 'pending':
            return 'text-status-info';
        case 'Blocked':
            return 'text-status-error';
        case 'Active':
            return 'text-status-success';
        default:
            return '';
    }
}

export const handleFileChange = (event, setFile, setPreview) => {
    const file = event.target.files[0];

    // preview setup
    if (file && setPreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    // file setup
    if (file && setFile) {
        setFile(file);
    }
};

// Email validation function
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// copy handler
export const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        successNotify('Copied to clipboard');
    }).catch(err => {
        errorNotify('Failed to copy text: ', err);
    });
};

// Format Unix timestamp to DD/MM/YYYY or 29 Nov, 2023 based on type
export const formatUnixToDate = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format('MMM DD, YYYY');
};

// Format status string to capitalize each word
export const formatStatusStr = (str) => {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// utils.js
export const generateRandomId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
};

// filter data by range [today, this-month, this-year]
export const filterDataByRange = (data, filterRange, objProperty = 'createdAt') => {
    const now = moment();
    return data.filter(item => {
        const createdAt = moment.unix(item[objProperty]); // Assuming createdAt is in seconds
        switch (filterRange.value) {
            case 'today':
                return createdAt.isSame(now, 'day');
            case 'this-month':
                return createdAt.isSame(now, 'month') && createdAt.isSame(now, 'year');
            case 'this-year':
                return createdAt.isSame(now, 'year');
            default:
                return true;
        }
    });
};

// set & get  & remove local storage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}

// check if token is valid
export const isTokenValid = (accessToken) => {
    const decoded = jwtDecode(accessToken);
    const currentTimestamp = moment().unix();
    return decoded.exp > currentTimestamp;
};

export const createQueryString = (params) => {
    // Filter out any parameters that are undefined
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== undefined)
    );

    // Generate query string from filtered parameters
    return new URLSearchParams(filteredParams).toString();
}