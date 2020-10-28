<?php declare(strict_types=1);

namespace Dne\CustomCssJs\Api;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Shopware\Core\System\SalesChannel\SalesChannelCollection;
use Shopware\Storefront\Theme\ThemeCollection;
use Shopware\Storefront\Theme\ThemeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @RouteScope(scopes={"api"})
 */
class ThemeCompileController extends AbstractController
{
    /**
     * @var ThemeService
     */
    private $themeService;

    /**
     * @var EntityRepositoryInterface
     */
    private $salesChannelRepository;

    public function __construct(ThemeService $themeService, EntityRepositoryInterface $salesChannelRepository)
    {
        $this->themeService = $themeService;
        $this->salesChannelRepository = $salesChannelRepository;
    }

    /**
     * @Route("/api/v{version}/_action/dne-customcssjs/compile", name="api.action.core.dne-customcssjs.compile", methods={"GET"})
     */
    public function compile(): JsonResponse
    {
        $context = Context::createDefaultContext();

        $salesChannels = $this->getSalesChannels($context);
        foreach ($salesChannels as $salesChannel) {
            /** @var ThemeCollection|null $themes */
            $themes = $salesChannel->getExtensionOfType('themes', ThemeCollection::class);
            if (!$themes || !$theme = $themes->first()) {
                continue;
            }

            $this->themeService->compileTheme($salesChannel->getId(), $theme->getId(), $context);
        }

        return new JsonResponse(['success' => true]);
    }

    private function getSalesChannels(Context $context): SalesChannelCollection
    {
        $criteria = new Criteria();
        $criteria->addAssociation('themes');

        /** @var SalesChannelCollection $result */
        $result = $this->salesChannelRepository->search($criteria, $context)->getEntities();

        return $result;
    }
}
