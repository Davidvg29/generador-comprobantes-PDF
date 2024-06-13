const PDFDocument = require('pdfkit');
const fs = require('fs');

const triggerPF = (req, res) => {

    let {nameCompany, addressCompany, name, address, numberVoucher, date, numberOrder, products}=req.body;

    // const numRandom = Math.floor(Math.random()*100)
    
    if (date=="" || date==null || date==false) {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()+1
        const day = new Date().getDate()

        date = `${day}/${month}/${year}`

    }

    if (Object.keys(req.body).length===0) {
         res.status(400).json({message:"no se puede obtener un comprobante vacio"})
    }

    //crea el PDF
    const doc = new PDFDocument({size: 'A4', margin: 50});

    //empieza el contenido del PDF
    function content(){
        doc.fontSize(20);
    doc.text("COMPROBANTE", 50, 30)
    doc.fontSize(10);
    doc.text(nameCompany ? nameCompany.toUpperCase(): false)
    doc.text(addressCompany ? addressCompany.toUpperCase(): false)
    
    doc.moveDown()
    
    doc.text("CLIENTE", 50, 100)
    doc.text(name ? name.toUpperCase() : false, 50, 115)
    doc.text(address ?  address.toUpperCase() : false, 50, 130)

    doc.text("N° COMPROBANTE", 350, 100)
    doc.text(Number(numberVoucher), 450, 100, {align: 'right'})

    doc.text("FECHA", 350, 115)
    doc.text(date, 450, 115, {align: 'right'})

    doc.text("N° DE PEDIDO", 350, 130)
    doc.text(Number(numberOrder), 450, 130, {align: 'right'})
    // doc.text("FECHA DE VENCIMIENTO", 350, 130)
    // doc.text("20/12/2024", 450, 130, {align: 'right'})
    doc.moveDown()
    
    doc.moveTo(50, 155)  // Punto de inicio de la línea
   .lineTo(545, 155)  // Punto final de la línea
   .stroke()

    doc.text("CANT.", 60, 160)
    doc.text("DESCRIPCIÓN", 180, 160)
    doc.text("PRECIO U.", 350, 160)
    doc.text("IMPORTE", 490, 160)
    
    doc.moveTo(50, 173)  // Punto de inicio de la línea
    .lineTo(545, 173)  // Punto final de la línea
    .stroke()
    }
    content()
    let positionY = 180;
    let total = 0;
    // let num = 100
    
    if(products===null || products===undefined || products.length===0){
        res.status(400).json({message:"no se puede hacer un comprobante sin productos"})
   }else{
    for (let i = 0; i < products.length; i++) {
        if ((i + 1) % 25 === 0){
            doc.addPage()
            content()
            positionY = 180;
        }
        doc.text(products[i].quantity, 50, positionY, {width: 50, align: 'center', backgroundColor: 'blue'})
        doc.text(products[i].nameProduct, 100, positionY, {width: 240, align: 'left'})
        doc.text(products[i].price, 350, positionY, {width: 50, align: 'right'})
        doc.text(Number(products[i].quantity*products[i].price), 450, positionY, {width: 85, align: 'right'})
        doc.moveTo(50, positionY+12)  // Punto de inicio de la línea
        .lineTo(545, positionY+12)  // Punto final de la línea
        .stroke()
        positionY+=20;
       total += products[i].quantity*products[i].price
    }
    }
    doc.fontSize(12);
    doc.text("TOTAL", 350, positionY+30, {width: 50, align: 'right'})
    doc.text(`$ ${total}`, 450, positionY+30, {width: 85, align: 'right'})

    doc.fontSize(15);
    doc.font('Helvetica-BoldOblique')
    doc.text("¡GRACIAS POR SU COMPRA!", 250, positionY+70, {align: 'right'})

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
