$(document).ready(function() {
  updateData();
  switchViews();
  switchMeetingDisplay();
  switchErrorDisplay();
  refreshHome();
});

function addMeetingProject(project_name) {
  $("#notes_body").append('<div class="meeting_min darkgrey tahoma radial_white button meeting_project">' + project_name + '</div>');
}

function addErrorProject(project_name) {
  $("#errors_body").append('<div class="meeting_min darkgrey tahoma radial_white button error_project">' + project_name + '</div>');
}

function addMeeting(meeting_name, date) {
  var d = (new Date(date)).toDateString().split(" ");
  $("#notes_body_specific").append('<div class="meeting_min darkgrey tahoma radial_white button note_preview"><span class="meeting_name_mini">' + meeting_name + '</span><br/><span style="font-size: 12px;">' + d[1] + " " + d[2] + ", " + d[3] + '</div>');
}

function addError(err_code, fatality) {
  var code = err_code.substring(0, err_code.lastIndexOf("_")) + ": " + err_code.substring(err_code.lastIndexOf("_") + 1);
  $("#errors_body_specific").append('<div class="error_min darkgrey tahoma radial_white button error_preview"><span class="error_code_mini">' + code + '</span><br/><span style="font-size: 12px;">' + fatality + '</div>');
}

function clearMeetings() {
  $('#notes_body_specific').html("");
}

function clearErrorLogs() {
  $('#errors_body_specific').html("");
}

function displayMeeting(meeting, project) {
  $('.meeting_img').remove();
  $('.link').remove();
  var meeting = findMeeting(meeting, project);
  $('.meeting_title_display').text(meeting.title);
  var d = (new Date(meeting.date)).toDateString().split(" ");
  $('.meeting_date_display').text(d[1] + " " + d[2] + ", " + d[3]);
  $('.meeting_description_display').text(meeting.description);
  if (meeting.imgs) {
    $('#images_heading').show();
    for (var img in Object.keys(meeting.imgs)) {
      $('#images_heading').after("<img class='meeting_img' src='" + uncode(Object.keys(meeting.imgs)[img]) + "'></img>");
    }
  } else {
    $('#images_heading').hide();
  }
  if (meeting.urls) {
    $('#links_heading').show();
    var counter = 1;
    console.log(Object.keys(meeting.urls));
    for (var link in Object.keys(meeting.urls)) {
      $('#links_heading').after("<a class='link' href='" + uncode(Object.keys(meeting.urls)[link]) + "'>Link " + (counter++) + "</a>");
    }
  } else {
    $('#links_heading').hide();
  }
}

function displayError(error) {
  $('.error_code_display').text(error);
  var error = findError(error);
  console.log(error);
  $('.error_fatality_display').text(error.fatality);
  $('.error_description_display').text(error.description);
  $('.error_solution_display').text(error.solution);
}

function switchViews() {
  clickToggle('#notes_trigger', '.home_options', '#notes_body', '2473 Software Meeting Notes');
  clickToggle('#error_trigger', '.home_options', '#errors_body', '2473 Software Error Logs');
  clickToggle('.meeting_project', '#notes_body', '#notes_body_specific', '');
  clickToggle('.error_project', '#errors_body', '#errors_body_specific', '');
}

function clickToggle(el, hide, show, title) {
  $(document).on('click', el, function() {
    $(hide).hide();
    $(show).show();
    setTitle(title);
  });
}

function toggle(hide, show) {
  $(hide).hide();
  $(show).show();
  setTitle(title);
}

function fillNotesProjectView() {
  for (var project in getProjects()) addMeetingProject(project);
}

function fillErrorsProjectView() {
  for (var project in getProjects()) addErrorProject(project);
}

function switchMeetingDisplay() {
  $(document).on('click', '.meeting_project', function() {
    fillNotesView($(this).text());
  });
  $(document).on('click', '.note_preview', function() {
    displayMeeting($(this).find('.meeting_name_mini').text(), getProjectFromTitle($('#title').text().split(" ")));
    toggle('#notes_body_specific', '#notes_expanded');
  });
}

function switchErrorDisplay() {
  $(document).on('click', '.error_project', function() {
    fillErrorsView($(this).text());
  });
  $(document).on('click', '.error_preview', function() {
    displayError($(this).find('.error_code_mini').text());
    toggle('#errors_body_specific', '#error_expanded');
  });
}

function getProjectFromTitle(split) {
  var idx = split.indexOf("Meeting");
  split = split.slice(0, idx);
  var returner = "";
  for (var segment in split) {
    returner += split[segment] + " ";
  }
  return returner.trim();
}

function fillNotesView(project) {
  setTitle(project + " Meeting Notes");
  var meetings = getProjects()[project]["Meeting Notes"];
  for (var meeting in meetings) addMeeting(getMeetingNotes()[meeting].title, getMeetingNotes()[meeting].date);
}

function fillErrorsView(project) {
  setTitle(project + " Error Logs");
  var errors = getProjects()[project]["Errors"];
  for (var error in errors) addError(error, getErrors()[error].fatality);
}

function setTitle(title) {
  $('#title').text(title);
}

function refreshHome() {
  $('.home').click(function() {
    location.reload();
  });
}
