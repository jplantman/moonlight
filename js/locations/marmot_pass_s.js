var here = locations.marmotPassS = {};

// name and description of place
here.name = "Southern Marmot Pass";
here.description = function(){
	var adj1 = pickRand( ["dry, dusty", "sandy", "hot, arid", "barren"] );
	var noun1 = pickRand( ["small shrubs", "prickly bushes", "buzzing flies"] );
	var noun2 = pickRand( ["rock piles", "small cactuses", "dead plants"] );
	var noun3 = pickRand( ["hungry falcons", "turkey vultures", "distant hawks"] );
	return "These "+adj1+" praries are ridden with "+noun1+" and "+noun2+". Patchy grass clumps intertwine with rodent trails, and "+noun3+" circle clear skies above.";
};

// a chance to encounter:
var chance = {
	fight: 0.25,
	free: 0.25,
	problem: 0.15,
	misc: 0.35
}
 	
here.level = 0; // area difficulty level 	

here.terrainDifficulty = 15; // base cost to explore
 	
here.explore = function(){

	
	// exploring duration
		showButtons([]);
		outputDelayed( "Exploring", info, 2000, function(){
			var longerEvent = false;
			var rand = Math.random();
			if ( rand <= chance.fight ){
				// a fight
				outputText("What's this?", warning);
				var enemy = pickRand(here.enemies);
				longerEvent = true;
				startFight( enemy() );
			} else if ( rand - chance.fight <= chance.free ){
				// free stuff
				var text = pickRand(["It must be your lucky day!", "Wow, what a find!", "Hey, would you look at that!"]);
				outputText(text, hurray);
				var freeStuffFunction = pickRand( here.free );
				freeStuffFunction();
			} else if ( rand - chance.fight - chance.free <= chance.problem ){
				// a problem
				outputText("Oh crap...", warning);
				var problemFunction = pickRand( here.problem );
				problemFunction();
			} else {
				// quest / skill event / nothing
				var questTriggered = checkForQuests();
				if ( questTriggered ){
					longerEvent = true;
				} else {
					outputText("You don't find anything interesting.");
				}
			} 
			if ( longerEvent ){ return; } // don't show this button if it's a longer event
			showButtons([
				["Back To Area", function(){
					showMainMenu();
				}]
			]);
		} );
	
	
	
}

// Free Stuff
here.free = [
	function(){
		var find =  1 + rand(2)
		var total = addOrRemoveItem("Supplies", find);
		outputText("You've stumbled upon an old hidden stash of supplies ( + "+find+" supplies, total: "+total+" ) ");
	},
	function(){
		var find = 2 + rand(9);
		player.coins += find;
		outputText("A few lost coins lie here near a rock ( + "+find+" coins, total: "+player.coins+")");
	},
	function(){
		var findCoins = 2 + rand(9);
		player.coins += findCoins;
		var findSupplies =  1 + rand(2)
		var total = addOrRemoveItem("Supplies", findSupplies);
		outputText("A battle must have occurred here. Look at all the loot! ( + "+findCoins+" coins, total: "+player.coins+", "+findSupplies+" supplies, total: "+total+" )");
		
	}
];

// Problem
here.problem = [
	function(){
		var lose = Math.min( player.coins, 1 + rand(5) );
		player.coins -= lose;
		outputText("You realize with a shock that you have misplaced some of your coins! ( - "+lose+" coins, left: "+player.coins+")");
	},
	function(){
		var lose = Math.min( player.health, 4 + rand(5) );
		player.health -= lose;
		outputText("You lose your footing on some rough gravel, and your ankle gives out ( - "+lose+" health, left: "+player.health+" / "+player.maxHealth+" )");
		updateStatDisplay();
	}
];

here.enemies = [
	function(){
		return {
			name: pickRand(["Dusty", "Sandy-Eyed", "Rough-Voiced", "Hairy", "Dirty", "Lazy-Eyed", "Stupid", "No-good", "Rotten"])+" "+pickRand(["Bandit", "Crook", "Addict", "Thief", "Outlaw"]),
			type: "man",
			class: "human",
			health: 70,
			maxHealth: 70,
			energy: 60,
			maxEnergy: 60,
			rangePreferenceClose: true,
			ai: "coward",
			experience: 30,
			threaten: pickRand(["I'm gonna cut you open!", "Gimme your money, punk!", "You're going down!", "I'll kill you!"])
		}
	}
];


 	
 	
 	
 	
 	
 	
