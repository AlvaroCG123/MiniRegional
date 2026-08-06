-- DropForeignKey
ALTER TABLE `convidado` DROP FOREIGN KEY `Convidado_mesaId_fkey`;

-- DropIndex
DROP INDEX `Convidado_mesaId_fkey` ON `convidado`;
