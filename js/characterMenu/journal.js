function journal(){
	var i = 0, len = player.journal.length;
	
	if ( len ){
		var html = "<span style='color: "+info+"' >==== Journal ====</span><br/>";
	
		var options = [];
	
		for( i = 0; i < len; i++ ){
		options.push( player.journal[i].name);
			html += "<p class='indent'>"+player.journal[i].name+"</p>";
		}
		
		html += "What journal entry would you like to read?";
		say (html);
		
		
		
		
		showOptions(options);
		
		showButtons([
			["Read Entry", function(){
				console.log( selectInput.value );
				var journalEntry = checkInJournal( selectInput.value.toLowerCase() );
				if ( journalEntry ){
					// show journal entry
					var html = '';
					var i = 0, len = journalEntry.notes.length;
					for( i = 0; i < len; i++ ){
						html += "<p>"+journalEntry.notes[i]+"</p>";
					}
					say(html);
								
				} else {
					say("Pick a journal entry");
				}
			}],
			["Done", function(){
				hideOptions();
				showCharacterMenu();
			}]
		]);
		
	} else { // there are no journal entries
		say('Your journal is empty.');
	}
	
}
