import React from "react";
import { generateCards } from "./Images";

export default class StartGame extends React.Component {

  state = {
    images:  generateCards(12),
    classname: 'images',
    time: 0
  }
  
  count = 0
  characters = [];

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleClick = (event) => {
    let character = event.target;

    ++this.count;
    
    if (character.getAttribute("check") === "found") {
      return;
    }

    if (character !== this.characters[0]) {
      this.switch(character);
      this.characters.push(character);
    } else {
      this.switch(character);
      this.characters = [];
    }

    if(this.characters !== undefined && this.characters.length === 2 && this.checkName(this.characters[0], this.characters[1])){
      this.audio = new Audio("/click2.mp3");
      this.audio.play();
    } else {
      this.audio = new Audio("/click.mp3");
      this.audio.play();
    }
    
    if (this.characters.length > 2) {
      if (!this.checkName(this.characters[0], this.characters[1])) {
        this.switch(this.characters[0]);
        this.switch(this.characters[1]);
        this.characters.shift();
        this.characters.shift();
      } else {
        this.characters.shift();
        this.characters.shift();
      }
    }

    let allPictures = document.getElementsByClassName("image-blank");
    if (allPictures.length < 1) {
      this.props.endGame(true, this.count);
      this.count = 0;
      let reset = document.getElementsByClassName("image");
      for (let i = 0; i < reset.length; i++) {
        reset[i].classList.add("image-blank");
        reset[i].setAttribute("check", "false");
        this.characters = [];
      }
    }
  };

  checkName = (character1, character2) => {
    if (character1.getAttribute("name") === character2.getAttribute("name")) {
      character1.setAttribute("check", "found");
      character2.setAttribute("check", "found");
      return true;
    }
    return false;
  };

  switch = (target) => {
    if (target.getAttribute("check") === "true") {
      target.setAttribute("check", "false");
      target.classList.add("image-blank");
    } else {
      target.setAttribute("check", "true");
      target.classList.remove("image-blank");
    }
  };

  changeSize1 = () => {
    this.setState({images: generateCards(12), classname: 'images'})
  }

  changeSize2 = () => {
    this.setState({images: generateCards(16), classname: 'images2'})
  }

  changeSize3 = () => {
    this.setState({images: generateCards(20), classname: 'images3'})
  }

  render() {
    return (
      <div className="startGame">
        <div className="btn-group-vertical">
          <button onClick={this.changeSize1} className='btn-size'>3 x 4</button>
          <button onClick={this.changeSize2} className='btn-size'>4 x 4</button>
          <button onClick={this.changeSize3} className='btn-size'>5 x 4</button>
        </div>
        <div className={this.state.classname}>
          {this.state.images
            .sort(() => Math.random() - 0.5)
            .map((element, index) => {
              return (
                <div
                  className="image image-blank"
                  key={index}
                  name={element.name}
                  style={{ background: `url("${element.pic}")` }}
                  check="false"
                  onClick={this.handleClick}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
