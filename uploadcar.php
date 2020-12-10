//php to register the car into data base
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
    else{
            $ext=explode(".",$_FILES["image"]["name"]);
            $ext=strtolower(end($ext));
            $target_dir="images/";
            do{
                $name=rand(1,9999).".".$ext;
                $location=$target_dir.$name;
            
            }while(file_exists($location));
            $obj=new stdClass();
            $obj->name=$_POST["name"];
            $obj->reg_no=$_POST["reg_no"];
            $obj->model=$_POST["model"];
            $obj->make=$_POST['make'];
            $obj->seats=$_POST["seats"];
            $obj->rate=$_POST["rate"];
            $obj->owner=$_POST["owner"];
            move_uploaded_file($_FILES["image"]["tmp_name"],$location);
            $sql="INSERT INTO `db_pro`.`car`(`name`, `reg_no`, `model`, `make`, `seats`, `rate`, `image`, `owner`) VALUES ('$obj->name','$obj->reg_no','$obj->model','$obj->make','$obj->seats','$obj->rate','$location','$obj->owner');";
            if($con->query($sql)==1)
            {
              echo "Thanks for registering";
            }else{
              echo"Error :".$con->error;
            }

    }
?>