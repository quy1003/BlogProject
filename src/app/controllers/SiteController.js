const Blog = require('../models/Blogs');
const { toMultiObject } = require('../../../src/util/mongoose');
class SiteController {
    //[GET] - home
    async index(req, res) {
        try {
            const blogs = await Blog.find({deletedAt:null});
            res.render('home', { blogs: toMultiObject(blogs) });
        } catch (err) {
            res.status(400).json({ error: 'ERROR!' });
        }
        // res.render('home');
    }

    //[GET] - search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
