const request = require("request");
const keys = require("./keys");

let options = {
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: { Authorization: keys.apiToken }
};

request(options, (error, response, body) => {
    if (error) throw new Error(error);

    //console.log(body);
});



let postOptions = {
    method: 'POST',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/set_lights',
    headers: { 'content-type': 'application/json', Authorization: keys.apiToken },
     json: {
         "desiredState": "on",
         "lights": ["light-4f33566",
             "light-4d4a9de",
             "light-f7dcea4"]
     }

};

request(postOptions, (error, response, body) => {
    if (error) console.log(error);

    console.log(body);
});