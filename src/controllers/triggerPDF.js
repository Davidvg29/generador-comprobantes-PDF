const PDFDocument = require('pdfkit');
const fs = require('fs');

const triggerPF = (req, res) => {
    const numRandom = Math.floor(Math.random()*100)

    //crea el PDF
    const doc = new PDFDocument({size: 'A4'});

    //empieza el contenido del PDF
    doc.fontSize(30);
    doc.text("COMPROBANTE", 50, 30)
    doc.fontSize(10);
    doc.text('Nombre Empresa.')
    doc.text('Direccion Empresa')
    doc.moveDown()
    doc.text("CLIENTE", 50, 150)
    doc.text("Nombre Cliente")
    doc.text("Direccion Cliente")

    doc.text("N° COMPROBANTE", 300, 150)
    doc.text("23423", 450, 150)
    doc.text("FECHA", 300, 160)
    doc.text("20/12/2024", 450, 160)
    doc.text("N° DE PEDIDO", 300, 170)
    doc.text("23423", 450, 170)
    doc.text("FECHA DE VENCIMIENTO", 300, 180)
    doc.text("20/12/2024", 450, 180)
    //finaliza el contenido del PDF

    //finaliza el PDF
    doc.end()

    //guarda el PDF
    // doc.pipe(fs.createWriteStream(`comprobante_${numRandom}.pdf`))

    //response http con el PDF
    res.setHeader('Content-Type', 'application/pdf')
    doc.pipe(res)

};

module.exports = triggerPF;
