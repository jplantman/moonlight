function calcWeight(){
	var i, weight = 0, len = player.pack.length;
	for(i = 0; i < len; i++){
		var data = player.pack[i];
		weight += data[0].weight*data[1];
	}
	return weight;
}
function returnItem(name){
	var i, len = player.pack.length;
	for(i = 0; i < len; i++){
		var data = player.pack[i];
		if ( data[0].name.toLowerCase() == name ){
			return data[0];
		}
	}
}

function showStats(){
	var next = ( player.level + 1 ) * 100;
	outputText("<span style='color: "+info+"'>==== "+player.name+" ====<br/> Level "+player.level+" ( "+player.experience+" / "+next+" experience )<br/> Day "+player.day + "</span><br />"+
			"Health: "+player.health+' / '+player.maxHealth +
			"<br/> Energy: "+player.energy+' / '+player.maxEnergy+
			"<br/> Coins: "+player.coins);
}

function showCharacterMenu(){
	showStats();
	showButtons([
		["Pack", function(){
			pack();
		}],
		["Skills", function(){
			skills()
		}],
		["Journal", function(){
			journal();
		}],
		["Camp", function(){
			camp();
				
		}],
		["Back", function(){
			showMainMenu();
		}]
	]);
}





