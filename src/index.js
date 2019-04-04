import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import DateHeader from './date-header.js';
import AgendaItem from './agenda-item.js';
import Model from './model.js';

class App extends React.Component {
    constructor (props) {
        super (props);
        
        const tempModel = new Model("awp-planner-app-storage");
        const tempDate = moment().hour(0).minute(0).second(0);
        const tempAgenda = tempModel.getAgendaForDay(tempDate);
        
        this.state = {
            model: tempModel,
            currDate: tempDate,
            currAgenda: tempAgenda
        };
        
        // Bind functions
        this.setDate = this.setDate.bind(this);
        this.createAgendaItem = this.createAgendaItem.bind(this);
        this.updateAgendaItem = this.updateAgendaItem.bind(this);
    }
    
    setDate(dateObj) {
        var newDate = moment(dateObj).hour(0).minute(0).second(0);
        var newAgenda = this.state.model.getAgendaForDay(newDate);
        
        this.setState((state, props) => ({
            currDate: newDate,
            currAgenda: newAgenda
        }));
    }
    
    refreshCurrAgenda() {
        var newAgenda = this.state.model.getAgendaForDay(this.state.currDate);
        
        this.setState((state, props) => ({
            currAgenda: newAgenda
        }));
    }
    
    createAgendaItem() {
        var newAgenda = this.state.model.getAgendaForDay(this.state.currDate).slice();
        
        // Add agenda item
        newAgenda.unshift({
            id: moment().format() + " " + Math.floor(Math.random()*9999),
            start: moment().format(),
            end: moment().add(1, 'hour').format(),
            description: "",
            new: 1
        });
        
        // Update model
        this.state.model.setAgendaForDay(this.state.currDate, newAgenda);
        
        // Update state via refresh from storage
        this.refreshCurrAgenda();
    }
    
    updateAgendaItem(id, start, end, description) {
        var newAgenda = this.state.currAgenda.slice();

        // Get agenda item for id
        var item = newAgenda.find((i) => {
            return i.id === id;
        });
        if(!item) {
            alert("Agenda item does not exist to update.");
            return;
        }
        
        // Edit item entries (not key)
        item.start = start;
        item.end = end;
        item.description = description;
        item.new = 0;
        
        // Sort agenda
        newAgenda.sort((a, b) => {
            if(moment(a.start).isBefore(b.start, 'minute')) {
                console.log(a.start + "<" + b.start + moment(a.start).isBefore(b, 'minute'));
                return -1;
            } else if(moment(a.start).isAfter(b.start, 'minute')) {
                console.log(a.start + ">" + b.start + moment(a.start).isAfter(b, 'minute'));
                return 1;
            } else {
                console.log(a.start + "=" + b.start);
                return 0;
            }
        });
        console.log(newAgenda);
        // Update model
        this.state.model.setAgendaForDay(this.state.currDate, newAgenda);
        
        // Update state via refresh from storage
        this.refreshCurrAgenda();
    }
    
    deleteAgendaItem(id) {
        var newAgenda = this.state.currAgenda.slice();

        // Remove agenda item
        newAgenda = newAgenda.filter((agendaItem) => {
            return (agendaItem.id !== id);
        });
        
        // Update model
        this.state.model.setAgendaForDay(this.state.currDate, newAgenda);
        
        // Update state via refresh from storage
        this.refreshCurrAgenda();
    }
    
    render() {
        // Create agenda item element list
        const agendaItems = this.state.currAgenda.map((item, index) => {
            return (
                <AgendaItem key={item.id}
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
                    <DateHeader
                        currDate={this.state.currDate}
                        onChange={(dateObj) => this.setDate(dateObj)}
                    />
                    <div className="agenda">
                        <div className="add-agenda-item"
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