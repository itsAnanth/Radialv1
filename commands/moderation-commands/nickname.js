const errorText = require('../../embeds/text')
module.exports = {
    name: 'setnick',
    aliases: ['setnickname' , 'nickname'],
    execute: async (message, args, Discord) => {
        if (!message.guild) return;
        if (!message.member.hasPermission('MANAGE_NICKNAMES')) return;
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('```diff\n- Error : Missing bot permission\n+ Permission Required : Manage Nicknames```')).catch(console.error);
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('```diff\n- Error : missing arguments , please provide a user\n+ Usage : !setnick [user id / mention] [New nickname]```')).catch(console.error)
        const target = message.guild.members.fetch(args[1].replace(/\D/g, ''));
        try {
            await target
        } catch (e) {
            message.channel.send(new Discord.MessageEmbed()
                .setDescription('```diff\n- Error : Unknown user / ID```')).catch(console.error);
            return;
        }
        target.then(user => {
            if (user.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`\`\`\`diff\n- Error : ${user.user.username}'s role is higher than bot's role\`\`\``)).catch(console.error);

            if (args[2]) {
                const reason = args.splice(2).join(" ");
                user.setNickname(`${reason}`).catch(e => console.log(e));
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`\`\`\`diff\n+ Set nickname of ${user.user.tag} to ${reason}\`\`\``)).catch(e => console.log(e));
            } else {
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`\`\`\`diff\n- Error : missing arguments , please provide a nickname\`\`\``)).catch(e => console.log(e));
            }
        }).catch(err => message.channel.send(new Discord.MessageEmbed()
        .setDescription(`\`\`\`diff\n- Error : ${err}\`\`\`\n${errorText}`))).catch(console.error);
}
}