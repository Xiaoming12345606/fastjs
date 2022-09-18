/*
* Fastjs official plugin
*
* About this plugin:
*   Version: v1.0.0
*   Plugin: cookie.fs.js
*   Author: Fastjs Team
*   Contact-Us: xiaodong@indouyin.cn
*/

fastjs.library("function", {
    name: "getcookie",
    function: (name) => {
        name = escape(name);
        let allcookies = document.cookie;
        name += "=";
        let pos = allcookies.indexOf(name);
        if (pos !== -1) {
            let start = pos + name.length;
            let end = allcookies.indexOf(";", start);
            if (end === -1){
                end = allcookies.length;
            }
            let value = allcookies.substring(start, end);
            return (value);
        }
        else return "";
    },
    global: true
});
fastjs.library("function", {
    name: "setcookie",
    function: (name, value, hours, path) => {
        name = escape(name);
        value = escape(value);
        let expires = new Date();
        expires.setTime(expires.getTime() + hours * 3600000);
        path = path === "" ? "" : ";path=" + path;
        let _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
        document.cookie = name + "=" + value + _expires + path + ";SameSite=Lax";
    }
})
fastjs.library("function", {
    name: "deletecookie",
    function: (name, value, hours, path) => {
        name = escape(name);
        let expires = new Date(0);
        path = path === "" ? "" : ";path=" + path;
        document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
    },
    global: true
})
fastjs.library("function", {
    name: "getAllCookie",
    function: () => {
        let cookie = {}
        document.cookie.split(";").each((e)=>{
            e = e.split("=")
            cookie[e[0]] = e[1]
        })
        return cookie
    },
    global: true
})