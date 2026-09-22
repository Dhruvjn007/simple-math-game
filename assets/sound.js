(function(){
  var ctx = null;
  function getCtx(){
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, duration, type, peak){
    var c = getCtx();
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, c.currentTime);
    gain.gain.linearRampToValueAtTime(peak || 0.15, c.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  }
  window.SFX = {
    success: function(){ tone(880, 0.12, 'sine', 0.12); },
    error: function(){ tone(140, 0.15, 'square', 0.07); },
    tick: function(){ tone(1200, 0.04, 'sine', 0.05); },
    go: function(){ tone(660, 0.09, 'triangle', 0.1); }
  };
})();
