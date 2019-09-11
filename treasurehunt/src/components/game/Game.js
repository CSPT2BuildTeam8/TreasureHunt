import React, { Component } from "react";

import styled from "styled-components";

import MapBody from "./Map";
import RoomInfo from "./RoomInfo";
import PlayerInfo from "./PlayerInfo";
import Footer from "./Footer";

const GameBody = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  background: black;
  display: flex;
  justify-content: center;
`
const H1 = styled.h1`
  font-size: 2.4rem;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 2%;
`
const MapWrap = styled.div`
  display: flex;
`
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`
export default class Welcome extends Component {
    render() {
        return(
            <GameBody>
              <Header>
                <H1>Treasure Hunt</H1>    
              </Header>  
              <MapWrap>
                <MapBody />
                <InfoWrap>
                  <RoomInfo />
                  <PlayerInfo />
                </InfoWrap>
              </MapWrap>
              <Footer />
            </GameBody>
        )
    }
}