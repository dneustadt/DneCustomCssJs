<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Core\Content\Module;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void              add(ModuleEntity $entity)
 * @method void              set(string $key, ModuleEntity $entity)
 * @method ModuleEntity[]    getIterator()
 * @method ModuleEntity[]    getElements()
 * @method ModuleEntity|null get(string $key)
 * @method ModuleEntity|null first()
 * @method ModuleEntity|null last()
 */
class ModuleCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ModuleEntity::class;
    }
}
