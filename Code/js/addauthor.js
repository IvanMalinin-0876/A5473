
function pushbutton() {


    var author = document.getElementById("author-input-a").value;

   addauthor(author);
}


function addauthor(author) {

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             var respt = this.responseText;
            alert("Новый автор добавлен в базу данных ");
        }
    }
    var link =  './php/addauthor.php?author=' + author ;
    
    xmlhttp.open("GET", link , true);
    xmlhttp.send();


}