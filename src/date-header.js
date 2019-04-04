import React from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';

class DateHeader extends React.Component {
    constructor (props) {
        super (props);
        
        this.state = {
            extended: 0
        };
        
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.setDate = this.setDate.bind(this);
    }
    
    toggleCalendar(e) {
        e.preventDefault();
        let val = !this.state.extended;
        this.setState((state, props) => ({extended: val}));
    }
    
    setDate(dateObj) {
        this.setState((state, props) => ({extended: 0}));
        this.props.onChange(dateObj);
    }
    
    render() {
        let calClass = "date-select";
        if(this.state.extended) {
            calClass = calClass + " extended";
        }
        
        let displayClass = "date-display";
        if(this.state.extended) {
            displayClass = displayClass + " extended";
        }
        
        return (
            <header className="date-header">
                <div className={displayClass}
                    onClick={this.toggleCalendar}
                >
                    {moment(this.props.currDate).format('dddd, D MMMM YYYY')}<i className="fas fa-chevron-down drop-down-arrow"></i>
                </div>
                <Calendar className={calClass}
                    calendarType="US"
                    value={this.props.currDate.toDate()}
                    onChange={this.setDate}
                />
            </header>
        );
    }
};

export default DateHeader;