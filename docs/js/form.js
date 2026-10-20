(function () {
    'use strict';

    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');

    function showError(message) {
        status.textContent = message;
        status.classList.add('is-error');
        status.classList.remove('is-success');
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        button.disabled = true;
        button.textContent = 'Wysyłanie...';
        status.textContent = '';
        status.classList.remove('is-error', 'is-success');

        var data = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
            .then(function (response) { return response.json(); })
            .then(function (result) {
                if (result.success) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: 'form_submit_success', form_id: 'kontakt' });
                    window.location.href = '/dziekuje/';
                } else {
                    showError('Nie udało się wysłać wiadomości. Napisz bezpośrednio na sztabkowski.michal@gmail.com.');
                    button.disabled = false;
                    button.textContent = 'Wyślij wiadomość';
                }
            })
            .catch(function () {
                showError('Brak połączenia. Spróbuj ponownie albo napisz na sztabkowski.michal@gmail.com.');
                button.disabled = false;
                button.textContent = 'Wyślij wiadomość';
            });
    });
})();
