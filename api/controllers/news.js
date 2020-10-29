const News = require("../model/news");
const messaging = require("./messaging");

exports.get_all = async (req, res, next) => {
    try {
        const docs = await News.findAll({order: [['id', 'ASC']]});
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.get3News = async (req, res, next) => {
    try {
        const docs = await News.findAll({order: [['createdAt', 'DESC']], limit: 3});
        console.log(docs)
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        const item = await News.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.get_all_by_company = async (req, res, next) => {
    try {
        const docs = await News.findAll({where: {company: req.params.company}});
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
const table = 'news';
exports.create = async (req, res, next) => {
    const {name, nameRu, nameKr, description, descriptionRu, descriptionKr, company, date, url, urlRu} = req.body;
    if (name && nameRu && nameKr && description && descriptionRu && descriptionKr && company && date && url && urlRu && req.file) {
        const news = new News({
            name,
            nameRu,
            nameKr,
            description,
            descriptionRu,
            descriptionKr,
            company,
            date,
            url,
            urlRu,
            image: req.file.path
        });
        try {
            const result = await news.save();
            messaging.sendMessage('insert', result.id, table);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({error: err});
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {name, nameRu, nameKr, description, descriptionRu, descriptionKr, company, date, url, urlRu} = req.body;
    if (name && nameRu && nameKr && description && descriptionRu && descriptionKr && company && date && url && urlRu) {
        try {
            let news = await News.findByPk(id);
            news = await news.update({
                name,
                nameRu,
                nameKr,
                description,
                descriptionRu,
                descriptionKr,
                company,
                date,
                url,
                urlRu,
                image: (req.file ? req.file.path : news.image)
            })
            messaging.sendMessage('update', news.id, table);
            res.status(200).json(news);
        } catch (err) {
            res.status(500).json({error: err})
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
}

exports.delete = async (req, res, next) => {
    try {
        let news = await News.findByPk(req.params.id)
        const id = news.id;
        news = await news.destroy();
        messaging.sendMessage('delete', id, table);
        res.status(200).json({success: true, message: "Deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
}

exports.updateViewCount = async (req, res, next) => {
    try {
        let news = await News.findByPk(req.params.id)
        await news.update({...news, viewsCount: news.viewsCount + 1});
        res.status(200).json({message: 'updated'})
    } catch (e) {
        res.status(500).json({error: e})
    }
}