/**
 * fishEngine.js - Underwater Fish Swimmer Game Engine Module
 * Implements the bioluminescent ocean theme, oxygen mechanics, and active target bubble dashboard.
 */

class FishBubbleParticle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -1 - Math.random() * 2;
    this.life = 1.0;
    this.decay = 0.02 + Math.random() * 0.03;
    this.size = radius || 2 + Math.random() * 4;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.strokeStyle = `rgba(0, 240, 255, ${this.life * 0.6})`;
    ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.2})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

class FishEngine {
  constructor(core) {
    this.core = core;
    this.canvas = null;
    this.ctx = null;

    this.bubbles = [];
    this.particles = [];
    this.activeTarget = null;

    // Fish physics and coordinates
    this.fishX = 150;
    this.fishY = 200;
    this.fishTargetY = 200;
    this.fishAngle = 0;
    this.time = 0;

    // Oxygen Mechanic
    this.oxygen = 100;
    this.oxygenDecayRate = 6; // oxygen units lost per second

    // Dash control
    this.isDashing = false;
    this.dashTimer = 0;
    this.dashTargetX = 150;
    this.dashTargetY = 200;
    this.dashOriginX = 150;
    this.dashOriginY = 200;
    
    // Scenery state
    this.plankton = [];
  }

  init(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.fishY = canvas.height / 2;
    this.fishTargetY = canvas.height / 2;

    // Generate static plankton floating states
    this.plankton = [];
    for (let i = 0; i < 25; i++) {
      this.plankton.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 10 + Math.random() * 20,
        size: 1 + Math.random() * 2
      });
    }
  }

  start() {
    this.bubbles = [];
    this.particles = [];
    this.activeTarget = null;
    this.oxygen = 100;
    this.isDashing = false;
    this.fishX = 150;
    this.fishY = this.canvas.height / 2;
    this.fishTargetY = this.canvas.height / 2;
    this.fishAngle = 0;
    
    // Toggle Oxygen Bar element in HUD
    const oxygenBarContainer = document.getElementById('oxygenBarContainer');
    if (oxygenBarContainer) {
      oxygenBarContainer.classList.remove('hidden');
    }

    this.updateNextTargetKeyHighlight();
  }

  cleanup() {
    this.bubbles = [];
    this.particles = [];
    this.activeTarget = null;
    this.isDashing = false;

    // Hide Oxygen Bar element in HUD
    const oxygenBarContainer = document.getElementById('oxygenBarContainer');
    if (oxygenBarContainer) {
      oxygenBarContainer.classList.add('hidden');
    }
  }

  update(dt) {
    this.time += dt;

    // 1. Oxygen decay updates
    if (Game.state === 'playing') {
      this.oxygen = Math.max(0, this.oxygen - this.oxygenDecayRate * dt);
      
      // Update custom Oxygen Fill bar
      const oxygenFill = document.getElementById('oxygenFill');
      const oxygenText = document.getElementById('oxygenText');
      if (oxygenFill) oxygenFill.style.width = `${this.oxygen}%`;
      if (oxygenText) oxygenText.innerText = `${Math.round(this.oxygen)}%`;

      if (this.oxygen <= 0) {
        // Ran out of breath! Take damage to shields
        this.core.damageShield(15);
        this.oxygen = 50; // reset to 50% to prevent instant death loops
        this.playInhaleGaspSound();
      }
    }

    // 2. Spawning bubbles
    Game.spawnTimer += dt * 1000;
    const maxToSpawn = Game.activeStage.enemiesToSpawn;

    if (Game.enemiesSpawned < maxToSpawn && Game.spawnTimer >= Game.spawnInterval) {
      this.spawnBubble();
      Game.spawnTimer = 0;
      this.updateNextTargetKeyHighlight();
    }

    // 3. Fish updates & Dash animation interpolation
    if (this.isDashing) {
      this.dashTimer += dt * 3.5; // complete dash in ~300ms
      if (this.dashTimer >= 1.0) {
        // Reached destination, consume target
        this.consumeBubble(this.activeTarget);
        this.isDashing = false;
        this.activeTarget = null;
      } else {
        // Hermite or linear interpolation
        const t = this.dashTimer;
        // Swim to bubble
        this.fishX = this.dashOriginX + (this.dashTargetX - this.dashOriginX) * t;
        this.fishY = this.dashOriginY + (this.dashTargetY - this.dashOriginY) * t;
        
        // Calculate swimming angle
        const dx = this.dashTargetX - this.dashOriginX;
        const dy = this.dashTargetY - this.dashOriginY;
        this.fishAngle = Math.atan2(dy, dx);
      }
    } else {
      // Normal float mode
      // Smooth return to base X position
      this.fishX += (150 - this.fishX) * 0.1;
      
      // Hover oscillation
      const floatOffset = Math.sin(this.time * 2.5) * 8;
      this.fishTargetY = (this.canvas.height / 2) + floatOffset;
      this.fishY += (this.fishTargetY - this.fishY) * 0.05;

      // Flatten angle back to zero
      this.fishAngle += (0 - this.fishAngle) * 0.1;
    }

    // 4. Update bubble entities
    this.bubbles.forEach(bubble => {
      // Move from right to left
      bubble.x -= bubble.speed * dt * 60;
      bubble.pulseTime += dt * 4;

      // Check if off-screen
      if (bubble.x < -bubble.radius) {
        this.bubbles = this.bubbles.filter(b => b.id !== bubble.id);
        if (this.activeTarget && this.activeTarget.id === bubble.id) {
          this.activeTarget = null;
        }

        if (Game.enemiesSpawned >= maxToSpawn && this.bubbles.length === 0) {
          this.core.winStage();
        } else {
          this.updateNextTargetKeyHighlight();
        }
      }
    });

    // 5. Ambient Plankton drift
    this.plankton.forEach(p => {
      p.y -= p.speed * dt;
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
    });

    // 6. Water bubble particles updates
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    const ctx = this.ctx;

    // Render Neon Bioluminescent Abyss background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    bgGrad.addColorStop(0, '#040d1a'); // dark navy
    bgGrad.addColorStop(0.5, '#061726');
    bgGrad.addColorStop(1, '#022424'); // deep teal
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw ambient plankton
    ctx.save();
    ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
    this.plankton.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // 2. Draw waving neon seaweed plants at bottom
    ctx.save();
    ctx.lineWidth = 4;
    // Draw 8 seaweed plants
    for (let i = 0; i < 8; i++) {
      const plantX = 50 + i * 120;
      const wave = Math.sin(this.time + i) * 12;
      
      ctx.shadowBlur = 10;
      ctx.strokeStyle = i % 2 === 0 ? '#39ff14' : '#ff007f'; // alternates neon green/pink
      ctx.shadowColor = ctx.strokeStyle;

      ctx.beginPath();
      ctx.moveTo(plantX, this.canvas.height);
      ctx.quadraticCurveTo(plantX + wave, this.canvas.height - 40, plantX + wave * 0.5, this.canvas.height - 80);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Draw bubble particles
    this.particles.forEach(p => p.draw(ctx));

    // 4. Draw oxygen bubbles
    this.bubbles.forEach(bubble => {
      ctx.save();
      const isTargeted = (this.activeTarget && this.activeTarget.id === bubble.id);
      
      const pulse = Math.sin(bubble.pulseTime) * 2;
      const radius = bubble.radius + pulse;

      // Draw glassmorphic bubble outline
      ctx.lineWidth = isTargeted ? 2.5 : 1.5;
      ctx.strokeStyle = isTargeted ? '#ff007f' : '#00f0ff';
      ctx.shadowColor = isTargeted ? '#ff007f' : '#00f0ff';
      ctx.shadowBlur = isTargeted ? 12 : 6;

      ctx.fillStyle = 'rgba(10, 32, 54, 0.4)';
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Highlight target cursor underline
      ctx.font = "800 22px 'Outfit', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textWidth = ctx.measureText(bubble.text).width;
      const typedText = bubble.text.substring(0, bubble.typedIndex);
      const untypedText = bubble.text.substring(bubble.typedIndex);

      ctx.save();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.strokeText(bubble.text, bubble.x, bubble.y);
      ctx.restore();

      if (bubble.typedIndex === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillText(bubble.text, bubble.x, bubble.y);
      } else {
        const typedWidth = ctx.measureText(typedText).width;
        const startX = bubble.x - textWidth / 2;

        ctx.textAlign = 'left';
        
        ctx.save();
        ctx.fillStyle = '#39ff14'; // neon green typed
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 6;
        ctx.fillText(typedText, startX, bubble.y);
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(untypedText, startX + typedWidth, bubble.y);
      }

      // Draw next character underline guide
      if (isTargeted && bubble.typedIndex < bubble.text.length) {
        const nextChar = bubble.text.charAt(bubble.typedIndex);
        const typedWidth = ctx.measureText(typedText).width;
        const charWidth = ctx.measureText(nextChar).width;
        const startX = bubble.x - textWidth / 2;

        ctx.strokeStyle = '#fffb00';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(startX + typedWidth, bubble.y + 11);
        ctx.lineTo(startX + typedWidth + charWidth, bubble.y + 11);
        ctx.stroke();
      }

      ctx.restore();
    });

    // 5. Draw Cyber-Fish
    ctx.save();
    ctx.translate(this.fishX, this.fishY);
    ctx.rotate(this.fishAngle);

    // Glowing setup
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff007f';
    ctx.fillStyle = '#080d26';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 10;

    // Fish Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Tail Fin
    ctx.beginPath();
    const tailTailWiggle = Math.sin(this.time * 8) * 3;
    ctx.moveTo(-22, 0);
    ctx.lineTo(-34, -12 + tailTailWiggle);
    ctx.lineTo(-28, 0);
    ctx.lineTo(-34, 12 - tailTailWiggle);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Upper/Dorsal Fin
    ctx.beginPath();
    ctx.moveTo(-5, -13);
    ctx.quadraticCurveTo(-15, -24, -20, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cyber eye (neon cyan glowing)
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(10, -3, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 6. Draw lock-on guide line
    if (this.activeTarget && !this.isDashing) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(this.fishX + 22, this.fishY);
      ctx.lineTo(this.activeTarget.x - this.activeTarget.radius, this.activeTarget.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  onKeyPress(typedChar) {
    if (this.isDashing) return; // ignore keystrokes while dashing
    let matched = false;

    if (this.activeTarget) {
      const expectedChar = this.activeTarget.text.charAt(this.activeTarget.typedIndex);
      if (typedChar.toLowerCase() === expectedChar.toLowerCase()) {
        matched = true;
        this.activeTarget.typedIndex++;

        // Spawn key hit bubbles
        for (let i = 0; i < 4; i++) {
          this.particles.push(new FishBubbleParticle(this.activeTarget.x, this.activeTarget.y, 2 + Math.random() * 3));
        }

        if (this.activeTarget.typedIndex >= this.activeTarget.text.length) {
          // Dash and eat bubble!
          this.triggerDash(this.activeTarget);
        }
      }
    } else {
      let closestBubble = null;
      let minX = 9999;

      this.bubbles.forEach(b => {
        if (b.typedIndex === 0 && b.text.charAt(0).toLowerCase() === typedChar.toLowerCase()) {
          if (b.x < minX) {
            minX = b.x;
            closestBubble = b;
          }
        }
      });

      if (closestBubble) {
        matched = true;
        this.activeTarget = closestBubble;
        this.activeTarget.typedIndex = 1;

        for (let i = 0; i < 4; i++) {
          this.particles.push(new FishBubbleParticle(this.activeTarget.x, this.activeTarget.y, 2 + Math.random() * 3));
        }

        if (this.activeTarget.typedIndex >= this.activeTarget.text.length) {
          this.triggerDash(this.activeTarget);
        }
      }
    }

    if (matched) {
      Game.correctCount++;
      Game.streak++;

      if (Game.streak % 5 === 0 && Game.combo < 5) {
        Game.combo++;
        AudioSFX.playComboUp();
      }
      this.playKeyboardClickSound();
    } else {
      Game.typos++;
      Game.streak = 0;
      Game.combo = 1;
      this.activeTarget = null;

      AudioSFX.playBuzzer();
      this.core.screenFlashTime = 0.15;
    }

    this.core.updateHUD();
    this.updateNextTargetKeyHighlight();
  }

  spawnBubble() {
    Game.enemiesSpawned++;
    const id = Date.now() + Math.random().toString(36).substr(2, 5);

    const words = Game.activeStage.drillWords;
    const text = words[Math.floor(Math.random() * words.length)];

    const x = this.canvas.width + 40;
    const y = 40 + Math.random() * (this.canvas.height - 120);

    const wpmFactor = Game.activeStage.targetWpm / 15;
    const speed = (0.8 + Math.random() * 0.4) * wpmFactor * 1.3;

    const bubble = {
      id: id,
      text: text,
      x: x,
      y: y,
      speed: speed,
      typedIndex: 0,
      radius: 20 + text.length * 5,
      pulseTime: Math.random() * 10
    };
    this.bubbles.push(bubble);
  }

  triggerDash(bubble) {
    this.isDashing = true;
    this.dashTimer = 0;
    this.dashOriginX = this.fishX;
    this.dashOriginY = this.fishY;
    this.dashTargetX = bubble.x;
    this.dashTargetY = bubble.y;
  }

  consumeBubble(bubble) {
    this.playBubblePopSound();
    Game.enemiesCleared++;

    const pointsGained = 12 * bubble.text.length * Game.combo;
    Game.score += pointsGained;

    // Restore Oxygen level
    this.oxygen = Math.min(100, this.oxygen + 35);

    // Spawn 15 bubble burst particles
    for (let i = 0; i < 15; i++) {
      this.particles.push(new FishBubbleParticle(bubble.x, bubble.y, 3 + Math.random() * 5));
    }

    this.bubbles = this.bubbles.filter(b => b.id !== bubble.id);

    const maxToSpawn = Game.activeStage.enemiesToSpawn;
    if (Game.enemiesSpawned >= maxToSpawn && this.bubbles.length === 0) {
      this.core.winStage();
    } else {
      this.updateNextTargetKeyHighlight();
    }
  }

  updateNextTargetKeyHighlight() {
    this.core.clearNextKeyHighlights();
    this.core.highlightStageKeys();

    if (Game.state !== 'playing' || this.isDashing) return;

    let targetChar = null;

    if (this.activeTarget) {
      targetChar = this.activeTarget.text.charAt(this.activeTarget.typedIndex);
    } else {
      if (this.bubbles.length > 0) {
        // Highlight first char of closest bubble on screen
        const closest = this.bubbles.reduce((acc, b) => {
          return (b.x < acc.x) ? b : acc;
        }, this.bubbles[0]);
        targetChar = closest.text.charAt(0);
      } else {
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

  // Synthesis methods for Web Audio API integration
  playKeyboardClickSound() {
    if (!AudioSFX.enabled || !AudioSFX.ctx) return;
    const now = AudioSFX.ctx.currentTime;
    
    // Cyber-synth water droplet typing click sound
    const osc = AudioSFX.ctx.createOscillator();
    const gain = AudioSFX.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(AudioSFX.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playBubblePopSound() {
    if (!AudioSFX.enabled || !AudioSFX.ctx) return;
    const now = AudioSFX.ctx.currentTime;

    const osc = AudioSFX.ctx.createOscillator();
    const gain = AudioSFX.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(AudioSFX.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playInhaleGaspSound() {
    if (!AudioSFX.enabled || !AudioSFX.ctx) return;
    const now = AudioSFX.ctx.currentTime;
    
    // Synthesizes a digital alarm for running out of oxygen
    const osc1 = AudioSFX.ctx.createOscillator();
    const gain1 = AudioSFX.ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(440, now);
    osc1.frequency.setValueAtTime(220, now + 0.15);
    
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc1.connect(gain1);
    gain1.connect(AudioSFX.ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.3);
  }
}

// Attach engine globally
window.FishEngineInstance = FishEngine;
