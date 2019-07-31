const fs = require('fs')
const chalk = require('chalk')

AddNote = (title,body) => {
    const notes = LoadNotes()
   // const DuplNotes = notes.filter((note) => note.title === title)
    const DuplNote = notes.find((note) => note.title === title)

    if(!DuplNote){
        notes.push({
            title: title,
            body: body,
        })
        console.log(chalk.green.inverse('New Note Added'))
    }
    else{
        console.log(chalk.red.inverse('Duplicate Exists, Change Title'))
    }
    SaveNotes(notes)
}

SaveNotes =(notes) => {
    const Data = JSON.stringify(notes)
    fs.writeFileSync('notes.json',Data)
}

ListNotes =() => {
    const notes = LoadNotes()
    console.log(chalk.white.inverse.bold('Your Notes: '))
    notes.forEach(note => {
    console.log(chalk.cyan.inverse(note.title))       
    });
}

ReadNote = (title) => {
    const notes = LoadNotes()
    const RNote = notes.find((note) => note.title === title)
    if(RNote)
    {
        console.log(chalk.cyan.inverse.bold(RNote.title))
        console.log(chalk.white.inverse(RNote.body))
    }
    else{
        console.log(chalk.red.inverse.bold(' Note Not Found '))
    }
}
// Loads All Notes from the file in an array, returns an empty array if file does not exist
LoadNotes = () => {
    try {
    const DB = fs.readFileSync('notes.json')
    const DJ = DB.toString()
    return JSON.parse(DJ)
    }catch (e) {
        return []
    }

}

RemoveNote = (title) => {
    const notes = LoadNotes()
    const NotesToKeep = notes.filter((note) => note.title !== title)

    SaveNotes(NotesToKeep)

    if(notes.length === NotesToKeep.length){
        console.log(chalk.red.inverse('Note Not Found'))
    }
    else{
        console.log(chalk.green.inverse('Note Found and Deleted'))
    }
}
module.exports = {
    AddNote: AddNote,
    RemoveNote: RemoveNote,
    ListNotes: ListNotes,
    ReadNote: ReadNote,
}