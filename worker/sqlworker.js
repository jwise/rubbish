postMessage({ "type": "loading", contents: "SQL.js" });
importScripts('sql.js');

postMessage({ "type": "loading", contents: "database" });
importScripts('defaultdb.js');

postMessage({ "type": "loading", contents: "polyfill" });
importScripts('atob-polyfill.js');

var db = SQL.open(atob(defaultdb));
self.addEventListener("message", function (ev) {
  var data = ev.data;
  if (data.type != "exec") {
    postMessage({ "type": "error", "tag": data.tag, "contents": "bad type" });
    return;
  }
  try {
    var res = db.exec(data.contents);
    postMessage({ "type": "result", "tag": data.tag, "contents": res });
  } catch(e) {
    postMessage({ "type": "error", "tag": data.tag, "contents": e.toString() });
  }
});

postMessage({ "type": "loaded" });
