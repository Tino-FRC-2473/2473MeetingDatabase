var database = firebase.database();

function getDatabase() {
  return database;
}

function updateMeeting(obj) {
  var key = filter(obj.date, "/") + ":" + filter(obj.title, " ");
  var imgs = Object.keys(obj.imgs);
  var urls = Object.keys(obj.urls);
  var u = {};
  for (var url in urls) {
    u[stripURL(urls[url])] = true;
  }
  obj.urls = u;
  var m = {};
  for (var img in imgs) {
    m[stripURL(imgs[img])] = true;
  }
  obj.imgs = m;
  getDatabase().ref('Projects/' + obj.project_name + '/Meeting Notes/' + key).set(true);
  getDatabase().ref('Meeting Notes/' + key).set(obj);
  location.reload();
}

function updateError(obj) {
  getDatabase().ref('Projects/' + obj.project + '/Errors/' + obj.message).set(true);
  getDatabase().ref('Errors/' + obj.message).set(obj);
  location.reload();
}

function updateOptions() {
  getDatabase().ref('Projects/').once('value').then(function(snapshot) {
    var projects = Object.keys(snapshot.val());
    for (var i in projects) {
      addProject(projects[i]);
    }
    appendOptions();
  });
}

function filter(text, separater) {
  var returner = "",
    split = text.split(separater);
  for (var section in split) {
    section < split.length - 1 ? returner += split[section] + "_" : returner += split[section];
  }
  return returner;
}

function stripURL(url) {
  var returner = "";
  for (var i = 0; i < url.length; i++) {
    if (url.charAt(i) == '.') {
      returner += ',';
    } else if (url.charAt(i) == '/') {
      returner += '_';
    } else {
      returner += url.charAt(i);
    }
  }
  return returner;
}
