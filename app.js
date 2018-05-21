const Nightmare = require('nightmare')
const cheerio = require('cheerio')
const moment = require('moment')
const nightmare = Nightmare({ show: true })
const region = ''
const city = ''
const gasType = '3'

nightmare
  .goto('http://www.bencinaenlinea.cl/web2/buscador.php?region=6')
  .select('#reporte_combustible', gasType)
  .click('input[type=button]')
  .wait(1000)
  .evaluate(() => document.querySelector('#tabla').innerHTML)
  .end()
  .then((result) => {
    const prices = parseResults(result)
    console.log(prices[0])
  })
  .catch(error => {
    console.error('Search failed:', error)
  })

function parseResults(data) {
  const $ = cheerio.load(data)
  return $('table').find('tr').slice(1)
    .map((i, element) => {
      const readGasStation = $(element).find('td:nth-child(1) strong').text().trim()
      const readGasStationAddress = $(element).find('td:nth-child(1)').text().trim().replace(new RegExp(readGasStation, 'g'), '')
      const readPrice = Number($(element).find('td:nth-child(3)').text().trim().replace(/(\,)/g, '.'))
      const readLastUpdate = $(element).find('td:nth-child(4)').text().trim()

      return {
        gasStation: {
          name: readGasStation,
          address: readGasStationAddress
        },
        price: readPrice,
        lastUpdate: moment(readLastUpdate)
      }
    }).get()
}