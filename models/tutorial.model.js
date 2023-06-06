const { connection } = require("../config/db.config");

// const createTableQuery =
//     "create table tutorials(id int primary key auto_increment,title varchar(100) not null, description varchar(200) not null,published tinyint(1) not null default 0 )";

// connection.query(createTableQuery, (err, results, fields) => {
//     if (err) {
//         console.error('Error creating the table' + err.stack)
//         return;
//     }
//     console.log("Table created Successfully")
// });

// For deleting table
// connection.query("drop table tutorials", (err, results, fields) => {
//     if (err) {
//         console.error('Error creating the table' + err.stack)
//         return;
//     }
//     console.log("Table deleted Successfully")
// });

// constructor
const Tutorial = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

const create = (newTutorial, result) => {
  console.log(newTutorial, "newTutorial");
  connection.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    // result(null, { id: res.insertId, ...newTutorial });
    result(null, { msg: "Tutorial successfully created" });
  });
};

const findById = (id, result) => {
  connection.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

const getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("tutorials: ", res);
    result(null, res);
  });
};

const getAllPublished = (result) => {
  connection.query(
    "SELECT * FROM tutorials WHERE published=true",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tutorials: ", res);
      result(null, res);
    }
  );
};

const updateById = (id, tutorial, result) => {
  connection.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      // console.log("updated tutorial: ", { id: id, ...tutorial });
      // result(null, { id: id, ...tutorial });

      result(null, { msg: "Tutorial Successfully updated" });
    }
  );
};

const remove = (id, result) => {
  connection.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

const removeAll = (result) => {
  connection.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

const Tutoriales = {
  create,
  findById,
  getAll,
  getAllPublished,
  updateById,
  remove,
  removeAll,
};

module.exports = { Tutoriales, Tutorial };
