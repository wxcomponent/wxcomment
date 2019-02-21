"use strict";
/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/// <reference path="../typing/app.d.ts" />
/// <reference path="../typing/behavior.d.ts" />
/// <reference path="../typing/component.d.ts" />
/// <reference path="../typing/page.d.ts" />
/// <reference path="../typing/wx.d.ts" />
require("./polyfill");
var PROMISABLE = {"FUNCS":["request","uploadFile","downloadFile","connectSocket","sendSocketMessage","closeSocket","chooseImage","previewImage","getImageInfo","saveImageToPhotosAlbum","startRecord","playVoice","getBackgroundAudioPlayerState","playBackgroundAudio","seekBackgroundAudio","getAvailableAudioSources","chooseVideo","saveVideoToPhotosAlbum","loadFontFace","saveFile","getSavedFileList","getSavedFileInfo","removeSavedFile","openDocument","getFileInfo","setStorage","getStorage","getStorageInfo","removeStorage","getLocation","chooseLocation","openLocation","getSystemInfo","getNetworkType","setScreenBrightness","getScreenBrightness","vibrateLong","vibrateShort","startAccelerometer","stopAccelerometer","startCompass","stopCompass","makePhoneCall","scanCode","setClipboardData","getClipboardData","openBluetoothAdapter","closeBluetoothAdapter","getBluetoothAdapterState","startBluetoothDevicesDiscovery","stopBluetoothDevicesDiscovery","getBluetoothDevices","getConnectedBluetoothDevices","createBLEConnection","closeBLEConnection","getBLEDeviceServices","getBLEDeviceCharacteristics","readBLECharacteristicValue","writeBLECharacteristicValue","notifyBLECharacteristicValueChange","startBeaconDiscovery","stopBeaconDiscovery","getBeacons","setKeepScreenOn","addPhoneContact","getHCEState","startHCE","stopHCE","sendHCEMessage","startWifi","stopWifi","connectWifi","getWifiList","setWifiList","getConnectedWifi","showToast","showLoading","showModal","showActionSheet","setNavigationBarTitle","setNavigationBarColor","setTabBarBadge","removeTabBarBadge","showTabBarRedDot","hideTabBarRedDot","setTabBarStyle","setTabBarItem","showTabBar","hideTabBar","setTopBarText","navigateTo","redirectTo","reLaunch","switchTab","startPullDownRefresh","getExtConfig","login","checkSession","authorize","getUserInfo","requestPayment","showShareMenu","hideShareMenu","updateShareMenu","getShareInfo","chooseAddress","addCard","openCard","openSetting","getSetting","getWeRunData","navigateToMiniProgram","navigateBackMiniProgram","chooseInvoiceTitle","checkIsSupportSoterAuthentication","startSoterAuthentication","checkIsSoterEnrolledInDevice","setEnableDebug"],"KLASS":{"SocketTask":["connectSocket","send","close"]}};
var wxp = {};
Object.getOwnPropertyNames(wx).forEach(function (key) {
    var desc = Object.getOwnPropertyDescriptor(wx, key);
    if (desc) {
        if (PROMISABLE.FUNCS.indexOf(key) >= 0) {
            Object.defineProperty(wxp, key, {
                configurable: desc.configurable,
                enumerable: desc.enumerable,
                get: function () {
                    // @ts-ignore
                    return wxpromisify(wx[key], wx);
                }
            });
        }
        else {
            Object.defineProperty(wxp, key, desc);
        }
    }
});
function wxpromisify(func, context, callbackIndex) {
    if (callbackIndex === void 0) { callbackIndex = 0; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var _a = (args[callbackIndex] || {}), success = _a.success, fail = _a.fail, complete = _a.complete, arg = tslib_1.__rest(_a, ["success", "fail", "complete"]);
            args[callbackIndex] = tslib_1.__assign({}, arg, { success: function (res) {
                    resolve(res);
                    if (success)
                        success(res);
                }, fail: function (err) {
                    reject(err);
                    if (fail)
                        fail(err);
                }, complete: complete });
            func.call.apply(func, [context].concat(args));
        });
    };
}
exports.default = wxp;
