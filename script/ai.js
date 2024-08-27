const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "api by jerome",//api by jerome
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('𝙿𝙻𝙴𝙰𝚂𝙴 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰 𝙿𝚁𝙾𝙼𝙽𝚃 𝚃𝙾 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴 𝙰 𝚃𝙴𝚇𝚃 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n𝙴𝚇𝙰𝙼𝙿𝙻𝙴: 𝙰𝙸 𝚆𝙷𝙰𝚃 𝙸𝚂 𝚃𝙷𝙴 𝙼𝙴𝙰𝙽𝙸𝙽𝙶 𝙾𝙵 𝙻𝙸𝙵𝙴?', event.threadID, messageID);
        }
        api.sendMessage('🔍 𝚂𝙴𝙰𝚁𝙲𝙷𝙸𝙽𝙶 𝙵𝙾𝚁 𝙰𝙽 𝙰𝙽𝚂𝚆𝙴𝚁 𝚃𝙾 𝚈𝙾𝚄𝚁 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`➤🤖 𝙰𝙸 𝙰𝙽𝚂𝚆𝙴𝚁\n━━━━━━━━━━━━━━━━\n\n▀▄▀▄ 𝙾𝚆𝙽𝙴𝚁: 𝙼𝙰𝚁𝙺 𝙼𝙰𝚁𝚃𝙸𝙽𝙴𝚉▄▀▄▀\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
