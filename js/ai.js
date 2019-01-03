function enemySurrenders(){
	// surrender
	var beg = pickRand(["I surrender", "have mercy", "don't kill me", "I have a family", "I beg of you"]);
	say("<span style='color: "+warning+"'>"+enemy.name+": </span> Please, "+beg+"!");
	showButtons([
		["To the death! (killer)", function(){
			say("Taking a life is a serious thing. Is this what you want?", warning);
			showButtons([
				["Yes, kill", function(){
					enemy.turn = false;
					combatManager();
				}],
				["Reconsider", function(){
					enemySurrenders();
				}]
			]);
		}],
		["Just take his money (greedy)", function(){
			var expGain = Math.round( enemy.experience * 0.7 );
			var next = ( player.level + 1 ) * 100;
			player.experience += expGain;
			var coins = 20 + rand(20);
			player.coins += coins;
			say("You let him live, this time. Got "+coins+" coins ( total: "+player.coins+" ), and "+expGain+" experience ( "+player.experience+" / "+next+" )");
			checkForLevelUp();
			showButtons([
				["OK", function(){
					disengage();
				}]
			]);		
		}],
		["Let him go free (honor)", function(){
			var next = ( player.level + 1 ) * 100;
			player.experience += enemy.experience;
			say("You let him go free. Got "+enemy.experience+" experience ( "+player.experience+" / "+next+" )");
			checkForLevelUp();
			showButtons([
				["OK", function(){
					disengage();
				}]
			]);	
		}]
	]);
}

function aiChoice(){
	var ai = enemy.ai, // determines behavior
		 prefClose = enemy.rangePreferenceClose,
		 fightRangeClose = !enemy.distance || player.rangePreferenceClose && enemy.rangePreferenceClose;
		 
// AIs determine enemy's desperation health level, willingness to use combat tricks or verbal manipulation
	 
	var healthPercentage = enemy.health / enemy.maxHealth;
// COWARD
	if ( ai == "coward" ){
		
		if ( prefClose ){
			// close range pref coward
			if ( fightRangeClose ){
				
				// attack, run, or surrender, depending on health
				if ( healthPercentage > 0.5 ){
					// attack
					outputDelayed(enemy.name+" attacks! ( range: "+ 
					( fightRangeClose ? "close" : "long" ) +
					" )", warning, 2007, function(){
						var damage = 7 + rand(7);
						player.health = Math.max( player.health - damage, 0 ) ;
						say(enemy.name+" hit you for "+damage+" damage!");
						updateStatDisplay();
						showButtons([
							["OK", function(){
								combatManager();
							}]
						]);
					});
				} else if ( healthPercentage > 0.25 ) {
					// try to run
					say(enemy.name+" makes a run for it!", warning);
					showButtons([
						["Let him run", function(){
							var expGain = Math.round( enemy.experience * 0.7 );
							var next = ( player.level + 1 ) * 100;
							player.experience += expGain;
							say("You let him escape. Got "+expGain+" experience ( "+player.experience+" / "+next+" )");
							checkForLevelUp();
							showButtons([
								["OK", function(){
									disengage();
								}]
							]);
						}],
						["Chase him down (5)", function(){
						
						
						if ( player.energy >= 5 ){
							player.energy -= 5;
							updateStatDisplay();
							
							showButtons([]);
							outputDelayed("Chasing", warning, 3006, function(){
								var randNum = Math.random();
								if ( randNum < 0.6 ){
									// chased him. battle continues
									say("Chased down "+enemy.name+"!");
									enemy.turn = false;
									combatManager();
								} else {
									// he escaped
									var expGain = Math.round( enemy.experience * 0.7 );
									var next = ( player.level + 1 ) * 100;
									player.experience += expGain;
									say("He got away. Got "+expGain+" experience ( "+player.experience+" / "+next+" )");
									checkForLevelUp();
									showButtons([
										["OK", function(){
											disengage();
										}]
									]);
								}
								
							});
						} else {
							outputTest("Not enough energy!", warning)
						}
						
						}]
					]);
				} else {
					enemySurrenders();
				}
			} else { // ( !fightRangeClose )
				// close distance
				if ( player.rangePreferenceClose ){
					// if player prefers to be close
					enemy.distance = false;
					say(enemy.name+" closed the distance!", info);
					enemysTurn();
				} else {
					// else player prefers to be far
					var randNum = Math.random();
					if ( randNum < 0.6 ){
						// got close
						enemy.distance = false;
						say(enemy.name+" closed the distance!", info);
						enemysTurn();
					} else {
						// couldn't get close
						say( enemy.name+" tried to approach, but you maintained the distance!" )
						player.turn = true;
						combatManager();
					}
				} 
				 
			}
			
			
		} 
	} 

// AGGRESSIVE
	if ( ai == "aggressive" ){
	
	}
	
// TRICKY
	if ( ai == "tricky" ){
	
	}
	
// CON ARTIST
	if ( ai == "con artist" ){bob
	
	} 
	
// BRAINLESS
	if ( ai == "brainless" ){
	
	}
		
}	




/// SURRENDER AI

function surrenderAI(){
	if ( enemy.ai == "coward" ){
		say("<span style='color: "+warning+"'>"+enemy.name+":</span> I suppose I could let you live this time. <br/> He takes all your coins as tribute.");
		player.coins = 0;
		disengage();
		
	} 
}
