<?php

namespace Dne\CustomCssJs\Services;

use Dne\CustomCssJs\Components\Compiler;
use Dne\CustomCssJs\Components\FilesystemDecorator;
use Doctrine\DBAL\Connection;
use League\Flysystem\FilesystemInterface;
use ScssPhp\ScssPhp\Formatter\Crunched;
use ScssPhp\ScssPhp\Formatter\Expanded;
use Shopware\Storefront\Theme\ThemeFileImporterInterface;
use Shopware\Storefront\Theme\ThemeFileResolver;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class ThemeCompiler extends \Shopware\Storefront\Theme\ThemeCompiler
{
    public function __construct(
        FilesystemInterface $publicFilesystem,
        FilesystemInterface $tempFilesystem,
        ThemeFileResolver $themeFileResolver,
        string $cacheDir,
        bool $debug,
        EventDispatcherInterface $eventDispatcher,
        ?ThemeFileImporterInterface $themeFileImporter = null,
        Connection $connection
    ) {
        $publicFilesystem = new FilesystemDecorator($publicFilesystem, $connection);

        parent::__construct(
            $publicFilesystem,
            $tempFilesystem,
            $themeFileResolver,
            $cacheDir,
            $debug,
            $eventDispatcher,
            $themeFileImporter
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
