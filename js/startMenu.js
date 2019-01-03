function loadGame( existingData ){
	existingData = JSON.parse( existingData );
	if ( existingData.version != options.version ){
		outputText("The save data's version does not correspond to the current game version. There may be errors.", warning);
	}
	player = existingData;
	player.location = getLocation( player.location );
	outputText("Game Loaded: "+player.name+" <br />Level "+player.level+", Day "+player.day, info);
	playerStatDisplay.style.display = 'block';
	updateStatDisplay();
	document.getElementById("subheading").innerHTML = subheadingHTML(player.name);
	showMainMenu();
	
}

function showStartMenu(){
	textInput.value = "";
	outputText("Welcome to Moonlight", info);
	showButtons([
	
	// NEW GAME
		['New Game', function(){
			var getPlayerName = function(){
				outputText("Enter your name:");
				textInput.style.display = 'block';
				setPlayer();
				player.location = locations.marmotPassS;
				
				textInput.focus();
				showButtons([
					['OK', function(){
						
						var name = textInput.value || pickRand(names);
						textInput.style.display = 'none';
						name = pickRand(adjs)+' '+capitalize(name);
						
						outputText(name+", did you say?");
						showButtons([
							["Yeah", function(){
								player.name = name;
								document.getElementById("subheading").innerHTML = subheadingHTML(player.name);
								
								playerStatDisplay.style.display = 'block';
								updateStatDisplay();
								
								// SET STARTING ITEMS
								addOrRemoveItem("Camping Gear", 1);
								addOrRemoveItem("Supplies", 3);
								
								// addOrRemoveItem("Sling Shot", 1);
							
								textInput.value = "";
								textInput.style.display = "none";
								player.fathersName = pickRand(adjs)+' '+pickRand(names);
								if (player.fathersName == player.name){
									player.fathersName +=' Sr.';
								}
								
								outputText("<p style='color:"+info+";'>You are: "+name+"</p><p>You live the life of a simple peasant. Your mother died during childbirth - you never knew her. Your father, "+player.fathersName+", raised you by himself, for better or worse. </p><p>After an argument with your father, regarding your lazy disposition around the farm, you decide to venture off into the world, in search of excitement and adventure. </p>");
								
								showButtons([
									["OK", function(){
										outputText("You head west, following the path that supply wagons used to take when you were young and the family farm was productive. You head towards your old playground, the marmot pass. <br/> You remember good times here, back before it got too dangerous to leave the farm...");
										showButtons([
											["OK", function(){
												showMainMenu();
											}]
										]);
									}]
								]);
							}],
							["No", function(){
								getPlayerName();
							}]
						]);
					}],
					["Cancel", function(){
						textInput.style.display = 'none';
						showStartMenu();
					}]
				]);
			}
			getPlayerName();
			
		}],
		
	// LOAD GAME
		['Load Game', function(){
			var existingData = localStorage.getItem("moonlight");
			if ( existingData ){
				loadGame( existingData );			
			}
			else {
				outputText("No game to load...", warning);
			}
		}],
		
	// HELP
		['Help', function(){
			var adj1 = pickRand(["super", "ultra", "awesomely", "extremely", "uber", "excessively"]);
			var adj2 = pickRand(["fascinating", "captivating", "enthralling", "magestic", "awesome", "supreme", "fantastical", "omega"]);
			outputText(" Moonlight is a game about action, adventure, and exploration. <br/>Read along and follow the "+adj1+" "+adj2+" story line, or just click through the menus and enjoy tactical fights and challenging quests. ");
		}],
	
	// VERSION INFO
		["Version Info", function(){
			outputText("Version "+options.version+"<br/>"+versionText( options.version ) )
		}]
	]);
}



