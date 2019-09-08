const axios = require('axios');
const keys = require("./keys");


axios({
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: { Authorization: keys.apiToken }
}).then(function (response) {
    console.log(response.data)
});

axios({
    method: 'POST',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
    headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
    desiredState: "on",
    lights: ["light-te7ie5", "light-mef6th"]
});