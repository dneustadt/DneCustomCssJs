<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Core\Content\Module;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\AllowHtml;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class ModuleDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'dne_custom_js_css';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return ModuleEntity::class;
    }

    public function getCollectionClass(): string
    {
        return ModuleCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name'))->addFlags(new Required()),
            (new BoolField('active', 'active')),
            (new LongTextField('js', 'js'))->addFlags(new AllowHtml()),
            (new LongTextField('css', 'css'))->addFlags(new AllowHtml()),
            new ManyToManyAssociationField(
                'salesChannels',
                SalesChannelDefinition::class,
                Aggregate\ModuleSalesChannel\ModuleSalesChannelDefinition::class,
                'dne_custom_js_css_id',
                'sales_channel_id'
            ),
        ]);
    }
}
