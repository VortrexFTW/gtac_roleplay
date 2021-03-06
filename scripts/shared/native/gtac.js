// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: native.js
// DESC: Provides util funcs for native wrapping
// TYPE: Shared (JavaScript)
// ===========================================================================

"use strict";

let bindableKeys = {
    8: "backspace",
    9: "tab",
    13: "return",
    27: "escape",
    32: "space",
    33: "exclamation",
    34: "doublequote",
    35: "hashtag",
    36: "dollar",
    37: "percent",
    38: "ampersand",
    39: "quote",
    40: "leftparenthesis",
    41: "rightparenthesis",
    42: "asterisk",
    43: "plus",
    44: "comma",
    45: "minus",
    46: "period",
    47: "slash",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    58: "colon",
    59: "semicolon",
    60: "less",
    61: "equals",
    62: "greater",
    63: "questionmark",
    64: "at",
    91: "leftbracket",
    92: "backslash",
    93: "rightbracket",
    95: "underscore",
    97: "a",
    98: "b",
    99: "c",
    100: "d",
    101: "e",
    102: "f",
    103: "g",
    104: "h",
    105: "i",
    106: "j",
    107: "k",
    108: "l",
    109: "m",
    110: "n",
    111: "o",
    112: "p",
    113: "q",
    114: "r",
    115: "s",
    116: "t",
    117: "u",
    118: "v",
    119: "w",
    120: "x",
    121: "y",
    122: "z",
    127: "delete",
    1073741881: "capslock",
    1073741882: "f12",
    1073741883: "f2",
    1073741884: "f3",
    1073741885: "f4",
    1073741886: "f5",
    1073741887: "f6",
    1073741888: "f7",
    1073741889: "f8",
    1073741890: "f9",
    1073741891: "f10",
    1073741892: "f11",
    1073741893: "f12",
    1073741894: "printscreen",
    1073741895: "scrolllock",
    1073741896: "pause",
    1073741897: "insert",
    1073741898: "home",
    1073741899: "pageup",
    1073741901: "end",
    1073741902: "pagedown",
    1073741903: "right",
    1073741904: "left",
    1073741905: "down",
    1073741906: "up",
    1073741908: "numdivide",
    1073741909: "nummultiply",
    1073741910: "numminus",
    1073741911: "numplus",
    1073741912: "numenter",
    1073741913: "num1",
    1073741914: "num2",
    1073741915: "num3",
    1073741916: "num4",
    1073741917: "num5",
    1073741918: "num6",
    1073741919: "num7",
    1073741920: "num8",
    1073741921: "num9",
    1073741922: "num0",
    1073741923: "numperiod",
    1073742048: "leftctrl",
    1073742049: "leftshift",
    1073742050: "leftalt",
    1073742052: "rightctrl",
    1073742053: "rightshift",
    1073742054: "rightalt",
};

// ===========================================================================

function and(var1, var2) {
	return (var1 && var2);
}

// ===========================================================================

function or(var1, var2) {
	return (var1 || var2);
}

// ===========================================================================

function not(var1) {
	return !var1;
}

// ===========================================================================

function bitAnd(var1, var2) {
	return var1 & var2;
}

// ===========================================================================

function bitOr(var1, var2) {
	return var1 | var2;
}

// ===========================================================================

function bitXor(var1, var2) {
	return var1 ^ var2;
}

// ===========================================================================

function bitNot(var1) {
	return ~var1;
}

// ===========================================================================

function bitLeftShift(var1, var2) {
	return var1 << var2;
}

// ===========================================================================

function bitRightShift(var1, var2) {
	return var1 >> var2;
}

// ===========================================================================

function greaterThan(var1, var2) {
	return var1 > var2;
}

// ===========================================================================

function lessThan(var1, var2) {
	return (var1 < var2);
}

// ===========================================================================

function greaterThanOrEqualTo(var1, var2) {
	return (var1 >= var2);
}

// ===========================================================================

function lessThanOrEqualTo(var1, var2) {
	return (var1 <= var2);
}

// ===========================================================================

function equals(var1, var2) {
	return (var1 == var2);
}

// ===========================================================================

function modulo(var1, var2) {
	return var1 % var2;
}

// ===========================================================================

function add(...args) {
	return args.reduce((acc, a) => {
		return acc + a;
	}, 0);
}

// ===========================================================================

function subtract(...args) {
	return args.reduce((acc, a) => {
		return acc - a;
	}, 0);
}

// ===========================================================================

function multiply(...args) {
	return args.reduce((acc, a) => {
		return acc * a;
	}, 0);
}

// ===========================================================================

function divide(...args) {
	return args.reduce((acc, a) => {
		return acc / a;
	}, 0);
}

// ===========================================================================

function toArray(...args) {
	return args;
}

// ===========================================================================

function toInteger(val) {
	return Number(val);
}

// ===========================================================================

function toFloat(val, fixed = 2) {
	return parseFloat((val).toFixed(fixed));
}

// ===========================================================================

function toString(val) {
	return String(val);
}

// ===========================================================================

function toVector3(x, y, z) {
	return new Vec3(toFloat(x), toFloat(y), toFloat(z));
}

// ===========================================================================

function toVector2(x, y) {
	return new Vec2(x, y);
}

// ===========================================================================

function toUpperCase(val) {
	return String(val).toUpperCase();
}

// ===========================================================================

function toLowerCase(val) {
	return String(val).toLowerCase();
}

// ===========================================================================

function isNull(val) {
	if(val == null) {
		return true;
	}

	if(typeof val === "undefined") {
		return true;
	}

	return false;
}

// ===========================================================================

function getEntityData(entity, dataName) {
	if(entity != null) {
		if(entity.getData != null) {
			return entity.getData(dataName);
		}
	}
    return null;
}

// ===========================================================================

function setEntityData(entity, dataName, dataValue, syncToClients = true) {
	if(entity != null) {
		if(!isNull(server)) {
			return entity.setData(dataName, dataValue, syncToClients);
		} else {
			return entity.setData(dataName, dataValue);
		}
	}
}

// ===========================================================================

function removeEntityData(entity, dataName) {
	if(entity != null) {
		return entity.removeData(dataName);
	}
    return null;
}

// ===========================================================================

function doesEntityDataExist(entity, dataName) {
	if(entity != null) {
		return (entity.getData(dataName) != null);
	}
	return null;
}

// ===========================================================================

function getDistance(vec1, vec2) {
	if(isNull(vec1) || isNull(vec2)) {
		return false;
	}
    return vec1.distance(vec2);
}

// ===========================================================================

function logToConsole(tempLogLevel, text) {
	if((logLevel & tempLogLevel) || logLevel == LOG_ALL) {
		if(tempLogLevel == LOG_ERROR) {
			console.error(text);
			return true;
		} else if(tempLogLevel == LOG_WARN) {
			console.warn(text);
			return true;
		} else {
			console.log(text);
			return true;
		}
	}
	return false;
}

// ===========================================================================

function Enum(constantsList) {
    let tempTable = {};
	for(let i in constantsList) {
        tempTable[constantsList[i]] = i;
    }
	return tempTable;
}



// ===========================================================================

function getGame() {
	if(isServerScript()) {
		return server.game;
	} else {
		return gta.game;
	}
}

// ===========================================================================

function isServerScript() {
	return (typeof server != "undefined");
}

// ===========================================================================

function doesGameHaveSnow(gameId) {
	return (getGame() != GAME_GTA_IV);
}

// ===========================================================================

function isGTAIV() {
	return (getGame() == GAME_GTA_IV);
}

// ===========================================================================

function getPercentage(num, per) {
	return (num/100)*per;
}

// ===========================================================================

let allowedSkins = [
	[],
	[ 	// GTA III
		//[0, "Claude", "Skin000.png"],
		//[1, "Police Officer", "Skin001.png"],
		//[2, "SWAT Officer", "Skin002.png"],
		//[3, "FBI Agent", "Skin003.png"],
		//[4, "Army Soldier", "Skin004.png"],
		//[5, "Paramedic", "Skin005.png"],
		//[6, "Firefighter", "Skin006.png"],
		[7, "Wise Guy", "Skin007.png"],
		//[8, "Taxi Driver", "Skin008.png"],
		[9, "Pimp", "Skin009.png"],
		[10, "Mafia Member", "Skin010.png"],
		[11, "Mafia Member", "Skin011.png"],
		[12, "Triad Member", "Skin012.png"],
		[13, "Triad Member", "Skin013.png"],
		[14, "Diablo Member", "Skin014.png"],
		[15, "Diablo Member", "Skin015.png"],
		[16, "Yakuza Member", "Skin016.png"],
		[17, "Yakuza Member", "Skin017.png"],
		[18, "Yardie Member", "Skin018.png"],
		[19, "Yardie Member", "Skin019.png"],
		[20, "Cartel Soldier", "Skin020.png"],
		[21, "Cartel Soldier", "Skin021.png"],
		[22, "Red Jacks Thug", "Skin022.png"],
		[23, "Purple Nines Thug", "Skin023.png"],
		[24, "Street Criminal", "Skin024.png"],
		[25, "Street Criminal", "Skin025.png"],
		[30, "Male Client", "Skin030.png"],
		[31, "Random Guy", "Skin031.png"],
		[32, "Vacationist", "Skin032.png"],
		[33, "Dj", "Skin033.png"],
		[34, "Young Woman", "Skin034.png"],
		[35, "Young Woman", "Skin035.png"],
		[36, "Business Woman", "Skin036.png"],
		[37, "Elder Woman", "Skin037.png"],
		[38, "Elder Woman", "Skin038.png"],
		[39, "Prostitute", "Skin039.png"],
		[40, "Prostitute", "Skin040.png"],
		[41, "Random Guy", "Skin041.png"],
		[42, "Diseased Man", "Skin042.png"],
		[43, "Deseased Woman", "Skin043.png"],
		[44, "Young Woman", "Skin044.png"],
		[45, "Old Man", "Skin045.png"],
		[46, "Random Guy", "Skin046.png"],
		[47, "Old Woman", "Skin047.png"],
		[48, "Old Woman", "Skin048.png"],
		[49, "Old Man", "Skin049.png"],
		[50, "Random Guy", "Skin050.png"],
		[51, "Old Woman", "Skin051.png"],
		[52, "Young Woman", "Skin052.png"],
		[53, "Docks Worker", "Skin053.png"],
		[54, "Docks Worker", "Skin054.png"],
		[55, "Male Street Bum", "Skin055.png"],
		[56, "Female Street Bum", "Skin056.png"],
		[57, "Delivery Guy", "Skin057.png"],
		[58, "Delivery Guy", "Skin058.png"],
		[59, "Business Man", "Skin059.png"],
		[60, "Marty Chonks", "Skin060.png"],
		[61, "CIA Agent", "Skin061.png"],
		[62, "Female Client", "Skin062.png"],
		[63, "Young Woman", "Skin063.png"],
		[64, "Business Woman", "Skin064.png"],
		[65, "Business Man", "Skin065.png"],
		[66, "Female Client", "Skin066.png"],
		[67, "Male Steward", "Skin067.png"],
		[68, "Female Steward", "Skin068.png"],
		[69, "Male Cocks Fan", "Skin069.png"],
		[70, "Male Cocks Fan", "Skin070.png"],
		[71, "Female Cocks Fan", "Skin071.png"],
		[72, "Male Paramedics Assistant", "Skin072.png"],
		[73, "Female Paramedics Assistant", "Skin073.png"],
		[74, "Construction Worker", "Skin074.png"],
		[75, "Construction Worker", "Skin075.png"],
		[76, "Zip Customer", "Skin076.png"],
		[77, "Party Woman", "Skin077.png"],
		[78, "Party Woman", "Skin078.png"],
		[80, "Female College Student", "Skin080.png"],
		[81, "Old Man", "Skin081.png"],
		[82, "Female Jogger", "Skin082.png"],
		[83, "Asuka Kasen", "Skin083.png"],
		[84, "Spank Suicide Bomber", "Skin084.png"],
		[85, "Salvatore's Butler", "Skin085.png"],
		[86, "Catalina", "Skin086.png"],
		[87, "Lee Chong", "Skin087.png"],
		[88, "Colombian Cartel Member", "Skin088.png"],
		[89, "Colombian Cartel Member", "Skin089.png"],
		[90, "Colombian Cartel Member", "Skin090.png"],
		[91, "Colombian Cartel Member", "Skin091.png"],
		//[92, "Police Officer", "Skin092.png"],
		[93, "Curly Bob", "Skin093.png"],
		[94, "Phil Cassidy", "Skin094.png"],
		[95, "Detective", "Skin095.png"],
		[96, "8-Ball", "Skin096.png"],
		[97, "8-Ball", "Skin097.png"],
		[98, "Salvatore Leone", "Skin098.png"],
		[99, "Mafia Member", "Skin099.png"],
		[100, "Joey Leone", "Skin100.png"],
		[101, "Joey Leone", "Skin101.png"],
		[102, "Bar Owner", "Skin102.png"],
		[103, "Kenji Kasen", "Skin103.png"],
		[104, "Mike Forelli", "Skin104.png"],
		[105, "Donald Love", "Skin105.png"],
		[106, "Donald Love", "Skin106.png"],
		[107, "Luigi Goterelli", "Skin107.png"],
		[108, "Maria Latore", "Skin108.png"],
		[109, "Mickey Hamfists", "Skin109.png"],
		[110, "Miguel", "Skin110.png"],
		[111, "Misty", "Skin111.png"],
		[112, "Old Oriental Gentleman", "Skin112.png"],
		[113, "Old Oriental Gentleman", "Skin113.png"],
		[114, "Old Oriental Gentleman", "Skin114.png"],
		[115, "Ray Machowski", "Skin115.png"],
		[116, "Mafia Member", "Skin116.png"],
		[118, "Tanner", "Skin118.png"],
		[119, "Toni Cipriani", "Skin119.png"],
		[120, "Darkel", "Skin120.png"],
		//[121, "Chuff Security Officer", "Skin121.png"]
	],
	[ 	// GTA Vice City
		//[0, "Tommy Vercetti", false],
		//[1, "Police Officer", false],
		//[2, "SWAT Officer", false],
		//[3, "FBI Agent", false],
		//[4, "Army Soldier", false],
		//[5, "Paramedic", false],
		//[6, "Fireman", false],
		[7, "Golfer", false],
		//[8, "INVALID", false],
		[9, "Random Lady", false],
		[10, "Bum", false],
		[11, "Greaser", false],
		[12, "Random Guy", false],
		[13, "Random Guy", false],
		[14, "Random Lady", false],
		[15, "Random Guy", false],
		[16, "Random Guy", false],
		[17, "Beach Girl", false],
		[18, "Fat Beach Lady", false],
		[19, "Beach Guy", false],
		[20, "Fat Beach Guy", false],
		[21, "Random Lady", false],
		[22, "Random Lady", false],
		[23, "Random Lady", false],
		[24, "Prostitute", false],
		[25, "Bum", false],
		[26, "Bum", false],
		[27, "Random Guy", false],
		[28, "Taxi Driver", false],
		[29, "Haitian", false],
		[30, "Criminal", false],
		[31, "Random Lady", false],
		[32, "Random Lady", false],
		[33, "Random Guy", false],
		[34, "Random Guy", false],
		[35, "Random Lady", false],
		[36, "Random Lady", false],
		[37, "Random Guy", false],
		[38, "Beach Lady", false],
		[39, "Beach Guy", false],
		[40, "Beach Lady", false],
		[41, "Beach Guy", false],
		[42, "Random Guy", false],
		[43, "Prostitute", false],
		[44, "Bum", false],
		[45, "Bum", false],
		[46, "Random Guy", false],
		[47, "Random Guy", false],
		[48, "Punk", false],
		[49, "Prostitute", false],
		[50, "Random Old Lady", false],
		[51, "Punk", false],
		[52, "Random Guy", false],
		[53, "Random Lady", false],
		[54, "Random Lady", false],
		[55, "Random Guy", false],
		[56, "Random Guy", false],
		[57, "Beach Lady", false],
		[58, "Beach Guy", false],
		[59, "Beach Lady", false],
		[60, "Beach Guy", false],
		[61, "Construction Worker", false],
		[62, "Golfer", false],
		[63, "Golfer", false],
		[64, "Golfer", false],
		[65, "Beach Lady", false],
		[66, "Beach Guy", false],
		[67, "Random Lady", false],
		[68, "Random Guy", false],
		[69, "Random Guy", false],
		[70, "Prostitute", false],
		[71, "Bum Lady", false],
		[72, "Random Guy", false],
		[73, "Random Guy", false],
		[74, "Taxi Driver", false],
		[75, "Random Woman", false],
		[76, "Skater Guy", false],
		[77, "Beach Lady", false],
		[78, "Skater Guy", false],
		[79, "Young Woman Shopper", false],
		[80, "Old Women Shopper", false],
		[81, "Tourist", false],
		[82, "Tourist", false],
		[83, "Cuban", false],
		[84, "Cuban", false],
		[85, "Haitian", false],
		[86, "Haitian", false],
		[87, "Shark", false],
		[88, "Shark", false],
		[89, "Diaz Guy", false],
		[90, "Diaz Guy", false],
		//[91, "Security Guard", false],
		//[92, "Security Guard", false],
		[93, "Biker", false],
		[94, "Biker", false],
		[95, "Vercetti Guy", false],
		[96, "Vercetti Guy", false],
		//[97, "Undercover Cop", false],
		//[98, "Undercover Cop", false],
		//[99, "Undercover Cop", false],
		//[100, "Undercover Cop ", false],
		//[101, "Undercover Cop", false],
		//[102, "Undercover Cop", false],
		[103, "Random Guy", false],
		[104, "Bodyguard", false],
		[105, "Prostitute", false],
		[106, "Prostitute", false],
		[107, "Ricardo Diaz", false],
		[108, "Love Fist Guy", false],
		[109, "Ken Rosenburg", false],
		[110, "Candy Suxx", false],
		[111, "Hilary", false],
		[112, "Love Fist", false],
		[113, "Phil", false],
		[114, "Rockstar Guy", false],
		[115, "Sonny", false],
		[116, "Lance", false],
		[117, "Mercedes", false],
		[118, "Love Fist", false],
		[119, "Alex Scrub", false],
		//[120, "Officer Lance Vance", false],
		[121, "Lance Vance", false],
		[122, "Cortez", false],
		//[123, "SWAT 2", false],
		[124, "Columbian", false],
		[125, "Hilary", false],
		[126, "Mercedes", false],
		[127, "Cam", false],
		[128, "Cam", false],
		[129, "Phil", false],
		[130, "Phil", false],
		[131, "Bodyguard", false],
		[132, "Pizza Worker", false],
		[133, "Taxi Driver", false],
		[134, "Taxi Driver", false],
		[135, "Sailor", false],
		[136, "Sailor", false],
		[137, "Sailor", false],
		[138, "Chef", false],
		[139, "Criminal", false],
		[140, "French Guy", false],
		[141, "Worker", false],
		[142, "Haitian", false],
		[143, "Waitress", false],
		[144, "Forelli Member", false],
		[145, "Forelli Member", false],
		[146, "Forelli Member", false],
		[147, "Columbian", false],
		[148, "Random Guy", false],
		[149, "Beach Guy", false],
		[150, "Random Guy", false],
		[151, "Random Guy", false],
		[152, "Random Guy", false],
		[153, "Drag Queen", false],
		[154, "Diaz Traitor", false],
		[155, "Random Guy", false],
		[156, "Random Guy", false],
		[157, "Stripper", false],
		[158, "Stripper", false],
		[159, "Stripper", false],
		[160, "Store Clerk", false],
		[161, "Tommy Vercetti", false],
		[162, "Tommy Vercetti (Business Suit)", false],
		[163, "Tommy Vercetti (SpandEx Overalls)", false],
		[164, "Tommy Vercetti (Golfer)", false],
		[165, "Tommy Vercetti (Cuban)", false],
		//[166, "Tommy Vercetti (Cop)", false],
		[167, "Tommy Vercetti (Robbery Suit)", false],
		[168, "Tommy Vercetti (T-Shirt and Jeans)", false],
		[169, "Tommy Vercetti (Striped Suit)", false],
		[170, "Tommy Vercetti (Black Tracksuit)", false],
		[171, "Tommy Vercetti (Red Tracksuit)", false],
		[172, "Club Bouncer", false],
		[173, "Club Bouncer", false],
		[174, "Stripclub Dancer", false],
		[175, "Random Guy", false],
		[176, "Stripclub Dancer", false],
		[177, "Stripclub Dancer", false],
		[178, "Stripclub Dancer", false],
		[179, "Gang Member", false],
		[180, "Tommy Vercetti (Endgame T-Shirt)", false],
		[181, "Forelli Thug", false],
		[182, "Forelli Thug", false],
		[183, "Random Lady", false],
		[184, "Gang Member", false],
		[185, "Party Waitress", false],
		[186, "Kent Paul", false],
		[187, "Big Head Taxi Driver", false],
	],

	[ // GTA San Andreas
		//[0, "Carl 'CJ' Johnson", false],
		[1, "The Truth", false],
		[2, "Maccer", false],
		[6, "Taxi Driver/Train Driver", false],
		[9, "Normal Ped", false],
		[10, "Old Woman", false],
		[11, "Casino Croupier", false],
		[12, "Rich Woman", false],
		[13, "Street Girl", false],
		[14, "Normal Ped", false],
		[15, "Mr.Whittaker (RS Haul Owner)", false],
		[16, "Airport Ground Worker", false],
		[17, "Businessman", false],
		[18, "Beach Visitor", false],
		[19, "DJ", false],
		[20, "Rich Guy (Madd Doggs Manager)", false],
		[21, "Normal Ped", false],
		[22, "Normal Ped", false],
		[23, "Bmxer", false],
		[24, "Madd Dogg Bodyguard", false],
		[25, "Madd Dogg Bodyguard", false],
		[26, "Backpacker", false],
		[27, "Construction Worker", false],
		[28, "Drug Dealer", false],
		[29, "Drug Dealer", false],
		[30, "Drug Dealer", false],
		[31, "Farm-Town Inhabitant", false],
		[32, "Farm-Town Inhabitant", false],
		[33, "Farm-Town Inhabitant", false],
		[34, "Farm-Town Inhabitant", false],
		[35, "Gardener", false],
		[36, "Golfer", false],
		[37, "Golfer", false],
		[38, "Normal Ped", false],
		[39, "Normal Ped", false],
		[40, "Normal Ped", false],
		[41, "Normal Ped", false],
		[43, "Normal Ped", false],
		[44, "Normal Ped", false],
		[45, "Beach Visitor", false],
		[46, "Normal Ped", false],
		[47, "Normal Ped", false],
		[48, "Normal Ped", false],
		[49, "Snakehead (Da Nang)", false],
		[50, "Mechanic", false],
		[51, "Mountain Biker", false],
		[52, "Mountain Biker", false],
		[53, "Unknown", false],
		[54, "Normal Ped", false],
		[55, "Normal Ped", false],
		[56, "Normal Ped", false],
		[57, "Oriental Ped", false],
		[58, "Oriental Ped", false],
		[59, "Normal Ped", false],
		[60, "Normal Ped", false],
		[61, "Pilot", false],
		[62, "Colonel Fuhrberger", false],
		[63, "Prostitute", false],
		[64, "Prostitute", false],
		[66, "Pool Player", false],
		[67, "Pool Player", false],
		[68, "Priest/Preacher", false],
		[69, "Normal Ped", false],
		[70, "Scientist", false],
		[71, "Security Guard", false],
		[72, "Hippy", false],
		[73, "Hippy", false],
		[75, "Prostitute", false],
		[76, "Stewardess", false],
		[77, "Homeless", false],
		[78, "Homeless", false],
		[79, "Homeless", false],
		[80, "Boxer", false],
		[81, "Boxer", false],
		[82, "Black Elvis", false],
		[83, "White Elvis", false],
		[84, "Blue Elvis", false],
		[85, "Prostitute", false],
		[87, "Stripper", false],
		[88, "Normal Ped", false],
		[89, "Normal Ped", false],
		[90, "Jogger", false],
		[91, "Rich Woman", false],
		[92, "Rollerskater", false],
		[93, "Normal Ped", false],
		[94, "Normal Ped", false],
		[95, "Normal Ped", false],
		[96, "Jogger", false],
		[97, "Lifeguard", false],
		[98, "Normal Ped", false],
		[99, "Rollerskater", false],
		[100, "Biker", false],
		[101, "Normal Ped", false],
		[102, "Ballas Gang Member", false],
		[103, "Ballas Gang Member", false],
		[104, "Ballas Gang Member", false],
		[105, "Grove Street Families Gang Member", false],
		[106, "Grove Street Families Gang Member", false],
		[107, "Grove Street Families Gang Member", false],
		[108, "Los Santos Vagos Gang Member", false],
		[109, "Los Santos Vagos Gang Member", false],
		[110, "Los Santos Vagos Gang Member", false],
		[111, "Russian Mafioso", false],
		[112, "Russian Mafioso", false],
		[113, "Russian Mafioso", false],
		[114, "Varios Los Aztecas Gang Member", false],
		[115, "Varios Los Aztecas Gang Member", false],
		[116, "Varios Los Aztecas Gang Member", false],
		[117, "Triad", false],
		[118, "Triad", false],
		[120, "Triad Boss", false],
		[121, "Da Nang Boy", false],
		[122, "Da Nang Boy", false],
		[123, "Da Nang Boy", false],
		[124, "Italian Mafioso", false],
		[125, "Italian Mafioso", false],
		[126, "Italian Mafioso", false],
		[127, "Italian Mafioso", false],
		[128, "Farm Inhabitant", false],
		[129, "Farm Inhabitant", false],
		[130, "Farm Inhabitant", false],
		[131, "Farm Inhabitant", false],
		[132, "Farm Inhabitant", false],
		[133, "Farm Inhabitant", false],
		[134, "Homeless", false],
		[135, "Homeless", false],
		[136, "Normal Ped", false],
		[137, "Homeless", false],
		[138, "Beach Visitor", false],
		[139, "Beach Visitor", false],
		[140, "Beach Visitor", false],
		[141, "Businesswoman", false],
		[142, "Taxi Driver", false],
		[143, "Crack Maker", false],
		[144, "Crack Maker", false],
		[145, "Crack Maker", false],
		[146, "Crack Maker", false],
		[147, "Businessman", false],
		[148, "Businesswoman", false],
		//[149, "INVALID", false],
		[150, "Businesswoman", false],
		[151, "Normal Ped", false],
		[152, "Prostitute", false],
		[153, "Construction Worker", false],
		[154, "Beach Visitor", false],
		[155, "Well Stacked Pizza Worker", false],
		[156, "Barber", false],
		[157, "Hillbilly", false],
		[158, "Farmer", false],
		[159, "Hillbilly", false],
		[160, "Hillbilly", false],
		[161, "Farmer", false],
		[162, "Hillbilly", false],
		[163, "Black Bouncer", false],
		[164, "White Bouncer", false],
		[165, "White MIB Agent", false],
		[166, "Black MIB Agent", false],
		[167, "Cluckin Bell Worker", false],
		[168, "Hotdog/Chilli Dog Vendor", false],
		[169, "Normal Ped", false],
		[170, "Normal Ped", false],
		[171, "Blackjack Dealer", false],
		[172, "Casino Croupier", false],
		[173, "San Fierro Rifa", false],
		[174, "San Fierro Rifa", false],
		[175, "San Fierro Rifa", false],
		[176, "Barber", false],
		[177, "Barber", false],
		[178, "Whore", false],
		[179, "Ammunation Salesman", false],
		[180, "Tattoo Artist", false],
		[181, "Punk", false],
		[182, "Cab Driver", false],
		[183, "Normal Ped", false],
		[184, "Normal Ped", false],
		[185, "Normal Ped", false],
		[186, "Normal Ped", false],
		[187, "Businessman", false],
		[188, "Normal Ped", false],
		[189, "Valet", false],
		[190, "Barbara Schternvart", false],
		[191, "Helena Wankstein", false],
		[192, "Michelle Cannes", false],
		[193, "Katie Zhan", false],
		[194, "Millie Perkins", false],
		[195, "Denise Robinson", false],
		[196, "Farm-Town Inhabitant", false],
		[197, "Hillbilly", false],
		[198, "Farm-Town Inhabitant", false],
		[199, "Farm-Town Inhabitant", false],
		[200, "Hillbilly", false],
		[201, "Farmer", false],
		[202, "Farmer", false],
		[203, "Karate Teacher", false],
		[204, "Karate Teacher", false],
		[205, "Burger Shot Cashier", false],
		[206, "Cab Driver", false],
		[207, "Prostitute", false],
		[209, "Oriental Noodle Stand Vendor", false],
		[210, "Oriental Boating School Instructor", false],
		[211, "Clothes Shop Staff", false],
		[212, "Homeless", false],
		[213, "Weird Old Man", false],
		[214, "Waitress (Maria Latore)", false],
		[215, "Normal Ped", false],
		[216, "Normal Ped", false],
		[217, "Clothes Shop Staff", false],
		[218, "Normal Ped", false],
		[219, "Rich Woman", false],
		[220, "Cab Driver", false],
		[221, "Normal Ped", false],
		[222, "Normal Ped", false],
		[223, "Normal Ped", false],
		[224, "Normal Ped", false],
		[225, "Normal Ped", false],
		[226, "Normal Ped", false],
		[227, "Oriental Businessman", false],
		[228, "Oriental Ped", false],
		[229, "Oriental Ped", false],
		[230, "Homeless", false],
		[231, "Normal Ped", false],
		[232, "Normal Ped", false],
		[233, "Normal Ped", false],
		[234, "Cab Driver", false],
		[235, "Normal Ped", false],
		[236, "Normal Ped", false],
		[237, "Prostitute", false],
		[238, "Prostitute", false],
		[239, "Homeless", false],
		[240, "The D.A", false],
		[241, "Afro-American", false],
		[242, "Mexican", false],
		[243, "Prostitute", false],
		[244, "Stripper", false],
		[245, "Prostitute", false],
		[246, "Stripper", false],
		[247, "Biker", false],
		[248, "Biker", false],
		[249, "Pimp", false],
		[250, "Normal Ped", false],
		[251, "Lifeguard", false],
		[252, "Naked Valet", false],
		[253, "Bus Driver", false],
		[254, "Biker Drug Dealer", false],
		[255, "Chauffeur (Limo Driver)", false],
		[256, "Stripper", false],
		[257, "Stripper", false],
		[258, "Heckler", false],
		[259, "Heckler", false],
		[260, "Construction Worker", false],
		[261, "Cab Driver", false],
		[262, "Cab Driver", false],
		[263, "Normal Ped", false],
		[264, "Clown (Ice-Cream Van Driver)", false],
		//[265, "Officer Frank Tenpenny", false],
		//[266, "Officer Eddie Pulaski", false],
		//[267, "Officer Jimmy Hernandez", false],
		[268, "Dwaine/Dwayne", false],
		[269, "Melvin Big Smoke Harris (Mission)", false],
		[270, "Sean Sweet Johnson", false],
		[271, "Lance Ryder Wilson", false],
		[272, "Mafia Boss", false],
		//[274, "Paramedic", false],
		//[275, "Paramedic", false],
		//[276, "Paramedic", false],
		//[277, "Firefighter", false],
		//[278, "Firefighter", false],
		//[279, "Firefighter", false],
		//[280, "Los Santos Police Officer", false],
		//[281, "San Fierro Police Officer", false],
		//[282, "Las Venturas Police Officer", false],
		//[283, "County Sheriff", false],
		//[284, "Motorbike Cop", false],
		//[285, "S.W.A.T.", false],
		//[286, "Federal Agent", false],
		//[287, "Army Soldier", false],
		//[288, "Desert Sheriff", false],
		[290, "Ken Rosenberg", false],
		[291, "Kent Paul", false],
		[292, "Cesar Vialpando", false],
		[293, "Jeffery Og Loc Martin/Cross", false],
		[294, "Wu Zi Mu (Woozie)", false],
		[295, "Michael Toreno", false],
		[296, "Jizzy B.", false],
		[297, "Madd Dogg", false],
		[298, "Catalina", false],
		[299, "Claude Speed", false],
		[300, "Lance Ryder Wilson", false],
		[301, "Lance Ryder Wilson (robbery mask)", false],
		[302, "Emmet", false],
		[303, "Unknown", false],
		[304, "Denise", false],
		[305, "Jethro", false],
		[306, "Zero", false],
		[307, "T-Bone Mendez", false],
		[308, "Forelli", false],
		[309, "Mechanic", false],
		[310, "Barry Big Bear Thorne (Skinny)", false],
		[311, "Melvin Big Smoke Harris (Vest)", false],
		//[312, "Army Guy", false],
		[313, "Barry Big Bear Thorne (Fat)", false],
	],

	[	// Underground

	],

	[	// GTA IV
		//[-2020305438,"Male Multiplayer",false],
		//[-641875910,"Female Multiplayer",false],
		//[-1370810922,"MODEL_SUPERLOD",false],
		[1853617247,"Anna",false],
		[-1646893330,"Anthony",false],
		[1495769888,"Badman",false],
		[1500493064,"Bernie Crane",false],
		[1731510984,"Bledar",false],
		[422305098,"Brian",false],
		[-1729980128,"Brucie",false],
		[237511807,"Bulgarin",false],
		[88667657,"Charise",false],
		[-1328445565,"Charlie Undercover",false],
		[1343144208,"Clarence",false],
		[1468450703,"Dardan",false],
		[386513184,"Darko",false],
		[1169442297,"Derric",false],
		[237497537,"Dmitri",false],
		[-617264103,"Dwayne",false],
		[-1600585231,"Eddie",false],
		[57218969,"Faustin",false],
		[1710545037,"Francis",false],
		[1424670436,"French Tom",false],
		[2129490787,"Gordon",false],
		[-357652594,"Gracie",false],
		[980768434,"Hossan",false],
		[-835225126,"Ilyena",false],
		[-479595866,"Issac",false],
		[1166762483,"Ivan",false],
		[364686627,"Jay",false],
		[170756246,"Jason",false],
		[390357829,"Jeff",false],
		[-366421228,"Jimmy",false],
		[-911507684,"Johnny Klebitz",false],
		[-773750838,"Kate",false],
		[995576506,"Kenny",false],
		[1487004273,"Lil Jacob",false],
		[-1275031987,"Lil Jacob 2,",false],
		[-681942840,"Luca",false],
		[-492470690,"Luis",false],
		[-1040287406,"Mallorie",false],
		[-322700377,"Mam",false],
		[1445589009,"Manny",false],
		[411185872,"Marnie",false],
		[-807339118,"Mel",false],
		[735211577,"Michael",false],
		[-1080659212,"Michelle",false],
		[-636669566,"Mickey",false],
		[1690783035,"Packie",false],
		[-165448092,"Pathos",false],
		[-1947682830,"Petrovic",false],
		[-1826458934,"Phil Bell",false],
		[1794146792,"Playboy X",false],
		[954215094,"Ray Boccino",false],
		[-587324132,"Ricky",false],
		[-1992728631,"Roman",false],
		[558221221,"Roman 2,",false],
		[-17823883,"Sarah",false],
		[1384833284,"Tuna",false],
		[-1014976873,"Vinny Spaz",false],
		[896408642,"Vlad",false],
		[-301223260,"Black Street Thug 1,",false],
		[-1143910864,"Black Street Thug 2,",false],
		[869501081,"Black Street OG 1,",false],
		[632613980,"Black Street OG 1,",false],
		[-503930010,"Albanian Thug 1,",false],
		[-235584669,"Albanian Thug 2,",false],
		[207714363,"Albanian Thug 3,",false],
		[514268366,"Albanian Thug 4,",false],
		[43005364,"Biker 1,",false],
		[1346668127,"Biker 2,",false],
		[-1677255197,"Biker 3,",false],
		[-1461281345,"Biker 4,",false],
		[1574850459,"Biker 5,",false],
		[-1953289472,"Biker 6,",false],
		[280474699,"Irish Man 1,",false],
		[-19263344,"Irish Man 2,",false],
		[1844702918,"Irish Man 3,",false],
		[1609755055,"Jamaican OG 1,",false],
		[-330497431,"Jamaican OG 2,",false],
		[1117105909,"Jamaican OG 3,",false],
		[-1500397869,"Jamaican Thug 1,",false],
		[-881358690,"Jamaican Thug 2,",false],
		[1540383669,"Asian Man 1,",false],
		[764249904,"Asian Man 2,",false],
		[492147228,"Hispanic Man 1,",false],
		[-1926041127,"Hispanic Man 2,",false],
		[1168388225,"Hispanic Man 3,",false],
		[-1746774780,"Hispanic Man 4,",false],
		[-302362397,"Fat Italian Mafia Boss",false],
		[-1616890832,"Italian Mafia Boss",false],
		[64730935,"Italian Mafia Associate",false],
		[510389335,"Fat Italian Mafia Associate",false],
		[-1836006237,"Russian Thug 1,",false],
		[-2088164056,"Russian Thug 2,",false],
		[1976502708,"Russian Thug 3,",false],
		[1543404628,"Russian Thug 4,",false],
		[1865532596,"Russian Thug 5,",false],
		[431692232,"Russian Thug 6,",false],
		[1724587620,"Russian Thug 7,",false],
		[-1180674815,"Russian Thug 8,",false],
		[871281791,"Triad Boss 1,",false],
		[683712035,"Triad Boss 2,",false],
		[-1084007777,"Triad Member 3,",false],
		[-164935626,"Triad Member 4,",false],
		[-751071255,"Female Maid",false],
		[-109247258,"Female Binco Worker",false],
		[1366257926,"Female Bank Teller",false],
		[346338575,"Female Doctor",false],
		[1350216795,"Female Gym Worker",false],
		[924926104,"Female Burger Shot Worker",false],
		[-346378101,"Female Cluckin Bell Worker",false],
		[-2104311883,"Female Rockstar Cafe Worker",false],
		[212900845,"Female TW@ Cafe Worker",false],
		[-290070895,"Female Well Stacked Pizza Worker",false],
		[552542187,"Hooker",false],
		[996267216,"Hooker 2,",false],
		[-1193778389,"Nurse",false],
		[1113677074,"Stripper 1,",false],
		[1353709999,"Stripper 2,",false],
		[24233425,"Waitress",false],
		[-1761003415,"Alcoholic Man",false],
		[1075583233,"Armoured Truck Driver",false],
		[134077503,"Bus Driver",false],
		[757349871,"Generic Asian Man",false],
		[-1827421800,"Black Crackhead",false],
		[219393781,"Doctor (Scrubs)",false],
		[-1186940778,"Doctor",false],
		[375732086,"Doctor (Blood Covered Coat)",false],
		[2105015949,"Cook",false],
		[-200234085,"Italian Mob Enforcer",false],
		[800131009,"Factory Worker",false],
		[-999506922,"FIB Agent",false],
		[-1993909080,"Fat Delivery Driver",false],
		[610888851,"Fire Chief",false],
		[486302863,"Mercenary Soldier",false],
		[-778316080,"Helicopter Pilot",false],
		[624314380,"Hotel Doorman",false],
		[-1784833142,"Korean Cook",false],
		[-1852976689,"Lawyer 1,",false],
		[-1134712978,"Lawyer 2,",false],
		[379171768,"Loony Black Man",false],
		[-1945168882,"Pilot",false],
		[807236245,"Generic Man",false],
		[-284362863,"Postal Worker",false],
		[-1188246269,"Saxophone Player",false],
		[-1870989171,"Security Guard",false],
		[420915580,"Stadium Food Vendor",false],
		[1878085135,"Stadium Food Cook",false],
		[142730876,"Street Food Vendor",false],
		[-690681764,"Street Sweeper Driver",false],
		[8772846,"Taxi Driver",false],
		[1186270890,"Telephone Company Worker",false],
		[-379234846,"Tennis Player",false],
		[1159759556,"Train Conductor",false],
		[-142386662,"Homeless Black Man",false],
		[-46564867,"Trucker",false],
		[-1284047560,"Janitor",false],
		[22944263,"Hotel Doorman 2,",false],
		[1178487645,"Mob Boss",false],
		[-1464712858,"Airport Worker",false],
		[-2139064254,"Bartender",false],
		[-1780698891,"Biker Bouncer",false],
		[-409283472,"High End Club Bouncer",false],
		[-799229885,"Bowling Alley Worker",false],
		[-434183225,"Bowling Alley Worker 2,",false],
		[768442188,"Chinese Food Vendor",false],
		[676448572,"Club Security",false],
		[-722019798,"Construction Worker",false],
		[-1015957728,"Construction Worker 2,",false],
		[-714220780,"Construction Worker 3,",false],
		[-183203150,"Police Officer",false],
		[-1518937979,"Traffic Officer",false],
		[-370395528,"Fat Police Officer",false],
		[-1371133859,"Courier",false],
		[-573788283,"Cowboy 1,",false],
		[-1283406538,"Drug Dealer 1,",false],
		[1448755353,"Drug Dealer 2,",false],
		[989485,"Male Burger Shot Worker",false],
		[-1011530423,"Male Cluckin Bell Worker",false],
		[1979561477,"Male Rockstar Cafe Worker",false],
		[-786449781,"Male TW@ Cafe Worker",false],
		[206941425,"Male Well Stacked Pizza Worker",false],
		[-610224615,"Firefighter",false],
		[1136499716,"Garbage Collector",false],
		[897868981,"Goon",false],
		[-1902758612,"Male Gym Worker",false],
		[-356904519,"Mechanic 2,",false],
		[-1056268969,"Male Modo Worker",false],
		[1201610759,"Helicopter Pilot",false],
		[-151000142,"Perseus",false],
		[501136335,"Generic Male 1,",false],
		[186619473,"Generic Male 2,",false],
		[-111611196,"Generic Male 3,",false],
		[-1175077216,"Paramedic",false],
		[-1676937780,"Prisoner",false],
		[215190023,"Prisoner 2,",false],
		[1552970117,"Roman's Taxi Service Driver",false],
		[-1481923910,"Male Runner",false],
		[357919731,"Male Shop Assistant 1,",false],
		[-89302119,"State Trooper",false],
		[-1004762946,"SWAT",false],
		[-64233032,"Sword Swallower",false],
		[-1292254815,"Thief",false],
		[271284208,"Valet",false],
		[-186113957,"Vendor",false],
		[-2015686009,"French Tom",false],
		[1977784957,"Jim Fitz",false],
		[-203833294,"East European Woman",false],
		[189853472,"East European Woman 2,",false],
		[-349043578,"Woman",false],
		[-114937692,"Jersey Woman",false],
		[-1697333660,"Oriental Woman",false],
		[100706569,"Rich Woman",false],
		[155063868,"Business Woman 1,",false],
		[394310337,"Business Woman 2,",false],
		[1375728805,"Chinatown Woman",false],
		[-284229525,"Business Woman 3,",false],
		[677687516,"East European Woman 3,",false],
		[-1188238883,"Fat Black Woman",false],
		[-2075220936,"Jersey Woman 1,",false],
		[-1356924456,"Jersey Woman 2,",false],
		[812112483,"Fat Hispanic Woman 1,",false],
		[-129242580,"Fat Hispanic Woman 2,",false],
		[852423121,"White Manhattan Woman",false],
		[76551508,"Black Manhattan Woman",false],
		[-2118501976,"Old Asian Woman",false],
		[1616769823,"Old Rich Woman",false],
		[453889158,"Business Woman 4,",false],
		[824245375,"Asian Woman in Dress",false],
		[-1362442041,"Fat Black Bronx Woman",false],
		[-1788328884,"Random White Woman",false],
		[-1523915823,"Random Hispanic Woman",false],
		[-949987237,"Random Eastern European Woman",false],
		[-1926577323,"Random Black Woman",false],
		[168065679,"Black Harlem Woman 1,",false],
		[441464,"Fat Jersey Woman 1,",false],
		[54114008,"Fat Hispanic Woman 3,",false],
		[-292713088,"Hispanic Woman 1,",false],
		[1743814728,"Hispanic Woman 2,",false],
		[1670568326,"Manhattan Woman 1,",false],
		[1354281938,"Manhattan Woman 2,",false],
		[1056837725,"Manhattan Woman 1,",false],
		[-1193633577,"Asian Woman 1,",false],
		[713691120,"Black Woman 2,",false],
		[-1780385799,"Rich White Woman 1,",false],
		[-952185135,"Asian Woman",false],
		[1586287288,"Female Shopper 1,",false],
		[1848013291,"Female Shopper 2,",false],
		[-1702036227,"Female Shopper 3,",false],
		[1182843182,"Female Socialite 1,",false],
		[-900623157,"Street Woman 1,",false],
		[286007875,"Street Woman 2,",false],
		[1473654742,"Street Woman 3,",false],
		[-1850743775,"Street Woman 4,",false],
		[1290755317,"Street Woman 5,",false],
		[1872110126,"Street Woman 6,",false],
		[1754440500,"Tourist Woman 1,",false],
		[761763258,"MODEL_F_Y_VILLBO_01,",false],
		[-636579119,"Business Man 1,",false],
		[-1754526315,"Business Man 2,",false],
		[-1516474414,"Street Criminal 1,",false],
		[-1821258883,"Street Criminal 2,",false],
		[1952671026,"Obese Mafia Thug",false],
		[-1991603022,"Gay Man 1,",false],
		[-1080673049,"Homeless Bum 1,",false],
		[495499562,"Loony White Man 1,",false],
		[-1984134881,"MODEL_M_M_MIDTOWN_01,",false],
		[1063816580,"Business Man 2,",false],
		[208763854,"Eastern European Man 1,",false],
		[-1020237172,"Fat Black Man 2,",false],
		[1782277836,"MODEL_M_M_PINDUS_02,",false],
		[-1402442039,"Fat Italian Man 1,",false],
		[-1628417063,"Italian Man 2,",false],
		[1158569407,"Hispanic Man 1,",false],
		[1969438324,"Hispanic Man 2,",false],
		[1621955848,"Hispanic Man 3,",false],
		[-657489059,"Tourist Man 1,",false],
		[-1307068958,"Black Business Man 1,",false],
		[734334931,"Asian Man 3,",false],
		[1865082075,"MODEL_M_M_PRICH_01,",false],
		[-432593815,"MODEL_M_O_EASTEURO_01,",false],
		[-1639359785,"Hasidic Jewish Man 1,",false],
		[1656087115,"Old Man 1,",false],
		[2034185905,"MODEL_M_O_PEASTEURO_02,",false],
		[1316404726,"MODEL_M_O_PHARBRON_01,",false],
		[980990533,"MODEL_M_O_PJERSEY_01,",false],
		[-1298691925,"MODEL_M_O_STREET_01,",false],
		[243672348,"Old Business Man",false],
		[2085884255,"MODEL_M_Y_BOHO_01,",false],
		[221246143,"MODEL_M_Y_BOHOGUY_01,",false],
		[52357603,"MODEL_M_Y_BRONX_01,",false],
		[1530937394,"Black Business Man 2,",false],
		[690281432,"Black Business Man 3,",false],
		[-1149743642,"Asian Man 4,",false],
		[-314369597,"Chopshop Mechanic 1,",false],
		[-552829610,"Chopshop Mechanic 2,",false],
		[-1097188138,"MODEL_M_Y_DODGY_01,",false],
		[-1775659292,"MODEL_M_Y_DORK_02,",false],
		[1207402441,"MODEL_M_Y_DOWNTOWN_01,",false],
		[1500619449,"MODEL_M_Y_DOWNTOWN_02,",false],
		[594261682,"MODEL_M_Y_DOWNTOWN_03,",false],
		[-747824291,"MODEL_M_Y_GAYYOUNG",false],
		[-677160979,"MODEL_M_Y_GENSTREET_11,",false],
		[-1678614360,"MODEL_M_Y_GENSTREET_16,",false],
		[989044076,"MODEL_M_Y_GENSTREET_20,",false],
		[1180218190,"MODEL_M_Y_GENSTREET_34,",false],
		[-1420592428,"MODEL_M_Y_HARDMAN_01,",false],
		[-1222963415,"MODEL_M_Y_HARLEM_01,",false],
		[-1746153269,"MODEL_M_Y_HARLEM_02,",false],
		[2104499156,"MODEL_M_Y_HARLEM_04,",false],
		[-1874580889,"Hasidic Jewish Man 2,",false],
		[-1055386282,"MODEL_M_Y_LEASTSIDE_01,",false],
		[575808580,"MODEL_M_Y_PBRONX_01,",false],
		[-71980543,"MODEL_M_Y_PCOOL_01,",false],
		[-195159218,"MODEL_M_Y_PCOOL_02,",false],
		[697247370,"MODEL_M_Y_PEASTEURO_01,",false],
		[670406267,"MODEL_M_Y_PHARBRON_01,",false],
		[26615298,"MODEL_M_Y_PHARLEM_01,",false],
		[1542927558,"MODEL_M_Y_PJERSEY_01,",false],
		[-1806886352,"MODEL_M_Y_PLATIN_01,",false],
		[-1022920796,"MODEL_M_Y_PLATIN_02,",false],
		[-1326394505,"MODEL_M_Y_PLATIN_03,",false],
		[607901190,"MODEL_M_Y_PMANHAT_01,",false],
		[1968470106,"MODEL_M_Y_PMANHAT_02,",false],
		[-344136289,"MODEL_M_Y_PORIENT_01,",false],
		[560413584,"MODEL_M_Y_PQUEENS_01,",false],
		[1352017873,"MODEL_M_Y_PRICH_01,",false],
		[223726252,"MODEL_M_Y_PVILLBO_01,",false],
		[-1252681043,"MODEL_M_Y_PVILLBO_02,",false],
		[-1562020391,"MODEL_M_Y_PVILLBO_03,",false],
		[1223224881,"MODEL_M_Y_QUEENSBRIDGE",false],
		[-1220737489,"MODEL_M_Y_SHADY_02,",false],
		[1755322862,"MODEL_M_Y_SKATEBIKE_01,",false],
		[386690478,"MODEL_M_Y_SOHO_01,",false],
		[62496225,"MODEL_M_Y_STREET_01,",false],
		[523785438,"MODEL_M_Y_STREET_03,",false],
		[813889395,"MODEL_M_Y_STREET_04,",false],
		[-1552214124,"MODEL_M_Y_STREETBLK_02,",false],
		[-650575089,"MODEL_M_Y_STREETBLK_03,",false],
		[-740078918,"Street Punk 1,",false],
		[-1927496394,"Street Punk 2,",false],
		[1374242512,"Street Punk 3,",false],
		[-1139941790,"Tough Guy",false],
		[809067472,"Male Tourist",false]
	]
];

// ===========================================================================

function makeLargeNumberReadable(num) {
	return new Number(num).toLocaleString("en-US");
}

// ===========================================================================

function getKeyIdFromParams(params) {
    let tempParams = toLowerCase(toString(params));

    //let sdlName = sdl.getKeyFromName(tempParams);
    //if(sdlName != null) {
    //    return sdlName;
    //}

    for(let i in bindableKeys) {
        if(bindableKeys[i].indexOf(tempParams.toLowerCase()) != -1) {
            return i;
        }
    }
}

// ===========================================================================

function getKeyNameFromId(params) {
    return bindableKeys[toInteger(params)];
}

// ===========================================================================