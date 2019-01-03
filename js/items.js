function addOrRemoveItem( name, amount, tossAnyways ){
	// look for item
	var i, len = player.pack.length;
	for (i = 0; i < len; i++){
		var data = player.pack[i];
		if ( data[0].name == name ){
			// found item
			// check if theres enough, in case of remove
			if ( data[1] + amount > 0 ){
				player.pack[i][1] += amount;
				return player.pack[i][1] || true;
			} 
			else if (tossAnyways || data[1] + amount == 0) {
				// zero left
				player.pack.splice(i, 1);
				return true;
			} 
			else { // not enough items
				return false;
			}
		}
	}
	// didnt find item
	if ( amount < 0 ){
		return false;
	} else {
		// fetch and add item
		player.pack.push( [ fetchItem(name), amount ] );
	}
}

function checkItemsForKey(key, value){
	var i, len = player.pack.length;
	for( i = 0; i < len; i++ ){
		if ( player.pack[i][0][key] == value ){
			return true;
		}
	}
}

// base damage 7 + rand(7)

function fetchItem(name){
	if ( name == "Camping Gear"){
		return {name: "Camping Gear", weight: 100, description: "for sleeping and cooking while out on the trail"}
	} 
	
	else if ( name == "Supplies" ){
		return {name: "Supplies", weight: 15, description: "food and supplies for one day of adventuring" }
	}
		
	else if ( name == "Walking Stick" ){
		return {
			name: "Walking Stick", 
			equip: "weapon",
			weight: 5, 
			description: "makes walking easier", 
			damage: 9, 
			damageRand: 7, 
			range: "close"
		}
	}
	
	else if ( name == "Sling Shot" ){
		return {
			name: "Sling Shot", 
			equip: "weapon",
			weight: 10, 
			description: "simple weapon, good as a child's toy ", 
			damage: 5, 
			damageRand: 5, 
			range: "long"
		}
	} 
	
	else {
		throw "No item found with name "+name;
	}
}


