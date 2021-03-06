// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: radio.js
// DESC: Provides radio station streaming
// TYPE: Server (JavaScript)
// ===========================================================================

let radioStations = [];

// ===========================================================================

function initRadioScript() {
	logToConsole(LOG_INFO, "[VRR.Radio]: Initializing radio script ...");
    radioStations = loadRadioStationsFromDatabase();
	logToConsole(LOG_INFO, "[VRR.Radio]: Radio script initialized successfully!");
	return true;
}

// ===========================================================================

function loadRadioStationsFromDatabase() {
	logToConsole(LOG_INFO, "[VRR.Radio]: Loading radio stations from database ...");
	let dbConnection = connectToDatabase();
	let tempRadioStations = [];
	let dbAssoc;
	if(dbConnection) {
		let dbQueryString = `SELECT * FROM radio_main`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		if(dbQuery) {
			while(dbAssoc = fetchQueryAssoc(dbQuery)) {
				let tempRadioStationData = new serverClasses.radioStationData(dbAssoc);
				tempRadioStations.push(tempRadioStationData);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.Radio]: ${tempRadioStations.length} radio stations loaded from database successfully!`);
	return tempRadioStations;
}

// ===========================================================================

function playStreamingRadioCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let radioStationId = params;

	if(radioStationId != 0 && typeof radioStations[radioStationId-1] == "undefined") {
		messagePlayerError(client, "That radio station ID does not exist!");
		return false;
	}

	if(!isPlayerInAnyVehicle(client)) {

	}

	if(!getVehicleData(getPlayerVehicle(client))) {
		messagePlayerError(client, "This is a random traffic vehicle and commands can't be used for it.");
		return false;
	}

	if(radioStationId == 0) {
		getVehicleData(getPlayerVehicle(client)).streamingRadioStation = -1;
		getPlayerData(client).streamingRadioStation = -1;
		meActionToNearbyPlayers(client, `turns off their vehicle's radio`);

		let clients = getClients();
		for(let i in clients) {
			if(getPlayerVehicle(client) == getPlayerVehicle(clients[i])) {
				playRadioStreamForPlayer(clients[i], "");
			}
		}
		return false;
	}

	getVehicleData(getPlayerVehicle(client)).streamingRadioStation = radioStationId-1;
	getPlayerData(client).streamingRadioStation = radioStationId-1;
	meActionToNearbyPlayers(client, `changes their vehicle's radio station to ${radioStations[radioStationId-1].name} (${radioStations[radioStationId-1].genre})`);

	let clients = getClients();
	for(let i in clients) {
		if(getPlayerVehicle(client) == getPlayerVehicle(clients[i])) {
			playRadioStreamForPlayer(clients[i], radioStations[radioStationId-1].url, true, getPlayerData(client).streamingRadioVolume);
		}
	}
}

// ===========================================================================

function setStreamingRadioVolumeCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let volumeLevel = params;

	if(isNaN(volumeLevel)) {
		messagePlayerError(client, "Volume level must a number");
		return false;
	}

	setPlayerStreamingRadioVolume(client, toInteger(volumeLevel));
	getPlayerData(client).streamingRadioVolume = toInteger(volumeLevel);
	let volumeEmoji = '';
	if(volumeLevel >= 60) {
		volumeEmoji = '🔊 ';
	} else if(volumeLevel >= 30 && volumeLevel < 60) {
		volumeEmoji = '🔉 ';
	} else if(volumeLevel > 0 && volumeLevel < 30) {
		volumeEmoji = '🔈 ';
	} else if(volumeLevel <= 0) {
		volumeEmoji = '🔇 ';
	}

	messagePlayerSuccess(client, `${volumeEmoji}You set your streaming radio volume to ${volumeLevel}%`);
}

// ===========================================================================