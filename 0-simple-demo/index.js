const knex = require('./knex');

const getPets = async () => {
  // knex.raw returns a query result object
  const result = await knex.raw("SELECT * FROM pets");

  // .rows is an array containing the query data
  return result.rows;
};

const getPeople = async () => {
  const query = `
    SELECT *
    FROM people
  `;
  // most of the time, we immediately destructure the rows out of the object
  const { rows } = await knex.raw(query)
  return rows;
}

const createPet = async (name, type, owner_id) => {
  // The ? is how we dynamically insert values into a query
  // To avoid SQL injection attacks, we want to avoid inserting
  // dynamic values into a SQL query through interpolation: `${}`
  const query = `
    INSERT INTO pets (name, type, owner_id)
    VALUES (?, ?, ?)`
  // We can set the value for each ? by providing an ordered array
  // as a second argument to knex.raw
  const { rows } = await knex.raw(query, [name, type, owner_id]);
  return rows;
};

const getPetsByOwnerName = async (ownerName) => {
  const query = `
    SELECT pets.name, pets.type
    FROM pets
      JOIN people ON pets.owner_id = people.id
    WHERE people.name=?`
  const { rows } = await knex.raw(query, [ownerName]);
  return rows;
}

const main = async () => {
  await createPet('Swiper', 'fox', 4);
  await createPet('Snoopy', 'dog', 4);

  const pets = await getPets();
  const people = await getPeople();
  const bensPets = await getPetsByOwnerName('Ben Spector');
  // const annsDogs = await getPetsByOwnerNameAndType('Ann Duong', 'dog');
  // const JamesBaldwinBooks = await getBooksByAuthor('James', 'Baldwin');
  // const annsProducts = await getProductsBoughtByCustomer('Ann');

  console.log('all pets:', pets);
  console.log('all people:', people);
  console.log('Ben\'s pets:', bensPets);
  // console.log('anns dogs:', annsDogs);
  // console.log('James Baldwin Books:', JamesBaldwinBooks);
  // console.log('anns products:', annsProducts);

  knex.destroy();
}

main();