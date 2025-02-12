"use server"

/**
 * This configures the connections to a PostgreSQL database.
 *
 * To use `pool`, import it and use `pool.query(SQL, PARAMS)`
 * 
 * Example:
 * ```typescript
 * const result = await getPostgresVersion();
 * console.log(result);
 * ```
 */

import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export async function getPostgresVersion() {
    const result = await pool.query('SELECT version();');
    return result.rows;
}

export async function query(query: string, params?: any[]) {
    const result = await pool.query(query, params || []); 
    return result;
}

