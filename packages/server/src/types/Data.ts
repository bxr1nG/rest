import type { RowDataPacket } from "mysql2";

import type Rows from "./Rows";

/**
 * @openapi
 * components:
 *   schemas:
 *     TableRowData:
 *       type: object
 *       additionalProperties:
 *         anyOf:
 *           - type: string
 *           - type: number
 *           - type: boolean
 *           - type: null
 *       example:
 *         id: 1337
 *         name: John Doe
 *
 *     TableRowDataWithIncludes:
 *       type: object
 *       additionalProperties:
 *         anyOf:
 *           - type: string
 *           - type: number
 *           - type: boolean
 *           - type: null
 *           - type: array
 *             items:
 *               $ref: "#/components/schemas/TableRowDataWithIncludes"
 *       example:
 *         id: 1337
 *         name: John Doe
 *         address:
 *           country: USA
 *           town: Anytown
 *           street: 123 Maple Street
 */
type Data = Rows & RowDataPacket;

export default Data;
