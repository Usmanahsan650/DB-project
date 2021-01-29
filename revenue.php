<?php
include("connect.php");
if(isset($_GET["ssn"]))
{   $ssn=$_GET["ssn"];
    $sql="SELECT SUM(bill.amount) from bill where bill.owner_ssn='$ssn'";
    $data=$conn->query("$sql");
     if($data->num_rows>=1)
     {
         $row=$data->fetch_assoc();
         echo $row["SUM(bill.amount)"];
     }
     else if($data->num_rows==0)
     {
         echo "0";
     }
     else
        echo "0".$conn->error;
}
?>