import React from "react";
import EndGame from "./EndGame";
import StartGame from "./StartGame";
import { connect } from "react-redux";
import { COUNT_SCORE, setMainState } from "../../store/actions";

export class Game extends React.Component {
  state = {
    showEndGame: false,
    score: 0,
  };

  userName = () => {
    let name = '';
    this.props.users.forEach(user => {
      if(user.email === this.props.email)
        name = user.name
    });
    return name;
  }

  handleEndGame = (boolean, score) => {
    if (boolean) {
      this.setState({ showEndGame: boolean, score: score });
      let name = this.userName()
      let count = score
      this.props.setMainState(COUNT_SCORE, {name, count})
      console.log(this.props.score)
    } else {
      this.setState({ showEndGame: boolean });
    }
  };
  render() {
    const { showEndGame } = this.state;
    return (
      <div>
        {showEndGame ? <EndGame newGame={this.handleEndGame} count={this.state.score}/> : null}
        <StartGame endGame={this.handleEndGame}/>
      </div>
    );
  }
}


const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  setMainState: (type, payload) => dispatch(setMainState(type, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)