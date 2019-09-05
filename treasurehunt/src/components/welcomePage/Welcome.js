import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

export default class Welcome extends Component {
    constructor() {
      super()
      this.state = {value: '',}
    }
    useKey = (e) =>{
        this.setState({value: e.target.value})
    }  
    
    render() {
        return (
          <div>
              <div>
                <h1>Welcome to Tresure Hunt</h1>
                <h2>Where you explore rooms, hunt for treasure,</h2>  
                <sub>(didn’t see that coming did you?)</sub>
                <h2>Gain new skills, and maybe discover a little something about yourself.*</h2>
                <sub>*Any actual self-discovery is purely coincidental. Treasure Hunt and its subsidiaries 
                    Take no liability for the ever-growing emptiness within your soul.
                    Ennui is simply part of the human condition, and can not be solved with a simple video game… 
                    except maybe that one where you wander around catching little anime monsters and force them 
                    to fight for your amusement and personal gain. You know the one I mean. 
                </sub>
              </div>
              <div>
                <input type="text" value={this.state.value} />
                <NavLink to="/game">
                    <button onclick={this.useKey}>
                        <p>Begin The Game</p>
                    </button>
                </NavLink>
              </div>
          </div>
        )
    }
}