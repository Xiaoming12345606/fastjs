/*
* Fastjs official plugin
*
* About this plugin:
*   Version: v1.0.0
*   Plugin: queryx.fs.js
*   Author: Fastjs Team
*   Contact-Us: xiaodong@indouyin.cn
*/

var config = {
    // config.method   string : "sessionStorage" / "localStorage"
    method: "sessionStorage"
}

var Queryx = {
    getQuery: qname => eval(`Object(${window[config.method].getItem("queryx-" + Queryx.queryid)})`)[qname],
    getAllQuery: () => eval(`Object(${window[config.method].getItem("queryx-" + Queryx.queryid)})`),
    jump(href, query) {
        window[config.method].setItem(`queryx-${Queryx.queryid}`, JSON.stringify(query))
        location.href = href.search("?") === false ? `${href}?queryx=${Queryx.queryid}` : `${href}&queryx=${Queryx.queryid}`
    },
    $ready() {
        $("query-to").each(el => {
            let a = new dom("a").html(el.html())
            for (let i = 0;i < el.attributes.length;i++) {
                a.attr(el.attributes[i].name, el.attributes[i].value)
            }
            a.addClass("queryTo").set("href", "javascript: void 0;");
            a.on("click", sp => {
                window[config.method].setItem(`queryx-${Queryx.queryid}`, el.attr("query"))
                window.location.href = el.attr("href").search("?") === false ? `${el.attr("href")}?queryx=${Queryx.queryid}` : `${el.attr("href")}&queryx=${Queryx.queryid}`
            })
            el.father().insertBefore(a, el).then(() => el.remove())
        })
    },
    queryid: location.search.match(/queryx\=[0-9]+/g) ? location.search.match(/queryx\=[0-9]+/g)[0].substr(7) : `${Date.now()}${js.random(100000, 999999)}`
}

$().ready(Queryx.$ready)