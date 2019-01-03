
// PLAYER DISPLAY

var playerLabel = document.getElementById("player_label");

var playerStatDisplay = document.getElementById("player_stat_display");

var playerHealthBar = document.getElementById("player_health_bar");

var playerEnergyBar = document.getElementById("player_energy_bar");

var playerSpiritBar = document.getElementById("player_spirit_bar");



var playerHealthLabel = document.getElementById("player_health_label");

var playerEnergyLabel = document.getElementById("player_energy_label");

var playerSpiritLabel = document.getElementById("player_spirit_label");


// UPDATE DISPLAY
function updateStatDisplay(){
	var maxWidth = 200;
	
	playerLabel.innerHTML = player.name;
	
	playerHealthBar.style.width = player.health / player.maxHealth * maxWidth + 'px';
	
	playerEnergyBar.style.width = player.energy / player.maxEnergy * maxWidth + 'px';
	
	playerSpiritBar.style.width = player.spirit / player.maxSpirit * maxWidth + 'px';
	
	
	playerHealthLabel.innerHTML = "Health -  "+player.health+" / "+player.maxHealth;
	
	playerEnergyLabel.innerHTML = "Energy -  "+player.energy+" / "+player.maxEnergy;
	
	playerSpiritLabel.innerHTML = "Spirit -  "+player.spiit+" / "+player.maxSpirit;
}


// ENEMY DISPLAY

var enemyLabel = document.getElementById("enemy_label");

var enemyStatDisplay = document.getElementById("enemy_stat_display");

var enemyHealthBar = document.getElementById("enemy_health_bar");

var enemyEnergyBar = document.getElementById("enemy_energy_bar");

var enemySpiritBar = document.getElementById("enemy_spirit_bar");



var enemyHealthLabel = document.getElementById("enemy_health_label");

var enemyEnergyLabel = document.getElementById("enemy_energy_label");

var enemySpiritLabel = document.getElementById("enemy_spirit_label");


// UPDATE DISPLAY
function updateEnemyStatDisplay(){
	var maxWidth = 200;
	
	enemyLabel.innerHTML = enemy.name;
	
	enemyHealthBar.style.width = enemy.health / enemy.maxHealth * maxWidth + 'px';
	
	enemyEnergyBar.style.width = enemy.energy / enemy.maxEnergy * maxWidth + 'px';
	
	enemySpiritBar.style.width = enemy.spirit / enemy.maxSpirit * maxWidth + 'px';
	
	
	enemyHealthLabel.innerHTML = "Health -  "+enemy.health+" / "+enemy.maxHealth;
	
	enemyEnergyLabel.innerHTML = "Energy -  "+enemy.energy+" / "+enemy.maxEnergy;
	
	enemySpiritLabel.innerHTML = "Spirit -  "+enemy.spiit+" / "+enemy.maxSpirit;
}




