  <?php	
			$q=$_GET["q"];
			include("./DB_connect.php");
			
			
			
			$resp='{ "book": [';
			$sql = "SELECT * FROM `Book` ";
			$result = mysqli_query($dbcon, $sql);			
			
			while ($row = mysqli_fetch_assoc($result)) {
			
				$nbNum   = htmlentities($row['bookId']);
				$nbName  = htmlentities($row['name']);
				$nbPages = htmlentities($row['pageCount']);
				$nbAutor = htmlentities($row['author']);

$resp = $resp.
'{'.
'"id": '.$nbNum.','.
'"name": "'.$nbName.'",'.
'"pages": '.$nbPages.','.
'"author": "'.$nbAutor.'"'.
'},';

	}
	
	
$nbNum= 0;
$nbName = null;
$nbPages = 0;
$nbAutor = null;

$resp = $resp.
'{'.
'"id": '.$nbNum.','.
'"name": "'.$nbName.'",'.
'"pages": '.$nbPages.','.
'"author": "'.$nbAutor .'"'.
'}';	
	
	
$resp = $resp.' ] } ';

echo  $resp;
			?>