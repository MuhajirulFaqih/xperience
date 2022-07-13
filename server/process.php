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
        echo json_encode(["status" => "error", "message" => "Please complete all data!"]);
    } else {
        $emailData = [ 'name' => $name, 'email' => $email, 'message' => $message];
        if(sendEmail($emailData)) {
            echo json_encode(["status" => "success", "message" => "Your message has been sent"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to send email"]);
        }
    }
}

function sendEmail($emailData) {
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'xonline.io';
    $mail->Port = 465;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Username = 'contact@xonline.io';
    $mail->Password = 'plainthing123';
    $mail->setFrom($emailData['email'], $emailData['name']);
    $mail->addAddress('contact@xonline.io', 'X-Online');
    if ($mail->addReplyTo($emailData['email'], $emailData['name'])) {
        $mail->Subject = 'Email From Website X-Online';
        $mail->isHTML(true);
        $mail->msgHTML(get_include_contents('to.php', $emailData));
        if (!$mail->send()) {
            echo $mail->ErrorInfo;
        } else {
            return true;
        }
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