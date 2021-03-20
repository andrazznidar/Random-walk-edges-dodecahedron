// Run the function 10 times and print their averages.
for(let i = 0; i < 16; i++) {
    let w = new Worker("Multithread_Random-walk-edges-dodecahedron_worker.js");

    w.onmessage = function(event) {
        console.log(event.data);
    };
}