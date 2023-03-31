import config from "~/config";

import Factory from "./Factory";
import Every from "./Every";
import One from "./One";
import Join from "./Join";

const strategyFactory = new Factory();

strategyFactory.add("every", Every);
strategyFactory.add("one", One);
strategyFactory.add("join", Join);

const selectedStrategy = strategyFactory.select(config.ormStrategy);

export default selectedStrategy;
