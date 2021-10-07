$(document).ready(function () {
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
});
