import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'mute-remove',
    description: 'Unmutes a user in the guild.',
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
            name: 'user',
            description: 'The user you want to unmute.',
            type: 'USER',
            required: true
        },
        {
            name: 'resaon',
            description: 'The reason for this unmute.',
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction, client }) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const role = interaction.guild.roles.cache.find(
            (r) => r.name.toLowerCase() === 'muted'
        );

        const target = interaction.guild.members.cache.get(user.id);

        if(!target.roles.cache.has(role.id)) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription(`This user is already muted.`)
            .setColor("RANDOM")
            .setFooter(user.id)
        ]});

        try {
            target.roles.remove(role).then(async () => {
                await interaction.followUp({ embeds: [
                    new MessageEmbed()
                    .setDescription(`Successfully unmuted ${user} for ${reason}.`)
                    .setColor("BLUE")
                    .setFooter(user.id)
                ]});
            });
        } catch (e) { console.log(e) };
    }  
})