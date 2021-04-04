/*
 *
 * Came across the following link while looking at the Random class in Java:
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 * I've always been curious about how random number generation worked so this file is dedicated to that investigation.
 * 
 * ------------------------------------------------------------------------------------------------------------------------------
 * 
 * general form of a linear congruential generator (LCG):
 * Xn+1 = (αXn + c) % m
 * Where:
 * m (modulus), 0 < m, (modulus is a positive number)
 * α (the multiplier), 0 < α < m, (a positive number less than the modulus)
 * c (the increment), 0 < c < m, (a positive number less than the modulus) 
 * X0 (the seed/start value), 0 <= X0 < m, (a positive number, inclusive of zero, that is less than the modulus)
 * 
 */


class Random {
    constructor(α, x, c, m) {   
        if( (α > m || α <= 0) || (x > m || x < 0) || (c > m || c < 0) ) {
            throw new Error("Sorry, make sure your parameters are all less than m and greater than 0. Except for α which can equal zero.");
        } else {
            console.log("New Random class created!");
        }
        this.multiplier = α;
        this.seed = x;
        this.increment = c;
        this.modulus = m;
    }

    nextInt() {
        this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
        // this.seed = nextInt;
        return this.seed; //if I return this seed, am I changing the future ones?   
    }

    printSeed() {
        console.log(this.seed); 
        return;
    }
}

//Testing out my class:
let random = new Random(5, 0, 2, 25);
console.log("hello");
console.log(random.seed, random.increment, random.modulus);
console.log(random.nextInt());
console.log(random.nextInt());