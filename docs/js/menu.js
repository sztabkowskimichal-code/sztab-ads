(function() {
    'use strict';

    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('main-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        toggle.classList.toggle('is-active');
        nav.classList.toggle('is-open');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a nav link
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('is-active');
            nav.classList.remove('is-open');
            document.body.classList.remove('menu-open');
        });
    }
})();
