let tryCount = 0;
const SECOND = 1000;
const waitTime = 60 * SECOND;

function repeater(action) {
    tryCount++;
    console.log('Attempt ', tryCount);

    action().then(() => {
        setTimeout(() => repeater(action), waitTime);
        console.log('Waiting now for', waitTime/1000, 'secs');
        console.log();
    })
}

module.exports = repeater;