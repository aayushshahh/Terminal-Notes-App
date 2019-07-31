const notes = require('./Notes.js')
const yargs = require('yargs')
const ch = require('chalk')

//yargs.require()
//Customizing Version Number to be Printed with Yargs
yargs.version('1.0.4')

//Add Note Command
yargs.command({
    command: 'Add',
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.AddNote(argv.title, argv.body)
    }
})

//Remove Note Command
yargs.command({
    command: 'Remove',
    describe: 'Removing a Note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.RemoveNote(argv.title)
    }
})

//List Notes Command
yargs.command({
    command: 'List',
    describe: 'List all Notes',
    builder: {
    },
    handler(){
        notes.ListNotes()
    }
})

//Read Note Command
yargs.command({
    command: 'Read',
    describe: 'Read a Note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       notes.ReadNote(argv.title)
    }
})
yargs.parse()