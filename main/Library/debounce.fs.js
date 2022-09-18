/*
* Fastjs official plugin
*
* About this plugin:
*   Version: v1.0.1
*   Plugin: debounce.fs.js
*   Author: Fastjs Team
*   Contact-Us: xiaodong@indouyin.cn
*/

/* Shaking List: ["Error-Check"] */

class debounce {
    constructor(ms, callback) {
        this.ms = !ms ? 1000 : ms;
        /* [Tree-Shaking debounce.fs.js] Error-Check CLEAR start */
        if (!js.type(ms, "number")) {
            return fastjs.throwCrashError("Class.debounce.__constructor__", "ms", "type");
        }
        if (!callback) {
            fastjs.qualityOutput("Class.debounce.__constructor__", "Callback is null, it will not do anything when trigger")
        }
        if (js.type(callback, "function") && callback) {
            return fastjs.throwCrashError("Class.debounce.__constructor__", "callback", "type");
        }
        /* [Tree-Shaking debounce.fs.js] Error-Check CLEAR end */
        this.callback = !callback ? () => 0 : callback;
        this.trigger = false;
        return this;
    }

    trig() {
        if (this.trigger)
            clearTimeout(this.trigger);
        this.trigger = setTimeout(() => {
            this.trigger = false;
            this.callback()
        }, this.ms);
        return this;
    }
}