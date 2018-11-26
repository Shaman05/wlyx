//render

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
                $toolbar.appendTo($currentTabC);
                setInterval(function(){
                    let title = webview.getTitle();
                    setTitle(index, title);
                }, 1000);
            });
        }
    }

    function setTitle(index, title) {
        $tabs.eq(index).text(title).attr('title', title);
    }
}