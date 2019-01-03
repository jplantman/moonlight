function explore(){
	// calculate cost
	var base = here.terrainDifficulty;
	var weight = calcWeight();
	if ( weight > player.maxWeight ){
		outputText( "You are carrying too much weight to walk around! Go into your backpack and toss some junk!", warning );
		return;
	}

	var weightMod = weight / player.maxWeight;
	
	var cost = Math.floor( base * weightMod );
	
	// cost reducing items
	
	if ( player.weapons.closeRange && player.weapons.closeRange.name == "Walking Stick" ){
		cost = Math.max( cost - 2, 0 );
		outputText("Walking Stick makes exploring easier! ( -2 energy cost )", hurray);
	}

	if ( cost < player.energy ){
		outputText( "It would take "+cost+" energy to go exploring now. Continue?", info );
		showButtons([
			["Yes, explore", function(){
				player.energy -= cost;
				updateStatDisplay();
				here.explore();
			}],
			["Stay put", function(){
				showMainMenu();
			}],
			["Explain", function(){
				outputText("Each area has a base cost for how hard it is to explore and travel. This cost is reduced if you are carrying less weight.");
			}
]
		]);

	} else {
		// not enough energy to explore
		outputText(" You don't have enough energy to do this. Try shedding some weight to make exploring easier, or take some rest. ", warning)
	}
}
