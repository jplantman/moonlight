function camp(){

	// check for camping gear
	var canCamp = checkItemsForKey('name', 'Camping Gear');
	
	if ( !canCamp ){
		outputText("You need Camping Gear to camp!", warning);
		return
	}

	outputText("Camp for the night? Will cost 1 set of Supplies.", info);
			
	showButtons([
		["Set up camp", function(){
			var haveSupplies = addOrRemoveItem( "Supplies", -1 );
						
			if ( haveSupplies ){
				// camp
				var healthAmount = Math.round( player.maxHealth * 0.7 );
				var energyAmount = Math.round( player.maxEnergy * 0.7 );
				
				if ( player.health < healthAmount ){
					player.health = healthAmount;
				}
				
				if ( player.energy < energyAmount ){
					player.energy = energyAmount;
				}
				
				player.spirit = player.maxSpirit;
				showButtons([]);
				outputDelayed("Camping", hurray, 4002, function(){
					player.day ++;
					outputText("You are rested. ( Day "+player.day+" )");
					updateStatDisplay();
					showButtons([
						["Pack Up Camp", function(){
							showButtons([]);
							outputDelayed("Packing Up Camp", hurray, 2004, function(){
								showMainMenu();
							});
						}]
					]);
				})
			} else {
				// not enough supplies to camp
				outputText("You are out of supplies!", warning);
				showMainMenu();
			}
		}],
		["Never mind", function(){
			showMainMenu();
		}],
		["Help", function(){
			outputText("Camping costs 1 set of Supplies and restores you to 70% health and energy. Camping skills can improve the amount you restore when camping, and give you a chance to find and craft items while camping out.")
		}]
	]);	
	
}







