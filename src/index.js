import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Calendar from 'react-calendar';
import DateDisplay from './date-display.js';
import AgendaItem from './agenda-item.js';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            currDate: moment(),
            storage: [  // Array of dates, currently only one
                {
                    date: moment().hour(0).minute(0).second(0), // Always today for now
                    agenda: [
                        {
                            id: "demo0",
                            start: moment().hour(1).minute(30),
                            end: moment().hour(2).minute(0),
                            description: "Lunch with Leroy."
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
                    ],
                    toDo:[],
                    notes:""
                }
            ]
        };
        
        this.setDate = this.setDate.bind(this);
        this.changeAgendaItem = this.changeAgendaItem.bind(this);
    }
    
    setDate(dateObj) {
        this.setState((state, props) => ({currDate: dateObj}));
    }
    
    changeAgendaItem(id, start, end, description) {
        var storageUpdate = this.state.storage.slice();
        
        // Get agenda for date
        var dayData = storageUpdate.find((i) => {
            return i.date.format("YYYY-MM-DD") === start.format("YYYY-MM-DD");
        });
        
        if(!dayData) {
            alert("no agenda for that day");
            return;
        }
        
        // Get agenda item for id
        var item = dayData.agenda.find((i) => {
            return i.id === id;
        });
        
        if(!item) {
            alert("agenda item does not exist to update");
            return;
        }
        
        item.start = start;
        item.end = end;
        item.description = description;
        
        this.setState((state, props) => ({
            storage: storageUpdate
        }));
    }
    
    render() {
        // Get data for current day
        var dayData = this.state.storage.find((i) => {
            return i.date.format("YYYY-MM-DD") === this.state.currDate.format("YYYY-MM-DD");
        });
        
        // Create agenda item element list
        const agendaItems = dayData.agenda.map((item, index) => {
            return (
                <AgendaItem
                    id={item.id}
                    start={item.start}
                    end={item.end}
                    description={item.description}
                    onChange={(newStart, newEnd, newDescription) => this.changeAgendaItem(item.id, newStart, newEnd, newDescription)}
                />
            );
        });
        
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
                            value={this.state.currDate.toDate()}
                            onChange={(dateObj) => this.setDate(dateObj)}
                        />
                    </header>
                    <div className="agenda">
                        <div className="add-agenda-item">
                            Add New Item <span className="add-plus">+</span>
                        </div>
                        {agendaItems}
                    </div>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));