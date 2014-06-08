TestCase("Observable.observe", {
	setUp: function() {
		this.observable = Object.create(tddjs.util.observable);
	},

	tearDown: function() {
	},

  "test should store function": function () {
    var observers = [function () {}, function () {}];
		var observable = this.observable;


    observable.observe("event",observers[0]);
    observable.observe("event",observers[1]);

    assertTrue(observable.hasObserver("event", observers[0]));
    assertTrue(observable.hasObserver("event", observers[1]));
  }

});

TestCase("ObservableHasObserverTest", {
	setUp: function() {
		this.observable = Object.create(tddjs.util.observable);
	},

	"test should return true when has observe": function() {
		var observer = function() {};
		var observable = this.observable;


		observable.observe("event",observer);

		assertTrue(observable.hasObserver("event", observer));
	},
	"test shoud return fales when no observers": function () {
		var observable = this.observable;

		assertFalse(observable.hasObserver("event", function () {}));
	}
});

TestCase("ObservablenotifyTest", {
	setUp: function() {
		this.observable = Object.create(tddjs.util.observable);
	},
	"test should call all observers": function () {
		var observer1 = function () {observer1.called = true; };
		var observer2 = function () {observer2.called = true; };
		var observable = this.observable;


		observable.observe("event",observer1);
		observable.observe("event",observer2);
		observable.notify("event");

		assertTrue(observer1.called);
		assertTrue(observer2.called);
	},
	"test should pass through arguments": function () {
		var actual;
		var observable = this.observable;

		observable.observe("event",function () {
			actual = arguments;
		});
	
		observable.notify("event", "String", 1, 32);

		assertEquals(["String", 1, 32], actual);
	},
	"test should throw for uncallable observer": function () {
		var observable = this.observable;
		assertException(function () {
			observable.observe("event",{});
		}, "TypeError");
	},
	"test should notify all even when some fail": function () {
		var observer1 = function () { throw new Error("Oops"); };
		var observer2 = function () {observer2.called = true; };
		var observable = this.observable;

		observable.observe("event",observer1);
		observable.observe("event",observer2);
		observable.notify("event");

		assertTrue(observer2.called);
	},
	"test should call observers in the order they were added": function () {
		var calls = [];
		var observer1 = function () { calls.push(observer1); };
		var observer2 = function () { calls.push(observer2); };
		var observable = this.observable;
		
		observable.observe("event",observer1);
		observable.observe("event",observer2);

		observable.notify("event");

		assertEquals(observer1, calls[0]);
		assertEquals(observer2, calls[1]);
	},

	"test should not fail if no obserbers": function (){
		var observable = this.observable;
		assertNoException(function () {
			observable.notify("event");
		});
	},

	"test should notify relevant observers only": function () {
		var calls = [];
		var observable = this.observable;

		observable.observe("event", function () {
			calls.push("event");
		});

		observable.observe("other", function () {
			calls.push("other");
		});

		observable.notify("other");
		assertEquals(["other"], calls);

	}
});

function log(msg) {
		jstestdriver.console.log(msg);
}
