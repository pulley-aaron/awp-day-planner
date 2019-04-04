import moment from 'moment';

class Model {
    constructor(storageName) {
        this.storageName = storageName;
        /* Day data follows format:
         * {
         *      date: (string "YYYY-MM-DD"),
         *      agenda: [(agenda items)]
         * }
         *
         * Agenda items follow format:
         * {
         *      id: (string),  // This is for use as key
         *      start: (string moment.format()),
         *      end: (string moment.format()),
         *      description: (string),
         *      new: (bool)
         * }
         */
        this.storage = [  // Default for demo
            {
                date: moment().hour(0).minute(0).second(0).format("YYYY-MM-DD"), // Demo always today
                agenda: [
                    {
                        id: "demo0",
                        start: moment().hour(8).minute(30).format(),
                        end: moment().hour(9).minute(0).format(),
                        description: "Breakfast with Leroy.",
                        new: 0
                    },
                    {
                        id: "demo1",
                        start: moment().hour(13).minute(30).format(),
                        end: moment().hour(14).minute(0).format(),
                        description: "Lunch.",
                        new: 0
                    },
                    {
                        id: "demo2",
                        start: moment().hour(15).minute(30).format(),
                        end: moment().hour(17).minute(0).format(),
                        description: "Paint the turtle's tank. And also the turtle's log. And also the turtle.",
                        new: 0
                    },
                    {
                        id: "demo3",
                        start: moment().hour(18).minute(0).format(),
                        end: moment().hour(19).minute(0).format(),
                        description: "Dinner alone, again.",
                        new: 0
                    },
                    {
                        id: "demo4",
                        start: moment().hour(20).minute(30).format(),
                        end: moment().hour(22).minute(0).format(),
                        description: "Buy another cat.",
                        new: 0
                    }
                ]
            }
        ]
        
        // Load real storage instead of demo if exists
        var local = localStorage.getItem(storageName);
        if(local !== null) {
            this.storage = JSON.parse(local);
        }
    }
    
    getDataForDay(date) {
        // Find day
        const dayToFind = date.format("YYYY-MM-DD");
        const dayData = this.storage.find((i) => {
            return i.date === dayToFind;
        });
        
        return dayData;
    }
    
    getAgendaForDay(date) {
        // Find day
        const dayData = this.getDataForDay(date);
        
        // If no date exists, return empty stub. We'll save it if it's later filled and submitted. 
        if(dayData) {
            return dayData.agenda;
        } else {
            return [];
        }
    }
    
    setAgendaForDay(date, newAgenda) {
        // Find day
        let dayData = this.getDataForDay(date);
        
        // If there is no day, create one
        if(!dayData) { 
            dayData = {
                date: date.hour(0).minute(0).second(0).format("YYYY-MM-DD"),
                agenda: []
            };
            
            // Add to storage
            this.storage.push(dayData);
        }
        
        // Set agenda
        dayData.agenda = newAgenda;
        
        // Store
        localStorage.setItem(this.storageName, JSON.stringify(this.storage));
    }
};

export default Model;