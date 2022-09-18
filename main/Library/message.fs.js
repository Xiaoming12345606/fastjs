/*
* Fastjs official plugin
*
* About this plugin:
*   Version: v1.0.0
*   Plugin: message.fs.js
*   Author: Fastjs Team
*   Contact-Us: xiaodong@indouyin.cn
*/

let e = new dom("div").attr("about", "fastjs-msg").css("width: 100vw")

$().ready(() => {
    let b = $().body
    if (b.children.length) b.insertBefore(e, b.children[0])
})

var Message = {
    load(text, close, autoClose, style = "spin") {
        return this.$newMsg(text, close, autoClose, `load-${style}`, "#6bd1ff")
    },
    error(text, close, autoClose) {
        return this.$newMsg(text, close, autoClose, `error`, "red")
    },
    success(text, close, autoClose) {
        return this.$newMsg(text, close, autoClose, `error`, "rgb(124, 202, 124)")
    },
    warning(text, close, autoClose) {
        return this.$newMsg(text, close, autoClose, `error`, "#ffff5e", "#c6c6c6")
    },
    close() {
        e.html("").css("margin-top: 0px")
    },
    $newMsg(text = "", close = true, autoClose = 0, type, color, font = "white") {
        e.css("margin-top: -1px")
        let el = new dom("div").css(`display:flex;border-top:1px solid #b7b7b7;user-select:none;padding:2px 0;height:28px;text-align:center;line-height:28px;background:${color}`).addClass(`msg-${type}`).push(e)
        let center = new dom("div").addClass("center").css("display:flex;margin: auto").push(el)
        if (type === "load-spin") {
            let spin = new dom("span").addClass("icon").css("transition: 0s;border-radius:50%;border:2px solid #6bd1ff;border-top:2px solid white;height:18px;width:18px;margin:2px;margin-left:4px;margin-right:8px;").push(center)
            let i = 0
            setInterval(()=>{
                if (i == 360) i = 0
                i += 3
                spin.css({transform: `rotate(${i}deg)`})
            }, 10)
        }
        let t = new dom("span").addClass("text").css(`font-size:13px;margin-top: -2px;color:${font}`).html(text).push(center)
        if (type === "load-text") {
            let i = 0
            setInterval(()=>{
                let u = text
                for (let v = 0;v < i;v++) u += "."
                if (i > 3) i = 0
                else {
                    t.html(u)
                    i++
                }
            }, 400)
        }
        t.next("a").each(el => el.css("color:rgb(163, 225, 255);font-weight:600;text-decoration-line:underline;cursor:pointer;"))
        if (close)
            new dom("span").addClass("close").text("x").css(`cursor:pointer;margin-top: -3px;width:26px;color:${font}`).on("click", () => {
                el.remove()
                if (!e.children.length) e.attr("style", null)
            }).push(el)
        if (autoClose) setTimeout(() => {
            el.remove()
            if (!e.children.length) e.attr("style", null)
        }, autoClose)
        return () => {
            el.remove()
            if (!e.children.length) e.attr("style", null)
            return true
        }
    }
}