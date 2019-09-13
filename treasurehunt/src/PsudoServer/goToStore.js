import React, { Component } from 'react';
import axios from 'axios';


class SellTreasure extends Component {
    state = {
        inventory: [],
        room_id: null,
    };
// Furction to find the shortest way
findQuickestPath

// Function that takes you to the store
goToStore = async () => {
    const path = this.findQuickestPath(this.state.room_id, 1)
    for (let direction of path) {
        for (let d in direction) {
            await this.flyToRooms(d, direction[d]);
        }
    }
}

//Function to Sell Items

sellTreasure = async name => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/',
        headers: {
          Authorization: process.env.API_KEY
        },
        data: {
          name,
          confirm: 'yes'
        }
      });
      console.log(res);
      this.setState({
        messages: [...res.data.messages],
        cooldown: res.data.cooldown
      });
      await this.wait(1000 * res.data.cooldown);
    } catch (err) {
      console.log('There was an error.');
      console.dir(err);
      this.setState({ cooldown: err.response.data.cooldown });
      throw new Error(err.response.data.errors[0]);
    }
  };

  // Sell all treasure by looping through them
  sellAllTreasure = async () => {
    const { inventory } = this.state;
    for (let treasure of inventory) {
      await this.sellTreasure(treasure);
    }
    await this.getStatus();
  };



};

export default SellTreasure;