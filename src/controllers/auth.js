const pg = require("pg");
const bcrypt = require("bcrypt");

const pgConnectionString = {
  host: "localhost",
  port: 5432,
  database: "icm",
  user: "woragis",
  password: "woragispg",
};

const userTable = "users";

const testEmail = async (req, res) => {
  const { email } = req.body;
  const pool = new pg.Pool(pgConnectionString);

  await pool.connect();

  try {
    const result = await pool.query(
      `SELECT EXISTS (SELECT * FROM ${userTable} WHERE email=$1)`,
      [email]
    );

    const { exists } = result.rows[0];
    if (exists) {
      res.status(200).json({ message: true });
    } else {
      res.status(200).json({ message: false });
    }
  } catch (err) {
    console.error("Error testing existance of email " + err);
    res
      .status(500)
      .json({ message: "Error testing existance of email " + err });
  } finally {
    await pool.end();
  }
};

const register = async (req, res) => {
  req.session;
  const { name, whatsapp, email, password } = req.body;

  let admin = true;

  const client = new pg.Client(pgConnectionString);
  await client.connect();

  // Register into database
  try {
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const registerQuery = `INSERT INTO ${userTable} (name, whatsapp, admin, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const result = await client.query(registerQuery, [
      name,
      whatsapp,
      admin,
      email,
      hashedPassword,
    ]);
    const userInfo = result.rows[0];
    console.log("User registred: " + userInfo);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error at register controll " + err);
    res.status(500).json("Internal server error");
  } finally {
    await client.end();
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const client = new pg.Client(pgConnectionString);
  await client.connect();
  const loginQuery = `SELECT * FROM ${userTable} WHERE email=$1;`;

  console.log("login control start");
  try {
    console.log("login control, send database query");
    const result = await client.query(loginQuery, [email]);
    console.log("login control, received database query");
    const encryptedPassword = result.rows[0].password;
    console.log("entrypted password: " + encryptedPassword);
    bcrypt.compare(password, encryptedPassword, (err, same) => {
      if (err) {
        console.error("Error decrypting password on login " + err);
        res.status(500).json({ message: "Error decrypting password" });
      } else if (same) {
        console.log("logged in");
        res.status(200).json({ message: "logged in" });
      } else {
        console.log("wrong password on login");
        res.status(400).json({ message: "wrong password" });
      }
    });
  } catch (err) {
    console.error("Error at loging controller " + err);
    res.status(500).json({ message: "Internal server error" + err });
  } finally {
    console.log("login controller end");
    await client.end();
  }
};

const logout = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) =>
      console.error("Error destroying session " + err)
    );
  } else {
    res.status(400).json({ message: "already logged off" });
  }
};

module.exports = { testEmail, register, login, logout };
