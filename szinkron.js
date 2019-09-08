const request = require("request-promise");
const axios = require('axios')
const mapping = require('./mapping.json')
const keys = require("./keys");

let order = []

axios({
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: { Authorization: keys.apiToken }
}).then(function (response) {

    response.data.userCommands.map(command => {

        mapping.map(person => {
            if (command.user === person.user) {
                order.push([{
                    "desiredState": command.action,
                    "lights": person.rooms[command.targetRoom]
                }, command.user])

            }
        })
    })
    switchLights()
})

function switchLights() {
    console.log("//////////////////////////===================================================================innentol post")
    for (let object of order) {

        console.log(object[1])
        console.log(object[0])
        let postOptions = {
            method: 'POST',
            url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
            headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
            json: object[0]
        }
        request(postOptions, (error, response, body) => {
            if (error) console.log(error);
            console.log(body);
        })
    }
}


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}