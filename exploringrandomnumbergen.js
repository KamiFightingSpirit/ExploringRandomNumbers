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
console.log("******BEGIN TESTING OF RANDU CLASS******")


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
while(i < 10) {
    console.log(randu.nextRandu());
    i++;
}

console.log("******END TESTING OF RANDU CLASS******")
console.log("******BEGIN TESTING OF MINSTD CLASS******")

/*
 * The Lehmer random number generator is a type of LCG that operates in multiplicative group of integers modulo n.
 * It is also called the Park–Miller random number generator, multiplicative linear congruential generator (MLCG),
 * and multiplicative congruential generator (MCG).
 * 
 * The general formula is:
 * Xk+1 = α * Xk % m
 * Where:
 * 1. The modulus, m, is a prime number or a power of a prime number
 * 2. The multiplier α is an element of high multiplicative order modulo m (e.g., a primitive root modulo n)
 * 3. The seed X0 is coprime to m
 *
 * Source: https://en.wikipedia.org/wiki/Lehmer_random_number_generator
 */

class Minstd {
    //In 1988, Park and Miller suggested a Lehmer RNG with particular parameters m = 2^31 − 1 = 2,147,483,647 (a Mersenne prime M31)
    //A Mersenne prime is a prime that is one less than a power of two : e.g. Mn = 2^n - 1
    //and a = 75 = 16,807 (a primitive root modulo M31). This setup is now known as MINSTD. 
    //Later they suggested the  use of the multiplier a = 48271 in place of 16807.
    //Notes: by default this class will instantiate to the updated MINSTD
    constructor (α, x, m) {
        //is this actually stopping the creation of the class?
        let isPrime = checkPrime(m);
        let isPrimitiveRoot = α === checkPrimitiveRoot(α, m);
        if( !isPrime && () ) {
            throw new Error("Sorry, make sure your parameters are all less than m and greater than 0. Except for α which can equal zero.");
        } else {
            console.log("New Random class created!");
        }
        this.multiplier = α ? α : 48271;
        this.seed = x ? x : 
        this.modulus = m ? m : Math.pow(2, 31) - 1;
    }


    
}
function checkPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false; 
    }
    return num > 1;
}
function checkPrimitiveRoot(primitiveRoot, prime) {
    //If the multiplicative order of a number r modulo n is equal to Euler Totient Function Φ(n) 
    //(Note that Euler Totient Function for a prime n is n-1), then it is a primitive root [Source : Wiki]
    if (isPrime = false) { return -1 }
    //Since prime is a prime number, the Euler Quotient (phi) is prime - 1
    let phi  = prime - 1,
        primeMap = {};
    
    findPrimefactors(primeMap, phi);


}

function findPrimefactors(primeMap, n) {
    while (n % 2 == 0) {
        primeMap.add(2);
        n = n / 2;
     }

    // n must be odd at this point. So we can skip
    // one element (Note i = i +2)
    for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
         // While i divides n, print i and divide n
        while (n % i == 0) {
            primeMap.add(i);
            n = n / i;
        }
    }

    // This condition is to handle the case when
    // n is a prime number greater than 2
    if (n > 2) {
        primeMap.add(n);
    }
}
let test = new Minstd();
