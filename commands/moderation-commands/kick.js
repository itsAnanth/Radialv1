module.exports = {
    name: 'kick',
    execute: async (message, args, Discord) => {
        if (!message.guild) return;
        if (!message.member.hasPermission('KICK_MEMBERS')) return;
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('```diff\n- Error : Missing bot permission\n+ Permission Required : Kick Members```')).catch(console.error);
        if (!args[1]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('```diff\n- Error : missing arguments , please provide a user\n+ Usage : !kick [user id / mention] [Reason(optional)]```')).catch(console.error)
        const target = message.guild.members.fetch(args[1].replace(/\D/g, ''));
        if (args[1].includes(message.author.id)) return message.channel.send('```diff\n- Error : you can\'t kick yourself```').catch(console.error)
        target.then(user => {
            if (user.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`\`\`\`diff\n- Error : ${user.user.username}'s role is higher than bot's role\`\`\``)).catch(console.error);

            if (args[2]) {
                const reason = args.splice(2).join(" ");
                user.send(new Discord.MessageEmbed()
                    .setDescription(`\`\`\`diff\n+ You were kicked from ${message.guild.name} \n+ Reason : ${reason}\`\`\``)).catch(console.error)
                user.kick({
                    reason: `${reason}`
                }).catch(e => console.log(e));
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`\`\`\`diff\n+ Kicked user : ${user.user.tag} \n+ Reason : ${reason}\`\`\``)).catch(e => console.log(e));
            } else {
                user.send(new Discord.MessageEmbed()
                    .setDescription(`\`\`\`diff\n+ You were kicked from ${message.guild.name} \n- Reason : Not provided`))
                user.kick().catch(e => console.log(e));
                message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`\`\`\`diff\n+ Kicked user : ${user.user.tag} \n- Reason : Not provided`)).catch(e => console.log(e));
            }
        }).catch(e => message.channel.send(new Discord.MessageEmbed()
            .setDescription('```diff\n- Error : Unknown user(ID)```'))).catch(console.error)
    }
}