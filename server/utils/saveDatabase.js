const fs = require('fs');

const saveDatabase = (database) => {
  fs.writeFileSync('./database.json', JSON.stringify(database, null, 2));
};

module.exports = saveDatabase;
