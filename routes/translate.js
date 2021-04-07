const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', function (req, res, next) {
    const client_id = process.env.PAPAGO_ID;
    const client_secret = process.env.PAPAGO_SECRET;
    const query = req.body;
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const options = {
        url: api_url,
        form: {'source':query.source, 'target': query.target, 'text':query.text},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
        } else {
            console.error(error);
            next(error);
        }
    });
});


module.exports = router;