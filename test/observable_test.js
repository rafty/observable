TestCase("Observable.observe", {
	setUp: function() {
		this.observable = Object.create(tddjs.util.observable);
	},

	tearDown: function() {
	},

  "test should store function": function () {
    var observers = [function () {}, function () {}];

    this.observable.observe(observers[0]);
    this.observable.observe(observers[1]);

    assertTrue(this.observable.hasObserver(observers[0]));
    assertTrue(this.observable.hasObserver(observers[1]));
  }

});

TestCase("ObservableHasObserverTest", {
	setUp: function() {
		this.observable = Object.create(tddjs.util.observable);
	},

	"test should return true when has observe": function() {
		var observer = function() {};

		this.observable.observe(observer);

		assertTrue(this.observable.hasObserver(observer));
	},
	"test shoud return fales when no observers": function () {
		assertFalse(this.observable.hasObserver(function () {}));
	}
});

TestCase("ObservablenotifyTest", {
	setUp: function() {
		this.observable = Object.create(tddjs.util.observable);
	},
	"test should call all observers": function () {
		var observer1 = function () {observer1.called = true; };
		var observer2 = function () {observer2.called = true; };

		this.observable.observe(observer1);
		this.observable.observe(observer2);
		this.observable.notify();

		assertTrue(observer1.called);
		assertTrue(observer2.called);
	},
	"test should pass through arguments": function () {
		var actual;

		this.observable.observe(function () {
			actual = arguments;
		});
	
		this.observable.notify("String", 1, 32);

		assertEquals(["String", 1, 32], actual);
	},
	"test should throw for uncallable observer": function () {

		assertException(function () {
			this.observable.observe({});
		}, "TypeError");
	},
	"test should notify all even when some fail": function () {
		var observer1 = function () { throw new Error("Oops"); };
		var observer2 = function () {observer2.called = true; };

		this.observable.observe(observer1);
		this.observable.observe(observer2);
		this.observable.notify();

		assertTrue(observer2.called);
	},
	"test should call observers in the order they were added": function () {
		var calls = [];
		var observer1 = function () { calls.push(observer1); };
		var observer2 = function () { calls.push(observer2); };
		
		this.observable.observe(observer1);
		this.observable.observe(observer2);

		this.observable.notify();

		assertEquals(observer1, calls[0]);
		assertEquals(observer2, calls[1]);
	}
/*	,
	"test should not fail if no obserbers": function (){

		assertNoException(function () {
			this.observable.notify();
		});
	}
*/
});

function log(msg) {
		jstestdriver.console.log(msg);
}
