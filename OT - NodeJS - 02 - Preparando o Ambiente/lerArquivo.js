var fs = require('fs');

fs.unlink('arquivoRenomeado.txt', function (err) {
    if (err) throw err;

    console.log('Arquivo deletado!');
});