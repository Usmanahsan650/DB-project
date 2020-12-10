<?php
$con=mysqli_connect("localhost","root","");
if(!$con)
{
    echo "Con fail";
    die("cant connect ". mysqli_connect_error());
}
else{
    $obj=json_decode($_POST["x"],false);
    $sql="SELECT * FROM `db_pro`.`owner` where`email`='$obj->email' and `pass`='$obj->pass';";
    $data=$con->query($sql);
    if($data->num_rows > 0)
    {
       $row=$data-> fetch_assoc();
        echo json_encode($row);      //sending object of the active user
    }  
   else{
       echo 0;
   }
}
?>