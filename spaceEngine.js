/**
 * spaceEngine.js - Space Shooter Game Engine Module
 * Implements the spaceships, lasers, falling drones, and laser particle engine.
 */

class LaserBolt {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.life = 1.0; // from 1.0 down to 0.0
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
    ctx.font = this.isBoss ? "800 22px 'Outfit', sans-serif" : "800 24px 'Outfit', sans-serif";
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

class SpaceEngine {
  constructor(core) {
    this.core = core;
    this.canvas = null;
    this.ctx = null;

    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.activeTarget = null;

    this.shipX = 450;
    this.shipY = 385;
    this.shipTargetX = 450;
  }

  init(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.shipX = canvas.width / 2;
    this.shipY = canvas.height - 35;
    this.shipTargetX = canvas.width / 2;
  }

  start() {
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.activeTarget = null;
    this.updateNextTargetKeyHighlight();
  }

  cleanup() {
    this.enemies = [];
    this.lasers = [];
    this.particles = [];
    this.activeTarget = null;
  }

  update(dt) {
    // 1. Spawning
    Game.spawnTimer += dt * 1000;
    const maxToSpawn = Game.activeStage.enemiesToSpawn;

    if (Game.enemiesSpawned < maxToSpawn && Game.spawnTimer >= Game.spawnInterval) {
      this.spawnEnemy();
      Game.spawnTimer = 0;
      this.updateNextTargetKeyHighlight();
    }

    // 2. Ship drift interpolation
    this.shipX += (this.shipTargetX - this.shipX) * 0.15;

    // 3. Drone updates
    this.enemies.forEach(enemy => {
      enemy.update(dt);

      // Hit shield at bottom
      if (enemy.y >= this.shipY - 10) {
        const damage = enemy.isBoss ? 25 : 10;
        this.core.damageShield(damage);

        this.enemies = this.enemies.filter(e => e.id !== enemy.id);

        if (this.activeTarget && this.activeTarget.id === enemy.id) {
          this.activeTarget = null;
        }

        if (Game.enemiesSpawned >= maxToSpawn && this.enemies.length === 0) {
          this.core.winStage();
        } else {
          this.updateNextTargetKeyHighlight();
        }
      }
    });

    // 4. Laser updates
    this.lasers.forEach(laser => laser.update(dt));
    this.lasers = this.lasers.filter(laser => laser.life > 0);

    // 5. Particle updates
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    const ctx = this.ctx;

    // 1. Draw particles
    this.particles.forEach(p => p.draw(ctx));

    // 2. Draw drones
    this.enemies.forEach(enemy => {
      const isTargeted = (this.activeTarget && this.activeTarget.id === enemy.id);
      enemy.draw(ctx, isTargeted);
    });

    // 3. Draw lasers
    this.lasers.forEach(laser => laser.draw(ctx));

    // 4. Draw spaceship
    ctx.save();
    ctx.translate(this.shipX, this.shipY);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#0a0d26';

    ctx.beginPath();
    ctx.moveTo(0, -18);  // Nose
    ctx.lineTo(14, 12);  // Right wings
    ctx.lineTo(6, 6);    // Inner wing curves
    ctx.lineTo(-6, 6);
    ctx.lineTo(-14, 12); // Left wings
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cockpit
    ctx.strokeStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(4, 2);
    ctx.lineTo(-4, 2);
    ctx.closePath();
    ctx.stroke();

    // Engine fire
    ctx.fillStyle = Game.combo >= 4 ? '#ff007f' : '#fffb00';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    const fireHeight = 8 + (Game.combo * 2) + Math.random() * 4;
    ctx.fillRect(-3, 8, 2, fireHeight);
    ctx.fillRect(1, 8, 2, fireHeight);

    ctx.restore();

    // 5. Target Lock-on Line
    if (this.activeTarget) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(this.shipX, this.shipY - 15);
      ctx.lineTo(this.activeTarget.x, this.activeTarget.y + 15);
      ctx.stroke();
      ctx.restore();
    }
  }

  onKeyPress(typedChar) {
    let matched = false;

    if (this.activeTarget) {
      const expectedChar = this.activeTarget.text.charAt(this.activeTarget.typedIndex);
      if (typedChar.toLowerCase() === expectedChar.toLowerCase()) {
        matched = true;
        this.activeTarget.typedIndex++;
        this.fireLaser(this.activeTarget);

        if (this.activeTarget.typedIndex >= this.activeTarget.text.length) {
          this.destroyDrone(this.activeTarget);
          this.activeTarget = null;
        }
      }
    } else {
      let closestDrone = null;
      let maxDistY = -999;

      this.enemies.forEach(enemy => {
        if (enemy.typedIndex === 0 && enemy.text.charAt(0).toLowerCase() === typedChar.toLowerCase()) {
          if (enemy.y > maxDistY) {
            maxDistY = enemy.y;
            closestDrone = enemy;
          }
        }
      });

      if (closestDrone) {
        matched = true;
        this.activeTarget = closestDrone;
        this.activeTarget.typedIndex = 1;
        this.fireLaser(this.activeTarget);

        if (this.activeTarget.typedIndex >= this.activeTarget.text.length) {
          this.destroyDrone(this.activeTarget);
          this.activeTarget = null;
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
      AudioSFX.playLaser();
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

  spawnEnemy() {
    Game.enemiesSpawned++;
    const id = Date.now() + Math.random().toString(36).substr(2, 5);

    const words = Game.activeStage.drillWords;
    const text = words[Math.floor(Math.random() * words.length)];

    const textWidthGuess = text.length * 12;
    const minX = textWidthGuess + 20;
    const maxX = this.canvas.width - textWidthGuess - 20;
    const x = minX + Math.random() * (maxX - minX);

    const wpmFactor = Game.activeStage.targetWpm / 15;
    const speed = (0.7 + Math.random() * 0.5) * wpmFactor;
    const isBossMinion = Game.activeStage.isBoss;

    const drone = new DroneEnemy(id, text, x, 0, speed, isBossMinion);
    this.enemies.push(drone);
  }

  fireLaser(targetEnemy) {
    this.shipTargetX = targetEnemy.x;
    const laser = new LaserBolt(this.shipX, this.shipY - 10, targetEnemy.x, targetEnemy.y);
    this.lasers.push(laser);
  }

  destroyDrone(enemy) {
    AudioSFX.playExplosion();
    Game.enemiesCleared++;

    const pointsGained = 10 * enemy.text.length * Game.combo;
    Game.score += pointsGained;

    for (let i = 0; i < 20; i++) {
      const p = new Particle(enemy.x, enemy.y, enemy.color);
      this.particles.push(p);
    }

    this.enemies = this.enemies.filter(e => e.id !== enemy.id);

    const maxToSpawn = Game.activeStage.enemiesToSpawn;
    if (Game.enemiesSpawned >= maxToSpawn && this.enemies.length === 0) {
      this.core.winStage();
    }
  }

  updateNextTargetKeyHighlight() {
    this.core.clearNextKeyHighlights();
    this.core.highlightStageKeys();

    if (Game.state !== 'playing') return;

    let targetChar = null;

    if (this.activeTarget) {
      targetChar = this.activeTarget.text.charAt(this.activeTarget.typedIndex);
    } else {
      if (this.enemies.length > 0) {
        const closest = this.enemies.reduce((acc, enemy) => {
          return (enemy.y > acc.y) ? enemy : acc;
        }, this.enemies[0]);
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
}

// Attach engine globally
window.SpaceEngineInstance = SpaceEngine;
