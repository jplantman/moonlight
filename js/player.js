function isPlayerDead(){
	if ( player.health <= 0 || player.energy <= 0 ){
		showButtons([]);
		outputDelayed("You died! ( lived "+player.day+" days, got to level "+player.level+" )", warning, 2007, function(){
			outputDelayed("GAME OVER", warning, 2007, function(){
				outputDelayed("GAME OVER", warning, 2007, function(){
					outputDelayed("GAME OVER", warning, 2007, function(){
						
					});
				});
			});
		});
		return true;
	}
}

function checkForLevelUp(){
	var next = ( player.level + 1 ) * 100;
	if ( player.experience >= next ){
		player.level ++;
		player.experience -= next;
		outputText("You reached level "+player.level+"!", hurray);
	}
	
}

// player
var player = {};
function setPlayer(){
	player = {
		version: 1.0,
		versionText: "This version just features 1 location and all basic actions complete except travelling, including: exploring, combat, random events, items, energy and camping  <br/> One starter quest is completable locally",
		/* starter quest: The Lost Pebble
			difficulty: very easy
		Help simple sam find his lost pebble. He says he lost it around here.
		
		I found a pebble. Maybe it's Sams?
		
		That pebble wasn't Sams...
			Ill keep looking for it then
			I got Sam to think it was his pebble ( 10-20 gold )
			I killed Sam. He had a note on him.  ( 3-8 gold, note about not killing quest npcs )
			
		I found another pebble. This has got to be it!
			Sam is happy. ( He gives you his walking stick as a gift. )
			- walking stick is a decent first weapon, plus helps you travel easier. desc: it has crude patterns carved onto it.
		
		note on quests: 
		
		some quests are less important and tend to have killable npcs. this gives a very diminished quest reward.
		other quests are given by more important npcs ( like kings or masters ) and these may be unkillable through the storyline
		*/
		location: "marmotPassS",
		name: "Unnamed",
		day: 1,
		rangePreferenceClose: true, // default close or default distance during combat
		coins: 20 + rand(5),
		maxHealth: 100,
		health: 70,
		maxEnergy: 100,
		energy: 70,
		maxSpirit: 0,
		spirit: 0,
		level: 0,
		experience: 0, // nextLevel == ( player.level + 1 ) * 100
		maxWeight: 300,
		pack: [],  // [ {item}, amount ]
		weapons: {
			closeRange: undefined,
			longRange: undefined
		},
		journal: [], // where quest info is kept
		humanKills: 0, // taking a life is a serious thing
		animalKills: 0,
		monsterKills: 0,
		killingHumansFeels: undefined
	}
}


/*
skill trees: strength - skill - wisdom

strength skills: 
						tough: 			
					 more health
			 
	boxing:			  big muscles:				
chance to       	  carry more		 
do combos

bash attack:	     armored:				 mercenary:  
more damage*	    armor weighs less    money for kills

  strong:			ignore pain:			battle-hungry:
more damage	       chance to          heal after kills
						take less damage
						
*bash attack does more damage for some energy					
						
						
skill skills:
						energetic:
					  more energy
					  
critical:	    	walker:						 forager:
chance to 	   travelling easier      	   chance to
extra damage*									not need supplies

martial arts:        limber:            botany:
do martial arts*    recover more      	chance to
                   when resting        find plants 
                 and easier escapes
                 
Ninjutsu:             acrobat:   		crafter:     
do ninja   	  	     do basic			chance to
stuff				     acrobatics*     make stuff while camping



* criticals are better with knives
* martial arts includes: kicks, dodging, and grappling**
* basic acrobatics include: dive rolls, handstands
** can attempt chokes and locks when close (grappling takes lots of energy)


wisdom skills:
							spirit:
							access to
							spiritual energy**									
												
	fire:					intuition:					charisma:
understand 			chance to learn more			better results
fire magic*			and make predictions			from conversations

	lightning:			time space:	
understand				understand					
lightning magic*		time space magic*										
												
												
												
												
												
																								
												
												
												
												
												
												
												
												
																								
												
												
												
												
												
												
												
																							
** magic spells can be learned from books, once the wisdom to understand the books is had												
												
* fire magic includes: 
	light fire, fire bolt, fire wall

* lightning magic includes:
	shocking grasp - shock on touch
	bolt - reliable lightning attack
	thunder - reckless lightning attack
	
* time space magic incliudes:
	telepush - combat and story uses
	teleshift - chase / escape in combat	
	teleport -  instant travel
													
												
												
												
				
				
				
				
				
				
				
				
				

				




*/

/*
player.skills = { // d2 type skill trees
		list: [ "strength", "balance", "magic" ],
		str: [ // [ combat / traveling / utility  ] skills are all / 5 unless specified
			// lvl 1
			{
				skill: "Pushup Power", // +1 / 5
				description: "extra melee damage" 
			},
			{
				skill: "Strong Hiker", // + 60 / 5
				description: "carry extra weight"
			},
			{
				skill: "Endurance Fighting", // * ( 1 - 0.1 ) / 5
				description: "attacking takes less energy"
			},
			// lvl 6
			{
				skill: "Charge In", // 0.4 + 0.2 / 2
				description: "close the distance better in combat"
			},
			{
				skill: "Armor Procifiency",
				description: "Wear heavier armor"
			},
			{
				skill: "Mercenary",
				description: "Chance to find mercenary missions instead of nothing"
			},
			// lvl 12
			{
				skill: "Tough Skin",
				description: "Take less damage from attacks"
			},
			{
				skill: "Armor Endurance", // - 0.15 / 5
				description: "Feel the weight of armor less"
			},
			{
				
			},
			// lvl 18
			{
				skill: "",
				description: ""
			},
			{
				skill: "Ignore Pain",
				description: "Travelling with injuries takes less energy"
			},
			{
				skill: "",
				description: ""
			},
			// lvl 24
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			},
			// lvl 30
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			}
		],
		bal: [ // [ combat / traveling / utility  ]
			// lvl 1
			{
				skill: "Good Aim", // 0.7 + 0.3
				description: "higher chance to hit in combat"
			},
			{
				skill: "Efficient Walking", // * ( 1 - 0.1 ) / 5
				description: "Walking takes less energy"
			},
			{
				skill: "Stick Collecter", // 0.2
				description: "chance to not need supplies"
			},
			// lvl 6
			{
				skill: "Target Weakness", // 0.1 : 1.5
				description: "Chance for bonus damage"
			},
			{
				skill: "Forager", // + 0.15
				description: "find more goodies in the wildnerness"
			},
			{
				skill: "Pack Light", // - 3 / 3
				description: "camping supplies weigh less"
			},
			// lvl 12
			{
				skill: "Quick Excape", // - 0.15, + 0.15
				description: "Escaping takes less energy and has a higher chance of succeeding"
			},
			{
				skill: "Hunter", // instead of nothing / +better animals / 5
				description: "find animals to hunt when travelling"
			},
			{
				skill: "Self-sufficient", // 1 / 1
				description: "don't need camping supplies"
			},
			// lvl 18
			{
				skill: "Assassin", // chance to run = 0.3 - 0.1 / 3
				descriptions: "chance to chase targets down, to the death"
			},
			{
				skill: "Woodland Wrafts", // 0.2 + 0.1 / 5
				description: "chance to create valuable items while camping"
				
			},
			{},
			// lvl 24
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			},
			{
				skill: "Herbal Remedies",
				description: "chance to heal illnesses with natural medicine while camping"
			},
			// lvl 30
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			},
			{
				skill: "",
				description: ""
			}
		],
		mag: [ // [ combat / traveling / utility  ]
			
			// lvl 1
			{
				skill: "Spark Flame", // cost: 30 
				description: "Start your fire with magic and don't use supplies to camp"  // also can be used in some quests, as a show of magical ability
			},
			{
				skill: "Moving Meditation", // - 0.2 energy replenishes while sleeping, and fades while doing other actions
				description: "Spirit energy doesn't fade while moving"
			},
			{
				skill: "Spiritual Training", // 20 / 5
				description: "Gain access to spirit energy to start using magic"
			},
			
			// lvl 6
			{
				skill: "Magic Missile", // damage 30+5, cost 30-5 
				description: "Shoot a magic missile to attack enemies in combat"
			},
			{
				skill: "Spiritual Recovery", // 
				description: "Gain energy and health from spirit"
			},
			{
				skill: "Magic Shield",
				description: "Cast a magic shield to take less damage"
			},
			// lvl 12
			{
				skill: "Fire Wall",
				description: "Create a great magical wall of fire"
			},
			{
				skill: "Flash Teleport",
				description: "Teleport into or out of combat"
			},
			{
				skill: "Paralyze",
				description: "Chance to paralize an opponent"
			},
			// lvl 18
			
			{
				skill: "Spiritual Generation",
				description: "generate spirit while you walk around"
			},
			{
				skill: "Teleport Home",
				description: "Teleports to your house"
			},
			{
				skill: "Alchemy",
				description: "Create gold from other objects"
			},
			// lvl 24
			{
				skill: "Ice Shard", // damage 40 + 8 / 5, 40
				description: "Hurl a lethal ice shard"
			},
			{
				skill: "Teleport 2",
				description: "Teleports to location 2"
			},
			{
				skill: "",
				description: ""
			},
			// lvl 30
			{
				skill: "",
				description: ""
			},
			{
				skill: "Teleport 3",
				description: "Teleports to location 3"
			},
			{
				skill: "",
				description: ""
			}
		]
		
	}
*/



