import {API_URL} from '../config/api';
import axios from 'axios';
let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

// To get logged in user token
const getLoggedInuserToken = () => {
    let accessToken = localStorage.getItem('access_token');
    // userData = JSON.parse(userData);
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
        return headers;
    } else {
        return headers;
    }
}

const axiosMethodRequest = (method, url, body, type) => {
    if (url === 'auth/login') {
        return sendRequestToServer(method, url, body, headers);
    } else {
        let headers = getLoggedInuserToken();
        // upload method conditions, headers
        if (type && type == 'upload') {
            let formData = new FormData();
            if (body && body.length && body.length > 0) {
                body.forEach(element => {
                    formData.append('file', element);
                });
            } else if (body) {
                formData.append('file', body);
            }
            if (headers.logggedInUserData) {
                delete headers.logggedInUserData;
            }
            body = {
                isUploadingImage: true,
                imageInfo: formData,
            }
        }
        return sendRequestToServer(method, url, body, headers)
    }
}

const sendRequestToServer = (method, url, body, headers) => {
    let reqHeaders = { ...headers };
    if (reqHeaders && reqHeaders.logggedInUserData) {
        delete reqHeaders.logggedInUserData;
        delete reqHeaders.accept
    }
    let isImageReqSent = false;
    let request;
    if (body && body.isUploadingImage) { // only for image upload
        isImageReqSent = true;
        if (method == 'POST') {
            let modifiedHeaders = {
                'Accept': '*/*',
                'Authorization': `${reqHeaders.Authorization}`,
            }
            return request = axios.post(`${API_URL}${url}`, body.imageInfo, {
                headers: modifiedHeaders,
            })
        }
    }
    if (!isImageReqSent) { // send request for call except image upload 
        if (method === 'DELETE') {
            request = axios.delete(`${API_URL}${url}`, {
                headers: reqHeaders,
            })
            return request
        } else if (method === 'GET') {
            request = axios.get(`${API_URL}${url}`, {
                headers: reqHeaders,
            })
            let modifiedRequest = request
            modifiedRequest.then((res) => {
                if (res && res.data && res.data.errorCode && res.data.errorMessage && res.data.errorMessage == "Session expired please login again.") {
                    localStorage.setItem('sessionExpired',true)
                }
            })
            return request
        }
        else if (method === 'PUT') {
            request = axios.put(`${API_URL}${url}`, body, {
                headers: reqHeaders,
            })
            return request
        } else if (method === 'POST') {
            request = axios.post(`${API_URL}${url}`, body, {
                headers: reqHeaders,
            })
            return request
        }
    }
}
export default axiosMethodRequest;
