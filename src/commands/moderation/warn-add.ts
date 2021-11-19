import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";
const schema = require('../../models/warn-model');

export default new Command({
    name: 'warn-add',
    description: 'Warns a user in the guild.',
    userPermissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'user',
            description: 'The user you want to warn.',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for this warn.',
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction, client }) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const target = interaction.guild.members.cache.get(user.id);

        schema.findOne({ guildId: interaction.guildId }, async (data) => {
            new schema({
                guildId: interaction.guildId,
                userId: user.id,
                modId: interaction.user.id,
                reason
            }).save();

            console.log(data.modId);
       });
    },  
})