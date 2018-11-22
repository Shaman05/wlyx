//render
const path = require('path');
const bs = require("browser-sync");
const fetch = require('./fetch');

module.exports = function (config) {
    let $tabs = $('.tab-head');
    let $left = $('#left');
    let targetURL = `http://s212.hero.9wee.com/passport.php?act=login&referer=/`;
    

    createTabContent();
    setTab(0);
    fetch({
        method: 'POST',
        url: 'http://passport.9wee.com/login',
        form: {
            username: '',
            password: ''
        }
    }, result=> {
        console.log(result.statusCode);
        let cookies = result.headers['set-cookie'];
        console.log(cookies);
        createLocalhost(cookies, function(){
            setTab(0);
        });
    });
    

    function createTabContent() {
        $.each($tabs, (index, tab) => {
            let $tab = $(tab);
            let $tabC = $(`<div class="tab-content" data-tab-c="${index}">`);
            $left.append($tabC);
            $tab.attr('data-tab-index', index);
        });
        $tabs.on('click', function () {
            let index = $(this).attr('data-tab-index') * 1;
            setTab(index);
        });
    }

    function setTab(index) {
        $tabs.removeClass('current').eq(index).addClass('current');
        let $currentTabC = $left.find('.tab-content').hide().removeClass('current').eq(index).addClass('current').show();
        let $frame = $currentTabC.find('webview');
        if ($frame.size() < 1) {
            $frame = $(`<webview src="http://www.site-808${index}.com/" plugins preload="./static/js/cookie.js"></webview>`);
            $frame.appendTo($currentTabC);
            let webview = $frame[0];
            
            webview.addEventListener('dom-ready', () => {
                webview.openDevTools();
            });
        }
    }

    function createLocalhost(cookies, callback) {
        let proxy = bs.create(`wlyx-proxy`);
        proxy.init({
            ui: false,
            open: false,
            ghostMode: false,
            port: 80,
            proxy: {
                target: targetURL,
                middleware: [function (req, res, next) {
                    res.setHeader("access-control-allow-origin", '*');
                    res.setHeader("X-proxy-server", 'wlyx-app');
                    res.setHeader("X-proxy-server-power-by", 'Browsersync');
                    res.setHeader('Set-Cookie', cookies);
                    next();
                }]
            }
        }, function (err, bs) {
            if (err) {
                return console.log(err);
            }
            let urls = bs.options.getIn(['urls']);
            console.log(urls);
            callback && callback();
        });
    }


}