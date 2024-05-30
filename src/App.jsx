import { useState } from "react";
import Players from "./components/Players.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./WinnnigCombinations.jsx";
const initialGameBoard=[[null,null,null],
[null,null,null],
[null,null,null]]

function DerviedPlayer(gameTurns){
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
currentPlayer='O';
  }
return currentPlayer
  
}
function App() {
  const[playerName,setPlayerName]= useState(
    {
      X:'Player 1',
      O: 'Player 2'
    }
  )
  const[gameTurns,setGameTurns]= useState([]);
  // const [activePlayer, setActivePlayer]=useState('X');
  const activePlayer=DerviedPlayer(gameTurns)
  let gameBoard=[...initialGameBoard.map(array=>[...array])]
for(const turn of gameTurns){
    console.log(turn)
const {square,player}=turn
const{row,col}=square;
gameBoard[row][col]=player
}
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquare=gameBoard[combination[0].row][combination[0].column]
    const secondSquare=gameBoard[combination[1].row][combination[1].column]
    const thirdSquare=gameBoard[combination[2].row][combination[2].column]
    if(firstSquare && firstSquare===secondSquare && firstSquare==thirdSquare){
      winner=playerName[firstSquare]
    }
  }
  const hasDraw= gameTurns.length === 9 && !winner
  function handleActivePlayer(rowIndex,colIndex){
    // setActivePlayer((prevPlayer)=>prevPlayer==='X'?'O':'X');
    setGameTurns((prevTurns)=>{
      const currentPlayer=DerviedPlayer(prevTurns);
      const updateTurns=[
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns
      ]
      return updateTurns;
    })
  }
  function handleRestart(){
    setGameTurns([])
  }
  function handlePlayerName(symbol,newName){
    setPlayerName(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  return (
<main>
  <div id="game-container">
    <ol id="players" className="highlight-player">
      <Players name="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName}></Players>
      <Players name="Player 2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerName}></Players>
    </ol>
  </div>
  {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}></GameOver>}
  <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard}/>
  <Log turns={gameTurns}/>
</main>
  )
}

export default App
