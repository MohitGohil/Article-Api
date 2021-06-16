const router = require('express').Router();
const Article = require('../models/article');

// find single article
router.get('/:id', (req, res) => {
    const id = req.params.id
    Article.findOne({ _id: id }, (err, document) => {
        if(err){
            return res.status(400).json({ error: 'Id not found'});
        }
        if(document){
            return res.json(document)
        }else{
            return res.status(404).json({ error: 'Article not found'})
        }
    })
})

// fetching all articles
router.get('/', (req, res) => {
    Article.find((err, articles) => {
        if (err){
            return res.status(500).json(err)
        }
        return res.json(articles)
    })
})

// create article
router.post('/', async(req, res) => {
    console.log(req.body)
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })

    // Data storing Method 1 with async
    try{
        const document = await article.save()
        return res.status(201).json(document)
    }catch(err){
        res.status(400).json(err.message)
    }
    
    // Data storing Method 2 without async
    // article.save((err, document) => {
    //     if (err){
    //         return res.status(400).json(err.message)
    //     }
    // })

});

// update article
router.patch('/:id', (req, res) => {
    const id = req.params.id
    const {title, body, author} = req.body
    Article.findOne({ _id: id }, (err, document) => {
        if(err){
            return res.status(400).json({error: 'Id not found'});
        }
        if(document){
            Article.updateOne({ _id: id },
            {
                title,
                body,
                author
            }).then(status => {
                return res.json(req.body)
            }).catch(err => {
                return res.json(err)
            })
        }else{
            return res.status(404).json({ error: 'Article not found'})
        }
    })
})

// delete article
router.delete('/:id', (req, res) => {
    const { id } = req.params 
    Article.deleteOne({ _id : id}).then((status) => {
        return res.json({ DeletedId: id, Status: 'Deleted'})
    }).catch(err => {
        return res.status(500).json(err)
    })
})

module.exports = router