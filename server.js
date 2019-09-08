const axios = require('axios');
const keys = require("./keys");


axios({
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: { Authorization: keys.apiToken }
}).then(function (response) {
    // console.log(response.data)
});

axios({
    method: 'POST',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
    headers: { 'Content-Type': 'application/json', Authorization: keys.apiToken },
    body: {
        'desiredState': "on",
        'lights': ["light-4f33566",
            "light-4d4a9de",
            "light-f7dcea4"]
    }
}).catch(err => console.log(err));