function getDamage(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}

const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0
        }
    },
    computed:{
        attackMonsterHealth(){
            return {width: this.monsterHealth + '%'};
        },
        attackPlayerHealth(){
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    methods:{
        attackMonster(){
            this.currentRound++;
            const healthDamage = getDamage(5,12);
            this.monsterHealth -= healthDamage;
            this.attackPlayer();
        },
        attackPlayer(){
            const healthDamage = getDamage(8,15);
            this.playerHealth -= healthDamage;
        },
        specialAttackMonster(){
            this.currentRound++;
            const healthDamage = getDamage(10,25);
            this.monsterHealth -= healthDamage;
            this.attackPlayer();
        }

    }
});

app.mount('#game');