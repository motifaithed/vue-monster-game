function getRandomValue(min,max){
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
            const healthDamage = getRandomValue(5,12);
            this.monsterHealth -= healthDamage;
            this.attackPlayer();
        },
        attackPlayer(){
            const healthDamage = getRandomValue(8,15);
            this.playerHealth -= healthDamage;
        },
        specialAttackMonster(){
            this.currentRound++;
            const healthDamage = getRandomValue(10,25);
            this.monsterHealth -= healthDamage;
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healAmount = getRandomValue(8,20)
            if(this.playerHealth + healAmount > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healAmount; 
            }
            this.attackPlayer();
        }
    }
});

app.mount('#game');