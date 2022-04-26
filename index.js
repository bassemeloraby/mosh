const express = require('express');
const { status } = require('express/lib/response');
const app = express();

app.use(express.json())
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
  res.send('<h1 style= "color:red">hello world</h1>');
});
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

//create course
app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`the course is not found`);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`express is working at port : ${port}`));
