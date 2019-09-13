import React, { Component } from "react";

import styled from "styled-components";

import MapBack from "../images/map_background.png";

import Map from "./Map";
import RoomInfo from "./RoomInfo";
import PlayerInfo from "./PlayerInfo";
import Footer from "./Footer";
import Header from './Header';

const GameBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  background-image: url(${MapBack});
  background-size: 100% 100%;
  // height: 100vh;
`
const MapWrap = styled.div`
  display: flex;
  padding-top: 13%;
`
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  // height: 100vh;
`
const Div = styled.div`
  display: flex;
  margin-top: 2%;
`
export default class Welcome extends Component {
    render() {
        return(
            <GameBody>
              <Header />
              <Div>
                <MapWrap>
                  <Map />
                </MapWrap>  
                <InfoWrap>
                  <RoomInfo />
                  <PlayerInfo />
                </InfoWrap>
              </Div>
            </GameBody>
        )
    }
}