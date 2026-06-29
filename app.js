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
    this.profiles = {};
    this.currentProfile = null;

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
      const savedProfiles = localStorage.getItem('mwt_profiles');
      const savedCurrentProfile = localStorage.getItem('mwt_current_profile');

      if (savedProfiles) {
        this.profiles = JSON.parse(savedProfiles);
        this.currentProfile = savedCurrentProfile || null;
      } else {
        // Look for legacy single-player progress to migrate
        const legacyUnlocked = localStorage.getItem('mwt_unlocked');
        const legacyStars = localStorage.getItem('mwt_stars');

        if (legacyUnlocked || legacyStars) {
          const unlockedList = legacyUnlocked ? JSON.parse(legacyUnlocked) : ['1.1'];
          const starsMap = legacyStars ? JSON.parse(legacyStars) : {};

          this.profiles = {
            "Cadet": {
              name: "Cadet",
              unlockedStages: unlockedList,
              stageStars: starsMap,
              bestRuns: {}
            }
          };
          this.currentProfile = "Cadet";
          
          // Clean up legacy keys
          localStorage.removeItem('mwt_unlocked');
          localStorage.removeItem('mwt_stars');
          this.saveState();
        }
      }

      if (this.currentProfile && this.profiles[this.currentProfile]) {
        const prof = this.profiles[this.currentProfile];
        this.unlockedStages = new Set(prof.unlockedStages || ['1.1']);
        this.stageStars = prof.stageStars || {};
        this.selectFurthestUnlockedStage();
      } else {
        // If profile was somehow deleted or not found
        const profileKeys = Object.keys(this.profiles);
        if (profileKeys.length > 0) {
          this.currentProfile = profileKeys[0];
          const prof = this.profiles[this.currentProfile];
          this.unlockedStages = new Set(prof.unlockedStages || ['1.1']);
          this.stageStars = prof.stageStars || {};
          this.selectFurthestUnlockedStage();
        } else {
          this.currentProfile = null;
          this.unlockedStages = new Set(['1.1']);
          this.stageStars = {};
          this.activeStage = STAGES[0];
        }
      }
    } catch (e) {
      console.warn("Could not load save state from local storage", e);
    }
  }

  saveState() {
    try {
      if (this.currentProfile && this.profiles[this.currentProfile]) {
        this.profiles[this.currentProfile].unlockedStages = Array.from(this.unlockedStages);
        this.profiles[this.currentProfile].stageStars = this.stageStars;
      }
      localStorage.setItem('mwt_profiles', JSON.stringify(this.profiles));
      localStorage.setItem('mwt_current_profile', this.currentProfile || '');
    } catch (e) {
      console.warn("Could not write save state to local storage", e);
    }
  }

  createProfile(name) {
    const trimmed = name.trim();
    if (!trimmed) {
      return { success: false, error: 'Codename cannot be empty' };
    }
    if (trimmed.length < 2 || trimmed.length > 15) {
      return { success: false, error: 'Codename must be 2 to 15 characters' };
    }
    const exists = Object.keys(this.profiles).some(k => k.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      return { success: false, error: 'Codename already registered' };
    }

    this.profiles[trimmed] = {
      name: trimmed,
      unlockedStages: ['1.1'],
      stageStars: {},
      bestRuns: {}
    };

    this.currentProfile = trimmed;
    this.unlockedStages = new Set(['1.1']);
    this.stageStars = {};
    this.activeStage = STAGES[0];
    this.saveState();
    return { success: true };
  }

  switchProfile(name) {
    if (!this.profiles[name]) return false;
    this.currentProfile = name;
    const prof = this.profiles[name];
    this.unlockedStages = new Set(prof.unlockedStages || ['1.1']);
    this.stageStars = prof.stageStars || {};
    this.selectFurthestUnlockedStage();
    this.saveState();
    return true;
  }

  selectFurthestUnlockedStage() {
    let furthest = STAGES[0];
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (this.unlockedStages.has(STAGES[i].id)) {
        furthest = STAGES[i];
        break;
      }
    }
    this.activeStage = furthest;
  }

  recordBestRun(stageId, runStats) {
    if (!this.currentProfile || !this.profiles[this.currentProfile]) return;
    const prof = this.profiles[this.currentProfile];
    if (!prof.bestRuns) prof.bestRuns = {};

    const existing = prof.bestRuns[stageId];
    if (!existing) {
      prof.bestRuns[stageId] = runStats;
      this.saveState();
    } else {
      let isBetter = false;
      if (runStats.score > existing.score) {
        isBetter = true;
      } else if (runStats.score === existing.score) {
        if (runStats.wpm > existing.wpm) {
          isBetter = true;
        } else if (runStats.wpm === existing.wpm && runStats.accuracy > existing.accuracy) {
          isBetter = true;
        }
      }
      if (isBetter) {
        prof.bestRuns[stageId] = runStats;
        this.saveState();
      }
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

// --- 4. GAME ENGINE CORE CONTROLLER (ORCHESTRATOR) ---
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
    this.dashboardPanelEl = document.querySelector('.dashboard-panel');

    // Modals
    this.modalWelcome = document.getElementById('modalWelcome');
    this.modalStageClear = document.getElementById('modalStageClear');
    this.modalGameOver = document.getElementById('modalGameOver');
    this.sidebarSectors = document.getElementById('sidebarSectors');

    this.audioToggleBtn = document.getElementById('btnToggleAudio');

    // Profile DOM Elements
    this.activePilotNameEl = document.getElementById('activePilotName');
    this.profileSelectEl = document.getElementById('profileSelect');
    this.profileInputEl = document.getElementById('profileInput');
    this.btnCreateProfileEl = document.getElementById('btnCreateProfile');
    this.profileErrorEl = document.getElementById('profileError');

    // Instantiate game engines
    this.spaceEngine = new window.SpaceEngineInstance(this);
    this.fishEngine = new window.FishEngineInstance(this);
    this.activeEngine = null;

    this.screenFlashTime = 0; // for typo flashes

    this.updateProfileSelectDropdown();
    this.initEvents();
    this.renderSectorsSidebar();
    this.updateHUD();
  }

  updateProfileSelectDropdown() {
    if (!this.profileSelectEl) return;
    this.profileSelectEl.innerHTML = '';

    const profilesList = Object.keys(Game.profiles);
    
    if (profilesList.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.innerText = '-- REGISTER A CODENAME TO BEGIN --';
      this.profileSelectEl.appendChild(opt);
      document.getElementById('btnStartGame').disabled = true;
    } else {
      profilesList.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.innerText = name;
        if (name === Game.currentProfile) {
          opt.selected = true;
        }
        this.profileSelectEl.appendChild(opt);
      });
      document.getElementById('btnStartGame').disabled = !Game.currentProfile;
    }

    if (this.activePilotNameEl) {
      this.activePilotNameEl.innerText = Game.currentProfile ? Game.currentProfile.toUpperCase() : 'UNASSIGNED';
    }
  }

  initCanvas() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Update layout limits
    Game.width = this.canvas.width;
    Game.height = this.canvas.height;

    if (this.activeEngine) {
      this.activeEngine.init(this.canvas, this.ctx);
    }
  }

  initEvents() {
    // Profile Management Events
    if (this.profileSelectEl) {
      this.profileSelectEl.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (selected) {
          Game.switchProfile(selected);
          this.updateProfileSelectDropdown();
          this.renderSectorsSidebar();
          this.updateHUD();
          this.clearNextKeyHighlights();
          this.highlightStageKeys();
        }
      });
    }

    if (this.btnCreateProfileEl) {
      const handleCreate = () => {
        const nameInput = this.profileInputEl.value;
        const res = Game.createProfile(nameInput);
        if (res.success) {
          this.profileInputEl.value = '';
          if (this.profileErrorEl) {
            this.profileErrorEl.classList.add('hidden');
            this.profileErrorEl.innerText = '';
          }
          this.updateProfileSelectDropdown();
          this.renderSectorsSidebar();
          this.updateHUD();
          this.clearNextKeyHighlights();
          this.highlightStageKeys();
        } else {
          if (this.profileErrorEl) {
            this.profileErrorEl.classList.remove('hidden');
            this.profileErrorEl.innerText = `> ERROR: ${res.error.toUpperCase()}`;
          }
        }
      };

      this.btnCreateProfileEl.addEventListener('click', handleCreate);
      
      this.profileInputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCreate();
        }
      });
    }

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
    
    // Choose active engine based on Sector
    this.spaceEngine.cleanup();
    this.fishEngine.cleanup();

    if (Game.activeStage.sector === 2) {
      this.activeEngine = this.fishEngine;
      if (this.dashboardPanelEl) this.dashboardPanelEl.classList.add('show-oxygen');
    } else {
      this.activeEngine = this.spaceEngine;
      if (this.dashboardPanelEl) this.dashboardPanelEl.classList.remove('show-oxygen');
    }

    this.updateHUD();
    this.clearNextKeyHighlights();
    this.highlightStageKeys();

    this.promptOverlayEl.classList.remove('hidden');
    
    if (Game.activeStage.sector === 2) {
      this.promptTextEl.innerText = "PRESS SPACEBAR TO INITIATE REEF INTRUSION DEFENSE";
    } else {
      this.promptTextEl.innerText = "PRESS SPACEBAR TO INITIATE GRID DEFENSE";
    }
    
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

    // Start active engine
    if (this.activeEngine) {
      this.activeEngine.start();
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
    if (this.activeEngine) {
      this.activeEngine.updateNextTargetKeyHighlight();
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

    // Route alphanumeric typing to the active engine
    if (this.activeEngine) {
      this.activeEngine.onKeyPress(typedChar);
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

    // Save best run statistics
    Game.recordBestRun(Game.activeStage.id, {
      wpm: wpm,
      accuracy: accuracy,
      score: Game.score
    });

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

          // Show best run stats if available
          const prof = Game.profiles[Game.currentProfile];
          const best = prof && prof.bestRuns ? prof.bestRuns[stage.id] : null;
          if (best) {
            const bestRunText = document.createElement('div');
            bestRunText.className = 'stage-best-run';
            bestRunText.innerText = `Best: ${best.wpm} WPM / ${best.accuracy}% / ${best.score.toLocaleString()} pts`;
            meta.appendChild(bestRunText);
          }

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
    if (this.screenFlashTime > 0) {
      this.screenFlashTime = Math.max(0, this.screenFlashTime - dt);
    }

    if (this.activeEngine) {
      this.activeEngine.update(dt);
    }

    this.updateHUD();
  }

  drawGame() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, Game.width, Game.height);

    if (this.activeEngine) {
      this.activeEngine.draw();
    }

    if (this.screenFlashTime > 0) {
      ctx.save();
      ctx.strokeStyle = `rgba(255, 0, 127, ${this.screenFlashTime * 3})`;
      ctx.lineWidth = 15;
      ctx.strokeRect(0, 0, Game.width, Game.height);
      ctx.restore();
    }
  }

  drawSceneStatic() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, Game.width, Game.height);

    if (this.activeEngine) {
      this.activeEngine.draw();
    }
  }
}

// Instantiate engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.App = new GameEngine();
});
