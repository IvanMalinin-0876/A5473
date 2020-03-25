var auhtorlist = "";
var authorjson;
var authorStoreRR;
getAuthor();



var tableConfigR = {
    headers: ["UAN", "Ф.И.О"],
    rowKeys: ["position", "author"]
}


function shouldPerformSearchR(query) {
    drawTableR(searchAuthor(query), tableConfigR);
}


function beginsWithR(s, query) {
    return s.substring(0, query.length) === query;
}


function searchAuthor(query) {

    // If the query is an empty string, we'll return all of the authors.
    if (query === "") {
        return authorStoreRR;
    }


    function isMatchR(author) {

        return beginsWithR(author.author.toLowerCase(), query.toLowerCase());
    }

    return filter(authorStoreRR, isMatchR);
}


byId("search-button-a").addEventListener('click', function() {
    var query = byId("search-input-a").value; // get the query from the input
    shouldPerformSearchR(query); // call shouldPerformSearchR
});

function drawTableR(rows, config) {
    var headers = config.headers;
    var rowKeys = config.rowKeys;

    if (!headers || !Array.isArray(headers)) {
        console.error("ERROR: invalid headers. Must be an array!", headers);
    } else if (!rowKeys || !Array.isArray(rowKeys)) {
        console.error("ERROR: invalid row keys. Must be an array!", rowKeys);
    } else if (!rows || !Array.isArray(rows)) {
        console.error("ERROR: invalid row data. Must be an array!", rows);
    } else {
        setTableHeaderR(headers);
        setTableBodyR(rows, rowKeys);
    }
}

function setTableHeaderR(headers) {

    var tblHead = byId("table-head-a");
    removeChildren(tblHead);
    var row = elt("tr");
    row.appendChild(elt("th", "#"));
    each(headers, function(header) {
        row.appendChild(elt("th", header));
    });
    tblHead.appendChild(row);
}

function setTableBodyR(authors, keys, onClick) {
    var el = byId("table-body-a");
    removeChildren(el);
    var rows = map(authors, function(author, i) {
        var xs = map(keys, function(k) {
            if (typeof k === "object") {
                return k.format(author[k.key]);
            }
            return author[k];
        });

        var row = makeRow([i + 1].concat(xs));
        if (onClick) {
            row.addEventListener('click', function(evt) {
                console.log("Clicked row:", row);
                onClick(author, row, evt);
            });
        }
        return row
    });
    addChildren(el, rows);
}

function makeRow(entries) {
    var row = elt("tr");
    each(entries, function(entry) {
        row.appendChild(elt("td", entry));
    });
    return row;
}


function getTable() {
    return byId("primary-table-a")
}

function elt(tag, text, attrs) {
    var e = document.createElement(tag);
    var textNode;
    if (text) {
        textNode = document.createTextNode(text);
        e.appendChild(textNode);
    }

    if (attrs) {
        for (var key in attrs) {
            e.setAttribute(key, attrs[key]);
        }
    }

    return e;
}

function byId(id) {
    return document.getElementById(id);
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function show(el) {
    if (hasClass(el, "hidden")) {
        removeClass(el, "hidden");
    }
}

function hide(el) {
    if (!hasClass(el, "hidden")) {
        addClass(el, "hidden");
    }
}

function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function addChildren(el, children) {
    each(children, function(row) {
        el.appendChild(row);
    });
}

function each(list, f) {
    for (var i = 0; i < list.length; i++) {
        f(list[i], i);
    }
}

function map(list, f) {
    var result = [];
    each(list, function(x, i) {
        result.push(f(x, i));
    });
    return result;
}

function filter(list, pred) {
    var result = [];
    each(list, function(x) {
        if (pred(x))
            result.push(x);
    });
    return result;
}

function getAuthor() {
    var str = "";
    var json = "";
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respt = this.responseText;
            auhtorlist = this.responseText;
            authorjson = JSON.parse(auhtorlist);
            var authorStoreR = generateAuthorStore();
            authorStoreRR = authorStoreR;
            drawTableR(authorStoreR, tableConfigR);
        }
    }
    xmlhttp.open("GET", "./php/getauthor.php?q=" + str, true);
    xmlhttp.send();
    return json;

}

function generateAuthorStore() {

    var dataauthors = authorjson;
    var authorStoreR = [];

    function createAuthor(data_author) {

        return {
            position: data_author.id,
            author: data_author.name,

        }
    }

    function createAuthorStore(arr) {
        var arg = arr.author;
        for (var i = 0; i < arg.length; i++) {
            var authorpart = createAuthor(arg[i]);

            if (authorpart.name != "") {
                authorStoreR.push(authorpart);
            };
        }
        return authorStoreR
    }
    return createAuthorStore(dataauthors);
}