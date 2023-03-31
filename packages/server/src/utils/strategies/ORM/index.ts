import config from "~/config";

import Factory from "./Factory";
import Every from "./Every";
import One from "./One";

const strategyFactory = new Factory();

strategyFactory.add("every", Every);
strategyFactory.add("one", One);

const selectedStrategy = strategyFactory.select(config.ormStrategy);

export default selectedStrategy;
