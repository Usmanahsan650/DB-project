<?php
 $_SERVER="localhost";
 $username="root";
 $password ="";
 $con=mysqli_connect($_SERVER,$username,$password);
 if(!$con)
 {
   echo "ERROR"."<script>console.log('fail');</script>";
   die("cant connect ". mysqli_connect_error());
 }
 else
 {
  $check=1;
  $obj = json_decode($_POST["x"], false);
  foreach($obj as $key => $value)
  {
    if($value ==NULL)
    {echo $value;
      $check=0;
    }
    
  }
  
  if($check==1)
  {
   // echo "success";
   // $name = $_POST['name'];
   // $id = $_POST['id'];
  $sql="INSERT INTO `db_pro`.`owner` (`name`, `SSN`,`addr`, `phone`, `email`, `pass`) VALUES ('$obj->name','$obj->ssn','$obj->addr',$obj->phone,'$obj->email','$obj->password');";
  if($con->query($sql)==1)
     { // echo "<br>Thanks for feedback"
    //  {  echo '<script> alert("success!");</script>';
        echo "Welcome ".$obj->name ."You are Successfully Registered";
    }   
      else
      {
        echo "Already registered (".$con->error .")"; 
        
      } 
  
    }
    else{
      echo "Please Fill All The Blanks";
    }
  // echo $obj->id;
  //echo $obj->name;
//    $sql="SELECT `Name`,`ID` FROM `mydb`.`input` where ID='$obj';";
//    // echo $sql;
//    $data=$con->query($sql);
 
//    if($data->num_rows > 0)
//   { // echo "<br>Thanks for feedback"
//  //  {  echo '<script> alert("success!");</script>';
//    $row = $data->fetch_assoc();
//      echo json_encode($row);
//  }   
//    else
//    {
     
//      echo '<h1>ALREADY SAVED YOUR DATA<br/>GO HOME</h1>'; 
//    }
 }
   ?>
