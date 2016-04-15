angular.module('korboee-templates', ['src/KorboEE/Korboee-callback.tmpl.html', 'src/KorboEE/Korboee-error-config.tmpl.html', 'src/KorboEE/Modal/KorboEE.confirm.modal.tmpl.html', 'src/KorboEE/Modal/KorboEE.modal.tabs.tmpl.html', 'src/KorboEE/Modal/KorboEE.modal.tmpl.html', 'src/KorboEE/New/KorboEE.languagesPopover.tmpl.html', 'src/KorboEE/New/KorboEE.new.tmpl.html', 'src/KorboEE/New/Languages/keeLanguages.dir.tmpl.html', 'src/KorboEE/Search/KorboEE.search.tmpl.html', 'src/KorboEE/Search/KorboEEverticalTabs.tmpl.html', 'src/KorboEE/autocompleteList.tmpl.html', 'src/KorboEE/korboee-entity.tmpl.html']);

angular.module("src/KorboEE/Korboee-callback.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Korboee-callback.tmpl.html",
    "<!--\n" +
    "Use only callback mode.\n" +
    "You can use API registered on Global Object defined in your configuration\n" +
    "-->\n" +
    "\n" +
    "");
}]);

angular.module("src/KorboEE/Korboee-error-config.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Korboee-error-config.tmpl.html",
    "<div class=\"container error-ee-config\">\n" +
    "    <div \n" +
    "        class=\"row container alert alert-danger error col-md-4 error-ee-globalobject\" \n" +
    "        ng-show=\"errorType == 'globalObject'\">\n" +
    "            Configuration Error. Object {{conf.globalObjectName}} existing. Please check your configuration!\n" +
    "    </div>\n" +
    "    <div \n" +
    "        class=\"row container alert alert-danger error col-md-4 error-ee-autocomplete\" \n" +
    "        ng-show=\"errorType == 'autoComplete'\">\n" +
    "            CONFIGURATION ERROR. <br> \n" +
    "            You can choise only one mode: useAutocompleteWithNew or useAutocompleteWithSearch. <br> \n" +
    "            Please check your configuration!\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/KorboEE/Modal/KorboEE.confirm.modal.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Modal/KorboEE.confirm.modal.tmpl.html",
    "<div class=\"modal kee-wrp pnd-confirm-modal-container pnd-ignore\" tabindex=\"-1\" role=\"dialog\">\n" +
    "\n" +
    "    <div class=\"modal-dialog\">\n" +
    "\n" +
    "        <div class=\"modal-content\">\n" +
    "\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h4 class=\"modal-title\"> {{titleMessage}} </h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body pnd-confirm-modal-body\">\n" +
    "                {{notifyMessage}}\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-footer pnd-confirm-modal-footer\">\n" +
    "                <button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-confirm-modal-cancel\" ng-click=\"cancel()\">Cancel</button>\n" +
    "                <button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-confirm-modal-confirm\" ng-click=\"confirm()\">Confirm</button>\n" +
    "            </div> <!-- end modal-footer -->\n" +
    "\n" +
    "        </div> <!-- end modal content-->\n" +
    "\n" +
    "    </div> <!-- end modal dialog-->\n" +
    "\n" +
    "</div> <!-- end modal -->");
}]);

angular.module("src/KorboEE/Modal/KorboEE.modal.tabs.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Modal/KorboEE.modal.tabs.tmpl.html",
    "<ul class=\"pnd-tab-header\"\n" +
    "    ng-hide=\"editMode || !showHeaderTabs\">\n" +
    "    <li ng-repeat=\"pane in panes\"\n" +
    "        ng-class=\"{active: $index == active}\">\n" +
    "        <a data-toggle=\"tab\"\n" +
    "           ng-click=\"setActive($index, $event)\"\n" +
    "           data-index=\"{{$index}}\">\n" +
    "            {{pane.title}}\n" +
    "            <span class=\"badge pull-right\"\n" +
    "                  ng-show=\"pane.isStarted\">\n" +
    "                {{pane.totalResults}}\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<div class=\"pnd-tab-content\">\n" +
    "    <div ng-repeat=\"pane in panes\"\n" +
    "         class=\"tab-pane\"\n" +
    "         ng-class=\"[$index == active ? 'active' : '']\"\n" +
    "         ng-include=\"pane.template || '$pane'\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/KorboEE/Modal/KorboEE.modal.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Modal/KorboEE.modal.tmpl.html",
    "<div class=\"kee-wrp kee-modal-container pnd-modal modal pnd-ignore\"\n" +
    "     tabindex=\"-1\"\n" +
    "     role=\"dialog\"\n" +
    "     ng-controller=\"KeeModalCtrl\">\n" +
    "    <div class=\"pnd-modal-dialog modal-dialog\">\n" +
    "        <div class=\"pnd-modal-content modal-content kee-modal-content\">\n" +
    "            <div class=\"modal-body kee-modal-body\">\n" +
    "\n" +
    "                <!--<div ng-model=\"korboModalTabs.activeTab\"\n" +
    "                     data-template=\"src/KorboEE/Modal/KorboEE.modal.tabs.tmpl.html\"\n" +
    "                     bs-tabs=\"korboModalTabs\">\n" +
    "                </div>-->\n" +
    "                <div ng-include=\"'src/KorboEE/New/KorboEE.new.tmpl.html'\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/KorboEE/New/KorboEE.languagesPopover.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/New/KorboEE.languagesPopover.tmpl.html",
    "<div class=\"pnd-korbo-languages-popover pnd-popover popover\">\n" +
    "    <div class=\"kee-popover-item\" ng-disabled=\"true\">\n" +
    "        Update current language\n" +
    "    </div>\n" +
    "    <div class=\"kee-popover-item\" ng-disabled=\"true\">\n" +
    "        Update all languages\n" +
    "    </div>\n" +
    "    <div ng-repeat=\"lang in disactiveLanguages\" class=\"kee-popover-item\">\n" +
    "        <div ng-click=\"addLanguage(lang); $hide()\" >\n" +
    "            <span class=\"pnd-icon pnd-icon-plus\"></span> {{lang.name}} ({{lang.title}})\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-repeat=\"lang in tabs\">\n" +
    "        <div class=\"kee-popover-item\"\n" +
    "             ng-if=\"tabs[$index].title !== conf.defaultLanguage.toUpperCase()\"\n" +
    "             ng-click=\"removeLanguage(tabs[$index]); $hide()\">\n" +
    "            <span class=\"pnd-icon pnd-icon-minus\"></span>\n" +
    "            {{lang.name}} ({{lang.title}})\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- TODO This should become a dropdown element and inherit standard style -->");
}]);

angular.module("src/KorboEE/New/KorboEE.new.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/New/KorboEE.new.tmpl.html",
    "<div ng-controller=\"KeeNewCtrl\">\n" +
    "    <!-- Top area -->\n" +
    "    <div class=\"kee-top-area\">\n" +
    "        <div class=\"kee-top-area-menu pull-right\">\n" +
    "            <button type=\"button\" ng-click=\"showDropdown($event)\">\n" +
    "                <span class=\"pnd-icon pnd-icon-gear\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <!--<breadcrumbs ng-show=\"showBreadcrumbs\" bc-name=\"'keebreadcrumb'\" empty-placeholder=\"'Type entity title'\"></breadcrumbs>-->\n" +
    "        <div>\n" +
    "            <ul class=\"pnd-tab-header\">\n" +
    "                <li ng-class=\"{'active': innerPanes.current == 'simpleOptions'}\">\n" +
    "                    <a href=\"#\" id=\"nav-btn-entity\" ng-click=\"changeInnerPane('simpleOptions')\">{{entityTitle}}</a>\n" +
    "                </li>\n" +
    "                <li ng-class=\"{'active': innerPanes.current == 'advancedOptions'}\">\n" +
    "                    <a href=\"#\" id=\"nav-btn-advanced-options\" ng-click=\"changeInnerPane('advancedOptions')\">Advanced fields</a>\n" +
    "                </li>\n" +
    "                <li ng-class=\"{'active': innerPanes.current == 'tripleComposer'}\" ng-if=\"conf.tripleComposerEnabled\">\n" +
    "                    <a href=\"#\" id=\"nav-btn-triplecomposer\" ng-click=\"changeInnerPane('tripleComposer')\">Custom fields</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div class=\"kee-top-area-message\" ng-class=\"{'kee-error' : topArea.status == 'error'}\">\n" +
    "            {{topArea.message}}\n" +
    "            <a href=\"#\" ng-click=\"toggleErrorDetailsClick()\" ng-show=\"errorMoreInfoLink\">\n" +
    "                details.\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- End top area -->\n" +
    "\n" +
    "    <!-- New content -->\n" +
    "    <div class=\"kee-new-content\" ng-hide=\"isSaving\">\n" +
    "\n" +
    "        <!-- Inner pane: title, description and language management -->\n" +
    "        <div class=\"kee-inner-pane\"\n" +
    "             ng-show=\"innerPanes.panes.simpleOptions.visible\">\n" +
    "            <div class=\"kee-new-languages\">\n" +
    "                <div kee-languages=\"tabs\"></div>\n" +
    "                <button\n" +
    "                        class=\"pnd-btn pnd-btn-transparent pull-left\"\n" +
    "                        template-url=\"{{disactiveLanguagesPopoverTemplate}}\"\n" +
    "                        data-animation=\"am-flip-x\"\n" +
    "                        bs-popover>\n" +
    "                    <span class=\"pnd-icon pnd-icon-plus\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- END - Inner pane: title, description and language management -->\n" +
    "\n" +
    "        <!-- Inner pane: advanced options -->\n" +
    "        <div class=\"kee-inner-pane\"\n" +
    "             ng-show=\"innerPanes.panes.advancedOptions.visible\">\n" +
    "\n" +
    "            <div class=\"kee-inner-sub-pane kee-inner-sub-pane-right pull-right\">\n" +
    "                <!-- Image url -->\n" +
    "                <div class=\"kee-new-image-url\">\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <!-- Preview -->\n" +
    "                        <div class=\"kee-preview-image\">\n" +
    "                            <img ng-show=\"showImg\" ng-src=\"{{previewImage}}\"/>\n" +
    "                        </div>\n" +
    "                        <!-- End preview -->\n" +
    "                        <span\n" +
    "                                ng-show=\"errorImage\"\n" +
    "                                class=\"kee-message-error-image\">\n" +
    "                                Impossible to load image\n" +
    "                        </span>\n" +
    "                        <span\n" +
    "                                ng-show=\"loadingImage\"\n" +
    "                                class=\"kee-message-loading-image\">\n" +
    "                                Loading image...\n" +
    "                        </span>\n" +
    "                        <label>\n" +
    "                            Image URL\n" +
    "                            <span\n" +
    "                                    ng-show=\"!imageUrlHasError\"\n" +
    "                                    class=\"pnd-icon pnd-icon-info-circle\"\n" +
    "                                    data-title=\"{{imageUrlTooltipeMessage}}\"\n" +
    "                                    bs-tooltip>\n" +
    "                            </span>\n" +
    "                            <span\n" +
    "                                    ng-show=\"imageUrlHasError\"\n" +
    "                                    class=\"kee-error pnd-icon pnd-icon-info-circle\"\n" +
    "                                    data-title=\"{{imageUrlErrorMessage}}\"\n" +
    "                                    bs-tooltip>\n" +
    "                            </span>\n" +
    "                        </label>\n" +
    "                        <input\n" +
    "                                ng-hide=\"showImg\"\n" +
    "                                type=\"text\"\n" +
    "                                ng-model=\"imageUrl\"\n" +
    "                                ng-change=\"checkUrl()\"\n" +
    "                                class=\"form-control\">\n" +
    "                        <a\n" +
    "                                ng-show=\"showImg\"\n" +
    "                                ng-click=\"removeImage()\"\n" +
    "                                class=\"kee-message-remove-image\">\n" +
    "                            Remove image\n" +
    "                        </a>\n" +
    "                        <label ng-class=\"{'kee-error' : imageUrlHasError}\" />\n" +
    "                    </div>\n" +
    "                    <!-- End form group -->\n" +
    "                </div>\n" +
    "                <!-- End image url -->\n" +
    "\n" +
    "                <!-- Original url-->\n" +
    "                <div class=\"kee-new-original-url\"\n" +
    "                     ng-show=\"conf.fromLODTools\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Original URL</label>\n" +
    "                        <div class=\"left-inner-icon\">\n" +
    "                            <span class=\"pnd-icon pnd-icon-external-link\" ng-click=\"openWindow(originalUrl);$event.stopPropagation();$event.preventDefault();\"></span>\n" +
    "                            <span class=\"pnd-icon\"\n" +
    "                                  ng-class=\"{true:'pnd-icon-lock', false:'pnd-icon-unlock'}[originalUrlCheck]\"\n" +
    "                                  ng-click=\"originalUrlCheck = !originalUrlCheck;\">\n" +
    "                            </span>\n" +
    "                            <input\n" +
    "                                type=\"text\"\n" +
    "                                class=\"form-control\"\n" +
    "                                ng-model=\"originalUrl\"\n" +
    "                                ng-disabled=\"originalUrlCheck\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <button class=\"pnd-btn pnd-btn-small\"\n" +
    "                            ng-disabled=\"originalUrlCheck\"\n" +
    "                            ng-show=\"conf.LODToolSearchURL\"\n" +
    "                            ng-click=\"searchOnResourcePanel($event, 'original-url')\">\n" +
    "                        Search original URL\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <!-- End original url -->\n" +
    "\n" +
    "                <!-- Search and copy from LOD-->\n" +
    "                <div class=\"kee-new-search-and-copy\"\n" +
    "                     ng-show=\"conf.fromLODTools && conf.LODToolSearchAndCopy\">\n" +
    "                    <button class=\"pnd-btn pnd-btn-small\"\n" +
    "                            ng-click=\"searchOnResourcePanel($event, 'copy-from-lod')\">\n" +
    "                        Search and copy from LOD\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "                <!-- End original url -->\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Types -->\n" +
    "            <div class=\"kee-inner-sub-pane kee-inner-sub-pane-left pull-left\">\n" +
    "                <div\n" +
    "                    class=\"kee-new-types\"\n" +
    "                    ng-mouseleave=\"typesMouseLeave()\"\n" +
    "                    ng-mouseenter=\"typesMouseEnter()\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <button\n" +
    "                            type=\"button\"\n" +
    "                            class=\"pnd-btn pnd-btn-transparent pull-right\"\n" +
    "                            ng-show=\"!activeFilter\"\n" +
    "                            ng-click=\"activeFilter = !activeFilter\">\n" +
    "                                <span class=\"pnd-icon pnd-icon-filter\"></span>\n" +
    "                        </button>\n" +
    "                        <label ng-class=\"{'kee-error' : typesHasError}\">\n" +
    "                            Types\n" +
    "                            <span class=\"kee-error\"> * </span>\n" +
    "                            <span\n" +
    "                                ng-show=\"!typesHasError\"\n" +
    "                                class=\"pnd-icon pnd-icon-info-circle\"\n" +
    "                                data-title=\"{{typesTooltipeMessage}}\"\n" +
    "                                bs-tooltip>\n" +
    "                            </span>\n" +
    "                            <span\n" +
    "                                ng-show=\"typesHasError\"\n" +
    "                                class=\"pnd-icon pnd-icon-info-circle kee-error\"\n" +
    "                                data-title=\"{{typesErrorMessage}}\"\n" +
    "                                bs-tooltip>\n" +
    "                            </span>\n" +
    "                        </label>\n" +
    "\n" +
    "                        <div\n" +
    "                            class=\"left-inner-icon pull-right\"\n" +
    "                            ng-show=\"activeFilter\">\n" +
    "                            <span\n" +
    "                                ng-show=\"typeFilter.label == ''\"\n" +
    "                                class=\"pnd-icon pnd-icon-filter\"\n" +
    "                                ng-click=\"activeFilter = !activeFilter\">\n" +
    "                            </span>\n" +
    "                            <span\n" +
    "                                ng-show=\"!typeFilter.label == ''\"\n" +
    "                                class=\"pnd-icon pnd-icon-close\"\n" +
    "                                ng-click=\"typeFilter.label=''\">\n" +
    "                            </span>\n" +
    "                            <input\n" +
    "                                ng-show=\"activeFilter\"\n" +
    "                                type=\"text\"\n" +
    "                                placeholder=\"filter types...\"\n" +
    "                                ng-model=\"typeFilter.label\"\n" +
    "                                class=\"form-control\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <!-- End form group -->\n" +
    "\n" +
    "                    <!-- Types list -->\n" +
    "                    <div class=\"kee-list-types\">\n" +
    "                        <ul class=\"list-group\">\n" +
    "                            <li\n" +
    "                                ng-repeat=\"item in types | filter:typeFilter\"\n" +
    "                                class=\"list-group-item\">\n" +
    "                                    <div\n" +
    "                                        class=\"pnd-item\"\n" +
    "                                        ng-class=\"{'pnd-sticky-item': item.checked}\"\n" +
    "                                        ng-click=\"item.checked = !item.checked; updateTypes()\">\n" +
    "                                            <div class=\"pnd-item-buttons\">\n" +
    "                                                <span\n" +
    "                                                    class=\"pnd-icon pnd-icon-check ng-scope\"\n" +
    "                                                    ng-show=\"item.checked\">\n" +
    "                                                </span>\n" +
    "                                            </div>\n" +
    "\n" +
    "                                            <div class=\"pnd-item-text\">\n" +
    "                                                <span class=\"pnd-item-label\">\n" +
    "                                                    {{item.label}}\n" +
    "                                                </span>\n" +
    "                                            </div>\n" +
    "\n" +
    "                                            <span\n" +
    "                                                class=\"pnd-icon pnd-icon-external-link pull-right\"\n" +
    "                                                ng-click=\"openWindow(item.URI);$event.stopPropagation();$event.preventDefault();\">\n" +
    "                                            </span>\n" +
    "                                    </div>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <!-- End types list -->\n" +
    "                </div>\n" +
    "                <!-- End Types -->\n" +
    "                <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "                        ng-click=\"activeAllTypes()\">\n" +
    "                    Select all types\n" +
    "                </button>\n" +
    "                <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "                        ng-click=\"disableAllTypes()\">\n" +
    "                    Deselect all types\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- END - Inner pane: advanced options -->\n" +
    "\n" +
    "        <!-- Inner pane: search -->\n" +
    "        <!-- \n" +
    "        <div class=\"kee-inner-pane\"\n" +
    "             ng-show=\"innerPanes.panes.search.visible\">\n" +
    "            <div ng-include=\"'src/KorboEE/Search/KorboEE.search.tmpl.html'\"></div>\n" +
    "        </div>\n" +
    "        -->\n" +
    "        <!-- END - Inner pane: search -->\n" +
    "\n" +
    "        <!-- Inner pane: tripleComposer -->\n" +
    "        <div class=\"kee-inner-pane pnd-wrp\"\n" +
    "             ng-show=\"innerPanes.panes.tripleComposer.visible\">\n" +
    "            <!--Triple composer is visible only when at least one type is selected-->\n" +
    "            <triple-composer tc-name=\"'korboeetriplecomposer'\" ng-show=\"selectedTypes().length > 0\"></triple-composer>\n" +
    "            <!--Otherwise a warning message is shown-->\n" +
    "            <div ng-show=\"selectedTypes().length == 0\">\n" +
    "                <p class=\"kee-infotext\">\n" +
    "                    You can't add custom fields if no entity types are specified.\n" +
    "                    <br />\n" +
    "                    Please go to the <a ng-click=\"changeInnerPane('advancedOptions')\">advanced options</a> and select one or more types.\n" +
    "                    <br /><br />\n" +
    "                    <!-- TODO See if we can remove the button below -->\n" +
    "                    <button class=\"pnd-btn pnd-btn-sm\"\n" +
    "                            ng-show=\"!loadingStatus\"\n" +
    "                            ng-click=\"changeInnerPane('advancedOptions')\">Advanced options</button>\n" +
    "                </p>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- END Inner pane: tripleComposer -->\n" +
    "    </div>\n" +
    "    <!-- End new content -->\n" +
    "\n" +
    "    <div class=\"kee-new-saving\" ng-show=\"isSaving\">\n" +
    "        Saving...\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"kee-error-more-info small-modal-wrapper\" ng-show=\"errorMoreInfo\">\n" +
    "        <div class=\"kee-error-more-info-content small-modal\">\n" +
    "\n" +
    "            <!-- Modal contents -->\n" +
    "            <div class=\"small-modal-content\">\n" +
    "                <p>\n" +
    "                    The entity you are creating is <strong>not compatible with the Predicate</strong> you are using in your annotation.\n" +
    "                </p>\n" +
    "                <!--\n" +
    "                    You are creating an entity to be used as <strong><em>{{typesErrorDetails.entityUsedAs}}</em></strong>\n" +
    "                    with a predicate having <em>{{typesErrorDetails.predicateProperty}}</em> not compatible with entity types you've selected.\n" +
    "                -->\n" +
    "                <p>\n" +
    "                    Please select at least one of following types:\n" +
    "                </p>\n" +
    "                <ul class=\"list-group\">\n" +
    "                    <li ng-repeat=\"type in typesErrorDetails.predicateTypes\" title=\"{{type.uri}}\">\n" +
    "                        {{type.name}}\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <!-- END // Modal contents -->\n" +
    "\n" +
    "            <!-- Modal footer containing buttons -->\n" +
    "            <div class=\"kee-error-more-info-content-footer small-modal-footer\">\n" +
    "                <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"pnd-btn pnd-btn-small\"\n" +
    "                        ng-click=\"toggleErrorDetailsClick()\">\n" +
    "                    Close\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <!-- END // Modal footer containing buttons -->\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Footer -->\n" +
    "    <div class=\"kee-footer\">\n" +
    "        <button\n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-click=\"closeKeeModal()\">\n" +
    "                Close\n" +
    "        </button><button\n" +
    "            ng-hide=\"editMode\" \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-click=\"clearForm()\">\n" +
    "                Clear\n" +
    "        </button><button\n" +
    "                type=\"button\"\n" +
    "                class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "                ng-click=\"save()\">\n" +
    "            <span ng-if=\"!editMode\">Save and add</span>\n" +
    "            <span ng-if=\"editMode\">Save</span>\n" +
    "        </button>\n" +
    "    </div> \n" +
    "    <!-- End Footer -->\n" +
    "</div>");
}]);

angular.module("src/KorboEE/New/Languages/keeLanguages.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/New/Languages/keeLanguages.dir.tmpl.html",
    "<div class=\"tabbable tabs-left\"> <!-- tabs left -->\n" +
    "\n" +
    "    <ul class=\"pnd-vertical-tabs\">\n" +
    "        <li ng-repeat=\"pane in panes\" ng-class=\"{active: $index == active, 'kee-error' : panes[$index].hasError}\" ng-show=\"pane.isVisible\">\n" +
    "            <a ng-show=\"!panes[$index].hasError\" data-toggle=\"tab\" ng-click=\"setActive($index, $event)\" data-index=\"{{$index}}\" ng-bind-html=\"pane.title\"></a>\n" +
    "            <a ng-show=\"panes[$index].hasError\" data-toggle=\"tab\" ng-click=\"setActive($index, $event)\" data-index=\"{{$index}}\" >\n" +
    "                <span class=\"kee-error\" bs-tooltip data-title=\"{{tabs[$index].tooltipMessageErrorTab}}\" >{{pane.title}}</span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li class=\"pull-right show-tabs\" ng-class=\"{active: hiddenTabIsActive}\" placement=\"bottom-right\" template-url=\"{{hiddenTabsDropdownTemplate}}\" bs-dropdown=\"hiddenTabs\" ng-show=\"hiddenTabsToShow()\">\n" +
    "            <a><span class=\"pnd-icon pnd-icon-dots\"></span></a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <!-- tab content-->\n" +
    "    <div>\n" +
    "        <div class=\"pnd-vertical-tab-content pnd-tab-content\">\n" +
    "            <div ng-repeat=\"pane in tabs\" class=\"tab-pane pnd-vertical-tab-list-content\" ng-class=\"[$index == active ? 'active' : '']\">\n" +
    "                <!-- entity title -->\n" +
    "                <div class=\"kee-title\">\n" +
    "	                <div class=\"form-group\">\n" +
    "	                <label ng-class=\"{'kee-error' : tabs[$index].hasError}\">Title\n" +
    "	                    <span class=\"kee-error\" ng-class=\"{'kee-error' : tabs[$index].hasError}\"> * </span>\n" +
    "	                    <span ng-show=\"!tabs[$index].hasError\" class=\"pnd-icon pnd-icon-info-circle\" data-title=\"{{tabs[$index].tooltipMessageTitle}}\" bs-tooltip></span>\n" +
    "	                    <span ng-show=\"tabs[$index].hasError\" class=\"kee-error pnd-icon pnd-icon-info-circle\" data-title=\"{{tabs[$index].tooltipMessageError}}\" bs-tooltip></span>\n" +
    "	                </label>\n" +
    "	                <input type=\"text\" ng-model=\"tabs[$index].label\" ng-change = updateTitleField($index) class=\"form-control\">\n" +
    "	                </div>\n" +
    "                </div>\n" +
    "                <!-- end entity title -->\n" +
    "\n" +
    "                <!-- entity description -->\n" +
    "                <div class=\"form-group\">\n" +
    "	                <div class=\"kee-description\">\n" +
    "    	                <label>Description <span class=\"pnd-icon pnd-icon-info-circle\" data-title=\"{{tabs[$index].tooltipMessageDescription}}\" bs-tooltip></span></label>\n" +
    "    	                <textarea class=\"form-control\" rows=\"3\" ng-model=\"tabs[$index].description\" class=\"form-control\"></textarea>\n" +
    "	                </div>\n" +
    "                </div>\n" +
    "                <!-- end entity description -->\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div> <!-- / tabs left -->");
}]);

angular.module("src/KorboEE/Search/KorboEE.search.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Search/KorboEE.search.tmpl.html",
    "<div class=\"kee-wrp\" ng-controller=\"KeeSearchCtrl\">\n" +
    "    <!-- Search -->\n" +
    "    <div class=\"kee-search\">\n" +
    "            <label>\n" +
    "                {{searchFieldLabel}}\n" +
    "            </label>\n" +
    "            <div class=\"left-inner-icon\">\n" +
    "    	        <span \n" +
    "                    class=\"pnd-icon pnd-icon-search\" \n" +
    "                    ng-click=\"search.term = ''\">\n" +
    "                </span>\n" +
    "    	        <input \n" +
    "                    class=\"form-control\" \n" +
    "                    type=\"text\" \n" +
    "                    ng-model=\"elemToSearch\" \n" +
    "                    placeholder=\"Type at least {{conf.labelMinLength}} characters...\">\n" +
    "            </div>\n" +
    "    </div>\n" +
    "    <!-- // End search -->\n" +
    "\n" +
    "    <div>\n" +
    "        <preview \n" +
    "            use-in-korbo=\"true\" \n" +
    "            is-loading=\"{{previewIsLoading}}\" \n" +
    "            error-loading=\"{{previewError}}\">\n" +
    "        </preview>\n" +
    "    </div>\n" +
    "\n" +
    "    <div \n" +
    "        ng-model=\"contentTabs.activeTab\" \n" +
    "        bs-tabs=\"contentTabs\" \n" +
    "        data-template = \"src/ResourcePanel/ResourcePanel.tmpl.html\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Footer -->\n" +
    "    <div class=\"kee-footer\">\n" +
    "        <button \n" +
    "            ng-hide=\"searchType != 'tab' || editMode || !showClose.visibility\"\n" +
    "            ng-class=\"{'disabled': showClose.disabled}\"\n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-click=\"closeKeeModal()\">\n" +
    "                Close\n" +
    "        </button>\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-show=\"searchType() == 'tab' && !editMode && showMoreInfo.visibility\"\n" +
    "            ng-class=\"{'disabled': showMoreInfo.disabled}\" \n" +
    "            ng-click=\"moreInfo()\">\n" +
    "                More Info\n" +
    "        </button>\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "            ng-show=\"searchType() == 'tab' && !editMode && showCopyInEditor.visibility\"\n" +
    "            ng-class=\"{'disabled': showCopyInEditor.disabled}\" \n" +
    "            ng-click=\"copyInEditor()\">\n" +
    "                Copy in editor\n" +
    "        </button>\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "            ng-show=\"searchType() == 'tab' && !editMode && showUse.visibility\"\n" +
    "            ng-class=\"{'disabled': showUse.disabled}\" \n" +
    "            ng-click=\"use()\">\n" +
    "                Use\n" +
    "        </button>\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "            ng-show=\"searchType() == 'tab' && !editMode && showUseAndCopy.visibility\"\n" +
    "            ng-class=\"{'disabled': showUseAndCopy.disabled}\" \n" +
    "            ng-click=\"copyAndUse()\">\n" +
    "                Copy and Use\n" +
    "        </button>\n" +
    "        <button\n" +
    "            ng-show=\"searchType() == 'tab' && editMode\"\n" +
    "            type=\"button\" class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "            ng-click=\"korboModalTabs.activeTab = 1\">\n" +
    "                Back\n" +
    "        </button>\n" +
    "        <button \n" +
    "            ng-show=\"searchType() == 'tab' && editMode\"\n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-btn pnd-btn-xsmall\"\n" +
    "            ng-disabled=\"!itemSelected\"\n" +
    "            ng-click=\"copyInEditor(); elemToSearch = ''\">\n" +
    "                Select URL\n" +
    "        </button>\n" +
    "        <button\n" +
    "            type=\"button\"\n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-show=\"searchType() == 'inner' && showInnerSelectURL.visibility\"\n" +
    "            ng-class=\"{'disabled': showInnerSelectURL.disabled || !itemSelected}\"\n" +
    "            ng-click=\"innerSelectURL()\">\n" +
    "                Select URL\n" +
    "        </button>\n" +
    "        <button\n" +
    "            type=\"button\"\n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-show=\"searchType() == 'inner' && showInnerCopyFromLOD.visibility\"\n" +
    "            ng-class=\"{'disabled': showInnerCopyFromLOD.disabled || !itemSelected}\"\n" +
    "            ng-click=\"innerCopyFromLOD()\">\n" +
    "                Copy from LOD\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <!-- // End footer -->\n" +
    "</div>");
}]);

angular.module("src/KorboEE/Search/KorboEEverticalTabs.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/Search/KorboEEverticalTabs.tmpl.html",
    "<div class=\"tabbable tabs-left\"> <!-- tabs left -->\n" +
    "\n" +
    "    <ul class=\"pnd-vertical-tabs\">\n" +
    "        <li ng-repeat=\"pane in contentTabs\" ng-class=\"{active: $index == active}\">\n" +
    "            <a data-toggle=\"tab\" ng-click=\"setActive($index, $event)\" data-index=\"{{$index}}\" >\n" +
    "                <span class=\"badge pull-right\" ng-show=\"!pane.isLoading && pane.items.length>0 && elemToSearch!==''\">{{pane.items.length}}</span>\n" +
    "                <span class=\"pnd-icon pnd-icon-refresh pnd-icon-spin pull-right\" ng-show=\"pane.isLoading\"></span>\n" +
    "                {{pane.title}}\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div>\n" +
    "        <div class=\"pnd-vertical-tab-content\">\n" +
    "        	<div ng-repeat=\"pane in contentTabs\" class=\"tab-pane pnd-vertical-tab-list-content\" ng-class=\"[$index == active ? 'active' : '']\">\n" +
    "		        <div class=\"kee-server-messages\" ng-if=\"!contentTabs[$index].serverError\">\n" +
    "		        	<!-- messages 1 -->\n" +
    "		        	<div ng-show=\"!contentTabs[$index].isLoading && contentTabs[$index].items.length === 0 && elemToSearch !== ''\">No results found</div>\n" +
    "		        	<!-- / end messages 1 -->\n" +
    "		        	<!-- messages 2 -->\n" +
    "		        	<div class=\"kee-server-searching\" ng-show=\"contentTabs[$index].isLoading && elemToSearch !== ''\"><span class=\"pnd-icon pnd-icon-refresh pnd-icon-spin \"></span></div>\n" +
    "		        	<!-- / end messages 2 -->\n" +
    "		        	<!-- messages 3 -->\n" +
    "		        	<div ng-show=\"!contentTabs[$index].isLoading && contentTabs[$index].items.length === 0 && elemToSearch === ''\">Type a label to search...</div>\n" +
    "		        	<!-- / end messages 3 -->\n" +
    "		        </div>\n" +
    "		        <!-- messages 4 -->\n" +
    "		        <div class=\"kee-server-messages\" ng-if=\"contentTabs[$index].serverError\">\n" +
    "		            <div ng-show=\"contentTabs[$index].serverError\">Server error</div>\n" +
    "		        </div>\n" +
    "		        <!-- / end messages 4 -->\n" +
    "                <ul class=\"list-group pnd-inner-scrollable\">\n" +
    "                    <li class=\"list-group-item\" ng-repeat=\"mi in contentTabs[$index].items | orderBy:getOrderProperty\" >\n" +
    "                        <item uri=\"{{mi.uri}}\" hide-options=\"true\" hide-sticky-button=\"true\" ng-click=\"select(mi)\" is-selected=\"{{isSelected(mi)}}\" ng-mouseover=\"getItem(mi)\"></item>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "           </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div> <!-- / tabs left -->");
}]);

angular.module("src/KorboEE/autocompleteList.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/autocompleteList.tmpl.html",
    "<ul tabindex=\"-1\" class=\"typeahead dropdown-menu kee-autocomplete-list list-group\" ng-show=\"$isVisible() && !serverNotRunning\" role=\"select\">\n" +
    "  <li role=\"presentation\" ng-repeat=\"match in $matches\"  class=\"list-group-item\">\n" +
    "    <item uri=\"{{match.value.uri}}\" ng-click=\"$select($index, $event);selectEntity(match)\" ng-if=\"match.label !== 'no found'\"></item>\n" +
    "    <span class=\"kee-not-found\" role=\"menuitem\" tabindex=\"-1\" disabled ng-bind=\"noFound\" ng-show=\"match.value.noResult === true\"></span>\n" +
    "  </li>\n" +
    "    <li ng-show=\"showNewButton() || showSearchButton()\"></li>\n" +
    "    <li>\n" +
    "    <!-- footer -->\n" +
    "    <div class=\"kee-footer-autocomplete\">\n" +
    "        <span class=\"kee-elem-to-search\" ng-show=\"showNewButton() || showSearchButton()\">\"{{elemToSearch}}\"</span>\n" +
    "        <!-- <div class=\"kee-footer-btn\"> -->\n" +
    "        <button class=\"kee-btn-new pnd-btn pnd-btn-xsmall\" ng-show=\"showNewButton()\" ng-click=\"openKeeModal();$event.preventDefault();$event.stopPropagation();\">\n" +
    "            <i class=\"pnd-icon pnd-icon-plus\"></i>\n" +
    "            Create new\n" +
    "        </button>\n" +
    "        <button class=\"kee-btn-search pnd-btn pnd-btn-xsmall\" ng-show=\"showSearchButton()\" ng-click=\"searchOnLOD();$event.preventDefault();$event.stopPropagation();\">\n" +
    "            <i class=\"pnd-icon pnd-icon-search\"></i>\n" +
    "            Search in LOD\n" +
    "        </button>\n" +
    "        <!-- </div> -->\n" +
    "    </div>\n" +
    "    <!-- End footer -->\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("src/KorboEE/korboee-entity.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/KorboEE/korboee-entity.tmpl.html",
    "<div \n" +
    "      class=\"container kee-wrp\" \n" +
    "      id=\"korbo-ee-container\" \n" +
    "      ng-show=\"renderElement()\">\n" +
    "      \n" +
    "      <div class=\"left-inner-icon\">\n" +
    "            <span \n" +
    "                  class=\"pnd-icon pnd-icon-refresh pnd-icon-spin\" \n" +
    "                  ng-show=\"isLoading() && !serverNotRunning\">\n" +
    "            </span>\n" +
    "            <input type=\"text\"\n" +
    "                   class=\"kee-input-elem-to-search kee-input-ok form-control\"\n" +
    "                   name=\"{{conf.tafonyName}}\"\n" +
    "                   id=\"{{conf.tafonyId}}\"\n" +
    "                   ng-model=\"elemToSearch\"\n" +
    "                   placeholder=\"Type at least {{conf.labelMinLength}} characters...\"\n" +
    "                   template-url=\"{{autocompleteListTemplate}}\"\n" +
    "                   data-limit=\"{{korboSearchLimit}}\"\n" +
    "                   data-min-length=\"{{korboMinLength}}\"\n" +
    "                   bs-options=\"e.label for e in autoCompleteSearch($viewValue)\"\n" +
    "                   bs-typeahead\n" +
    "                   ng-disabled=\"serverNotRunning\"\n" +
    "                   ng-show = \"!serverNotRunning\"\n" +
    "                   autocomplete=\"off\"\n" +
    "                    >\n" +
    "\n" +
    "            <input \n" +
    "                  ng-disabled=\"true\" \n" +
    "                  class=\"kee-input-elem-to-search kee-input-error-server form-control\" placeholder=\"Sorry! The service is not working\" \n" +
    "                  ng-show = \"serverNotRunning\"/>\n" +
    "\n" +
    "      </div> \n" +
    "      <!-- // End div ee-input-container -->\n" +
    "\n" +
    "\n" +
    "      <!-- input hidden -->\n" +
    "      <input \n" +
    "            type=\"hidden\" \n" +
    "            name=\"{{conf.nameInputHiddenUri}}\" \n" +
    "            value=\"{{location}}\" \n" +
    "            class=\"ee-uri-hidden\" />\n" +
    "      <input \n" +
    "            type=\"hidden\" \n" +
    "            name=\"{{conf.nameInputHiddenLabel}}\" \n" +
    "            value=\"{{label}}\" \n" +
    "            class=\"ee-label-hidden\" />\n" +
    "      <!-- // End input hidden -->\n" +
    "\n" +
    "</div> \n" +
    "<!-- // End div container -->\n" +
    "");
}]);
