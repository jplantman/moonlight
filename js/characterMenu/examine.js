function examineItem( item ){
	// returns more complete info text based on item type
}

function examine(){
	
	// EXAMINE
	say("Which item do you want to examine?)");
	
	var options = [];
	var i, len = player.pack.length;
	
	
	for(i = 0; i < len; i++){
		options.push( player.pack[i][0].name );
	}
	showOptions(options);
	
	
	showButtons([
		['Examine', function(){
			var input = selectInput.value.toLowerCase();
			var result = returnItem( input );
			if ( result ){
				selectInput.value = '';
				say( result.name+" - "+result.description );
			} else {
				say("select an item")
			}
		}],
		['Done', function(){
			hideOptions();
			showCharacterMenu();
		}]
	]);
	
	
	
	
	
	
	/*
	// OLD EXAMINE
	outputText("Which item do you want to examine?)");
	textInput.style.display = 'block';
	textInput.focus();
	showButtons([
		['Examine', function(){
			var input = textInput.value.toLowerCase();
			var result = returnItem( input );
			if ( result ){
				textInput.value = '';
				outputText( result.name+" - "+result.description );
			} else {
				outputText("Didn't find an item by the name of: "+input)
			}
		}],
		['Done', function(){
			textInput.value = '';
			textInput.style.display = 'none';
			showCharacterMenu();
		}]
	]);
	*/
}
