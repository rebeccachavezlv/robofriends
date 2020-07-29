import React, { Component } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }
    render() {
        const filterRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        return (
            <div className = 'tc'>
                <h1 className= 'f-subheadline ma2 pt3'>RoboFriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}

export default App