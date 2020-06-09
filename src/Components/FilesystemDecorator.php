<?php

namespace Dne\CustomCssJs\Components;

use Doctrine\DBAL\Connection;
use League\Flysystem\FilesystemInterface;
use League\Flysystem\Handler;
use League\Flysystem\PluginInterface;

class FilesystemDecorator implements FilesystemInterface
{
    private $filesystem;

    private $connection;

    public function __construct(FilesystemInterface $filesystem, Connection $connection)
    {
        $this->filesystem = $filesystem;
        $this->connection = $connection;
    }

    public function has($path)
    {
        return $this->filesystem->has($path);
    }

    public function read($path)
    {
        return $this->filesystem->read($path);
    }

    public function readStream($path)
    {
        return $this->filesystem->readStream($path);
    }

    public function listContents($directory = '', $recursive = false)
    {
        return $this->filesystem->listContents($directory, $recursive);
    }

    public function getMetadata($path)
    {
        return $this->filesystem->getMetadata($path);
    }

    public function getSize($path)
    {
        return $this->filesystem->getSize($path);
    }

    public function getMimetype($path)
    {
        return $this->filesystem->getMimetype($path);
    }

    public function getTimestamp($path)
    {
        return $this->filesystem->getTimestamp($path);
    }

    public function getVisibility($path)
    {
        return $this->filesystem->getVisibility($path);
    }

    public function write($path, $contents, array $config = [])
    {
        return $this->filesystem->write($path, $contents, $config);
    }

    public function writeStream($path, $resource, array $config = [])
    {
        return $this->filesystem->writeStream($path, $resource, $config);
    }

    public function update($path, $contents, array $config = [])
    {
        return $this->filesystem->update($path, $contents, $config);
    }

    public function updateStream($path, $resource, array $config = [])
    {
        return $this->filesystem->updateStream($path, $resource, $config);
    }

    public function rename($path, $newpath)
    {
        return $this->filesystem->rename($path, $newpath);
    }

    public function copy($path, $newpath)
    {
        return $this->filesystem->copy($path, $newpath);
    }

    public function copyBatch(...$assets)
    {
        return $this->filesystem->copyBatch(...$assets);
    }

    public function delete($path)
    {
        return $this->filesystem->delete($path);
    }

    public function deleteDir($dirname)
    {
        return $this->filesystem->deleteDir($dirname);
    }

    public function createDir($dirname, array $config = [])
    {
        return $this->filesystem->createDir($dirname, $config);
    }

    public function setVisibility($path, $visibility)
    {
        return $this->filesystem->setVisibility($path, $visibility);
    }

    public function put($path, $contents, array $config = [])
    {
        if (substr($path, -6) === 'all.js') {
            $qb = $this->connection->createQueryBuilder();
            $qb->select(['js'])
                ->from('dne_custom_js_css')
                ->where('active = 1')
                ->orderBy('name', 'asc');

            $scripts = $qb->execute()->fetchAll(\PDO::FETCH_COLUMN);

            if (is_array($scripts) && !empty($scripts)) {
                $contents .= join(\PHP_EOL, $scripts);
            }
        }

        return $this->filesystem->put($path, $contents, $config);
    }

    public function putStream($path, $resource, array $config = [])
    {
        return $this->filesystem->putStream($path, $resource, $config);
    }

    public function readAndDelete($path)
    {
        return $this->filesystem->readAndDelete($path);
    }

    public function get($path, Handler $handler = null)
    {
        return $this->filesystem->get($path, $handler);
    }

    public function addPlugin(PluginInterface $plugin)
    {
        return $this->filesystem->addPlugin($plugin);
    }
}
