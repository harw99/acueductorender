import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// TODO >>>>>>>> Use's

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


// TODO >>>>>>>> Here all Routes

import authRoutes from './routes/auth.routes.js'

import userRoutes from './routes/user.routes.js'
import meterRoutes from './routes/meter.routes.js'
import invoicesRoutes from './routes/invoices.router.js'
import collectionRoutes from './routes/collection.routes.js'
import reportRoutes from './routes/reports.routes.js'
import MedidorRoutes from './routes/medidor.routes.js'
import paymentRoutes from './routes/payment.routes.js'

// TODO >>>>>>>> Routes Use's

app.use('/api', authRoutes)
app.use('/api', userRoutes )
app.use('/api', meterRoutes )
app.use('/api', invoicesRoutes )
app.use('/api', collectionRoutes )
app.use('/api', reportRoutes )
app.use('/api', MedidorRoutes )
app.use('/api', paymentRoutes )

export default app