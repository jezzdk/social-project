const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ unauthorized: true });
      }

      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json(err));
});

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' });
      }

      post.likes.push({ user: req.user.id });
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json(err));
});

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ notliked: 'You have not yet liked this post' });
      }

      const index = post.likes.findIndex(item => item.user.toString() === req.user.id);

      if (index > -1) {
        post.likes.splice(index, 1);
      }

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json(err));
});

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        user: req.user.id
      };

      post.comments.push(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json(err));
});

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotfound: 'Comment does not exist' });
      }

      const index = post.comments.findIndex(item => item._id.toString() === req.params.comment_id);

      if (index > -1) {
        post.comments.splice(index, 1);
      }

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
