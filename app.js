const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require("./api/configuration/db");
const path = require("path");
const bcyrpt = require('bcrypt');
var admin = require("firebase-admin");
var serviceAccount = require("./admin-sdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mobilset-ussd.firebaseio.com"
});

//INCLUDE MODELS
const Operator = require("./api/model/operator");
const User = require("./api/model/user");
const News = require("./api/model/news");
const PaynetNews = require("./api/model/paynetNews");
const Menu = require("./api/model/menu");
const Ussd = require("./api/model/ussd");
const Tarif = require("./api/model/tarif");
const NetworkCategory = require("./api/model/networkCategory");
const Network = require("./api/model/network");
const ServiceCategory = require("./api/model/serviceCategory");
const Service = require("./api/model/service");
const Contact = require("./api/model/contact");
const DaqiqaCategory = require("./api/model/daqiqaCategory");
const Daqiqa = require("./api/model/daqiqa");
const SmsCategory = require("./api/model/smsCategory");
const Sms = require("./api/model/sms");
const DatabaseVersion = require("./api/model/databaseVersion");
const Notification = require("./api/model/notification");
const Slider = require("./api/model/slider");

const operatorRoutes = require('./api/routes/operators');
const newsRoutes = require('./api/routes/news');
const userRoutes = require('./api/routes/users');
const menuRoutes = require('./api/routes/menu');
const ussdRoutes = require('./api/routes/ussd');
const tarifRoutes = require('./api/routes/tarif');
const networkCategoryRoutes = require('./api/routes/networkCategory');
const networkRoutes = require('./api/routes/network');
const serviceCategoryRoutes = require('./api/routes/serviceCategory');
const serviceRoutes = require('./api/routes/service');
const contactRoutes = require('./api/routes/contact');
const daqiqaCategoryRoutes = require('./api/routes/daqiqaCategory');
const daqiqaRoutes = require('./api/routes/daqiqa');
const smsCategoryRoutes = require('./api/routes/smsCategory');
const smsRoutes = require('./api/routes/sms');
const notificationRoutes = require('./api/routes/notification');
const sliderRoutes = require('./api/routes/slider');
const paynetNewsRoutes = require('./api/routes/paynetNews');
const searchRoutes = require('./api/routes/search');

sequelize
    .authenticate()
    .then(() => {
        console.log("Ma'lumotlar ombori bilan bog'landik!");
    })
    .catch(err => {
        console.error("Ma'lumotlar ombori bilan bog'lana olmadik!", err);
    });
//CREATE TABLES
Operator.sync();
Operator.count(c => {
    if (c == 0) {
        const uzmobile = new Operator({
            name: 'Uzmobile',
            description: '',
            descriptionRu: '',
            descriptionKr: '',
            balansUssd: '',
            networkUssd: '',
            daqiqaUssd: '',
            smsUssd: '',
            cabinet: '',
            operatorNumber: ''
        });
        uzmobile.save();
        const ums = new Operator({
            name: 'Ums',
            description: '',
            descriptionRu: '',
            descriptionKr: '',
            balansUssd: '',
            networkUssd: '',
            daqiqaUssd: '',
            smsUssd: '',
            cabinet: '',
            operatorNumber: ''
        });
        ums.save();
        const ucell = new Operator({
            name: 'Ucell',
            description: '',
            descriptionRu: '',
            descriptionKr: '',
            balansUssd: '',
            networkUssd: '',
            daqiqaUssd: '',
            smsUssd: '',
            cabinet: '',
            operatorNumber: ''
        });
        ucell.save();
        const beeline = new Operator({
            name: 'Beeline',
            description: '',
            descriptionRu: '',
            descriptionKr: '',
            balansUssd: '',
            networkUssd: '',
            daqiqaUssd: '',
            smsUssd: '',
            cabinet: '',
            operatorNumber: ''
        });
        beeline.save();
        const perfectum = new Operator({
            name: 'Perfectum',
            description: '',
            descriptionRu: '',
            descriptionKr: '',
            balansUssd: '',
            networkUssd: '',
            daqiqaUssd: '',
            smsUssd: '',
            cabinet: '',
            operatorNumber: ''
        });
        perfectum.save();
    }
})
User.sync();
User.count().then(c => {
    if (c == 0) {
        bcyrpt.hash('1', 10, (err, hash) => {
            if (err) {
                console.log('error create hash')
            } else {
                const user = new User({
                    login: 'admin',
                    password: hash
                });
                user.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log('error save user')
                    });
            }
        });
        bcyrpt.hash('1', 10, (err, hash) => {
            if (err) {
                console.log('error create hash')
            } else {
                const user = new User({
                    login: 'user',
                    password: hash
                });
                user.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log('error save user')
                    });
            }
        })
    }
})
News.sync();
PaynetNews.sync();
Menu.sync();
Menu.count().then(c => {
    if (c === 0) {
        const menu = new Menu({botUrl: "", facebook: "", instagram: "", email: "", info: "", infoRu: "", infoKr: ""});
        menu.save();
    }
});
Ussd.sync();
Tarif.sync();
NetworkCategory.sync();
Network.sync();
ServiceCategory.sync();
Service.sync();
Contact.sync();
DaqiqaCategory.sync();
Daqiqa.sync();
SmsCategory.sync();
Sms.sync();
DatabaseVersion.sync();
DatabaseVersion.count().then(c => {
    if (c === 0) {
        const dbV = new DatabaseVersion({version: 1});
        dbV.save();
    }
});
Notification.sync();
Slider.sync();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/api/operators', operatorRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/ussd', ussdRoutes);
app.use('/api/tarif', tarifRoutes);
app.use('/api/networkCategory', networkCategoryRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/serviceCategory', serviceCategoryRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/daqiqaCategory', daqiqaCategoryRoutes);
app.use('/api/daqiqa', daqiqaRoutes);
app.use('/api/smsCategory', smsCategoryRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/api/paynetNews', paynetNewsRoutes);
app.use('/api/search', searchRoutes);

//Static file declaration
// app.use(express.static(path.join(__dirname, 'dist')));
//
// //production mode
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'dist')));
//     //
//     app.get('*', (req, res) => {
//         res.sendfile(path.join(__dirname + '/dist/index.html'));
//     })
// }
// //build mode
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
// })

app.use((req, res, next) => {
    const error = new Error(' Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;