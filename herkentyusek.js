const axios = require('axios')
const mapping = require('./mapping.json')
const keys = require("./keys");

let orderedList = [];
getUser();
async function getUser() {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
            headers: { Authorization: keys.apiToken }
        });
        response.data.userCommands.map(command => {
            mapping.map(person => {
                if (command.user === person.user) {
                    orderedList.push({
                        'desiredState': command.action,
                        'lights': person.rooms[command.targetRoom]
                    })
                }
            })
        });
        await sendUserData()
    } catch (error) {
        console.error(error);
    }
}

async function sendUserData() {
    try {
        JSON.stringify(orderedList)
        for (let i = 0; i < orderedList.length; i++) {
            const response = await axios({
                method: 'POST',
                url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
                headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
                data: {
                    "desiredState": orderedList[i].desiredState,
                    "lights": orderedList[i].lights
                }
            }).catch(e => console.log(e.response.data));
            console.log(response.data)
        }
    } catch (e) {
        console.log(e);
    }
}