import React from 'react';
import moment from 'moment';

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaItems: [
                {
                    start: moment().hour(1).minute(30),
                    end: moment().hour(2),
                    description: "Meeting with Leroy."
                },
                {
                    start: moment().hour(20).minute(30),
                    end: moment().hour(22),
                    description: "Buy another cat."
                }
            ]
        };
    }
    
    createAgendaItem(start, end, description) {
        return ({
            start: start,
            end: end,
            description: description
        })
    }
    
    printAgendaItem(i) {
        var item = this.state.agendaItems[i];
        
        return (
            <div className="agenda-item">
                <div>{item.start.format('h:mm a')} - {item.end.format('h:mm a')}</div>
                <div>{item.description}</div>
            </div>
        );
    }

    render() {
        var date = this.props.currDate;
        return (
            <div className="agenda">
                <div className="add-agenda-item">
                Add New Item <span className="add-plus">+</span>
                </div>
                {this.printAgendaItem(0)}
                {this.printAgendaItem(1)}
                {this.printAgendaItem(0)}
                {this.printAgendaItem(1)}
            </div>
        );
    }
};

export default Agenda;