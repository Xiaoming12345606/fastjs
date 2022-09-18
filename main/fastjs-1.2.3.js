/*
* Fastjs Javascript Frame
*
* About this frame:
*   Version:v1.2.3
*   Author:XiaoDong Team-XiaoDong (xiaodong@indouyin.cn)
*   Contact-Us: xiaodong@indouyin.cn
*   Follow-Us: https://gitee.com/dy-xiaodong/
*
* Frame license:
*   MIT License
*/

/* Fastjs Token ? -- < v1.2.3 > -- ? Fastjs Token */
/* Safety List: ["Vue-Router"] */
/* Shaking List: ["Css-Setup", "Error-Output", "Quality-Output", "Install-Log", "Class-Dom", "Fastjs-Version"] */

const FASTJS_CONFIG = {
    version: /* [Tree-Shaking] Fastjs-Version CUT start */"1.2.3"/* [Tree-Shaking] Fastjs-Version CUT end */,
    /* [Tree-Shaking] Css-Setup CLEAR start */
    css: {
        setup: /* [Tree-Shaking] Css-Setup IF-FALSE */true/* [Tree-Shaking] Css-Setup IF-FALSE */,
    },
    /* [Tree-Shaking] Css-Setup CLEAR end */
    /* [Tree-Shaking] Error-Output CLEAR start */
    error: {
        output: {
            smallErrorOutput: true,
            errorOutput: true,
            seriousErrorOutput: true,
            crashErrorOutput: "always on"
        }
    },
    /* [Tree-Shaking] Error-Output CLEAR end */
    /* [Tree-Shaking] Install-Log CLEAR start */
    log: {
        fastjsInstallLog: true,
    },
    /* [Tree-Shaking] Install-Log CLEAR end */
    /* [Tree-Shaking] Quality-Output CLEAR start */
    compiler: {
        qualityInspection: true
    },
    /* [Tree-Shaking] Quality-Output CLEAR end */
    function: {
        /* [Tree-Shaking] Class-Dom CLEAR start */
        Class: {
            dom: {
                defaultTagName: /* [Tree-Shaking] Class-Dom CUT start */"div"/* [Tree-Shaking] Class-Dom CUT end */
            }
        },
        /* [Tree-Shaking] Class-Dom CLEAR end */
        String: {
            push: {
                match: "%s%"
            }
        }
    },
    __dev__: {
        safetyMode: {
            VueRouter: true
        }
    }
}

class dom {
    constructor(tagname = /* [Tree-Shaking] Class-Dom CLEAR start */FASTJS_CONFIG.function.Class.dom.defaultTagName/* [Tree-Shaking] Class-Dom CLEAR end *//* [Tree-Shaking] Class-Dom PASTE */, e) {
        // Create new dom
        let el = $().createElement(tagname)
        if (e && e.length > 1) {
            if (e[0] === '.') el.addClass(e.substr(1))
            if (e[0] === '#') el.id = e.substr(1)
        }
        // Return htmlDom
        return el
    }
}

var fastjs = {
    setup() {
        // Fastjs Dom Selecter Setup
        window.$ = fastjs.dom
        let onready = []
        $().ready = (func) => void onready.push(func)
        $().onreadystatechange = () => {
            if ($().readyState === "complete") onready.each(ev => ev($()))
        }
        window.js = fastjs
        Object.prototype.toArray = function () {
            return Object.entries(this)
        }
        /* --- Vue-Router Safety Mode start --- */
        /* __dev__ */if (!FASTJS_CONFIG.__dev__.safetyMode.VueRouter)/* __dev__ */
            Object.prototype.set = function (name, value) {
                this[name] = value
                return this
            }
        /* --- Vue-Router Safety Mode end --- */
        // Element
        let e = {
            addClass(name = "") {
                let el = this
                el.classList.add(String(name))
                return el
            },
            css(val) {
                if (js.type(val, "string"))
                    this.style = val
                else if (js.type(val, "object"))
                    Object.entries(val).forEach((e) => {
                        this.style[e[0]] = e[1]
                    })
                else this.attr("style", null)
                return this
            },
            insertAfter(el) {
                let par = el.father()
                if (par.lastChild === el) par.appendChild(this)
                else par.insertBefore(this, el.nextSibling)
                return this
            },
            attr(e, val = false) {
                e = String(e)
                if (val === false) return this.getAttribute(e)
                if (val === null) this.removeAttribute(e)
                else this.setAttribute(e, String(val))
                return this
            },
            on(ev, e) {
                this.addEventListener(ev, e)
                return this
            },
            domAddEnd(el) {
                this.appendChild(el)
                return this
            },
            html(val) {
                this.innerHTML = val !== undefined ? val : this.innerHTML
                return val === undefined ? this.innerHTML : this
            },
            text(val) {
                this.innerText = val !== undefined ? val : this.innerText
                return val === undefined ? this.innerText : this
            },
            gethtml() {
                return this.html()
            },
            gettext() {
                return this.text()
            },
            next(selecter) {
                return fastjs.dom(selecter, this)
            },
            val(text) {
                if (text !== undefined) {
                    this.tagName === "BUTTON" ? this.text(text) : this.value = text
                    return this
                }
                return this.value
            },
            push(el) {
                if (js.type(el, "string")) el = $().querySelector(el)
                if (!el) {
                    fastjs.throwError("Element.push", "selecter is empty")
                    return this
                }
                el.domAddEnd(this)
                return this
            },
            cover(selecter) {
                let dom = $().querySelector(selecter)
                if (!dom) {
                    fastjs.throwError("Element.cover", "selecter is empty")
                    return this
                }
                dom.html().appendChild(this)
                return this
            },
            father() {
                return this.parentNode
            },
            hide() {
                this.hidden = true
                return this
            },
            show() {
                this.hidden = false
                return this
            },
            set(name, value) {
                this[name] = value
                return this
            },
            setAttr(name, value) {
                this.setAttribute(name, value)
                return this
            }
        }
        e.toArray().forEach((e) => {
            Element.prototype[e[0]] = e[1]
        })
        // String
        e = {
            push($strings, $target) {
                let str = this
                if (!$strings) {
                    $strings = ""
                }
                let mt = FASTJS_CONFIG.function.String.push.match
                if (js.type($strings, "string")) {
                    str = str.replaceAll($target !== void 0 ? $target : mt, $strings)
                } else if (js.type($strings, "object")) {
                    $strings.forEach((e, key) => {
                        if (key >= $strings.length) {
                            e = $strings[$strings.length - 1]
                            fastjs.throwError("String.push", "List out of range")
                        }
                        str = str.replace($target !== void 0 ? $target : mt, e)
                    })
                } else {
                    $strings = String($strings)
                    str = str.replaceAll($target !== void 0 ? $target : mt, $strings)
                }
                return str
            },
            search($keyword = "") {
                let str = this.indexOf($keyword)
                return str < 0 ? false : str
            },
            strrev() {
                return this.split("").reverse().join("")
            },
            forEach(callback = () => {
            }) {
                if (!js.type(callback, "function")) {
                    fastjs.throwCrashError("String.forEach", "callback", "type")
                }
                for (let i = 0; i < this.length; i++) {
                    callback(this[i])
                }
            },
            pushToDom(el = "") {
                if (js.type(el, "string") || el == null) {
                    el = $().querySelector(el)
                    if (!el) {
                        fastjs.throwError("String.pushToDom", "selecter is empty")
                        return this
                    }
                }
                el.html(this)
                return this
            },
            array(val) {
                if (js.type(val, "string")) {
                    let str = ""
                    let ar = []
                    for (let i = 0; i < this.length; i++) {
                        str += this[i]
                        if (str.search(val) !== false) {
                            str = str.replace(val, "")
                            ar.push(str)
                            str = ""
                        }
                    }
                    if (str.length) {
                        ar.push(str)
                    }
                    return ar
                } else if (js.type(val, "number")) {
                    let time = 0
                    let str = ""
                    let ar = []
                    for (let i = 0; i < this.length; i++) {
                        time++
                        str += this[i]
                        if (time === val) {
                            ar.push(str)
                            str = ""
                            time = 0
                        }
                    }
                    return ar
                }
                return fastjs.throwCrashError("String.array", "val", "type")
            },
            int() {
                return Number(this)
            }
        }
        e.toArray().forEach((e) => {
            String.prototype[e[0]] = e[1]
        })
        Number.prototype.str = function () {
            return String(this)
        }
        NodeList.prototype.each = function (e) {
            return this.forEach(e), this
        }
        // Array
        e = {
            search(val) {
                let el = this
                if (js.type(val, "number"))
                    val = String(val)
                else if (!js.type(val, "string")) {
                    return fastjs.throwCrashError("Array.search", "val", "type")
                }
                el = el.indexOf(val) > -1 ? el.indexOf(val) : false
                return el
            },
            random() {
                let upper = this.length - 1
                let lower = 0
                let random = Math.floor(Math.random() * (upper - lower + 1)) + lower
                return this[random]
            },
            add($index, $key) {
                if (!$key && $key !== 0) {
                    this.push($index)
                    return this
                } else {
                    if (this.length < $key || $key < 0) {
                        return fastjs.throwCrashError("Array.add", "key is out of range")
                    }
                }
                this.splice($key, 0, $index)
                return this
            },
            delete($key, $num = 1) {
                if ($num < 1) {
                    fastjs.qualityOutput("Array.delete", "Method calls that could have been ignored")
                    return this
                }
                this.splice($key, $num)
                return this
            },
            resort() {
                return this.sort().reverse()
            },
            string($keyword, $custom) {
                if (!$keyword) {
                    $keyword = ","
                }
                let str = ""
                this.forEach((e, key) => {
                    str += "%s%%s%".push([e, key + 1 === this.length ? "" : $keyword], "%s%")
                })
                return $custom ? "[%s%]".push(str, "%s%") : str
            },
            each(func) {
                this.forEach(func)
                return this
            }
        }
        e.toArray().forEach((e) => {
            Array.prototype[e[0]] = e[1]
        })
        // Global prototype
        let t = ["String", "Number", "NodeList", "Element", "Boolean", "Array", "Function", "Document", "Object", "Symbol", "Date", "RegExp", "Blob"]
        Object({
            then: {
                /* __dev__ */i: [FASTJS_CONFIG.__dev__.safetyMode.VueRouter ? "Object" : null],/* __dev__ */
                /* --- Vue-Router Safety Mode --- */ // /* --- Vue-Router Safety Mode --- */ i: ["Object"],
                func(func, time = 0) {
                    if (time)
                        setTimeout(() => func(this), time)
                    else func(this)
                    return this
                }
            },
            log: {
                /* __dev__ */i: [FASTJS_CONFIG.__dev__.safetyMode.VueRouter ? "Object" : null],/* __dev__ */
                /* --- Vue-Router Safety Mode --- */ // /* --- Vue-Router Safety Mode --- */ i: ["Object"],
                func(func, time = 0) {
                    let e = this.trim != null ? this.toString() : this
                    return console.log(e), e
                }
            },
        }).toArray().each(e => t.each(t => {
            if (!e[1].i || e[1].i.search(t) === false) window[t].prototype[e[0]] = e[1].func
        })).then(() => {
            /* -!- Vue-Router safety mode start -!- */
            /* __dev__ */
            if (FASTJS_CONFIG.__dev__.safetyMode.VueRouter)/* __dev__ */
                delete Object.prototype.toArray
            /* -!- Vue-Router safety mode end -!- */
        })
        /* [Tree-Shaking] Install-Log DELETE start */
        /* [Tree-Shaking] Install-Log UNDELETE start */
        if (FASTJS_CONFIG.log.fastjsInstallLog)
            /* [Tree-Shaking] Install-Log UNDELETE end */
            console.log(`Fastjs v${FASTJS_CONFIG.version} already install successfully!`)
        /* [Tree-Shaking] Install-Log DELETE end */
        /* [Tree-Shaking] Css-Setup DELETE start */
        /* [Tree-Shaking] Css-Setup UNDELETE start */
        if (FASTJS_CONFIG.css.setup)
            /* [Tree-Shaking] Css-Setup UNDELETE end */
            new dom("style").html("body{margin: 0;font-family:-apple-system,BlinkMacSystemFont,\"SegoeUI\",Roboto,\"HelveticaNeue\",Arial,sans-serif,\"AppleColorEmoji\",\"SegoeUIEmoji\",\"SegoeUISymbol\",\"NotoColorEmoji\";}*{box-sizing:border-box;}input:focus{outline:none}button:focus{outline:none;}a{text-decoration-line:none;color:unset;}a:hover{text-decoration-line:none;color:unset;}").attr("about", "fastjs-autoinstall-css").push("head")
        /* [Tree-Shaking] Css-Setup DELETE end */
    },
    random($lower, $upper) {
        if (!js.type($lower, "number") || !js.type($upper, "number")) {
            return fastjs.throwCrashError("main.random", "$lower or $upper", "type")
        }
        if ($upper <= $lower) {
            return fastjs.throwCrashError("main.random", "$lower and $upper is not standard")
        }
        return Math.floor(Math.random() * ($upper - $lower + 1)) + $lower
    },
    /* [Tree-Shaking] Error-Output DELETE start */
    throwSmallError(e, val) {
        if (FASTJS_CONFIG.error.output.smallErrorOutput)
            console.warn(`[Fastjs Error] Fastjs.${e}.smallError: ${val}`)
    },
    throwError(e, val) {
        if (FASTJS_CONFIG.error.output.errorOutput)
            console.warn(`[Fastjs Error] Fastjs.${e}.error: ${val}`)
    },
    throwSeriousError: (e, val) => {
        if (FASTJS_CONFIG.error.output.seriousErrorOutput)
            console.warn(`[Fastjs Error] Fastjs.${e}.seriousError: ${val}`)
    },
    throwCrashError(e, val, reason) {
        if (reason === "type")
            console.error(`[Fastjs Error] Fastjs.${e}.crashError: unknown type given of ${val}`)
        else
            console.error(`[Fastjs Error] Fastjs.${e}.crashError: ${val}`)
    },
    /* [Tree-Shaking] Error-Output DELETE end */
    /* [Tree-Shaking] Quality-Output DELETE start */
    qualityOutput(e, val) {
        if (FASTJS_CONFIG.compiler.qualityInspection)
            `[Fastjs quality inspection] Fastjs.${e}.qualityInspection: ${val}`.log()
    },
    /* [Tree-Shaking] Quality-Output DELETE end */
    dom(selecter, el = document) {
        /*
         * @string selecter
         * @element el
         */

        if (selecter == null) return document
        if (selecter.split(" ").pop()[0] === "#" ? true : ["body", "html", "head"].search(selecter) !== false)
            el = el.querySelector(selecter)
        else el = el.querySelectorAll(selecter)
        return el
    },
    library(e, config) {
        if (e === "function") {
            fastjs[config.name] = config.function
            if (fastjs[config.name] !== undefined && config.global)
                window[config.name] = config.function
        }
    },
    copy(data) {
        var e = new dom('input')
        e.val(data).push("body").select()
        $().execCommand("Copy")
        e.css("display: none").remove()
    },
    type(e, ct) {
        return ct === undefined ? typeof e == "object" ? e.__proto__.at === undefined ? "object" : "array" : typeof e : typeof e == "object" ? e.__proto__.at === undefined ? "object" === ct : "array" === ct : typeof e === ct
    }
}

fastjs.setup()