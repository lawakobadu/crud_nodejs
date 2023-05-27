const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
const db = require('./config')
const response = require('./response')

app.use(bodyParser.json())

app.get("/", (req, res) => {
    response(200, "ini data", "ini message", res)
})

app.get("/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        if (err) throw err 
            response(200, fields, "ini data", res)
    })
})

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, fields) => {
        if (err) throw err 
            response(200, fields, "ini detail data", res)
    })
})

app.post("/mahasiswa", (req, res) => {
    const {nim, nama, alamat} = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama, alamat) VALUES ('${nim}', '${nama}', '${alamat}')`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "ok error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(200, data, "ok masuk" ,res)
        } 
    })
})

app.put("/mahasiswa", (req, res) => {
    const {nim, nama, alamat} = req.body
    const sql = `UPDATE mahasiswa SET nama='${nama}', alamat='${alamat}' WHERE nim='${nim}'`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "ok error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message
            }
            response(200, data, "ok edit" ,res)
        } else{
            response(404, "nim tidak ada", "ok error", res)
        }
    })
})

app.delete("/mahasiswa", (req, res) => {
    const {nim} = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim='${nim}'`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "ok error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows
            }
            response(200, data, "ok hapus" ,res)
        } else{
            response(404, "nim tidak ada", "ok error", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`)
})