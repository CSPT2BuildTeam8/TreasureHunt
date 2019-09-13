import React, { Component } from "react";

import styled from "styled-components";

import HeadBack from "../images/about_card.jpg";

const H1 = styled.h1`
  text-shadow: 3px 3px 3px black;
  color: #e5e5e5;
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  padding: 2%;
`
const Div = styled.div`
  background-image: url(${HeadBack});
  background-size: 100% 100%;
  position: absolute;
  margin: 3%;
  padding: 2%;
  box-shadow: 0px 10px 5px black;
`

export default class Header extends Component {
    render() {
        return(
            <Div>
                <H1>Treasure Hunt</H1>
            </Div>
        )
    }
}