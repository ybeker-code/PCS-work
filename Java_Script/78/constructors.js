'use strict';
// Vehicle factory and funcs
function Vehicle(color) {
    this.color = color;
    this.speed = 0;
}
const vehicleFuncs = {
    go(speed) {
        this.speed = speed;
        console.log(`This vehicle is now going ${this.speed}.`);
    },
    print() {
        console.log(`This vehicle is ${this.color}, 
        and is now going ${this.speed}.`);
    }
};
Vehicle.prototype = vehicleFuncs;
// Vehicle.prototype.go = speed => {
//     this.speed = speed;
//     console.log(`This vehicle is now going ${this.speed}.`);
// };

///////////////////////////////////////////////////////////////////////

// airport
function Plane(color) {
    Vehicle.call(this, color);
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`This plane is now flying at ${this.speed}.`);
};

// Use our constructors
const truck = new Vehicle('red');
truck.go('100 mph');
truck.print();

const jet = new Plane('blue');
jet.go('250 knots');
jet.print();
