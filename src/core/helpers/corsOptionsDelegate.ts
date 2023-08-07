const corsOptionsDelegate = (req, callback) => {
  interface ICorsOptions {
    origin: boolean;
  }
  const { PORT } = process.env;
  const allowlist = [
    'http://localhost:3000',
    `http://localhost:${PORT || 8000}`,
  ];
  const corsOptions: ICorsOptions = { origin: false };
  const origin = req.header('Origin');
  const isValidOrigin = allowlist.indexOf(origin) >= 0;

  if (isValidOrigin) corsOptions.origin = true; // enable CORS request
  else corsOptions.origin = false; // disable CORS request

  callback(null, corsOptions); // callback expects two parameters: error and options
};

export default corsOptionsDelegate;
