const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
console.log(notesPath)

async function removeNote(id) {
    const notes = await getNotes()
    notes.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    notes.forEach(note => {
        console.log(chalk.green.inverse(note.id))
    })
    console.log("text was deleted")
}

async function addNote(title) {
    const notes = await getNotes()
    // const notes = require('./db.json')
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    // const notes = Buffer.from(buffer).toString('utf-8')
    console.log(chalk.bgGreen('text was added'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, 'utf-8')
    return Array.isArray(JSON.parse(notes)) ?  JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.yellow.inverse('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.green.inverse(note.id), chalk.yellow.inverse(note.title))
    })
}

module.exports = {
    addNote, printNotes, removeNote
}