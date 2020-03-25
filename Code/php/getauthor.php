

  <?php	
			$q=$_GET["q"];
			include("./DB_connect.php");
			$resp='{ "author": [';
			$sql = "SELECT * FROM `Author` ";
			$result = mysqli_query($dbcon, $sql);			
			
			while ($row = mysqli_fetch_assoc($result)) {
			
				$nbNum   = htmlentities($row['authorId']);
				$nbName  = htmlentities($row['name']);
			

$resp = $resp.
'{'.
'"id": '.$nbNum.','.
'"name": "'.$nbName.'"'.
'},';

	}
	
	
$nbNum= 0;
$nbName = null;

$resp = $resp.
'{'.
'"id": '.$nbNum.','.
'"name": "'.$nbName.'"'.
'}';	
	
	
$resp = $resp.' ] } ';

echo  $resp;
			

?>
