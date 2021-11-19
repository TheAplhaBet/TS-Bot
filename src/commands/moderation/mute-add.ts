import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";
import ms from 'ms'

export default new Command({
    name: 'mute-add',
    description: 'Mutes a user in the guild.',
    userPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: 'user',
            description: 'The user you are muting.',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for this mute.',
            type: 'STRING',
            required: true
        },
        {
            name: 'time',
            description: 'The time for this mute.',
            type: 'STRING',
            required: false
        }
    ],
    run: async({ interaction, client }) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const time = interaction.options.getString('time');
        const role = interaction.guild.roles.cache.find(
            (r) => r.name.toLowerCase() === 'muted'
        );

        const target = interaction.guild.members.cache.get(user.id);

        if(user.id === client.user.id) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('You cannot mute yourself :/.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});
        if(user.id === client.user.id) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('You cannot mute me :/.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});
        if(!role) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('Could not find the mute role.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});
        if(target.roles.cache.has(role.id)) return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setDescription('This user is already muted.')
            .setColor('RANDOM')
            .setFooter(user.id)
        ], ephemeral: true});

        try {
            if(time) {
                //Role add
                target.roles.add(role).then(async () => {
                    await interaction.followUp({ embeds: [
                        new MessageEmbed()
                        .setDescription(`Successfully Muted ${target} for ${time} and ${reason}.`)
                        .setColor('RED')
                        .setFooter(user.id)
                    ]});
                });

                //Role Remove
                setTimeout(async () => {
                    target.roles.remove(role).then(async () => {
                        await interaction.followUp({ embeds: [
                            new MessageEmbed()
                            .setDescription(`Unmuted ${user} from the timed mute.`)
                            .setColor('BLUE')
                            .setFooter(user.id)
                        ]});
                    });
                }, ms(time));
            } else {
                //Role add
                target.roles.add(role).then(async () => {
                    await interaction.followUp({ embeds: [
                        new MessageEmbed()
                        .setDescription(`Successfully muted ${user} for ${reason}.`)
                        .setColor('RED')
                        .setFooter(user.id)
                    ]});
                });

                //Role remove
                setTimeout(async () => {
                    target.roles.remove(role).then(async () => {
                        await interaction.followUp({ embeds: [
                            new MessageEmbed()
                            .setDescription(`Successfully unmuted ${user} from the default time.`)
                            .setColor('BLUE')
                            .setFooter(user.id)
                        ]});
                    });
                }, ms('2 hours'));
            };
        } catch (e) { console.log(e) }
    }
})