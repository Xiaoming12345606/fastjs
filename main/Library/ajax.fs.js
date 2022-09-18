/*
* Fastjs official plugin
*
* About this plugin:
*   Version: v1.1.1
*   Plugin: ajax.fs.js
*   Author: Fastjs Team
*   Contact-Us: xiaodong@indouyin.cn
*/

/* Shaking List: ["Version-Check", "Error-Check", "Log-Output"] */

const Ajax = {
    /* [Tree-Shaking ajax.fs.js] Version-Check CLEAR start */
    newVersionCheck: /* [Tree-Shaking ajax.fs.js] Version-Check IF-FALSE */true/* [Tree-Shaking ajax.fs.js] Version-Check IF-FALSE */,
    /* [Tree-Shaking ajax.fs.js] Version-Check CLEAR end */
    /* [Tree-Shaking ajax.fs.js] Log-Output CLEAR start */
    log: true,
    /* [Tree-Shaking ajax.fs.js] Log-Output CLEAR end */
    encode: true,
    /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR start */
    error: {
        urlNotSecurity: true
    },
    /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR end */
    successCode: ["200"],
    hooks: {
        beforeSetup(ajax) {
        },
        beforeSend(ajax) {
        },
        send(ajax) {
        },
        beforeUpdate(ajax, status) {
        },
        update(ajax, status) {
        }
    }
}

class ajax {
    /*
     * @string url
     * @object data
     * @function callback
     * @integer timeout
     * @object datatype
     * @string datatype
     */
    constructor(url, data, callback, failed, timeout = 5000, header, datatype, async = true) {
        this.url = url ? url : ""
        this.data = data ? data : {}
        this.callback = callback ? callback : () => 0
        this.failed = failed ? failed : () => 0
        this.timeout = timeout
        this.header = header ? header : {}
        this.datatype = datatype ? datatype : "auto"
        this.async = async
    }

    set(name, val) {
        this[name] = val
        return this
    }

    send(url, data, callback, method) {
        if (Ajax.hooks.beforeSetup(this) === false) return false
        if (!url) {
            /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR start */
            if (!this.url)
                return fastjs.throwCrashError("Class.ajax.%s%->send".push(method, "%s%"), "Empty data given of url, but it should had something")
            /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR end */
            url = this.url
        }
        let timeout = this.timeout === 0 ? 5000 : this.timeout
        /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR start */
        if (timeout < 1000 && Ajax.error.checkTimeout)
            fastjs.qualityOutput(`Class.ajax.${method}->send`, "Illogical timeout")
        /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR end */
        callback = callback ? callback : this.callback
        data = data ? data : this.data
        let datatype = this.datatype
        /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR start */
        if (!["json", "text", "auto", "blob"].search(datatype)) {
            datatype = "auto"
            fastjs.throwError(`Class.ajax.${method}->send`, "Unknown type given of datatype")
        }
        /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR end */
        let info = ""
        Object.entries(data).forEach((e, key) => {
            if (Ajax.encode)
                e[1] = encodeURIComponent(e[1])
            info += key ? `&${e[0]}=${e[1]}` : `${e[0]}=${e[1]}`
        })

        /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR start */
        if (url.search("http://") !== false)
            if (FASTJS_CONFIG.error.urlNotSecurity)
                fastjs.throwSmallError(`Class.ajax.${method}->send`, "The url given is not secure")
        /* [Tree-Shaking ajax.fs.js] Error-Check CLEAR end */

        // Create XMLHttpRequest
        let xhr = new XMLHttpRequest()
        xhr.responseType = this.async ? datatype == "auto" ? "text" : datatype : void 0
        xhr.timeout = this.async ? timeout : void 0
        this.xhr = xhr
        if (Ajax.hooks.beforeSend(this) === false) return false
        let fail = () => {
            if (Ajax.hooks.beforeUpdate(this, false) === false) return false
            /* [Tree-Shaking ajax.fs.js] Log-Output CLEAR start */
            if (Ajax.log)
                console.log(`[Fastjs ajax] ajaxRequest to url ${url} is failed`)
            /* [Tree-Shaking ajax.fs.js] Log-Output CLEAR end */
            if (typeof this.failed === "function")
                this.failed("!failed", xhr.status)
            this.result = "!failed"
            Ajax.hooks.update(this, false)
        }
        xhr.open(method, method === "get" ? url + (info.length > 0 ? "?" : "") + info : url, this.async)
        if (method === "post")
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        this.header.toArray().forEach((e) => {
            xhr.setRequestHeader(e[0], e[1])
        })
        xhr.ontimeout = fail
        xhr.onerror = fail
        // Ajax onload
        xhr.onload = () => {
            if (Ajax.successCode.search(xhr.status) === false)
                return fail()
            let response = xhr.response
            if (datatype === "auto") {
                try {
                    // Try change to json data
                    response = JSON.parse(response)
                } catch (e) {
                }
            }
            this.result = response
            this.status = xhr.status
            if (Ajax.hooks.beforeUpdate(this, true) === false) return false
            // Ajax log
            /* [Tree-Shaking ajax.fs.js] Log-Output CLEAR start */
            if (Ajax.log) {
                console.log("[Fastjs ajax] ajaxRequest to url %s is success".replace("%s", url))
            }
            /* [Tree-Shaking ajax.fs.js] Log-Output CLEAR end */
            // Callback function
            if (callback && typeof callback == "function") {
                callback(response, 200)
            }
            if (Ajax.hooks.update(this, true) === false) return false
        }
        xhr.send(method === "post" ? info : null)
        this.xhr = xhr
        return !Ajax.hooks.send(this) === false;
    }

    /*
     * @string url
     * @object data
     * @function callback
     */
    post(url, data, callback) {
        this.send(url, data, callback, "post")
    }

    /*
     * @string url
     * @object data
     * @function callback
     */
    get(url, data, callback) {
        this.send(url, data, callback, "get")
    }
}

/* [Tree-Shaking ajax.fs.js] Version-Check DELETE start */
if (Ajax.newVersionCheck) {
    new ajax("https://fastjs.com.cn/lastVersion.php", {}, result => {
        if (result.version !== /* [Tree-Shaking] Fastjs-Version CLEAR start */FASTJS_CONFIG.version/* [Tree-Shaking] Fastjs-Version CLEAR end *//* [Tree-Shaking] Fastjs-Version PASTE */) {
            console.log("[Fastjs] Fastjs have a new version %s% can update, go to https://fastjs.com.cn/ to get more info".push(result.version, "%s%"))
        }
    }).get()
}
/* [Tree-Shaking ajax.fs.js] Version-Check DELETE end */