SELECT setval(pg_get_serial_sequence('pagway.usuario', 'id') , COALESCE(max(id) + 1, 1) , false)
  FROM  pagway.usuario;
