<?php

namespace Dne\CustomCssJs\Components\CompilerPass;

use Dne\CustomCssJs\Services\ThemeCompiler;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class ReplaceThemeCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $container->getDefinition('Shopware\Storefront\Theme\ThemeCompiler')
            ->setClass(ThemeCompiler::class)
            ->addArgument(new Reference('Doctrine\DBAL\Connection'));
    }
}
