var bookStore = generateBookStore();

var tableConfig = {
    headers: ["Номер", "Название", "Количество страниц", "Автор"],
    rowKeys: ["position", "title", "pages", "author"]
}

drawTable(bookStore, tableConfig);


function shouldPerformSearch(query) {
    drawTable(searchBooks(query), tableConfig);
}


function beginsWith(s, query) {
    return s.substring(0, query.length) === query;
}


function searchBooks(query) {

    // If the query is an empty string, we'll return all of the books.
    if (query === "") {
        return bookStore;
    }


    function isMatch(book) {

        return beginsWith(book.title.toLowerCase(), query.toLowerCase());
    }

    return filter(bookStore, isMatch);
}


byId("search-button").addEventListener('click', function() {
    var query = byId("search-input").value; // get the query from the input
    shouldPerformSearch(query); // call shouldPerformSearch
});

function drawTable(rows, config) {
    var headers = config.headers;
    var rowKeys = config.rowKeys;

    if (!headers || !Array.isArray(headers)) {
        console.error("ERROR: invalid headers. Must be an array!", headers);
    } else if (!rowKeys || !Array.isArray(rowKeys)) {
        console.error("ERROR: invalid row keys. Must be an array!", rowKeys);
    } else if (!rows || !Array.isArray(rows)) {
        console.error("ERROR: invalid row data. Must be an array!", rows);
    } else {
        setTableHeader(headers);
        setTableBody(rows, rowKeys);
    }
}

function setTableHeader(headers) {

    var tblHead = byId("table-head");
    removeChildren(tblHead);
    var row = elt("tr");
    row.appendChild(elt("th", "#"));
    each(headers, function(header) {
        row.appendChild(elt("th", header));
    });
    tblHead.appendChild(row);
}

function setTableBody(books, keys, onClick) {
    var el = byId("table-body");
    removeChildren(el);
    var rows = map(books, function(book, i) {
        var xs = map(keys, function(k) {
            if (typeof k === "object") {
                return k.format(book[k.key]);
            }
            return book[k];
        });

        var row = makeRow([i + 1].concat(xs));
        if (onClick) {
            row.addEventListener('click', function(evt) {
                console.log("Clicked row:", row);
                onClick(book, row, evt);
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
    return byId("primary-table")
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


function generateBookStore() {

    var databooks = {
        "book": [{
                "id": 1,
                "name": "werewrewerwer",
                "pages": 123,
                "author": "ssdfss"
            },
            {
                "id": 2,
                "name": "qdvfdsfsd",
                "pages": 675,
                "author": "sdfsdf"
            },
            {
                "id": 3,
                "name": "dfgdfgdg",
                "pages": 345,
                "author": "wtrtete"
            }
        ]
    };

    var bookStore = [];
  
    function createBook(data_books) {

        return {
            position:   data_books.id,
            title:      data_books.name,
            pages:      data_books.pages,
            author:     data_books.author
        }
    }

    function createBookStore(arr) {
        var arg= arr.book;
        for (var i = 0; i < arg.length; i++) {
            var bookpart = createBook(arg[i]);
            bookStore.push(bookpart);
        }
        return bookStore
    }
    return createBookStore(databooks);
}