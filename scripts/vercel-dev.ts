const server = Bun.spawn(
  ["bunx", "vercel", "dev", "--listen", "8080", "--yes"],
  {
    cwd: process.cwd(),
    env: process.env,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  },
);

process.exit(await server.exited);
