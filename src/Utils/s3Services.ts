import axios from 'axios';
import { Crypt } from 'hybrid-crypto-js';
const sessionStorageItems = [
  '#id_token',
  'access_token',
  'token_type',
  'refresh_token',
  'expires_in',
  'scope',
  'user_name',
  'user',
];
const skipLogOutForNoToken = ['pms-ql-style/componentStyle.json', 'pms-ql-biomarker-units/allUnitConversions.json'];

function logMeOut() {
  sessionStorageItems.forEach((item) => {
    localStorage.removeItem(item);
  });
  if (window.location.hostname != 'localhost') {
    window.location.href = '/';
  } else {
    console.error('Please enter a valid token');
  }
}

function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    crossorigin: true,
    'Access-Control-Expose-Headers': 'ETag',
  };
}

interface MaskedParam {
  payLoad: string;
}

export class S3Services {
  constructor() {
    console.log("S3 Inside C'Tor ");
  }

  private maskParams = (params: any): MaskedParam => {
    var publicKey = import.meta.env.VITE_PUBLIC_KEY;
    var crypt = new Crypt();
    var encrypted = crypt.encrypt(publicKey, JSON.stringify(params));
    return { payLoad: btoa(encrypted) };
  };

  private respCodeHandler = (responseObject: any) => {
    let statusCode =
      (responseObject && responseObject.status) ||
      (responseObject && responseObject.response && responseObject.response.status) ||
      500;
    let responseCode = 3;
    let respDesc;
    if (statusCode === 200) {
      responseCode = 1;
      respDesc = responseObject.data;
    } else if (statusCode === 404) {
      responseCode = 3;
      respDesc = `${'Application Suite seems to be offline!'}`;
    } else if (statusCode >= 400 && statusCode <= 499) {
      respDesc = `${
        responseObject.response && responseObject.response.data && responseObject.response.data.message
          ? responseObject.response.data.message
          : 'Unauthorized'
      }`;
      responseCode = 2;
      logMeOut();
    } else if (statusCode >= 500) {
      let errorMessage =
        responseObject?.response?.data?.Error ||
        responseObject?.response?.data?.error ||
        responseObject?.response?.data?.Message ||
        'Something went wrong! Please try again later.';
      respDesc = `${errorMessage}`;
      responseCode = 3;
    } else {
      responseCode = 3;
      respDesc = `${'Something went wrong! Please try again later.'}`;
    }
    return { respCode: responseCode, data: respDesc };
  };

  public getObject = async (keyName: string, bucketName: string | undefined, payload: any, defaultVal?: any) => {
    const token = (payload && payload.token) || sessionStorage.getItem('#id_token');
    if (!token || !token.trim()) {
      console.error(`Token not found for ${keyName}`);
      if (skipLogOutForNoToken.indexOf(keyName) == -1) {
        logMeOut();
      }
      return defaultVal || {};
    }
    const params = {
      BucketName: bucketName,
      KeyName: keyName,
      Locale: payload.Locale,
      TenantId: payload.TenantId,
    };
    const url = payload && payload.url;
    const reqHeaders = (payload && payload.headers) || {};
    let headers = getHeaders(token);
    headers = { ...headers, ...reqHeaders };
    try {
      const axiosObj: any = axios.create({
        baseURL: url,
        headers,
      });
      const response = await axiosObj.post('', this.maskParams(params));
      return response.data;
    } catch (ex) {
      console.error('Exception in getObject: ', ex);
      this.respCodeHandler(ex);
      return defaultVal || {};
    }
  };

  private types = {
    get: function (prop) {
      return Object.prototype.toString.call(prop);
    },
    null: '[object Null]',
    object: '[object Object]',
    array: '[object Array]',
    string: '[object String]',
    boolean: '[object Boolean]',
    number: '[object Number]',
    date: '[object Date]',
  };

  public decryptData = async (data: any) => {
    let ciphertext = this.types.get(data) === this.types.object ? JSON.stringify(data) : data;
    var CryptoJS = require('crypto-js');
    // var ciphertext = CryptoJS.AES.encrypt(data, import.meta.env.VITE_HASH_KEY).toString();
    // console.log("Encrypted ", ciphertext); // 'my message'
    var bytes = CryptoJS.AES.decrypt(ciphertext, import.meta.env.VITE_HASH_KEY);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //console.log("Decrypted ", originalText); // 'my message'
    let response = this.types.get(data) === this.types.object ? JSON.parse(originalText) : originalText;
    return response;
  };

  public makeClickToCall = async (loggedInUserMobileNumber: string, customerMobileNumber: string) => {
    try {
      let headers = {
        'x-api-key': import.meta.env.VITE_KNOWLARITY_CLICK2CALL_API_KEY,
        authorization: import.meta.env.VITE_KNOWLARITY_CLICK2CALL_API_AUTHORIZATION,
      };
      const axiosObj: any = axios.create({
        baseURL: import.meta.env.VITE_KNOWLARITY_CLICK2CALL_URL,
        headers: headers,
      });
      const response = await axiosObj['post']('', {
        k_number: import.meta.env.VITE_KNOWLARITY_CLICK2CALL_SR_NUMBER,
        agent_number: loggedInUserMobileNumber ?? '+919600000191',
        customer_number: customerMobileNumber ?? '+919884855746',
        caller_id: import.meta.env.VITE_KNOWLARITY_CLICK2CALL_CALLER_ID ?? '+911142392500',
      });
      return response.data;
    } catch (ex) {
      console.error('Exception in makeClickToCall: ', ex);
      return { Error: 'Exception in makeClickToCall' };
    }
  };

  public postData = async (payload: any) => {
    const token = payload.token;
    if (!token || !token.trim()) {
      console.error('token not found');
      logMeOut();
      return;
    }
    payload = { ...payload, IDToken: token };
    const url = payload.url;
    const method = (payload.method || 'POST').toLowerCase();
    const reqHeaders = (payload && payload.headers) || {};
    let headers = getHeaders(token);
    headers = { ...headers, ...reqHeaders };
    try {
      const axiosObj: any = axios.create({
        baseURL: url,
        headers,
      });
      delete payload.url;
      delete payload.token;
      delete payload.method;
      delete payload.headers;
      const response = await axiosObj[method]('', this.maskParams(payload));
      return response.data;
    } catch (ex) {
      console.error('Exception in postData: ', ex);
      return { Error: this.respCodeHandler(ex) };
    }
  };

  public listS3Files = async (keyName: string, bucketName: string, payload: any, defaultVal?: any) => {
    const token = payload && payload.token;
    if (!token || !token.trim()) {
      console.error(`Token not found for ${keyName}`);
      if (skipLogOutForNoToken.indexOf(keyName) == -1) {
        logMeOut();
      }
      return defaultVal || {};
    }
    const params = {
      BucketName: bucketName,
      KeyName: keyName,
      TenantId: payload.TenantId,
      Locale: payload.Locale,
    };
    const url = payload && payload.url;
    const reqHeaders = (payload && payload.headers) || {};
    let headers = getHeaders(token);
    headers = { ...headers, ...reqHeaders };
    try {
      const axiosObj: any = axios.create({
        baseURL: url,
        headers,
      });
      const response = await axiosObj.post('', this.maskParams(params));
      return response.data;
    } catch (ex) {
      console.error('Exception in GettingIrFiles: ', ex);
      this.respCodeHandler(ex);
      return defaultVal || {};
    }
  };

  public previewObject = async (payload: any) => {
    const token = payload && payload.token;
    if (!token || !token.trim()) {
      return {};
    }

    let url = payload && payload.url;
    const reqHeaders = (payload && payload.headers) || {};
    let headers = getHeaders(token);
    headers = { ...headers, ...reqHeaders };
    try {
      const axiosObj: any = axios.create({
        baseURL: url,
        headers,
        responseType: 'blob',
      });
      const response = await axiosObj.get('', '');
      if (response.data && response.data.message == 'Unauthorized') {
        localStorage.removeItem('UserLoggedIn');
        logMeOut();
        return {};
      }
      const object = response.data;
      var fileName = payload.fileName ? payload.fileName : payload.url.substr(payload.url.lastIndexOf('/') + 1);
      let type = fileName.split('.').pop().toLowerCase();
      let header = payload.type || 'application/pdf';
      if (type === 'jpg' || type === 'jpeg') {
        header = 'image/jpeg';
      } else if (type === 'png') {
        header = 'image/png';
      } else if (type === 'xps' || payload.isDownloadRequired) {
        let urlLink = window.URL.createObjectURL(
          new Blob([object], {
            type: type === 'xps' ? 'application/oxps' : header,
          })
        );
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = urlLink;
        link.setAttribute('download', '' + fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        return {};
      }
      var myURL = window.URL || window.webkitURL;
      let objectUrlReview = myURL.createObjectURL(new Blob([object], { type: header }));
      if (payload.dontPreview) {
        return objectUrlReview;
      }
      if (payload.isDownloadRequired) {
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectUrlReview;
        link.setAttribute('download', '' + fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        return {};
      }
      window.open(objectUrlReview, '_blank');
    } catch (ex) {
      console.error('Exception in getObject: ', ex);
      return Promise.reject({ Error: this.respCodeHandler(ex) });
    }
    return {};
  };

  public encryptData = (payload: any): MaskedParam => {
    return this.maskParams(payload);
  };

  // refreshToken = () => {
  //   const refreshToken = sessionStorage.getItem("refresh_token");
  //   let userInfo = sessionStorage.getItem('user');
  //   const userProfile = JSON.parse(userInfo!);
  //   const userId = userProfile ? userProfile.id : ''
  //   const tokenRefreshUrl = import.meta.env.VITE_USER_REFRESH_TOKEN_API
  //   if (userId && refreshToken) {
  //     const payloadObject = {
  //       UserId: userId, RefreshToken: refreshToken
  //     }
  //     const axiosRefreshObj: any = axios.create({
  //       baseURL: tokenRefreshUrl,
  //     });
  //     const response = axiosRefreshObj['post']("", this.maskParams(payloadObject));
  //     sessionStorage.removeItem("#id_token");
  //     sessionStorage.setItem("#id_token", response.data.IdToken);
  //   }
  // }
}
