$(document).ready(function () {
  const hostname = window.location.hostname;
  $.get('http://' + hostname + ':5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  });

  const obj = {};
  $('.amenities .popover input').click(function () {
    if (this.checked) {
      obj[$(this).data('id')] = $(this).data('name');
    } else {
      delete obj[$(this).data('id')];
    }
    const names = Object.values(obj);
      $('.amenities h4').text(names.sort().join(', '));
  });

  $.ajax({
    type: 'POST',
    url: 'http://' + hostname + ':5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      $.each(data, function (i, place) {
        $('section.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div><div class="description">' + place.description + '</div></article>');
      });
    }
  });
});
