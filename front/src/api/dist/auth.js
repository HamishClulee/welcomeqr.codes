"use strict";
exports.__esModule = true;
exports.QAuth = exports.ErrStr = void 0;
var axios_1 = require("axios");
var EventBus_1 = require("../EventBus");
exports.ErrStr = function (error) {
    if (error.response && error.response.data.status) {
        return error.response.data.status;
    }
    return 'Something went wrong - please try again.';
};
var QAuth = /** @class */ (function () {
    function QAuth() {
        var _this = this;
        this.DEV_SERV = 'http://localhost:1980';
        this.DEV_CLIENT = 'http://localhost:8080';
        this.PROD_BASE = 'https://welcomeqr.codes';
        this.BASE_URL = process.env.NODE_ENV === 'development' ? this.DEV_SERV + "/auth" : this.PROD_BASE + "/auth";
        this.AUTH_URL = process.env.NODE_ENV === 'development' ? this.DEV_CLIENT + "/?redirect=true" : this.PROD_BASE + "/?redirect=true";
        this.ax = axios_1["default"].create({
            baseURL: this.BASE_URL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('QToken')
            }
        });
        this.ax.interceptors.response.use(function (res) { return res; }, function (error) {
            if (error.response && error.response.data.userError) {
                EventBus_1.EventBus.$emit(EventBus_1.SERVER_AUTH_ERROR_MESSAGE, error.response.data.userError);
            }
            if (error.response
                && error.response.status > 400
                && error.response.data.intercept) {
                window.location.href = _this.AUTH_URL;
                EventBus_1.EventBus.$emit(EventBus_1.LOADING, false);
            }
            _this.removetoken();
            return Promise.reject(error);
        });
    }
    QAuth.prototype.settoken = function (token) {
        localStorage.setItem('QToken', token);
    };
    QAuth.prototype.removetoken = function () {
        localStorage.removeItem('QToken');
    };
    QAuth.prototype.checktoken = function () {
        return !!localStorage.getItem('QToken') && localStorage.getItem('QToken') !== '';
    };
    QAuth.prototype.authenticate = function (intercept) {
        if (intercept === void 0) { intercept = true; }
        return this.ax.post('/session_challenge', { intercept: intercept });
    };
    QAuth.prototype.usersettings = function (intercept) {
        if (intercept === void 0) { intercept = true; }
        return this.ax.post('/user_settings', { intercept: intercept });
    };
    QAuth.prototype.togglesubscribe = function (subscribe) {
        return this.ax.post('/toggle_subscribe', { subscribe: subscribe });
    };
    QAuth.prototype.logout = function () {
        return this.ax.post('/logout');
    };
    QAuth.prototype.signup = function (email, password, confirm, intercept) {
        if (intercept === void 0) { intercept = false; }
        return this.ax.post('/signup', { email: email, password: password, confirm: confirm, intercept: intercept });
    };
    QAuth.prototype.login = function (email, password, intercept) {
        if (intercept === void 0) { intercept = false; }
        return this.ax.post('/login', { email: email, password: password, intercept: intercept });
    };
    QAuth.prototype.forgot = function (email) {
        return this.ax.post('/forgot', { email: email, intercept: false });
    };
    QAuth.prototype.reset = function (token, password, confirm) {
        return this.ax.post('/reset', { token: token, password: password, confirm: confirm });
    };
    QAuth.prototype.verifyemail = function (token) {
        return this.ax.post('/verify_email', { token: token });
    };
    QAuth.prototype.contact = function (email, name, message, selectval) {
        return this.ax.post('/contact', { email: email, name: name, message: message, selectval: selectval });
    };
    return QAuth;
}());
exports.QAuth = QAuth;
