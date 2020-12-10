<?php

namespace Dne\CustomCssJs\Services;

use Dne\CustomCssJs\Components\Compiler;
use Doctrine\DBAL\Connection;
use ScssPhp\ScssPhp\Formatter\Crunched;
use ScssPhp\ScssPhp\Formatter\Expanded;

class ThemeCompiler extends \Shopware\Storefront\Theme\ThemeCompiler
{
    public function __construct()
    {
        $arguments = func_get_args();

        $connection = null;
        $debug = false;
        foreach ($arguments as $key => $argument) {
            if (is_bool($argument)) {
                $debug = $argument;
            }
            if ($argument instanceof Connection) {
                $connection = $argument;
                unset($arguments[$key]);
            }
        }

        parent::__construct(...$arguments);

        if ($connection === null) {
            return;
        }

        $compiler = new Compiler($connection);
        $compiler->setImportPaths('');

        $compiler->setFormatter($debug ? Expanded::class : Crunched::class);

        $reflectionClass = new \ReflectionClass(parent::class);

        $reflectionProperty = $reflectionClass->getProperty('scssCompiler');
        $reflectionProperty->setAccessible(true);
        $reflectionProperty->setValue($this, $compiler);
    }
}
