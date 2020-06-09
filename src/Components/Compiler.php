<?php

namespace Dne\CustomCssJs\Components;

use Doctrine\DBAL\Connection;

class Compiler extends \ScssPhp\ScssPhp\Compiler
{
    private $connection;

    public function __construct(Connection $connection, $cacheOptions = null)
    {
        $this->connection = $connection;

        parent::__construct($cacheOptions);
    }

    public function compile($code, $path = null)
    {
        $qb = $this->connection->createQueryBuilder();
        $qb->select(['css'])
            ->from('dne_custom_js_css')
            ->where('active = 1')
            ->orderBy('name', 'asc');

        $styles = $qb->execute()->fetchAll(\PDO::FETCH_COLUMN);

        if (is_array($styles) && !empty($styles)) {
            $code .= join(\PHP_EOL, $styles);
        }

        return parent::compile($code, $path);
    }
}
