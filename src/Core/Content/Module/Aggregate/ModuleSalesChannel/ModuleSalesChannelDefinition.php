<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Core\Content\Module\Aggregate\ModuleSalesChannel;

use Dne\CustomCssJs\Core\Content\Module\ModuleDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class ModuleSalesChannelDefinition extends MappingEntityDefinition
{
    public const ENTITY_NAME = 'dne_custom_js_css_sales_channel';

    public function getEntityName(): string
    {
        return 'dne_custom_js_css_sales_channel';
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('dne_custom_js_css_id', 'dneCustomJsCssId', ModuleDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('sales_channel_id', 'salesChannelId', SalesChannelDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('dneCustomJsCss', 'dne_custom_js_css_id', ModuleDefinition::class),
            new ManyToOneAssociationField('salesChannel', 'sales_channel_id', SalesChannelDefinition::class),
        ]);
    }
}
