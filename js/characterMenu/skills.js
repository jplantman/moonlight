function skills(){
	say('What skill category did you want to look at?');
	showButtons([
		["Strength", function(){
			
		}],
		["Balance", function(){
		
		}],
		["Magic", function(){
		
		}],
		["Done", function(){
			showCharacterMenu();
		}]
	]);
}


