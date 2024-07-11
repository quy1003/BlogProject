const Blog = require('../models/Blogs');
const { toSingleObject } = require('../../util/mongoose');
class BlogController {
    //[GET] - /blogs/:slug
    async show(req, res) {
        try {
            //req.params.slug vì ở file route/blogs.js ta đã định dạng endponint '/:slug'
            const blog = await Blog.findOne({ slug: req.params.slug });
            res.render('blogs/show.hbs', { blog: toSingleObject(blog) });
        } catch (ex) {
            console.error('Something wrong!!!');
        }
    }

    //[GET] - /blogs/create
    create(req, res) {
        res.render('blogs/create.hbs');
    }
    //[GET] - /blogs/:id/edit
    async edit(req, res) {
        try {
            const blog = await Blog.findById(req.params.id);
            res.render('blogs/edit.hbs', { blog: toSingleObject(blog) });
        } catch (ex) {
            console.error('Something wrong');
        }
    }

    //[PUT] - /blogs/:id

    async update(req, res) {
        try {
            //Object có _id là id cần sửa nội dung sửa là req.body
            await Blog.updateOne({ _id: req.params.id }, req.body);
            res.redirect('/me/stored/blogs');
        } catch (ex) {
            console.error('Something wrong');
        }
    }

    //[DELETE] - /blogs/:id
    async delete(req, res) {
        try {
            await Blog.delete({ _id: req.params.id });
            res.redirect('back');
        } catch (ex) {
            console.error('Something wrong');
        }
    }
    //[DELETE] - /blogs/:id/force
    async destroy(req, res) {
        try {
            await Blog.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (ex) {
            console.error('Something wrong');
        }
    }

    //[POST] - /blogs/store
    async store(req, res) {
        try {
            // res.json(req.body)
            const formData = req.body;

            formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
            formData._id = 1
            const blog = new Blog(formData);
            await blog.save();
            res.redirect('/');
        } catch (ex) {
            console.error('Something wrong');
        }
    }

    //[PATCH] - /:id/restore
    async restore(req, res){
        try {
            await Blog.restore({ _id: req.params.id });
            res.redirect('back');
        } catch (ex) {
            console.error('Something wrong');
        }
    }
    //[POST] - /blogs/handle-form-action
    async handleFormAction(req,res){
        if(req.body.action === 'delete'){
            try {
                //Cú pháp xoá mềm []blogIds
                await Blog.delete({ _id: {$in: req.body.blogIds} });
                res.redirect('back');
            } catch (ex) {
                console.error('Something wrong');
            }
        }
    }
}

module.exports = new BlogController();
