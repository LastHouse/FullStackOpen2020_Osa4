const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', (request, response) => {
  Post.find({}).then((posts) => {
    response.json(posts.map((post) => post.toJSON()));
  });
});

/* postsRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
}); */

postsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  post
    .save()
    .then((savedPost) => {
      response.json(savedPost.toJSON());
    })
    .catch((error) => next(error));
});

/* postsRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

postsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON());
    })
    .catch((error) => next(error));
}); */

module.exports = postsRouter;
