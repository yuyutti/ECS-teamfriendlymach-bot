const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
require('dotenv').config();

const token = process.env.token;

const A = process.env.Ateam
const B = process.env.Bteam
const C = process.env.Cteam
const D = process.env.Dteam
const E = process.env.Eteam
const F = process.env.Fteam
const rolls = [ A, B, C, D, E, F ]
let set = 0

client.on('messageCreate', async message => {
    if(message.channel.id === '1141458066374676523'){
        if (message.mentions.members.size === 2) {
            const Logger = client.channels.cache.get('1151894557882069084');
    
            const role = message.guild.roles.cache.get(await setRoll());
    
            if (!role) return Logger.send(`ロールが見つけられないため付与できませんでした`);
    
            message.mentions.members.forEach(async mentionedMember => {
                try {
                    await mentionedMember.roles.add(role);
                    Logger.send(`${mentionedMember}に${role.name}ロールを付与しました。`);
                } catch (error) {
                    console.error(error);
                    Logger.send(`${mentionedMember}に${role.name}ロールを付与できませんでした`);
                }
            });
        }
    }
    if(message.channel.id === '1151898552931467285'){
        if (message.mentions.members.size >= 2) {
            const Logger = client.channels.cache.get('1151894557882069084');
        
            const [firstMember, secondMember] = [...message.mentions.members.values()];
            const rolesMemberHas = firstMember.roles.cache.map(role => role.id);
            const rolesActuallyToRemove = rolls.filter(roleId => rolesMemberHas.includes(roleId));
        
            if (rolesActuallyToRemove.length > 0) {
                try {
                    await firstMember.roles.remove(rolesActuallyToRemove);
                    Logger.send(`指定されたロールを${firstMember.displayName}から取り除きました。`);
        
                    await secondMember.roles.add(rolesActuallyToRemove);
                    Logger.send(`指定されたロールを${secondMember.displayName}に付与しました。`);
                }
                catch(error){
                    console.error(error);
                    Logger.send(`ロールの操作に問題が発生しました。`);
                }
            }
        }
    }
});

async function setRoll(){
    set++
    if(set === 1) return A
    if(set === 2) return B
    if(set === 3) return C
    if(set === 4) return D
    if(set === 5) return E
    if(set === 6){
        set = 0
        return F
    }
}

client.login(token);