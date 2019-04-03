import moment from 'moment';

class Model {
    Model(storageName) {
        this.storageName = storageName;
        this.storage = [];
        
        // Load storage exists, else initialize
        var local = localStorage.getItem(storageName);
        if(local !== null) {
            this.storage = JSON.parse(local);
        } else {
            localStorage.setItem(this.storageName, JSON.stringify(this.storage));
        }
    }
    
    /* Day data follows format:
     * {
     *      date: [moment].hour(0).minute(0).second(0),
     *      agenda: [agenda items]
     * }
     *
     * Agenda items follow format:
     * {
     *      id: [string],
     *      start: [moment],
     *      end: [moment],
     *      description: [string],
     *      new: [bool]
     * }
     */
    
    getAgendaForDay(date) {
        this.storage = JSON.parse(localStorage.getItem(this.storageName));
            alert(JSON.stringify(this.storage) + " storage");
        
        // Find day
        var dayData = this.storage.find((i) => {
            return i.date.format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
        });
        
        // If no date exists, return empty stub. We'll save it if later filled and submitted. 
        if(dayData === null) {
            return [];
        } else {
            return dayData.agenda;
        }
    }
    
    setAgendaForDay(date, newAgenda) {
        this.storage = JSON.parse(localStorage.getItem(this.storageName));
        var storageUpdate = this.storage.slice();
        
        // Find day to edit
        var dayData = storageUpdate.find((i) => {
            return i.date.format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
        });
        if(!dayData) {  // If there is no day, create one
            dayData = {
                date: date.hour(0).minute(0).second(0),
                agenda: []
            };
            storageUpdate.push(dayData);
        }
        
        // Set agenda
        dayData.aganda = newAgenda;
        
        // Store
        localStorage.setItem(this.storageName, JSON.stringify(storageUpdate));
    }
};

export default Model;