import React, { Component } from "react";

import { Header, Icon, Segment, Dimmer, Loader, Card, Button, Dropdown } from 'semantic-ui-react';

const options = [
  { key: '3', text: '3 days', value: 3 },
  { key: '5', text: '5 days', value: 5 },
  { key: '16', text: '16 days', value: 16 },
]

const NoSelectedCity = () => {
  return (<Header size='huge' icon textAlign='center'>
      <Icon name='building outline' circular size='massive' color='green'/>
      <Header.Content>
        Please, select city
      </Header.Content>
    </Header>)
}

const WrongSelectedCity = () => {
  return (<Header size='huge' icon textAlign='center'>
      <Icon name='warning' circular size='massive' color='red'/>
      <Header.Content>
        City was not found. Please, select correct city.
      </Header.Content>
    </Header>)
}

const Loading = () => {
  return (
    <Segment>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    </Segment>
  )
}

const WeatherCard = ({list = [], days, code}) => {
  console.warn('code >>>>', code, typeof code)

  if(!list.length) {
    return Number(code) >= 400 ? <WrongSelectedCity /> : <NoSelectedCity />
  }



  let slicedArray = list.slice(0, days);

  let formanDate = (date) => {
    let currentDate = new Date(date);
    return currentDate.toISOString().slice(0,10).replace(/-/g,"/");
  }

  return (
    <Card.Group itemsPerRow={days < 5 ? 3 : 5} style={{marginTop: 10, marginBottom: 10}}>
    {slicedArray.map(val => {
      return (
        <Card>
        <Card.Content>
        <Card.Header>
          Date: {formanDate(val.dt)} <br />
          Temp: {val.temp.day.toFixed(0)}C / {val.weather[0].main}
        </Card.Header>
        <Card.Meta>
          Humidity: {val.humidity}
        </Card.Meta>
        <Card.Description>
          Description: clouds {val.clouds} % <br />
          Wind: deg - {val.deg} / speed - {val.speed}
        </Card.Description>
        </Card.Content>
        </Card>
      )
    })}
    </Card.Group>
  )
}

class DayCards extends Component {
  constructor(props) {
    super(props);

    this.handleDromDown = this.handleDromDown.bind(this);

    this.state={
      selectedDays: 3
    }
  }

  handleDromDown(e, {value}) {
    this.setState({selectedDays: value});
  }

  render() {
    let {loading, weather} = this.props;

    return (
      <div style={{width: '100%'}}>
      <Button.Group color='teal'>
        <Button>Select days for forecast: </Button>
        <Dropdown options={options} defaultValue={this.state.selectedDays} floating button className='icon' onChange={this.handleDromDown} />
      </Button.Group>

      {loading ? <Loading /> : <WeatherCard list={weather.list} days={this.state.selectedDays} code={weather.cod} />}
      </div>
    )
  }
}

export default DayCards;
