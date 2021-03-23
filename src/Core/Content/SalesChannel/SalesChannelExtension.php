<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Core\Content\SalesChannel;

use Dne\CustomCssJs\Core\Content\Module\Aggregate\ModuleSalesChannel\ModuleSalesChannelDefinition;
use Dne\CustomCssJs\Core\Content\Module\ModuleDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Inherited;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class SalesChannelExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            (new ManyToManyAssociationField(
                'dneCustomJsCss',
                ModuleDefinition::class,
                ModuleSalesChannelDefinition::class,
                'sales_channel_id',
                'dne_custom_js_css_id'
            ))->addFlags(new Inherited())
        );
    }

    public function getDefinitionClass(): string
    {
        return SalesChannelDefinition::class;
    }
}
