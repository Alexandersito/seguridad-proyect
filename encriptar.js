//algoritmo de cifrado AES-256-CBC.

const crypto = require('crypto'); // Importamos el módulo de criptografía de Node.js

function encriptarTexto(texto) {
    const clave = crypto.randomBytes(32); // Generamos una clave aleatoria de 32 bytes
    const iv = crypto.randomBytes(16); // Generamos un vector de inicialización aleatorio de 16 bytes

    const cifrador = crypto.createCipheriv('aes-256-cbc', clave, iv); // Creamos el cifrador
    let textoEncriptado = cifrador.update(texto, 'utf8', 'hex'); // Encriptamos el texto
    textoEncriptado += cifrador.final('hex'); // Finalizamos la encriptación

    return { textoEncriptado, clave, iv }; // Devolvemos un objeto con la cadena encriptada, la clave y el vector de inicialización
}

function desencriptarTexto(textoEncriptado, clave, iv) {
    const descifrador = crypto.createDecipheriv('aes-256-cbc', clave, iv); // Creamos el descifrador
    let textoDescifrado = descifrador.update(textoEncriptado, 'hex', 'utf8'); // Desciframos el texto
    textoDescifrado += descifrador.final('utf8'); // Finalizamos el descifrado

    return textoDescifrado; // Devolvemos la cadena desencriptada
}

// Ejemplo de uso
const textoOriginal = 'Alexander123';
const { textoEncriptado, clave, iv } = encriptarTexto(textoOriginal);
console.log('Texto encriptado:', textoEncriptado);
const textoDesencriptado = desencriptarTexto(textoEncriptado, clave, iv);
console.log('Texto desencriptado:', textoDesencriptado);
