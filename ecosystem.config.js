module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: './apps/api-gateway/dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'auth-service',
      script: './apps/auth-service/dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'lms-service',
      script: './apps/lms-service/dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    },
    {
      name: 'student-front',
      script: 'npm',
      args: 'start',
      cwd: './apps/student-front',
      env: {
        NODE_ENV: 'production',
        PORT: 5173
      }
    },
    {
      name: 'teacher-front',
      script: 'npm',
      args: 'start',
      cwd: './apps/teacher-front',
      env: {
        NODE_ENV: 'production',
        PORT: 5174
      }
    },
    {
      name: 'admin-front',
      script: 'npm',
      args: 'start',
      cwd: './apps/admin-front',
      env: {
        NODE_ENV: 'production',
        PORT: 1575
      }
    }
  ]
};
