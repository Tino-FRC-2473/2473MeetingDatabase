$(document).ready(function() {
  updateOptions();
  formDisplay();
  listenForUpload();
  submission();
  formClearance();
});

function formDisplay() {
  $('#notes_trigger').click(function() {
    $('body > .button').hide();
    $('#notes').show();
    $('#back').show();
  });
  $('#error_trigger').click(function() {
    $('body > .button').hide();
    $('#error').show();
    $('#back').show();
  });
  $('#back').click(function() {
    $('body > .button').show();
    $('form').hide();
    $(this).hide();
  });
}

function selectOption() {
  $('.option_displayed').click(function() {
    if ($(this).parent().find('.project_option').css('display') == 'none') {
      $(this).parent().find('.project_option').show();
    } else {
      $(this).parent().find('.project_option').hide();
    }
  });

  $('.project_option').click(function() {
    $(this).parent().find('.option_displayed').text($(this).text());
    $('.project_option').hide();
  });
}

function getFormData(key) {
  var notes_arr_ids = ['#meeting_title', '#meeting_date', '#notes .description_input', '#notes_dropdown'];
  var error_arr_ids = ['#date_of_error', '#error_description', '#solution_known', '#error_message', '#fatality_dropdown', '#project_name_dropdown'];

  var validation = dataValidation(key);
  if (key == 'meeting') {
    for (var index in validation) {
      validation[index] ? none(notes_arr_ids[index]) : red(notes_arr_ids[index]);
    }
  } else if (key == 'error') {
    for (var index in validation) {
      validation[index] ? none(error_arr_ids[index]) : red(error_arr_ids[index]);
    }
  }
  if (validation.indexOf(false) == -1) {
    (key == 'meeting') ? updateMeeting(buildData(key)): updateError(buildData(key));
  }
}

function dataValidation(type) {
  var returner = [];
  if (type == 'meeting') {
    returner.push($('#meeting_title').val().length != 0); //title gucci
    returner.push(dateFormatted($('#meeting_date').val())); //date gucci
    returner.push($('#notes .description_input').val().length != 0); //description gucci
    returner.push($('#notes .option_displayed').text().indexOf("Select a") == -1); //project selected
  } else if (type == 'error') {
    returner.push(dateFormatted($('#date_of_error').val()));
    returner.push($('#error_description').val().length != 0);
    returner.push($('#solution_known').val().length != 0);
    returner.push($('#error_message').val().length != 0 && $('#error_message').val().split(",").length == 2);
    returner.push($('#fatality_dropdown .option_displayed').text().indexOf("Select a") == -1);
    returner.push($('#project_name_dropdown .option_displayed').text().indexOf("Select a") == -1);
  }
  return returner;
}

function listenForUpload() {
  $("#image_addition").click(function() {
    $('#notes_imageUpload').trigger("click");
  });
  $('#notes_imageUpload').change(function() {
    loadImg('notes_imageUpload');
  });
}

function updateImageView(src) {
  $('.img_preview').append('<img src=' + src + '/>');
}

function dateFormatted(potential_date) {
  var returner = [],
    arr = potential_date.split("/"),
    date = new Date();
  returner.push(arr.length == 3);
  (returner[0]) ? returner.push(inBounds(arr[0], 1, 12) && inBounds(arr[1], 1, 30) && inBounds(arr[2], 2000, date.getFullYear())): returner.push(false);
  return returner.indexOf(false) == -1;
}

function inBounds(str, val1, val2) {
  return !isNaN(str) && (parseInt(str) >= val1) && (parseInt(str) <= val2);
}

function submission() {
  $('#notes .button').click(function() {
    getFormData('meeting');
  });
  $('#error .button').click(function() {
    getFormData('error');
  });
}

function red(el) {
  $(el).css({
    'border': '2px solid red'
  });
}

function none(el) {
  $(el).css({
    'border': 'none'
  });
}

function buildData(data) {
  var obj = {};
  if (data == "meeting") {
    obj.project_name = $('#notes_dropdown .option_displayed').text();
    obj.date = $('#meeting_date').val();
    obj.title = $('#meeting_title').val();
    obj.description = $('#notes .description_input').val();
    var arr = {};
    var urls = $('.url_input').val().split(",");
    for (var i in urls) {
      if (urls[i].length > 0) arr[urls[i]] = true;
    }
    obj.urls = arr;
    var imgs = {};
    $('.img_preview img').each(function() {
      imgs[$(this).attr("src")] = true;
    });
    obj.imgs = imgs;
  } else if (data == "error") {
    obj.date = $('#date_of_error').val();
    obj.description = $('#error_description').val();
    obj.solution = $('#solution_known').val();
    obj.message = $('#error_message').val().split(",")[0].trim() + "_" + $('#error_message').val().split(",")[1].trim();
    obj.fatality = $('#fatality_dropdown .option_displayed').text();
    obj.project = $('#project_name_dropdown .option_displayed').text();
  }
  return obj;
}

function addOption(projectName) {
  $('#notes_dropdown').append('<div class="project_option">' + projectName + '</div>');
  $('#project_name_dropdown').append('<div class="project_option">' + projectName + '</div>');
}

function appendOptions() {
  var projects = getProjects();
  for (var i in projects) {
    addOption(projects[i]);
  }
  selectOption();
}

function formClearance() {
  $('#back').click(function() {
    location.reload();
  });
}
