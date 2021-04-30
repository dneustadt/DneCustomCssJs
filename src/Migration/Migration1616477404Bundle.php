<?php

declare(strict_types=1);

namespace Dne\CustomCssJs\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\InheritanceUpdaterTrait;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1616477404Bundle extends MigrationStep
{
    use InheritanceUpdaterTrait;

    public function getCreationTimestamp(): int
    {
        return 1616477404;
    }

    public function updateDestructive(Connection $connection): void
    {
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            CREATE TABLE IF NOT EXISTS `dne_custom_js_css_sales_channel` (
              `dne_custom_js_css_id` BINARY(16) NOT NULL,
              `sales_channel_id` BINARY(16) NOT NULL,
              PRIMARY KEY (`dne_custom_js_css_id`, `sales_channel_id`),
              CONSTRAINT `fk.dne_custom_js_css_sales_channel.dne_custom_js_css_id` FOREIGN KEY (`dne_custom_js_css_id`)
                REFERENCES `dne_custom_js_css` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT `fk.dne_custom_js_css_sales_channel.sales_channel_id` FOREIGN KEY (`sales_channel_id`)
                REFERENCES `sales_channel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }
}
