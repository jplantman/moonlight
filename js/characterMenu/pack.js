function pack(){
	var text = " <span style='color: "+info+"'> I am carrying:</span>"+
	" ( "+calcWeight()+" / "+player.maxWeight+" weight )<br/> ";
	var i, len = player.pack.length;
	for(i = 0; i < len; i++){
		var data = player.pack[i];
		text += data[1]+'x '+data[0].name+' ( '+ data[0].weight*data[1] +' weight )<br/>';
	}
	say(text);
	
	// a menu that allows examining, tossing, or equipping items.
	showButtons([
		["Examine", function(){
			examine();
		}],
		["Toss", function(){
			toss();
		}],
		["Equip", function(){
			equip();
		}],
		["Items Worn", function(){
			itemsWorn();
		}],
		["Back", function(){
			showCharacterMenu()
		}],
	]);
}
