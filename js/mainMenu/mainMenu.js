var tipCount = 0;

function saveGame(){
	var temp = player.location;
	player.location = player.location.name;
	localStorage.setItem("moonlight", JSON.stringify(player) );
	outputText("Game Saved!", hurray);
	player.location = temp;
	showMainMenu();
	// console.log( JSON.stringify(player) );
}

function showMainMenu(){
var here = player.location;
	outputText( "<span style='color: "+info+"'>==== "+here.name+" ====</span><br />"+here.description() );

	showButtons([
	
	// EXPLORE
		["Explore", function(){
			explore();
		}],
		
	// TRAVEL
		["Travel", function(){
			outputText("disabled", warning);
		}],
		
	// CHARACTER
		["Character", function(){
			showCharacterMenu();
			
		}],
		
	// TIPS
		["Tip", function(){
			var tips = [
			" Make sure to rest before your health and energy gets too low. If either drop to 0, you will be dead. <br/> you can rest by camping or staying at an inn in town. ",
			"The character menu lets you check out your pack, skills, and your journal, and lets you set up camp for the night.",
			"Exploring an area is the main thing you should do.",
			"As you explore and adventure, you gain experience. When you gain enough to level up, you get skill points that you can spend to customize and improve your character.",
			"Travel to  move to a different area. There is a wide world to explore, and each area is different.",
			"Make sure to save often. If you mess up, reload your game before you made that mistake."
			];
			
			var tip = tips[ tipCount ];
			
			outputText("==== Tip: ====<br/>"+tip);
			
			tipCount++;
			tipCount %= tips.length;
		}],
		
	// SAVE GAME
		["Save Game", function(){
		 	var existingData = localStorage.getItem("moonlight");
		 	if ( !existingData ){
		 		saveGame();
		 	} else {
		 		outputText("There is already a save file. Is it OK to overwright?", warning);
				showButtons([
					["Yes", function(){
						saveGame();
					}],
					["No", function(){
						outputText("Didn't save", info);
						showMainMenu();
					}]
				]);
		 	}
		}],
		
	// QUIT GAME
		["Quit Game", function(){
			outputText("Are you sure you want to quit? Make sure to save...", warning);
			showButtons([
				["Yes, Quit Now!", function(){
					playerStatDisplay.style.display = 'none';
					document.getElementById("subheading").innerHTML = subheadingHTML();
					showStartMenu();
				}],
				["Wait, not now...", function(){
					showMainMenu();
				}]
			]);
		}]
	]);
}





