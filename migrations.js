import pgClient from "./db_pg";
const res = await pgClient.query(`
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE
);
`);

console.log(res);
