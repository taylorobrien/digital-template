window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
		game.load.image('background','assets/graveyard.jpg');
		game.load.image('guy','assets/purpleguy2.png');
		game.load.image('girl','assets/purplegirl.jpg');
		game.load.image('rose','assets/rose.png');
		game.load.audio('song',['assets/BlackedOutLove.mp3','assets/BlackedOutLove.ogg']);
		game.load.image('potion','assets/potion.png');
		game.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
    	game.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');
    }
    
    var player;
	var bg;
	var roses;
	var cursors;
	var music;
	var score=0;
	var scoretext;
	var youwin;
	var s;
	var potions;
	var pot;
    
    function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.add.sprite(0,0,'rose');
		//Create Background
		//game.add.sprite(0, 0,'background');
		bg = game.add.tileSprite(0, 0, 1800, 1600, 'background');
		game.input.touch.preventDefault = false;
		//bg.scale.set(5,5);
        // Create a sprite at the center of the screen using the 'logo' image.
        music = game.add.audio('song');
		//music.override = true;
		//music.autoplay = true;
		music.play();
		player = game.add.sprite( game.world.centerX, 500, 'guy' );
		player.scale.set(1 , 1 );
		
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //player.anchor.setTo( 0.5, 0.5 );
		//game.camera.follow(player);
		//bouncy.fixedToCamera = true;
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
		
		roses = game.add.group();
		roses.scale.set(.2,.2);
		roses.enableBody = true;
		
		potions = game.add.group();
		//potions.scale.set(1,1);
		potions.enableBody = true;
		
		//roses.createMultiple(250, 'rose', 0, false);
		        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Falling Roses", style );
		var style2 = { font: "30px Verdana", fill: "#9999ff", align: "center" };
		youwin = game.add.text( 100, game.world.centerX, "", style2 );
        //youwin.anchor.setTo( 0.5, 0.0 );
        text.anchor.setTo( 0.5, 0.0 );
		scoretext = game.add.text(650, 15, "Score: 0", style);
		text.anchor.setTo(.5,0.0);
		game.physics.arcade.gravity.y=1500;
		player.body.gravity.y = 1000000;
	
		cursors = game.input.keyboard.createCursorKeys();
		//game.time.events.loop(1, falling, this);
		game.time.events.repeat(Phaser.Timer.SECOND * 1, 10000, falling, this);
		game.time.events.repeat (Phaser.Timer.SECOND * 4, 10000, makepotion, this);
		//falling();
    }
	
	function makepotion(){
		pot = potions.create(game.world.randomX, -0, 'potion');
		pot.body.gravity.y = 10;
		s.name = 'potion' + pot;
		pot.body.gravity.x = (Math.random()*(500));
	}
	
	function falling() {

    for (var i = 0; i < 1; i++)
    {
        s = roses.create(game.world.randomX+100, -300, 'rose');
        s.name = 'rose' + s;
		//s.rotation = game.physics.arcade.accelerateToPointer( s, this.game.input.activePointer, 500, 500, 500 );

        //body.collideWorldBounds = true;
       // s.body.bounce.setTo(1800, 1600);
        //s.body.velocity.setTo(10);
		s.body.gravity.x = (Math.random()*(1500));
    }

    /*//var fallrose = roses.getFirstExists(false);

    //if (fallrose)
    //{
        //fallrose.frame = game.rnd.integerInRange(0,6);
		rosey = game.add.sprite(0,0,'rose');
		rosey.body.gravity.y = 100;
	
        fallrose.exists = true;
        //fallrose.reset(game.world.randomX, 0);

        fallrose.body.bounce.y = 0.8;
    //}*/

}

	function playergetsrose(){
		//_roses.kill();
	
		score++;
		//alert(score);
		scoretext.text = "Score:" + score;	
		
		
	}
	
	function blurimage(){
		
		var blurX = game.add.filter('BlurX');
		var blurY = game.add.filter('BlurY');
		
		bg.filters = [blurX,blurY];
		player.filters = [blurX, blurY];
		roses.filters = [blurX, blurY];
	}
	
	function playergetspotion(){
		//_roses.kill();
	
		score=score-80;
		//alert(score);
		scoretext.text = "Score:" + score;	
		
		//blurimage();
		//game.time.events.add(Phaser.Timer.SECOND * 2, blurimage(),this);
		//blurimage = false;
		
		
	}

    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
		//game.physics.arcade.collide(player, roses, null, reflect, this);
		player.body.velocity.x = 0;
		if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
    }
	if (score == 1000){
		youwin.text = "Your Memory Has Been Restored! You Win!";
		//paused();
		
	}
	
	game.physics.arcade.overlap(potions, player, playergetspotion, null, this);
	game.physics.arcade.overlap(roses, player, playergetsrose, null, this);
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
};



//http://rickr-d.com/wp-content/uploads/2011/10/246_Cartoon_Purple_Alien_Citizen_Guy_who_likes_Advanced_Technology.jpg
//http://th00.deviantart.net/fs70/PRE/f/2010/157/7/0/Graveyard_by_theLastSamu.jpg
//http://premiumpsd.com/wp-content/uploads/2010/11/cartoon-doll-design_full.jpg
//http://pngimg.com/upload/rose_PNG649.png
//http://www.newgrounds.com/audio/listen/560586
//http://fc06.deviantart.net/fs71/f/2011/321/9/f/unidentified_potion__level_1___for_sale_by_adorabless-d4gi9l3.png