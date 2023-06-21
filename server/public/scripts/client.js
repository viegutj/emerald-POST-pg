$(document).ready(onReady);

function onReady() {
    getSongs();
    $('#submit-button').on('click', postSong);
}

// get artist data from the server
function getSongs() {
    $.ajax({
        type: 'GET',
        url: '/songs'
    }).then(function (response) {
        console.log("GET /songs response", response);
        // render songs
        render(response);
    });
}

function postSong() {
    let payloadObject = {
        artist: $('#artist-input').val(),
        track: $('#track-input').val(),
        rank: $('#rank-input').val(),
        published: $('#published-input').val()
    }
    $.ajax({
        type: 'POST',
        url: '/songs',
        data: payloadObject
    }).then( function (response) {
        $('#artist-input').val(''),
        $('#track-input').val(''),
        $('#rank-input').val(''),
        $('#published-input').val('')
        getSongs();
    });
}

function render(songs) {
    $("#songsTableBody").empty();
    for (let i = 0; i < songs.length; i++) {
        $('#songsTableBody').append(`
            <tr>
                <td>${songs[i].artist}</td>
                <td>${songs[i].track}</td>
                <td>${songs[i].rank}</td>
                <td>${songs[i].published}</td>
            </tr>
        `);
    }
}