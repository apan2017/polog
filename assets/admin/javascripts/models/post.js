var m = require('mithril');
var utils = require('../utils.js');

var Post = {
  list: [],
  loadList: function () {
    m.request({
      method: 'GET',
      url: '/admin/posts.json',
      withCredentials: true
    })
    .then(function(data) {
      Post.list = data;
    })
  },
  load: function(id) {
    return m.request({
      method: 'GET',
      url: '/admin/posts/show/' + id,
      withCredentials: true
    })
  },
  create: function(form) {
    return m.request({
        method: 'POST',
        url: '/admin/posts/create',
        data: {post: form},
        withCredentials: true,
        config: utils.xhrConfig
      })
  },
  update: function(form) {
    return m.request({
      method: 'PUT',
      url: '/admin/posts/update/' + form.id,
      data: {post: form},
      withCredentials: true,
      config: utils.xhrConfig
    })
  },
  publish: function(post) {
    return m.request({
      method: 'PUT',
      url: '/admin/posts/publish/' + post.id,
      data: {published: post.published},
      withCredentials: true,
      config: utils.xhrConfig
    })
    .then(function(resp) {
      post.published_at = resp.published_at;
    })
  },
  selectedObject: {}
}

module.exports = Post;
