const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.json());

app.post(   '/blogs',        (req, res) => { createBlog(req, res) });
app.put(    '/blogs/:title', (req, res) => { updateBlog(req, res) });
app.delete( '/blogs/:title', (req, res) => { deleteBlog(req, res) });
app.get(    '/blogs/:title', (req, res) => { readBlog(req, res)   });
app.get(    '/blogs',        (req, res) => { showBlogs(req, res)  });

const createBlog = (req, res) => {
  if (isInvalid(req)) {
    res.status(400);
    res.send('Invalid request');
    return;
  }
  const title = req.body.title;
  const blog = {
    title: req.body.title,
    content: req.body.content
  };
  const blogJsonFormat = JSON.stringify(blog);
  placeBlog('/blogs', `${req.body.title}.json`, blogJsonFormat);
  res.setHeader("Content-Type", "application/json");
  res.status(201);
  res.send(`The ${title} blog is created`);
};

const updateBlog = (req, res) => {
  if (!checkBlogExists(req)) {
    res.status(404);
    res.send('The blog is Not Found');
    return;
  }
  if (isInvalid(req)) {
    res.status(400); 
    res.send('Invalid request');
    return;
  }
  const title = req.params.title;
  const updatedBlog = {
    title: req.body.title,
    content: req.body.content
  };
  const blogJsonFormat = JSON.stringify(updatedBlog);
  placeBlog('/blogs', `${title}.json`, blogJsonFormat);
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(`The ${title} blog is updated`);
};

const deleteBlog = (req, res) => {
  if (!checkBlogExists(req)) {
    res.status(404);
    res.send('The blog is Not Found');
    return;
  }
  const title = req.params.title;
  fs.unlinkSync(path.join(__dirname, '/blogs', `${title}.json`));
  res.status(200);
  res.send(`The ${title} blog is deleted`);
}; 

const readBlog = (req, res) => {
  if (!checkBlogExists(req)) {
    res.status(404);
    res.send('The blog is Not Found');
    return;
  }
  const title = req.params.title;
  const data = fs.readFileSync(path.join(__dirname, '/blogs', `${title}.json`));
  const parsedData = JSON.parse(data);
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(parsedData);
};

const showBlogs = (req, res) => {
  if (fs.readdirSync(path.join(__dirname, '/blogs')).length === 0) {
    res.status(404);
    res.send('The blogs are Not Found');
  } else {
    const listOfBlogs = fs.readdirSync(path.join(__dirname, '/blogs'));
    const showBlogsTitles = listOfBlogs.map(blog => {
      const readBlog = fs.readFileSync(path.join(__dirname, '/blogs', blog));
      const blogStringed = readBlog.toString();
      const parsedJson = JSON.parse(blogStringed);
      return { title: parsedJson.title };
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(showBlogsTitles);
  }
};

const isInvalid = req => {
  if (!req.body.title || !req.body.content) {
    return true;
  } else {
    return false;
  }
};

const placeBlog = (containerFolder, fileName, blog) => {
  fs.writeFileSync(path.join(__dirname, containerFolder, fileName), blog);
};

const checkBlogExists = req => {
  const title = req.params.title;
  if (fs.existsSync(path.join(__dirname, '/blogs', `${title}.json`))) {
    return true;
  } else {
    return false;
  }
};

app.listen(5000);
