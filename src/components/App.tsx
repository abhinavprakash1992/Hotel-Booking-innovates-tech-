import * as React from 'react';
import './App.scss';
import * as FontAwesome from "react-fontawesome";

export default class App extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      rooms: 1,
      adults: 1,
      disableRoomSubtraction: false,
      disableRoomAddition: false,
      disableAdultSubtraction: false,
      disableAdultAddition: false,
      disableChildrenAddition: false,
      disableChildrenSubtraction: false,
      children: 0,
    };
  }

  componentDidMount() {
    const nextState: State = {
      ...this.state
    }
    if (nextState.rooms <= 1) {
      nextState.disableRoomSubtraction = true;
    }
    if (nextState.adults <= 1) {
      nextState.disableAdultSubtraction = true;
    }
    this.setState(nextState)
  }

  onDecreaseRoomsCount = () => {
    const nextState: State = {
      ...this.state
    }
    if (nextState.rooms > 1) {
      nextState.rooms--
      nextState.disableRoomAddition = false
    } else if (nextState.rooms <= 1) {
      nextState.disableRoomSubtraction = true;
    }

    if ((nextState.rooms) * 4 < nextState.adults + nextState.children) {
      const differntiator = (nextState.adults + nextState.children) - ((nextState.rooms) * 4);
      nextState.children -= differntiator;
      if (nextState.children < 0) {
        nextState.adults += nextState.children;
        nextState.children = 0;
      }
    }
    this.setState(nextState)
  }

  onDecreaseAdultCount = () => {
    const nextState: State = {
      ...this.state
    }
    nextState.disableChildrenAddition = false;
    nextState.disableChildrenAddition = false;
    if (nextState.adults > 1) {
      nextState.adults--
      nextState.disableAdultAddition = false
    }
    if (nextState.adults <= 1) {
      nextState.disableAdultSubtraction = true;
    }
    this.setState(nextState)
  }
  onDecreaseChildrenCount = () => {
    const nextState: State = {
      ...this.state
    }
    nextState.disableAdultAddition = false;
    if (nextState.children > 0) {
      nextState.children--
      nextState.disableChildrenAddition = false
    }
    if (nextState.children <= 1) {
      nextState.disableChildrenSubtraction = true;
    }
    this.setState(nextState)
  }

  onIncreaseRoomsCount = () => {
    const nextState: State = {
      ...this.state
    }
    if (nextState.rooms < 5) {
      nextState.rooms++
      nextState.adults++;
      nextState.disableRoomSubtraction = false;
    }
    if (nextState.rooms >= 5) {
      nextState.disableRoomAddition = true
    }
    this.setState(nextState)
  }

  onIncreaseAdultCount = () => {
    const nextState: State = {
      ...this.state
    }
    nextState.disableAdultSubtraction = false;
    switch (nextState.rooms) {
      case 1: {
        if (nextState.adults < 4) {
          nextState.adults++
        }
      }
        break;
      case 2: {
        if (nextState.adults < 8) {
          nextState.adults++
        }
      }
        break;
      case 3: {
        if (nextState.adults < 12) {
          nextState.adults++
        }
      }
        break;
      case 4: {
        if (nextState.adults < 16) {
          nextState.adults++
        }
      }
      case 5: {
        if (nextState.adults < 20) {
          nextState.adults++
        }
      }
    }
    if (nextState.adults >= nextState.rooms * 4) {
      nextState.disableAdultAddition = true
      nextState.disableChildrenAddition = true;
    }
    this.setState(nextState)
  }
  onIncreaseChildrenCount = () => {
    const nextState: State = {
      ...this.state
    }

    if (nextState.rooms * 4 === nextState.adults) {
      nextState.disableChildrenAddition = true;
      this.setState(nextState)
      return;
    }

    if ((nextState.children + nextState.adults) < nextState.rooms * 4) {
      nextState.children++
      nextState.disableChildrenSubtraction = false;
    }

    if (nextState.children >= 5) {
      nextState.disableChildrenAddition = true
    }
    if ((nextState.adults + nextState.children) >= nextState.rooms * 4) {
      nextState.disableAdultAddition = true
      nextState.disableChildrenAddition = true;
    }
    this.setState(nextState)
  }





  render() {
    return (
      <div style={{ width: "600px", marginLeft: "382px", marginTop: "155px" }}>
        <div style={{ marginBottom: "5px" }}>
          <FontAwesome
            name={"users"}
            style={{ marginRight: "10px" }}
            size={"lg"}
          />
          Choose number of peoples
        </div>
        <table >
          <thead>
            <tr>
              <th>
                <FontAwesome
                  name={"bed"}
                  size={"lg"}
                  style={{ marginRight: "20px" }}
                />
                ROOMS
                <span style={{ float: "right" }}>
                  <FontAwesome
                    name={"minus"}
                    className={this.state.disableRoomSubtraction ? "buttonicons-disabled" : " buttonicons"}
                    disabled={this.state.disableRoomSubtraction}
                    onClick={() => { this.onDecreaseRoomsCount(); }}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ marginRight: "10px" }}>
                    {this.state.rooms}
                  </span>
                  <FontAwesome
                    name={"plus"}
                    onClick={() => { this.onIncreaseRoomsCount(); }}
                    className={this.state.disableRoomAddition ? "buttonicons-disabled" : " buttonicons-addition"}
                    disabled={this.state.disableRoomAddition}
                  />
                </span>
              </th>
            </tr>
            <tr>
              <th>
                <FontAwesome
                  name={"male"}
                  size={"lg"}
                  style={{ marginRight: "30px" }}
                />
                ADULTS
                    <span style={{ float: "right" }}>
                  <FontAwesome
                    name={"minus"}
                    className={this.state.disableAdultSubtraction ? "buttonicons-disabled" : " buttonicons"}
                    disabled={this.state.disableAdultSubtraction}
                    onClick={() => { this.onDecreaseAdultCount(); }}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ marginRight: "10px" }}>
                    {this.state.adults}
                  </span>
                  <FontAwesome
                    name={"plus"}
                    onClick={() => { this.onIncreaseAdultCount(); }}
                    className={this.state.disableAdultAddition ? "buttonicons-disabled" : " buttonicons-addition"}
                  />
                </span>
              </th>
            </tr>
            <tr>
              <th>
                <FontAwesome
                  name={"child"}
                  size={"lg"}
                  style={{ marginRight: "20px" }}
                />
                CHILDREN
                     <span style={{ float: "right" }}>
                  <FontAwesome
                    name={"minus"}
                    className={this.state.disableChildrenSubtraction ? "buttonicons-disabled" : " buttonicons-addition"}
                    onClick={() => { this.onDecreaseChildrenCount(); }}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ marginRight: "10px" }}>
                    {this.state.children}
                  </span>
                  <FontAwesome
                    name={"plus"}
                    onClick={() => { this.onIncreaseChildrenCount(); }}
                    className={this.state.disableChildrenAddition ? "buttonicons-disabled" : " buttonicons-addition"}
                  />
                </span>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
interface State {
  adults: number;
  rooms: number;
  disableRoomSubtraction: boolean;
  disableRoomAddition: boolean;
  disableAdultSubtraction: boolean;
  disableAdultAddition: boolean;
  disableChildrenSubtraction: boolean;
  disableChildrenAddition: boolean;
  children: number;
}
