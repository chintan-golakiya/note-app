const fs = require('fs');

var readNotes = () => {
	try {
		var readString = fs.readFileSync('notes-data.json');
		return JSON.parse(readString);
	} catch(e){
		return [];
	}
};

var writeNotes = (notes) => {
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNotes = (title,body) => {
	
	var note = {
		title,
		body
	};
	
	var notes = readNotes();

	var duplicateNotes = notes.filter((n) => n.title === title );
	if(duplicateNotes.length === 0 )
	{
		notes.push(note);
		writeNotes(notes);
		return note;
	}
	else{
		return null;
	}
}

var getAll = () => {
	return readNotes();
};

var getNote = (title) => {
	var notes = readNotes();
	var temp = notes.filter((n) => n.title === title);
	if(temp.length>0)
		return temp[0];
	else
		return null;
};

var removeNote = (title) => {
	var curNotes = readNotes();
	var updateNotes = curNotes.filter((n) => n.title !== title);
	if(updateNotes.length === curNotes.length){
		return false;
	}
	writeNotes(updateNotes);
	return true;
};

module.exports = {
	addNotes,
	getAll,
	getNote,
	removeNote
};
