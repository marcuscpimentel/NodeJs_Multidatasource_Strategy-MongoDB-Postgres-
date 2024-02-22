//npm install sequelize pg-hstore pg (instala as dependências necessárias para usar o Sequelize como ORM em um projeto Node.js com PostgreSQL, incluindo o driver PostgreSQL (`pg`) e um pacote para manipular o formato hstore (`pg-hstore`).)

const IDb = require("./../interfaces/interfaceDb.js");
const Sequelize = require("sequelize");

class PostgresSQLStrategy extends IDb {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  static async connect() {
    const sequelize = new Sequelize(
      "heroes", //database
      "marcuspimentel", //user
      "minhasenhasecreta", //senha
      {
        host: "localhost",
        dialect: "postgres",
        quoteIdentifiers: false, // case sensitive
        operatorsAliases: false, // deprecation warning
        logging: false,
      },
    );
    return sequelize;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error("fail!", error);
      return false;
    }
  }

  async create(item) {
    return this._schema.create(item, {
      raw: true,
    });
  }

  async read(item = {}) {
    return this._schema.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return await this._schema.update(item, { where: { id: id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query, raw: true });
  }
}

module.exports = PostgresSQLStrategy;
