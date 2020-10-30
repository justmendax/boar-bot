module.exports = {
    name: "orthodox",
    category: "fun",
    description: "Sends random orthodox chants :boar:",
    run: async (client, message, args) => {
        const chants = ['https://youtu.be/feu2owd0MsY', 'https://youtu.be/ZzdzJ58_oEo', 'https://youtu.be/avy2OdfKt6A', 'https://youtu.be/OBsriN3DlLA', 'https://youtu.be/eMQbCKO45As', 
        'https://youtu.be/Lcv2jVonpmM', 'https://youtu.be/J-TWZBJvack', 'https://youtu.be/fiK8wHm4JGM', 'https://youtu.be/AAQH2GvWidY', 'https://youtu.be/-PkwGmE7D3g', 
        'https://youtu.be/ieoU6dzB_Q8', 'https://youtu.be/AbzmffzStLQ', 'https://youtu.be/kQ-I-VQsvko'];
        const random = chants[Math.floor(Math.random() * chants.length)]
        message.channel.send(random);
    }
}