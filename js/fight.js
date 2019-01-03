var enemy;

function startFight( enemyData ){
	enemy = enemyData;
	enemy.distance = true; // true if the distance between you two is large
	enemy.turn = false; // for keeping track of whose turn
	
	say("You see a sketchy "+enemy.type+" in the distance, probably up to no good");
	
	var buttons = [
		["Attack him (costs 1)", function(){
			if ( player.energy >= 1 ){
				player.energy -= 1;
				updateStatDisplay();
				
				say("You attack!", warning);
				engage();
			} else {
				say("Not enough energy!", warning)
			}
		}],
		["Talk to him", function(){
			say("You approach the "+enemy.type+" to talk.");
		}],
		["Range Preference", function(){
			say("Your prefered fighting distance is: "+
			(  player.rangePreferenceClose ? "close range" : "long range" )+
			". What should it be? ", info );
			showButtons([
				["Close Range", function(){
					player.rangePreferenceClose = true;
					say("Your prefered fighting distance is now: "+
					(  player.rangePreferenceClose ? "close range" : "long range" ), info );
					startFight( enemyData );
				}],
				["Long Range", function(){
					player.rangePreferenceClose = false;
					say("Your prefered fighting distance is now: "+
					(  player.rangePreferenceClose ? "close range" : "long range" ), info );
					startFight( enemyData );
				}]
			]);
		}],
		["Run Away (costs 5)", function(){
		
			if ( player.energy >= 5 ){
				player.energy -= 5;
				say("Got away safely!", warning);
				updateStatDisplay();
				showMainMenu();
			} else {
				say("Not enough energy!", warning)
			}
			
		}],
		["Help", function(){
			say("There's an enemy ahead of you. Be careful, and use your energy wisely!");
		}]
	];

	showButtons( buttons );
}

function engage(){
	// this function initiates combat and leads to combatManager()
	updateEnemyStatDisplay();
	enemyStatDisplay.style.display = "block";
	say( "<span style='color: "+warning+"'>"+enemy.name+":</span> "+enemy.threaten );
	
	combatManager();
}

function combatManager(){
	// check for dead
	var over = isPlayerDead();
	
	if ( over ) { return; }
	
	if ( enemy.health <= 0 || enemy.energy <= 0 ){
		// enemy is dead	
		if ( enemy.class == 'human' ){
			player.humanKills += 1;
		 }
		 else if ( enemy.class == 'animal' ){
		 	player.animalKills += 1;
		 } 
		 else if ( enemy.class == 'monster' ){
		 	player.monsterKills += 1;
		 }
		var coins = 20 + rand(20);
		player.experience += enemy.experience;
		var next = ( player.level + 1 ) * 100;
		say("Killed "+enemy.name+"! Got "+coins+" coins ( total: "+player.coins+" ), and "+enemy.experience+" experience ( "+player.experience+" / "+next+" )");
		
		checkForLevelUp();
		
		if ( player.humanKills == 1 && enemy.class == "human" ){
			// first human kill
			say("You have taken a human life. How does it feel?", warning);
			showButtons([
				["Bad", function(){
					player.killingHumansFeels = "bad";
					say("You feel burdened by the choice you made this day.")
					disengage();
				}],
				["Good", function(){
					player.killingHumansFeels = "good";
					say("A wicked grin spreads across your face.")
					disengage();
				}]
			]);
		} else {
			showButtons([
				["OK", function(){
					disengage();
				}]
			]);
		}
		
		return;
	}
					
	showButtons([]);
	if ( !enemy.turn ){
		// player's turn
		playersTurn();
	} else {
		enemysTurn();
	}
}

function playersTurn(){
	// leads to combatManager()
	
	// grab options
	
	var buttons = [];
	
	var meleeWeapon = undefined;
	if ( meleeWeapon ){
		// add melee attack info
	}
	
	var fightRangeClose = false;
	
	// handle distance
	if ( !enemy.distance || player.rangePreferenceClose && enemy.rangePreferenceClose ) {
		// close range
		fightRangeClose = true;
		buttons.push(
			[ "Hit (costs 2)", function(){
				if ( player.energy >= 2 ){
					player.energy -= 2;
					updateStatDisplay();
					
					showButtons([]);
					outputDelayed("Attacking", warning, 2007, function(){
						var damage;
						var weapon;
						if ( player.weapons.closeRange ){
							damage = player.weapons.closeRange.damage + rand(player.weapons.closeRange.damageRand);
							weapon = player.weapons.closeRange.name;
						} else {
							damage = 7 + rand(7);
						}
						enemy.health = Math.max( enemy.health - damage, 0 ) ;
						updateEnemyStatDisplay();
						say( "You hit for "+ damage +" damage"+ 
							( weapon ? " with your "+weapon : '' ) 
							+"!" );
						enemy.turn = true;
						combatManager();
					});
				} else {
					say("Not enough energy!", warning)
				}
				
			
				
			} ]
		);
	} else {
		// long range
		if ( player.weapons.longRange ) {
			// add ranged weapon attack
			buttons.push(
				[ "Shoot (costs 3)", function(){
				
					if ( player.energy >= 3 ){
						player.energy -= 3;
						updateStatDisplay();
						
						showButtons([]);
						outputDelayed("Attacking", warning, 2007, function(){
							var damage = player.weapons.longRange.damage + rand(player.weapons.longRange.damageRand);
							say( "You hit for "+ damage +" damage with your "+player.weapons.longRange.name+"!" );
							enemy.health = Math.max( enemy.health - damage, 0 );
							updateEnemyStatDisplay();
							enemy.turn = true;
							combatManager();
						});
					} else {
						say("Not enough energy!", warning)
					}
					
				
					
				}]
			);
		}
		// close distance
		buttons.push(
			["Close Distance", function(){
				if ( enemy.rangePreferenceClose ){
					// if enemy prefers to be close
					enemy.distance = false;
					say("You closed the distance!", info);
					playersTurn();
				} else {
					// else enemy prefers to be far
					var randNum = Math.random();
					if ( randNum < 0.6 ){
						// got close
						enemy.distance = false;
						say("You closed the distance!", info);
						playersTurn();
					} else {
						// couldn't get close
						say( enemy.name+" maintained the distance!" )
						enemy.turn = true;
						combatManager();
					}
				}
			}]
		);
		
	}
	
	
	// other options
	
	buttons.push(
		["Run (cost 2)", function(){
			if ( player.energy >= 2 ){
				player.energy -= 2;
				updateStatDisplay();
				
				showButtons([]);
				outputDelayed("Escaping", warning, 3006, function(){
					var randNum = Math.random();
					if ( randNum < 0.6 ){
						// success!
						say("Got away safely!", hurray);
						disengage();
					} else {
						say("Can't escape!", warning);
						enemy.turn = true;
						combatManager();
					}
					
				});
			} else {
				say("Not enough energy!", warning)
			}
			
		}]
	);
	
	buttons.push(
		["Pack"]
		// show list of usable combat items only
		
	);
	
	buttons.push(
		["Surrender", function(){
			// surrender acceptnce based on ai
			say("Really surrender?");
			showButtons([
				["Yes, please spare my life!", function(){
					var cry = pickRand(["don't hurt me!", "spare my life!", "let me live!", "I have a family!", "I already pooped my pants!"]);
				
					say("<span style='color: "+info+"'>"+player.name+":</span> Please, "+cry);
					surrenderAI();
				}],
				["Never!", function(){
					playersTurn();
				}]
			]);
		}]
	);
	showButtons(buttons);
	
	say("Your turn. ( range: "+ (fightRangeClose ? "close" : "long") +" )");
	
	

}

function enemysTurn(){
	// leads to combtManager()
	outputDelayed(enemy.name+"'s turn.", undefined, 3006, function(){
		enemy.turn = false;
		 //       //
		// choose enemy action
		aiChoice();
	});
	
}

function disengage(){
	// ends combat. leads to main menu
	enemyStatDisplay.style.display = "none";
	enemy = undefined;
	showMainMenu();
}

