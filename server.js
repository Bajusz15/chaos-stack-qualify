const axios = require('axios');
const keys = require("./keys");
const mapping = require('./mapping.json')



axios({
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: { Authorization: keys.apiToken }
}).then(function (response) {
    console.log(response.data)
    response.data.userCommands.map(command => {
        mapping.map(person => {
            if (command.user === person.user) {
                // console.log(`lights => ${[person.rooms[command.targetRoom]]} command => ${command.action}`)
                axios({
                    method: 'POST',
                    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
                    headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
                    json: {
                        "desiredState": `${command.action}
                        `,
                        "lights": [person.rooms[command.targetRoom]]
                    }
                }).catch(err => console.log(err))
            }
        })
    })
})