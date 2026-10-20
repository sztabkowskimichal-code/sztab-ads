(function () {
    'use strict';

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

    function updateGtagConsent() {
        var analytics = CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied';
        var marketing = CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied';
        gtag('consent', 'update', {
            'analytics_storage': analytics,
            'ad_storage': marketing,
            'ad_user_data': marketing,
            'ad_personalization': marketing,
            'functionality_storage': 'granted',
            'personalization_storage': 'granted'
        });
        window.dataLayer.push({ event: 'cookie_consent_update' });
    }

    CookieConsent.run({
        disablePageInteraction: false,
        cookie: { name: 'cc_cookie', expiresAfterDays: 182 },
        guiOptions: {
            consentModal: { layout: 'cloud', position: 'bottom center', equalWeightButtons: false, flipButtons: true },
            preferencesModal: { layout: 'box', equalWeightButtons: false, flipButtons: true }
        },
        onFirstConsent: updateGtagConsent,
        onConsent: updateGtagConsent,
        onChange: updateGtagConsent,
        categories: {
            necessary: { enabled: true, readOnly: true },
            analytics: { autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }] } },
            marketing: { autoClear: { cookies: [{ name: /^_gc/ }] } }
        },
        language: {
            default: 'pl',
            translations: {
                pl: {
                    consentModal: {
                        title: 'Ta strona używa plików cookies',
                        description: 'Korzystam z plików cookies, żeby mierzyć ruch na stronie (Google Analytics) i oceniać skuteczność reklam. Możesz zaakceptować wszystkie albo wybrać, na co się zgadzasz.',
                        acceptAllBtn: 'Akceptuję wszystkie',
                        acceptNecessaryBtn: 'Tylko niezbędne',
                        showPreferencesBtn: 'Ustawienia',
                        footer: '<a href="/polityka-prywatnosci/">Polityka prywatności</a>'
                    },
                    preferencesModal: {
                        title: 'Ustawienia cookies',
                        acceptAllBtn: 'Akceptuję wszystkie',
                        acceptNecessaryBtn: 'Tylko niezbędne',
                        savePreferencesBtn: 'Zapisz ustawienia',
                        closeIconLabel: 'Zamknij',
                        sections: [
                            {
                                title: 'Do czego służą cookies',
                                description: 'Niezbędne pliki cookies zapewniają działanie strony. Pozostałe włączam tylko za Twoją zgodą. Zgodę możesz w każdej chwili zmienić w stopce strony.'
                            },
                            {
                                title: 'Niezbędne',
                                description: 'Wymagane do prawidłowego działania strony, np. zapamiętanie Twojej decyzji dotyczącej cookies.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Analityczne',
                                description: 'Google Analytics 4 - anonimowe statystyki odwiedzin, które pomagają mi ulepszać stronę.',
                                linkedCategory: 'analytics',
                                cookieTable: {
                                    headers: { name: 'Nazwa', domain: 'Usługa', description: 'Opis', expiration: 'Ważność' },
                                    body: [
                                        { name: '_ga', domain: 'Google Analytics', description: 'Rozróżnianie użytkowników.', expiration: '2 lata' },
                                        { name: '_ga_*', domain: 'Google Analytics', description: 'Utrzymanie stanu sesji.', expiration: '2 lata' }
                                    ]
                                }
                            },
                            {
                                title: 'Marketingowe',
                                description: 'Google Ads - pomiar skuteczności reklam, dzięki którym trafiłeś na tę stronę.',
                                linkedCategory: 'marketing'
                            },
                            {
                                title: 'Więcej informacji',
                                description: 'Szczegóły znajdziesz w <a href="/polityka-prywatnosci/">polityce prywatności</a>. Pytania: <a href="mailto:sztabkowski.michal@gmail.com">sztabkowski.michal@gmail.com</a>.'
                            }
                        ]
                    }
                }
            }
        }
    });
})();
