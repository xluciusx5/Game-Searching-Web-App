//Once buttom on search bar is pressed, it searches for the games
$(function() {
        $('#btn1').click(function() {
            searchGame()
        })

        $(document).on('click', '.open-button', function() {
            alert('This feature is coming soon!');
        });
    })
    //Function to search for games using search bar
function searchGame() {
    $('#import').empty()
        //Takes the values inputted in the search form in order to use our API to search giantbomb website
    const textToSearch = document.querySelector('#name').value
    const releaseYear = document.querySelector('#release-year').value.toString()
        //AJAX get request using our api key b6d8416a7e055ee6adadf42d083ed5757164d1d3
    $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'json_callback',
            url: `https://www.giantbomb.com/api/search/?api_key=b6d8416a7e055ee6adadf42d083ed5757164d1d3&format=jsonp&query=${textToSearch}`
        })
        //Once that's done, it grabs the data , cleans it up and returns it.
        .done(function(data) {
            let divContent = ''
            let results = data.results;

            if (releaseYear) {

                const newRes = results.filter(item => {
                    if (item.original_release_date) {
                        return item.original_release_date.split('-')[0] === releaseYear
                    } else {
                        return;
                    }
                })

                const newContent = newRes.map(item => {
                    return `<h5><img src='${item.image.small_url}'/> <br><br> ${item.name} <br> ${item.original_release_date.split('-')[0]} <br><button class="open-button">Add to My List</button></h5>`
                })

                if (newContent.length < 1) {
                    divContent = '<p>No results...</p>'
                } else {
                    newContent.map(item => divContent += `${item}`)
                }

                $('#import').append(divContent)

                return;
            }

            console.log(results);


            //Maps(puts everything into an array)
            results.map(item => {

                return divContent += `<h5><img src='${item.image.small_url}'/> <br><br> ${item.name} <br> ${item.original_release_date ? item.original_release_date.split('-')[0] : 'Unknown release year'} <br> <button class="open-button" onclick="alert("Added to my list!")">Add to My List</button></h5>`

            })

            $('#import').append(divContent)


        })
        //Function in case something breaks

    .fail(function(e) {
        let errMsg = '<h3>An error occured</h3>';
        // $('#result').html(errMsg);
        console.log(e);
    });


}