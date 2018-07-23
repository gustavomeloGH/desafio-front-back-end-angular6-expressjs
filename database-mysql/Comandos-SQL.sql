create database desafio_database;
use desafio_database;

/*CRIANDO TABELA ENDEREÇO*/
create table `tbl_endereco` (
`id_endereco` int(2) NOT NULL AUTO_INCREMENT,
`cep` varchar(10) DEFAULT NULL,
`cidade` varchar(40) DEFAULT NULL,
`estado` varchar(20) DEFAULT NULL,
`logradouro` varchar(40) DEFAULT NULL,
PRIMARY KEY (`id_endereco`),
UNIQUE KEY (`id_endereco`)
) ENGINE = InnoDB DEFAULT CHARSET= Latin1;

/*CRIANDO TABELA USUARIO*/
create table `tbl_usuario` (
`nome` varchar(60) DEFAULT NULL,
`email` varchar(40) DEFAULT NULL,
`senha` varchar(40) DEFAULT NULL,
`data_nascimento` varchar(12) DEFAULT NULL,
`id_endereco` int(2) NOT NULL,
CONSTRAINT `fk_id_endereco` FOREIGN KEY (`id_endereco`) REFERENCES tbl_endereco (`id_endereco`),
PRIMARY KEY (`email`),
UNIQUE KEY (`email`)
) ENGINE = InnoDB DEFAULT CHARSET= Latin1;
