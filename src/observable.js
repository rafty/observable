
(function () {
	function Observable () {
	}
	function addObserver(observer) {
		this.observers = [observer];
	}

	Observable.prototype.addObserver = addObserver;

	tddjs.namespace("util");
	tddjs.util.Observable = Observable;

}());


