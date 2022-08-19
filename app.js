function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },

  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth === 0) {
        this.winner = "draw";
        return;
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth === 0) {
        this.winner = "draw";
        return;
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
  },
  computed: {
    attackMonsterHealth() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    attackPlayerHealth() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    restartGame() {
      this.monsterHealth = 100;
      (this.playerHealth = 100),
        (this.currentRound = 0),
        (this.winner = null),
        (this.logMessages = []);
    },
    attackMonster() {
      this.currentRound++;
      const healthDamage = getRandomValue(5, 12);
      this.monsterHealth -= healthDamage;
      this.logs("monster", "attacks", healthDamage);
      this.attackPlayer();
    },
    attackPlayer() {
      const healthDamage = getRandomValue(8, 15);
      this.playerHealth -= healthDamage;
      this.logs("player", "attacks", healthDamage);
    },
    specialAttackMonster() {
      this.currentRound++;
      const healthDamage = getRandomValue(10, 25);
      this.monsterHealth -= healthDamage;
      this.logs("player", "special attacks", healthDamage);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healAmount = getRandomValue(8, 20);
      if (this.playerHealth + healAmount > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healAmount;
      }
      this.logs("player", "heals", healAmount);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    logs(who, what, value) {
      this.logMessages.unshift({
        who: who,
        what: what,
        value: value,
      });
    },
  },
});

app.mount("#game");
