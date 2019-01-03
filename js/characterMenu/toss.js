function toss(){
	// TOSS
	outputText("Which item do you want to toss out?");
	
	var i, len = 
		 player.pack.length,
		 options = [];
	
	for (i = 0; i < len; i++){
		options.push( player.pack[i][0].name );
	}
	
	showOptions( options );
	
	showButtons([
		['Continue', function(){
			var input = selectInput.value.toLowerCase();
			var result = returnItem( input );
			if ( result ){
				say( "How Many <span style='color: "+info+"'>"+"</span> did you want to throw out?" );
				hideOptions();
				textInput.style.display = 'block';
				textInput.focus();
				showButtons([
					["Toss Out "+result.name, function(){
						var valid = /^[0-9]*$/.test( textInput.value );
						valid = valid && +textInput.value > 0;
						
						if ( !valid ){
							outputText("Enter a number, that's greater than 0", warning);
							
						} else {
							var remaining = addOrRemoveItem( result.name, +textInput.value*-1, true );
							valid = valid && result;
							
							if (valid){
								// threw away items
								remaining = (remaining == true ? 0 : remaining);
								outputText("Threw out "+textInput.value+' '+result.name+", left: "+remaining);
							} else {
								// didnt throw
								throw "error throwing item, why is this here?"
							}
						}
						textInput.value = '';
						textInput.style.display = 'none';
						showButtons([
							["OK", function(){
								showCharacterMenu();
							}]
						]);
					}],
					["Never Mind", function(){
						textInput.value = '';
						textInput.style.display = 'none';
						showCharacterMenu();
					}]
				]);
				
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

}










