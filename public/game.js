Crafty.c("Circle", {
    Circle: function(radius, color) {
        this.radius = radius;
        this.w = this.h = radius * 2;
        this.color = color || "#000000";

        return this;
    },

    draw: function() {
       var ctx = Crafty.canvas.context;
       ctx.save();
       ctx.fillStyle = this.color;
       ctx.beginPath();
       ctx.arc(
           this.x + this.radius,
           this.y + this.radius,
           this.radius,
           0,
           Math.PI * 2
       );
       ctx.closePath();
       ctx.fill();
    }
});

function doTurn(spaceship){
  if (spaceship.acceptCommands){
    spaceship.issueCommand({angle: Math.floor((Math.random() * 360)), power: 2 + Math.floor(Math.random() * 4)})
  }

}

Crafty.c("Spaceship", {
  init: function(){
    this.requires('2D, DOM, Color, Keyboard')
    this.attr({
      w: 6,
      h: 12
    }).origin(3,6).color('white')
    this.xspeed = 0
    this.yspeed = 0
    this.decay = 0.95
    this.fuel = 2
    this.rotation = 90
    this.acceptCommand = true

    label = Crafty.e('2D, DOM, Text, Color').attr({
      x: 10,
      y: 10,
      w: 100
    }).text('Fuel: 10').textColor('#FFFFFF')

    this.bind("EnterFrame", function() {
      doTurn(this)

      if (this.currentCommand){
        this.rotation = this.currentCommand.angle
        this.fuel = this.currentCommand.power
        this.move.up = true
        this.currentCommand = null
      }


      // if(this.move.right) this.rotation += 10;
			// if(this.move.left) this.rotation -= 10;
      // this.move.left = false
      // this.move.right = false

			//acceleration and movement vector
			var vx = Math.sin(this._rotation * Math.PI / 180) * this.fuel,
					vy = Math.cos(this._rotation * Math.PI / 180) * this.fuel;

			//if the move up is true, increment the y/xspeeds
			if(this.move.up) {
					this.yspeed -= vy;
					this.xspeed += vx;
          this.move.up = false
			} else {
					//if released, slow down the ship
          this.xspeed *= this.decay;
          this.yspeed *= this.decay;
			}

      if (this.xspeed < 0.1 && this.yspeed < 0.1){

        this.acceptCommands = true
      }

			//move the ship by the x and y speeds or movement vector
			this.x += this.xspeed;
			this.y += this.yspeed;
    });
    return this
  },
  issueCommand: function(command){
    if (this.acceptCommands){
      this.currentCommand = command
      this.acceptCommands = false
    }
  }

})

Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(600, 400);
    Crafty.background('#111133');

    Crafty.e('Spaceship')
          .attr({ x: 300, y: 200 }).color('#0A91F2')

    Crafty.e('Spaceship')
          .attr({ x: 300, y: 200 }).color('#0A91F2')

    Crafty.e('Spaceship')
          .attr({ x: 300, y: 200 }).color('#FF3333')

    Crafty.e('Spaceship')
          .attr({ x: 300, y: 200 }).color('#FF3333')
  }
}
