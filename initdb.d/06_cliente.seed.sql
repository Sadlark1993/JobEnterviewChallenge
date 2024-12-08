 SELECT setval(pg_get_serial_sequence('pagway.cliente', 'id') , COALESCE(max(id) + 1, 1) , false) FROM  pagway.cliente;

INSERT INTO pagway.cliente (
  nome,
  fone_contato,
  email_contato,
  cpf_cnpj,
  data_cadastro,
  cidade,
  endereco
) VALUES
  ('Tech Innovators Ltda', '1132234455', 'contato@techinnovators.com.br', '12.345.678/0001-90', '2024-12-01 10:30:45', 'São Paulo', 'Av. Paulista, 1000'),
  ('Green Solutions ME', '11987654321', 'contato@greensolutions.com', '23.456.789/0001-80', '2024-12-02 14:15:30', 'Rio de Janeiro', 'Rua Verde, 123'),
  ('Alpha Comércio LTDA', '31976543210', 'contato@alphacomercio.com', '34.567.890/0001-70', '2024-12-03 09:45:20', 'Belo Horizonte', 'Av. dos Andradas, 300'),
  ('Beta Construções EPP', '21965432187', 'contato@betaconstrucoes.com.br', '45.678.901/0001-60', '2024-12-04 16:20:10', 'Curitiba', 'Rua das Construções, 450'),
  ('Omega Logística S/A', '41987654322', 'contato@omegalogistica.com', '56.789.012/0001-50', '2024-12-05 11:05:50', 'Porto Alegre', 'Av. Farrapos, 850');









 