/* WebWorker logic */
var worker = new Worker("worker/sqlworker.js");
var tag = 0;
var cbs = {};
var errcbs = {}
worker.addEventListener("message", function (ev) {
  var data = ev.data;
  if (data.type == "error") {
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
    cbs[data.tag](data.contents);
    cbs[data.tag] = null;
  } else {
    console.log("WebWorker: ???", data);
  }
}, false);

var sql_outstanding = 0;

function sql_exec(c, cb, errcb, spin) {
  if (typeof spin === 'undefined') spin = true;
  worker.postMessage({"type": "exec", "tag": tag, "contents": c});
  if (spin) {
    worker_spinner(true);
    sql_outstanding++;
    cbs[tag] = function (x) { sql_outstanding--; if (!sql_outstanding) worker_spinner(false); cb(x); };
  } else {
    cbs[tag] = cb;
  }
  errcbs[tag] = errcb;
  tag++;
}

/* Worker error display logic */
function worker_modal(msg) {
  document.getElementById('errormsg').style.visibility = "visible";
  document.getElementById('errormsg').innerHTML = msg;
  worker_spinner(true);
}

function worker_nomodal() {
  document.getElementById('errormsg').style.visibility = "hidden";
  if (!sql_outstanding)
    worker_spinner(false);
}

function worker_spinner(vis) {
  document.getElementById('spinner').style.display = vis ? "block" : "none";
}

/* Table rendering logic */

function table_cols(cols) {
  return {
    "header": function (tr) {
      for (col in cols) {
        var th = document.createElement('th');
        th.innerHTML = cols[col];
        tr.appendChild(th);
      }
    },
    "row": function (tr, row) {
      for (col in cols) {
        var td = document.createElement('td');
        td.innerHTML = row[cols[col]];
        tr.appendChild(td);
      }
    }
  };
}

function table_allcols(res) {
  var cols = [];
  for (col in res[0])
    cols.push(col);
  
  return table_cols(cols);
}

function format_song(elt, artistid, artist, songid, title) {
  function clickartist(ev) {
    artist_go(artistid);
    ev.stopPropagation();
    ev.preventDefault();
    return false;
  }
  
  function clicksong(ev) {
    song_go(songid);
    ev.stopPropagation();
    ev.preventDefault();
    return false;
  }

  elt.innerHTML = "";
  
  var a = document.createElement('a');
  a.href = '#artist='+artistid;
  a.innerHTML = artist;
  a.addEventListener('click', clickartist, false);
  elt.appendChild(a);
  elt.appendChild(document.createTextNode(" - "));
  var a = document.createElement('a');
  a.href = '#song='+songid;
  a.innerHTML = title;
  a.addEventListener('click', clicksong, false);
  elt.appendChild(a);
  elt.addEventListener('click', clicksong, false);
}

function format_artist(elt, artistid, artist) {
  function clickartist(ev) {
    artist_go(artistid);
    ev.stopPropagation();
    ev.preventDefault();
    return false;
  }

  elt.innerHTML = "";
  
  var a = document.createElement('a');
  a.href = '#artist='+artistid;
  a.innerHTML = artist;
  a.addEventListener('click', clickartist, false);
  elt.appendChild(a);
  elt.addEventListener('click', clickartist, false);
}


function format_set(elt, setid, date) {
  function clickset(ev) {
    set_go(setid);
    ev.stopPropagation();
    ev.preventDefault();
    return false;
  }
  
  elt.innerHTML = "";
  
  var a = document.createElement('a');
  a.href = '#set='+setid;
  a.innerHTML = date;
  a.addEventListener('click', clickset, false);
  elt.appendChild(a);
  elt.addEventListener('click', clickset, false);
}

function table_song(_params) {
  var params = _params;
  if (typeof params === 'undefined')
    params = {};
  if (typeof params.header === 'undefined')
    params.header = 'Song';
  if (typeof params.songid === 'undefined')
    params.songid = 'songid';
  if (typeof params.artistid === 'undefined')
    params.artistid = 'artistid';
  if (typeof params.title === 'undefined')
    params.title = 'title';
  if (typeof params.artist === 'undefined')
    params.artist = 'artist';
  
  return {
    "header": function(tr) {
      var th = document.createElement('th');
      th.innerHTML = params.header;
      tr.appendChild(th);
    },
    "row": function(tr, row) {
      var td = document.createElement('td');
      format_song(td, row[params.artistid], row[params.artist], row[params.songid], row[params.title]);
      td.className += "song";
      tr.appendChild(td);
    }
  };
}

function table_artist(_params) {
  var params = _params;
  if (typeof params === 'undefined')
    params = {};
  if (typeof params.header === 'undefined')
    params.header = 'Artist';
  if (typeof params.artistid === 'undefined')
    params.artistid = 'artistid';
  if (typeof params.artist === 'undefined')
    params.artist = 'artist';
  
  return {
    "header": function(tr) {
      var th = document.createElement('th');
      th.innerHTML = params.header;
      tr.appendChild(th);
    },
    "row": function(tr, row) {
      var td = document.createElement('td');
      format_artist(td, row[params.artistid], row[params.artist]);
      td.className += "song";
      tr.appendChild(td);
    }
  };
}

function table_set(_params) {
  var params = _params;
  if (typeof params === 'undefined')
    params = {};
  if (typeof params.header === 'undefined')
    params.header = 'Set';
  if (typeof params.dateid === 'undefined')
    params.dateid = 'dateid';
  if (typeof params.date === 'undefined')
    params.date = 'date';
  
  return {
    "header": function(tr) {
      var th = document.createElement('th');
      th.innerHTML = params.header;
      tr.appendChild(th);
    },
    "row": function(tr, row) {
      var td = document.createElement('td');
      format_set(td, row[params.dateid], row[params.date]);
      td.className += "set";
      tr.appendChild(td);
    }
  };
}


function table_format(res, formatters) {
  var tab = document.createElement('table');
  
  var tr = document.createElement('tr');
  for (i in formatters)
    formatters[i].header(tr);
  tab.appendChild(tr);
  
  for (row in res) {
    var tr = document.createElement('tr');
    for (i in formatters)
      formatters[i].row(tr, res[row]);
    tab.appendChild(tr);
  }
  
  return tab;
}

/* Pages */

var pages = [
  { 'name': 'Search', 'id': 'search' },
  { 'name': 'Artist view', 'id': 'artist' },
  { 'name': 'Song view', 'id': 'song' },
  { 'name': 'Set view', 'id': 'set' },
  { 'name': 'SQL view', 'id': 'sql' },
];

var curpage = 'sql';
function page_change(page) {
  document.getElementById('page_'+curpage).style.display = "none";
  document.getElementById('tab_'+curpage).className = '';
  document.getElementById('page_'+page).style.display = "block";
  document.getElementById('tab_'+page).className = 'current';
  
  /* update tabs */
  curpage = page;
}

window.addEventListener('load', function() {
  var tabbar = document.getElementById('tabbar');
  
  var ul = document.createElement("ul");
  
  for (p in pages) {
    var li = document.createElement("li");
    li.innerHTML = pages[p].name;
    li.id = 'tab_' + pages[p].id;
    li.addEventListener('click',
      function(p) { return function(ev) {
        page_change(pages[p].id);
      }; }(p), false);
    ul.appendChild(li);
  }
  
  tabbar.appendChild(ul);
  
  page_change('search');
});

/* Song page */

function song_go(id) {
  page_change('song');
  hash_set("song="+id);
  console.log("song_go("+id+")");
  
  /* Populate the page. */
  sql_exec(
"SELECT count(*) AS plays,artists.artist,songs.title, artists.id AS artistid\n\
  FROM songs\n\
  JOIN plays ON songs.id=plays.song\n\
  JOIN artists ON songs.artist=artists.id\n\
  WHERE songs.id="+id+";",
    function (t) {
      format_artist(document.getElementById('page_song_artist'), t[0].artistid, t[0].artist);
      document.getElementById('page_song_title').innerHTML = t[0].title;
      document.getElementById('page_song_plays').innerHTML = t[0].plays;
    }, worker_modal);
  
  sql_exec(
"SELECT dates.id, dates.date\n\
  FROM songs\n\
  JOIN plays ON songs.id=plays.song\n\
  JOIN dates ON dates.id=plays.date\n\
  WHERE songs.id="+id+"\n\
  ORDER BY dates.date ASC;",
    function (t) {
      var ul = document.getElementById('page_song_sets');
      
      ul.innerHTML = "";
      for (r in t) {
        var li = document.createElement('li');
        format_set(li, t[r].id, t[r].date);
        ul.appendChild(li);
      }
    }, worker_modal);
}

/* Artist page */

function artist_go(id) {
  page_change('artist');
  hash_set("artist="+id);
  console.log("artist_go("+id+")");
  
  /* Populate the page. */
  sql_exec(
"SELECT count(*) AS plays, artists.artist, artists.id AS artistid\n\
  FROM artists\n\
  JOIN songs ON songs.artist=artists.id\n\
  JOIN plays ON plays.song=songs.id\n\
  WHERE artists.id="+id+";",
    function (t) {
      document.getElementById('page_artist_artist').innerHTML = t[0].artist;
      document.getElementById('page_artist_plays').innerHTML = t[0].plays;
    }, worker_modal);
  
  sql_exec(
"SELECT artists.id AS artistid, artists.artist AS artist, songs.id AS songid, songs.title, COUNT(*) AS plays\n\
  FROM artists\n\
  JOIN songs ON songs.artist=artists.id\n\
  JOIN plays ON plays.song=songs.id\n\
  WHERE artists.id="+id+"\n\
  GROUP BY songs.id\n\
  ORDER BY plays DESC;",
    function (t) {
      var set = document.getElementById('page_artist_songs');
      set.innerHTML = "";
      set.appendChild(table_format(t, [table_song(), table_cols(['plays'])]));
    }, worker_modal);
}

/* Set page */

function set_go(id) {
  page_change('set');
  hash_set('set='+id);
  console.log("set_go("+id+")");
  sql_exec("SELECT dates.id, dates.date FROM dates WHERE dates.id="+id+";",
    function (t) {
      document.getElementById('page_set_header_div').innerHTML = t[0].date;
    }, worker_modal);
  
  sql_exec(
"SELECT playorder,artists.artist,songs.title,songs.id as songid,artists.id as artistid,request\n\
  FROM plays\n\
  JOIN songs ON plays.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  WHERE date="+id+"\n\
  ORDER BY playorder;",
    function (t) {
      var set = document.getElementById('page_set_songs');
      set.innerHTML = "";
      set.appendChild(table_format(t, [table_cols(['playorder']), table_song(), table_cols(['request'])]));
    }, worker_modal);
}

/* Search page */

function search_go_set(txt) {
  page_change('search');
  document.getElementById('page_search_input').value = txt;
  hash_set('search:set='+txt);
  sql_exec(
"SELECT dates.id as dateid, dates.date, COUNT(*) as songs\n\
  FROM dates\n\
  JOIN plays ON plays.date=dates.id\n\
  WHERE dates.date LIKE '\%"+txt+"\%'\n\
  GROUP BY dates.date\n\
  ORDER BY dates.date DESC;",
    function (t) {
      var set = document.getElementById('page_search_results');
      set.innerHTML = "";
      set.appendChild(table_format(t, [table_set(), table_cols(['songs'])]));
    }, worker_modal);
}

function search_go_artist(txt) {
  var max = 100;
  page_change('search');
  document.getElementById('page_search_input').value = txt;
  hash_set('search:artist='+txt);
  sql_exec(
"SELECT count(*) AS plays,artists.artist,artists.id as artistid\n\
  FROM plays\n\
  JOIN songs ON plays.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  WHERE artists.artist LIKE '\%"+txt+"\%'\n\
  GROUP BY artistid\n\
  ORDER BY plays DESC\n\
  LIMIT "+max+";",
    function (t) {
      var set = document.getElementById('page_search_results');
      set.innerHTML = "";
      set.appendChild(table_format(t, [table_artist(), table_cols(['plays'])]));
      if (t.length == max) {
        var d = document.createElement('div');
        d.innerHTML = '<i><a href="http://cmubash.org/?81">Oooooooooooh... that was a bad idea!</a></i>';
        set.appendChild(d);
      }
    }, worker_modal);
}

function search_go_title(txt) {
  var max = 100;
  page_change('search');
  document.getElementById('page_search_input').value = txt;
  hash_set('search:title='+txt);
  sql_exec(
"SELECT count(*) AS plays,artists.artist,songs.title,songs.id as songid,artists.id as artistid\n\
  FROM plays\n\
  JOIN songs ON plays.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  WHERE songs.title LIKE '\%"+txt+"\%'\n\
  GROUP BY song\n\
  ORDER BY plays DESC\n\
  LIMIT "+max+";",
    function (t) {
      var set = document.getElementById('page_search_results');
      set.innerHTML = "";
      set.appendChild(table_format(t, [table_song(), table_cols(['plays'])]));
      if (t.length == max) {
        var d = document.createElement('div');
        d.innerHTML = '<i><a href="http://cmubash.org/?81">Oooooooooooh... that was a bad idea!</a></i>';
        set.appendChild(d);
      }
    }, worker_modal);
}

window.addEventListener('load', function() {
  var inp = document.getElementById('page_search_input');
  document.getElementById('page_search_set').onclick = function(ev) {
    search_go_set(inp.value);
    return false;
  };
  document.getElementById('page_search_artist').onclick = function(ev) {
    search_go_artist(inp.value);
    return false;
  };
  document.getElementById('page_search_title').onclick = function(ev) {
    search_go_title(inp.value);
    return false;
  };
});

/* SQL demo page */

var sample_queries = [
{"name": "what's overplayed?", "sql": "SELECT count(*) AS plays,artists.artist,songs.title\n\
  FROM plays\n\
  JOIN songs ON plays.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  GROUP BY song\n\
  ORDER BY plays DESC\n\
  LIMIT 20;"},
{"name": "what was last night?", "sql": "SELECT id,date FROM dates ORDER BY date DESC limit 1;"},
{"name": "what got played that evening?", "sql": "SELECT playorder,artists.artist,songs.title\n\
  FROM plays\n\
  JOIN songs ON plays.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  WHERE date=(SELECT id FROM dates ORDER BY date DESC limit 1)\n\
  ORDER BY playorder;"},
{"name": "how overplayed was last night's set?", "sql": "SELECT p1.playorder,artists.artist,songs.title,count(*)\n\
  FROM plays p1\n\
  JOIN songs ON p1.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  JOIN plays p2 ON p1.song=p2.song\n\
  WHERE p1.date=(SELECT id FROM dates ORDER BY date DESC limit 1)\n\
  GROUP BY p1.song,p1.playorder\n\
  ORDER BY p1.playorder;"},
{"name": "what's been played 16 times?", "sql": "SELECT count(*) AS plays,artists.artist,songs.title\n\
  FROM plays\n\
  JOIN songs ON plays.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  GROUP BY song\n\
  HAVING plays=16;"},
{"name": "what's Hello?", "sql": "SELECT songs.id,artists.artist,title\n\
  FROM songs\n\
  JOIN artists ON songs.artist=artists.id\n\
  WHERE title='Hello'"},
{"name": "what gets played after Hello?", "sql": "SELECT artists.artist,songs.title\n\
  FROM plays p1\n\
  JOIN songs ON p2.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  JOIN plays p2 ON p2.playorder=p1.playorder+1\n\
  WHERE p1.song=1636\n\
    AND p2.date=p1.date;"},
{"name": "who gets played after Hello?", "sql": "SELECT COUNT(*) as plays, artists.artist\n\
  FROM plays p1\n\
  JOIN songs ON p2.song=songs.id\n\
  JOIN artists ON songs.artist=artists.id\n\
  JOIN plays p2 ON p2.playorder=p1.playorder+1\n\
  WHERE p1.song=1636\n\
    AND p2.date=p1.date\n\
  GROUP BY artists.artist\n\
  ORDER BY plays;"},
{"name": "when does Annie, Would I Lie To You get played? (by fives)", "sql": "SELECT COUNT(*) as plays, p1.playorder / 5 * 5 as position\n\
  FROM plays p1\n\
  WHERE p1.song=422\n\
  GROUP BY position\n\
  ORDER BY position;"},
{"name": "what were the longest sets?", "sql": "SELECT COUNT(*) as plays, dates.date\n\
  FROM plays p1\n\
  JOIN dates ON dates.id = p1.date\n\
  GROUP BY dates.date\n\
  ORDER BY plays DESC\n\
  LIMIT 10;"},
{"name": "what were the longest sets? (with request counters)", "sql": "SELECT\n\
  dates.date AS date,\n\
  (SELECT COUNT(*) FROM plays WHERE plays.date = dates.id AND request=1) AS requested, \n\
  (SELECT COUNT(*) FROM plays WHERE plays.date = dates.id AND request=0) AS unrequested,\n\
  (SELECT COUNT(*) FROM plays WHERE plays.date = dates.id) AS total\n\
  FROM dates\n\
  ORDER BY total DESC\n\
  LIMIT 10;"},
{"name": "what years did Worlock get played in?", "sql": "SELECT SUBSTR(dates.date, 0, 5) AS year, COUNT(*) AS plays\n\
  FROM plays\n\
  JOIN dates ON dates.id=plays.date\n\
  WHERE song=(SELECT id FROM songs WHERE title='Worlock')\n\
  GROUP BY year;"},
];

function outputtab(data) {
  var elt = document.getElementById('output');
  elt.innerHTML = "";
  elt.appendChild(table_format(data, [table_allcols(data)]));
}

function outputtabsong(data) {
  var elt = document.getElementById('output');
  elt.innerHTML = "";
  elt.appendChild(table_format(data, [table_allcols(data), table_song()]));
}


function outputerror(err) {
  var elt = document.getElementById('output');
  elt.innerHTML = err;
  sql_outstanding--;
  worker_spinner(false);
}

function populate_samples() {
  var samples = document.getElementById('samples');
  for (i in sample_queries) {
    var li = document.createElement("li");
    li.innerHTML = sample_queries[i].name;
    li.onclick = function(q) { return function() {
      var elt = document.getElementById("commands");
      commands.innerHTML = q.sql;
      sql_exec(q.sql, outputtab, outputerror);
    }}(sample_queries[i]);
    samples.appendChild(li);
  }
}

window.addEventListener('load', function() {
  document.getElementById('execbtn').onclick = function(ev) {
    sql_exec(commands.value, outputtab, outputerror);
    return false;
  };
  document.getElementById('execsongbtn').onclick = function(ev) {
    sql_exec(commands.value, outputtabsong, outputerror);
    return false;
  };
  populate_samples();
  hash_update();
});


var hash_known = "";

function hash_set(h) {
  if (!h.match(/#.*/))
    h = "#"+h;
  hash_known = h;
  window.location.hash = h;
}

function hash_update() {
  if (window.location.hash == hash_known) {
    console.log("hashchange skipped");
    return;
  }
  hash_known = window.location.hash;
  
  var re = /#(.*)=(.*)/;
  var a = window.location.hash.match(re);
  console.log("hashchange");
  if (!a) {
    console.log("hashchange: unmatched?");
    return;
  }
  
  if (a[1] == 'set')
    set_go(parseInt(a[2]));
  else if (a[1] == 'artist')
    artist_go(parseInt(a[2]));
  else if (a[1] == 'song')
    song_go(parseInt(a[2]));
  else if (a[1] == 'search:set')
    search_go_set(a[2]);
  else if (a[1] == 'search:title')
    search_go_title(a[2]);
  else if (a[1] == 'search:artist')
    search_go_artist(a[2]);
  else
    console.log("hashchange: unmatched tab name?");
}

window.addEventListener('hashchange', function() {
  hash_update();
});
