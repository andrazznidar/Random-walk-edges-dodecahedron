legalMoves = [[1, 2, 3], [0, 4, 6], [0, 5, 7], [0, 8, 9], [1, 5, 10], [2, 4, 11], [1, 8, 12], [2, 9, 13], [3, 6, 14], [3, 7, 15], [
    4, 12, 16], [5, 13, 16], [6, 10, 17], [7, 11, 18], [8, 15, 17], [9, 14, 18], [10, 11, 19], [12, 14, 19], [13, 15, 19], [16, 17, 18]];
// Each line of this matrix legalMoves represents a vertex and specifies three neighboring vertices.

/* Function move expects one number as a current vertex and a matrix of legal moves.
It returns one number as a new, randomly chosen, legal, current vertex. */
function move(n, A) {
    return A[n][Math.floor(Math.random()*3)]
}

/* Function simulate expects one number as the number of simulations and a matrix of legal moves.
It returns the average number of moves the spider needed in to get to an ant. */
function simulate(noSimulations, B) {
    let sum = 0;
    let ant, spider, noMoves;
    for (let i = 0; i < noSimulations; i++) {
        /* The state of the simulation is reset.
            Ant is positioned in a vertex numbered 0.
            Spider is positioned in a vertex numbered 19.
            Number of moves is reset to 0. */
        ant = 0;
        spider = 19;
        noMoves = 0;

        // Until the spider moves to the desired position it moves in random, legal moves that are counted.
        while (ant != spider) {
            spider = move(spider, B);
            noMoves++;
        }

        // The number of moves needed in this simulation is added to the sum of all moves needed in previous simulations.
        sum += noMoves;
    }

    // The average number of moves is calculated by dividing the sum of all moves needed in all simulations by the number of sumulations.
    return(sum / noSimulations);    
}

// Specify the number of simulations for every function simulate call.
noSimulations = 50_000_000;

// We run a worker multiple times in the parent js file to allow multithreading.
postMessage(simulate(noSimulations, legalMoves));