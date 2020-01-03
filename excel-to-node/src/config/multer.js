const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const pathResolve = path.resolve(__dirname, '..', '..', 'temp', 'uploads')

module.exports = {
    dest: pathResolve,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathResolve)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) { cb(err) };

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        },
    }),
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            'application/vnd.ms-excel.sheet.macroenabled.12',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (allowedMines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(`Arquivo Inválido. Seleciona arquivos de extensão xlsm ou xlsx`);
            // cb(new Error(`Invalid file type. ${file.mimetype}`));
        }
    },
}