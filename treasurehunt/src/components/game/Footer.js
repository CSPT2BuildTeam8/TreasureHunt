import React, { Component } from "react";

import styled from "styled-components";

export default class Footer extends Component {
    constructor() {
        super()
        this.state = {
          travel: false,
          status: '',
        }
      }
      travel = e =>
        this.setState({travel: true})
    render() {
        return(
            <div>
              <button onClick={this.travel}>Explore</button>  
              <div>
                {/* Not sure how to call and refresh the status with every room. Problem for later. */}
                <h1>Placeholder for status</h1>  
              </div>
              <div>
                <h1>Placeholder for icons</h1>  
              </div>
            </div>
        )
    }
}