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
        if(isset($_POST["X"]))
        { 
            $userssn=$_POST["X"];
           
         $sql="SELECT `name`, `reg_no`, `model`, `make`, `seats`, `rate`, `image` FROM `db_pro`.`car` WHERE `owner`='$userssn';";
         $data=$con->query($sql);
         $row=$data-> fetch_assoc();
         echo "<table align=\"left\" border=\"1\" cellpadding=\"3\" cellspacing=\"0\" class=\"col-md-6\">";
         echo "<tr>";
         if($data->num_rows > 0)
         {
        foreach ($row as $key => $value) {
                if($key=="image")
                    continue;
                echo "<th>";
                echo "<b>$key</b>";
                echo "</th>";
            }
            echo "</tr>";
        do{ 
            
            echo "<tr>";
             foreach($row as $key => $value)
             {
                 if($key=="image")
                continue;
                 
                echo "<td>";
                echo $value;
                echo "</td>";
             }
           echo "<td style= \" content:url($row[image]) ;width :10vw;height:10vw;\"</td>";
        }while($row=$data->fetch_assoc());

        echo "</table>";
         }   //  echo "<table align=\"left\" border=\"1\" cellpadding=\"3\" cellspacing=\"0\">";
        // for($i=1;$i<=6;$i++)
        // {
        // echo "<tr>";
        // for ($j=1;$j<=5;$j++)
        //   {
        //   echo "<td>$i * $j = ".$i*$j."</td>";
        //   }
        //  echo "</tr>";
        //  }

    }
   else if(isset($_POST["del"]))
    {   
        $reg=$_POST["del"];
        echo $reg;
        $sql1="SELECT `image`, `owner` FROM `db_pro`.`car` WHERE `reg_no`='$reg'; ";
        $data=$con->query($sql1);
        $row=$data->fetch_assoc();
       if( unlink($row["image"]))
       { 
        $sql="DELETE FROM `db_pro`.`car` WHERE `reg_no`='$reg';";
        if($con->query($sql))
        {
            echo "Removed Your Car !";
        }
        else{
            echo"Error ";
        }
    }else
       echo "Not Found";
    }else
    {
    echo "Error 9";
    }
    }
?>