
(function () {
	function Observable () {
		this.observers = [];
	}
	function addObserver(observer) {
		if (typeof observer != "function") {
			throw new TypeError("observer is not function");
		}

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
	function notifyObservers() {
		for (var i = 0, l = this.observers.length; i < l; i++) {
			try {
				this.observers[i].apply(this, arguments);
			} catch (e) {}
		}
	}

	Observable.prototype.addObserver = addObserver;
	Observable.prototype.hasObserver = hasObserver;
	Observable.prototype.notifyObservers = notifyObservers;

	tddjs.namespace("util");
	tddjs.util.Observable = Observable;

}());


