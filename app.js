/**
 * app.js - Retro-arcade Space Shooter Typing Tutor Game Engine
 * Featuring Web Audio API synthesizers, canvas particle engine, and state machine.
 */

// --- 1. GAME LEVEL CONFIGURATION ---
const STAGES = [
  // SECTOR 1: HOME ROW CORE
  {
    id: '1.1',
    sector: 1,
    sectorTitle: 'Sector 1: Home Row Core',
    title: 'Warmup - F & J',
    keys: 'F & J',
    keyArray: ['f', 'j'],
    targetWpm: 12,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['f', 'j', 'ff', 'jj', 'fj', 'jf', 'ffj', 'jjf', 'fjf', 'jfj']
  },
  {
    id: '1.2',
    sector: 1,
    sectorTitle: 'Sector 1: Home Row Core',
    title: 'Middle Fingers - D & K',
    keys: 'D & K',
    keyArray: ['d', 'k'],
    targetWpm: 14,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['d', 'k', 'dk', 'kd', 'dd', 'kk', 'fd', 'jk', 'df', 'kj', 'fjd', 'jfk']
  },
  {
    id: '1.3',
    sector: 1,
    sectorTitle: 'Sector 1: Home Row Core',
    title: 'Ring Fingers - S & L',
    keys: 'S & L',
    keyArray: ['s', 'l'],
    targetWpm: 16,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['s', 'l', 'sl', 'ls', 'ss', 'll', 'ds', 'kl', 'sd', 'lk', 'fs', 'jl', 'sfd', 'lkj']
  },
  {
    id: '1.4',
    sector: 1,
    sectorTitle: 'Sector 1: Home Row Core',
    title: 'Pinkies - A & ;',
    keys: 'A & ;',
    keyArray: ['a', ';'],
    targetWpm: 18,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['a', ';', 'a;', ';a', 'aa', ';;', 'sa', 'l;', 'as', ';l', 'da', 'k;', 'fas', 'jl;']
  },
  {
    id: '1.5',
    sector: 1,
    sectorTitle: 'Sector 1: Home Row Core',
    title: 'BOSS FIGHT: Mainframe Hack',
    keys: 'Home Row Words',
    keyArray: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    targetWpm: 20,
    isBoss: true,
    enemiesToSpawn: 20,
    drillWords: ['as', 'sad', 'lad', 'lass', 'fad', 'salad', 'dada', 'flak', 'fall', 'alkali', 'ask', 'alaska', 'adds', 'jald', 'kafka', 'dallas', 'skald', 'flask', 'falls', 'slash']
  },

  // SECTOR 2: UPPER ROW ACCESS
  {
    id: '2.1',
    sector: 2,
    sectorTitle: 'Sector 2: Upper Row Access',
    title: 'Stretch Keys - G & H',
    keys: 'G & H',
    keyArray: ['g', 'h'],
    targetWpm: 22,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['g', 'h', 'gh', 'hg', 'gg', 'hh', 'fg', 'jh', 'gf', 'hj', 'fgh', 'jhg', 'gas', 'had', 'lash', 'flag', 'half', 'glad']
  },
  {
    id: '2.2',
    sector: 2,
    sectorTitle: 'Sector 2: Upper Row Access',
    title: 'Middle Fingers - E & I',
    keys: 'E & I',
    keyArray: ['e', 'i'],
    targetWpm: 24,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['e', 'i', 'ei', 'ie', 'ee', 'ii', 'de', 'ki', 'ed', 'ik', 'fed', 'ilk', 'life', 'side', 'idea', 'hike', 'seed', 'file', 'disk']
  },
  {
    id: '2.3',
    sector: 2,
    sectorTitle: 'Sector 2: Upper Row Access',
    title: 'Index Row - R & U',
    keys: 'R & U',
    keyArray: ['r', 'u'],
    targetWpm: 26,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['r', 'u', 'ru', 'ur', 'rr', 'uu', 'fr', 'ju', 'rf', 'uj', 'fur', 'red', 'run', 'ride', 'user', 'rude', 'rule', 'fire', 'sure', 'dust']
  },
  {
    id: '2.4',
    sector: 2,
    sectorTitle: 'Sector 2: Upper Row Access',
    title: 'Upper Stretch - T & Y',
    keys: 'T & Y',
    keyArray: ['t', 'y'],
    targetWpm: 28,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['t', 'y', 'ty', 'yt', 'tt', 'yy', 'ft', 'jy', 'tf', 'yj', 'try', 'the', 'yet', 'toy', 'day', 'easy', 'rust', 'dust', 'city', 'duty', 'study']
  },
  {
    id: '2.5',
    sector: 2,
    sectorTitle: 'Sector 2: Upper Row Access',
    title: 'BOSS FIGHT: Rover Intercept',
    keys: 'Sectors 1 & 2 Words',
    keyArray: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'e', 'i', 'r', 'u', 't', 'y'],
    targetWpm: 30,
    isBoss: true,
    enemiesToSpawn: 22,
    drillWords: ['the', 'they', 'red', 'here', 'huge', 'tree', 'light', 'right', 'fight', 'guide', 'tide', 'jelly', 'digit', 'fruit', 'heart', 'dirty', 'third', 'heavy', 'style', 'sight', 'earth', 'laser', 'shield', 'fighter', 'drifter']
  },

  // SECTOR 3: COMPLETE KEYBOARD & SYMBOLS
  {
    id: '3.1',
    sector: 3,
    sectorTitle: 'Sector 3: Complete Keyboard & Symbols',
    title: 'Ring Keys - W & O',
    keys: 'W & O',
    keyArray: ['w', 'o'],
    targetWpm: 32,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['w', 'o', 'wo', 'ow', 'sw', 'lo', 'ws', 'ol', 'how', 'who', 'two', 'out', 'word', 'work', 'slow', 'wire', 'iron', 'door', 'grow', 'show']
  },
  {
    id: '3.2',
    sector: 3,
    sectorTitle: 'Sector 3: Complete Keyboard & Symbols',
    title: 'Pinky Keys - Q & P',
    keys: 'Q & P',
    keyArray: ['q', 'p'],
    targetWpm: 33,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['q', 'p', 'qp', 'pq', 'aq', ';p', 'qa', 'p;', 'quit', 'quick', 'play', 'page', 'power', 'point', 'speed', 'queen', 'pilot', 'pixel']
  },
  {
    id: '3.3',
    sector: 3,
    sectorTitle: 'Sector 3: Complete Keyboard & Symbols',
    title: 'Bottom Index & Middle - C & M',
    keys: 'C & M',
    keyArray: ['c', 'm'],
    targetWpm: 34,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['c', 'm', 'cm', 'mc', 'dc', 'km', 'cd', 'mk', 'code', 'come', 'much', 'make', 'space', 'micro', 'cyber', 'mouse', 'music', 'crime', 'camp']
  },
  {
    id: '3.4',
    sector: 3,
    sectorTitle: 'Sector 3: Complete Keyboard & Symbols',
    title: 'Bottom Row - Z, X, V, B, N, Comma, Period',
    keys: 'Z, X, V, B, N, , & .',
    keyArray: ['z', 'x', 'v', 'b', 'n', ',', '.'],
    targetWpm: 35,
    isBoss: false,
    enemiesToSpawn: 25,
    drillWords: ['z', 'x', 'v', 'b', 'n', ',', '.', 'zone', 'next', 'view', 'base', 'node', 'zero', 'vector', 'galaxy', 'matrix', 'satellites', 'combos.', 'shields,']
  },
  {
    id: '3.5',
    sector: 3,
    sectorTitle: 'Sector 3: Complete Keyboard & Symbols',
    title: 'FINAL SHOWDOWN: Defeat Dr. Zero!',
    keys: 'Full Mainframe Sentences',
    keyArray: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ',', '.'],
    targetWpm: 38,
    isBoss: true,
    enemiesToSpawn: 18,
    drillWords: [
      'save the mainframe.',
      'intercept the cyber missiles.',
      'reboot defenses now.',
      'fire lasers immediately.',
      'system breach detected.',
      'rebuild defensive shields.',
      'dr zero will not win.',
      'typing speed is maximizing.',
      'earth is saved today.',
      'destroy all corrupt code.'
    ]
  }
];

// Map character standard keystroke strings to their matching virtual keyboard DOM key IDs.
const KEY_MAP = {
  'a': 'key-KeyA', 'b': 'key-KeyB', 'c': 'key-KeyC', 'd': 'key-KeyD', 'e': 'key-KeyE',
  'f': 'key-KeyF', 'g': 'key-KeyG', 'h': 'key-KeyH', 'i': 'key-KeyI', 'j': 'key-KeyJ',
  'k': 'key-KeyK', 'l': 'key-KeyL', 'm': 'key-KeyM', 'n': 'key-KeyN', 'o': 'key-KeyO',
  'p': 'key-KeyP', 'q': 'key-KeyQ', 'r': 'key-KeyR', 's': 'key-KeyS', 't': 'key-KeyT',
  'u': 'key-KeyU', 'v': 'key-KeyV', 'w': 'key-KeyW', 'x': 'key-KeyX', 'y': 'key-KeyY',
  'z': 'key-KeyZ',
  ';': 'key-Semicolon', ':': 'key-Semicolon',
  ',': 'key-Comma', '<': 'key-Comma',
  '.': 'key-Period', '>': 'key-Period',
  '/': 'key-Slash', '?': 'key-Slash',
  ' ': 'key-Space',
  '-': 'key-Minus', '_': 'key-Minus',
  '=': 'key-Equal', '+': 'key-Equal',
  '`': 'key-Backquote', '~': 'key-Backquote',
  '1': 'key-Digit1', '!': 'key-Digit1',
  '2': 'key-Digit2', '@': 'key-Digit2',
  '3': 'key-Digit3', '#': 'key-Digit3',
  '4': 'key-Digit4', '$': 'key-Digit4',
  '5': 'key-Digit5', '%': 'key-Digit5',
  '6': 'key-Digit6', '^': 'key-Digit6',
  '7': 'key-Digit7', '&': 'key-Digit7',
  '8': 'key-Digit8', '*': 'key-Digit8',
  '9': 'key-Digit9', '(': 'key-Digit9',
  '0': 'key-Digit0', ')': 'key-Digit0'
};

// --- 2. AUDIO SYNTHESIS INTERFACE (Web Audio API) ---
class SoundFXManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (browser safety restriction)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playLaser() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now); // high pitch
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.12); // sweep down

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playExplosion() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Create low pitch rumble oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(10, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);

    // Add high frequency white noise burst
    try {
      const bufferSize = this.ctx.sampleRate * 0.25; // 0.25 seconds
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      // Hook up a lowpass filter to make it sound muffled and booming
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.25);
    } catch (e) {
      // White noise buffer creation safety fallback
    }
  }

  playComboUp() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.06, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.005, noteTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.1);
    });
  }

  playBuzzer() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now); // low buzz

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  playShieldHit() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playBossAlarm() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Two-tone digital klaxon alarm
    for (let i = 0; i < 3; i++) {
      const cycleStart = now + i * 0.5;

      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(440, cycleStart);
      osc1.frequency.setValueAtTime(380, cycleStart + 0.25);

      gain1.gain.setValueAtTime(0.08, cycleStart);
      gain1.gain.exponentialRampToValueAtTime(0.001, cycleStart + 0.48);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(cycleStart);
      osc1.stop(cycleStart + 0.5);
    }
  }
}

const AudioSFX = new SoundFXManager();

// --- 3. STATE MANAGER AND DATA STORAGE ---
class GameManager {
  constructor() {
    this.activeStage = STAGES[0];
    this.unlockedStages = new Set(['1.1']);
    this.stageStars = {};

    this.score = 0;
    this.shield = 100;
    this.combo = 1;
    this.comboCount = 0;
    this.correctCount = 0;
    this.totalKeypresses = 0;
    this.typos = 0;
    this.startTime = null;
    this.enemiesSpawned = 0;
    this.enemiesCleared = 0;
    this.targetWpm = 15;

    // Spaceship settings
    this.shipX = 450;
    this.shipY = 380;
    this.shipTargetX = 450;

    // Canvas dimensions (will align with actual canvas elements)
    this.width = 900;
    this.height = 420;

    // Screen states: 'menu', 'playing', 'paused', 'clear', 'fail'
    this.state = 'menu';

    this.enemies = [];
    this.lasers = [];
    this.particles = [];

    this.activeTarget = null; // currently targeted enemy drone

    this.spawnTimer = 0;
    this.spawnInterval = 3000; // time in ms
    this.screenFlashTime = 0; // for typo flashes
    this.bossWarningTimer = 0;

    this.loadSaveState();
  }

  loadSaveState() {
    try {
      const savedUnlocked = localStorage.getItem('mwt_unlocked');
      const savedStars = localStorage.getItem('mwt_stars');

      if (savedUnlocked) {
        const list = JSON.parse(savedUnlocked);
        list.forEach(id => this.unlockedStages.add(id));
      }

      if (savedStars) {
        this.stageStars = JSON.parse(savedStars);
      }
    } catch (e) {
      console.warn("Could not load save state from local storage", e);
    }
  }

  saveState() {
    try {
      const unlockedList = Array.from(this.unlockedStages);
      localStorage.setItem('mwt_unlocked', JSON.stringify(unlockedList));
      localStorage.setItem('mwt_stars', JSON.stringify(this.stageStars));
    } catch (e) {
      console.warn("Could not write save state to local storage", e);
    }
  }

  unlockNextStage(currentId) {
    const currentIndex = STAGES.findIndex(s => s.id === currentId);
    if (currentIndex !== -1 && currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1];
      this.unlockedStages.add(nextStage.id);
      this.saveState();
      return nextStage.id;
    }
    return null;
  }

  recordStars(stageId, stars) {
    const currentStars = this.stageStars[stageId] || 0;
    if (stars > currentStars) {
      this.stageStars[stageId] = stars;
      this.saveState();
    }
  }

  resetStats() {
    this.score = 0;
    this.shield = 100;
    this.combo = 1;
    this.comboCount = 0;
    this.correctCount = 0;
    this.totalKeypresses = 0;
    this.typos = 0;
    this.startTime = null;
    this.enemiesSpawned = 0;
    this.enemiesCleared = 0;
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.activeTarget = null;
    this.spawnTimer = 0;
    this.bossWarningTimer = 0;

    // Set target WPM
    this.targetWpm = this.activeStage.targetWpm;

    // Spawn speed based on stage difficulty
    this.spawnInterval = Math.max(1000, 3200 - (this.activeStage.targetWpm * 50));
    if (this.activeStage.isBoss) {
      this.spawnInterval *= 0.85; // boss waves spawn slightly faster
    }
  }
}

const Game = new GameManager();

// --- 4. GAME RENDERING CANVAS & PARTICLES ENGINE ---
class LaserBolt {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.life = 1.0; // from 1.0 down to 0.0
    this.decay = 10; // decays per frame or time
  }

  update(dt) {
    this.life -= dt * 8; // fade out in about 125ms
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.lineWidth = 3 * this.life;
    ctx.strokeStyle = `rgba(0, 240, 255, ${this.life})`;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12 * this.life;

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();

    // Core white beam
    ctx.lineWidth = 1 * this.life;
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.life})`;
    ctx.stroke();

    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3.5;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1.0;
    this.decay = 0.02 + Math.random() * 0.04;
    this.size = 1.5 + Math.random() * 2.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // light gravity pull
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6 * this.life;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class DroneEnemy {
  constructor(id, text, x, y, speed, isBossMinion = false) {
    this.id = id;
    this.text = text;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isBoss = isBossMinion;

    this.typedIndex = 0; // number of characters matching
    this.width = isBossMinion ? 160 : 75;
    this.height = 36;
    this.targetY = y;

    // Visual indicators
    this.pulseTime = Math.random() * 10;
    this.color = isBossMinion ? '#ff007f' : '#00f0ff';
    this.glowColor = isBossMinion ? 'rgba(255, 0, 127, 0.4)' : 'rgba(0, 240, 255, 0.3)';
    this.shieldHp = 100;
  }

  update(dt) {
    this.y += this.speed * dt * 60;
    this.pulseTime += dt * 4;
  }

  draw(ctx, isTargeted) {
    ctx.save();

    // Pulse animation factor
    const pulse = Math.sin(this.pulseTime) * 3;
    const boxWidth = this.width + pulse;
    const boxHeight = this.height;

    // Draw glowing drone capsule outline
    ctx.lineWidth = isTargeted ? 2.5 : 1.5;
    ctx.strokeStyle = isTargeted ? '#ff007f' : this.color;
    ctx.shadowColor = isTargeted ? '#ff007f' : this.color;
    ctx.shadowBlur = isTargeted ? 14 : 8;

    // Glassmorphic panel behind drone
    ctx.fillStyle = 'rgba(10, 12, 34, 0.8)';

    // Draw capsule path
    ctx.beginPath();
    const radius = 6;
    const px = this.x - boxWidth / 2;
    const py = this.y - boxHeight / 2;

    ctx.moveTo(px + radius, py);
    ctx.lineTo(px + boxWidth - radius, py);
    ctx.quadraticCurveTo(px + boxWidth, py, px + boxWidth, py + radius);
    ctx.lineTo(px + boxWidth, py + boxHeight - radius);
    ctx.quadraticCurveTo(px + boxWidth, py + boxHeight, px + boxWidth - radius, py + boxHeight);
    ctx.lineTo(px + radius, py + boxHeight);
    ctx.quadraticCurveTo(px, py + boxHeight, px, py + boxHeight - radius);
    ctx.lineTo(px, py + radius);
    ctx.quadraticCurveTo(px, py, px + radius, py);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw drone wing antenna decals
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    // left antenna wing
    ctx.moveTo(px, py + 12);
    ctx.lineTo(px - 10, py + 6);
    ctx.lineTo(px - 10, py + 18);
    // right antenna wing
    ctx.moveTo(px + boxWidth, py + 12);
    ctx.lineTo(px + boxWidth + 10, py + 6);
    ctx.lineTo(px + boxWidth + 10, py + 18);
    ctx.stroke();

    // Draw horizontal progress bracket indicator for boss
    if (this.isBoss) {
      const healthPct = 1 - (this.typedIndex / this.text.length);
      ctx.fillStyle = 'rgba(255, 0, 127, 0.2)';
      ctx.fillRect(px + 4, py + boxHeight - 6, (boxWidth - 8), 3);
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(px + 4, py + boxHeight - 6, (boxWidth - 8) * (1 - healthPct), 3);
    }

    // DRAW TEXT INSIDE DRONE
    ctx.font = this.isBoss ? "bold 20px 'Orbitron', sans-serif" : "bold 22px 'Orbitron', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textY = this.y;
    const textWidth = ctx.measureText(this.text).width;

    // Separate text into typed and untyped parts
    const typedText = this.text.substring(0, this.typedIndex);
    const untypedText = this.text.substring(this.typedIndex);

    // Render a high-contrast black outline first to ensure high legibility against the starfield
    ctx.save();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    
    if (this.typedIndex === 0) {
      ctx.strokeText(this.text, this.x, textY);
      ctx.restore();
      
      // None typed yet, standard clean rendering
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.text, this.x, textY);
    } else {
      const typedWidth = ctx.measureText(typedText).width;
      const startX = this.x - textWidth / 2;

      ctx.textAlign = 'left';
      ctx.strokeText(typedText, startX, textY);
      ctx.strokeText(untypedText, startX + typedWidth, textY);
      ctx.restore();

      // Split rendering offset calculation
      const startXFill = this.x - textWidth / 2;

      // Draw typed characters (neon green glow)
      ctx.save();
      ctx.fillStyle = '#39ff14';
      ctx.shadowColor = '#39ff14';
      ctx.shadowBlur = 6;
      ctx.textAlign = 'left';
      ctx.fillText(typedText, startXFill, textY);
      ctx.restore();

      // Draw untyped characters (plain white)
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText(untypedText, startXFill + typedWidth, textY);
      ctx.restore();
    }

    // Highlight cursor underline on the next target character
    if (isTargeted && this.typedIndex < this.text.length) {
      const nextChar = this.text.charAt(this.typedIndex);
      const typedWidth = ctx.measureText(typedText).width;
      const charWidth = ctx.measureText(nextChar).width;
      const startX = this.x - textWidth / 2;

      ctx.strokeStyle = '#fffb00';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(startX + typedWidth, this.y + 11);
      ctx.lineTo(startX + typedWidth + charWidth, this.y + 11);
      ctx.stroke();
    }

    ctx.restore();
  }
}

// --- 5. GAME ENGINE CORE CONTROLLER ---
class GameEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.lastTime = 0;

    // Cache DOM Elements
    this.wpmEl = document.getElementById('wpmCounter');
    this.accuracyEl = document.getElementById('accuracyCounter');
    this.comboEl = document.getElementById('comboMultiplier');
    this.comboFillEl = document.getElementById('comboFill');
    this.scoreEl = document.getElementById('scoreCounter');
    this.shieldFillEl = document.getElementById('shieldFill');
    this.shieldPercentEl = document.getElementById('shieldPercent');
    this.activeStageNameEl = document.getElementById('activeStageName');
    this.activeStageKeysEl = document.getElementById('activeStageKeys');
    this.bossWarningEl = document.getElementById('bossWarningBanner');
    this.promptOverlayEl = document.getElementById('keyboardPromptOverlay');
    this.promptTextEl = document.getElementById('keyboardPromptText');
    this.sectorsListEl = document.getElementById('sectorsList');

    // Modals
    this.modalWelcome = document.getElementById('modalWelcome');
    this.modalStageClear = document.getElementById('modalStageClear');
    this.modalGameOver = document.getElementById('modalGameOver');
    this.sidebarSectors = document.getElementById('sidebarSectors');

    this.audioToggleBtn = document.getElementById('btnToggleAudio');

    this.initEvents();
    this.renderSectorsSidebar();
    this.updateHUD();
  }

  initCanvas() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Update layout limits
    Game.width = this.canvas.width;
    Game.height = this.canvas.height;
    Game.shipX = Game.width / 2;
    Game.shipY = Game.height - 35;
    Game.shipTargetX = Game.width / 2;
  }

  initEvents() {
    // Top bar actions
    this.audioToggleBtn.addEventListener('click', () => {
      const enabled = AudioSFX.toggle();
      const onSvg = this.audioToggleBtn.querySelector('.audio-on');
      const offSvg = this.audioToggleBtn.querySelector('.audio-off');
      if (enabled) {
        onSvg.classList.remove('hidden');
        offSvg.classList.add('hidden');
        AudioSFX.init();
      } else {
        onSvg.classList.add('hidden');
        offSvg.classList.remove('hidden');
      }
    });

    document.getElementById('btnOpenSidebar').addEventListener('click', () => {
      this.renderSectorsSidebar();
      this.sidebarSectors.classList.remove('hidden');
    });

    document.getElementById('btnCloseSidebar').addEventListener('click', () => {
      this.sidebarSectors.classList.add('hidden');
    });

    document.getElementById('sidebarBackdrop').addEventListener('click', () => {
      this.sidebarSectors.classList.add('hidden');
    });

    // Welcome Screen Init
    document.getElementById('btnStartGame').addEventListener('click', () => {
      AudioSFX.init();
      this.modalWelcome.classList.add('hidden');
      this.readyStage();
    });

    // Victory Screen Actions
    document.getElementById('btnNextStage').addEventListener('click', () => {
      const nextId = Game.unlockNextStage(Game.activeStage.id);
      if (nextId) {
        const next = STAGES.find(s => s.id === nextId);
        if (next) Game.activeStage = next;
      }
      this.modalStageClear.classList.add('hidden');
      this.readyStage();
    });

    document.getElementById('btnReplayStage').addEventListener('click', () => {
      this.modalStageClear.classList.add('hidden');
      this.readyStage();
    });

    document.getElementById('btnReturnMenu').addEventListener('click', () => {
      this.modalStageClear.classList.add('hidden');
      this.sidebarSectors.classList.remove('hidden');
      this.readyStage();
    });

    // Game Over Actions
    document.getElementById('btnRetryStage').addEventListener('click', () => {
      this.modalGameOver.classList.add('hidden');
      this.readyStage();
    });

    document.getElementById('btnReturnMenuFromFail').addEventListener('click', () => {
      this.modalGameOver.classList.add('hidden');
      this.sidebarSectors.classList.remove('hidden');
      this.readyStage();
    });

    // Key event bindings
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  readyStage() {
    Game.state = 'ready';
    Game.resetStats();
    this.updateHUD();
    this.clearNextKeyHighlights();

    // Draw keyboard helper highlighted keys for the stage
    this.highlightStageKeys();

    this.promptOverlayEl.classList.remove('hidden');
    this.promptTextEl.innerText = "PRESS SPACEBAR TO INITIATE GRID DEFENSE";
    this.bossWarningEl.classList.add('hidden');

    this.initCanvas();
    this.drawSceneStatic();
  }

  startStage() {
    AudioSFX.init();
    Game.state = 'playing';
    Game.startTime = Date.now();
    this.promptOverlayEl.classList.add('hidden');

    // Trigger Boss siren sound if stage is a boss fight
    if (Game.activeStage.isBoss) {
      this.bossWarningEl.classList.remove('hidden');
      AudioSFX.playBossAlarm();
      setTimeout(() => {
        this.bossWarningEl.classList.add('hidden');
      }, 3000);
    }

    this.lastTime = performance.now();
    cancelAnimationFrame(Game.gameLoopId);
    Game.gameLoopId = requestAnimationFrame((t) => this.gameLoop(t));

    this.updateNextTargetKeyHighlight();
  }

  // Highlights all keys that are part of the learning stage pool
  highlightStageKeys() {
    const keyArray = Game.activeStage.keyArray;
    keyArray.forEach(char => {
      const code = KEY_MAP[char.toLowerCase()];
      if (code) {
        const keyEl = document.getElementById(code);
        if (keyEl) {
          keyEl.style.boxShadow = `inset 0 0 5px rgba(255, 255, 255, 0.4)`;
          keyEl.style.borderColor = `rgba(255, 255, 255, 0.8)`;
        }
      }
    });
  }

  clearNextKeyHighlights() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
      key.classList.remove('next-key-target');
      key.style.boxShadow = '';
      key.style.borderColor = '';
    });
  }

  updateNextTargetKeyHighlight() {
    this.clearNextKeyHighlights();

    // Re-apply stage background guides
    this.highlightStageKeys();

    if (Game.state !== 'playing') return;

    let targetChar = null;

    if (Game.activeTarget) {
      // Find the next character in the current word target
      targetChar = Game.activeTarget.text.charAt(Game.activeTarget.typedIndex);
    } else {
      // No active target, highlight the starting keys of all currently spawned drones
      if (Game.enemies.length > 0) {
        // Just highlight the closest drone's first letter
        const closest = Game.enemies.reduce((acc, enemy) => {
          return (enemy.y > acc.y) ? enemy : acc;
        }, Game.enemies[0]);
        targetChar = closest.text.charAt(0);
      } else {
        // If no enemies on screen, show first character of the key pool
        targetChar = Game.activeStage.keyArray[0];
      }
    }

    if (targetChar) {
      const code = KEY_MAP[targetChar.toLowerCase()];
      if (code) {
        const targetEl = document.getElementById(code);
        if (targetEl) {
          targetEl.classList.add('next-key-target');
        }
      }
    }
  }

  handleKeyDown(e) {
    // Add visual press feedback
    const keyId = KEY_MAP[e.key.toLowerCase()] || KEY_MAP[e.key] || `key-${e.code}`;
    const keyEl = document.getElementById(keyId);
    if (keyEl) {
      keyEl.classList.add('key-active-pressed');
      setTimeout(() => keyEl.classList.remove('key-active-pressed'), 90);
    }

    if (Game.state === 'ready') {
      if (e.code === 'Space') {
        e.preventDefault();
        this.startStage();
      }
      return;
    }

    if (Game.state !== 'playing') return;

    // Prevent space key from scrolling page
    if (e.code === 'Space') {
      e.preventDefault();
    }

    const typedChar = e.key;
    if (typedChar.length !== 1) return; // ignore control keys (Shift, Backspace, etc)

    Game.totalKeypresses++;

    let matched = false;

    if (Game.activeTarget) {
      // Validate against the current targeted word drone
      const expectedChar = Game.activeTarget.text.charAt(Game.activeTarget.typedIndex);
      if (typedChar.toLowerCase() === expectedChar.toLowerCase()) {
        matched = true;
        Game.activeTarget.typedIndex++;
        this.fireLaser(Game.activeTarget);

        // Check if word completed
        if (Game.activeTarget.typedIndex >= Game.activeTarget.text.length) {
          this.destroyDrone(Game.activeTarget);
          Game.activeTarget = null;
        }
      }
    } else {
      // Find the closest drone that starts with this character
      let closestDrone = null;
      let maxDistY = -999;

      Game.enemies.forEach(enemy => {
        if (enemy.typedIndex === 0 && enemy.text.charAt(0).toLowerCase() === typedChar.toLowerCase()) {
          if (enemy.y > maxDistY) {
            maxDistY = enemy.y;
            closestDrone = enemy;
          }
        }
      });

      if (closestDrone) {
        matched = true;
        Game.activeTarget = closestDrone;
        Game.activeTarget.typedIndex = 1;
        this.fireLaser(Game.activeTarget);

        // Single character drill completion check
        if (Game.activeTarget.typedIndex >= Game.activeTarget.text.length) {
          this.destroyDrone(Game.activeTarget);
          Game.activeTarget = null;
        }
      }
    }

    if (matched) {
      Game.correctCount++;
      Game.streak++;

      // Advance streak combo
      if (Game.streak % 5 === 0 && Game.combo < 5) {
        Game.combo++;
        AudioSFX.playComboUp();
      }

      AudioSFX.playLaser();
    } else {
      // Mis-typed! Reset combo
      Game.typos++;
      Game.streak = 0;
      Game.combo = 1;
      Game.activeTarget = null; // drop focus target

      AudioSFX.playBuzzer();
      this.screenFlashTime = 0.15; // flash screen red for 150ms
    }

    this.updateHUD();
    this.updateNextTargetKeyHighlight();
  }

  fireLaser(targetEnemy) {
    // Interpolate spaceship location to slide towards the target center X
    Game.shipTargetX = targetEnemy.x;

    // Spawn laser bolt
    const laser = new LaserBolt(Game.shipX, Game.shipY - 10, targetEnemy.x, targetEnemy.y);
    Game.lasers.push(laser);
  }

  destroyDrone(enemy) {
    AudioSFX.playExplosion();
    Game.enemiesCleared++;

    // Award points base * len * combo
    const pointsGained = 10 * enemy.text.length * Game.combo;
    Game.score += pointsGained;

    // Spawn explosion particles
    for (let i = 0; i < 20; i++) {
      const p = new Particle(enemy.x, enemy.y, enemy.color);
      Game.particles.push(p);
    }

    // Remove from active list
    Game.enemies = Game.enemies.filter(e => e.id !== enemy.id);

    // Evaluate stage win condition
    if (Game.enemiesCleared >= Game.activeStage.enemiesToSpawn && Game.enemies.length === 0) {
      this.winStage();
    }
  }

  damageShield(amount) {
    Game.shield = Math.max(0, Game.shield - amount);
    AudioSFX.playShieldHit();

    // Screen shake/flash trigger
    this.screenFlashTime = 0.25;

    this.updateHUD();

    if (Game.shield <= 0) {
      this.failStage();
    }
  }

  spawnEnemy() {
    Game.enemiesSpawned++;
    const id = Date.now() + Math.random().toString(36).substr(2, 5);

    // Pick word
    const words = Game.activeStage.drillWords;
    const text = words[Math.floor(Math.random() * words.length)];

    // Compute lateral placement
    const textWidthGuess = text.length * 12;
    const minX = textWidthGuess + 20;
    const maxX = Game.width - textWidthGuess - 20;
    const x = minX + Math.random() * (maxX - minX);

    // Falling speed factors: base speed + minor random offsets + WPM scaling
    const wpmFactor = Game.activeStage.targetWpm / 15;
    const speed = (0.7 + Math.random() * 0.5) * wpmFactor;

    const isBossMinion = Game.activeStage.isBoss;

    const drone = new DroneEnemy(id, text, x, 0, speed, isBossMinion);
    Game.enemies.push(drone);
  }

  winStage() {
    Game.state = 'clear';
    cancelAnimationFrame(Game.gameLoopId);
    this.clearNextKeyHighlights();

    // Stats calculations
    const durationMin = (Date.now() - Game.startTime) / 60000;
    const wpm = Math.round((Game.correctCount / 5) / durationMin);
    const accuracy = Game.totalKeypresses > 0
      ? Math.round((Game.correctCount / Game.totalKeypresses) * 100)
      : 100;

    // Stars formula
    let stars = 1;
    if (accuracy >= 96 && wpm >= Game.targetWpm) {
      stars = 3;
    } else if (accuracy >= 90 && wpm >= Game.targetWpm * 0.75) {
      stars = 2;
    }

    // Record scores
    Game.recordStars(Game.activeStage.id, stars);

    // Inject parameters in clear modal
    document.getElementById('stageClearTitle').innerText = `${Game.activeStage.title} COMPLETED!`;
    document.getElementById('clearWpm').innerText = `${wpm} WPM (Target: ${Game.targetWpm})`;
    document.getElementById('clearAccuracy').innerText = `${accuracy}%`;
    document.getElementById('clearScore').innerText = Game.score.toLocaleString();

    // Show stars visually
    const star1 = document.getElementById('clearStar1');
    const star2 = document.getElementById('clearStar2');
    const star3 = document.getElementById('clearStar3');

    star1.className = 'star-icon star-empty';
    star2.className = 'star-icon star-empty';
    star3.className = 'star-icon star-empty';

    setTimeout(() => { if (stars >= 1) star1.className = 'star-icon star-active'; }, 200);
    setTimeout(() => { if (stars >= 2) star2.className = 'star-icon star-active'; }, 400);
    setTimeout(() => { if (stars >= 3) star3.className = 'star-icon star-active'; }, 600);

    this.modalStageClear.classList.remove('hidden');
    this.renderSectorsSidebar(); // refresh unlocked states and star markers
  }

  failStage() {
    Game.state = 'fail';
    cancelAnimationFrame(Game.gameLoopId);
    this.clearNextKeyHighlights();

    const durationMin = Game.startTime ? (Date.now() - Game.startTime) / 60000 : 1;
    const wpm = Game.startTime ? Math.round((Game.correctCount / 5) / durationMin) : 0;

    document.getElementById('failStageName').innerText = Game.activeStage.title;
    document.getElementById('failWpm').innerText = `${wpm} WPM`;
    document.getElementById('failScore').innerText = Game.score.toLocaleString();

    this.modalGameOver.classList.remove('hidden');
  }

  // Updates screen scoreboard widgets
  updateHUD() {
    // Speed
    let wpm = 0;
    if (Game.startTime && Game.state === 'playing') {
      const minutes = (Date.now() - Game.startTime) / 60000;
      wpm = minutes > 0.05 ? Math.round((Game.correctCount / 5) / minutes) : 0;
    }
    this.wpmEl.innerText = wpm;

    // Accuracy
    const accuracy = Game.totalKeypresses > 0
      ? Math.round((Game.correctCount / Game.totalKeypresses) * 100)
      : 100;
    this.accuracyEl.innerText = accuracy;

    // Combo multiplier gauge
    this.comboEl.innerText = Game.combo;
    const comboProgressPct = Game.combo >= 5 ? 100 : (Game.streak % 5) * 20;
    this.comboFillEl.style.width = `${comboProgressPct}%`;

    // Score format padding
    this.scoreEl.innerText = String(Game.score).padStart(6, '0');

    // Shield status
    this.shieldFillEl.style.width = `${Game.shield}%`;
    this.shieldPercentEl.innerText = `${Game.shield}%`;

    if (Game.shield > 50) {
      this.shieldFillEl.style.background = 'linear-gradient(90deg, #13ad00 0%, var(--neon-green) 100%)';
      this.shieldPercentEl.style.color = 'var(--neon-green)';
    } else if (Game.shield > 25) {
      this.shieldFillEl.style.background = 'linear-gradient(90deg, #e0be00 0%, var(--neon-yellow) 100%)';
      this.shieldPercentEl.style.color = 'var(--neon-yellow)';
    } else {
      this.shieldFillEl.style.background = 'linear-gradient(90deg, #a60000 0%, var(--neon-red) 100%)';
      this.shieldPercentEl.style.color = 'var(--neon-red)';
    }

    // Level description badge
    this.activeStageNameEl.innerText = Game.activeStage.title;
    this.activeStageKeysEl.innerText = `Keys Intro: ${Game.activeStage.keys}`;
  }

  renderSectorsSidebar() {
    this.sectorsListEl.innerHTML = '';

    // Group stages by Sector
    const sectors = {};
    STAGES.forEach(stage => {
      if (!sectors[stage.sector]) {
        sectors[stage.sector] = {
          title: stage.sectorTitle,
          stages: []
        };
      }
      sectors[stage.sector].stages.push(stage);
    });

    for (const secId in sectors) {
      const sector = sectors[secId];
      const sectorCard = document.createElement('div');
      sectorCard.className = 'sector-group-card';

      const title = document.createElement('div');
      title.className = 'sector-group-title';
      title.innerText = sector.title;
      sectorCard.appendChild(title);

      sector.stages.forEach(stage => {
        const isUnlocked = Game.unlockedStages.has(stage.id);
        const stageRow = document.createElement('div');
        stageRow.className = `stage-selection-row ${!isUnlocked ? 'locked' : ''} ${Game.activeStage.id === stage.id ? 'active-stage' : ''}`;

        // Build metadata text
        const meta = document.createElement('div');
        meta.className = 'stage-meta';

        const name = document.createElement('div');
        name.className = 'stage-title';
        name.innerText = `${stage.isBoss ? '👾 ' : ''}Stage ${stage.id}: ${stage.title}`;

        const keysText = document.createElement('div');
        keysText.className = 'stage-keys-introduced';
        keysText.innerText = `Keys: ${stage.keys}`;

        meta.appendChild(name);
        meta.appendChild(keysText);
        stageRow.appendChild(meta);

        // Stars / Lock indicator
        if (isUnlocked) {
          const starsContainer = document.createElement('div');
          starsContainer.className = 'stage-stars';

          const earnedStars = Game.stageStars[stage.id] || 0;
          for (let i = 1; i <= 3; i++) {
            const miniStar = document.createElement('span');
            miniStar.className = `mini-star ${i <= earnedStars ? 'earned' : ''}`;
            miniStar.innerHTML = '&#9733;';
            starsContainer.appendChild(miniStar);
          }
          stageRow.appendChild(starsContainer);

          // Click handler to swap stages
          stageRow.addEventListener('click', () => {
            Game.activeStage = stage;
            this.sidebarSectors.classList.add('hidden');
            this.readyStage();
          });
        } else {
          const lock = document.createElement('span');
          lock.className = 'locked-icon';
          lock.innerHTML = '&#128274;'; // padlock symbol
          stageRow.appendChild(lock);
        }

        sectorCard.appendChild(stageRow);
      });

      this.sectorsListEl.appendChild(sectorCard);
    }
  }

  // --- RENDERING LOOP ENGINE ---
  gameLoop(timestamp) {
    if (Game.state !== 'playing') return;

    const dt = Math.min(0.1, (timestamp - this.lastTime) / 1000); // delta time capped to 100ms
    this.lastTime = timestamp;

    this.updateGame(dt);
    this.drawGame();

    Game.gameLoopId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  updateGame(dt) {
    // 1. Spawning
    Game.spawnTimer += dt * 1000;

    // Stop spawning if we reached the maximum count for this stage
    const maxToSpawn = Game.activeStage.enemiesToSpawn;
    if (Game.enemiesSpawned < maxToSpawn && Game.spawnTimer >= Game.spawnInterval) {
      this.spawnEnemy();
      Game.spawnTimer = 0;
      this.updateNextTargetKeyHighlight(); // re-eval target highlights when items spawn
    }

    // 2. Spaceship horizontal drift interpolation (makes movement feel super premium)
    Game.shipX += (Game.shipTargetX - Game.shipX) * 0.15;

    // 3. Drone updates
    Game.enemies.forEach(enemy => {
      enemy.update(dt);

      // Hit defensive shield line at bottom (Y = 350px)
      if (enemy.y >= Game.shipY - 10) {
        // Drone got past ship! Deduct shield health
        const damage = enemy.isBoss ? 25 : 10;
        this.damageShield(damage);

        // Remove from list
        Game.enemies = Game.enemies.filter(e => e.id !== enemy.id);

        // Clear active target if that was the one that crashed
        if (Game.activeTarget && Game.activeTarget.id === enemy.id) {
          Game.activeTarget = null;
        }

        // Re-eval if all waves finished
        if (Game.enemiesCleared + (Game.enemiesSpawned - Game.enemies.length - Game.enemiesCleared) >= maxToSpawn && Game.enemies.length === 0) {
          this.winStage();
        } else {
          this.updateNextTargetKeyHighlight();
        }
      }
    });

    // 4. Laser updates
    Game.lasers.forEach(laser => laser.update(dt));
    Game.lasers = Game.lasers.filter(laser => laser.life > 0);

    // 5. Particle updates
    Game.particles.forEach(p => p.update());
    Game.particles = Game.particles.filter(p => p.life > 0);

    // 6. Typo flashes decay
    if (this.screenFlashTime > 0) {
      this.screenFlashTime = Math.max(0, this.screenFlashTime - dt);
    }

    // 7. Periodically update WPM display
    this.updateHUD();
  }

  drawGame() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, Game.width, Game.height);

    // 1. Particle debris rendering
    Game.particles.forEach(p => p.draw(ctx));

    // 2. Drones rendering
    Game.enemies.forEach(enemy => {
      const isTargeted = (Game.activeTarget && Game.activeTarget.id === enemy.id);
      enemy.draw(ctx, isTargeted);
    });

    // 3. Lasers rendering
    Game.lasers.forEach(laser => laser.draw(ctx));

    // 4. Draw Player Spaceship
    ctx.save();
    ctx.translate(Game.shipX, Game.shipY);

    // Ship glow styling
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;

    // Solid base layout
    ctx.fillStyle = '#0a0d26';

    ctx.beginPath();
    ctx.moveTo(0, -18);  // Nose
    ctx.lineTo(14, 12);  // Right thruster wings
    ctx.lineTo(6, 6);    // Inner wing curves
    ctx.lineTo(-6, 6);
    ctx.lineTo(-14, 12); // Left thruster wings
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Small cockpit highlight
    ctx.strokeStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(4, 2);
    ctx.lineTo(-4, 2);
    ctx.closePath();
    ctx.stroke();

    // Thruster engine fire visual scaling based on active combo
    ctx.fillStyle = Game.combo >= 4 ? '#ff007f' : '#fffb00';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    const fireHeight = 8 + (Game.combo * 2) + Math.random() * 4;
    ctx.fillRect(-3, 8, 2, fireHeight);
    ctx.fillRect(1, 8, 2, fireHeight);

    ctx.restore();

    // 5. Target Lock-on UI Decal
    if (Game.activeTarget) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Draw lock-on guide line from spaceship to active target drone
      ctx.beginPath();
      ctx.moveTo(Game.shipX, Game.shipY - 15);
      ctx.lineTo(Game.activeTarget.x, Game.activeTarget.y + 15);
      ctx.stroke();
      ctx.restore();
    }

    // 6. Typo red flash overlay border
    if (this.screenFlashTime > 0) {
      ctx.save();
      ctx.strokeStyle = `rgba(255, 0, 127, ${this.screenFlashTime * 3})`;
      ctx.lineWidth = 15;
      ctx.strokeRect(0, 0, Game.width, Game.height);
      ctx.restore();
    }
  }

  // Draw static setup screen before game starts
  drawSceneStatic() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, Game.width, Game.height);

    // Draw spaceship in base center
    ctx.save();
    ctx.translate(Game.width / 2, Game.height - 35);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(14, 12);
    ctx.lineTo(6, 6);
    ctx.lineTo(-6, 6);
    ctx.lineTo(-14, 12);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

// Instantiate engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.App = new GameEngine();
});
