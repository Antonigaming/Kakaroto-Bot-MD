let handler = async (m, { conn, usedPrefix, command }) => {
    // Comportamiento del comando
    await conn.reply(m.chat, 'Este es un nuevo comando.', m);
};

handler.help = ['nuevocomando'];
handler.tags = ['main'];
handler.command = ['nuevocomando']; // Puedes agregar más alias si es necesario

export default handler;
const fs = require('fs');
const path = require('path');

let lista = [];
let listaManana = [];
const limite = 35;

function agregarNumeroLista(numero, lista) {
    const fecha = new Date();
    const fechaHora = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
    lista.push({ numero, fechaHora });
}

function mostrarLista(lista) {
    return lista.map(item => `${item.numero} - ${item.fechaHora}`).join('\n');
}

function borrarListas() {
    lista = [];
    listaManana = [];
}

function mostrarListaConEncabezado(lista, encabezado) {
    const listaStr = lista.map(item => `${item.numero} - ${item.fechaHora}`).join('\n');
    return `${encabezado}\n${listaStr}`;
}

let handler = async (m, { conn }) => {
    const chatId = m.chat.id;
    const texto = m.text;

    if (texto === '.Unirmelista') {
        if (lista.length < limite) {
            agregarNumeroLista(m.sender, lista);
            await conn.reply(chatId, 'Te has unido a la lista.', m);
        } else {
            await conn.reply(chatId, 'Lo siento, el número de turnos está agotado, si quieres unirte para el día de mañana escribe, .UnirmeM', m);
        }
    }

    if (texto === '.UnirmeM') {
        agregarNumeroLista(m.sender, listaManana);
        await conn.reply(chatId, 'Te has unido a la lista para mañana.', m);
    }

    if (texto === '.listadeunion') {
        const encabezadoHoy = "Lista de personas para hoy:";
        const encabezadoManana = "Lista de personas para mañana:";
        const listaHoyStr = mostrarListaConEncabezado(lista, encabezadoHoy);
        const listaMananaStr = mostrarListaConEncabezado(listaManana, encabezadoManana);
        await conn.reply(chatId, `${listaHoyStr}\n\n${listaMananaStr}`, m);
    }

    if (texto === '.Borrarfila') {
        borrarListas();
        await conn.reply(chatId, 'Las listas han sido borradas.', m);
    }
};

handler.command = ['Unirmelista', 'UnirmeM', 'listadeunion', 'Borrarfila'];

module.exports = handler;