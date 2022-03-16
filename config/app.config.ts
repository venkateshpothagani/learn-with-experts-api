class AppConfig {
  static readonly PORT = process.env.PORT || 3000;
}

class DbConfig {
  static readonly MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/learn-with-experts";
}

class AuthConfig {}

const Config = {
  app: AppConfig,
  db: DbConfig,
  auth: AuthConfig,
};
export default Config;
