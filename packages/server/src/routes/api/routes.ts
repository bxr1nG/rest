import { Router } from "express";

import type Params from "~/types/Params";
import ErrorHandler from "~/middlewares/ErrorHandler";
import Base from "~/utils/strategies/ORM/Base";

import controllers from "./controllers";

const router = Router();

router
    /**
     * @openapi
     * /api/tables:
     *   get:
     *     tags:
     *       - Tables
     *     summary: Get all table names in database
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     *               example: ["table1", "table2", "table3"]
     */
    .get("/tables", (_req, res, next) => {
        Base.getTables()
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    /**
     * @openapi
     * /api/columns/{table}:
     *   get:
     *     tags:
     *       - Tables
     *     summary: Get all column names in table
     *     parameters:
     *       - name: table
     *         in: path
     *         description: Table name
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     *               example: ["column1", "column2", "column3"]
     */
    .get("/columns/:table", (req, res, next) => {
        Base.getTableColumns(req.params.table)
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    /**
     * @openapi
     * /api/table/{table}:
     *   get:
     *     tags:
     *       - Tables
     *     summary: Get data from table
     *     parameters:
     *       - name: table
     *         in: path
     *         description: Table name
     *         required: true
     *         schema:
     *           type: string
     *       - name: range
     *         in: query
     *         description: Stringified array of 2 elements (limit and offset)
     *         schema:
     *           type: string
     *           example: "[10, 0]"
     *       - name: sort
     *         in: query
     *         description: Stringified array of arrays with 2 elements (column name and sort order (asc/desc))
     *         schema:
     *           type: string
     *           example: "[['id', 'asc']]"
     *       - name: filter
     *         in: query
     *         description: Stringified array of arrays of arrays with 3 elements (column name, filter type (like/equal/more/less) and value)
     *         schema:
     *           type: string
     *           example: "[[['id', 'more', 10]]]"
     *       - name: include
     *         in: query
     *         description: |
     *           Stringified array of objects with properties:
     *
     *           **sourceColumn**: column name from root table,
     *
     *           **targetTable**: table you want to include,
     *
     *           **targetColumn**: column name in target table,
     *
     *           **alias**?: alias for target table name (not required).
     *         schema:
     *           type: string
     *           example: "[{ 'sourceColumn': 'other_id', 'targetTable': 'other_table', 'targetColumn': 'id' }]"
     *       - name: includeMany
     *         in: query
     *         description: |
     *           Stringified array of objects with properties:
     *
     *           **sourceColumn**: column name from root table,
     *
     *           **targetTable**: table you want to include,
     *
     *           **targetColumn**: column name in target table,
     *
     *           **alias**?: alias for target table name (not required).
     *         schema:
     *           type: string
     *           example: "[{ 'sourceColumn': 'other_id', 'targetTable': 'other_table', 'targetColumn': 'id' }]"
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: "#/components/schemas/TableRowDataWithIncludes"
     *                 count:
     *                   type: integer
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/InternalError"
     */
    .get("/table/:table", (req, res, next) => {
        controllers
            .getAll(req.params.table, req.query as Params)
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    })
    /**
     * @openapi
     * /api/table/{table}/{id}:
     *   get:
     *     tags:
     *       - Tables
     *     summary: Get row from table
     *     parameters:
     *       - name: table
     *         in: path
     *         description: Table name
     *         required: true
     *         schema:
     *           type: string
     *       - name: id
     *         in: path
     *         description: Row id in table
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/TableRowData"
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/NotFoundError"
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/InternalError"
     * /api/table/{table}/{id}/{idColumn}:
     *   get:
     *     tags:
     *       - Tables
     *     summary: Get row from table
     *     parameters:
     *       - name: table
     *         in: path
     *         description: Table name
     *         required: true
     *         schema:
     *           type: string
     *       - name: id
     *         in: path
     *         description: Row id in table
     *         required: true
     *         schema:
     *           type: string
     *       - name: idColumn
     *         in: path
     *         description: Id column name if it is not "id"
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/TableRowData"
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/NotFoundError"
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/InternalError"
     */
    .get("/table/:table/:id/:idColumn?", (req, res, next) => {
        controllers
            .getById(
                req.params.table,
                req.params.id,
                req.params.idColumn || "id"
            )
            .then((result) => res.status(200).json(result))
            .catch((error) => next(error));
    });

router.use(ErrorHandler);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     NotFoundError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *         message:
 *           type: string
 *       example:
 *         success: false
 *         status: 404
 *         message: "Not Found"
 *
 *     InternalError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: integer
 *         message:
 *           type: string
 *       example:
 *         success: false
 *         status: 500
 *         message: "Table 'somedb.sometable' doesn't exist"
 *
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
