import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import Calendar from 'react-calendar'
import './index.css';
//import DateDisplay from ./filehere.txt; //One component per file

class DateDisplay extends React.Component {
    render() {
        var date = this.props.currDate;
        return (
            <div className="date-display">
                <div className="date-display__day-name">{moment(date).format('dddd')}</div>
                <div className="date-display__day-num">{moment(date).format('D')}</div>
                <div className="date-display__month-year">{moment(date).format('MMMM YYYY')}</div>
            </div>
        );
    }
};

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            currDate: new Date()
        };
    }
    
    setDate(dateObj) {
        this.setState((state, props) => {return {currDate: dateObj}});
    }
    
    render() {
        return (
            <div className="app">
                <div className="schedule-page">
                    <header className="date-picker">
                        <DateDisplay
                            className="date-display"
                            currDate={this.state.currDate}
                        />
                        <Calendar 
                            className="date-select"
                            calendarType="US"
                            value={this.state.currDate}
                            onChange={(dateObj) => this.setDate(dateObj)}
                        />
                    </header>
                    <main className="schedule">
                        Schedule items
                    </main>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));