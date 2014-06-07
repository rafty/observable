/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, tddjs*/
TestCase("Observable.addObserver", {
	setUp: function() {
		log("setUp");
	},

	tearDown: function() {
		log("tearDown");
	},

  "test should store function": function () {
    var observable = new tddjs.util.Observable();
    var observers = [function () {}, function () {}];

    observable.addObserver(observers[0]);
    observable.addObserver(observers[1]);

    assertEquals(observers, observable.observers);
  }
});

function log(msg) {
		jstestdriver.console.log(msg);
}
