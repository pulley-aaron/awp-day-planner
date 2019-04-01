import React from 'react';
import moment from 'moment';

class AgendaItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: 1
        };
        
        this.commitChanges = this.commitChanges.bind(this);
        this.beginEditing = this.beginEditing.bind(this);
    }
    
    beginEditing(e) {
        e.preventDefault();
        this.setState((state, props) => ({editing: 1}));
    }
    
    commitChanges(e) {
        e.preventDefault();
        this.setState((state, props) => ({editing: 0}));
    }

    render() {
        if(this.state.editing) {
            var startTime = (this.props.start && !(this.props.start.format('h:mm a') === "Invalid date")) ? this.props.start.format('h:mm a') : "";
            var endTime = (this.props.end && !(this.props.end.format('h:mm a') === "Invalid date")) ? this.props.end.format('h:mm a') : "";
            var desc = (this.props.description) ? this.props.description : "";
            
            return (  // Edit form
                <form key={this.props.id} className="agenda-item editing">
                    <div className="start-time">
                        <p className="input-label">Start Time</p>
                        <input 
                            className="time-input" 
                            defaultValue={startTime} 
                            type="text"
                        ></input>
                    </div>
                    <div className="end-time">
                        <p className="input-label">End Time</p>
                        <input 
                            className="time-input" 
                            defaultValue={endTime} 
                            type="text"
                        ></input>
                    </div>
                    <div className="description">
                        <p className="input-label">Item Description</p>
                        <textarea 
                            rows="3" 
                            className="description-input" 
                            defaultValue={desc} 
                            type="text"
                        ></textarea>
                    </div>
                    <button 
                        className="delete-button" 
                    >Delete</button>
                    <button 
                        className="done-button"
                        onClick={this.commitChanges}
                    >Done {this.state.editing}</button>
                </form>
            );
        } else {
            return (  // Item display
                <div key={this.props.id} className="agenda-item">
                    <div className="time-slot">{this.props.start.format('h:mm a')} - {this.props.end.format('h:mm a')}</div>
                    <button 
                        className="edit-button"
                        onClick={this.beginEditing}
                    >Edit {this.state.editing}</button>
                    <div className="description">{this.props.description}</div>
                </div>
            );
        }
    }
};

export default AgendaItem;