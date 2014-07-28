/* Tab routines */

var pages = [];

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

export function tab_add(name, id) {
  pages.push({'name': name, 'id': id});
}

export function tab_switch(id) {
  page_change(id);
}

/* Hash routines */

var locations = [];

var hash_known = "";

export function hash_set(h) {
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
  
  for (l in locations)
    if (a[1] == locations[l].name)
      return locations[l].f(a[2]);
  
  console.log("hashchange: unmatched tab name?");
}

export function hash_add(name, f) {
  locations.push({'name': name, 'f': f});
}

window.addEventListener('hashchange', function() {
  hash_update();
});

window.addEventListener('load', function() {
  hash_update();
});
