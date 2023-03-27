const CrashHandler = async () => {
  process.on('unhandledRejection', (reason, p) => {
    if (reason.stack.split('\n')[0].split(' ').slice(1).join(' ') === 'Unknown Channel') return;

    console.log(`[Crash-Handler] :: Unhandled Rejection/catch`);
    console.log(reason, p);
  });

  process.on('uncaughtException', (reason, p) => {
    console.log(`[Crash-Handler] :: Uncaught Exception/catch`);
    console.log(reason, p);
  });

  process.on('uncaughtExceptionMonitor', (reason, p) => {
    console.log(`[Crash-Handler] :: Uncaught Exception Monitor/catch`);
    console.log(reason, p);
  });

  process.on('multipleResolves', (reason, p) => {
    // console.log(`[Crash-Handler] :: Unhandled MultipleResolves/catch`);
    // console.log(reason, p);
  });
};

export default CrashHandler;
