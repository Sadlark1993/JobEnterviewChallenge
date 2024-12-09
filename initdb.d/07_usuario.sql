CREATE TABLE IF NOT EXISTS pagway.usuario 
(
  id SERIAL PRIMARY KEY,
  username varchar(80) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  cliente integer NOT NULL,
  CONSTRAINT fk_usuario_cliente FOREIGN KEY (cliente)
    REFERENCES pagway.cliente (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE INDEX IF NOT EXISTS usuario_id_idx
  ON pagway.usuario(id);

CREATE INDEX IF NOT EXISTS usuario_email_idx
  ON pagway.usuario(email);