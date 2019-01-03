function checkInJournal( questName ){
	var i, len = player.journal.length;
	for ( i = 0; i < len; i++ ){
		if ( player.journal[i].name.toLowerCase() == questName.toLowerCase() ){
			return player.journal[i];
		}
	}
}


function checkForQuests(){
	// see if it is time to pull up a quest event
	var area = player.location.name;
	var i, len = questEvents[area].length;
	for (i = 0; i < len; i++){
		// check each quest event that could occur while in this area.
		var questEvent = questEvents[area][i];
		var journalEntry = checkInJournal( questEvent.name );
		// if this is a new quest
		if ( !journalEntry && questEvent.step == 0 ){
			questEvent.trigger();
			return true;
		}
		// if this is the quest step you are on
		else if ( journalEntry.step == questEvent.step ) {
			questEvent.trigger( journalEntry );
			return true;
		}		
	}
}

var questEvents = {
	"Southern Marmot Pass": []
};

function continueChain( messages, callback ){
	var nextMessage = messages.shift();
	
	say(nextMessage);
	// if there are more messages after this
	if ( messages.length ){
		showButtons([
			["Continue", function(){
				continueChain( messages, callback );
			}]
		]);
	}
	// if this is the last message
	else {
		showButtons([
			["OK", function(){
				callback();
			}]
		]);
	}
}










