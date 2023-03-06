type DBJson = {
  tables: {
    table_name: string;
    columns: {
      column_name: string;
      data_type: string;
      is_primary_key?: boolean;
    }[];
  }[];
  relations: {
    table_name: string;
    column_name: string;
    referenced_table_name: string;
    referenced_column_name: string;
    relation_type: string;
  }[];
};

const sampleData: DBJson = {
  tables: [
    {
      table_name: 'customers',
      columns: [
        {
          column_name: 'id',
          data_type: 'INTEGER',
          is_primary_key: true,
        },
        {
          column_name: 'name',
          data_type: 'VARCHAR(255)',
        },
        {
          column_name: 'email',
          data_type: 'VARCHAR(255)',
        },
      ],
    },
    {
      table_name: 'orders',
      columns: [
        {
          column_name: 'id',
          data_type: 'INTEGER',
          is_primary_key: true,
        },
        {
          column_name: 'order_date',
          data_type: 'DATE',
        },
        {
          column_name: 'customer_id',
          data_type: 'INTEGER',
        },
      ],
    },
    {
      table_name: 'order_items',
      columns: [
        {
          column_name: 'id',
          data_type: 'INTEGER',
          is_primary_key: true,
        },
        {
          column_name: 'order_id',
          data_type: 'INTEGER',
        },
        {
          column_name: 'product_id',
          data_type: 'INTEGER',
        },
        {
          column_name: 'quantity',
          data_type: 'INTEGER',
        },
      ],
    },
    {
      table_name: 'products',
      columns: [
        {
          column_name: 'id',
          data_type: 'INTEGER',
          is_primary_key: true,
        },
        {
          column_name: 'name',
          data_type: 'VARCHAR(255)',
        },
        {
          column_name: 'price',
          data_type: 'DECIMAL(10, 2)',
        },
        {
          column_name: 'description',
          data_type: 'TEXT',
        },
      ],
    },
  ],
  relations: [
    {
      table_name: 'orders',
      column_name: 'customer_id',
      referenced_table_name: 'customers',
      referenced_column_name: 'id',
      relation_type: 'BELONGS_TO',
    },
    {
      table_name: 'order_items',
      column_name: 'order_id',
      referenced_table_name: 'orders',
      referenced_column_name: 'id',
      relation_type: 'BELONGS_TO',
    },
    {
      table_name: 'order_items',
      column_name: 'product_id',
      referenced_table_name: 'products',
      referenced_column_name: 'id',
      relation_type: 'BELONGS_TO',
    },
  ],
};
