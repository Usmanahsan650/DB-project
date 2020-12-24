<?php
include("connect.php");
echo "jj";
if(isset($_POST["rate"]))
{  $input = $_POST["from"]; 
    $date = strtotime($input); 
     $from = date('y/m/d h:i:s', $date);
     $input = $_POST["to"]; 
    $date = strtotime($input); 
     $to = date('y/m/d h:i:s', $date);
     echo $from;
     $f = new DateTime("20".$from);
     $t = new DateTime("20".$to);
    //  $to=date_create($to);
    //  $from=date_create($from);
    // // $from=date_format($_POST["from"],"y/m/d");
    // $to=date_format($_POST["to"],"y/m/d"); 
    $rate=$_POST["rate"];
    $diff=date_diff($f,$t);
    $diff=$diff->format("%a");
    $from = date('y/m/d', $date);
    $to = date('y/m/d', $date);
    echo $diff;
    if($diff<0)
    {
        die("Invalid date");
    }
    $amt=$diff*($_POST["rate"]);
    $car=$_POST["car_reg"];
    $owner=$_POST["owner"];
    $cust=$_POST["cust_ssn"];
    $sql="INSERT INTO `bill`(`cust_ssn`, `owner_ssn`, `amount`) VALUES ('$cust','$owner','$amt')";
    if($conn->query($sql))  //bill inserted
    {         echo "done";
        $sql="SELECT `bill_no` FROM `bill` WHERE 1";
        $data=$conn->query("$sql");
        $billno=0;
        while($row=$data->fetch_assoc())
        { 
          $billno=$row["bill_no"];  
        }
         echo "$billno is bill";
        $sql="INSERT INTO `book`( `From_date`, `to_date`, `cust_ssn`, `car_reg`, `bill_no`) VALUES ('$from','$to','$cust','$car','$billno')";
        if($conn->query("$sql"))
        {
            echo "1";
        }
        else
           echo $conn->error;

    }else
       echo "0";

}
?>