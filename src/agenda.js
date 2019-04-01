import React from 'react';
import moment from 'moment';
import AgendaItem from './agenda-item.js';

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaItems: [
                {
                    id: "demo0",
                    start: moment().hour(1).minute(30),
                    end: moment().hour(2).minute(0),
                    description: "Meeting with Leroy."
                },
                {
                    id: "demo1",
                    start: moment().hour(20).minute(30),
                    end: moment().hour(22).minute(0),
                    description: "Buy another cat."
                },
                {
                    id: "demo2",
                    start: moment().hour(4).minute(30),
                    end: moment().hour(5).minute(0),
                    description: "Paint the turtle's tank. And also the turtle's log. And also the turtle."
                },
                {
                    id: "demo3",
                    start: moment().hour(8).minute(30),
                    end: moment().hour(9).minute(0),
                    description: "Breakfast."
                }
            ]
        };
    }

    render() {
        // Loop through agenda items
        const items = this.state.agendaItems.map((item, index) => {
            return (
                <AgendaItem
                    id={item.id}
                    start={item.start}
                    end={item.end}
                    description={item.description}
                />
            );
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