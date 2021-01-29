<?php
include("connect.php");
include("mail.php");
if(isset($_POST["rate"]))
{  $input = $_POST["from"]; 
    $date = strtotime($input); 
     $from = date('y/m/d h:i:s', $date);
     $input = $_POST["to"]; 
    $date = strtotime($input); 
     $to = date('y/m/d h:i:s', $date);
    //  echo $from;
     $f = new DateTime("20".$from);
     $t = new DateTime("20".$to);
    //  $to=date_create($to);
    //  $from=date_create($from);
    // // $from=date_format($_POST["from"],"y/m/d");
    // $to=date_format($_POST["to"],"y/m/d"); 
    $rate=$_POST["rate"];
    $diff=date_diff($f,$t);
    $diff=$diff->format("%a");
    $input =$_POST["from"];
    $date = strtotime($input); 
    $from = date('y/m/d', $date);
    $date = strtotime($from); 
    $input = $_POST["to"]; 
    $date = strtotime($input); 
    $to = date('y/m/d', $date);     

    $car=$_POST["car_reg"];
    $sql="SELECT * FROM booking WHERE ((`From_date` BETWEEN '$from' AND '$to') OR (to_date BETWEEN '$from' AND '$to'))AND car_reg='$car'";
     $data=$conn->query("$sql");
    // $mydate=getdate();
    $today = new DateTime('now');
    // $check= $f->format("d")-$mydate["mday"];

    if($diff<0||$f<$today||$data->num_rows>0||$f>$t)
    {

        die("Invalid date $data->num_rows $diff");
    }
    $amt=$diff*($_POST["rate"]);
    //$car=$_POST["car_reg"];
    $owner=$_POST["owner"];
    $cust=$_POST["cust_ssn"];
    $sql="INSERT INTO `bill`(`cust_ssn`, `owner_ssn`, `amount`) VALUES ('$cust','$owner','$amt')";
    if($conn->query($sql))  //bill inserted
    {        
        
        $sql="SELECT `bill_no` FROM `bill` WHERE `cust_ssn`='$cust'";
        $data=$conn->query("$sql");
        $billno=0;
        while($row=$data->fetch_assoc())
        { 
          $billno=$row["bill_no"];  
        }
        //  echo "$billno is bill";
        $sql="INSERT INTO `booking`( `From_date`, `to_date`, `cust_ssn`, `car_reg`, `bill_no`) VALUES ('$from','$to','$cust','$car','$billno')";
        if($conn->query("$sql"))
        {   
            $email=$_POST["c_email"];
            sendmail($email,$amt,$from,$to);
            echo "1"; 
            
            //perfect
        //     $sql="SELECT `bookid` FROM `book` WHERE `bill_no`='$billno'";
        //     $data=$conn->query("$sql");
        //     $bookid=0;
        //     while($row=$data->fetch_assoc())
        //     { 
        //       $bookid=$row["bookid"];  
        //     }
        //  $sql="UPDATE `bill` SET `booking`='$bookid' WHERE `bill_no`='$billno' ";
        //  if($conn->query("$sql"))
        //  {
        //      echo "1";
        //  }
        //  else{
            // $sql="DELETE FROM `bill` WHERE `bill_no`='$billno";
        //     if($conn->query("$sql"))
        //     {
        //      echo "0";
        //     }
        //  }
        }
        else
        { $sql="DELETE FROM `bill` WHERE `bill_no`='$billno'";
          if($conn->query("$sql"))
            {
             echo "0";
            }
            else
           echo $conn->error;
        }

    }else
       echo "bill".$conn->error;

}
?>