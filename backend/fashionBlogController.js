const fs = require('fs');
const bodyParser = require('body-parser');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const MarketPlaceSchema = require('./MarketPlaceSchema')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://osmaneclipsemedia:012198_OjBj@cluster0.g47de.mongodb.net/FashionBlog?retryWrites=true&w=majority&appName=Cluster0');
mongoose.promise = global.promise;

// Define the path for the uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
console.log('Directory:', uploadsDir)

// Check if the uploads directory exists, if not, create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadsDir);
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const commentSchema = new mongoose.Schema({
    blogPostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Blog', 
        required: true
    },
    name: {type: String, required: true},
    commentContent: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

const Comment = mongoose.model('Comment', commentSchema);

const PostSchema = new mongoose.Schema({
    title: String,
    author: String,
    tag: [String],
    image: String,
    content: String,
    likes: {type: Number, default: 0},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

const Blog = mongoose.model('Blog', PostSchema)

module.exports = function(app) {
    app.get('/', function(req, res){
        res.json({message: "Hello from the backend"})
    })

    //For getting the blog posts
    app.get('/posts', async function(req, res){
        try{
            const blogPosts = await Blog.find()
            .populate('comments')
            .exec()


            res.json({
                message: "Post retrieved successfully",
                posts: blogPosts
            })
        } catch(err) {
            console.error('Error fetching blog posts: ', err);
            res.status(500).send('Error retrieving posts.');
        }
    })

    //For adding the blog post
    app.post('/blog', upload.single('image'), async function(req, res){
        try{
            if (!req.file) {
                console.log('Incorrect file')
                return res.status(400).send('No image uploaded.');
            }

            const {author, title, tag, content} = req.body;
            const imageUrl = `/uploads/${req.file.filename}`;
            console.log('image url: ', imageUrl)

            const newBlog = new Blog({
                title: title,
                author: author,
                content: content,
                tag: tag.split(','),
                likes: 0,
                image: imageUrl,
                comments: []
            })

            if(req.body.comment && req.body.commentName){
                const newComment = new Comment({
                    blogPostId: newBlog._id,
                    name: req.body.name,
                    commentContent: req.body.comment
                })

                await newComment.save()
                newBlog.comments.push(newComment._id);
            }

            await newBlog.save();

            return res.status(201).json({
                message: 'Blog post created successfully',
                blog: newBlog
              })
        } catch(error){
            console.error('Error posting: ', error)
            res.status(500).send('Error creating blog post.');
        }
    })

    //For adding the number of likes
    app.post('/blog/:id/like', async function(req,res){
        try{
            const blogPost = await Blog.findById(req.params.id);

            if(!blogPost){
                console.log('Blog post not found')
                return res.status(404).send('Blog post was not found')
            }

            const newLikesCount = blogPost.likes === 0 ? 1 : 0;
            blogPost.likes = newLikesCount
            await blogPost.save();

            res.json({
                message: 'You liked this post',
                likes: blogPost.likes
            })
        } catch(error){
            console.error('Liking this post threw an error: ', error)
        }
    })

    //For adding to the market place
    app.post('/marketplace', upload.single('image'), async (req, res) => {
        try{
            const {title, description, price} = req.body;
            const imageUrl = `/uploads/${req.file.filename}`;

            const newItem = new MarketPlaceItem({
                title,
                description,
                price,
                image: imageUrl
            })

            await newItem.save()
            res.status(201).json({message: 'Item added to the market', item: newItem})
        } catch(err){
            console.error('Error adding item to the market place', err)
            res.status(500).send('Error adding item to the market place')
        }
    })
}