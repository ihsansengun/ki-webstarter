// font loader

var WebFontConfig = {
    google: {
        families: ['Lato', 'Sans Serif']
    },
    timeout: 2000
};

(function(){

    "use strict";

    var wf = document.createElement("script");
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.async = 'true';
    document.head.appendChild(wf);

})();



// Tealium Tracking Tag

var utag_data = {};

(function (a, b, c, d) {
    "use strict";
    a = '//tags.tiqcdn.com/utag/kaplan2/kie-english/prod/utag.js';
    b = document;
    c = 'script';
    d = b.createElement(c);
    d.src = a;
    d.type = 'text/java' + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
})();


