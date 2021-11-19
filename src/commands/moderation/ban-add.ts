import { Command } from '../../structures/Command';
import { Message, MessageEmbed } from 'discord.js';

export default new Command({
    name: 'ban-add',
    description: 'Bans a user in the guild',
    userPermissions: ['BAN_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'Ther usre for the ban.',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for this ban.',
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction, client }) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if(user.id === client.user.id) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('You cannot ban yourself :/.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});
        if(user.id === client.user.id) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('You cannot ban me :/.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});

        try {
            interaction.guild.members.ban(user.id).then(async () => {
                await interaction.followUp({ embeds: [
                    new MessageEmbed()
                    .setDescription(`Successfully banned ${user} for ${reason}.`)
                    .setColor('RED')
                    .setFooter(user.id)
                ]});
            });
        } catch (e) { console.log(e) };
    },
});