var worker = new Worker("worker/sqlworker.js");

var tag = 0;
var outstanding = 0;
var cbs = {};
var errcbs = {};
var spinning = {};

worker.addEventListener("message", function (ev) {
  var data = ev.data;
  if (data.type == "error") {
    if (spinning[data.tag]) {
      outstanding--;
      if (!outstanding)
        worker_spinner(false);
    }
    if (errcbs[data.tag]) {
      errcbs[data.tag](data.contents);
      errcbs[data.tag] = null;
    } else
      worker_modal("Internal error: "+data.contents);
    console.log(ev);
  } else if (data.type == "loading") {
    worker_modal("Downloading and compiling resources...<br>(this could take a little bit)<br>(<i>loading: "+data.contents+"</i>)");
    console.log("WebWorker: loading");
  } else if (data.type == "loaded") {
    worker_nomodal();
    console.log("WebWorker: loaded");
  } else if (data.type == "result") {
    if (spinning[data.tag]) {
      outstanding--;
      if (!outstanding)
        worker_spinner(false);
    }
    if (cbs[data.tag](data.contents)) {
      cbs[data.tag](data.contents);
      cbs[data.tag] = null;
    }
  } else {
    console.log("WebWorker: ???", data);
  }
}, false);

export function exec(c, cb, errcb, spin) {
  var methods;
  var _tag = tag;

  worker.postMessage({"type": "exec", "tag": _tag, "contents": c});
  tag++;
  
  methods = {
    "oncomplete": function (f) {
      cbs[_tag] = f;
      return methods;
    },
    "onerror": function (f) {
      errcbs[_tag] = f;
      return methods;
    },
    "spin": function () {
      outstanding++;
      spinning[_tag] = true;
      worker_spinner(true);
      return methods;
    }
  }

  return methods;
}

/* Probably shouldn't be here, but ... */

function worker_modal(msg) {
  document.getElementById('errormsg').style.visibility = "visible";
  document.getElementById('errormsg').innerHTML = msg;
  worker_spinner(true);
}

function worker_nomodal() {
  document.getElementById('errormsg').style.visibility = "hidden";
  if (!outstanding)
    worker_spinner(false);
}

function worker_spinner(vis) {
  document.getElementById('spinner').style.display = vis ? "block" : "none";
}
