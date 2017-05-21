var database = firebase.database();

function getDatabase() {
  return database;
}

function updateData() {
  getDatabase().ref('Projects/').once('value').then(function(snapshot) {
    addData(getProjects(), snapshot.val());
  }).then(function() {
    fillErrorsProjectView();
  });
  getDatabase().ref('Meeting Notes/').once('value').then(function(snapshot) {
    addData(getMeetingNotes(), snapshot.val());
  }).then(function() {
    fillNotesProjectView();
  });
  getDatabase().ref('Errors/').once('value').then(function(snapshot) {
    addData(getErrors(), snapshot.val());
  }).then(function() {

  });
}
