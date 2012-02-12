
var DTD = {
    KeyBoardType: "QWERTY",
    viewPort: {
        w: 710,
        h: 580
    },
    sound: 1,
    music: 1,
    inGame: false,
    paused: false
};

DTD.skillList = [];
DTD.skillList["ThrowingAxe"] = {
	name: "Throwing Axe",
	key: 1,
	stats: [{
		damageMin: 45,
		damageMax: 75,
		coolDown: 0.825,
		energyCost: 1,
		goldCost: 0
	},{
		damageMin: 55,
		damageMax: 95,
		coolDown: 0.725,
		energyCost: 1,
		goldCost: 10
	},{
		damageMin: 65,
		damageMax: 125,
		coolDown: 0.625,
		energyCost: 1,
		goldCost: 20
	},]
};
DTD.skillList["ThrowingBrick"] = {
	name: "Throwing Brick",
	key: 3,
	stats: [{
		damageMin: 25,
		damageMin: 45,
		coolDown: 12,
		energyCost: 1,
		goldCost: 0
	},{
		damageMin: 35,
		damageMin: 55,
		coolDown: 10,
		energyCost: 1,
		goldCost: 15
	},{
		damageMin: 40,
		damageMin: 65,
		coolDown: 8,
		energyCost: 1,
		goldCost: 25
	},]
};

DTD.skillList["Blow"] = {
	name: "Blow",
	key: 2,
	stats: [{
		coolDown: 6,
		energyCost: 1,
		goldCost: 0
	},{
		coolDown: 5,
		energyCost: 1,
		goldCost: 15
	},{
		coolDown: 4,
		energyCost: 1,
		goldCost: 25
	},]
};

var sceneMaker = function() {
	var sceneName = "storyLevel"+(new Date().getTime());
	Crafty.scene(sceneName, function() {
        Crafty.load(["img/blood-sprite-die.png", "img/rails.png", "img/axe-sprite.png"], function() {
            buildUI();
            makeBattlefield();
			loadCutScene();
        });
    });
    Crafty.scene(sceneName);
};

window.onload = (function() {
	$("#menuPauseResume").live("click", function() {
		audioManager.playSound('click');
		Crafty.pause();
	});
	$("#menuPauseBackToMain").live("click", function() {
		audioManager.playSound('click');
		Crafty.pause();
		$(".youWin").remove();
		removeUI();
		Crafty.scene("titleScreen");
	});
    Crafty.init(DTD.viewPort.w, DTD.viewPort.h);
    Crafty.bind("Pause", function() {
    	if(DTD.inGame) {
    		DTD.paused = true;
    		$("#pause").show();
    	}
    });
    Crafty.bind("Unpause", function() {
    	if(DTD.inGame) {
    		DTD.paused = false;
    		$("#pause").hide();
    	}
    });
	allowPlayerMoves();
    var renderGameTitle = function() {
        Crafty.load(["img/background.png", "img/clouds.png", "img/floor.png", "img/menu-sprites.png"], function() {
            //new Sound(soundResources.titleScreen, { loop: true, type: 'music' }).play();
            Crafty.e("2D, DOM").attr({
                w: DTD.viewPort.w,
                h: DTD.viewPort.h,
                x: 0,
                y: 0
            }).css("background", "url(img/background.png)").css("z-index", "0");

            Crafty.e("Clouds");

            Crafty.e("2D, DOM").attr({
                w: DTD.viewPort.w,
                h: 309,
                x: 0,
                y: DTD.viewPort.h - 309
            }).css("background", "url(img/floor.png)").css("z-index", "0");
            
			Crafty.e("GameTitle");
			
            Crafty.e("NewGameMenuItem");
            
            if(storage.level.get() > 1) {
            	Crafty.e("ContinueMenuItem");
            }
        });
    };

    Crafty.scene("titleScreen", function() {
        renderGameTitle();
    }, function() {
    	DTD.inGame = true;
    }, function() {
    	DTD.inGame = false;
    });
    
    Crafty.scene("skillShop", function() {

        Crafty.load(["img/blood-sprite-die.png", "img/rails.png", "img/axe-sprite.png"], function() {
            buildSkillShopUI();
        });
        
    });

    Crafty.scene("titleScreen");
    
    $("#skillShopPlay").live("click", function() {
    	audioManager.playSound('click');
    	removeSkillShopUI();
    	sceneMaker();
    });
    
    $("#skillShopBack").live("click", function() {
    	audioManager.playSound('click');
    	removeSkillShopUI();
    	Crafty.scene("titleScreen");
    });
});
