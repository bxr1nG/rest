import type { RowDataPacket } from "mysql2";

import type PlayerRows from "~/types/PlayerRows";

type Player = PlayerRows & RowDataPacket;

export default Player;
