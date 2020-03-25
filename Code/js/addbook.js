
function pushbutton() {


    var namebook = document.getElementById("name-input-a").value;
    var pageCount = document.getElementById("pageCount-input-a").value;
    var author = document.getElementById("author-input-a").value;

   addbook(namebook,pageCount,author);
}


function addbook(namebook,pageCount,author) {

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             var respt = this.responseText;
            alert("Новая книга добавлена  в базу данных ");
        }
    }
    var link =  './php/addbook.php?name=' + namebook   + 
    '&pageCount=' + pageCount +
    '&author=' + author;
    
    xmlhttp.open("GET", link , true);
    xmlhttp.send();


}