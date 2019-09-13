import React, { Component } from "react";

import CardBack from "../images/info_background.jpg";

import styled from "styled-components";

const PlayerInfoBody = styled.div`
  background-image: url(${CardBack});
  background-size: 100% 100%;
  height: 40vh;
  margin: 2% 6%;
  border-radius: 8px;
  box-shadow: 0px 10px 5px black;
`
const H1 = styled.h1`
  font-size: 1.8rem;
  margin: 5%;
`
const H2 = styled.h2`
  font-size: 1.6rem;
`

export default class PlayerInfo extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            gold: '',
            encumber: '',
            strength: '',
            speed: '',
            inventory: '',
        }
    }
    render() {
        return(
            <PlayerInfoBody>
              <div>
                <H1>{this.props.name}</H1>  
                <H1>{this.props.gold}</H1>
              </div>
              <div>  
                <H1>Encumbrance: {this.props.roomDesc}</H1>
                <H1>Strength: {this.props.strength}</H1>
                <H1>Speed: {this.props.speed}</H1>
              </div>
              <div>  
                <H1>Inventory</H1>
                {/* Might need to make inventory items buttons that when clicked will equip item */}
                <H2>{this.props.inventory}</H2>
                {/* Not sure what's up with the icons below the player info card on the provided img. 
                Might have to add them later, maybe not */}
              </div>
            </PlayerInfoBody>
        )
    }
}