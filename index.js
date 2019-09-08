const request = require("request");
const axios = require('axios')
const mapping = require('./mapping.json')
const keys = require("./keys");

axios({
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: { Authorization: keys.apiToken }
}).then(function (response) {
    response.data.userCommands.map(command => {

        mapping.map(person => {
            if (command.user === person.user) {
                //console.log(person.rooms[command.targetRoom]);
                // console.log(`lights => ${person.rooms[command.targetRoom]} command => ${command.action}`)
                let test = JSON.stringify({
                    "desiredState": command.action,
                    "lights": person.rooms[command.targetRoom]
                })

                console.log(IsJsonString(test))
                console.log(test)
                console.log(command.user)
                let postOptions = {
                    method: 'POST',
                    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
                    headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
                    json: {
                        "desiredState": command.action,
                        "lights": person.rooms[command.targetRoom]
                    }
                };
                request(postOptions, (error, response, body) => {
                    if (error) console.log(error);

                    console.log(body);
                });
            }
        })
    })
})

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}