<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1572257501Bundle extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1572257501;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            CREATE TABLE IF NOT EXISTS `dne_custom_js_css` (
              `id` BINARY(16) NOT NULL,
              `name` varchar(255) NOT NULL,
              `js` longtext NULL,
              `css` longtext NULL,
              `active` BOOLEAN DEFAULT \'0\',
              `created_at` DATETIME(3) NOT NULL,
              `updated_at` DATETIME(3) NULL,
              PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
