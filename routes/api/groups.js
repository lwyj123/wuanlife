var express = require('express');
var router = express.Router();
var request = require('request');
var ua = require('mobile-agent');
var config = require('../../config/config');


router.get('/', function(req, res) {
    request(`${config.server}group/lists?pn=${req.body.pn || 1}`,
        function(error, httpResponse, body) {
            if (!error && httpResponse.statusCode == 200) {
                console.log('get groups success!');
                res.send(JSON.parse(body));
            } else {
                res.send({
                    ret: 500,
                    msg:'服务器异常'
                });
            }
        }
    );
});

router.route('/:groupid/members')
    //加入星球
    .post(function(req, res, next) {

        console.log(`${config.server}group/join?user_id=${req.session.user.user_id}&group_id=${req.params.groupid}`)
        request(`${config.server}group/join?user_id=${req.session.user.user_id}&group_id=${req.params.groupid}`,
            function(error, httpResponse, body) {
                if (!error && httpResponse.statusCode == 200) {
                    console.log('join(apply) success!');
                    res.send(JSON.parse(body));
                } else {
                    res.send({
                        ret: 500,
                        msg:'服务器异常'
                    });
                }
            }
        );
    })
    /*
    .put(function(req, res, next) {
        console.log(`apply: ${config.server}user/process_apply?user_id=${req.params.userid}&m_id=${req.body.m_id}&mark=${req.body.mark}`)
        request(`${config.server}user/process_apply?user_id=${req.params.userid}&m_id=${req.body.m_id}&mark=${req.body.mark}`,
            function(error, httpResponse, body) {
                if (!error && httpResponse.statusCode == 200) {
                    console.log('aplly success!');
                    res.send(JSON.parse(body));
                } else {
                    res.send({
                        ret: 500,
                        msg:'服务器异常'
                    });
                }
            }
        );        
    })
    */
module.exports.router = router;