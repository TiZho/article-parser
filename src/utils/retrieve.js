// utils -> retrieve

const axios = require('axios');
const  {getAxiosOptions} = require('../config');

const {
    error,
    info,
} = require('./logger');

module.exports = async (url) => {
    try {
        let result = null;
        console.log("Launching application....");
        const options = {
            headers: {
                'user-agent': `article-parser-fork/1`,
            }
        };
        await axios
            .create(options)
            .get(url)
            .then(function(response) {
                console.log("receiving: ", response);
                const contentType = response.headers['content-type'] || '';
                if (!contentType || !contentType.startsWith('text/')) {
                    console.log(`Got invalid content-type (${contentType}) from "${url}"`);
                    return null;
                }
                info(`Loaded remote HTML content from "${url}"`);
                const html = response.data;
                const resUrl = response.config.url;
                result = {
                    url,
                    resUrl,
                    html,
                };

            }).catch(function(error){
                console.log(`Got error code from "${url}"`, error);
                return null;
            });
        return result;
    } catch (err) {
        console.log(`Could not fetch HTML content from "${url}"`);
        console.log(err);
        error(err);
    }
    console.log("Could not run instance");
    return null;
}
