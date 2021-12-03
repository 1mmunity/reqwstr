const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv

const colors = require('colors')
const express = require('express')
const fs = require('fs')
const app = express()

const config_file = __dirname + '/../default_port.txt'
const DEFAULT_PORT = Number(fs.readFileSync(config_file, {
  encoding: 'utf-8',
  flag: 'r'
}).trim())

const INFO = `${colors.cyan.bold('info')} -`
const WARN = `${colors.yellow.bold('warn')} -`
const CONF = `${colors.blue.bold('conf')} -`
const ERR = `${colors.red.bold('err')}  -`
const OK = `${colors.green.bold('ok')}   -`
const ARROW = '   -->'

if (args.conf || args.config || args.c) {
  console.log(`${CONF} configuration mode ${colors.gray('(-c, -conf, -config)')}`)
  if (!args.port) {
    console.log(`${ERR} port not specified`)
    console.log(`${ARROW} add ${colors.gray('--port=<port>')} to set default port while on configuration mode`)
    return
  }

  if (!isNaN(args.port) && args.port > 9999) {
    console.log(`${ERR} port character length should be in range of ${colors.gray('1-9999')}`)
    console.log(`${ARROW} received ${args.port}`)
    return
  }

  let temp
  if (args.port == 'default' || args.port == 'def' || args.port == 'd')
  temp = '3002'; else temp = args.port.toString()

  fs.writeFileSync(config_file, temp, {
    encoding: 'utf-8'
  })

  console.log(`${OK} successfully set default port from ${colors.green(DEFAULT_PORT)} to ${colors.green(temp)}`)
  return
}

function init(port) {
  console.log(`${INFO} starting reqwst server...`)
  if (!port) {
    console.log(`${WARN} port not set, defaulted to ${colors.green(DEFAULT_PORT)}`)
    console.log(`${ARROW} use ${colors.gray('--port=<port>')} to set port for this session`)
    console.log(`${ARROW} use ${colors.gray('-c --port=<port>')} to set default port`)
    port = DEFAULT_PORT
  }

  app.use(express.static(__dirname + '/../public'))

  app.get('/', (_, res) => {
    res.sendFile(__dirname + '/index.html')
  })
  
  app.listen(port, () => {
    console.log(`${OK} server started at ${colors.magenta(`http://localhost:${port}`)}`)
  })
}

init(args.port)