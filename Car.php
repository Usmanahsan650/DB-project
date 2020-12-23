<?php
include("connect.php");
$sql="SELECT * FROM `car` WHERE 1;";
$data=$conn->query($sql);
if($data->num_rows>0)
{ $i=0;
    while($row[$i]=$data->fetch_assoc())
    {
       $i++; 
    }
    echo json_encode($row);
}
else{
    echo "no cars";
}

?>