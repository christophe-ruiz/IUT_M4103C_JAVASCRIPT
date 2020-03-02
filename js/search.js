(function () {
    'use strict';
    $(() => {
        $('#searchForm').on('submit', function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done(function (data) {
                let howMuchItemsWeFound = 'Found ' + data.found;
                if (data.found == 0) {
                    howMuchItemsWeFound += ' result.';
                    createAlert('info', howMuchItemsWeFound)
                } else {
                    if (data.found == 1){
                        howMuchItemsWeFound += ' result.';
                    } else {
                        howMuchItemsWeFound += ' results.';
                    }
                    $('#search-form-container').after(
                        $('<div id="results" />')
                    )
                    createAlert('success', howMuchItemsWeFound);
                    data.results.forEach((result) => {
                        if (result.type === 'MOVIE') {
                            let movie = new Movie({
                                name : result.name,
                                type : result.type,
                                author : result.author,
                                description : result.description,
                                year : result.year,
                                id : result.id
                            });
                            movie.show();
                        } else if (result.type === 'SHOW') {
                            let show = new Show({
                                name : result.name,
                                type : result.type,
                                author : result.author,
                                description : result.description,
                                year : result.year,
                                id : result.id
                            });
                            show.show();
                        }
                    })
                }
            }).fail(function () {
                createAlert('error', 'Sorry, the search function is unavailable for the moment.')
            });
            return false;
        });
    });
})();