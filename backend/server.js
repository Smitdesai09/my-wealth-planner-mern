const express = require('express')
const cors = require('cors')
const cookiparser = require('cookie-parser')
const connection = require('./config/connection')
const dotenv = require('dotenv')
const { Globallimiter } = require('./middlewares/RateLimiter')



dotenv.config()
connection()

// Instnace of Express
const app = express()
app.set('trust proxy', 1)

// Middleware
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://my-wealth-planner.vercel.app"
  ],
  credentials: true
}));
app.use(cookiparser())

// Auth Router
app.use('/api/auth', require('./routes/AuthRoutes'))
// Profile Router
app.use('/api/profile', require('./routes/ProfileRoutes'))
// Goal Router
app.use('/api/goals', require('./routes/GoalRoutes'))
// Transaction Router
app.use('/api/transactions', require('./routes/TransactionRoutes'))
// Budget Router
app.use('/api/budgets', require('./routes/BudgetRoutes'))
// Holding Routerrs
app.use('/api/holdings', require('./routes/HoldingRoutes'))
// Dashboard Router
app.use('/api/dashboard', require('./routes/DashboardRoutes'))
// Report Router
app.use('/api/report', require('./routes/ReportRoutes'));
// Calculate Router
app.use('/api/calculate', require('./routes/CalculateRoutes'));

app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error'
   });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => console.log(`Server Runnig On ${PORT}`))
