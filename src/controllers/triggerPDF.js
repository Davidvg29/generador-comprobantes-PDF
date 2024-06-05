const PDFDocument = require('pdfkit');
const fs = require('fs');

const triggerPF = (req, res) => {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Establecer la fuente
    doc.font('Helvetica-Bold');

    // Encabezado del comprobante
    doc.fontSize(20).text('Comprobante de Pago', { align: 'center' });

    // Agregar imagen del logotipo de la empresa
    // doc.image("logoVG.png", {
    //     fit: [100, 50],
    //     align: 'right',
    //     valign: 'top'
    // });

    // Información de la empresa
    doc.fontSize(12).text('Empresa XYZ', { align: 'center' });
    doc.fontSize(10).text('Dirección: Calle Principal 456');
    doc.text('Teléfono: 123-456-7890');
    doc.text('Email: info@empresa.com').moveDown(0.5);

    // Ajustar posición de texto para evitar superposición con la imagen
    const textStartY = doc.y + 10;

    // Línea divisoria
    doc.moveTo(0, textStartY).lineTo(612, textStartY).lineWidth(1).stroke();

    // Datos de ejemplo (puedes obtenerlos de la solicitud)
    const nombreCliente = 'Juan Perez';
    const direccion = 'Calle Principal 123';
    const producto = 'Producto A';
    const precio = '$50';
    const metodoPago = 'Tarjeta de crédito';

    // Agregar información del cliente y del producto al comprobante
    doc.fontSize(12).text(`Cliente: ${nombreCliente}`, 50, textStartY + 20);
    doc.text(`Dirección: ${direccion}`);
    doc.text(`Producto: ${producto}`);
    doc.text(`Precio: ${precio}`);
    doc.text(`Método de Pago: ${metodoPago}`).moveDown(0.5);

    // Fecha del comprobante
    const fecha = new Date().toLocaleDateString();
    doc.fontSize(12).text(`Fecha: ${fecha}`).moveDown(0.5);

    // Nota de agradecimiento
    doc.fontSize(12).text('¡Gracias por su compra!', { align: 'center', margin: { top: 30 } });

    // Finalizar el PDF
    doc.end();

    // Guardar el PDF en un archivo
    const outputPath = 'comprobante.pdf';
    doc.pipe(fs.createWriteStream(outputPath));

    // Responder con el PDF generado
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
};

module.exports = triggerPF;
