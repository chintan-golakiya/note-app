console.log('Starting app...');

const fs = require('fs');
const _ = require('lodash');
const yarg = require('yargs');


const notes = require('./notes.js');


var argv = yarg
.command('add','Add a note',{
	title:{
		describe:'title of note',
		demand:true,
		alias:'t'
	},
	body:{
		describe:'Body of note',
		demand:true,
		alias:'b'
	}
})
.command('remove','remove a note',{
	title:{
		describe:'title of note',
		demand:true,
		alias:'t'
	}
})
.command('read','read a note',{
	title:{
		describe:'title of note',
		demand:true,
		alias:'t'
	}
})
.command('list','list of all notes')
.help()
.argv;
var command = argv._[0];




if(command==='add'){
	var note = notes.addNotes(argv.title,argv.body);
	if(note){
		console.log(`Added Note :\n title :  ${note.title}\n body : ${note.body}`);
	}
	else{
		console.log(`note already exist with same title.`);
	}
} else if(command === 'read'){
	var note = notes.getNote(argv.title);
	if(note){
		console.log(`Note :\ntitle :  ${note.title}\nbody : ${note.body}`);
	}
	else{
		console.log(`note doesn't exist with title : ${argv.title}`);
	}
} else if(command === 'list'){
	var Notes = notes.getAll();

	console.log('Printing ',Notes.length,' note(s).');
	Notes.forEach((note)=>{
		console.log('---------------------------------------');
		console.log(`title : ${note.title}`);
		console.log(`body : ${note.body}`);
	});
} else if(command === 'remove'){
	var result = notes.removeNote(argv.title);
	if(result){
		console.log('note removed.');
	}
	else{
		console.log('note not found having the title as ',argv.title);
	}
} else {
	console.log('command not recognized');
}




