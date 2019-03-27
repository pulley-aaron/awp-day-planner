import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class DateDisplay extends React.Component {
    render() {
        return (
            <div className="date-display">
                {this.props.dayName(this.props.currDate)}<br />
                {this.props.currDate.getDate()}<br />
                {this.props.monthName(this.props.currDate)} {this.props.currDate.getFullYear()}
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