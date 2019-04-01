import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Calendar from 'react-calendar';
import DateDisplay from './date-display.js';
import Agenda from './agenda.js';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            currDate: new Date()
        };
        
        this.setDate = this.setDate.bind(this);
    }
    
    setDate(dateObj) {
        this.setState((state, props) => ({currDate: dateObj}));
    }
    
    render() {
        return (
            <div className="app">
                <div className="schedule-page">
                    <header className="date-header">
                        <DateDisplay
                            currDate={this.state.currDate}
                        />
                        <Calendar 
                            className="date-select"
                            calendarType="US"
                            value={this.state.currDate}
                            onChange={(dateObj) => this.setDate(dateObj)}
                        />
                    </header>
                    <Agenda
                        currDate={this.state.currDate}
                    />
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));