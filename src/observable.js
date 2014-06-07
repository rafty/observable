
(function () {
	function Observable () {
		this.observers = [];
	}
	function addObserver(observer) {
		this.observers.push(observer);
	}

	Observable.prototype.addObserver = addObserver;

	tddjs.namespace("util");
	tddjs.util.Observable = Observable;

}());


