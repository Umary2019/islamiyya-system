# DEPLOYMENT GUIDE

This guide covers deploying the Islamiyya School Management System to production.

## Pre-deployment Checklist

- [ ] All tests pass locally
- [ ] Environment variables are secure
- [ ] Database backups are in place
- [ ] HTTPS certificates are ready
- [ ] Team is trained on the system
- [ ] Data migration plan (if any) is complete

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your_production_secret
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   heroku logs --tail
   ```

### Option 2: AWS EC2

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t2.micro (free tier)

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Setup Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Setup MongoDB** (or use MongoDB Atlas)
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   ```

5. **Deploy Application**
   ```bash
   git clone your-repo
   cd backend
   npm ci
   npm start
   ```

6. **Setup PM2 for Process Management**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "islamiyya-backend"
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt-get install -y nginx
   ```

   Edit `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 3: DigitalOcean App Platform

1. **Push code to GitHub**
2. Go to DigitalOcean App Platform
3. Connect GitHub repository
4. Set environment variables
5. Deploy with one click

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment**
   - Set API endpoint in `src/utils/api.js` to production backend URL

## Full-Stack Deployment on Vercel (Frontend + Backend)

Use this approach for this repository structure.

1. **Deploy backend as its own Vercel project**
   - Import the same GitHub repository in Vercel.
   - Set **Root Directory** to `backend`.
   - Vercel will use `backend/vercel.json` and serve Express via serverless function.
   - Add backend environment variables in Vercel:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NODE_ENV=production`

2. **Get backend production URL**
   - Example: `https://islamiyya-backend.vercel.app`
   - Health check URL: `https://islamiyya-backend.vercel.app/api/health`

3. **Deploy frontend as a second Vercel project**
   - Import the same GitHub repository again.
   - Set **Root Directory** to `frontend`.
   - Vercel will build with Vite and use `frontend/vercel.json` for SPA rewrites.

4. **Set frontend environment variable**
   - In frontend Vercel project settings, add:
     - `VITE_API_URL=https://islamiyya-backend.vercel.app/api`

5. **Redeploy frontend**
   - Trigger a redeploy after adding env vars.

This setup is required because the codebase is split into two standalone apps.

### Option 2: Netlify

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Drag and drop `dist` folder to Netlify**
   OR connect GitHub for automatic deployments

3. **Set environment variables in Netlify dashboard**

### Option 3: AWS S3 + CloudFront

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name/
   ```

3. **Setup CloudFront CDN** for better performance

## Database Deployment

### MongoDB Atlas (Recommended)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster** (M0 free tier for testing)
3. **Create Database User** with strong password
4. **Create IP Whitelist** (allow your server IP)
5. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```
6. **Update backend .env** with this connection string

## Environment Variables (Production)

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/islamiyya_school
JWT_SECRET=very_long_random_string_at_least_32_characters_1234567890abcdef
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Security Best Practices

1. **Use HTTPS** everywhere
2. **Strong JWT Secret** (at least 32 characters)
3. **Enable CORS** only for your frontend domain
4. **Rate Limiting** on API endpoints
5. **Database Backup** scheduled daily
6. **Monitor Logs** for suspicious activity
7. **Update Dependencies** regularly
8. **Use Environment Variables** for all secrets
9. **Enable MongoDB encryption** at rest
10. **Regular Security Audits**

## Performance Optimization

### Backend
- Enable gzip compression
- Use clustering for multi-core usage
- Implement caching strategies
- Optimize database queries with indexes
- Use CDN for static assets

### Frontend
- Code splitting by route
- Lazy load components
- Minify CSS and JavaScript
- Compress images
- Use service workers for offline support

## Monitoring & Logging

### Backend Monitoring
- Use Sentry for error tracking
- Setup PM2 Monitoring
- CloudWatch for AWS deployments

### Frontend Monitoring
- Use Sentry for JavaScript errors
- Google Analytics for user tracking
- Vercel Analytics (if using Vercel)

### Database Monitoring
- MongoDB Atlas provides monitoring dashboard
- Setup alerts for high CPU/memory usage
- Monitor connection limits

## Backup & Recovery

1. **Database Backups**
   ```bash
   mongodump --uri "mongodb+srv://..." --out ./backup
   ```

2. **Automated Backups**
   - MongoDB Atlas: Enable automated backups
   - Schedule weekly manual backups

3. **Disaster Recovery Plan**
   - Document recovery procedures
   - Test recovery regularly
   - Keep backup copies in different regions

## Rollback Procedure

1. **Identify Issue**
2. **Stop Current Deployment**
3. **Restore Previous Version**
4. **Verify System**
5. **Notify Users**
6. **Post-mortem Analysis**

## Common Issues & Solutions

### High Memory Usage
- Check for memory leaks with `clinic`
- Optimize database queries
- Implement pagination

### Slow API Responses
- Add database indexes
- Implement caching
- Use CDN

### CORS Errors in Production
- Update backend CORS config with production domain
- Ensure frontend API URL is correct

## Post-Deployment Steps

1. **Health Checks**
   ```bash
   curl https://your-api.com/api/health
   ```

2. **Test All User Flows**
3. **Monitor Error Logs**
4. **Gather User Feedback**
5. **Document Lessons Learned**

## Maintenance Schedule

- **Daily**: Monitor logs and performance
- **Weekly**: Review analytics and user feedback
- **Monthly**: Security updates and backups
- **Quarterly**: Full system audit and optimization

---

**Need help? Check the main README.md or contact the development team.**
