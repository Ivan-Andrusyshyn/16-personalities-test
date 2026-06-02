const corsOptions = {
  origin: ['https://16-personalities.vercel.app', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
  credentials: true,
};

export default corsOptions;
