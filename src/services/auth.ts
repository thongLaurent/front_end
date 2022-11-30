import { get, post, put, destroy } from 'config/api';

export const Auth = {
    register: (data) => post('user/register', data),
    verifyReferral: (referralCode) => get(`refer/verify/user?referralCode=${referralCode}`),
    resetPassword: (data) => post('user/forgot/password', data),
    login: (data) => post('login', data)
} 