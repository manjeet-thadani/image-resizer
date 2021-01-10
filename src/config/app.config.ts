import convict from "convict";

const config = convict({
  app: {
    name: {
      doc: "Name of the service",
      format: String,
      default: "image-resizer"
    },
    env: {
      doc: "The application environment.",
      format: ["production", "development", "staging", "test"],
      default: "development",
      env: "NODE_ENV"
    },
    port: {
      doc: "The API service port",
      format: "port",
      default: 3000,
      env: "PORT"
    }
  },

  timeout: {
    doc: "API Timeout",
    format: Number,
    default: 240000,
    env: "API_TIMEOUT"
  },

  cloudinary: {
    cloudName: {
      doc: "Cloud Name",
      format: String,
      default: "",
      env: "CLOUDINARY_CLOUD_NAME",
      sensitive: true
    },
    apiKey: {
      doc: "API Key",
      format: String,
      default: "",
      env: "CLOUDINARY_API_KEY",
      sensitive: true
    },
    apiSecret: {
      doc: "API Secret",
      format: String,
      default: "",
      env: "CLOUDINARY_API_SECRET",
      sensitive: true
    }
  }
});

console.debug("Starting service with: ", config.toString());
config.validate({ allowed: "strict" });

export { config };
