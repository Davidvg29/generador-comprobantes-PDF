const triggerPDFValidations=(req)=>{
    let {nameCompany, addressCompany, nameClient, 
        addressClient, numberVoucher, date, 
        numberOrder, products}=req.body;

    let messages = [];

        if (Object.keys(req.body).length===0) {
            messages.push("No se puede obtener un comprobante vacio")
       }
        if(nameCompany==="" || nameCompany===false || nameCompany===undefined){
            messages.push("Debes agregar nombre de la empresa")
        }
        if(addressCompany==="" || addressCompany===false || addressCompany===undefined){
            messages.push("Debes agregar direccion de la empresa")
        }
        if(nameClient==="" || nameClient===false || nameClient===undefined){
            messages.push("Debes ingresar nombre de cliente")
        }
        if(addressClient==="" || addressClient===false || addressClient===undefined){
            messages.push("Debes ingresar direccion de cliente")
        }
        if(numberVoucher==="" || numberVoucher===false || numberVoucher===undefined){
            messages.push("Debes agregar numero de comprobante")
        }
        if(isNaN(Number(numberVoucher))){
            messages.push("Numero de comprobante solo puede ser numeros")
        }
        if(numberOrder==="" || numberOrder===false || numberOrder===undefined){
            messages.push("Debes agregar numero de orden")
        }
        if(isNaN(Number(numberOrder))){
            messages.push("Numero de orden solo puede ser numeros")
        }
        if(products===null || products===undefined || products.length===0){
            messages.push("No se puede hacer un comprobante sin productos")
        }
        
        if (products) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].nameProduct==="") {
                    messages.push(`Debes agregar el nombre del producto n° ${i+1}`)
                }
                if (products[i].quantity==="" || products[i].quantity===0) {
                    messages.push(`Debes agregar cantidad del producto n° ${i+1}`)
                }
                if (products[i].price==="" || products[i].price===0) {
                    messages.push(`Debes agregar el precio del producto n° ${i+1}`)
                }
                
            }
        }
        return messages
    }
        


module.exports=triggerPDFValidations;

// {
//     "nameCompany": "Tech Solutions S.A.",
//     "addressCompany": "Av. Principal 123, Ciudad, País",
//     "nameClient": "Juan Pérez",
//     "addressClient": "Calle Secundaria 456, Ciudad, País",
//     "numberVoucher": "123456789",
//     "date": "2024-06-13",
//     "numberOrder": "987654321",
//     "products": 
//             [
//                 {
//                     "quantity": 2, 
//                     "price":200, 
//                     "nameProduct":"juguete"
//                 }
//             ]
//   }