import React, { Component } from "react";

import styled from "styled-components";

const MapBody = styled.div`
  width: 70%;
  height: 70vh;
  background: -moz-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* ff3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(46,255,70,1)), color-stop(100%, rgba(0,128,128,1))); /* safari4+,chrome */
  background: -webkit-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(330deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* ie10+ */
  background: linear-gradient(120deg, rgba(46,255,70,1) 0%, rgba(0,128,128,1) 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2EFF46', endColorstr='#008080',GradientType=1 ); /* ie6-9 */
`

export default class Map extends Component {
    render() {
        return(
            <MapBody>

            </MapBody>
        )
    }
}