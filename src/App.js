import React, { Component } from 'react';
import './App.css';
import timer from './timer.mp3';

import data from './data.json';

const {REACT_APP_POTTER_API_KEY} = process.env
let concatPotterApiKey = '$2a$10$' + REACT_APP_POTTER_API_KEY


class App extends Component {
  constructor(){
    super()

    this.state = {
      prompts: [],
      currentPrompt: '',
      recentPrompts: [],
      teamOneScore: 0,
      teamTwoScore: 0,
      playing: false

    }
    this.onPlay = this.onPlay.bind(this);
    this.sound = new Audio(timer);
  }
  
  componentWillMount(){
    this.organizePrompts()
  }
  componentDidMount(){
    this.selectPrompt()
  }
  
  onPlay(){
    if(this.state.playing){
      this.sound.pause()
      this.sound.currentTime = 0;
      this.setState({
        playing: false
      })
    } else {

      this.sound.play();
      this.setState({
        playing: true
      })
    }
  }
  organizePrompts(){
    let {characters, spells, places, houses, bookTitles, species, subjects, bloodStatus, miscellaneous, quotes, years, objects, books, foods} = data
    let tempPromptArr = characters.concat(spells, places, houses, bookTitles, species, subjects, bloodStatus, miscellaneous, quotes, years, objects, books, foods)
    console.log(tempPromptArr);
    
    this.setState({
      prompts: tempPromptArr
    })
    
  }

  selectPrompt(){
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }    

    let promptLength = this.state.prompts.length
    console.log(promptLength);
    
    let randomIndex = getRandomInt(promptLength)

    if(!this.state.recentPrompts.includes(randomIndex)) {
      let currentPrompt = this.state.prompts[randomIndex]
      
      let tempRecentPrompts = this.state.recentPrompts
      tempRecentPrompts.unshift(randomIndex)
      tempRecentPrompts = tempRecentPrompts.slice(0, 200)
      this.setState({
        currentPrompt: currentPrompt,
        recentPrompts: tempRecentPrompts
      })
    } else {
      this.selectPrompt()
    }
  }
  handleTeamOneAdd(){
    let tempTeamOneScore = this.state.teamOneScore
    tempTeamOneScore++
    this.setState({
      teamOneScore: tempTeamOneScore
    })
  }
  handleTeamTwoAdd(){
    let tempTeamTwoScore = this.state.teamTwoScore
    tempTeamTwoScore++
    this.setState({
      teamTwoScore: tempTeamTwoScore
    })
  }
  handleReset(){
    this.setState({
      teamOneScore: 0,
      teamTwoScore: 0
    })
  }

  render() {
    return (
      <div className="App">
      {console.log(this.state)}
        <h1 className="title">Harry Potter Catch Phrase</h1>
        <div className="gameControls">
          <span className="prompts">{this.state.currentPrompt}</span>
          <div className="gameControlButtons">
            <button onClick={() => this.selectPrompt()}>
              Next
            </button>
            <button onClick={() => this.onPlay()}>
              Start
            </button>
          </div>
        </div>
        <div className="scoreBoard">
          <span className="teamLabel">Team 1</span>
          <span className="score">{this.state.teamOneScore}</span>
          <button onClick={() =>  this.handleTeamOneAdd()}>Add</button>
          <button onClick={() => this.handleReset()}>Reset Score</button>
          <button onClick={() =>  this.handleTeamTwoAdd()}>Add</button>
          <span className="score">{this.state.teamTwoScore}</span>
          <span className="teamLabel">Team 2</span>
        </div>
      </div>
    );
  }
}

export default App;
