
debounceFunction = debounceSearch();
let suggestedLocations = [];
function onLocationSearch(event) {
    debounceFunction(event.target.value);

}

function debounceSearch() {
    return _.debounce(function (value) {
        fetch(`https://developers.zomato.com/api/v2.1/locations?query=${value}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'user-key': 'c6709fd7e1a5561ac6ce7eb439cf0258'
            }
        })
            .then(function (res) { return res.json() })
            .then(function (data) {
                if (data.location_suggestions.length > 0) {
                    let ulElem = new DocumentFragment();
                    suggestedLocations = data.location_suggestions;
                    data.location_suggestions.forEach(location => {
                        let liElem = document.createElement('option');
                        liElem.innerText = location.city_name;
                        // `<option>${location.city_name}</option>`;
                        ulElem.appendChild(liElem);
                    });
                    let listElem = document.querySelector('#locations-list');
                    listElem.innerHTML = '';
                    listElem.appendChild(ulElem);
                    // listElem.classList.remove('hide');
                }

            })
    }, 500);
}

function onLocationSelect(event) {
    let locObj = _.find(suggestedLocations, function (loc) {
        return loc.city_name === event.target.value
    })
    getRestaurantDetails(locObj);
}

function onRestaurantSearch(event) {

}

function getRestaurantDetails(locObj) {
    fetch(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${locObj.entity_id}&entity_type=${locObj.entity_type}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'user-key': 'c6709fd7e1a5561ac6ce7eb439cf0258'
        }
    })
        .then(function (res) { return res.json() })
        .then(function (data) {
            data.best_rated_restaurant.forEach(data => {
                createRestaurant(data.restaurant);
            });
        })
}

function createRestaurant(resDetails) {
    let cardElem = document.createElement('div');
    let cardContainerElem = document.getElementsByClassName('card-container')[0];
    cardElem.className = 'card';
    cardElem.innerHTML =
        `<img src='${resDetails.featured_image}' class='res-image' />
        <div class='res-details'>        
            <div class='res-name'>${resDetails.name}</div>
            <div class='res-rating'><span class="material-icons">star_rate</span><span>${resDetails.user_rating.aggregate_rating} </span><span class='rating-value'>(${resDetails.user_rating.votes})</span></div>
            <div class='res-location'>${resDetails.location.locality_verbose}</div>
            <div class='res-cuisines'>${resDetails.cuisines}</div>
        </div>`
    cardContainerElem.append(cardElem);
}

getRestaurantDetails({
    entity_id: 3,
    entity_type: 'city'
});
