const fs = require('fs')
const chalk = require('chalk')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResultados = [];

    let temp; 
    while((temp = regex.exec(texto))!= null) {
        arrayResultados.push({ [temp[1]] : [temp[2]]})
    }
    return arrayResultados.length === 0 ? "Este arquivo não apresenta nenhum link" : arrayResultados; 
}

function trataErro(erro){ 
    throw new Error(chalk.red(erro.code, "Erro no programa!"));
}

async function leitorDeTexto(caminhoDoArquivo){
     const texto = await fs.promises.readFile(caminhoDoArquivo,'utf-8')
     return texto
}


async function pegaArquivo(caminhoDoArquivo) { 
    try{    
        const texto = await leitorDeTexto(caminhoDoArquivo) 
        return(extraiLinks(texto))
    } 
    catch(erro) {
      trataErro(erro)
    }
}

function arrayLinks(arrayLinks){
    
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join());    
};

async function validaLinks(links){
    links.forEach(async link => {   
        const res = await fetch(link)
        const codigo = await res.status
        if(res.status == 200){
            console.log(chalk.green(`O status para a URL ${link} é: ${codigo}`))
        } else {
            console.log(chalk.red(`O status para a URL ${link} é: ${codigo}`))
        }
    });
}


module.exports = {
    pegaArquivo: pegaArquivo,
    leitorDeTexto: leitorDeTexto,
    arrayLinks: arrayLinks,
    validaLinks: validaLinks,
    chalk: chalk
}

