class Room {
    #isBooked = false;
    constructor(floorNum, roomNum, price){
        if (this.constructor === Room) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.floorNum = floorNum ;
        this.roomNum = roomNum;
        this.price = price;
    }

    printRoom(){
        console.log(`Room #${this.roomNum} in floor #${this.floorNum}.\n The cost for a night: ${this.cost}.\n Available: ${this.#isBooked}`);
    }

    isBooked(){
        return this.#isBooked;
    }

    Book(){
        if(!this.#isBooked)
            this.#isBooked = true;
    }
}

class RoomWithView extends Room{

    #views = ["Sea Side", "Garden", "City", "No View"];
    #view;
    constructor(floorNum, roomNum, price, numOfBeds, view){
        super(floorNum, roomNum, price)
        this.numOfBeds = numOfBeds;
        let index;
        this.view = (index  = this.#views.indexOf(view) !== -1) ? view : "No View";
        switch (index) {
            case 0:
                super.price(Math.floor(super.price * 1.4));
                break;
            case 1:
                super.price(Math.floor(super.price * 1.1));
                break;
            case 2:
                super.price(Math.floor(super.price * 1.3));
                break;
        }

    }

    printRoom(){
        super.printRoom();
        console.log(`Number Of Beds: ${this.numOfBeds}\n View: ${this.view}\n`);
    }

}

class SleepingRoom extends Room{
    constructor(floorNum, roomNum, price, personCapacity){
        super(floorNum, roomNum, price)
        this.personCapacity = personCapacity;
    }


    printRoom(){
        super.printRoom();
        console.log(`Person Capacity: ${this.personCapacity}\n`);
    }
}

class Hotel{
    #minfloor = 1;
    #maxfloor = 10;
    #rooms;
    #available = 0;
    #numberOfRooms;
    constructor(address,rooms){
        this.address = address;
        this.#rooms = rooms;
        this.#numberOfRooms = rooms.length;
        this.#countAvailable();
    }

    #countAvailable(){
        this.#rooms.forEach((item) =>{
            if(!item.isBooked()){
                this.#available++;
            }
        })
    }

    setMinMax(min,max){
        this.#minfloor = min;
        this.#maxfloor = (max > min) ? max : min;
    }

    printAdvertisment(){
        console.log("Welcome to Our Hotel!!\n We are located in " + this.address + "\n"
        + "We have " +  this.#available +  " available Rooms\n Book one Now!!");
    }

    listBookedRooms(){
        this.#rooms.forEach((item) => {
            if(!item.isBooked())
                item.printRoom();
        });
        if(!(this.#rooms.some((item) => {item.isBooked() === true}))){
            console.log("No rooms Booked yet");
        }
        
    }

    bookARoom(){
        for(let i = 0; i <this.#rooms; i++){
            if(!this.#rooms[i].isBooked()){
                this.#rooms[i].Book();
                console.log(this.#rooms[i].printRoom());
            }
        }
    }

    bookARoom(floor,roomNum){
        for(let i = 0; i <this.#rooms; i++){
            if(!this.#rooms[i].isBooked() && this.#rooms[i].floorNum === floor && this.#rooms[i].roomNum === roomNum){
                this.#rooms[i].Book();
                console.log(this.#rooms[i].printRoom());
            }else{
                console.log("Room Unavailable");
            }
        }
    }
    
}

//const r1 = new Room(1,1,100);
const r2 = new RoomWithView(1,1,100,4,"Garden");
const r3 = new RoomWithView(1,2,100,2,"Sea Side");
const r4 = new RoomWithView(1,3,100,3,"None");
const r5 = new RoomWithView(2,1,100,4,"Sea Side");
const r6 = new SleepingRoom(2,2,100,4);
const r7 = new SleepingRoom(2,2,100,2);
const r8 = new SleepingRoom(3,1,100,3);
const r9 = new SleepingRoom(3,2,100,4);

const hotel = new Hotel("Ramallha City - Manara Street",[r2,r3,r4,r5,r6,r7,r8,r9]);

hotel.printAdvertisment();