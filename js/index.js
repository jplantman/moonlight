// get all the elements
var textInput = document.getElementById("textInput"),
    textOutput = document.getElementById("textOutput"),
    selectInput = document.getElementById("selectInput"),
    buttons = {};
    
    buttons.button0 = document.getElementById("button0");
    buttons.button1 = document.getElementById("button1");
    buttons.button2 = document.getElementById("button2");
    buttons.button3 = document.getElementById("button3");
    buttons.button4 = document.getElementById("button4");
    
    buttons.button5 = document.getElementById("button5");
    buttons.button6 = document.getElementById("button6");
    buttons.button7 = document.getElementById("button7");
    buttons.button8 = document.getElementById("button8");
    buttons.button9 = document.getElementById("button9");
    
    


// enter key triggers button0
document.addEventListener('keypress', function(e){
	if (e.keyCode == 13 && options.enterKey){	
		functionDelayer( options.enterKey );
	}
});

// options
var options = {
	version: '1.0',
};

function versionText(version){
	if (version == '1.0'){
		return "This version features 2 locations - s marmot pass and father's farm<br/>"+
				"combat is basic and theres only a few skills (maybe 1 for each tree: power, balance, knowledge)<br/>"+
				"a small items stash is available at fathers house <br/>"+
				"there is only one enemy with one ai, in s marmots pass. very few items"
	}
}

// locations
locations = {};
function getLocation( name ){
	for ( i in locations ){
		if ( locations[i].name == name ){
			return locations[i];
		}
	}
}


// output some text
var say;
var outputText = say = function(text, color){
	textOutput.innerHTML += ("<span style='color:"+ (color || ";'") +"'>" + text + "<br />"); 
	textOutput.scrollTop = textOutput.scrollHeight;
}

// adds a tiny delay to player's actions, to prevent weird glitches
var functionBlocked = false;
function functionDelayer( callback ){
	if ( !functionBlocked ){
		functionBlocked = true;
		callback();
		setTimeout(function(){
			functionBlocked = false;
		}, 200);
	}
}

// show buttons
function showButtons(buttonOptions){ // buttonOptions is an array of these: [ 'name string', onclickFunc ] 
	var i;
	var num = 10; // num == number of option buttons
	for (i = 0; i < num; i++ ){
		(function(i){
			var btn = buttonOptions[i];
			if ( btn ){
				if ( i == 0 ){ options.enterKey = btn[1]; } // enter key triggers button0
				buttons['button'+i].innerHTML = btn[0];
				buttons['button'+i].style.display = 'inline-block';
				buttons['button'+i].onclick = function( ){
					functionDelayer( btn[1] );
				}
			} else {
				buttons['button'+i].style.display = 'none';
			}
		})(i);
	}
	// shouldn't happen, anyway
	if (buttonOptions.length == 0){ options.enterKey = undefined; }
}


// show select options
// show buttons
function showOptions(options){ // options is an array of these: [ 'name string' ] 
	var i, len = options.length;
	selectInput.innerHTML = '';
	
	// create option elements
	var df = document.createDocumentFragment();
	
	for (i = 0; i < len; i++ ){
		(function(i){
			var data = options[i],
				 elem = document.createElement('option');
			 elem.value = data;
			 elem.innerHTML = data;
			 df.appendChild( elem );
		})(i);
	}
	
	selectInput.appendChild( df );
	selectInput.style.display = "block";
}
function hideOptions(){
	selectInput.innerHTML = '';
	selectInput.style.display = "none";
}


// Dot Dot Dot Text Output
function outputDelayed(text, color, ms, callback){
	textOutput.innerHTML += ("<span style='color:"+ (color || ";'") +"'>" + text); 
	textOutput.scrollTop = textOutput.scrollHeight;
	
	setTimeout( function(){
		textOutput.innerHTML += '.';
	}, ms * 1/4 );
	setTimeout( function(){
		textOutput.innerHTML += '.';
	}, ms * 2/4 );
	setTimeout( function(){
		textOutput.innerHTML += '.<br/>';
	}, ms * 3/4 );
	setTimeout( function(){
		callback();
	}, ms );
}

// create h2 line
function subheadingHTML(name){
	if ( !name ){ return "Text Adventure RPG"; }

	return name+"'s "+
		pickRand(["big", "crazy", "scary", "dangerous", "stressful", "epic", "great", "wild"])+
			" adventure."
}



/*

Moonlight

start:
camping
fighting
wearing items

skills are simpler than before.
1 level, and skill trees

*/


/*


    .....  ................   ...........
  ............................... Dragon's ./\.
 ................................... Peak ./^ \.
 ........................................./  /\\
.......................................______|__
.................................. Badlands _|__
Edgeton|................................_____|__
*------|---------------|... Clements Lake ...|__
...../\|./\.............\ [     ] ... #...# .|..
../\...|. Spider Forest .\.. [   ] .. ##### -...
..../\.|../\..............\---------- ##O## ....
.......|........................ Clements Castle
.......|.................................|......
.......|. Marmot Pass ...................|.....
.......|.................................|...
.......|-----* Father's House ...........|.
.......|.................................|...
 ......|................... Port Philip. #..
   ....#. Passy Port .....    ........


Locations (and where they connect to):

Marmot Pass S (start) >>> Marmot Pass N, Father's House, Passy Port
Father's House >>> Marmot Pass S, Secret Trail (with knowledge of)
Secret Trail >>> Father's House, Road to Port Philip
Passy Port >>> West of Passy Port, Port Philip (by ship)
West of Passy Port >>> Passy Port
Marmot Pass N >>> Marmot Pass S, Spider Forest
Spider Forest >>> Marmot Pass N, Spider Forest Crossroads
Spider Forest Crossroads >>> Edgeton, Road to Clements Lake
Edgeton >>> Spider Forest Crossroads
Road to Clements Lake >>> Spider Forest Crossroads, Clements Lake
Clements Lake >>> Road to Clements Lake, Clements Castle
Clements Castle >>> Clements Lake, Road to Port Philip, Clements Castle Court (with permission), Road To Badlands
Clements Castle Court >>> Clements Castle
Road to Port Philip >>> Clements Castle, Port Philip
Road to Badlands >>> Clements Castle, Badlands S
Badlands S >>> Road to Badlands, Badlands N
Badlands N >>> Badlands S, Base of Dragon's Peak
Base of Dragon's Peak >>> Badlands N, Peak of Dragon's Peak (treacherous)
Peak of Dragon's Peak >>> Base of Dragon's Peak

Main Options at each Location:
(1) Surroundings
(2) Self
(3) Save

	Surroundings
	describe area
	(1) Scout Area
	(n...) All other travel options

	Self
	describe health
	(1) Check my backpack
	(2) Check my skills
	(3) check quests / knowledge status
	(4) Eat Quickly (with prepared food)
	(5) Setup Camp (skills and supplies to make better camp)

		Camp Menu
		describe camp status (camping skills, and supplies)
		(2) Cook (with fire)
		(3) Eat
		(4) Sleep


	Save
	(1) Save Game
	(2) Load Game
	(3) Quit



Skills - and what they are used for:
Botany - identifying and utilizing plants, and for farming
Camping - setting up a better camp
Swordsmanship - combat accuracy with melee weapons, and blocking
Archery - combat and hunting with bow
Stealth - sneaking by enemies and sneaking into places, getting the jump on enemies
Thievery - stealing/ pickpocketing/ sleight of hand
Magic - using magic spells / understanding magical places/ things
Craftsmanship - making stuff with your hands
Agility - dodging attacks, traversing difficult obstacles / terrain
Charisma - lying to people / getting them to give you info / stuff / trust you
Endurance - deal with rough weather / environmental conditions, more HP
Strength - hit harder with melee / carry more stuff / wear heavier armor
Observation - notice things, for more options

Skills start at level 0. the next level is always achieved at 100 skill.level * 100;
Experience then is always reset after each level-up.
Max level for anything is 10;

how a roll works:
	a result is == Math.random() * (5 + skill.level)
	and then is compared with a target difficulty value.
	the target value can be static (like a jump that takes 5 or higher agility roll to succeed)
	or varying ( like if, attempting to lie, you roll charisma vs an npc's observation. highest roll wins. )
	roll ties always go to the player

combat: (swordsmanship, archery, magic, strength, agility)

the player's max hp is 50 + endurance * 3. at max endurance(10), then, the hp would be 80.

the attacker must roll for accuracy with either swordsmanship, archery, or magic, depending on the attack type.

the formula is:
accuracy score = Math.random() * ( 5 + level );
so a random number from 0 to 5 at level 0, and from 0 to 15 at level 10.

the number is compared to the highest of the defender's
dodge score, = Math.random() * ( 5 + agility )
block score, = Math.random() * ( 5 + level ) 
	swordsmanship to block melee or range, magic to block magic

the damage is 1 + Math.random() * ( base + level )
	base is the weapon base for melee or range, and the spell's base for magic
	level is strength for melee, archery for range, and magic for magic

Storyline:
The storyline takes place in the world of TextCraftia, shown by the map above.
the player could acquire a world map in-game to view.
quests are found amongst the world. your character's accounts are recorded in their personal journal

*/
