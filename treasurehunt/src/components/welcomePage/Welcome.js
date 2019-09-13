import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AboutBack from "../images/about_background.jpg";
import AboutCard from "../images/about_card.jpg";

import styled from "styled-components";

const WelcomeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-image: url(${AboutBack});
  background-size: cover;
`
const Card = styled.div`
  padding: 3%;
  width: 75%;
  background-image: url(${AboutCard});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  box-shadow: 0px 10px 5px black;
`
const H1 = styled.h1`
  text-shadow: 3px 3px 3px black;
  color: #e5e5e5;
  font-size: 2.4rem;
  margin-bottom: 5%;
  font-weight: bold;
`
const H2 = styled.h2`
  text-shadow: 3px 3px 3px black;
  color: #e5e5e5;
  font-size: 1.8rem;
  margin: 1.5%;
`
const Sub = styled.sub`
  text-shadow: 3px 3px 3px black;
  color: #e5e5e5;
  font-size: 1rem;
  padding: 0.5% 9%;
  background: #703500;
  -webkit-appearance: textarea;
  line-height: 1.5;
`
const Button = styled.button`
  height: 37px;
  width: 10%;
  border-radius: 8px;
  background: #703500;
  color: white;
  margin-top: 3%;
  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari prior 9.0 */
    transform: scale(1.5); /* Standard syntax */
  }
`

export default class Welcome extends Component {      
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
                <NavLink to="/game">
                    <Button>
                        <p>Begin The Game</p>
                    </Button>
                </NavLink>
              </Card>
          </WelcomeBody>
        )
    }
}