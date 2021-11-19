import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: 'kick-add',
    description: 'Kicks a user in the guild.',
    userPermissions: ['KICK_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'The user you want to kick.',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for this kick.',
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction, client }) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if(user.id === client.user.id) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('You cannot kick yourself :/.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});
        if(user.id === client.user.id) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('You cannot kick me :/.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});

        try {
            interaction.guild.members.kick(user).then(async () => {
                interaction.followUp({ embeds: [
                    new MessageEmbed()
                    .setTitle(`Successfully kicked ${user} for ${reason}.`)
                    .setColor('RED')
                    .setFooter(user.id)
                ]});
            });
        } catch (e) { console.log(e)};
    }
})