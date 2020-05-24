(() => {
    'use strict';
    $(() => {
        $.ajax({
            url : 'json/flushMessages.php',
            method : 'get'
        }).done((data) => {
            if (data.disconnected) {
                createAlert('info', data.disconnected);
            }
            if (data.deleted) {
                createAlert('info', data.deleted);
            }
        }).fail(() => {
            createAlert('error', 'Fatal error !');
        })
    });
})();