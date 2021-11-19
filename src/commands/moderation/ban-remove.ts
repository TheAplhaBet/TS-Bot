import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'ban-remove',
    description: 'unbans a user.',
    userPermissions: ['BAN_MEMBERS'],
    options: [
        {
            name: 'userid',
            description: 'The id of the user you want to ban.',
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction, client }) => {
        const userid = interaction.options.getString('userid');
        
        try { 
            interaction.guild.members.unban(userid).then(async () => {
                await interaction.followUp({ embeds: [
                    new MessageEmbed()
                    .setDescription(`Successfully unbanned <@${userid}>.`)
                    .setColor('RED')
                    .setFooter(userid)
                ]});
            });
        } catch (e) { console.log(e) };
    }
});