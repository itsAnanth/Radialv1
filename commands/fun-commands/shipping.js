const errorText = require('../../embeds/text')
module.exports = {
    name: 'ship',
    aliases: ['shipping'],
    execute: async (message, args, Discord) => {
        if (!message.guild) return;
        if (args.length > 2) return;
        const sademotes = [
            '<:pepehands:817086292449034300>',
            '<:notlikemiyu:805359713591230524>',
            '<:pain:815180427257970689>'
        ]
        const sademotesresult = Math.floor(Math.random() * 3)

        const shipNum = Math.floor(Math.random() * 100) + 1 + '%'
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('```diff\n- Error : Please provide a user ID / mention```')).catch(e => console.log(e));
        const shipUser = message.client.users.fetch(args[1].replace(/\D/g, ''))

        try { 
            await shipUser
        } catch (err) {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription('```diff\n- Error : unknown user / ID```')).catch(console.error);
            return;
        }

        shipUser.then(user => {
            if(shipNum > 50 + 1 + '%'){
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Shipping Meter <:owo:806100319745736734>`)
                .setColor('RANDOM')
                .setDescription(`${message.author.username} x ${user.username} has ${shipNum} chance of success 😳`)
                .setFooter('Powered by reliable shipping meter ©')).catch(console.error)
            } else if(shipNum < 50 + 1 + '%'){
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Shipping Meter <:owo:806100319745736734>`)
                .setColor('RANDOM')
                .setDescription(`${message.author.username} x ${user.username} has ${shipNum} chance of success ${sademotes[sademotesresult]}`)
                .setFooter('Powered by reliable shipping meter ©')).catch(console.error)

            }
        }).catch(err => message.channel.send(new Discord.MessageEmbed()
            .setDescription(`\`\`\`diff\n- Error : ${err}\`\`\`\n ${errorText}`))).catch(console.error);
    }
}