// const getId = require('../utils/getId');

const knex = require('./knex');


// Restrict access to our mock "database" to just the Model
// const fellows = [
//   { name: 'Carmen', id: getId() },
//   { name: 'Reuben', id: getId() },
//   { name: 'Maya', id: getId() },
// ];

class Fellow {
  // Create and add the new fellow to the "database" (the fellows array)
  // Rather than using a constructor, we use a static method to create a new fellow
  // static create(name) {
  //   const newFellow = {
  //     name,
  //     id: getId()
  //   }
  //   fellows.push(newFellow);
  //   return newFellow;
  // }
  static create = async (name) => {
      // The ? is how we dynamically insert values into a query
      // To avoid SQL injection attacks, we want to avoid inserting
      // dynamic values into a SQL query through interpolation: `${}`
      const query = `
        INSERT INTO fellows (name)
        VALUES (?)`
      // We can set the value for each ? by providing an ordered array
      // as a second argument to knex.raw
      const { rows } = await knex.raw(query, [name]);
      return rows;
    };
  

  // Get all values from the "database"
  static list = async () =>{
    const query = `
      SELECT *
      FROM fellows
    `;
    const result = await knex.raw(query);
    console.log(result);
    return result.rows;
  }

  // // Get one value from the "database"
  static find = async (id) => {
    const query = `
      SELECT *
      FROM fellows
      WHERE id=?
    `;
    const { rows } = await knex.raw(query, [id]);
    if (rows.length === 0) return null; // No fellow found with that id
    return rows[0]; // Return the first (and only) fellow found
  }

  // // Update one value from the "database"
  static editName = async (id, newName) => {
  //   const fellow = Fellow.find(id);
  //   if (!fellow) return null;
  //   fellow.name = newName;
  //   return fellow;
    const query = `
      UPDATE fellows
      SET name=?
      WHERE id=?
    `;
    await knex.raw(query, [newName, id])
    return await Fellow.find(id); // Return the updated fellow
  }

  // // Delete one value from the "database"
  static delete = async (id) => {
  //   const fellowIndex = fellows.findIndex((fellow) => fellow.id === id);
  //   if (fellowIndex < 0) return false;

  //   fellows.splice(fellowIndex, 1);
  //   return true;
    const query = `
      DELETE FROM fellows
      WHERE id=?
    `;
    await knex.raw(query, [id]);
    return true; // Return true to indicate successful deletion
  }
}

module.exports = Fellow;

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Fellow.js`:

console.log(Fellow.list())
console.log(Fellow.find(1))
console.log(Fellow.editName(1, 'ZO!!'))
console.log(Fellow.delete(2))
console.log(Fellow.list())
*/
