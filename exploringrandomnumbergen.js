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
        this.currentRandomValue = 0;
        this.Randu = -1;
    }

    nextInt() {
        //This is to demonstrate that simply plugging in your own variables quickly falls apart
        this.currentRandomValue = (this.multiplier * this.seed + this.increment) % this.modulus;
        return this.seed; //if I return this seed, am I changing the future ones?   
    }

    printSeed() {
        console.log(this.seed); 
        return;
    }
}

//Testing out my class:
let random = new Random(5, 0, 2, 25);
console.log(random.seed, random.increment, random.modulus);
console.log(random.nextInt());
console.log(random.nextInt());
console.log("******END TESTING OF MY RANDOM CLASS******")


 /*
  * Implementing Randu, a special case of random algorithm that was widely used from the 1960s to the early 1970s, generated
  * questionable results due to using 2^31 as the modulus, when this LCG produces points (xk, xk+1, xk+2) in 3-dimensional space, 
  * the points fall into no more than 2,344 parallel planes, a result which indicates an LCG is unsuitable for Monte Carlo simulation
  * This misbehavior was already detected in 1963, it was believed to have been widely purged by the early 1990s but there were 
  * still FORTRAN compilers using it as late as 1999.
  * Source: https://en.wikipedia.org/wiki/RANDU
  */

class Randu {
    constructor(x) {
        this.seed = x;
        this.multiplier = 65539;        
        this.modulus = Math.pow(2, 31);
        this.rational = 0;
    }
    nextRandu() {
        this.seed = (this.multiplier * this.seed) % this.modulus;
        // return this.seed;
        this.rational = this.seed / Math.pow(2, 31);
        return this.rational;
    }
}
//Testing out the Randu Class:
//I expect better results from a human's point of view:
let randu = new Randu(1);
let i = 0;
while(i < 20) {
    console.log(randu.nextRandu());
    i++;
}


