import React, { Component } from "react";

import styled from "styled-components";

const RoomInfoBody = styled.div`
  background: #007400;
`
const H1 = styled.h1`
  font-size: 1.8rem;
  margin: 5%;
`
const H2 = styled.h2`
  font-size: 1.6rem;
`

export default class RoomInfo extends Component {
    constructor() {
        super()
        this.state = {
            roomID: '',
            roomName: '',
            roomDesc: '',
            items: '',
            players: '',
        }
    }
    render() {
        return(
            <RoomInfoBody>
              <H1>Room {this.props.roomID}</H1>  
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