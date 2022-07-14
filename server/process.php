<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

error_reporting(E_ALL);

session_start();

if(isset($_POST['name'])) {
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if($name == "" || $email == "" || $message == "") {
        header("location: ../index.html");
    } else {
        $emailData = [ 'name' => $name, 'email' => $email, 'message' => $message];
        if(sendEmail($emailData)) {
            header("location: ../index.html");
        } else {
            header("location: ../index.html");
        }
    }
}

function sendEmail($emailData) {
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Username = 'smtpxonline@gmail.com';
    $mail->Password = 'yohrqopkctxhuuet';
    $mail->setFrom($emailData['email'], $emailData['name']);
    $mail->addAddress('contact@xonline.io', 'Xonline');
    $mail->Subject = 'Email From ' . $emailData['name'];
    $mail->isHTML(true);
    $mail->msgHTML(get_include_contents('to.php', $emailData));
    if (!$mail->send()) {
        return false;
    } else {
        return true;
    }
}

function get_include_contents($filename, $variablesToMakeLocal) {
    extract($variablesToMakeLocal);
    if (is_file($filename)) {
        ob_start();
        include $filename;
        return ob_get_clean();
    }
    return false;
}