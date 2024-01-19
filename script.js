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
            // collision happens
            // grow its size
            score += 5;

            // now changing area of food and its not be in snake cells
            moveFood();


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
    const isHittingRightWall = snake[0].x >= (arenasize-dx);
    const isHittingBottomWall = snake[0].y >= arenasize-20;

      return isHittingLeftWall || isHittingRightWall ||isHittingTopWall || isHittingBottomWall;


   }



    // when we are not given any direction to snake it should ru before what we gave direction
    function gameLoop()
    {
        //  after 1sec scoreboard will change , snake  and food item
        setInterval( () =>{
            if(gameStarted == false)
            {
                return;
            }
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
          
        } ,400  );

      
        
    }


    // game starts
    function runGame()
    {
        gameStarted = true;
        // when we are not given any direction to snake it should ru before what we gave direction

        gameLoop();
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


    // find min
    function findMin(snake)
    {
       let min =0;
        snake.forEach(function (eachcell)
        {
            const minValue = Math.min.apply(null, eachcell.x);
            return minValue;

        });
    }
     // find min
     function findMin(snake)
     {
       let minValue =2000;
         snake.forEach(function (eachcell)
         {
            console.log("hi");
            console.log("eachcell.x" ,eachcell.x);

             minValue = Math.min(minValue,eachcell.x);
            console.log("minValue" ,minValue);
        
        })
         return minValue;
     }
     function  moveFood()
     {
        let newX ,newY;
        do{
            
        }
        //  checking food is not inside snakecell
        //  2. if its here send true
        //  untill false it generating random x and y coordinate for food
        while(snake.some(eachSnakeCell => eachSnakeCell.x === newX && eachSnakeCell.y ===newY))

        food = {x: newX , y: newY};

     }


     // find max
     function findMax(snake)
     {
        let maxValue =0;
         snake.forEach(function (eachcell)
         {

            maxValue = Math.max(eachcell.x,maxValue);
         })
         return maxValue;
     }
    // 1st function
    // To prepare scoreboard and startbutton

    startGame(); 

    // function snakeMovingforwardXaxis(snake)
    // {
    //     //  vino code 
    // //   ------------------
    //     // moving x - dir
    //     // find least and most one remove the least one 
    //     // and add+20 to most one
    //     let minOnXaxis = findMin(snake);
    //     let max = findMax(snake) + 20;
    //     // Apply on snake

    //     // // Add 20 to maxelement
    //     // const updateMaxInArray = snake.map(eachSnakeCell=> (eachSnakeCell === maxOnXaxis) ? (eachSnakeCell+20) : eachSnakeCell);

    //     // delete min elemnt
    //     const DeleteMinInArray = snake.filter(eachSnakeCell=>  eachSnakeCell != minOnXaxis);
    //     DeleteMinInArray.push(max);
    // DeleteMinInArray.forEach( function(eachcell){
    //     console.log(" del eachcell" ,eachcell);
    //      snake.forEach(function(eachcellinSnake)
    //      {
    //         eachcellinSnake.x = eachcell;

    //      });

    // });
    //     return snake;


    // }
});


