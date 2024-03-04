const { parse } = require('csv-parse');
const fs = require('fs')

const results = []

function isHubitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (data && isHubitable(data)) {
            results.push(data);
        }
    })
    .on('error', (error) => {
        console.log('---ERROR---', error)
    })
    .on('end', () => {
        console.log(results.map((p) => p.kepler_name));
        console.log('Num:', results?.length || 0);
        console.log('---DONE---')
    });



