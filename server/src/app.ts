import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';

// ====
import corsOptions from './secure/cors';
import { connectToDB } from './db/mongo';
import { limiter } from './secure/limiter';

// ======
import personalitiesRouter from './routes/tests/16-personalties.route';
import googleDrive from './routes/google-drive.route';
import loadFilesRoute from './routes/load-files.route';
import consultationRoute from './routes/consultations.route';
import mailerRouter from './routes/mailer.route';
import googleSheetRouter from './routes/google-sheets.route';
import starRatingRoute from './routes/star-rating.route';
import monoRouter from './routes/monopay.route';
import redisClient from './config/redis.config';
import { redisService } from './services/redise.service';
import { initBot } from './bot/bot-instance';

const server = express();

server.set('trust proxy', 1);

server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'));
server.use(cors(corsOptions));

server.use(helmet());

server.use(limiter);
const port = 3000;

server.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(morgan('dev'));

server.use('/api/monopay', monoRouter);

server.use('/api/rating', starRatingRoute);

server.use('/api/google-drive', googleDrive);
server.use('/api/files', loadFilesRoute);

server.use('/api/consultation', consultationRoute);

server.use('/api/send-email', mailerRouter);
server.use('/api/google', googleSheetRouter);

server.use('/api/tests', personalitiesRouter);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
const start = async () => {
  try {
    await redisService.connect();
    // initBot();
    await connectToDB();
    server.listen(port, () => {
      console.log('All configs works!');
    });
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
};

start();
