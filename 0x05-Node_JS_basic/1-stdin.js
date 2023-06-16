process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.once('data', (data) => {
  const name = data.toString().trim();

  if (name === '') {
    process.stdout.write('This important software is now closing\n');
  } else {
    process.stdout.write(`Your name is: ${name}\n`);
    process.stdout.write('This important software is now closing\n');
  }

  process.stdin.destroy();
});