import type { RowDataPacket } from "mysql2";

import type Rows from "./Rows";

type Data = Rows & RowDataPacket;

export default Data;
