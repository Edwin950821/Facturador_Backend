const express = require("express")
const cors = require("cors")
const { Client } = require("pg")
const app = express()
app.use(cors())
app.use(express.json())
const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
  }
  const client = new Client(connectionData)
app.listen(8080, () => { 
    client.connect()
    console.log("Servidor funcionando") 
})

app.get("/bodegas", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    client.query("select * from bodegas order by id ").then(response => {
        res.send(response.rows)
    })
})

app.get("/facturas", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    client.query("select * from facturas order by id").then(response => {
        res.send(response.rows)
    })
})

app.get("/productos", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    client.query("select * from productos order by id").then(response => {
        res.send(response.rows)
    })
})

app.post("/bodegas", (req, res) => {
    client.query(`select max(id) from bodegas`).then(response => {
        client.query(`insert into bodegas (id, nombre, direccion) values (${Number(response.rows[0].max) + 1} , '${req.body.nombre}', '${req.body.direccion}')`).then(saved => {
        })
    })
    res.end()
})

app.post("/facturas", (req, res) => {
    client.query(`select max(id) from facturas`).then(response => {
        client.query(`insert into facturas (id, total) values (${Number(response.rows[0].max) + 1} , '${req.body.total}')`).then(saved => {
        })
    })
    res.end()
})

app.post("/productos", (req, res) => {
    client.query(`select max(id) from productos`).then(response => {
        client.query(`insert into productos (id, nombre, descripcion, precio) values (${Number(response.rows[0].max) + 1} , '${req.body.nombre}', '${req.body.descripcion}', '${req.body.precio}')`).then(saved => {
        })
    })
    res.end()
})

app.delete("/bodegas/:id", (req, res) => {
    const bodegaId = req.params.id || ""
    client.query(`delete from bodegas where id= ${bodegaId}`).then(response => {
        
    })
    res.end()
})

app.delete("/facturas/:id", (req, res) => {
    const facturasId = req.params.id || ""
    client.query(`delete from facturas where id= ${facturasId}`).then(response => {
        
    })
    res.end()
})

app.delete("/productos/:id", (req, res) => {
    const productosId = req.params.id || ""
    client.query(`delete from productos where id= ${productosId}`).then(response => {
        
    })
    res.end()
})

app.put("/bodegas/:id", (req, res) => {
    const bodegaId = req.params.id || ""
    const nombre=req.body.nombre
    const direccion = req.body.direccion
    client.query(`update bodegas set nombre = '${nombre}', direccion = '${direccion}' where id =${bodegaId}`).then(response => {
        
    })
    res.end()
})

app.put("/facturas/:id", (req, res) => {
    const facturaId = req.params.id || ""
    const total=req.body.total
   
    client.query(`update facturas set total = '${total}' where id =${facturaId}`).then(response => {
        
    })
    res.end()
})

app.put("/productos/:id", (req, res) => {
    const productoId = req.params.id || ""
    const nombre=req.body.nombre
    const descripcion = req.body.descripcion
    const precio = req.body.precio
    client.query(`update productos set nombre = '${nombre}', descripcion = '${descripcion}', precio='${precio}' where id =${productoId}`).then(response => {
        
    })
    res.end()
})

