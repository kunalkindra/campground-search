const fetch = require('./fetch');
const repeater = require('./repeater');
const notify = require('./notify');

const dates = ['2022-06-25T00:00:00Z', '2022-06-26T00:00:00Z']

const campgrounds = [{
    name: 'Timber Creek',
    id: 260552
}, {
    name: 'Aspenglen',
    id: 233187
}, {
    name: 'Glacier Basin',
    id: 232462
}, {
    name: 'Moraine Park',
    id: 232463
}]

function getCGInfo(campgrounds, dates) {
    console.log('Checking for', dates.map(date => new Date(date).getDate() + 1 + 'th').join(' and '));
    return Promise.all(campgrounds.map(campground => {
        return fetch(`https://www.recreation.gov/api/camps/availability/campground/${campground.id}/month?start_date=2022-06-01T00%3A00%3A00.000Z`)
            .then(data => {
                try {
                    let availableSites = Object.values(data.campsites).filter(site => dates.every(date => site.availabilities[date] === "Available"));
                    console.log(campground.name, availableSites.length)
                    if(availableSites.length) {
                        notify();
                    }
                } catch (e) {console.log('Error fetching', campground.name)}
            });
    }));
}

repeater(() => getCGInfo(campgrounds, dates));