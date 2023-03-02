const {
  TaskManager,
  orkesConductorClient,
} = require("@io-orkes/conductor-javascript");

const returnHelloWorker = () => {
  return {
    taskDefName: "will_return_hello",
    execute: async ({ inputData }) => {
      return {
        outputData:{
          message: "Hello World"
        },
        status: "COMPLETED",
      };
    },
  };
};

const nextConfig = {
  publicRuntimeConfig: {
    conductor: {
      keyId: process.env.KEY,
      keySecret: process.env.SECRET,
      serverUrl: process.env.SERVER_URL,
    },
    workflows: {
      checkout: `${process.env.CHECKOUT_WF_NAME || "MyCheckout2"}`,
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",

        destination: `${process.env.SERVER_URL}/:path*`,
      },
    ];
  },
};

module.exports = (phase) => {
  const playConfig = {
    keyId: process.env.KEY,
    keySecret: process.env.SECRET,
    serverUrl: `${process.env.SERVER_URL}`,
  };

  (async () => {
    const clientPromise = orkesConductorClient(playConfig);
    const client = await clientPromise;
    const runner = new TaskManager(client, [returnHelloWorker()]);
    runner.startPolling();
  })();

  console.log("Starting up ", phase);
  return nextConfig;
};
      keyId: process.env.KEY,
      keySecret: process.env.SECRET,
      serverUrl: "https://conductor-nextjs-example-ehib.vercel.app/api",
    },
    workflows: {
      checkout: `${process.env.CHECKOUT_WF_NAME || "MyCheckout2"}`,
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",

        destination: `${process.env.SERVER_URL}/:path*`,
      },
    ];
  },
};

module.exports = (phase) => {
  const playConfig = {
    keyId: process.env.KEY,
    keySecret: process.env.SECRET,
    serverUrl: `${process.env.SERVER_URL}`,
  };

  (async () => {
    const clientPromise = orkesConductorClient(playConfig);
    const client = await clientPromise;
    const runner = new TaskManager(client, [returnHelloWorker()]);
    runner.startPolling();
  })();

  console.log("Starting up ", phase);
  return nextConfig;
};
