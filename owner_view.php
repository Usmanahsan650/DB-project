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
           
         $sql="SELECT `name`, `reg_no`, `model`, `make`, `seats`, `rate`, `image`, `owner` FROM `db_pro`.`car` WHERE `owner`='$userssn';";
         $data=$con->query($sql);
         $row=$data-> fetch_assoc();
         echo "<table align=\"left\" border=\"1\" cellpadding=\"3\" cellspacing=\"0\" class=\"col-md-6\">";
         echo "<tr>";
         if($data->num_rows > 0)
         {
        foreach ($row as $key => $value) {
                
                echo "<td>";
                echo "<b>$key</b>";
                echo "</td>";
            }
            echo "</tr>";
        do{ 
            echo "<tr>";
             foreach($row as $key => $value)
             {
                echo "<td>";
                echo $value;
                echo "</td>";
             }
              echo "<td style= \" content:url($row[image]) ;width :10vw;height:7vw;\"</td>";
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
   else
    {
        echo "fail";
    }

    }
?>