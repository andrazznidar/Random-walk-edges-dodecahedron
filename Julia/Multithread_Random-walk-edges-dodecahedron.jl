import Base.Threads.@spawn
# Make sure to run Julia with --threads NoOfThreads to enable multi-threading!

using Random
# Increase speed of random as per https://bkamins.github.io/julialang/2020/11/20/rand.html

legalMoves = [2 3 4
    1 5 7
    1 6 8
    1 9 10
    2 6 11
    3 5 12
    2 9 13
    3 10 14
    4 7 15
    4 8 16
    5 13 17
    6 14 17
    7 11 18
    8 12 19
    9 16 18
    10 15 19
    11 12 20
    13 15 20
    14 16 20
    17 18 19]
# Each line of this matrix legalMoves represents a vertex and specifies three neighboring vertices.

#= Function move expects one number as a current vertex and a matrix of legal moves.
It returns one number as a new, randomly chosen, legal, current vertex. =#
function move(n, A, rng::MersenneTwister)
    return A[n, rand(rng, 1:3)]
end

#= Function simulate expects one number as the number of simulations and a matrix of legal moves.
It returns the average number of moves the spider needed in to get to an ant. =#
function simulate(noSimulations, B, rng::MersenneTwister)
    sum = 0
    for i in 1:noSimulations
        #= The state of the simulation is reset.
        Ant is positioned in a vertex numbered 1.
        Spider is positioned in a vertex numbered 20.
        Number of moves is reset to 0. =#
        ant = 1
        spider = 20
        noMoves = 0
        
        # Until the spider moves to the desired position it moves in random, legal moves that are counted.
        while (ant != spider)
            spider = move(spider, B, rng)
            noMoves += 1
        end

        # The number of moves needed in this simulation is added to the sum of all moves needed in previous simulations.
        sum += noMoves
    end

    # The average number of moves is calculated by dividing the sum of all moves needed in all simulations by the number of sumulations.
    return(sum / noSimulations)
end


# Specify the number of simulations for every function simulate call.
noSimulations = 50_000_000

# Run the function 10 times and print their averages.
tasks = Task[]
@time begin
    for j in 1:16
        push!(tasks, @spawn simulate(noSimulations, legalMoves, MersenneTwister())) # Run each simulation in a separate thread
    end

    # Print the result of each thread once it finishes running the simulation
    for t in tasks
        println(fetch(t))
    end
end
