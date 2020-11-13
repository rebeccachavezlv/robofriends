import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import { requestRobots, setSearchField } from '../actions'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: event => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots)
    }
}

function App(props) {
    const dispatch = useDispatch();
    const { searchField, onSearchChange, robots, isPending, onRequestRobots } = props;

    useEffect(() => {dispatch(onRequestRobots())}, [dispatch]);

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return isPending ? 
        <h1>Loading</h1> : (
        <div className = 'tc'>
            <h1 className= 'f-subheadline ma2 pt3'>RoboFriends</h1>
            <Searchbox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(App);