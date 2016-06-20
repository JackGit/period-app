import Victor from 'victor';

const hasTouch = 'ontouchstart' in window;
const START_EVENT = hasTouch ? 'touchstart' : 'mousedown';
const MOVE_EVENT = hasTouch ? 'touchmove' : 'mousemove';
const END_EVENT = hasTouch ? 'touchend' : 'mouseup';
const CANCEL_EVENT = hasTouch ? 'touchcancel' : 'mouseup';

function getPointFromEvent (e) {
  return hasTouch
    ? {x: e.touches[0].pageX, y: e.touches[0].pageY}
    : {x: e.pageX, y: e.pageY};
}

function getVector () {
  var from = {x: 0, y: 0};
  var to = {x: 0, y: 0};

  if (arguments.length === 2) {
    from = arguments[0];
    to = arguments[1];
  }

  if (arguments.length === 4) {
    from.x = arguments[0];
    from.y = arguments[1];
    to.x = arguments[2];
    to.y = arguments[3];
  }

  return {x: to.x - from.x, y: to.y - from.y};
}

function getDeg (from, to) {
  var v = getVector(from, to);
  return Math.round(new Victor(v.x, v.y).angleDeg());
}

function getDistance (p1, p2) {
  return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function Spinner (el, options) {
  var defaultOptions = {
    min: 35,
    max: 42,
    step: 0.1,
    zeroDegOffset: 45,
    degSpan: 300,
    radius: 100,
    onRotation: function (value, deg) {
      console.log(value, deg);
    }
  };

  this.el = el;
  this.options = Object.assign(defaultOptions, options);
  this.spinnerEl = null;

  this.started = false;
  this.deltaDeg = 0;
  this.lastDeg = 0;

  this.centerPoint = null;
  this.deg = 0;
  this.value = 0;
  this.stepDeg = Math.floor(this.options.degSpan / ((this.options.max - this.options.min) / this.options.step));
  this.maxDeg = this.stepDeg * (this.options.max - this.options.min) / this.options.step + this.options.zeroDegOffset;
  this.minDeg = 0 + this.options.zeroDegOffset;

  this._init();
}

Spinner.prototype = {
  constructor: Spinner,

  _init: function () {
    this._render();
    this._bind();

    this._rotate(this.options.zeroDegOffset);
  },

  _render: function () {
    this.wrapperEl = this._createWrapper();
    this.spinnerEl = this._createSpinner();
    this.cursorEl = this._createCursor();

    this.spinnerEl.appendChild(this.cursorEl);
    this.wrapperEl.appendChild(this.spinnerEl);
    this.el.appendChild(this.wrapperEl);
  },

  _createSpinner: function () {
    var div = document.createElement('div');

    div.style.borderRadius = '50%';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.backgroundColor = 'red';
    div.style.transition = 'transform .1s ease';
    div.style.display = 'flex';
    div.style.flexDirection = 'row';
    div.style.justifyContent = 'center';
    return div;
  },

  _createCursor: function () {
    var div = document.createElement('div');

    div.style.display = 'inline-block';
    div.style.borderLeft = '1px solid black';
    div.style.height = '10px';

    return div;
  },

  _createWrapper: function () {
    var div = document.createElement('div');
    return div;
  },

  _getCenterPoint: function () {
    var bcr;

    if (!this.centerPoint) {
      bcr = this.spinnerEl.getBoundingClientRect();
      this.centerPoint = {
        x: bcr.left + bcr.width / 2,
        y: bcr.top + bcr.height / 2
      };
    }

    return this.centerPoint;
  },

  _bind: function () {
    this.el.addEventListener(START_EVENT, this._start.bind(this));
    this.el.addEventListener(MOVE_EVENT, this._move.bind(this));
    this.el.addEventListener(END_EVENT, this._end.bind(this));
    this.el.addEventListener(CANCEL_EVENT, this._cancel.bind(this));
  },

  _start: function (e) {
    var point = getPointFromEvent(e);

    if (getDistance(this._getCenterPoint(), point) < 100 / 4) {
      console.log('too close to the center');
      return;
    }

    this.lastDeg = getDeg(this._getCenterPoint(), point);
    this.started = true;
  },

  _move: function (e) {
    if (!this.started) {
      return;
    }

    var point = getPointFromEvent(e);
    var deg = getDeg(this._getCenterPoint(), point);

    this.deltaDeg = deg - this.lastDeg;

    if (this.deltaDeg > 300) {
      // move from -180 -> 180
      this.deltaDeg -= 360;
    } else if (this.deltaDeg < -300) {
      // move from 180 -> -180
      this.deltaDeg += 360;
    }

    if (this.deltaDeg > 0 && this.deg >= this.maxDeg) {
      this.deg = this.maxDeg;
      this._rotate(this.deg);
      return;
    }
    if (this.deltaDeg < 0 && this.deg <= this.minDeg) {
      this.deg = this.minDeg;
      this._rotate(this.deg);
      return;
    }

    this.lastDeg = deg;
    this.deg += this.deltaDeg;

    this._rotate(this.deg);
    e.preventDefault();
  },

  _end: function () {
    this.started = false;
  },

  _cancel: function () {
    this.started = false;
  },

  _rotate: function (deg) {
    this.spinnerEl.style.transform = 'rotateZ(' + deg + 'deg)';
    this.options.onRotation.bind(this)(this.options.min + (deg - this.options.zeroDegOffset) / this.stepDeg * this.options.step, deg);
  }
};

export default window.Spinner = Spinner;
