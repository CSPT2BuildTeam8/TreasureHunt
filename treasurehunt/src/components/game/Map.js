import React, { Component } from "react";
import { FlexibleXYPlot, LineSeries, MarkSeries } from "react-vis";
import room_data from "../../PsudoServer/data.json";
import map_data from "../../PsudoServer/mapData.json";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
   from {
     opacity: 0
   }
   to {
     opacity: 1
   }
 `;
const StyledMap = styled.div`
  margin: auto;
  width: 75%;
  // height: 100%;
  flex: 1;
  padding: 3rem 4rem 2rem 3rem;
  position: relative;
  animation: ${fadeIn} 2s ease-in-out 0.6;
`;

export default class Map extends Component {
  state = {
    links: [],
    coordinates: []
  };
  componentDidMount() {
    // Create arrays to hold point coordinates and links
    const coordinates = [];
    const links = [];

    // Loop through each room in the room_data object

    for (let room in room_data) {
      let data = room_data[room]; // graph data
      coordinates.push(data);

      //get the adjacent rooms x and y coordinates and display that data
      for (let adjacentRoom in map_data[room]) {
        links.push([room_data[room], room_data[map_data[room][adjacentRoom]]]);
      }
    }
    this.setState({
      coordinates,
      links
    });
  }
  render() {
    const { coordinates, links } = this.state;
    // if links and coordinates empty load show that its loading
    if (!links.length && !coordinates.length) {
      return <div>Loading...</div>;
    }
    return (
      <StyledMap>
        <FlexibleXYPlot width={1224} height={568}>
          {/* To display the lines on the map to the next plot point */}
          {links.map(link => (
            <LineSeries
              strokeWidth="3"
              color="#0066ff"
              data={link}
              key={Math.random() * 100}
            />
          ))}
          {/* Plot the points for the room */}
          <MarkSeries
            current={this.props.currentRoom}
            strokeWidth={5}
            opacity="1"
            size="4"
            color="#16274a"
            data={coordinates}
            style={{ cursor: "pointer" }}
          />
        </FlexibleXYPlot>
      </StyledMap>
    );
  }
}
