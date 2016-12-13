;(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var currentScript = document.currentScript || (function() {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();
        var data = {};
        for (var i = 0; i < currentScript.attributes.length; i++) {
            var item = currentScript.attributes[i];
            if (item.nodeName.indexOf('data-') === 0) {
                data[item.nodeName.split('-').slice(-1)[0]] = item.value;
            }
        }
        root.OutdatedBrowser = factory();
        new root.OutdatedBrowser(data);
    }
}(this, function() {
    'use strict';

    function OutdatedBrowser(data) {
        this.browser = {};
        this.classname = data.classname || 'outdated-browser-notice';
        this.html = data.html || 'You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/?locale=en" target="_blank">upgrade your browser</a> to improve your experience.';
        this.parent = data.parent ? document.querySelector(data.parent) : document.body;
        this.browsers = data.browsers ? data.browsers.split(',') : [];
        this.setBrowser();
        this.toggleNotice();
    }

    OutdatedBrowser.prototype.setBrowser = function() {
        // Opera 8.0+
        this.browser.Opera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        this.browser.Firefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        this.browser.Safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || safari.pushNotification);

        // Internet Explorer 6-11
        this.browser.IE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        this.browser.Edge = !this.browser.IE && !!window.StyleMedia;

        // Chrome 1+
        this.browser.Chrome = !!window.chrome && !!window.chrome.webstore;

        // Blink engine detection
        this.browser.Blink = (this.browser.Chrome || this.browser.Opera) && !!window.CSS;
    };

    OutdatedBrowser.prototype.checkVersion = function(version) {
        var userAgent = navigator.userAgent;
        var tem;
        var match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(match[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            return version === (parseInt(tem[1]) || '');
        }
        if (match[1] === 'Chrome') {
            tem = userAgent.match(/\bOPR|Edge\/(\d+)/);
            if (tem != null){
                return version === parseInt(tem[1]);
            }
        }
        match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = userAgent.match(/version\/(\d+)/i)) != null) {
            match.splice(1, 1, tem[1]);
        }
        return version === parseInt(match[1]);
    };

    OutdatedBrowser.prototype.toggleNotice = function() {
        for (var b in this.browsers) {
            var browser = this.browsers[b];
            for (var x in this.browser) {
                if (this.browser[x] && ((browser === x) || (browser.indexOf(x) === 0 && this.checkVersion(parseInt(browser.replace(/[^\d.]/g, '')))))) {
                    this.showNotice();
                }
            }
        }
    };

    OutdatedBrowser.prototype.showNotice = function() {
        var notice = document.createElement('div');
        notice.className = this.classname;
        notice.innerHTML = this.html;
        this.parent.insertBefore(notice, this.parent.firstChild);
    };

    return OutdatedBrowser;
}));
