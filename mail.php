<?php
function sendmail($to,$a,$f,$t)
{
    $msg="<html>
    <head>
    <title style:'border: 1px solid black'>HTML email</title>
    </head>
    <body>
    <p><b>Your Car is booked Successfully!</br>INFO :</br></b></p>
    <table>
    <tr style:'border: 1px solid black'>
    <th style:'border: 1px solid black'>From(Date)</th>
    <th style:'border: 1px solid black'>To(Date)</th>
    <th style:'border: 1px solid black'>Total Rent </th>
    </tr>
    <tr style:'border: 1px solid black'>
    <td style:'border: 1px solid black'>$f</td>
    <td style:'border: 1px solid black'>$t</td>
    <td style:'border: 1px solid black'>$a<td>
    </tr>
    </table>
    </body>
    </html>
    ";
    $subject = "THANKS FOR BOOKING";
    $headers = "From: Rent A Car" . "\r\n";
    $headers.= "MIME-Version: 1.0" . "\r\n";
    $headers.= "Content-type:text/html;charset=UTF-8" . "\r\n";
    mail($to,$subject,$msg,$headers);
}
?>