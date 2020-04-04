import React ,{Component} from 'react'
import Board from './Board'


class Game extends Component{

    

    constructor(props){
        super(props)
        let first = Array(9).fill(null)
        this.state = {
            squares : Array(9).fill(null),
            isX : true,
            moves : [],
            history : []
        }
    }


    changeGame(index){

        const newGame = this.state.history[index]
        const newHistory = this.state.history.slice(0,index + 1)
        const newMoves = this.state.moves.slice(0,index + 1)
        const isX =  newMoves[newMoves.length - 1].move === 'X'? false : true 
        this.setState({
            squares : newGame,
            history: newHistory,
            moves: newMoves,
            isX : isX

        })
    }

    

    handleGame(index){
        const squares = this.state.squares.slice();
        const moves = this.state.moves.slice();
        if(squares[index] === null && !calculateWinner(squares)){
            const history = this.state.history.slice();
            if(this.state.isX){
                squares[index] = 'X';

            }
            else{

                squares[index] = 'O';
            }
            moves.push({
                index : index,
                move : squares[index]
            })
            history.push(squares)

            this.setState({
                squares : squares,
                isX : !(this.state.isX),
                moves : moves,
                history : history
            });
            
        }

    }

    render(){

                
        const winner = calculateWinner(this.state.squares)
        let status 
        if (winner){
            status = 'Winner : ' + winner
        }
        else{
            status = 'Player : ' + (this.state.isX ? 'X': 'O')
        }

        return <div>
            <div>{status}</div>
            <Board 
            squares = {this.state.squares}
            onClick = {(i) =>  this.handleGame(i)}></Board>
    
            {this.state.moves.map((move,index)=>{
            return <button onClick ={() => this.changeGame(index)}>
                    <div>Move: {move.move}</div>
                    <div>Pos: {move.index}</div>
                </button>
    
             })}


        </div> 
    }
} 

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}


export default Game 