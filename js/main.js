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
        game.load.image('star', 'assets/phaser.png' );
		game.load.image('sky','assets/graveyard.jpg');
		game.load.image('dude','assets/purpleguy.png', 32,48);
		game.load.image('girl','assets/purplegirl.jpg');
		game.load.image('ground','assets/bars.jpg');
    }
    
    var bouncy;
	var bg;    
	var platforms;
 
function create() {
 	game.add.sprite(0, 0, 'star');
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
 
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
 
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
 
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
 
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
 
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
 
    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
 
    ledge.body.immovable = true;
 
    ledge = platforms.create(-150, 250, 'ground');
 
    ledge.body.immovable = true;
    
	platforms = game.add.group();
	
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
 
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
 
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
 
    //  Our two animations, walking left and right.
    player.animations.add('left',  true);
    player.animations.add('right',  true);
    
	player.body.gravity.y = 300;
	}
    
    function update() {
		
		
		//game.physics.arcade.collide(player, platforms);
		cursors = game.input.keyboard.createCursorKeys();
		
		  player.body.velocity.x = 0;
 
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
 
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
 
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
 
        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    
	}
};



//http://rickr-d.com/wp-content/uploads/2011/10/246_Cartoon_Purple_Alien_Citizen_Guy_who_likes_Advanced_Technology.jpg
//http://th00.deviantart.net/fs70/PRE/f/2010/157/7/0/Graveyard_by_theLastSamu.jpg
//http://premiumpsd.com/wp-content/uploads/2010/11/cartoon-doll-design_full.jpg