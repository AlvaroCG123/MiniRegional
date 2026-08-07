-- Script de criacao do banco do MiniRegional.
-- IMPORTANTE: o nome do banco deve ser escrito TODO EM MINUSCULO e o mesmo
-- nome em minusculo deve ser usado no DATABASE_URL do .env. No MySQL/MariaDB
-- do Windows (lower_case_table_names = 1) o servidor grava o nome em minusculo;
-- se o .env apontar para "MiniRegional206", o Prisma nao enxerga a foreign key
-- e tenta recria-la em toda migration, falhando com errno 121 / erro 1553.

CREATE DATABASE IF NOT EXISTS `miniregional206`
    DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `miniregional206`;

-- CreateTable
CREATE TABLE `convidado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `mesaId` INTEGER NOT NULL,
    `check_in` BOOLEAN NOT NULL DEFAULT false,
    `horario_checkin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `convidado_email_key`(`email`),
    UNIQUE INDEX `convidado_telefone_key`(`telefone`),
    UNIQUE INDEX `convidado_CPF_key`(`CPF`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `cargo` ENUM('ADMIN', 'CERIMONIALISTA') NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuario_email_key`(`email`),
    UNIQUE INDEX `usuario_CPF_key`(`CPF`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `capacidade_maxima` INTEGER NOT NULL DEFAULT 6,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `convidado` ADD CONSTRAINT `convidado_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `mesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
