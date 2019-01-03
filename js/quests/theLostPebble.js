

// The Lost Pebble
questEvents["Southern Marmot Pass"].push(
	{
		name: "The Lost Pebble",
		step: 0, // which step this is in the overall quest
		trigger: function(  ){ // journal entry can be passed in, when it already exists
			say("A confused little boy approaches you. He seems to be looking around for something as he walks...");
			function func(){
				
				showButtons([
					["Talk to him", function(){
						continueChain(
							[
								"<span style='color: "+info+"' >"+player.name+": </span> Hey buddy, are you lost?",
								"<span style='color: "+hurray+"' >Little Boy: </span> Um... I... Oh... Uhh... *sniff*",
								"<span style='color: "+info+"' >"+player.name+": </span> Out with it, my boy!",
								"<span style='color: "+hurray+"' >Little Boy: </span> I... lost... *sniff*... my pebble!",
								"The child breaks down into tears.",
								"You can't help but roll your eyes...",
								"<span style='color: "+info+"' >"+player.name+": </span> Look kid, I'm a mighty and brave adventurer.",
								"<span style='color: "+info+"' >"+player.name+": </span> I could kill a dragon, from 200 yards away...",
								"<span style='color: "+info+"' >"+player.name+": </span> With mind bullets!",
								"The child looks at you, puzzled...",
								"<span style='color: "+hurray+"' >Little Boy: </span> So... does that mean you'll help me?",
								"<span style='color: "+info+"' >"+player.name+": </span> You just don't get it, kid!",
								"<span style='color: "+info+"' >"+player.name+": </span> My great talent, my <i>awesome</i> power...",
								"<span style='color: "+info+"' >"+player.name+": </span> I just can't be wasting my ti-",
								"<span style='color: "+hurray+"' >Little Boy: </span> Pleeeeeeeease...",
								"He looks at you with big, cute, puppy dog eyes...",
								"<span style='color: "+info+"' >"+player.name+": </span> Oh, alright kid, I'll do it."
							],
							function(){
								say('You jot down a quick note in your journal', info);
								player.journal.push({
									name: "The Lost Pebble",
									step: 1,
									notes: ["A little boy in Southern Marmot Pass lost his pebble. Regretably, I agreed to help him find it."]
								});
								showMainMenu();
							}
						);
						
					}],
					["Tell him to leave", function(){
						say("Are you sure? This fellow may need your help!");
						showButtons([
							["Maybe I'll see what he has to say", function(){
								func();
							}],
							["I don't help others!", function(){
								say('You jot down a quick note in your journal', info);
								player.journal.push({
									name: "The Lost Pebble",
									step: "failed",
									notes: ["A little boy in Southern Marmot Pass needed help, but I refused."]
								});
								showMainMenu();
							}]
						]);
					}]
				]);
			}
			func();
		}
	}
);


/// STEP 1
questEvents["Southern Marmot Pass"].push(
	{
		name: "The Lost Pebble",
		step: 1, // which step this is in the overall quest
		trigger: function( journalEntry ){
			say("Hey here's a pebble. Maybe it belongs to that kid.")
			showButtons([
				["Continue", function(){
					say('You jot down a quick note in your journal', info);
					journalEntry.step = 2;
					journalEntry.notes.push("I found a pebble. Time to take it back to that kid.");
					showMainMenu();
				}]
			]);
		}
	}
);


/// STEP 2
questEvents["Southern Marmot Pass"].push(
	{
		name: "The Lost Pebble",
		step: 2, // which step this is in the overall quest
		trigger: function( journalEntry ){
			continueChain(
				[
					"You see pebble kid again, still wandering around, scanning the ground",
					"<span style='color: "+info+"' >"+player.name+": </span> Hey look, kid, I found your pebble!",
					"The boy examines it with utmost scrutiny",
					"He lets out a painfully high-pitched <i>squeal</i>",
					"<span style='color: "+hurray+"' >Little Boy: </span> This is NOT my pebble!"
				],
				function(){
					var desicion = function(){
						showButtons([
							["Tell him you'll keep looking for it", function(){
								continueChain([
									"<span style='color: "+info+"' >"+player.name+": </span> Well, I'll keep looking for it then.",
									"<span style='color: "+hurray+"' >Little Boy: </span> You do that, jackass",
									"<span style='color: "+info+"' >"+player.name+": </span> What was that?",
									"<span style='color: "+hurray+"' >Little Boy: </span> Nothing!"
								],
									function(){
										say('You jot down a quick note in your journal', info);
										journalEntry.step = 3;
										journalEntry.notes.push("That was the wrong pebble. I agreed to keep looking.");
										showMainMenu();
									}
								);
							}],
							["Convince him that this must be his pebble (lie)", function(){
								continueChain([
									"Lying can sometimes be useful, but other times it can get you into trouble",
									"You might complete this quest faster, but the reward might not be as good."
								],
									function(){
										say("Is this what you want?");
										showButtons([
											["No, be honest", function(){
												desicion();
											}],
											["Yeah, lie", function(){
												continueChain([
													"<span style='color: "+info+"' >"+player.name+": </span> Are you sure? This looks like your pebble to me",
													"<span style='color: "+hurray+"' >Little Boy: </span> I'm sure! This pebble is round, my pebble was square!",
													"<span style='color: "+info+"' >"+player.name+": </span> Look kid, I'm a geologist, and I can tell you that this pebble <i>must</i> be yours. ",
													"<span style='color: "+info+"' >"+player.name+": </span> In fact, this pebble looks like it could date back to the <i>Jurassic</i> period, over 500 zillion years ago!",
													"<span style='color: "+info+"' >"+player.name+": </span> This pebble could have belonged to a little dinosaur boy back then! ",
													"The little boy looks confused at first, then his face lights up",
													"<span style='color: "+hurray+"' >Little Boy: </span> Really?",
													"<span style='color: "+info+"' >"+player.name+": </span> Of course!",
													"<span style='color: "+hurray+"' >Little Boy: </span> Gee thanks, mister!",
													"<span style='color: "+hurray+"' >Little Boy: </span> A geologist, <i>and</i> a psychic dragon slayer,",
													"<span style='color: "+hurray+"' >Little Boy: </span> You sure really impressive!",
													"You let out a nervous chuckle"
												], function(){
													say('You jot down a quick note in your journal', info);
													journalEntry.step = "completed";
													journalEntry.notes.push("The kid said it was the wrong pebble, but I convinced him to take it");
													showButtons([
														["Claim Reward", function(){
															player.coins += 20;
															player.experience += 100;
															say("The boy gives you 20 coins for your trouble ( + 100 experience )");
															checkForLevelUp();
															showButtons([
																["Quest Completed!", function(){
																	showMainMenu();
																}]
															]);
														}]
													]);
												});
											}]
										]);
									}
								);
							}]
						]);
					}
					desicion();
				}
			);
		}
	}
);

/// STEP 3
questEvents["Southern Marmot Pass"].push(
	{
		name: "The Lost Pebble",
		step: 3, // which step this is in the overall quest
		trigger: function( journalEntry ){
			say("Heres another pebble. Hopefully he'll take this one")
			showButtons([
				["Continue", function(){
					say('You jot down a quick note in your journal', info);
					journalEntry.step = 4;
					journalEntry.notes.push("I found another pebble. Time to take it back to that kid.");
					showMainMenu();
				}]
			]);
		}
	}
);


// STEP 4
questEvents["Southern Marmot Pass"].push(
	{
		name: "The Lost Pebble",
		step: 4, // which step this is in the overall quest
		trigger: function( journalEntry ){
			continueChain([
				"You see pebble kid again. Hopefully for the last time.",
				"<span style='color: "+info+"' >"+player.name+": </span> Hey kid! Kid! Take a look at this pebble...",
				"He gazes methodically at the pebble",
				"The sight of it seems to take him away, to a distant time",
				"<span style='color: "+hurray+"' >Little Boy: </span> Oh, could it be?",
				"This little boy is so intensely enthralled by this pebble. It's mildly amusing.",
				"<span style='color: "+hurray+"' >Little Boy: </span> You know what?",
				"<span style='color: "+info+"' >"+player.name+": </span> What?",
				"<span style='color: "+hurray+"' >Little Boy: </span> My father is a world renown geologist.",
				"<span style='color: "+hurray+"' >Little Boy: </span> You might have heard of him, Randall Bodanglestein.",
				"The name does ring a bell",
				"<span style='color: "+hurray+"' >Little Bodanglestein: </span> I can tell you that this isn't just a pebble, it's a <i>fossil</i>.",
				"<span style='color: "+hurray+"' >Little Bodanglestein: </span> My dad gave it to me. He said it's <i>really</i> old. ",
				"<span style='color: "+hurray+"' >Little Bodanglestein: </span> It might be even older than you, gramps!",
				"What a wise guy this kid is, why i oughta-",
				"<span style='color: "+hurray+"' >Little Bodanglestein: </span> Just kidding! But hey, since you found it...",
				"<span style='color: "+hurray+"' >Little Bodanglestein: </span> I better give you a proper thanks!",
			], function(){
			
				say('You jot down a quick note in your journal', info);
				journalEntry.step = "completed";
				journalEntry.notes.push("It was the right pebble this time. The kid, named Little Bodanglestein, gave me his Walking Stick. I can equip it, and other items, from the pack menu.");
				showButtons([
					["Claim Reward", function(){
						player.coins += 20;
						player.experience += 100;
						addOrRemoveItem("Walking Stick", 1);
						say("The boy gives you 20 coins, and a Walking Stick for your trouble. You should go to the pack menu and equip it. ( + 100 experience )");
						checkForLevelUp();
						showButtons([
							["Quest Completed!", function(){
								showMainMenu();
							}]
						]);
					}]
				]);
			
			});
		}
	}
);





























