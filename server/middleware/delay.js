const DEFAULT_DELAY = 500; // 500ms

module.exports = function simulateDelay(delay = DEFAULT_DELAY) {
  return function (req, res, next) {
    setTimeout(next, delay);
  };
};
