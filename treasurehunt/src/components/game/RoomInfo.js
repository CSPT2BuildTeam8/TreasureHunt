import React, { Component } from "react";
import room_data from "../../PsudoServer/data.json";
import map_data from "../../PsudoServer/mapData.json";

import styled from "styled-components";

import CardBack from "../images/info_background.jpg";

const RoomInfoBody = styled.div`
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

export default class RoomInfo extends Component {
    render() {
        return(
            <RoomInfoBody>
              <H1>Room: 
              {/* {room_data}{''} */}
              </H1>  
              <H1>{this.props.roomName}</H1>
              <H2>{this.props.roomDesc}</H2>
              <H1>Items</H1>
              <H2>{this.props.items}</H2>
              <H1>Players</H1>
              <H2>{this.props.players}</H2>
            </RoomInfoBody>
        )
    }
}