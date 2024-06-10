const PDFDocument = require('pdfkit');
const fs = require('fs');

const triggerPF = (req, res) => {
    const numRandom = Math.floor(Math.random()*100)

    //crea el PDF
    const doc = new PDFDocument({size: 'A4', margin: 50});

    //empieza el contenido del PDF
    doc.fontSize(30);
    doc.text("COMPROBANTE", 50, 30)
    doc.fontSize(10);
    doc.text('Nombre Empresa.')
    doc.text('Direccion Empresa')
    doc.moveDown()
    doc.text("CLIENTE", 50, 100)
    doc.text("Nombre Cliente")
    doc.text("Direccion Cliente")

    doc.text("N° COMPROBANTE", 350, 100)
    doc.text("23423", 450, 100, {align: 'right'})
    doc.text("FECHA", 350, 110)
    doc.text("20/12/2024", 450, 110, {align: 'right'})
    doc.text("N° DE PEDIDO", 350, 120)
    doc.text("23423", 450, 120, {align: 'right'})
    doc.text("FECHA DE VENCIMIENTO", 350, 130)
    doc.text("20/12/2024", 450, 130, {align: 'right'})
    doc.moveDown()
    
    doc.moveTo(50, 145)  // Punto de inicio de la línea
   .lineTo(545, 145)  // Punto final de la línea
   .stroke()

    doc.text("CANT.", 60, 150)
    doc.text("DESCRIPCIÓN", 180, 150)
    doc.text("PRECIO U.", 350, 150)
    doc.text("IMPORTE", 490, 150)
    
    doc.moveTo(50, 165)  // Punto de inicio de la línea
    .lineTo(545, 165)  // Punto final de la línea
    .stroke()
    
    doc.text("1222", 70, 170, {align: 'left'})

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
