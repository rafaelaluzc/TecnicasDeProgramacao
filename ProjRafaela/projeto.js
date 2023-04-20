const funcs = require('./index');
const caminho = process.argv

if(caminho[3] == 'links'){

    funcs.pegaArquivo(caminho[2])
        .then(texto => console.log(texto))
        .catch(erro => console.log(erro))

} else if(caminho[3] == 'leitura'){

    funcs.leitorDeTexto(caminho[2])
    .then(texto => console.log(funcs.chalk.blue(texto)))
    .catch(erro => console.log(funcs.chalk.red(erro)))

} else if(caminho[3] == 'valida'){

    funcs.pegaArquivo(caminho[2])
    .then(texto => {
        const url = funcs.arrayLinks(texto)
        funcs.validaLinks(url)
    })
    .catch(erro => console.log(erro))

}