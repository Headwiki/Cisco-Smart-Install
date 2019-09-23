const Telnet = require('telnet-client')

module.exports = {
    checkStatus: (req, res, next) => {
        let conn = new Telnet();

        conn.on('connect', function () {
          console.log('Client :: connected');
          res.send("Online")
          conn.end()
        }).on('data', () => {
          console.log(data)
        }).on('timeout', () => {
          console.log('Client :: Timeout');
          res.send("Offline")
          conn.end();
        }).on('error', (err) => {
          console.log('Client :: Error' + err);
          res.send("Offline")
          conn.end();
        }).on('failedLogin', (msg) => {
          console.log('Client :: failedLogin' + msg);
          res.send("Offline")
          conn.end();
        }).connect({
          host: req.params.ip,
          port: 23,
          timeout: 5000
        }).catch(error => {
          console.error("Failed to connect to: " + req.params.ip + ", " + error)
        })
    },
    executeCommands: (req, res, next) => {
        let conn = new Telnet();

        conn.on('ready', (prompt) => {
          console.log('ready')
          conn.exec('show clock', (err, resp) => {
              console.log(resp)
          })
          res.send("Exec")
          conn.end()
        }).on('data', () => {
          console.log(data)
        }).on('error', (err) => {
          console.log('Client :: Error' + err);
          res.send("Offline")
          conn.end();
        }).on('failedLogin', (msg) => {
          console.log('Client :: failedLogin' + msg);
          res.send("Offline")
          conn.end();
        }).connect({
          host: req.params.ip,
          shellPrompt: /(SWI-ROGUE+(#|>))/,
          loginPrompt: 'Username: ',
          passwordPrompt: 'Password: ',
          username: 'cisco',
          password: 'cisco',
          port: 23,
          timeout: 5000
        }).catch(error => {
          console.error("Failed to connect to: " + req.params.ip + ", " + error)
        })
    },
    getInfo: (req, res, next) => {
        let conn = new Telnet();

        conn.on('ready', (prompt) => {
          console.log('ready')
          conn.exec('show version | i System image file is', (err, resp) => {
              let responeData = {}
              responeData['image'] = resp
              conn.exec('show version | i cisco WS', (err, resp) => {
                responeData['model'] = resp
                conn.exec('show version | i System serial number', (err, resp) => {
                    responeData['serial'] = resp
                    conn.exec('show cdp nei det', (err, resp) => {
                        responeData['cdp'] = resp
                        conn.end()
                        res.send(responeData)
                      })
                  })
              })
          })
        }).on('data', () => {
          console.log(data)
        }).on('error', (err) => {
          console.log('Client :: Error' + err);
          res.send("Offline")
          conn.end();
        }).on('failedLogin', (msg) => {
          console.log('Client :: failedLogin' + msg);
          res.send("Offline")
          conn.end();
        }).connect({
          host: req.params.ip,
          shellPrompt: /(SWI-ROGUE+(#|>))/,
          loginPrompt: 'Username: ',
          passwordPrompt: 'Password: ',
          username: 'cisco',
          password: 'cisco',
          port: 23,
          timeout: 5000
        }).catch(error => {
          console.error("Failed to connect to: " + req.params.ip + ", " + error)
        })
    }
}