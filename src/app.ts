import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import './core/config';
import helmet from 'helmet';
import cors from 'cors';

import { isProductionEnvironment } from './core/utils';
import appErrorshandler from './core/appErrorsHandler';
import corsOptionsDelegate from './core/helpers/corsOptionsDelegate';
import './core/db';

/**
 * TODO: import routes
 */
// import routes from './routes';

const app = express();
const logType = isProductionEnvironment() ? 'combined' : 'dev';

app.use(logger(logType));
app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

/**
 * TODO: add free routes an API routes
 */
// app.use('/', routes);

app.use(appErrorshandler);

export default app;
