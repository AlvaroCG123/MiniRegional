-- AddForeignKey
ALTER TABLE `Convidado` ADD CONSTRAINT `Convidado_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
