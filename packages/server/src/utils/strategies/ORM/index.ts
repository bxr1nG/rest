import config from "~/config";

import Factory from "./Factory";
import Every from "./Every";

const strategyFactory = new Factory();

strategyFactory.add("every", Every);

const selectedStrategy = strategyFactory.select(config.ormStrategy);

export default selectedStrategy;
