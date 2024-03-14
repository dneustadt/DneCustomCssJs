<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Subscriber;

use League\Flysystem\FilesystemOperator;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Aggregation\Bucket\TermsAggregation;
use Shopware\Core\Framework\DataAbstractionLayer\Search\AggregationResult\Bucket\TermsResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Storefront\Event\ThemeCompilerConcatenatedStylesEvent;
use Shopware\Storefront\Theme\AbstractThemePathBuilder;
use Shopware\Storefront\Theme\StorefrontPluginConfiguration\StorefrontPluginConfiguration;
use Shopware\Storefront\Theme\StorefrontPluginConfiguration\StorefrontPluginConfigurationCollection;
use Shopware\Storefront\Theme\ThemeCompilerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ThemeCompilerSubscriber implements EventSubscriberInterface, ThemeCompilerInterface
{
    public function __construct(
        private readonly ThemeCompilerInterface $decorated,
        private readonly EntityRepository $repository,
        private readonly FilesystemOperator $filesystem,
        private readonly AbstractThemePathBuilder $themePathBuilder
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ThemeCompilerConcatenatedStylesEvent::class => 'onGetConcatenatedStylesAndScripts',
        ];
    }

    public function getDecorated(): ThemeCompilerInterface
    {
        return $this->decorated;
    }

    public function onGetConcatenatedStylesAndScripts(ThemeCompilerConcatenatedStylesEvent $event): void
    {
        $styles = $event->getConcatenatedStyles();

        $additionalStyles = $this->getResources('css', $event->getSalesChannelId());

        $event->setConcatenatedStyles($styles . \PHP_EOL . $additionalStyles);
    }

    public function compileTheme(
        string $salesChannelId,
        string $themeId,
        StorefrontPluginConfiguration $themeConfig,
        StorefrontPluginConfigurationCollection $configurationCollection,
        bool $withAssets,
        Context $context
    ): void {
        $this->getDecorated()->compileTheme($salesChannelId, $themeId, $themeConfig, $configurationCollection, $withAssets, $context);

        $additionalScripts = $this->getResources('js', $salesChannelId);

        $path = sprintf(
            'theme/%s/js/dne-custom-css-js/dne-custom-css-js.js',
            $this->themePathBuilder->assemblePath($salesChannelId, $themeId)
        );

        $this->filesystem->write($path, $additionalScripts);
    }


    private function getResources(string $field, string $salesChannelId): string
    {
        $criteria = new Criteria();
        $criteria->setLimit(1);

        $criteria->addFilter(
            new MultiFilter(MultiFilter::CONNECTION_AND, [
                new EqualsFilter('active', true),
                new MultiFilter(MultiFilter::CONNECTION_OR, [
                    new EqualsFilter('salesChannels.id', $salesChannelId),
                    new EqualsFilter('salesChannels.id', null),
                ]),
            ])
        );

        $criteria->addAggregation(
            new TermsAggregation(
                'resources',
                $field,
                0,
                new FieldSorting('name', FieldSorting::ASCENDING)
            )
        );

        $result = $this->repository->search($criteria, Context::createDefaultContext());

        /** @var TermsResult $aggregation */
        $aggregation = $result->getAggregations()->get('resources');

        $contents = '';

        foreach ($aggregation->getBuckets() as $bucket) {
            $contents .= $bucket->getKey() . \PHP_EOL;
        }

        return $contents;
    }
}
