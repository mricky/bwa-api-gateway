require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const mentorsRouter = require('./routes/mentors');
const mediaRouter = require('./routes/media');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const refreshTokenRouter = require('./routes/refreshTokens');
const webhookRouter = require('./routes/webhook');
const verifyToken = require('./middlewares/verifyToken');
var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: false, limit: '500mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh-tokens', refreshTokenRouter);
app.use('/media',mediaRouter)
app.use('/mentors',mentorsRouter)
app.use('/courses',coursesRouter)
app.use('/chapters',verifyToken,chaptersRouter)
app.use('/lessons',verifyToken,lessonsRouter)
app.use('/image-courses',imageCoursesRouter);
app.use('/my-courses',verifyToken,myCoursesRouter)
app.use('/reviews',verifyToken,reviewsRouter)
app.use('/orders',ordersRouter)
app.use('/payments',paymentsRouter)
app.use('/webhook',webhookRouter);

module.exports = app;
