var admin = require("firebase-admin");
const DatabaseVersion = require("../model/databaseVersion");
const Notification = require('../model/notification');

exports.sendMessage = async (type, id, table) => {

    let databaseVersion = await DatabaseVersion.findByPk(1);
    let notification = new Notification({type, tableId: id, tableName: table, version: databaseVersion.version});
    notification = await notification.save();
    databaseVersion.version = databaseVersion.version + 1;
    databaseVersion = await databaseVersion.save();
    const topic = 'all';
    const payload = {
        topic: topic,
        android: {
            priority: 'high',
            data: {
                title: 'notification',
                body: `${type},${id},${table}`
            }
        }
    };
    admin.messaging().send(payload).then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
};