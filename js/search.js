(function () {
    $(() => {
        $("#searchForm").on('submit', function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done(function (data) {
                console.log('ok');
                // data.results.forEach((result) => {
                //     if (result.type === 'MOVIE') {
                        // let movie = new Movie({
                        //     name : result.name,
                        //     type : result.type,
                        //     author : result.author,
                        //     description : result.description,
                        //     year : result.year,
                        //     id : result.id
                        // });
                        // movie.show();
                    // } else if (result.type === 'SHOW') {
                    //     let show = new Show({
                    //         name : result.name,
                    //         type : result.type,
                    //         author : result.author,
                    //         description : result.description,
                    //         year : result.year,
                    //         id : result.id
                    //     });
                    //     show.show();
                    // }
                // })
            }).fail(function () {
                createAlert('error', 'Sorry, the search function is unavailable for the moment.')
            });
        });
    });
})();