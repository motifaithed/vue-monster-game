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
    methods:{
        attackMonster(){
            const healthDamage = getDamage(12,5);
            this.monsterHealth -= healthDamage;
            this.attackPlayer();
        },
        attackPlayer(){
            const healthDamage = getDamage(15,8);
            this.playerHealth -= healthDamage;
        }

    }
});

app.mount('#game');