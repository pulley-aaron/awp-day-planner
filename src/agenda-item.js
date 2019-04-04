import React from 'react';
import moment from 'moment';

class AgendaItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: (this.props.new === 1) ? 1 : 0
        };
        
        this.commitChanges = this.commitChanges.bind(this);
        this.beginEditing = this.beginEditing.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
        
        this.startRef = React.createRef();
        this.endRef = React.createRef();
        this.descriptionRef = React.createRef();
    }
    
    beginEditing(e) {
        e.preventDefault();
        this.setState((state, props) => ({editing: 1}));
    }
    
    commitChanges(e) {
        e.preventDefault();
        
        // Update main data storage
        var yearStr = moment(this.props.start).format("YYYY-MM-DD");
        
        var newStartStr = this.startRef.current.value;
        var newStart = moment(yearStr + " " + newStartStr, "YYYY-MM-DD h:mm a").format();
        var newEndStr = this.endRef.current.value;
        var newEnd = moment(yearStr + " " + newEndStr, "YYYY-MM-DD h:mm a").format();
        
        var newDesc = this.descriptionRef.current.value;
        
        this.props.update(newStart, newEnd, newDesc);
        
        // Stop editing
        this.setState((state, props) => ({editing: 0}));
    }
    
    deleteSelf() {
        this.props.delete();
    }

    render() {
        if(this.state.editing) {
            var startTime = (this.props.start && !(moment(this.props.start).format('h:mm a') === "Invalid date")) ? moment(this.props.start).format('h:mm a') : "";
            var endTime = (this.props.end && !(moment(this.props.end).format('h:mm a') === "Invalid date")) ? moment(this.props.end).format('h:mm a') : "";
            var desc = (this.props.description) ? this.props.description : "";
            
            return (  // Edit form
                <form className="agenda-item editing">
                    <div className="start-time">
                        <p className="input-label">Start Time</p>
                        <input 
                            className="time-input" 
                            defaultValue={startTime} 
                            type="text"
                            ref={this.startRef}
                        ></input>
                    </div>
                    <div className="end-time">
                        <p className="input-label">End Time</p>
                        <input 
                            className="time-input" 
                            defaultValue={endTime} 
                            type="text"
                            ref={this.endRef}
                        ></input>
                    </div>
                    <div className="description">
                        <p className="input-label">Item Description</p>
                        <textarea 
                            rows="3" 
                            className="description-input" 
                            defaultValue={desc} 
                            type="text"
                            ref={this.descriptionRef}
                        ></textarea>
                    </div>
                    <button 
                        className="delete-button"
                        onClick={this.deleteSelf}
                    >Delete</button>
                    <input
                        type="submit"
                        value={"Done"}
                        className="done-button"
                        onClick={this.commitChanges}
                    ></input>
                </form>
            );
        } else {
            return (  // Item display
                <div className="agenda-item">
                    <div className="time-slot">{moment(this.props.start).format('h:mm a')} - {moment(this.props.end).format('h:mm a')}</div>
                    <button 
                        className="edit-button"
                        onClick={this.beginEditing}
                    >Edit</button>
                    <div className="description">{this.props.description}</div>
                </div>
            );
        }
    }
};

export default AgendaItem;