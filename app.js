function getDamage(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}

const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100
        }
    },
    computed:{
        attackMonsterHealth(){
            return {width: this.monsterHealth + '%'};
        },
        attackPlayerHealth(){
            return {width: this.playerHealth + '%'};
        }
    },
    methods:{
        attackMonster(){
            const healthDamage = getDamage(5,12);
            this.monsterHealth -= healthDamage;
            this.attackPlayer();
        },
        attackPlayer(){
            const healthDamage = getDamage(8,15);
            this.playerHealth -= healthDamage;
        }

    }
});

app.mount('#game');