import { AxiosRequestConfig } from "axios";

export const AxiosOptions: AxiosRequestConfig = {
    headers: {
        Authorization: 'Bearer ' + document.cookie.split('; ').filter(row => row.startsWith('JwtToken')).map(c => c.split('=')[1])[0]
    }
};