module.exports = {
  apps: [
    {
      name: 'api-gateway',
      cwd: './apps/api-gateway',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_file: '.env'
    },
    {
      name: 'auth-service',
      cwd: './apps/auth-service',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_file: '.env'
    },
    {
      name: 'lms-service',
      cwd: './apps/lms-service',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      env_file: '.env'
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
