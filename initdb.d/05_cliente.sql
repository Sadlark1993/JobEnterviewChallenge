CREATE TABLE IF NOT EXISTS pagway.cliente 
(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  fone_contato VARCHAR(15) NOT NULL,
  email_contato VARCHAR(255) NOT NULL, 
  cpf_cnpj VARCHAR(20) NOT NULL,
  data_cadastro TIMESTAMP NOT NULL,
  cidade VARCHAR(80) NOT NULL
  endereco VARCHAR(255) NOT NULL,
);

CREATE INDEX IF NOT EXISTS cliente_id_idx
  ON pagway.cliente(id);