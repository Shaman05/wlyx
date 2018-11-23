window.onload = function translate() {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
    script.onload = script.onreadystatechange = function () {
        $(document).ready(function () {
            console.log('jquery is ready!');
            console.log($('body'));
        });
    };
    document.body.appendChild(script);
};