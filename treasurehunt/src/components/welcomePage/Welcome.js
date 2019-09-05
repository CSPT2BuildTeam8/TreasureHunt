import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

const WelcomeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  height: 100vh;
  background: -moz-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* ff3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(46,255,70,1)), color-stop(100%, rgba(0,128,128,1))); /* safari4+,chrome */
  background: -webkit-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* ie10+ */
  background: linear-gradient(120deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2EFF46', endColorstr='#008080',GradientType=1 ); /* ie6-9 */
`
const Card = styled.div`
  padding: 3%;
  background: #D68511;
  width: 75%;
  border-radius: 8px;
  border-top: double 7px black;
  border-bottom: double 7px black;
  border-left: 3px solid black;
  border-right: 3px solid black;
  -webkit-box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.75);
`
const H1 = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 5%;
  font-weight: bold;
`
const H2 = styled.h2`
  font-size: 1.8rem;
  margin: 1.5%;
`
const Sub = styled.sub`
  font-size: 1rem;
  padding: 0 9%;
  -webkit-appearance: textarea;
  line-height: 1.5;
`
const Input = styled.input`
  width: 50%;
  height: 30px;
  border-radius: 8px;
  padding-left: 1%;
  margin-right: 1%;
  border: none;
`
const Button = styled.button`
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #703500;
  color: white;
`

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
          <WelcomeBody>
              <Card>
                <H1>Welcome to Tresure Hunt</H1>
                <H2>A game where you explore rooms, hunt for treasure,</H2>  
                <Sub>(didn’t see that coming did you?)</Sub>
                <H2>Gain new skills, and maybe discover a little something about yourself.*</H2>
                <Sub>*Any actual self-discovery is purely coincidental. Treasure Hunt and its subsidiaries 
                    Take no liability for the ever-growing emptiness within your soul.
                    Ennui is simply part of the human condition, and can not be solved with a simple video game… 
                    except maybe that one where you wander around catching little anime monsters and force them 
                    to fight for your amusement and personal gain. You know the one I mean. 
                </Sub>
              </Card>
              <Card>
                  <H2>Please enter your personal API key to continue.</H2>
                <Input type="text" placeholder="Key..." value={this.state.value} />
                <NavLink to="/game">
                    <Button onclick={this.useKey}>
                        <p>Begin The Game</p>
                    </Button>
                </NavLink>
              </Card>
          </WelcomeBody>
        )
    }
}