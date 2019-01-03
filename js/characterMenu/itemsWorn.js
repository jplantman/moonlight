function itemsWorn(){
	var html = '';
					
	if ( player.weapons.closeRange ){ html += player.weapons.closeRange.name+"<br/>" }
	
	if ( player.weapons.longRange ){ html += player.weapons.longRange.name+"<br/>" }
	
	outputText( "<span style='color: "+info+"'>==== Items Worn ====<br/> </span>"+(html || "none") );
	if ( html ){
		// unequip items option
		showButtons([
			["OK", function(){
				showMainMenu();
			}]
		]);
	}
}
