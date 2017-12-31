class FakeTicker {
  time = 0; // time represent days in virtual world
  tickTimeoutMs = 100; // one second in real life = 1 virtual day
  tickTimeoutMultiplier = 1;
  tickInterval = null;

  start() {
    this.tickInterval = setInterval(this.tick.bind(this), this.tickTimeoutMs / this.tickTimeoutMultiplier);
  }

  tick() {
    this.time++;
  }

  reset() {
    this.stop();
    this.start();
  }

  stop() {
    clearInterval(this.tickInterval);
  }
}

export default new FakeTicker();
