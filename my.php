 <?php
  $check=0;
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
      $obj=$_POST["x"];
      // echo "success";
      // $name = $_POST['name'];
      // $id = $_POST['id'];
      // $sql="INSERT INTO `mydb`.`input` (`id`,`name`) VALUES ('$id','$name');";'
      // echo $obj->id;
     
      $sql="SELECT `Name`,`ID` FROM `mydb`.`input` where ID='$obj';";
      // echo $sql;
      $data=$con->query($sql);
    
      if($data->num_rows > 0)
     { // echo "<br>Thanks for feedback"
    //  {  echo '<script> alert("success!");</script>';
      $row = $data->fetch_assoc();
        echo json_encode($row);
    }   
      else
      {
        
        echo '<h1>ALREADY SAVED YOUR DATA<br/>GO HOME</h1>'; 
      }
    }
      ?>
