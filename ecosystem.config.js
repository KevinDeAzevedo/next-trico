module.exports = {
  apps: [
    {
      name: 'next-trico-1344',
      exec_mode: 'cluster',
      instances: 1,
      script: 'npm',
      args: 'start',
    },
  ],
};
