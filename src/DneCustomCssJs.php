<?php declare(strict_types=1);

namespace Dne\CustomCssJs;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class DneCustomCssJs extends Plugin
{
    public function uninstall(UninstallContext $uninstallContext): void
    {
        if (!$uninstallContext->keepUserData()) {
            $this->container->get(Connection::class)->executeStatement(
                'DROP TABLE `dne_custom_js_css_sales_channel`;'
            );
            $this->container->get(Connection::class)->executeStatement(
                'DROP TABLE `dne_custom_js_css`;'
            );
        }
    }
}
