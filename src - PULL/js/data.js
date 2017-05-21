var projects = {};
var meetingNotes = {};
var errors = {};

function addData(storage, data) {
  var arr = Object.keys(data);
  for (var i in arr) storage[arr[i]] = data[arr[i]];
}

function addProjects(data) {
  var arr = Object.keys(data);
  for (var i in arr) projects.push(arr[i]);
}

function getMeetingNotes() {
  return meetingNotes;
}

function getProjects() {
  return projects;
}

function getErrors() {
  return errors;
};

function findMeeting(meeting_name, project) {
  var meetings = projects[project]["Meeting Notes"];
  var returner = null;
  for (var meeting in meetings) {
    if (meetingNotes[meeting].title == meeting_name) {
      returner = meetingNotes[meeting];
      break;
    }
  }
  return returner;
}

function findError(error_title) {
  return errors[getKey(error_title)];
}

function getKey(title) {
  var arr = title.split(":");
  return arr[0].trim() + "_" + arr[1].trim();
}

function uncode(link) {
  var returner = "";
  for (var i = 0; i < link.length; i++) {
    if (link.charAt(i) == ",") {
      returner += ".";
    } else if (link.charAt(i) == "_") {
      returner += "/";
    } else {
      returner += link.charAt(i);
    }
  }
  return returner;
}
