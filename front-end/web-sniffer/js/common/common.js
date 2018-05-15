//获取url参数(针对搜索结果)
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;

}

function getQueryString1(str, key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = str.match(reg);
    return result ? decodeURIComponent(result[2]) : null;

}
//获取cookie
function getCookie(name) {
    var mn = name + "=";
    var b, e;
    var co = document.cookie;
    if (mn == "=") {
        return co;
    }
    b = co.indexOf(mn);
    if (b < 0) {
        return "";
    }
    e = co.indexOf(";", b + name.length);
    if (e < 0) {
        return co.substring(b + name.length + 1);
    }
    else {
        return co.substring(b + name.length + 1, e);
    }
}

$('.liHover').on('mouseover', function(event) {
    $(this).children('.headList').css("display","block")
}).on('mouseout',  function(event) {
    $(this).children('.headList').css("display","none")
}); 
function setCookie(cookiename, cookievalue, hours) {
    var date = new Date();
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();

}

/** common ajax request**/
var _commonAjaxFunc = function (url, callback, callFail) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonp: 'jsonpCallback',
        success: function (json) {
            if (json && json.responseCode == "0") {
                if (callback) {
                    callback(json);
                }
            } else {
                callFail && callFail(json);
            }
        },
        error: function () {
            showErrorMessage("加载数据失败");
        }
    });
}
var tipsBoxNode = document.getElementById("pttip");
var tipIconNode = document.getElementById("tip_icon");
var tipsTextNode = document.getElementById("pttip-msg");
//错误提示
function showErrorMessage(txt, time) {
    tipsBoxNode.style.display = "block";
    tipIconNode.className = "share-hint";
    tipsTextNode.innerHTML = txt;
    if (time != undefined) {
        setTimeout(function () {
            tipsBoxNode.style.display = "none";
        }, time);
    } else {
        setTimeout(function () {
            tipsBoxNode.style.display = "none";
        }, 1567);
    }
}
//成功提示
function showSuccessMessage(txt) {
    tipsBoxNode.style.display = "block";
    tipIconNode.className = "share-icon_ok";
    tipsTextNode.innerHTML = txt;
    setTimeout(function () {
        tipsBoxNode.style.display = "none";
    }, 2000);
}
//判断浏览器类型
function JudgeBroswer() {
    var explorer = navigator.userAgent;
    //ie 
    if (explorer.indexOf("MSIE") >= 0) {
        return "IE";
    }
        //firefox 
        else if (explorer.indexOf("Firefox") >= 0) {
            return "Firefox";
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
            return "Chrome";
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
            return "Opera";
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            return "Safari";
        }
        //Netscape
        else if (explorer.indexOf("Netscape") >= 0) {
            return "Netscape";
        }
    }
var string = {
    stringToTime: function (strs) {      //"20141228"-->"2014/12/28"
    var newstr = "";
    var newstr1 = "";
    strs = new date(strs);
    if (strs.length >= 14) {
        var str = strs.substr(0, 8);
        var str1 = strs.substr(8, 6);
        var t = [];
        t.push(str.substr(0, 4));
        t.push(str.substr(4, 2));
        t.push(str.substr(6, 2));
        newstr = t.join("/");
        var t1 = [];
        t1.push(str1.substr(0, 2));
        t1.push(str1.substr(2, 2));
        newstr1 = t1.join(":");
        newstr = newstr + " " + newstr1;
    }

    return newstr;
},
    stringToDate: function (strs) {      //"20141228"-->"2014-12-28"
    var newstr = "";
    var newstr1 = "";
    if (strs.length >= 8) {
        var str = strs.substr(0, 8);
        var str1 = strs.substr(8, 6);
        var t = [];
        t.push(str.substr(0, 4));
        t.push(str.substr(4, 2));
        t.push(str.substr(6, 2));
        newstr = t.join("-");
    }
    return newstr;
},
    stringToRate: function (str) { //小数转换成百分数
        var newstr = "";
        str = str ? str : 0;
        newstr = str + "%";
        return newstr;
    },
    stringToTimeSf: function (str) {
        var t1 = [], newstr;
        t1.push(str.substr(0, 2));
        t1.push(str.substr(2, 2));
        newstr = t1.join(":");
        return newstr;
    },
    dateFormat:function(date, format) {
        if (format === undefined) {
          format = date;
          date = new Date();
        }
        date =new Date(date);
        var map = {
          M: date.getMonth() + 1, //月份
          d: date.getDate(), //日
          h: date.getHours(), //小时
          m: date.getMinutes(), //分
          s: date.getSeconds(), //秒
          q: Math.floor((date.getMonth() + 3) / 3), //季度
          S: date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
          var v = map[t];
          if (v !== undefined) {
            if (all.length > 1) {
              v = "0" + v;
              v = v.substr(v.length - 2);
            }
            return v;
          } else if (t === "y") {
            return (date.getFullYear() + "").substr(4 - all.length);
          }
          return all;
        });
        return format;
      }
}

/**解决placeholder在IE8及以下不支持的问题**/
// 文本输入框的place holder 效果
var _placeholderHandle = function () {
    if ('placeholder' in document.createElement('input')) { //如果浏览器原生支持placeholder
        return;
    }

    function target(e) {
        var ee = ee || window.event;
        return ee.target || ee.srcElement;
    }

    function _getEmptyHintEl(el) {
        var hintEl = el.hintEl;
        return hintEl && g(hintEl);
    }

    function blurFn(e) {
        var el = target(e);
        if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            return; //IE下，onfocusin会在div等元素触发
        }
        var emptyHintEl = el.__emptyHintEl;
        if (emptyHintEl) {
            //clearTimeout(el.__placeholderTimer||0);
            //el.__placeholderTimer=setTimeout(function(){//在360浏览器下，autocomplete会先blur再change
                if (el.value) {
                    emptyHintEl.style.display = 'none';
                } else {
                    emptyHintEl.style.display = '';
                }
            //},600);
        }
    }

    function focusFn(e) {
        var el = target(e);
        if (!el || el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
            return; //IE下，onfocusin会在div等元素触发
        }
        var emptyHintEl = el.__emptyHintEl;
        if (emptyHintEl) {
            //clearTimeout(el.__placeholderTimer||0);
            emptyHintEl.style.display = 'none';
        }
    }

    if (document.addEventListener) { //ie
        document.addEventListener('focus', focusFn, true);
        document.addEventListener('blur', blurFn, true);
    } else {
        document.attachEvent('onfocusin', focusFn);
        document.attachEvent('onfocusout', blurFn);
    }

    var elss = [document.getElementsByTagName('input'), document.getElementsByTagName('textarea')];
    for (var n = 0; n < 2; n++) {
        var els = elss[n];
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var placeholder = el.getAttribute('placeholder'),
            emptyHintEl = el.__emptyHintEl;
            if (placeholder && !emptyHintEl) {
                emptyHintEl = document.createElement('strong');
                emptyHintEl.innerHTML = placeholder;
                emptyHintEl.className = 'placeholder';
                emptyHintEl.onclick = function (el) {
                    return function () {
                        try {
                            el.focus();
                        } catch (ex) {
                        }
                    };
                }(el);
                if (el.value) {
                    emptyHintEl.style.display = 'none';
                }
                el.parentNode.insertBefore(emptyHintEl, el);
                el.__emptyHintEl = emptyHintEl;
            }
        }
    }
};
//计算字符串长度(英文占1个字符，中文汉字占2个字符)
function calcuteLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}
/**截取字符串，多余的字符串用省略号来代替**/
function getLesStr(str, height) {
    var len = calcuteLen(str);
    if (len > height) {
        str = str.substring(0, height) + "......";
    } else {
        str = str;
    }
    return str;
}

function cutcomment(str) {
    var res = "";
    var len = Math.ceil(str.length / 40);
    for (var i = 0; i < len; i++) {
        res += str.substr(i * 40, 40);
        if (i != len - 1) {
            res += "\n";
        }
    }
    return res;
}

/**防止xss攻击 **/

function safeStr(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};
