function loadImg(input) {
  var file = document.getElementById(input).files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function() {
    imgur(reader.result);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function imgur(base64) {
  $.ajax({
    url: "https://api.imgur.com/3/upload",
    type: "POST",
    datatype: "json",
    headers: {
      "Authorization": "Client-ID 292fe09d37e8870"
    },
    data: {
      image: base64.split(",")[1]
    },
    success: function(response) {
      updateImageView(response.data.link);
    },
    error: function() {
      alert("not functional feelsbadman");
    },
  });
}
