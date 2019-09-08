const request = require("request");
const keys = require("./keys");

let options = {
    method: 'GET',
    url: 'https://registration.hungary.chaosstack.com/api/qualify/user_commands',
    headers: {Authorization: keys.apiToken}
};

request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
});
