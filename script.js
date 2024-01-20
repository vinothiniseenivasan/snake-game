document.addEventListener("DOMContentLoaded" ,() =>
{
    const gameArena = document.getElementById("game-arena");
    const arenasize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false; 
    let food = {x:300 , y:200};
    let snake = [{x:160 , y:200} , {x:140 , y:200} ,{x:120 , y:200} ];
    let dx=cellSize;//displacement on x axis
    let dy=0;//displacement on y axis
    // To increase speed everytime if snake eats food
    let intervalId;
    let gameSpeed = 400;
    // for Sounding Effect
    // let mySound = new Audio('music\snake-hiss-95241.mp3');
       
    let myAudio = document.querySelector('#audio');


    myAudio.addEventListener('canplaythrough', function() {
        // The audio is fully loaded and ready to play
        console.log("Eat sound is ready");
    });
    function drawScoreBoard()
    {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score : ${score}`;

    }


    function drawDiv(x,y,classNAme)
    {

        const div = document.createElement("div");
        div.classList.add(classNAme);
        // changed x,y
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }
    function  drawFoodItemAndSnake()
    {
    //    if previously something is drawn remove snake and food 
    gameArena.innerHTML = "";
    //    wipe out everything and redraw snake and food
    //    create food apple
     const foodElemnt =drawDiv(food.x , food.y , 'food');
    

    //  for snake has 3 colums,array so goto each
    // cell draw snake
    snake.forEach(function (eachSnakeCell)
    {
    //   snake =   snakeMovingforwardXaxis(snake);

    //     //  dispaly snake on x axis
    //     for (let i = 0; i < snake.length; i++) {
    //         console.log("dispaly snake on x axis" , snake[i].x);
    //       }

        const element = drawDiv(eachSnakeCell.x ,eachSnakeCell.y,'snake');
        gameArena.appendChild(element); 



    });

     
     gameArena.appendChild(foodElemnt);
    //  score++;
    
    }
    function updateSnake()
    {
        // 1 . calculate new coordinate where snake will go
        const newHead = {x: snake[0].x + dx , y: snake[0].y+dy};
        // add front of array
        snake.unshift(newHead);

        if(newHead.x === food.x & newHead.y === food.y)
        {
            // collision happens snake is eating food
            // sound effect
            myAudio.currentTime = 0;
            myAudio.play()
            // grow its size

            score += 5;


            // now changing area of food and its not be in snake cells
            moveFood();
            //  incerase game speedgit
            if(gameSpeed > 30)
            {
                clearInterval(intervalId);
                gameSpeed -= 10;
             
               gameLoop();

            }


        }
        else
        {
            // its not eating food
            // remove last cell
        snake.pop();
        }
       


    }

   function isGameOver()
   {
    for(let i=1; i<snake.length;i++)
    {
         // 1.if snake hit themself is out gameOver
    if(snake[0].x === snake[i].x  && snake[0].y === snake[i].y)
    {
        return true;
    }

    }
   
    //  2.check wall position
    const isHittingLeftWall = snake[0].x < 0;
    const isHittingTopWall = snake[0].y < 0;
    const isHittingRightWall = snake[0].x >= (arenasize);
    const isHittingBottomWall = snake[0].y >= arenasize;

      return isHittingLeftWall || isHittingRightWall ||isHittingTopWall || isHittingBottomWall;


   }



    // when we are not given any direction to snake it should ru before what we gave direction
    function gameLoop()
    {
        console.log("gameSpeed" ,gameSpeed); 
        //  after 1sec scoreboard will change , snake  and food item
      intervalId =  setInterval( () =>{
            if(gameStarted == false)
            {
                return;
            }
            console.log("gameSpeed" ,gameSpeed);
            //  check for game over if snake hits wall restart game
           if(isGameOver())
           {
            alert (`Game Over , score = ${score}`);

            document.location.reload();
            gameStarted=false;
            return;
           }
            // before drawing snake 
           updateSnake();
           drawScoreBoard(); 
           drawFoodItemAndSnake();
          
        } ,gameSpeed);

      
        
    }
    // e => eventObject
    function changeDirection(e)
    {
        e.preventDefault();
        const Left_key = 37;
        const Right_key = 39;
        const Top_key = 38;
        const Bottom_key = 40;

        const keyPressed = e.keyCode;
        //  if u going up we can't move down immediately only move 
        // left and right pnly
        const isGoingUp = (dy == -cellSize);
        const isGoingDown = (dy == cellSize);
        const isGoingLeft = (dx == -cellSize);
        const isGoingRight = (dx == cellSize);

        if(keyPressed == Left_key && !isGoingRight)
        {
            dy =0;
            dx -= cellSize;
            
        }
        if(keyPressed == Right_key  && !isGoingLeft)
        {
            dy =0;
            dx += cellSize;
        }
        if(keyPressed == Top_key && !isGoingDown)
        {
            dy -= cellSize;
            dx =0;
        }
        if(keyPressed == Bottom_key && !isGoingUp)
        {
            dy += cellSize;
            dx =0; 
        }


    }


    // game starts
    function runGame()
    {
        if(!gameStarted)
        {
            gameStarted = true;
            // when we are not given any direction to snake it should ru before what we gave direction
    
            gameLoop();
            // arrow key of up,down,left,right
            // keyPress => AnyCode is pressed its call changrdir
            document.addEventListener('keydown',changeDirection);


        }


      
    }


    function startGame()
    {
        // creating scoreboard
          const scoreBoard =  document.createElement('div');
          scoreBoard.id = 'score-board';
          scoreBoard.textContent = '10';

    //   insert scoreboard top of paly Area

         document.body.insertBefore(scoreBoard , gameArena);

        //  button
        const startButton = document.createElement('button');
        startButton.textContent = 'start-button';
        startButton.classList.add("start-button");
        document.body.appendChild(startButton);

        // when click startbutton game should start
        startButton.addEventListener('click' ,()=>
        {
            startButton.style.display ="none";
            runGame();


        });




    }


   
    
     function  moveFood()
     {
        let newX ,newY;
        do{
          newX = Math.floor(Math.random() * ((arenasize-cellSize)/cellSize))  * cellSize;
          newY = Math.floor(Math.random() * ((arenasize-cellSize)/cellSize) ) * cellSize;

        }
        //  checking food is not inside snakecell
        //  2. if its here send true
        //  untill false it generating random x and y coordinate for food
        while(snake.some(eachSnakeCell => eachSnakeCell.x === newX && eachSnakeCell.y ===newY) );

        food = {x: newX , y: newY};

     }


     
    // To prepare scoreboard and startbutton

    startGame(); 

   
});


