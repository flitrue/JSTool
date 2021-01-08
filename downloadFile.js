(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.downloadFile = factory());
}(this, (function () { 'use strict';

  /**
   * @author flitrue
   * @email 812863096@qq.com
   * @create date 2021-01-08 15:10:34
   * @modify date 2021-01-08 15:10:34
   * @desc 下载资源
   */
  const allowSuffix = [".pdf", ".jpg", ".png", ".gif"];

  function downloadFile(src, filename) {
    const _filename = filename ?? src.substr(src.lastIndexOf("/") + 1);
    const lastDotIndex = src.lastIndexOf(".");
    const suffix = src.substr(lastDotIndex);
    if (allowSuffix.includes(suffix)) {
      fullDownload(src, _filename);
    } else {
      simpleDownload(src, _filename);
    }
  }

  function fullDownload(url, filename) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      const blob = new Blob([xhr.response]);
      const URL = window.URL || window.webkitURL;
      const url = URL.createObjectURL(blob);
      simpleDownload(url, filename);
    };
    xhr.onprogress = function(e) {
      // console.log('progress', e.loaded / e.total * 100 + "%")
    };

    xhr.send();
  }

  function simpleDownload(url, filename) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = filename;
    link.click();
  }

  return downloadFile;

})));
