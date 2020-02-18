<?php declare(strict_types=1);

namespace Dne\CustomCssJs;

use Dne\CustomCssJs\Components\CompilerPass\ReplaceThemeCompilerPass;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class DneCustomCssJs extends Plugin
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $container->addCompilerPass(new ReplaceThemeCompilerPass());
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        if (!$uninstallContext->keepUserData()) {
            $this->container->get('Doctrine\DBAL\Connection')->executeQuery(
                'DROP TABLE `dne_custom_js_css`;'
            );
        }
    }
}
