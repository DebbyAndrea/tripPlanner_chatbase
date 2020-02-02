const chatbase = require('@google/chatbase');

module.exports = function sendChatBaseRequest(agent, botResponse, flag) {
    const messageSet = chatbase.newMessageSet()
        .setApiKey("5ed3c243-cbcb-416f-b75f-37b2e186a581") // Chatbase API key
        .setPlatform("myOwmApp")
        .setVersion('1.0');

    const sessionId = agent.session;
    const userInput = agent.query;
    const intentName = agent.intent;
    let time = Date.now();
    const botTime = Number(++time);

    const userMessage = messageSet.newMessage() // Create a new instance of Message
        .setAsTypeUser() // Mark it as a message coming from the human
        .setUserId(sessionId) // User ID on the chat platform, or custom ID
        .setCustomSessionId(sessionId)
        .setTimestamp(Date.now().toString()) // Mandatory
        .setIntent(intentName) // The intent decoded from the user message, if applicable
        .setMessage(userInput); // User message

    if (flag) {
        userMessage.setAsHandled(); // Mark this request as successfully handled ;)
    } else {
        userMessage.setAsNotHandled(); // Tell Chatbase to mark this user request as "not handled"
    }
    
    const botMessage = messageSet.newMessage() // See above
        .setAsTypeAgent() // This message is the bot response
        .setUserId(sessionId) // Same as above
        .setCustomSessionId(sessionId)
        .setTimestamp(botTime.toString()) // Mandatory
        .setIntent(intentName)
        .setMessage(botResponse); // Bot response message

    return messageSet.sendMessageSet()
    .then(response => {
        var createResponse = response.getCreateResponse();
        // console.log(response)
        console.log("request done");
        return createResponse.all_succeeded; // "true" if all messages were correctly formatted and have been successfully forwarded
    })
    .catch(error => {
        console.log("Error: ")
        console.error(error);
        return false;
    });

}