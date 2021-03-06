// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: clan.js
// DESC: Provides clan functions and usage
// TYPE: Server (JavaScript)
// ===========================================================================

function initClanScript() {
	logToConsole(LOG_INFO, "[VRR.Clan]: Initializing clans script ...");
	getServerData().clans = loadClansFromDatabase();
	setAllClanDataIndexes();
	logToConsole(LOG_INFO, "[VRR.Clan]: Clan script initialized successfully!");
	return true;
}

// ===========================================================================

function loadClansFromDatabase() {
	logToConsole(LOG_INFO, "[VRR.Clan]: Loading clans from database ...");

	let tempClans = [];
	let dbConnection = connectToDatabase();
	let dbAssoc;

	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM clan_main WHERE clan_deleted = 0 AND clan_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempClanData = new serverClasses.clanData(dbAssoc);
					tempClanData.members = loadClanMembersFromDatabase(tempClanData.databaseId);
					tempClanData.ranks = loadClanRanksFromDatabase(tempClanData.databaseId);
					tempClans.push(tempClanData);
					logToConsole(LOG_VERBOSE, `[VRR.Clan]: Clan '${tempClanData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.Clan]: ${tempClans.length} clans loaded from database successfully!`);
	return tempClans;
}

// ===========================================================================

function loadClanMembersFromDatabase() {
	logToConsole(LOG_INFO, "[VRR.Clan]: Loading clans from database ...");

	let tempClans = [];
	let dbConnection = connectToDatabase();
	let dbAssoc;

	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM clan_main WHERE clan_deleted = 0 AND clan_server = ${getServerId()}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				while(dbAssoc = fetchQueryAssoc(dbQuery)) {
					let tempClanData = new serverClasses.clanData(dbAssoc);
					tempClanData.members = loadClanMembersFromDatabase(tempClanData.databaseId);
					tempClanData.ranks = loadClanRanksFromDatabase(tempClanData.databaseId);
					tempClans.push(tempClanData);
					logToConsole(LOG_VERBOSE, `[VRR.Clan]: Clan '${tempClanData.name}' loaded from database successfully!`);
				}
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.Clan]: ${tempClans.length} clans loaded from database successfully!`);
	return tempClans;
}

// ===========================================================================

function loadClanRanksFromDatabase(clanDatabaseId) {
	logToConsole(LOG_INFO, `[VRR.Clan]: Loading ranks for clan ${clanDatabaseId} from database ...`);

	let dbConnection = connectToDatabase();
	let dbAssoc;
	let tempClanRanks = [];

	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM clan_rank WHERE clan_rank_clan = ${clanDatabaseId}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery)
				let tempClanRankData = new serverClasses.clanRankData(dbAssoc);
				tempClanRanks.push(tempClanRankData);
				logToConsole(LOG_VERBOSE, `[VRR.Clan]: Clan rank '${tempClanRankData.name}' loaded from database successfully!`);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.Clan]: Loaded ranks for clan ${clanDatabaseId} from database successfully!`);
	return tempClanRanks;
}

// ===========================================================================

function loadClanMembersFromDatabase(clanDatabaseId) {
	logToConsole(LOG_INFO, `[VRR.Clan]: Loading members for clan ${clanDatabaseId} from database ...`);

	let dbConnection = connectToDatabase();
	let dbAssoc;
	let tempClanMembers = [];

	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `SELECT * FROM clan_member WHERE clan_member_clan = ${clanDatabaseId}`);
		if(dbQuery) {
			if(dbQuery.numRows > 0) {
				let dbAssoc = fetchQueryAssoc(dbQuery)
				let tempClanMemberData = new serverClasses.clanMemberData(dbAssoc);
				tempClanMembers.push(tempClanMemberData);
				logToConsole(LOG_VERBOSE, `[VRR.Clan]: Clan member '${tempClanMemberData.subAccount}' loaded from database successfully!`);
			}
			freeDatabaseQuery(dbQuery);
		}
		disconnectFromDatabase(dbConnection);
	}

	logToConsole(LOG_INFO, `[VRR.Clan]: Loaded members for clan ${clanDatabaseId} from database successfully!`);
	return tempClanMembers;
}

// ===========================================================================

function createClanCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	if(doesClanNameExist(params)) {
		messagePlayerError(client, "A clan with that name already exists!");
		return false;
	}

	// Create clan without owner. Can set owner with /clanowner afterward
	createClan(params);
	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}created clan ${getInlineChatColourByType("clanOrange")}${params}`);
}

// ===========================================================================

function deleteClanCommand(command, params, client) {
	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getClanFromParams(params);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "That clan ID does not exist!");
		return false;
	}

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}deleted clan ${getInlineChatColourByType("clanOrange")}${getClanData(clanId).name}`);
	deleteClan(clanId);
}

// ===========================================================================

function setClanOwnerCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("owner"))) {
		messagePlayerError(client, "You must be the clan owner to use this command!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let clanId = getClanFromParams(splitParams[0]);
	let targetClient = getPlayerFromParams(splitParams[1]);

	if(!targetClient) {
		messagePlayerError(client, "Player not found!");
		return false;
	}

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	getClanData(clanId).owner = getPlayerCurrentSubAccount(targetClient).databaseId;
	getPlayerCurrentSubAccount(targetClient).clanFlags = getClanFlagValue("all");

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set clan ${getInlineChatColourByType("clanOrange")}${getClanData(clanId).name} ${getInlineChatColourByName("white")}owner to ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}`);
}

// ===========================================================================

function setClanTagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("clanTag"))) {
		messagePlayerError(client, "You can not change the clan tag!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	getClanData(clanId).params = params;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set clan ${getInlineChatColourByType("clanOrange")}${getClanData(clanId).index} ${getInlineChatColourByName("white")}tag to ${getInlineChatColourByName("lightGrey")}${params}`);
}

// ===========================================================================

function setClanNameCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("clanName"))) {
		messagePlayerError(client, "You can not change the clan name!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	getClanData(clanId).name = params;

	messageAdmins(`${getInlineChatColourByName("lightGrey")}${getPlayerName(client)} ${getInlineChatColourByName("white")}set clan ${getInlineChatColourByType("clanOrange")}${getClanData(clanId).index} ${getInlineChatColourByName("white")}name to ${getInlineChatColourByName("lightGrey")}${params}`);
}

// ===========================================================================

function setClanMemberTagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("memberTag"))) {
		messagePlayerError(client, "You can not change a clan member's tag!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");
	let targetClient = getPlayerFromParams(splitParams[0]);
	let tag = splitParams[1] || "";

	if(!targetClient) {
		messagePlayerError(client, "Player not found!");
		return false;
	}

	if(!arePlayersInSameClan(client, targetClient) && !doesPlayerHaveStaffPermission(client, getStaffFlagValue("manageClans"))) {
		messagePlayerError(client, `${getCharacterFullName(targetClient)} is not in your clan!`);
		return false;
	}

	getPlayerCurrentSubAccount(targetClient).clanTag = tag;

	messagePlayerSuccess(client, `You set ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)}'s ${getInlineChatColourByName("white")}clan tag to ${getInlineChatColourByName("lightGrey")}${tag}`);
	messagePlayerAlert(client, `${getInlineChatColourByName("lightGrey")}${getCharacterFullName(targetClient)} ${getInlineChatColourByName("white")}set your clan tag to ${getInlineChatColourByName("lightGrey")}${tag}`);
}

// ===========================================================================

function setClanRankTagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("rankTag"))) {
		messagePlayerError(client, "You can not change a clan ranks's tag!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let splitParams = params.split(" ");

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId, splitParams[0]);

	if(!getClanRankData(clanId, rankId)) {
		messagePlayerError(client, "Clan rank not found!");
		return false;
	}
}

// ===========================================================================

function addClanMemberFlagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("memberFlags"))) {
		messagePlayerError(client, "You can not change a clan member's permissions!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);

	if(!targetClient) {
		messagePlayerError(client, "Clan member not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messagePlayerError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);
	getPlayerCurrentSubAccount(client).clanFlags = getPlayerCurrentSubAccount(client).clanFlags | flagValue;
	messagePlayerSuccess(client, `You added the ${getInlineChatColourByName("lightGrey")}${splitParams[1]} ${getInlineChatColourByName("white")}clan flag to ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(client)}`);
}

// ===========================================================================

function removeClanMemberFlagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("memberFlags"))) {
		messagePlayerError(client, "You can not change a clan member's permissions!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let targetClient = getPlayerFromParams(splitParams[0]);

	if(!targetClient) {
		messagePlayerError(client, "Clan member not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messagePlayerError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);
	getPlayerCurrentSubAccount(client).clanFlags = getPlayerCurrentSubAccount(client).clanFlags & ~flagValue;
	messagePlayerSuccess(client, `You removed the ${getInlineChatColourByName("lightGrey")}${splitParams[1]} ${getInlineChatColourByName("white")}clan flag from ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(client)}`);
}

// ===========================================================================

function addClanRankFlagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("rankFlags"))) {
		messagePlayerError(client, "You can not change a clan rank's permissions!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId, splitParams[0]);

	if(!getClanRankData(clanId, rankId)) {
		messagePlayerError(client, "Clan rank not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messagePlayerError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);

	getClanRankData(clanId, rankId).flags = getClanRankData(clanId, rankId).flags | flagValue;
	messagePlayerSuccess(client, `You added the ${getInlineChatColourByName("lightGrey")}${splitParams[1]} ${getInlineChatColourByName("white")}clan flag to rank ${getInlineChatColourByName("lightGrey")}${getClanRankData(clanId, rankId).name}`);
}

// ===========================================================================

function removeClanRankFlagCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("rankFlags"))) {
		messagePlayerError(client, "You can not change a clan rank's permissions!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId, splitParams[0]);

	if(!getClanRankData(clanId, rankId)) {
		messagePlayerError(client, "Clan rank not found!");
		return false;
	}

	if(!getClanFlagValue(splitParams[1])) {
		messagePlayerError(client, "Clan flag not found!");
		return false;
	}

	let flagValue = getClanFlagValue(splitParams[1]);

	getClanRankData(clanId, rankId).flags = getClanRankData(clanId, rankId).flags & ~flagValue;
	messagePlayerSuccess(client, `You removed the ${getInlineChatColourByName("lightGrey")}${splitParams[1]} ${getInlineChatColourByName("white")}clan flag from rank ${getInlineChatColourByName("lightGrey")}${getClanRankData(clanId, rankId).name}`);
}

// ===========================================================================

function setClanMemberTitleCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("memberTitle"))) {
		messagePlayerError(client, "You can not change a clan member's title!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId);

	if(!getClanRankData(clanId, rankId)) {
		messagePlayerError(client, "Clan rank not found!");
		return false;
	}

	let oldMemberTitle = getPlayerCurrentSubAccount(client).clanTitle;
	getPlayerCurrentSubAccount(client).clanTitle = params;
	messagePlayerSuccess(client, `You changed the name of ${getInlineChatColourByName("lightGrey")}${getCharacterFullName(client)} ${getInlineChatColourByName("white")}from ${getInlineChatColourByName("lightGrey")}${oldMemberTitle} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${params}`);
}

// ===========================================================================

function setClanRankTitleCommand(command, params, client) {
	if(!doesPlayerHaveClanPermission(client, getClanFlagValue("rankTitle"))) {
		messagePlayerError(client, "You can not change your clan's rank titles!");
		return false;
	}

	if(areParamsEmpty(params)) {
		messagePlayerSyntax(client, getCommandSyntaxText(command));
		return false;
	}

	let clanId = getPlayerClan(client);

	if(!getClanData(clanId)) {
		messagePlayerError(client, "Clan not found!");
		return false;
	}

	let rankId = getClanRankFromParams(clanId);

	if(!getClanRankData(clanId, rankId)) {
		messagePlayerError(client, "Clan rank not found!");
		return false;
	}

	let oldRankName = getClanRankData(clanId, rankId).name;
	getClanRankData(clanId, rankId).name = params;
	messagePlayerSuccess(client, `You changed the name of rank ${rankId} from ${getInlineChatColourByName("lightGrey")}${oldRankName} ${getInlineChatColourByName("white")}to ${getInlineChatColourByName("lightGrey")}${params}`);
}

// ===========================================================================

function createClan(name) {
	let dbConnection = connectToDatabase();
	let escapedName = name;

	if(dbConnection) {
		escapedName = escapeDatabaseString(dbConnection, escapedName)
		queryDatabase(dbConnection, `INSERT INTO clan_main (clan_server, clan_name) VALUES (${getServerId()}, '${escapedName}')`);
		let tempClan = new serverClasses.clanData();
		tempClan.databaseId = getDatabaseInsertId(dbConnection);
		tempClan.name = name;
		getServerData().clans.push(tempClan);

		setAllClanDataIndexes();
	}
	return true;
}

// ===========================================================================

function deleteClan(clanId) {
	saveClansToDatabase();

	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let dbQuery = queryDatabase(dbConnection, `UPDATE clan_main SET clan_deleted = 1 WHERE clan_id = ${clanId}`);
		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);

		reloadAllClans();
		return true;
	}

	return false;
}

// ===========================================================================

function getClanData(clanId) {
	let clans = getServerData().clans;
	for(let i in clans) {
		if(clans[i].databaseId == clanId) {
			return clans[i];
		}
	}

	return false;
}

// ===========================================================================

function doesClanNameExist(name) {
	let clans = getServerData().clans;
	for(let i in clans) {
		if(clans[i].name == name) {
			return true;
		}
	}

	return false;
}

// ===========================================================================

function doesClanIdExist(clanId) {
	let clans = getServerData().clans;
	for(let i in clans) {
		if(clans[i].databaseId == clanId) {
			return true;
		}
	}

	return false;
}

// ===========================================================================

function reloadAllClans() {
	getServerData().clans = loadClansFromDatabase();
}

// ===========================================================================

function saveClansToDatabase() {
	let clans = getServerData().clans;
	for(let i in clans) {
		saveClanToDatabase(clans[i]);
	}
}

// ===========================================================================

function saveClanToDatabase(clanData) {
	let dbConnection = connectToDatabase();
	if(dbConnection) {
		let safeClanName = escapeDatabaseString(dbConnection, clanData.name);
		let dbQueryString = `UPDATE clan_main SET clan_name = '${safeClanName}', clan_owner = ${clanData.ownerId} WHERE clan_id = ${clanData.databaseId}`;
		let dbQuery = queryDatabase(dbConnection, dbQueryString);
		freeDatabaseQuery(dbQuery);
		disconnectFromDatabase(dbConnection);
		return true;
	}

	return false;
}

// ===========================================================================

function setClanTag(clanId, tag) {
	getClanData(clanId).tag = tag;
}

// ===========================================================================

function setClanOwner(clanId, ownerId) {
	getClanData(clanId).ownerId = ownerId;
}

// ===========================================================================

function setClanMemberTag(memberId, tag) {
	// finish this later, need to query db
}

// ===========================================================================

function setClanMemberFlags(memberId, flags) {
	// finish this later, need to query db
}

// ===========================================================================

function setClanMemberTitle(memberId, title) {
	// finish this later, need to query db
}

// ===========================================================================

function setClanRankTag(clanId, rankId, tag) {
	getClanRankData(clanId, rankId).tag = tag;
}

// ===========================================================================

function setClanRankFlags(clanId, rankId, flags) {
	getClanRankData(clanId, rankId).flags = flags;
}

// ===========================================================================

function setClanRankTitle(clanId, rankId, title) {
	getClanRankData(clanId, rankId).title = title;
}

// ===========================================================================

function saveAllClansToDatabase() {
	for(let i in getServerData().clans) {
		saveClanToDatabase(getServerData().clans[i]);
	}
}

// ===========================================================================

function setAllClanDataIndexes() {
	for(let i in getServerData().clans) {
		getServerData().clans[i].index = i;

		for(let j in getServerData().clans[i].ranks) {
			getServerData().clans[i].ranks[j].index = j;
			getServerData().clans[i].ranks[j].clanIndex = i;
		}

		for(let k in getServerData().clans[i].members) {
			getServerData().clans[i].members[k].index = k;
			getServerData().clans[i].members[k].clanIndex = i;
		}
	}
}

// ===========================================================================

function arePlayersInSameClan(client1, client2) {
	if(getPlayerClan(client1) == getPlayerClan(client2)) {
		return true;
	}

	return false;
}

// ===========================================================================