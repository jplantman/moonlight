function equip(){
	// show list of equipable items
	//var items = [];
	var options = [];
	var i, len = player.pack.length, html = '';
	for (i = 0; i < len; i++){
		if ( player.pack[i][0].equip ){
			options.push(player.pack[i][0].name);
		}
		
	}
	showOptions(options);
	outputText( "Which item do you want to equip?<br/>"+html );
	
	showButtons([
			["Equip item", function(){
			console.log( selectInput.value )
				var item = returnItem( selectInput.value.toLowerCase() );
				if ( item ){
					// equip item
					selectInput.value = '';
					if ( item.equip == "weapon" ){
						player.weapons[item.range+"Range"] = item;
					} else {
						throw "can only equip weapons right now";
					}
					say("Equipped "+item.name+"!", hurray);
					
				} else {
					// no item
					say("Pick an item");
				}
				// textInput.focus();
			}],
			["Done", function(){
				//textInput.style.display = "none";
				hideOptions();
				showCharacterMenu();
			}]
		]);
	
}


