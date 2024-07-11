const Blog = require('../models/Blogs');
const { toMultiObject } = require('../../util/mongoose');

class MeController {
    //[GET] - /me/stored/blogs
    async storedBlogs(req, res, next) {
        try {
            const deletedBlogs = await Blog.countDocumentsWithDeleted({deleted: true})
            let blogsQuery
            if (req.query.hasOwnProperty('_sort')) {
                let type = ['asc', 'desc'].includes(req.query.type)
                blogsQuery =  await Blog.find({}).sort({ [req.query.column]: type ? req.query.type : 'desc' });
              }
            else
                blogsQuery = await Blog.find({});
            res.render('me/stored-blogs', { deletedBlogs, blogs: toMultiObject(blogsQuery) });
        } catch (err) {
            console.error(err)
        }
    }
    //[GET] - /me/trash/blogs
    async trashBlogs(req, res){
        try {
            const blogs = await Blog.findWithDeleted({deleted: true});
            res.render('me/trash', { blogs: toMultiObject(blogs) });
        } catch (err) {
            res.status(400).json({ error: 'ERROR!' });
        }
    }
}

module.exports = new MeController();
