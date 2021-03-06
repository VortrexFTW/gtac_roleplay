// ===========================================================================
// Vortrex's Roleplay Resource
// https://github.com/VortrexFTW/gtac_roleplay
// ===========================================================================
// FILE: gui.js
// DESC: Provides GUI functionality and styles (using MexUI)
// TYPE: Client (JavaScript)
// ===========================================================================

var app = {};

let robotoFont = "Roboto";

let mainLogoPath = "files/images/main-logo.png";

let primaryColour = [200, 200, 200];
let focusedColour = [200, 200, 200];
let invalidValueColour = [200, 200, 200];

let focusedColourOffset = 50;

let windowAlpha = 185;
let windowTitleAlpha = 200;
let buttonAlpha = 200;
let textInputAlpha = 200;

// ===========================================================================

let login = {
	window: null,
	logoImage: null,
	messageLabel: null,
	passwordLabel: null,
	passwordInput: null,
	loginButton: null,
};

// ===========================================================================

let twoFactorAuth = {
	window: null,
	logoImage: null,
	qrCode: null,
	messageLabel: null,
	codeLabel: null,
	codeInput: null,
	submitButton: null,
};

// ===========================================================================

let register = {
	window: null,
	logoImage: null,
	messageLabel: null,
	passwordInput: null,
	confirmPasswordInput: null,
	emailInput: null,
	registerButton: null,
};

// ===========================================================================

let newCharacter = {
	window: null,
	firstNameInput: null,
	lastNameInput: null,
	skinDropDown: null,
	spawnAreaDropDown: null,
	createButton: null,
};

// ===========================================================================

let errorDialog = {
	window: null,
	messageLabel: null,
	okayButton: null,
};

// ===========================================================================

let infoDialog = {
	window: null,
	messageLabel: null,
	okayButton: null,
};

// ===========================================================================

let listDialog = {
	window: null,
	messageLabel: null,
	listGrid: null,
};

// ===========================================================================

let yesNoDialog = {
	window: null,
	messageLabel: null,
	yesButton: null,
	noButton: null,
};

// ===========================================================================

let characterSelect = {
	window: null,
	skinImage: null,
	nameText: null,
	cashText: null,
	clanText: null,
	lastPlayedText: null,
	previousCharacterButton: null,
	nextCharacterButton: null,
	selectCharacterButton: null,
	newCharacterButton: null,
};

// ===========================================================================

let placesOfOrigin = [
	"Liberty City",
	"Vice City",
	"Los Santos",
	"San Fierro",
	"Las Venturas",
	"San Andreas",
	"Blaine County",
	"Red County",
	"Bone County",
	"Other",
];

// ===========================================================================

let characterData = [];
let currentCharacter = 0;

let inCharacterSelectScreen = false;
let creatingCharacter = false;

// ===========================================================================

function initGUIScript() {
	logToConsole(LOG_DEBUG, "[VRR.GUI]: Initializing GUI script ...");
	logToConsole(LOG_DEBUG, "[VRR.GUI]: GUI script initialized!");
}

// ===========================================================================

function initGUI() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Initializing GUI ...`);

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating login GUI ...`);
	login.window = mexui.window(game.width/2-150, game.height/2-129, 300, 258, 'LOGIN', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
			transitionTime: 500,
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});
	login.window.titleBarIconSize = toVector2(0,0);
	login.window.titleBarHeight = 0;

	login.logoImage = login.window.image(100, 20, 100, 100, mainLogoPath, {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	login.messageLabel = login.window.text(20, 135, 260, 20, 'Please enter your password!', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	login.passwordInput = login.window.textInput(20, 170, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], textInputAlpha),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			textColour: toColour(200, 200, 200, 150),
			textSize: 10.0,
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	});
	login.passwordInput.masked = true;
	login.passwordInput.placeholder = "Password";

	login.loginButton = login.window.button(20, 205, 260, 30, 'LOGIN', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		},
	}, checkLogin);

	logToConsole(LOG_DEBUG, `[VRR.GUI] Created login GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating two factor auth GUI ...`);
	twoFactorAuth.window = mexui.window(game.width/2-150, game.height/2-129, 300, 258, 'LOGIN', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
			transitionTime: 500,
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});
	twoFactorAuth.window.titleBarIconSize = toVector2(0,0);
	twoFactorAuth.window.titleBarHeight = 0;

	twoFactorAuth.qrCode = twoFactorAuth.window.image(100, 20, 100, 100, mainLogoPath, {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	twoFactorAuth.codeLabel = twoFactorAuth.window.text(20, 135, 260, 20, 'Please enter the code from your authenticator app!', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	twoFactorAuth.codeInput = twoFactorAuth.window.textInput(20, 170, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], textInputAlpha),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			textColour: toColour(200, 200, 200, 150),
			textSize: 10.0,
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	});
	twoFactorAuth.codeInput.placeholder = "Code";

	twoFactorAuth.submitButton = twoFactorAuth.window.button(20, 205, 260, 30, 'SUBMIT', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		},
	}, checkTwoFactorAuth);

	logToConsole(LOG_DEBUG, `[VRR.GUI] Created two factor auth GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating new character GUI ...`);
	newCharacter.window = mexui.window(game.width/2-130, game.height/2-100, 300, 200, 'Character Name', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
			transitionTime: 500,
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		}
	});
	newCharacter.window.titleBarIconSize = toVector2(0,0);
	newCharacter.window.titleBarHeight = 0;

	newCharacter.window.image(115, 10, 65, 65, "files/images/main-logo.png", {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	newCharacter.messageLabel = newCharacter.window.text(20, 75, 260, 20, 'Name your character', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	newCharacter.firstNameInput = newCharacter.window.textInput(20, 100, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,
		}
	});
	newCharacter.firstNameInput.placeholder = "First Name";

	newCharacter.lastNameInput = newCharacter.window.textInput(20, 130, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(150, 150, 150, 200),
			textSize: 10.0,
			textFont: robotoFont,
		}
	});
	newCharacter.lastNameInput.placeholder = "Last Name";

	newCharacter.createCharacterButton = newCharacter.window.button(20, 160, 260, 25, 'CREATE CHARACTER', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(255, 255, 255, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		},
	}, checkNewCharacter);
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created new character GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating register GUI ...`);
	register.window = mexui.window(game.width/2-130, game.height/2-125, 300, 250, 'Register', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
			transitionTime: 500,
		},
		title: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		}
	});
	register.window.titleBarIconSize = toVector2(0,0);
	register.window.titleBarHeight = 0;

	register.window.image(115, 10, 65, 65, "files/images/main-logo.png", {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	register.messageLabel = register.window.text(20, 75, 260, 20, 'Create an account', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(200, 200, 200, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	register.passwordInput = register.window.textInput(20, 100, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,
		}
	});
	register.passwordInput.masked = true;
	register.passwordInput.placeholder = "Password";

	register.confirmPasswordInput = register.window.textInput(20, 130, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(150, 150, 150, 200),
			textSize: 10.0,
			textFont: robotoFont,
		}
	});
	register.confirmPasswordInput.masked = true;
	register.confirmPasswordInput.placeholder = "Confirm password";

	register.emailInput = register.window.textInput(20, 160, 260, 25, '', {
		main: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 255),
			textSize: 10.0,
			textFont: robotoFont,
		},
		caret: {
			lineColour: toColour(255, 255, 255, 255),
		},
		placeholder: {
			backgroundColour: toColour(0, 0, 0, 120),
			textColour: toColour(200, 200, 200, 200),
			textSize: 10.0,
			textFont: robotoFont,
		}
	});
	register.emailInput.placeholder = "Email";

	register.registerButton = register.window.button(20, 195, 260, 30, 'CREATE ACCOUNT', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(255, 255, 255, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		},
	}, checkRegistration);
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created register GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating error GUI ...`);
	errorDialog.window = mexui.window(game.width/2-200, game.height/2-70, 500, 140, 'ERROR', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
			transitionTime: 500,
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});

	errorDialog.messageLabel = errorDialog.window.text(15, 50, 470, 75, 'Error Message', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	errorDialog.okayButton = errorDialog.window.button(20, 95, 360, 30, 'OK', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	}, closeErrorDialog);
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created error GUI ...`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Created prompt GUI ...`);
	yesNoDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 140, 'Question', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
			transitionTime: 500,
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});

	yesNoDialog.messageLabel = yesNoDialog.window.text(15, 50, 370, 20, 'Would you like to answer this question?', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 255),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	yesNoDialog.yesButton = yesNoDialog.window.button(20, 95, 175, 30, 'YES', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	}, yesNoDialogAnswerYes);

	yesNoDialog.noButton = yesNoDialog.window.button(205, 95, 175, 30, 'NO', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	}, yesNoDialogAnswerNo);
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created prompt GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating info dialog GUI ...`);
	infoDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 140, 'Information', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		},
	});

	infoDialog.messageLabel = infoDialog.window.text(15, 50, 370, 20, 'Information Message', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	infoDialog.okayButton = infoDialog.window.button(20, 95, 360, 30, 'OK', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 255),
		},
	}, closeInfoDialog);
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created info dialog GUI`);

// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating list dialog GUI ...`);
	listDialog.window = mexui.window(game.width/2-200, game.height/2-70, 400, 500, 'List', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 11.0,
			textColour: toColour(255, 255, 255, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
			hover: {
				backgroundColour: toColour(205, 60, 60, windowTitleAlpha),
			},
		},
	});

	listDialog.messageLabel = infoDialog.window.text(5, 5, 390, 20, 'Select one', {
		main: {
			textSize: 10.0,
			textAlign: 0.5,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		},
	});

	listDialog.listGrid = listDialog.window.grid(5, 25, 390, 450, {
		main: {
			backgroundColour: 	toColour(0, 0, 0, windowAlpha),
		},
		column: {
			lineColour: 		toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		header:	{
			backgroundColour:	toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha-50),
			textColour:			toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		cell: {
			backgroundColour:	toColour(0, 0, 0, windowAlpha),
			textColour:			toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		row: {
			lineColour:			toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
			hover: {
				backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], 120),
			}
		}
	});
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created list dialog GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] Creating character select GUI ...`);
	characterSelect.window = mexui.window(game.width/2-215, game.height/2-83, 430, 190, 'Select Character', {
		main: {
			backgroundColour: toColour(0, 0, 0, windowAlpha),
		},
		title: {
			textSize: 11.0,
			textColour: toColour(0, 0, 0, 255),
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], windowTitleAlpha),
		},
		icon: {
			textSize: 0.0,
			textColour: toColour(0, 0, 0, 0),
			backgroundColour: toColour(0, 0, 0, 0),
		}
	});

	characterSelect.nameText = characterSelect.window.text(5, 40, 200, 25, 'Lastname, Firstname', {
		main: {
			textSize: 14.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		}
	});

	characterSelect.cashText = characterSelect.window.text(5, 65, 200, 25, 'Cash: $0', {
		main: {
			textSize: 9.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		}
	});

	characterSelect.clanText = characterSelect.window.text(5, 80, 200, 25, 'Clan: None', {
		main: {
			textSize: 9.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		}
	});

	characterSelect.lastPlayedText = characterSelect.window.text(5, 95, 200, 25, 'Last Played: Never', {
		main: {
			textSize: 9.0,
			textAlign: 0.0,
			textColour: toColour(255, 255, 255, 220),
			textFont: robotoFont,
		},
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		}
	});

	characterSelect.selectCharacterButton = characterSelect.window.button(85, 130, 260, 25, 'SELECT', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		}
	}, selectThisCharacter);

	characterSelect.newCharacterButton = characterSelect.window.button(5, 160, 420, 25, 'NEW CHARACTER', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 12.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		}
	}, showNewCharacter);

	characterSelect.previousCharacterButton = characterSelect.window.button(5, 130, 75, 25, '< PREV', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		}
	}, selectPreviousCharacter);

	characterSelect.nextCharacterButton = characterSelect.window.button(350, 130, 75, 25, 'NEXT >', {
		main: {
			backgroundColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
			textColour: toColour(0, 0, 0, 255),
			textSize: 10.0,
			textFont: robotoFont,
			textAlign: 0.5,
		},
		focused: {
			borderColour: toColour(primaryColour[0], primaryColour[1], primaryColour[2], buttonAlpha),
		}
	}, selectNextCharacter);

	characterSelect.skinImage = characterSelect.window.image(310, 32, 100, 90, "files/images/skins/none.png", {
		focused: {
			borderColour: toColour(0, 0, 0, 0),
		}
	});
	logToConsole(LOG_DEBUG, `[VRR.GUI] Created character select GUI`);

	// ===========================================================================

	logToConsole(LOG_DEBUG, `[VRR.GUI] All GUI created successfully!`);
	closeAllWindows();
};

// ===========================================================================

let checkLogin = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Checking login with server ...`);
	triggerNetworkEvent("ag.checkLogin", login.passwordInput.lines[0]);
}

// ===========================================================================

let loginFailed = function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports login failed`);
	login.messageLabel.text = errorMessage;
	login.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	login.passwordInput.text = "";
}

// ===========================================================================

let loginSuccess = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports login was successful`);
	closeAllWindows();
}

// ===========================================================================

let checkRegistration = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Checking registration with server ...`);
	triggerNetworkEvent("ag.checkRegistration", register.passwordInput.lines[0], register.confirmPasswordInput.lines[0], register.emailInput.lines[0]);
}

// ===========================================================================

let checkNewCharacter = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Checking new character with server ...`);
	let skinId = false;

	if(newCharacter.firstNameInput.lines[0].length < 2) {
		return false;
	}

	if(newCharacter.lastNameInput.lines[0].length < 2) {
		return false;
	}

	triggerNetworkEvent("ag.checkNewCharacter",
		newCharacter.firstNameInput.lines[0],
		newCharacter.lastNameInput.lines[0],
	);
}

// ===========================================================================

let registrationFailed = function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports registration failed. Reason: ${errorMessage}`);
	register.messageLabel.text = errorMessage;
	register.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	register.passwordInput.text = "";
	register.confirmPasswordInput.text = "";
	register.emailInput.text = "";
}

// ===========================================================================

let newCharacterFailed = function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports new character creation failed. Reason: ${errorMessage}`);
	newCharacter.messageLabel.text = errorMessage;
	newCharacter.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	newCharacter.firstNameInput.text = "";
	newCharacter.lastNameInput.text = "";
}

// ===========================================================================

let registrationSuccess = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports registration was successful`);
	closeAllWindows();
}

// ===========================================================================

let twoFactorAuthFailed = function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports two-factor authentication failed. Reason: ${errorMessage}`);
	login.messageLabel.text = errorMessage;
	login.messageLabel.styles.main.textColour = toColour(180, 32, 32, 255);
	login.passwordInput.text = "";
}

// ===========================================================================

let twoFactorAuthSuccess = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports two-factor authentication was successful`);
	closeAllWindows();
}

// ===========================================================================

let checkTwoFactorAuth = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Checking two-factor authentication with server ...`);
	triggerNetworkEvent("ag.checkTwoFactorAuth", twoFactorAuth.codeInput.lines[0]);
}

// ===========================================================================

let characterSelectSuccess = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Server reports character selection was successful`);
	closeAllWindows();
}

// ===========================================================================

let closeErrorDialog = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Closing error dialog`);
	errorDialog.window.shown = false;
	mexui.setInput(false);
}

// ===========================================================================

let closeInfoDialog = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Closing info dialog`);
	infoDialog.window.shown = false;
	mexui.setInput(false);
}

// ===========================================================================

let closeAllWindows = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Closing all GUI windows`);
	infoDialog.window.shown = false;
	yesNoDialog.window.shown = false;
	errorDialog.window.shown = false;
	register.window.shown = false;
	login.window.shown = false;
	newCharacter.window.shown = false;
	characterSelect.window.shown = false;
	twoFactorAuth.window.shown = false;
	listDialog.window.shown = false;
	mexui.setInput(false);
}

// ===========================================================================

let yesNoDialogAnswerNo = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Responding with answer NO to server prompt`);
	triggerNetworkEvent("ag.promptAnswerNo");
	closeAllWindows();
}

// ===========================================================================

let yesNoDialogAnswerYes = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Responding with answer YES to server prompt`);
	triggerNetworkEvent("ag.promptAnswerYes");
	closeAllWindows();
}

// ===========================================================================

let showRegistration = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing registration window`);
	closeAllWindows();
	setChatWindowEnabled(false);
	mexui.setInput(true);
	register.window.shown = true;
}

// ===========================================================================

let showLogin = function() {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing login window`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	login.window.shown = true;
}

// ===========================================================================

let showTwoFactorAuth = function() {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing two-factor authentication window`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	twoFactorAuth.window.shown = true;
}

// ===========================================================================

let showCharacterSelect = function(firstName, lastName, cash, clan, lastPlayed, skinId) {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing character selection window`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	characterSelect.nameText.text = `${firstName} ${lastName}`;
	characterSelect.cashText.text = `Money: $${cash}`;
	characterSelect.clanText.text = `Clan: ${clan}`;
	characterSelect.lastPlayedText.text = `Last Played: ${lastPlayed}`;
	characterSelect.skinImage = characterSelect.window.image(310, 32, 100, 90, "files/images/skins/none.png");
	characterSelect.window.shown = true;
}

// ===========================================================================

let showError = function(errorMessage, errorTitle) {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing error window. Error: ${errorTitle} - ${errorMessage}`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	errorDialog.messageLabel.text = errorMessage;
	errorDialog.window.shown = true;
}

// ===========================================================================

let showYesNo = function(promptMessage, promptTitle) {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing prompt window. Prompt: ${promptTitle} - ${promptMessage}`);
	mexui.setInput(true);
	yesNoDialog.messageLabel.text = promptMessage;
	yesNoDialog.window.shown = true;
}

// ===========================================================================

let showInfo = function(infoMessage, infoTitle) {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing info dialog window. Info: ${infoTitle} - ${infoMessage}`);
	mexui.setInput(true);
	infoDialog.messageLabel.text = infoMessage;
	infoDialog.window.shown = true;
}

// ===========================================================================

let showNewCharacter = function() {
	closeAllWindows();
	logToConsole(LOG_DEBUG, `[VRR.GUI] Showing new character dialog window`);
	setChatWindowEnabled(false);
	mexui.setInput(true);
	setHUDEnabled(false);
	newCharacter.window.shown = true;
}

// ===========================================================================

let selectNextCharacter = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Requesting next character info from server for character select window`);
	triggerNetworkEvent("ag.nextCharacter");
}

// ===========================================================================

let selectPreviousCharacter = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Requesting previous character info from server for character select window`);
	triggerNetworkEvent("ag.previousCharacter");
}

// ===========================================================================

let selectThisCharacter = function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Tell server the current shown character was selected in character select window`);
	triggerNetworkEvent("ag.selectCharacter");
}

// ===========================================================================

let switchCharacterSelect = function(firstName, lastName, cash, clan, lastPlayed, skinId) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Updating character info with data from server`);
	setChatWindowEnabled(false);
	characterSelect.window.shown = false;
	characterSelect.nameText.text = `${firstName} ${lastName}`;
	characterSelect.cashText.text = `Money: $${cash}`;
	characterSelect.clanText.text = `Clan: ${clan}`;
	characterSelect.lastPlayedText.text = `Last Played: ${lastPlayed}`;
	characterSelect.skinImage = characterSelect.window.image(310, 32, 100, 90, "files/images/skins/none.png");
	characterSelect.window.shown = true;
}

// ===========================================================================

addNetworkHandler("ag.showLogin", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show login window`);
	showLogin();
});

// ===========================================================================

addNetworkHandler("ag.showRegistration", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show registration window`);
	showRegistration();
});

// ===========================================================================

addNetworkHandler("ag.showNewCharacter", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show new character window`);
	showNewCharacter();
});

// ===========================================================================

addNetworkHandler("ag.showCharacterSelect", function(firstName, lastName, cash, clan, lastPlayed, skinId) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show character selection window`);
	showCharacterSelect(firstName, lastName, cash, clan, lastPlayed, skinId);
});

// ===========================================================================

addNetworkHandler("ag.switchCharacterSelect", function(firstName, lastName, cash, clan, lastPlayed, skinId) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to update character selection window with new info`);
	switchCharacterSelect(firstName, lastName, cash, clan, lastPlayed, skinId);
});

// ===========================================================================

addNetworkHandler("ag.showError", function(errorMessage, errorTitle) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show error window`);
	showError(errorMessage, errorTitle);
});

// ===========================================================================

addNetworkHandler("ag.showPrompt", function(promptMessage, promptTitle) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show prompt window`);
	showYesNo(promptMessage, promptTitle);
});

// ===========================================================================

addNetworkHandler("ag.showInfo", function(infoMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received request from server to show info dialog`);
	showInfo(infoMessage);
});

// ===========================================================================

addNetworkHandler("ag.loginSuccess", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of successful login from server`);
	loginSuccess();
});

// ===========================================================================

addNetworkHandler("ag.characterSelectSuccess", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of successful character selection from server`);
	characterSelectSuccess();
	setChatWindowEnabled(true);
});

// ===========================================================================

addNetworkHandler("ag.loginFailed", function(remainingAttempts) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of failed login from server`);
	loginFailed(remainingAttempts);
});

// ===========================================================================

addNetworkHandler("ag.registrationSuccess", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of successful registration from server`);
	registrationSuccess();
});

// ===========================================================================

addNetworkHandler("ag.registrationFailed", function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of failed registration from server`);
	registrationFailed(errorMessage);
});

// ===========================================================================

addNetworkHandler("ag.newCharacterFailed", function(errorMessage) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received signal of failed registration from server`);
	newCharacterFailed(errorMessage);
});

// ===========================================================================

addNetworkHandler("ag.guiColour", function(red, green, blue) {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Received new GUI colours from server`);
	primaryColour = [red, green, blue];
	focusedColour = [red+focusedColourOffset, green+focusedColourOffset, blue+focusedColourOffset];
});

// ===========================================================================

addNetworkHandler("ag.guiInit", function() {
	logToConsole(LOG_DEBUG, `[VRR.GUI] Initializing MexUI app`);
	initGUI();
	triggerNetworkEvent("ag.guiReady", true);
});

// ===========================================================================