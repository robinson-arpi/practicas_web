<?php
require_once('Externo/TCPDF/tcpdf.php');
require_once('Externo/TCPDF/tcpdf.php');

function generarPDF($nombre_personalizado) {
    // Crear una nueva instancia de TCPDF
    $pdf = new TCPDF();

    // Definir configuraciones del documento
    $pdf->SetCreator('CRUD');
    $pdf->SetAuthor('Robinson');
    $pdf->SetTitle('Bienvenido');
    $pdf->SetSubject('Mensaje de bienvenida');
    $pdf->SetKeywords('bienvenido, hola');

    // Establecer el margen superior e inferior más grandes para dar espacio al encabezado y pie de página
    $pdf->SetMargins(15, 35, 15);

    // Agregar contenido al PDF
    $pdf->AddPage();

    // Establecer la fuente y el tamaño para el título
    $pdf->SetFont('helvetica', 'B', 20);

    // Obtener el ancho y alto de la página
    $ancho_pagina = $pdf->GetPageWidth();
    $alto_pagina = $pdf->GetPageHeight();

    // Agregar un encabezado con el título
    $pdf->Cell($ancho_pagina - 30, 20, 'Bienvenido', 0, 1, 'C');

    // Establecer la fuente y el tamaño para el contenido
    $pdf->SetFont('helvetica', '', 12);

    // Agregar un espacio antes del contenido
    $pdf->Ln(10);

    // Agregar el contenido del mensaje
    $pdf->MultiCell($ancho_pagina - 30, 10, 'Estimado ' . $nombre_personalizado . ',', 0, 'L');
    $pdf->Ln(5);
    $pdf->MultiCell($ancho_pagina - 30, 10, 'Le damos la bienvenida a nuestra plataforma.', 0, 'L');
    $pdf->Ln(10);
    $pdf->MultiCell($ancho_pagina - 30, 10, 'Esperamos que disfrute de nuestros servicios y estaremos encantados de atender cualquier consulta o solicitud que tenga.', 0, 'L');

    // Generar el nombre personalizado del archivo PDF
    $nombre_archivo = $nombre_personalizado . '.pdf';

    // Ruta donde se encuentra el archivo PHP actual
    $ruta_actual = __DIR__;

    // Ruta completa del directorio "PDFS"
    $ruta_guardado = $ruta_actual . '/PDFS/' . $nombre_archivo;

    // Guardar el PDF en el servidor con el nombre personalizado
    $pdf->Output($ruta_guardado, 'F');
}
?>