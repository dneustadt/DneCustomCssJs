Custom JavaScript And CSS/SCSS Containers for Shopware 6
=====

This plugin for [Shopware 6](https://www.shopware.de) features a backend container manager to easily add custom
JavaScript and/or CSS/SCSS to the theme compilation.

This plugin is the follow-up for the [Shopware 5.x version](https://github.com/dneustadt/DneCustomJsCss).

The plugin offers the following features:

* Create unlimited containers of JavaScript and/or CSS/SCSS
* SCSS variables and mixins are inherited from themes and plugins and can be accessed
* JS/SCSS is injected into theme compilation. This means no dependency conflicts or additional resource requests.
* Languages: English, German

Requirements
-----

3.0.0
* Shopware >= 6.5

2.0.1
* Shopware >= 6.4

Installation
====
Clone this repository into a folder called **DneCustomCssJs** within the **custom/plugins** directory of the Shopware installation.

* Install the plugin through the Plugin-Manager within the Shopware backend.

Usage
=====
The module will be accessible in backend by a new sub-menu entry called _Custom CSS/JS_ under _Settings_.
