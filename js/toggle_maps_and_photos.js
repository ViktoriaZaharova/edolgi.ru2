let toggleMaps = document.querySelector('.toggle-maps'),
    toggleOffencePhotos = document.querySelector('.toggle-gallery'),
    data_token = document.querySelector('#data-token').value,
    // csrfmiddleware = document.querySelector('#csrf-middleware')
    mapAddress = document.querySelector('.map-address'),
    gallery = document.querySelector('.gallery-collapse');


toggleOffencePhotos.onclick = function () {
    $.ajax({
        type: 'POST',
        url: '/gibdd/load-pictures',
        headers: {'X-CSRFToken': data_token.value},
        data: {
            'csrfmiddleware': data_token.value
        },
        success: function (data) {
          if (data['pics']) {
              let row = document.createElement('div');
              row.setAttribute('class', 'row');
              data['pics'].forEach(function (item) {
                  let imageBlock = document.createElement('div');
                  imageBlock.setAttribute('class', 'col-6 col-sm-4');

                  let imageLink = document.createElement('a');
                  imageLink.setAttribute('href', item);
                  imageLink.setAttribute('class', 'gallery-item');
                  imageLink.setAttribute('data-fancybox', 'gallery');

                  let image = document.createElement('img');
                  image.setAttribute('src', item);
                  image.setAttribute('alt', '');

                  imageLink.appendChild(image);
                  imageBlock.appendChild(imageLink);
                  row.appendChild(imageBlock);
              });
          }
          else {
              let error = document.createElement('p');
              error.innerHTML = 'Ошибка загрузки'
              mapAddress.appendChild(gallery)
              }
        }

    })
}