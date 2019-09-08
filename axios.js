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
    let i = 0

    for (let index = 0; index < order.length; index++) {
        const element = order[index];
        let object = []
        object[0] = element[0]
        object[1] = element[1]
        console.log(i++)
        console.log(object[1])
        console.log(object[0])
        setTimeout(() => {
            console.log("mukodjel")
        }, 3000);

        async function postServer() {
            try {
                await axios({
                    method: 'POST',
                    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
                    headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
                    json: object[0]
                })
            } catch (error) {
                // console.error(error);
            }
        }
    }
}

/*
let postOptions = {
    method: 'POST',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
    headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
    json: object[0]
}
request(postOptions, (error, response, body) => {
    if (error) console.log(error);
    console.log(body);
}) */