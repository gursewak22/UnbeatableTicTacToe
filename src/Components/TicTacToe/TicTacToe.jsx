import React, { useRef, useState } from 'react'
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'



let data = [-1,-1,-1,-1,-1,-1,-1,-1,-1 ];

const TicTacToe = () => {

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  let [firstMove,setFirstMove] = useState(null) ; 
  const toggle = (e, num) => {
      if(lock || data[num] != -1)return 0 ; 

      e.target.innerHTML = `<img src = '${cross_icon}'>`;
      data[num]  = 1; 
     
      console.log("count:", count);
      console.log(num)
      if(count === 0 ){
       setFirstMove(num);
      }

      setCount(++count); 

      checkWin();

      if(!lock  && count + 1 < 9 ){
        setTimeout(aiMove, 300);
         
      }
      
    
  }
  const aiMove = () => {


    // find empty Spots
    let emptySpots = data.map((value,index) => (value === -1 ? index : null)).filter(val => val !== null);

    if(emptySpots.length === 0)return; 


    
    // assuming ai will go second
    //We have to choose a position such that it will block the winnning position of other block
    const aiChoice  = bestChoice(emptySpots); 

    // console.log(aiChoice);
    data[aiChoice] = 0 ; 
    console.log("count1: ", count);
    setCount(++count); 
    const box = document.querySelectorAll('.boxes')[aiChoice];
      box.innerHTML =  `<img src = '${circle_icon}'>`;
      checkWin(); 



  }
  const bestChoice = (emptySpots) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

      // see if ai can win
    for(let pattern of winPatterns){

      const[a,b,c] = pattern ;
      if(data[a] == 0 && data[a] == data[b] && data[c] == -1){
        return c; 
      }
      if(data[b] == 0 && data[b] == data[c] && data[a] == -1){
        return a; 
      }
      if(data[c] == 0 && data[c] == data[a] && data[b] == -1){
        return b; 
      }
      
    
     }
    // block the win of user
    for(let pattern of winPatterns){
      const[a,b,c] = pattern ;
      if(data[a] == 1 && data[a] == data[b] && data[c] == -1){
        return c; 
      }
      if(data[b] == 1 && data[b] == data[c] && data[a] == -1){
        return a; 
      }
      if(data[c] == 1 && data[c] == data[a] && data[b] == -1){
        return b; 
      }
      
    
    }

    // Helps us to block the winning of user
    if(data[4] == -1) return  4;

    // Condition such that it forces user to not allow thier double attack
    
    if(count == 1)return 0; 
   
    let oppCorner = {
      0: 8,
      2: 6,
      6: 2,
      8: 0
    }
    let edges = [1,3,5,7];
  
  //  condition help us to draw if user start form centre
    if(count === 3){
      console.log(firstMove)
      if(edges.includes(firstMove)){
        const choices ={
          1: [0,2],
          3: [0,6],
          5: [2,8],
          7: [6,8]
        };
        console.log("here")
        return choices[firstMove][Math.floor(Math.random() * 2)];
      }
      else if(data[4] === 0 ){
        for(let key in oppCorner){
          if(data[key] === 1 && data[oppCorner[key]] === 1 ){
            return edges[Math.floor(Math.random() * edges.length)];;
          }
        }
      }
    
      return data[2] === -1 ? 2 : 6; 
    }




      // return random spots otherwise
      return emptySpots[Math.floor(Math.random()*emptySpots.length)];
  }


  const checkWin = () => {
          const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
          for (let pattern of winPatterns) {
            
            const [a, b, c] = pattern;
            if (data[a] !== -1 && data[a] === data[b] && data[a] === data[c]) {
              won(data[a]);
              return;
            }
          }
          if (count === 9) {
            titleRef.current.innerHTML = 'It\'s a draw!';
            setLock(true);
          }

    }
    const won = (winner) => {
      setLock(true);

      if(winner === 1){
        titleRef.current.innerHTML = `Congrats: <img src = ${cross_icon} > you have won the match`;
      }
      else{
        titleRef.current.innerHTML = `Congrats : <img src = ${circle_icon} >you have won the match`;
      }
    }




    const reset = () => {
      setLock(false);
      data = [-1,-1,-1,-1,-1,-1,-1,-1,-1 ];
      titleRef.current.innerHTML = "Unbeatable Tic Tac Toe"
      setCount(0)

      const boxes = document.querySelectorAll('.boxes');
      boxes.forEach(box => {
        box.innerHTML = '';
      })
    }


  return (
    <div className='container'>
        <h1 className='title' ref = {titleRef}>Unbeatable Tic Tac Toe</h1>
        <div className='board'>
          <div className="row1">
              <div className="boxes" onClick= {(e) => (toggle(e, 0))} ></div>
              <div className="boxes"  onClick= {(e) => (toggle(e, 1))}></div>
              <div className="boxes" onClick= {(e) => (toggle(e, 2))}></div>
          </div>
          <div className="row1">
              <div className="boxes" onClick= {(e) => (toggle(e, 3))}></div>
              <div className="boxes" onClick= {(e) => (toggle(e, 4))}></div>
              <div className="boxes" onClick= {(e) => (toggle(e, 5))}></div>
          </div>
          <div className="row1">
              <div className="boxes" onClick= {(e) => (toggle(e, 6))}></div>
              <div className="boxes" onClick= {(e) => (toggle(e, 7))}></div>
              <div className="boxes" onClick= {(e) => (toggle(e, 8))}></div>
          </div>
          


        </div>
        <button className='reset' onClick={ () => {reset()}} >Reset</button>
    </div>
  )
}

export default TicTacToe
