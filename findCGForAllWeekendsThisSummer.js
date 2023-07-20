const searchForDates = require('./searchForDates');
const notify = require('./notify');
const repeater = require('./repeater');

const weekends = [
    // {rStart: 'Saturday, July 9th', start: '7/9/22', rEnd: 'Sunday, July 10th', end: '7/10/22'},
    // {rStart: 'Friday, July 8th', start: '7/8/22', rEnd: 'Sunday, July 10th', end: '7/10/22'},
    // {rStart: 'Friday, July 15th', start: '7/15/22', rEnd: 'Sunday, July 17th', end: '7/17/22'},
    // {rStart: 'Friday, July 22nd', start: '7/22/22', rEnd: 'Sunday, July 24th', end: '7/24/22'},
    // {rStart: 'Friday, July 29th', start: '7/29/22', rEnd: 'Sunday, July 31st', end: '7/31/22'},
    // {rStart: 'Friday, August 5th', start: '8/5/22', rEnd: 'Sunday, August 7th', end: '8/7/22'},
    // {rStart: 'Friday, August 12th', start: '8/12/22', rEnd: 'Sunday, August 14th', end: '8/14/22'},
    // {rStart: 'Friday, August 19th', start: '8/19/22', rEnd: 'Sunday, August 21st', end: '8/21/22'},
    // {rStart: 'Friday, August 26th', start: '8/26/22', rEnd: 'Sunday, August 28th', end: '8/28/22'},
    // {rStart: 'Friday, September 2nd', start: '9/2/22', rEnd: 'Sunday, September 4th', end: '9/4/22'},
    // {rStart: 'Friday, September 9th', start: '9/9/22', rEnd: 'Sunday, September 11th', end: '9/11/22'},
    {rStart: 'Thursday, September 15th', start: '9/15/22', rEnd: 'Saturday, September 17th', end: '9/17/22'},
    // {rStart: 'Friday, September 16th', start: '9/16/22', rEnd: 'Sunday, September 18th', end: '9/18/22'},
    // {rStart: 'Friday, September 23rd', start: '9/23/22', rEnd: 'Sunday, September 25th', end: '9/25/22'},
    // {rStart: 'Friday, September 30th', start: '9/30/22', rEnd: 'Sunday, October 2nd', end: '10/2/22'},
    // {rStart: 'Friday, October 7th', start: '10/7/22', rEnd: 'Sunday, October 9th', end: '10/9/22'},
    // {rStart: 'Friday, October 14th', start: '10/14/22', rEnd: 'Sunday, October 16th', end: '10/16/22'}
];

const nationalParks = [
    {
        name: 'Mount Ranier National Park',
        id: 2835
    },
    {
        name: 'Olympic National Park',
        id: 2881
    },
    {
        name: 'North cascades',
        id: 2845
    },
    // {
    //     name: 'Mt. Baker-Snoqualmie National Forest',
    //     id: 1118
    // },
    // {
    //     name: 'Okanogan-Wenatchee National Forest',
    //     id: 16822
    // },
    // {
    //     name: 'Olympic National Forest',
    //     id: 1120
    // }
];

function action() {
    const promises = [];
    nationalParks.forEach(park => {
        weekends.forEach(weekend => {
            let promise = searchForDates(park.id, weekend.start, weekend.end);
            promises.push(promise);
            promise.then(availableSites => {
                if (availableSites.length) {
                    availableSites.map(c => {
                        console.log('Availability in ', park.name, ' - ', c.name, 'from', weekend.rStart, 'to', weekend.rEnd);
                        notify('mixkit-sci-fi-confirmation-914.wav');
                    })
                }
            })
        })
    })
    return Promise.all(promises);
}

// action();

repeater(action);












