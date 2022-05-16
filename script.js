window.onload = function() {
    var stage = document.getElementById('stage');
    var ctx = stage.getContext('2d');
    document.addEventListener('keydown', keyPush);
    var scoreTxt = document.getElementById('score');
    var score = 0;
  
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
        
        //se a cobra passar das bordas ela vai voltar no outro lado
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

            //para a cobra morrer quando bater nela msm
            if (rastro[i].x == posx && rastro[i].y == posy) {
      	        velx = 0;
                vely = 0;
                cauda = 5;
                score = 0; //deixar o score em 0
                scoreTxt.innerHTML = `Pontuação: ${score}`;
            }
        }
    
        rastro.push({x: posx, y: posy})
        while (rastro.length > cauda) {
    	rastro.shift();
        }

        //se a maçã tiver na mesma posicao que a cabeca da cobra
        if (applex == posx && appley == posy) {
			cauda++; //aumentar a cauda da cobra
            score++; //aumentar 1 cada vez que ela pegar a maçã
            scoreTxt.innerHTML = `Pontuação: ${score}`;
            //fazer a maçã aparecer em lugares aleatorios
            applex = Math.floor(Math.random()*quantPeca);
            appley = Math.floor(Math.random()*quantPeca);
        }
    
    }
    
    //funcao para as teclas
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