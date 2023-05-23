<?php

function enviarCorreo($destinatario, $nombre){
    // Dirección de correo electrónico del remitente
    $remitente = 'robinson.arpi@ucuenca.edu.ec';
    // Dirección de correo electrónico del destinatario
    //$destinatario = 'robinson.arpi@gmail.com';
    // Asunto del correo
    $asunto = 'Correo de bienvenida con archivo adjunto';
    // Cuerpo del correo
    $cuerpo = 'Bienvenido '.$nombre.'. Este correo contiene un archivo adjunto PDF.';
    // Ruta al archivo adjunto PDF
    $archivo_adjunto = 'PDFS/'.$nombre.'.pdf';

    // Contenido del archivo adjunto
    $contenido_adjunto = file_get_contents($archivo_adjunto);

    // Encabezados del correo
    $encabezados = "From: $remitente\r\n";
    $encabezados .= "MIME-Version: 1.0\r\n";
    $encabezados .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";
    $encabezados .= "X-Mailer: PHP/" . phpversion();

    // Separador de partes del correo
    $separador = "--boundary\r\n";

    // Parte del texto del correo
    $texto = $separador;
    $texto .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
    $texto .= "Content-Transfer-Encoding: 7bit\r\n";
    $texto .= "\r\n";
    $texto .= $cuerpo;
    $texto .= "\r\n";

    // Parte del archivo adjunto
    $adjunto = $separador;
    $adjunto .= "Content-Type: application/pdf; name=\"archivo.pdf\"\r\n";
    $adjunto .= "Content-Transfer-Encoding: base64\r\n";
    $adjunto .= "Content-Disposition: attachment; filename=\"archivo.pdf\"\r\n";
    $adjunto .= "\r\n";
    $adjunto .= chunk_split(base64_encode($contenido_adjunto));
    $adjunto .= "\r\n";

    // Parte final del correo
    $final = $separador . "--\r\n";

    // Combinar todas las partes del correo
    $mensaje = $texto . $adjunto . $final;
    mail($destinatario, $asunto, $mensaje, $encabezados);
/* 
    // Enviar el correo
    if (mail($destinatario, $asunto, $mensaje, $encabezados)) {
        echo "Correo enviado con éxito";
    } else {
        echo "Error al enviar el correo";
    }

    $to = "robinson.arpi@gmail.com";
    $subject = "Probando mercury";
    $message = "Probando mercury";
    $headers = "From: robinson.arpi@ucuenca.edu.ec" . "\r\n";
    $headers .= "Reply-To: robinson.arpi@ucuenca.edu.ec" . "\r\n";
    $headers .= "Return-Path: robinson.arpi@ucuenca.edu.ec" . "\r\n";

    //Enviar el correo
    if (mail($to, $subject, $message, $headers)) {
        echo "Correo enviado con éxito";
    } else {
        echo "Error al enviar el correo";
    }*/
}
?>
