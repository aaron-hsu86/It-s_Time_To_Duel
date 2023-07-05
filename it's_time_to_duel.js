class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, resilience){
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    }
    attack(target){
        // reduce target res by power
        target.resilience -= this.power;
    }
    showStats () {
        console.log(`Name: ${this.name}\nCost: ${this.cost}\nPower: ${this.power}\nResilience: ${this.resilience}`)
    }
}

class Effect extends Card {
    constructor(name, cost, text, stat, magnitude){
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }
    play (target) {
        if (target instanceof Unit){
            target[this.stat] += this.magnitude;
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
}

const unit1 = new Unit('Red Belt Ninja', 3, 3, 4);
const effect1 = new Effect('Hard Algorithm', 2, "increase target's resilience by 3", 'resilience', 3);
effect1.play(unit1); // Hard Algorith played on Red Belt Ninja -> resilience increase from 4 to 7
const unit2 = new Unit('Black Belt Ninja', 4, 5, 4);
const effect2 = new Effect('Unhandled Promise Rejection', 1, "reduce target's resilience by 2", 'resilience', -2);
effect2.play(unit1); // Unhandled Promise Rejection played on Red Belt Ninja -> resiliance decreased from 7 to 5
const effect3 = new Effect('Pair Programming', 3, "increase target's power by 2", 'power', 2);
effect3.play(unit1); // Pair Programming played on Red Belt Ninja -> power increased from 3 to 5
unit1.attack(unit2); // Red Blet Ninja attacks Black Belt Ninja -> BBN resiliance of 4 - RBN power of 5 => BBN resilience: -1

unit1.showStats(); // should show altered stats -> Resilience: 5, Power: 5
unit2.showStats(); // should show resilience as -1