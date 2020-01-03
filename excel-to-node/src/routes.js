const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const xlsx = require('xlsx');
const fs = require('fs')

const { format } = require('date-fns')
const pt = require('date-fns/locale/pt-BR')

routes.post('/excel', multer(multerConfig).single('file'), async (req, res) => {

    const path = req.file.path;
    const workbook = await xlsx.readFile(path, { type: "binary", cellDates: true, cellStyles: true });
    fs.unlinkSync(path);//deleta o arquivo
    
    // const sheet = workbook.SheetNames;
    var ref = workbook.Sheets[`Planilha1`];
    var excelData = await xlsx.utils.sheet_to_json(ref);
    ref["!ref"] = `C6:AC${excelData.length + 1000}`;
    // excelData = await xlsx.utils.sheet_to_json(ref, { header: 1, raw: true })
    excelData = await xlsx.utils.sheet_to_json(ref, { raw: true });
    

    return res.json(excelData)
})


routes.get('/', (req, res) => {
    return res.json({ hello: 'word' });
});

module.exports = routes;