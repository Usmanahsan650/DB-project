<?php
echo "HI";
include("connect.php");
if(isset($_POST["x"]))
{
    $obj=json_decode($_POST["x"]);

     $sql="INSERT INTO `customer`(`cust_ssn`, `name`, `phone`, `email`) VALUES ('$obj->ssn','$obj->name','$obj->phone','$obj->email')";
     if($conn->query($sql))
     {
         echo "customer data saved";
     }
     else{
         echo "$conn->error";
     }
}
else{
    echo "0";
}
?>