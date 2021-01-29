<?php
echo "HI";
include("connect.php");

//  include("mail.php");

if(isset($_POST["x"]))
{
    $obj=json_decode($_POST["x"]);
    
     $sql="INSERT INTO `customer`(`cust_ssn`, `name`, `phone`, `email`) VALUES ('$obj->ssn','$obj->name','$obj->phone','$obj->email')";
     if($conn->query($sql))
    {
        //  { $mail->addAddress("$obj->email");
    //     $mail->Subject="RENT A CAR";
    //     $mail->Body="<b>Thanks for choosing us !<br>Your Car has been booked</b>";
    //     if(!$mail->send()) {
    //             echo 'Message could not be sent.';
    //             echo 'Mailer Error: ' . $mail->ErrorInfo;
    //         } else {
    //             echo 'Message has been sent';
    //         }

         echo "customer data saved";
     }
     else
     {   
         echo "$conn->error";
     }
}
else{
    echo "0";
}
?>