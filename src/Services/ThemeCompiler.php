<?php

namespace Dne\CustomCssJs\Services;

use Dne\CustomCssJs\Components\Compiler;
use Dne\CustomCssJs\Components\FilesystemDecorator;
use Doctrine\DBAL\Connection;
use League\Flysystem\FilesystemInterface;
use ScssPhp\ScssPhp\Formatter\Crunched;
use ScssPhp\ScssPhp\Formatter\Expanded;
use Shopware\Core\Framework\Adapter\Cache\CacheClearer;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Storefront\Theme\ThemeFileImporterInterface;
use Shopware\Storefront\Theme\ThemeFileResolver;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ThemeCompiler extends \Shopware\Storefront\Theme\ThemeCompiler
{
    public function __construct(
        FilesystemInterface $publicFilesystem,
        FilesystemInterface $tempFilesystem,
        ThemeFileResolver $themeFileResolver,
        bool $debug,
        EventDispatcherInterface $eventDispatcher,
        ThemeFileImporterInterface $themeFileImporter,
        EntityRepositoryInterface $mediaRepository,
        iterable $packages,
        CacheClearer $cacheClearer,
        Connection $connection
    ) {
        $publicFilesystem = new FilesystemDecorator($publicFilesystem, $connection);

        parent::__construct(
            $publicFilesystem,
            $tempFilesystem,
            $themeFileResolver,
            $debug,
            $eventDispatcher,
            $themeFileImporter,
            $mediaRepository,
            $packages,
            $cacheClearer
        );

        $compiler = new Compiler($connection);
        $compiler->setImportPaths('');

        $compiler->setFormatter($debug ? Expanded::class : Crunched::class);

        $reflectionClass = new \ReflectionClass(parent::class);

        $reflectionProperty = $reflectionClass->getProperty('scssCompiler');
        $reflectionProperty->setAccessible(true);
        $reflectionProperty->setValue($this, $compiler);
    }
}
