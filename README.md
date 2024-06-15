# Generador de Comprobantes PDF

Este proyecto es un servidor que genera comprobantes en formato PDF para entregar a los clientes luego de una compra finalizada. Está creado con Node.js, Express y PDFkit.

## Requisitos

- Node.js
- npm (Node Package Manager)
## stack tecnologico

**Server:** Node, Express, PDFkit
## Deployment

instalar dependencias

```bash
  npm install
```

levantar servidor

```bash
  npm start
```

## Parámetros del Endpoint
El endpoint debe recibir un JSON con los siguientes parámetros de ejemplo:
```json
{
    "nameCompany": "Tech Solutions S.A.",
    "addressCompany": "Av. Principal 123, Ciudad, País",
    "nameClient": "Juan Pérez",
    "addressClient": "Calle Secundaria 456, Ciudad, País",
    "numberVoucher": 1,
    "date": "",
    "numberOrder": 1,
    "products": 
            [
                {
                    "quantity": 2, 
                    "price":200, 
                    "nameProduct":"juguete"
                }
            ]
}
```

## API Reference
#### POST data and receive the pdf

```http
  POST http://localhost:3001
```
Envía los datos y recibe el PDF generado.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nameCompany`      | `string` | **Required**. nombre de la empresa |
| `addressCompany`      | `string` | **Required**. direccion de la empresa |
| `nameClient`      | `string` | **Required**. nombre de cliente |
| `addressClient`      | `string` | **Required**. direccion de cliente |
| `numberVoucher`      | `string` or  `number` | **Required**. numero de comprobante |
| `numberOrder`       | `string` or  `number` | **Required**. numero de orden |
| `date`      | `date` or "" or null | **Required**. fecha del comprobante, si es null automaticamente se agrega la fecha del dia |
| `products`       | `array de objetos` | **Required**. array de objetos, cada objeto es un producto con nombre, cantidad y precio. |
| `products[i].nameProduct`       | `string` | **Required**. nombre de producto |
| `products[i].quantity`       | `string` or  `number` | **Required**. cantidad de producto |
| `products[i].price`       | `string` or  `number` | **Required**. precio de producto |

