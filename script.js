window.onload = function() {
    var stage = document.getElementById('stage');
    var ctx = stage.getContext('2d');
    document.addEventListener('keydown', keyPush);
  
    setInterval(game, 60);
  
    const vel = 1;
  
    var velx = 0; 
    var vely = 0;
    var posx = 10;
    var posy = 10;
    var tamPeca = 20;
    var quantPeca = 20;
    var applex = 15;
    var appley = 15;
  
    var rastro = [];
    var cauda = 5;
  
    function game() {
  	    posx += velx;
        posy += vely;
    
        if(posx < 0) {
    	    posx = quantPeca - 1;
        }
        if(posx > quantPeca-1) {
    	    posx = 0;
        }
        if(posy < 0) {
    	    posy = quantPeca - 1;
        }
        if(posy > quantPeca-1) {
    	    posy = 0;
        }
    
  	    ctx.fillStyle = "black";
  	    ctx.fillRect(0, 0, stage.width, stage.height);
    
        ctx.fillStyle = "red";
        ctx.fillRect(applex*tamPeca, appley*tamPeca, tamPeca, tamPeca);
    
        ctx.fillStyle = "green";
   	    for (var i = 0; i < rastro.length; i++) {
    	    ctx.fillRect(rastro[i].x*tamPeca, rastro[i].y*tamPeca, tamPeca-1, tamPeca-1);
            if (rastro[i].x == posx && rastro[i].y == posy) {
      	        velx = 0; 
                vely = 0;
                cauda = 5;
            }
        }
    
        rastro.push({x: posx, y: posy})
        while (rastro.length > cauda) {
    	rastro.shift();
        }
        if (applex == posx && appley == posy) {
			cauda++;
            applex = Math.floor(Math.random()*quantPeca);
            appley = Math.floor(Math.random()*quantPeca);
        }
    
    }
  
    function keyPush(event) {
  	
  	    switch (event.keyCode) {
    	    case 37: //left
      	    velx = -vel;
            vely = 0;
      	    break;
        case 38: //up
      	    velx = 0;
            vely = -vel;
      	    break;
        case 39: //right
      	    velx = vel;
            vely = 0;
      	    break;
        case 40: //down
      	    velx = 0;
            vely = vel;
      	    break;
        }
	}
}