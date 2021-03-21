// Ported from Julia version https://github.com/andrazznidar/Random-walk-edges-dodecahedron/

// We put the simulations into WebWorkers. This prevents the browser from hanging (not responding) as they are run in separate/background/not-main threads.
// WebWorkers cannot be run over file:// protocol.

// Run the function 10 times and print their averages.
timesToRun = 16;
console.time("Simulations"); // Timing to compare performance
for (let i = 0; i < timesToRun; i++) {
  let w = new Worker("Multithread_Random-walk-edges-dodecahedron_worker.js"); // Create a new WebWorker for each simulation

  w.onmessage = function (event) {
    console.log(event.data);
    w.terminate(); // Terminate the worker to free up resources
    if (--timesToRun == 0) {
      console.timeEnd("Simulations"); // All simulations finished, stop the timer
    }
  };
}
