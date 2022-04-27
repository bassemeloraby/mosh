const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
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
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//update courses
app.put('/api/courses/:id', (req, res) => {
  //look up the course
  //if not exist ,return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`the course is not found`);

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //update course
  //return the updated course
  course.name = req.body.name;
  res.send(course);
});

//function to validate course
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

//look up for course
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`the course is not found`);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`express is working at port : ${port}`));
