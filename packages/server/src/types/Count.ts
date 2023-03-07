import type { RowDataPacket } from "mysql2";

import type CountRows from "~/types/CountRows";

type Count = CountRows & RowDataPacket;

export default Count;
