//render
const { ipcRenderer } = require('electron');
const path = require('path');
const bs = require("browser-sync");
const fetch = require('./fetch');

module.exports = function (config) {
    let $tabs = $('.tab-head');
    let $left = $('#left');
    let $area = $('#area');
    let area = 'none';

    $area.on('change', function () {
        area = $(this).val();
        if(area === 'none'){
            return false;
        }
        createTabContent();
        setTab(0);
        // fetch({
        //     method: 'POST',
        //     url: 'http://passport.9wee.com/login',
        //     form: {
        //         username: '',
        //         password: ''
        //     }
        // }, result => {
        //     if (!result) {
        //         return createLocalhost(null, () => {
        //             setTab(0);
        //         });
        //     }
        //     console.log(result.statusCode);
        //     let cookies = result.headers['set-cookie'];
        //     console.log(cookies);
        //     createLocalhost(cookies, () => {
        //         setTab(0);
        //     });
        // });
    });




    function createTabContent() {
        $left.empty();
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
            $frame = $(`<webview src="http://${area}.hero.9wee.com/" plugins partition="hero${index}"></webview>`);
            $frame.appendTo($currentTabC);
            let webview = $frame[0];
            let $toolbar = $('<div class="tools"><span data-action="refresh">刷新</span></div>');
            $toolbar.on('click', '[data-action="refresh"]', function(){
                webview && webview.reload(true);
            });
            webview.addEventListener('dom-ready', () => {
                //webview.openDevTools();
                //ipcRenderer.send('new win');
                let title = webview.getTitle();
                $tabs.eq(index).text(title).attr('title', title);
                $toolbar.appendTo($currentTabC);
            });
        }
    }

    function createLocalhost(cookies, callback) {
        if (!cookies) {
            return callback();
        }
        let proxy = bs.create(`wlyx-proxy`);
        let targetURL = `http://s212.hero.9wee.com/passport.php?act=login&referer=/`;
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

    function setTitle(index, title) {

    }
}