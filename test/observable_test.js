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

    assertTrue(observable.hasObserver(observers[0]));
    assertTrue(observable.hasObserver(observers[1]));
  }

});

TestCase("ObservableHasObserverTest", {
	"test should return true when has observer": function() {
		var observable = new tddjs.util.Observable();
		var observer = function() {};

		observable.addObserver(observer);

		assertTrue(observable.hasObserver(observer));
	},
	"test shoud return fales when no observers": function () {
		var observable = new tddjs.util.Observable();
		assertFalse(observable.hasObserver(function () {}));
	}
});

TestCase("ObservableNotifyObserversTest", {
	"test should call all observers": function () {
		var observable = new tddjs.util.Observable();
		var observer1 = function () {observer1.called = true; };
		var observer2 = function () {observer2.called = true; };

		observable.addObserver(observer1);
		observable.addObserver(observer2);
		observable.notifyObservers();

		assertTrue(observer1.called);
		assertTrue(observer2.called);
	}
});

function log(msg) {
		jstestdriver.console.log(msg);
}
