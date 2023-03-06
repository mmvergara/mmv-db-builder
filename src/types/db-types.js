const sampleData = {
  tables: [
    {
      table_name: "customers",
      columns: [
        {
          column_name: "id",
          data_type: "INTEGER",
          is_primary_key: true,
        },
        {
          column_name: "name",
          data_type: "VARCHAR(255)",
        },
        {
          column_name: "email",
          data_type: "VARCHAR(255)",
        },
      ],
    },
    {
      table_name: "orders",
      columns: [
        {
          column_name: "id",
          data_type: "INTEGER",
          is_primary_key: true,
        },
        {
          column_name: "order_date",
          data_type: "DATE",
        },
        {
          column_name: "customer_id",
          data_type: "INTEGER",
        },
      ],
    },
    {
      table_name: "order_items",
      columns: [
        {
          column_name: "id",
          data_type: "INTEGER",
          is_primary_key: true,
        },
        {
          column_name: "order_id",
          data_type: "INTEGER",
        },
        {
          column_name: "product_id",
          data_type: "INTEGER",
        },
        {
          column_name: "quantity",
          data_type: "INTEGER",
        },
      ],
    },
    {
      table_name: "products",
      columns: [
        {
          column_name: "id",
          data_type: "INTEGER",
          is_primary_key: true,
        },
        {
          column_name: "name",
          data_type: "VARCHAR(255)",
        },
        {
          column_name: "price",
          data_type: "DECIMAL(10, 2)",
        },
        {
          column_name: "description",
          data_type: "TEXT",
        },
      ],
    },
  ],
  relations: [
    {
      table_name: "orders",
      column_name: "customer_id",
      referenced_table_name: "customers",
      referenced_column_name: "id",
      relation_type: "BELONGS_TO",
    },
    {
      table_name: "order_items",
      column_name: "order_id",
      referenced_table_name: "orders",
      referenced_column_name: "id",
      relation_type: "BELONGS_TO",
    },
    {
      table_name: "order_items",
      column_name: "product_id",
      referenced_table_name: "products",
      referenced_column_name: "id",
      relation_type: "BELONGS_TO",
    },
  ],
};

function generateSQLQueries(data) {
  let sqlCreate = '';
  let sqlRelationship = '';

  for (const table of data.tables) {
    // Create table query
    sqlCreate += `CREATE TABLE ${table.table_name} (\n`;

    let lastColumn = table.columns[table.columns.length - 1];

    for (const column of table.columns) {
      sqlCreate += `${column.column_name} ${column.data_type}`;

      if (column.is_primary_key) {
        sqlCreate += ' PRIMARY KEY';
      }

      if (column !== lastColumn) {
        sqlCreate += ',\n';
      }
    }

    sqlCreate += '\n);\n';

    // Create relationship queries
    for (const relation of data.relations) {
      if (relation.table_name === table.table_name) {
        sqlRelationship += '\n';
        sqlRelationship += `ALTER TABLE ${relation.table_name} ADD FOREIGN KEY (${relation.column_name}) REFERENCES ${relation.referenced_table_name} (${relation.referenced_column_name})\n`;
      }
    }
    sql += '\n';
  }

  return sql + '\n' + sqlRelationship;
}

console.log(generateSQLQueries(sampleData));
