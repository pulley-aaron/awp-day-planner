import React from 'react';
import moment from 'moment';

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaItems: [
                {
                    start: moment().hour(1).minute(30),
                    end: moment().hour(2).minute(0),
                    description: "Meeting with Leroy."
                },
                {
                    start: moment().hour(20).minute(30),
                    end: moment().hour(22).minute(0),
                    description: "Buy another cat."
                },
                {
                    start: moment().hour(4).minute(30),
                    end: moment().hour(5).minute(0),
                    description: "Paint the turtle's tank. And also the turtle's log. And also the turtle."
                },
                {
                    start: moment().hour(8).minute(30),
                    end: moment().hour(9).minute(0),
                    description: "Breakfast."
                }
            ]
        };
    }
    
    createAgendaItem(start, end, description) {
        return ({
            start: start,
            end: end,
            description: description
        });
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
    
    printAgendaItem2(item, key) {
        return (
            <div key={key} className="agenda-item">
                <div>{item.start.format('h:mm a')} - {item.end.format('h:mm a')}</div>
                <div>{item.description}</div>
            </div>
        );
    }

    render() {
        // Loop through agenda items
        const items = this.state.agendaItems.map((item, index) => {
            var key = new Date().toString + "a" + index;
            return this.printAgendaItem2(item, key);
        });
                
        return (
            <div className="agenda">
                <div className="add-agenda-item">
                    Add New Item <span className="add-plus">+</span>
                </div>
                {items}
            </div>
        );
    }
};

export default Agenda;