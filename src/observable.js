
(function () {
	function Observable () {
		this.observers = [];
	}
	function addObserver(observer) {
		this.observers.push(observer);
	}
	function hasObserver(observer) {
		//return this.observers.indexOf(observer) >= 0; 
		for (var i = 0, l = this.observers.length; i < l; i++) {
			if (this.observers[i] == observer) {
				return true;
			}
		}

		return false;
	}

	Observable.prototype.addObserver = addObserver;
	Observable.prototype.hasObserver = hasObserver;

	tddjs.namespace("util");
	tddjs.util.Observable = Observable;

}());


