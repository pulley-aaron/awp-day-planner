import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import Calendar from 'react-calendar';
import DateDisplay from './date-display.js';
import AgendaItem from './agenda-item.js';
import Model from './model.js';

class App extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            model: new Model("awp-planner-app-storage"),
            currDate: moment().hour(0).minute(0).second(0),
            currAgenda: [],
            /*dayData: null,
            storage: [  // Array of dates, currently only one
                {
                    date: moment().hour(0).minute(0).second(0), // Always today for now
                    agenda: [
                        {
                            id: "demo0",
                            start: moment().hour(1).minute(30),
                            end: moment().hour(2).minute(0),
                            description: "Lunch with Leroy.",
                            new: 0
                        },
                        {
                            id: "demo1",
                            start: moment().hour(20).minute(30),
                            end: moment().hour(22).minute(0),
                            description: "Buy another cat.",
                            new: 0
                        },
                        {
                            id: "demo2",
                            start: moment().hour(4).minute(30),
                            end: moment().hour(5).minute(0),
                            description: "Paint the turtle's tank. And also the turtle's log. And also the turtle.",
                            new: 0
                        },
                        {
                            id: "demo3",
                            start: moment().hour(8).minute(30),
                            end: moment().hour(9).minute(0),
                            description: "Breakfast.",
                            new: 0
                        }
                    ],
                    toDo:[],
                    notes:""
                }
            ]*/
        };
        
        // Get data for date
        //this.state.dayData = this.getDayData(this.state.storage, this.state.currDate);
        this.state.currAgenda = this.state.model.getAgendaForDay(this.state.currDate);
        
        // Bind functions
        this.updateStorage = this.updateStorage.bind(this);
        this.setDate = this.setDate.bind(this);
        this.createAgendaItem = this.createAgendaItem.bind(this);
        this.updateAgendaItem = this.updateAgendaItem.bind(this);
    }
    
    updateStorage() {
        this.state.model.setAgendaForDay(this.state.currDate, this.state.currAgenda);
    }
    
    setDate(momentObj) {
        var newDate = momentObj.hour(0).minute(0).second(0);
        var newAgenda = this.model.getAgendaForDay(newDate);
        
        this.setState((state, props) => ({
            currDate: newDate,
            currAgenda: newAgenda
        }));
    }
    
    getDayData(container, date) {
        var data = container.find((i) => {
            return i.date.format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
        });
        
        return data;
    }
    
    createAgendaItem() {
//        var storageUpdate = this.state.storage.slice();
//        
//        // Get agenda for date
//        var dayData = this.getDayData(storageUpdate, this.state.currDate);
//        // If no day data, create new
//        if(!dayData) {
//            dayData = {
//                date: this.state.currDate.hour(0).minute(0).second(0),
//                agenda: [],
//                toDo:[],
//                notes:""
//            };
//            storageUpdate.push(dayData);
//        }
//        
//        // Add agenda item
//        dayData.agenda.push({
//            id: moment().format(),
//            start: moment(),
//            end: moment().add(1, 'hour'),
//            description: "",
//            new: 1
//        });
//        
//        this.setState((state, props) => ({
//            storage: storageUpdate
//        }));
        var newAgenda = this.state.currAgenda.slice();
        
        // Add agenda item
        newAgenda.push({
            id: moment().format() + " " + Math.floor(Math.random()*9999),
            start: moment(),
            end: moment().add(1, 'hour'),
            description: "",
            new: 1
        });
        
        // Make updates
        this.setState((state, props) => (
            {currAgenda: newAgenda},
            this.updateStorage
        ));
    }
    
    updateAgendaItem(id, start, end, description) {
//        var storageUpdate = this.state.storage.slice();
//        
//        // Get agenda for date
//        var dayData = storageUpdate.find((i) => {
//            return i.date.format("YYYY-MM-DD") === start.format("YYYY-MM-DD");
//        });
//        
//        if(!dayData) {
//            alert("no agenda for that day");
//            return;
//        }
        var newAgenda = this.state.currAgenda.slice();

        // Get agenda item for id
        var item = newAgenda.find((i) => {
            return i.id === id;
        });
        
        if(!item) {
            alert("agenda item does not exist to update");
            return;
        }
        
        // Edit item entries (not key)
        item.start = start;
        item.end = end;
        item.description = description;
        item.new = 0;
        
        // Make updates
        this.setState((state, props) => (
            {currAgenda: newAgenda},
            this.updateStorage
        ));
//        this.setState((state, props) => ({
//            storage: storageUpdate
//        }));
    }
    
    deleteAgendaItem(id) {
//        var storageUpdate = this.state.storage.slice();
//        
//        // Get agenda for date
//        var dayData = this.getDayData(storageUpdate, this.state.currDate);
//        // If no day data, nothing to delete
//        if(!dayData) {
//            return;
//        }
//        
//        // Remove agenda item
//        dayData.agenda = dayData.agenda.filter((agendaItem) => {
//            return (agendaItem.id !== id);
//        });
//        
//        this.setState((state, props) => ({
//            storage: storageUpdate
//        }));
        var newAgenda = this.state.currAgenda.slice();

        // Remove agenda item
        newAgenda = newAgenda.filter((agendaItem) => {
            return (agendaItem.id !== id);
        });
        
        // Make updates
        this.setState((state, props) => (
            {currAgenda: newAgenda},
            this.updateStorage
        ));
    }
    
    render() {
        // Create agenda item element list
        const agendaItems = this.state.currAgenda.map((item, index) => {
            return (
                <AgendaItem
                    id={item.id}
                    start={item.start}
                    end={item.end}
                    description={item.description}
                    new={item.new}
                    update={(newStart, newEnd, newDescription) => this.updateAgendaItem(item.id, newStart, newEnd, newDescription)}
                    delete={() => this.deleteAgendaItem(item.id)}
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
                        <div 
                            className="add-agenda-item"
                            onClick={this.createAgendaItem}
                        >
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