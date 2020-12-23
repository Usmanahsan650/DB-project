<?php 
	$conn = mysqli_connect("localhost","root","","db_pro");

	if(!$conn){
		echo "Connection Failed!!! <br>".mysqli_connect_error();
	}
 ?>