(function () {
    $(()=>{
        $.ajax({
            url: "../mostrecent.php",
            method: "post",
        }).done(function (data) {
            $('#search-form-container')
                .after(
                    $('<div id="most-recent"/>')
                );
            data.results.forEach( r => {
                Video.sortAndShow(r, "#most-recent");
            })
        })
    })
})();