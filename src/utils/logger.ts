import dayjs from "dayjs";
import logger from "pino";

const transport = {
  target: "pino-pretty",
  options: { colorize: true },
};

const log = logger({
  transport,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
