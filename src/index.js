import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import './index.css';
//import DateDisplay from ./filehere.txt; //One component per file

class DateDisplay extends React.Component {
    render() {
        var date = this.props.currDate;
        return (
            <div className="date-display">
                <div className="date-display__day-name">{moment(date).format('dddd')}</div>
                <div className="date-display__day-num">{moment(date).format('DD')}</div>
                <div className="date-display__month-year">{moment(date).format('MMMM YYYY')}</div>
            </div>
        );
    }
};

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            currDate: new Date(),
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
                    "Friday", "Saturday"],
            monthNames: ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"]
        };
    }
    
    dayName(dateObj) {
        return (this.state.dayNames[dateObj.getDay()]);
    }
    
    monthName(dateObj) {
        return (this.state.monthNames[dateObj.getMonth()]);
    }
    
    render() {
        return (
            <div className="app">
                <div className="schedule-page">
                    <header className="date-picker">
                        <DateDisplay
                            currDate={this.state.currDate}
                            dayName={(dateObj) => this.dayName(dateObj)}
                            monthName={(dateObj) => this.monthName(dateObj)}
                        />
                        <div className="date-select">
                            Select date
                        </div>
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