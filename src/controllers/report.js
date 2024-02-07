const pg = require("pg");
require("dotenv").config();

const pgConnectionString = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB || "icm",
  user: process.env.DB_USER || "woragis",
  password: process.env.DB_PASSWORD || "woragispg",
};

const contribTable = "contribs";

const sendContrib = async (req, res) => {
  const { name, polo, church, type, contrib, videoUrl } = req.body;
  const client = new pg.Pool(pgConnectionString);
  await client.connect();
  try {
    if (type === "text") {
      const insertContribQuery = `INSERT INTO ${contribTable} (name, polo, church, type, contrib) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
      const result = await client.query(insertContribQuery, [name, polo, church, type, contrib]);
      res.status(201).json(result.rows[0]);
    } else if (type === "video") {
      const insertVideoQuery = `INSERT INTO ${contribTable} (name, polo, church, type, video_url) VALUES ($1, $2, $3, $4, $5); RETURNING *`;
      const result = await client.query(insertVideoQuery, [name, polo, church, type, videoUrl]);
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error at contrib controller: " + err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    console.log("Contribuicao enviada " + Date.now());
    await client.end();
  }
};

const reportTable = "reports";

const sendReport = async (req, res) => {
  const {} = req.body;
  const client = new pg.Client(pgConnectionString);
  await client.connect();
  try {
  } catch (err) {
    console.error("Error at report controller: " + err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    console.log("Report novo " + Date.now());
    await client.end();
  }
};

module.exports = { sendReport };
