import React, { Component } from "react";
import { withRouter } from "react-router";
import { Menu, Input, Icon, Header as HeaderText, Button } from 'semantic-ui-react'

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      enteredCity: 'Kiev'
    }
  }

  handleInput(e, {value}) {
    this.setState({enteredCity: value})
  }

  handleSearch(e) {
    e.preventDefault();

    let {loadWeather} = this.props;
    let {enteredCity = 'Kiev'} = this.state;

    loadWeather(enteredCity);
  }

  render() {

    console.log(this.props)

    return (
      <Menu fluid text>
        <Menu.Menu position='left'>
          <HeaderText size='small' color='green'>
            <Icon name='hand spock' size='big' color='green' circular/>
            {' '} WEATHER FORECAST
          </HeaderText>
        </Menu.Menu>
        <Menu.Menu position='right'>
        <Input error={!this.state.enteredCity.length} type='text'
               value={this.state.enteredCity} placeholder='Enter city: ' action onChange={this.handleInput}>
          <input />
          <Button disabled={!this.state.enteredCity.length} color='green' onClick={(e) => this.handleSearch(e)}>
            Search
          </Button>
        </Input>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Header);
