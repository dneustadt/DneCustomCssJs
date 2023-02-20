<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Subscriber;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Aggregation\Bucket\TermsAggregation;
use Shopware\Core\Framework\DataAbstractionLayer\Search\AggregationResult\Bucket\TermsResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Storefront\Event\ThemeCompilerConcatenatedScriptsEvent;
use Shopware\Storefront\Event\ThemeCompilerConcatenatedStylesEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ThemeCompilerSubscriber implements EventSubscriberInterface
{
    private EntityRepository $repository;

    public function __construct(EntityRepository $repository)
    {
        $this->repository = $repository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ThemeCompilerConcatenatedStylesEvent::class => 'onGetConcatenatedStyles',
            ThemeCompilerConcatenatedScriptsEvent::class => 'onGetConcatenatedScripts',
        ];
    }

    public function onGetConcatenatedStyles(ThemeCompilerConcatenatedStylesEvent $event): void
    {
        $styles = $event->getConcatenatedStyles();

        $additionalStyles = $this->getResources('css', $event->getSalesChannelId());

        $event->setConcatenatedStyles($styles . \PHP_EOL . $additionalStyles);
    }

    public function onGetConcatenatedScripts(ThemeCompilerConcatenatedScriptsEvent $event): void
    {
        $scripts = $event->getConcatenatedScripts();

        $additionalScripts = $this->getResources('js', $event->getSalesChannelId());

        $event->setConcatenatedScripts($scripts . \PHP_EOL . $additionalScripts);
    }

    public function getResources(string $field, string $salesChannelId): string
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
