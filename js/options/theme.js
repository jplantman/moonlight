var themeChanger = document.getElementById('changeTheme');
var themes = [
	['Default', '','','', ''],
	['Woodsy', '#BFD7EA', '#0A8754','#0A8754', '#BFD7EA'],
	['Evil', '#070707', '#C40000', '#C40000', '#FFFFFF'],
	['Coral', '#3CDBD3', '','#FF8360', '#555555']
];
var currentTheme = 0;
themeChanger.addEventListener('click', function(){
	
	// get theme
	currentTheme ++;
	currentTheme %= themes.length;
	
	var data = themes[ currentTheme ];



	say("Theme: "+data[0])

	var background1 = data[1];
	var text1 = data[2];
	var background2 = data[3];
	var text2 = data[4];
	
	
	document.body.style.background = background1;
	document.getElementsByTagName('h1')[0].style.color = text1;
	document.getElementsByTagName('h2')[0].style.color = text1;
	
	var buttons = document.getElementsByClassName('button');
	var i, len = buttons.length;
	for ( i = 0; i < len; i++ ){
		buttons[i].style.background = background2;
		buttons[i].style.color = text2;
	}
	
});



