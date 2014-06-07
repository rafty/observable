/*jslint indent: 2, onevar: false*/
/*globals TestCase, assertEquals, tddjs*/
TestCase("Observable.addObserver", {
  "test should store function": function () {
    var observable = new tddjs.util.Observable();
    var observer = function () {};

    observable.addObserver(observer);

    assertEquals(observer, observable.observers[0]);
  }
});
