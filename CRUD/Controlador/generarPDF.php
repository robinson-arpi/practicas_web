<?php
require_once('Externo/TCPDF/tcpdf.php');
function generarPDF($nombre_personalizado) {
    // Crear una nueva instancia de TCPDF
    $pdf = new TCPDF();

    // Definir configuraciones del documento
    $pdf->SetCreator('Nombre de tu aplicación');
    $pdf->SetAuthor('Robinson');
    $pdf->SetTitle('Bienvenido');
    $pdf->SetSubject('Mensaje de bienvenida');
    $pdf->SetKeywords('bienvenido, hola');

    // Agregar contenido al PDF
    $pdf->AddPage();
    $pdf->SetFont('helvetica', '', 12);
    $pdf->Cell(0, 10, 'Bienvenido, ' . $nombre_personalizado . ', usted ha sido registrado exitosamente', 0, 1);

    // Generar el nombre personalizado del archivo PDF
    $nombre_archivo = $nombre_personalizado . '.pdf';

    // Ruta donde se encuentra el archivo PHP actual
    $ruta_actual = __DIR__;
    
    // Ruta completa del directorio "PDFS"
    $ruta_guardado = $ruta_actual . '/PDFS/'. $nombre_archivo;;

    // Guardar el PDF en el servidor con el nombre personalizado
    $pdf->Output($ruta_guardado, 'F');

    // Mostrar un mensaje de éxito
    // echo 'PDF generado y guardado en: ' . $ruta_guardado;
}

?>