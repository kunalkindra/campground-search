const qs = require('qs');

const fetch = require('./fetch');
const notify = require('./notify');

const params = (nationalParkId, startDate, endDate) => {
    return qs.stringify({
        fq: ['parent_asset_id:' + nationalParkId, 'entity_type:campground', 'campsite_type_of_use:Overnight', 'campsite_type_of_use:Day', 'campsite_type_of_use:na'],
        start_date: startDate,
        end_date: endDate,
        size: '1000',
        sort: 'score',
    }, { indices: false });
};

function formatDate(date) {
    return new Date(date).toISOString().split('T')[0] + 'T00:00:00Z';
    // const [month, day, year] = date.split('/');
    // return `20${year}-${month}-${day}T00:00:00Z`;
}

function searchForDates(nationalParkId, startDate, endDate) {
    let searchParams = params(nationalParkId, formatDate(startDate), formatDate(endDate));
    return fetch(`https://www.recreation.gov/api/search?${searchParams}`)
        .then(data => data.results.filter(result => result.availability === 'available'))
        .catch();
}

module.exports = searchForDates;