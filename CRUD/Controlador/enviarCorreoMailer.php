<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'Externo/PHPMailer/src/Exception.php';
require 'Externo/PHPMailer/src/PHPMailer.php';
require 'Externo/PHPMailer/src/SMTP.php';


function enviarCorreo($destinatario, $nombre){
    try{
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'robinson.arpi@gmail.com';
        $mail->Password = 'vatsrafjndmuiqxd';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('robinson.arpi@gmail.com', 'Robinson');
        
        if (!$mail->validateAddress($destinatario)) {
            return "Direccion de correo no valida";
        }
    
        $mail->addAddress($destinatario, $nombre);


        $mail->Subject = 'Programacion WEB: Mensaje de bienvenida';
        $mail->Body = $nombre.', usted ha sido registrado(a). Se le adjunta el PDF con su mensaje de bienvenida';

        $mail->addAttachment('PDFS/'.$nombre.'.pdf', $nombre.'.pdf');

        $mail->send();
        return 'enviado';
    }catch (Exception $e) {
        return 'Error al enviar el correo: ' . $mail->ErrorInfo;
    }
}
?>
