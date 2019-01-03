// words
var adjs = ['Agile', 'Aloof', 'Angry', 'Arrogant', 'Ass-Hat', 'Athletic', 'Awesome', 'Bearded', 'Big-Nosed', 'Blue', 'Brutish', 'Clean', 'Clever', 'Creaky', 'Dark', 'Dull', 'Eagle-Eyed', 'Explosive', 'Fat', 'Finicky', 'Fish-Eyed', 'Flashy', 'Flat', 'Flat-Footed', 'Flea-Bitten', 'Friendly', 'Full', 'Gangly', 'Gilled', 'Greasy', 'Green', 'Hairy', 'Heebee-Jeebee', 'Ill-Tempered', 'Jumpy', 'Keen', 'Kind', 'Leaping', 'Loud', 'Nasty', 'Old', 'Pale', 'Pierced', 'Pointy', 'Poop-Stained', 'Quacky', 'Quiet', 'Rambunctious', 'Rancid', 'Round', 'Running', 'Runny', 'Salty', 'Sandy', 'Sassy', 'Skinny', 'Slippery', 'Small', 'Small-Eyed', 'Speedy', 'Stained', 'Stinky', 'Stoned', 'Sweaty', 'Tall', 'Tasty', 'Toasty', 'Unusual', 'Watery', 'Wide', 'Wide-Eyed', 'Wide-Grinned', 'Yellow-Bellied'];
var names = ['Al', 'Albert', 'Aldo', 'Alfredo', 'Allen', 'Andrew', 'Andy', 'Angosteen', 'Ariel', 'Ash', 'Bach', 'Baker', 'Bando', 'Bernie', 'Bill', 'Bob', 'Brad', 'Buck', 'Cameron', 'Carl', 'Chad', 'Chan', 'Charlie', 'Chien', 'Chip', 'Chippy', 'Chuck', 'Cole', 'Dan', 'Dango', 'Danny', 'Dennis', 'Devlin', 'Diego', 'Dippy', 'Dolop', 'Doug', 'Drake', 'Drole', 'Earl', 'Eaton', 'Ernest', 'Escargot', 'Evelin', 'Filip', 'Frank', 'Fred', 'Fuerte', 'Gerald', 'Gil', 'Grillen', 'Hal', 'Henry', 'Houston', 'Ignacio', 'Igor', 'Ike', 'Isaac', 'Isaiah', 'Jaakkoo', 'Jabari', 'Jabin', 'Jabril', 'Jack', 'Jake', 'Jason', 'Jim', 'Jimbo', 'Jisan', 'Joe', 'John', 'Ka', 'Kaapro', 'Kabelo', 'Kace', 'Kacey', 'Karl', 'Keaton', 'Kole', 'Labelo', 'Lakerton', 'Lando', 'Landon', 'Lee', 'Leo', 'Liam', 'Lillip', 'Lincoln', 'Logan', 'Lucas', 'Mark', 'Martin', 'Micah', 'Michael', 'Moses', 'Myrick', 'Nate', 'Nathan', 'Nathaniel', 'Nicholas', 'Nick', 'Niklaus', 'Noah', 'Norbert', 'Oliver', 'Olly', 'Olso', 'Omar', 'Orlan', 'Oscar', 'Otis', 'Owen', 'Oz', 'Paav', 'Pace', 'Packer', 'Paco', 'Parker', 'Pat', 'Pavlov', 'Pete', 'Peter', 'Quake', 'Quannis', 'Quelly', 'Quent', 'Quilbert', 'Quillen', 'Quincy', 'Quinlan', 'Quinn', 'Quinton', 'Quintus', 'Quosh', 'Rammy', 'Ray', 'Raymond', 'Raymundo', 'Rich', 'Richard', 'Riley', 'Rill', 'Robin', 'Roger', 'Ron', 'Ronald', 'Ronathan', 'Sam', 'Samson', 'Scott', 'Sean', 'Seb', 'Sebastian', 'Seth', 'Silliam', 'Sillip', 'Steve', 'Squilliard', 'Theo', 'Theodore', 'Thilliam', 'Tim', 'Todd', 'Tom', 'Tony', 'Travis', 'Trilliam', 'Trillip', 'Ulrich', 'Vince', 'Wade', 'Warren', 'Westley', 'Wiliam', 'Willen', 'Willip', 'Wren', 'Xander', 'Xavier', 'Xenos', 'Xerox', 'Xerxes', 'Xilliam', 'Yadava', 'Yahbini', 'Yaholo', 'Yahoo', 'Yakim', 'Yanek', 'Yanja', 'Yelverton', 'Yorick', 'Yosef', 'Yuri', 'Yurik', 'Yvan', 'Zach', 'Zachary', 'Zai', 'Zain', 'Zander', 'Zaph', 'Zephery', 'Ziggy', 'Zilliam', 'trevor'];

// colors:
var hurray = 'green';
var info = 'steelblue';
var warning = 'red';

// functions
function rand(max){
	return Math.floor( Math.random()*max )
}

function pickRand(array){
	return array[ Math.floor( Math.random()*array.length ) ];
}

function capitalize(text){
	return text[0].toUpperCase() + text.substring(1);
}

function psa(array){ // printSortedArray
	return "['"+array.sort().join("', '")+"']"
}
