(() => {
    'use strict';
    $(() => {
        $('#searchForm').on('submit', function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done((data) => {
                let howMuchItemsWeFound = 'Found ' + data.found;
                if (data.message) {
                    createAlert('error', data.message);
                } else {
                    $('#results').empty();
                }

                if (data.found === 0) {
                    howMuchItemsWeFound += ' result.';
                    createAlert('info', howMuchItemsWeFound)
                } else {
                    if (data.found === 1){
                        howMuchItemsWeFound += ' result.';
                    } else {
                        howMuchItemsWeFound += ' results.';
                    }
                    if (!$('#results').length) {
                        $('#search-form-container').after(
                            $('<div id="results" />')
                        )
                    }
                    createAlert('success', howMuchItemsWeFound);
                    data.results.forEach(result => Video.sortAndShow(result, '#results'))
                }
            }).fail(() => {
                createAlert('error', 'Sorry, the search function is unavailable for the moment.')
            });
            return false;
        });
    });
})();