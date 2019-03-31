import React from 'react';
import moment from 'moment';

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

export default DateDisplay;