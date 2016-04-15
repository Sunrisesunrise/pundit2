angular.module('templates-main', ['src/AlertSystem/AlertSystem.dir.tmpl.html', 'src/AlertSystem/ClientAlertSystem.tmpl.html', 'src/Annomatic/AnnomaticPanel.dir.tmpl.html', 'src/Annomatic/AnnomaticPopover.tmpl.html', 'src/Annomatic/ScanBtn.dir.tmpl.html', 'src/Annomatic/SuggestionFragmentIcon.dir.tmpl.html', 'src/AnnotationPopover/AnnotationPopover.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.commenting.dir.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.dir.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.highlighting.dir.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.linking.dir.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.reply.dir.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.replyTextArea.tmpl.html', 'src/AnnotationSidebar/AnnotationDetails.socialButtons.tmpl.html', 'src/AnnotationSidebar/AnnotationSidebar.dir.tmpl.html', 'src/AnnotationSidebar/ClientAnnotationSidebar.tmpl.html', 'src/Annotators/ImgMenu.dir.tmpl.html', 'src/Annotators/ResourceMenu.dir.tmpl.html', 'src/Annotators/TextFragmentIcon.dir.tmpl.html', 'src/Breadcrumbs/Breadcrumbs.dir.tmpl.html', 'src/ContextualMenu/dropdown.tmpl.html', 'src/Core/Templates/confirm.modal.tmpl.html', 'src/Core/Templates/info.modal.tmpl.html', 'src/Core/Templates/login.popover.tmpl.html', 'src/Core/Templates/pndSelect.dir.tmpl.html', 'src/Core/Templates/send.modal.tmpl.html', 'src/Dashboard/ClientDashboard.tmpl.html', 'src/Dashboard/Dashboard.dir.tmpl.html', 'src/Dashboard/DashboardPanel.dir.tmpl.html', 'src/Dashboard/pndTabs.dir.tmpl.html', 'src/FragmentPopover/FragmentPopover.tmpl.html', 'src/Item/Item.dir.tmpl.html', 'src/Item/KorboItem.dir.tmpl.html', 'src/KorboEE/Korboee-callback.tmpl.html', 'src/KorboEE/Korboee-error-config.tmpl.html', 'src/KorboEE/Modal/KorboEE.confirm.modal.tmpl.html', 'src/KorboEE/Modal/KorboEE.modal.tabs.tmpl.html', 'src/KorboEE/Modal/KorboEE.modal.tmpl.html', 'src/KorboEE/New/KorboEE.languagesPopover.tmpl.html', 'src/KorboEE/New/KorboEE.new.tmpl.html', 'src/KorboEE/New/Languages/keeLanguages.dir.tmpl.html', 'src/KorboEE/Search/KorboEE.search.tmpl.html', 'src/KorboEE/Search/KorboEEverticalTabs.tmpl.html', 'src/KorboEE/autocompleteList.tmpl.html', 'src/KorboEE/korboee-entity.tmpl.html', 'src/Lists/GeneralItemsContainer/ClientGeneralItemsContainer.tmpl.html', 'src/Lists/GeneralItemsContainer/GeneralItemsContainer.dir.tmpl.html', 'src/Lists/MyItemsContainer/ClientMyItemsContainer.tmpl.html', 'src/Lists/MyNotebooksContainer/ClientMyNotebooksContainer.tmpl.html', 'src/Lists/PageItemsContainer/ClientPageItemsContainer.tmpl.html', 'src/Lists/PredicatesContainer/ClientPredicatesContainer.tmpl.html', 'src/Lists/VocabulariesContainer/ClientVocabulariesContainer.tmpl.html', 'src/Lists/itemList.tmpl.html', 'src/Lists/itemsContainer.tmpl.html', 'src/LiteTool/ClientLiteTool.tmpl.html', 'src/LiteTool/LiteTool.dir.tmpl.html', 'src/Preview/ClientDashboardPreview.tmpl.html', 'src/Preview/DashboardPreview.dir.tmpl.html', 'src/Preview/ItemPreview.dir.tmpl.html', 'src/Preview/NotebookPreview.dir.tmpl.html', 'src/ResourcePanel/ResourcePanel.tmpl.html', 'src/ResourcePanel/datepicker.tmpl.html', 'src/ResourcePanel/popoverCalendar.tmpl.html', 'src/ResourcePanel/popoverLiteralText.tmpl.html', 'src/ResourcePanel/popoverResourcePanel.tmpl.html', 'src/ResourcePanel/resourceCalendar.dir.tmpl.html', 'src/ResourcePanel/verticalTabs.tmpl.html', 'src/SimplifiedClient/ItemPopover.tmpl.html', 'src/Toolbar/ClientToolbar.tmpl.html', 'src/Toolbar/Toolbar.dir.tmpl.html', 'src/Toolbar/myNotebooksDropdown.tmpl.html', 'src/Toolbar/templatesDropdown.tmpl.html', 'src/Tools/NotebookComposer/ClientNotebookComposer.tmpl.html', 'src/Tools/NotebookComposer/NotebookComposer.dir.tmpl.html', 'src/Tools/TripleComposer/ClientTripleComposer.tmpl.html', 'src/Tools/TripleComposer/Statement.dir.tmpl.html', 'src/Tools/TripleComposer/TripleComposer.dir.tmpl.html']);

angular.module("src/AlertSystem/AlertSystem.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AlertSystem/AlertSystem.dir.tmpl.html",
    "<div class=\"pnd-alert-wrp pnd-ignore\">\n" +
    "    <div\n" +
    "        class=\"pnd-alert pnd-animate-repeat {{alert.alertClass}}\"\n" +
    "        ng-class=\"{'pnd-alert-closable': alert.dismissible}\"\n" +
    "        ng-show=\"::animateShowAlert(alert)\"\n" +
    "        role=\"alert\"\n" +
    "        ng-repeat=\"alert in alerts\"\n" +
    "        ng-click=\"alertClick(alert, $event)\"\n" +
    "        data-alert-id=\"{{alert.id}}\"\n" +
    "        style=\"{{::alert.initStyle}}\"\n" +
    "        ng-mouseenter=\"mouseEnter(alert)\"\n" +
    "        ng-mouseleave=\"mouseLeave(alert)\"\n" +
    "        >\n" +
    "        <div class=\"pnd-alert-progress\"\n" +
    "             ng-show=\"alert.timeout !== null\"\n" +
    "                ></div>\n" +
    "        <button\n" +
    "            type=\"button\"\n" +
    "            class=\"close\"\n" +
    "            aria-label=\"Close\"\n" +
    "            ng-click=\"dismissAlert(alert)\"\n" +
    "            ng-show=\"alert.dismissible\">\n" +
    "            <span aria-hidden=\"true\" class=\"pnd-icon-close\"></span>\n" +
    "        </button>\n" +
    "        <h1 ng-show=\"alert.title && alert.title.length > 0\">\n" +
    "            {{alert.title}}\n" +
    "        </h1>\n" +
    "        <p class=\"pnd-alert-text\" ng-bind-html=\"alert.message\">\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/AlertSystem/ClientAlertSystem.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AlertSystem/ClientAlertSystem.tmpl.html",
    "<alert-system></alert-system>");
}]);

angular.module("src/Annomatic/AnnomaticPanel.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annomatic/AnnomaticPanel.dir.tmpl.html",
    "<div ng-controller=\"AnnomaticPanelCtrl\" class=\"pnd-annomatic-container pnd-ignore\">\n" +
    "\n" +
    "    <!-- Area on top displaying text -->\n" +
    "    <div class=\"pnd-annomatic-content-top\"\n" +
    "         ng-show=\"Annomatic.annotationNumber > 0\">\n" +
    "\n" +
    "        <!--\n" +
    "        <p ng-show=\"Annomatic.annotationNumber == 0\">\n" +
    "            Click on the <strong>blue button</strong> to scan items in the selected area\n" +
    "        </p>\n" +
    "        -->\n" +
    "\n" +
    "        <p >\n" +
    "            <span class=\"label\">Suggested annotations: </span>\n" +
    "            <span class=\"value\">{{Annomatic.annotationNumber}}</span>,\n" +
    "            <span class=\"label\">Saved annotations: </span>\n" +
    "            <span class=\"value\">{{Annomatic.ann.savedByNum.length}}</span>\n" +
    "            <!-- - Rejected: {{Annomatic.ann.byState['removed'].length}} -->\n" +
    "        </p>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-annomatic-content\">\n" +
    "\n" +
    "        <!-- Area with buttons -->\n" +
    "        <div class=\"pnd-annomatic-content-buttons\"\n" +
    "             ng-show=\"!gotAnnotations || Annomatic.annotationNumber == 0\">\n" +
    "            <!-- <button \n" +
    "                class=\"pnd-btn pnd-btn-calltoaction\"\n" +
    "                ng-click=\"getSuggestions()\"\n" +
    "                ng-disabled=\"targets.length == 0\">\n" +
    "                    <span class=\"pnd-icon pnd-icon-file\"></span> Scan whole page\n" +
    "            </button> -->\n" +
    "\n" +
    "            <!-- <button\n" +
    "                class=\"btn btn-link pnd-button-suggestion\"\n" +
    "                ng-click=\"getSuggestionsArea()\"\n" +
    "                ng-show=\"Annomatic.area != null\"\n" +
    "                ng-disabled=\"targets.length == 0\">\n" +
    "                    <span class=\"pnd-icon pnd-icon-file-text\"></span> Scan Area\n" +
    "            </button> -->\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- <button class=\"btn btn-success pnd-button-select-area\" ng-click=\"selectAreaMode()\">\n" +
    "            Select area <span class=\"pnd-icon pnd-icon-edit\"></span>\n" +
    "        </button> -->\n" +
    "\n" +
    "        <div class=\"pnd-annomatic-content-text\"\n" +
    "             ng-show=\"Annomatic.annotationNumber == 0\">\n" +
    "            <h1>Welcome to Ann-o-matic!</h1>\n" +
    "            <p>\n" +
    "                Hover with the mouse cursor on the text area you wish to scan for automatic annotations.\n" +
    "                <br />\n" +
    "                Click on the <strong>Discover</strong> button.\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"pnd-annomatic-content-buttons\"\n" +
    "             ng-show=\"Annomatic.annotationNumber > 0\">\n" +
    "\n" +
    "            <button\n" +
    "                class=\"pnd-btn pnd-btn-calltoaction\"\n" +
    "                ng-click=\"startReview()\"\n" +
    "                ng-hide=\"Annomatic.ann.savedByNum.length > 0\">\n" +
    "                Start review <!-- ({{Annomatic.currAnn}}/{{Annomatic.annotationNumber}}) -->\n" +
    "            </button>\n" +
    "\n" +
    "            <!-- TODO: fix filter -->\n" +
    "            <!-- <button\n" +
    "                class=\"btn btn-default pnd-button-filter-suggestion\"\n" +
    "                ng-model=\"filteredTypes\"\n" +
    "                placeholder=\"Filter by suggestion type\"\n" +
    "                data-html=\"1\"\n" +
    "                data-multiple=\"1\"\n" +
    "                data-animation=\"am-flip-x\"\n" +
    "                ng-options=\"type.value as type.label for type in Annomatic.ann.typesOptions\"\n" +
    "                bs-select\n" +
    "                ng-show=\"Annomatic.ann.typesOptions.length > 0\">\n" +
    "            </button> -->\n" +
    "\n" +
    "            <!-- <button class=\"btn btn-success pnd-button-save-review\" ng-click=\"saveReview()\">\n" +
    "                Save\n" +
    "            </button> -->\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-repeat=\"ann in filtered = (annotations)\" style=\"color: black\">\n" +
    "            <annotation-details \n" +
    "                id=\"{{ann}}\" \n" +
    "                style=\"position: absolute;\"\n" +
    "                ng-style=\"{'top': getTopById(ann)}\"></annotation-details>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- <div class=\"pnd-annomatic-info\" ng-show=\"gotAnnotations && Annomatic.annotationNumber > 0\">\n" +
    "            <div>\n" +
    "                Accepted: {{Annomatic.ann.byState['accepted'].join(', ')}}\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                Removed: {{Annomatic.ann.byState['removed'].join(', ')}}\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                filteredTypes: {{Annomatic.filteredTypes}}\n" +
    "            </div>\n" +
    "        </div> -->\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/Annomatic/AnnomaticPopover.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annomatic/AnnomaticPopover.tmpl.html",
    "<div class=\"pnd-popover pnd-annomatic-popover pnd-ignore popover\"\n" +
    "     ng-controller=\"AnnomaticPopoverCtrl\"\n" +
    "     ng-click=\"popoverClick($event)\">\n" +
    "\n" +
    "    <div class=\"arrow\"></div>\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h4 class=\"popover-title\">\n" +
    "        {{ann.byNum[num].label}}\n" +
    "        <span class=\"pull-right pnd-icon pnd-icon-close\" ng-click=\"hide($event)\"></span>\n" +
    "    </h4>\n" +
    "\n" +
    "    <!-- Content -->\n" +
    "    <div class=\"popover-content\">\n" +
    "\n" +
    "        <div ng-if=\"isMultiEntites\" class=\"pnd-annomatic-popover-multi-entities text-center\">\n" +
    "            <div class=\"pnd-preview pnd-annomatic-popover-details clearfix\">\n" +
    "                <item-preview uri=\"{{ann.byNum[num].entities[currentEntity].uri}}\" sticking=\"false\"></item-preview>\n" +
    "            </div>\n" +
    "            <button ng-if=\"multiLength > 0\" ng-click=\"changeEntity()\">Change selected entity</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"!isMultiEntites\">\n" +
    "            <div ng-show=\"showDetails\" class=\"pnd-preview pnd-annomatic-popover-details clearfix\">\n" +
    "                <item-preview uri=\"{{ann.byNum[num].uri}}\" sticking=\"false\"></item-preview>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"pnd-annomatic-confidence\">\n" +
    "                <span class=\"label\">\n" +
    "                    Confidence:\n" +
    "                </span>\n" +
    "                <span class=\"value\">\n" +
    "                    {{ann.byNum[num].confidence}}\n" +
    "                </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Footer -->\n" +
    "    <div class=\"pnd-annomatic-btn-group pnd-panel-tab-content-footer\">\n" +
    "        <button class=\"pnd-btn pnd-btn-small pnd-btn-transparent\"\n" +
    "                ng-click=\"hide($event)\">\n" +
    "            Cancel\n" +
    "        </button><!--\n" +
    "            -->\n" +
    "        <button class=\"pnd-btn pnd-btn-small\"\n" +
    "                ng-click=\"goNext($event)\">\n" +
    "            Next\n" +
    "        </button><!--\n" +
    "            -->\n" +
    "        <button class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction pnd-use\"\n" +
    "                ng-click=\"setOk($event)\"\n" +
    "                ng-disabled=\"ann.savedByNum.indexOf(num) != -1\">\n" +
    "            Create annotation\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/Annomatic/ScanBtn.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annomatic/ScanBtn.dir.tmpl.html",
    "<button \n" +
    "    class=\"pnd-btn pnd-btn-dark pnd-btn-large pnd-annomatic-scan-btn\"\n" +
    "    ng-click=\"scanCurrentArea()\"\n" +
    "    ng-style=\"scanBtnStyle\">\n" +
    "        Discover\n" +
    "</button>");
}]);

angular.module("src/Annomatic/SuggestionFragmentIcon.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annomatic/SuggestionFragmentIcon.dir.tmpl.html",
    "<span\n" +
    "    ng-mouseover=\"mouseoverHandler()\"\n" +
    "    ng-mouseout=\"mouseoutHandler()\"\n" +
    "    ng-click=\"clickHandler($event)\"\n" +
    "    class=\"{{textFragmentIconClass}} {{iconClass}}\">\n" +
    "</span>");
}]);

angular.module("src/AnnotationPopover/AnnotationPopover.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationPopover/AnnotationPopover.tmpl.html",
    "<div class=\"popover pnd-popover pnd-annotation-popover\"\n" +
    "     ng-class=\"{\n" +
    "     'pnd-annotation-popover-login': !isUserLogged,\n" +
    "     'pnd-annotation-popover-annotate': isSwitchMode,\n" +
    "     'pnd-annotation-popover-comment': isCommentMode,\n" +
    "     'pnd-annotation-popover-highlight': isHighlightMode,\n" +
    "     'pnd-annotation-popover-saving':savingAnnotation,\n" +
    "     'pnd-annotation-popover-error':!savingAnnotation && errorSaving,\n" +
    "     'pnd-tooltip': tooltip}\"\n" +
    "     ng-style=\"{'opacity': opacity}\"\n" +
    "        >\n" +
    "\n" +
    "    <div class=\"arrow\"></div>\n" +
    "\n" +
    "    <!-- Login: user must login -->\n" +
    "    <div class=\"popover-content\"\n" +
    "         ng-if=\"!isUserLogged\">\n" +
    "        <a href=\"javascript:void(0)\" ng-click=\"login()\">{{message}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- tooltip mode -->\n" +
    "    <div class=\"popover-content\"\n" +
    "         ng-if=\"tooltip\">\n" +
    "        <a href=\"javascript:void(0)\">{{message}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Annotation type selection -->\n" +
    "    <div class=\"popover-content\" ng-if=\"currentMode === '' && isUserLogged\">\n" +
    "        <a ng-click=\"setMode('comment')\">Comment</a><span class=\"pnd-annotation-popover-separator\">\n" +
    "        </span><a ng-click=\"setMode('highlight')\">Highlight</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Comment Highlight creation  -->\n" +
    "    <div class=\"popover-content-wrapper\"\n" +
    "         ng-show=\"!savingAnnotation && !errorSaving\"\n" +
    "         ng-if=\"currentMode !== '' && isUserLogged\">\n" +
    "\n" +
    "        <div class=\"popover-content\"\n" +
    "             ng-show=\"currentMode === 'comment'\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <textarea\n" +
    "                    id=\"comment-area\"\n" +
    "                    class=\"form-control pnd-popover-literal-textarea\"\n" +
    "                    rows=\"6\"\n" +
    "                    ng-model=\"$parent.literalText\"\n" +
    "                    ng-init=\"focusOn('comment-area')\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Notebook selector -->\n" +
    "        <div \n" +
    "            class=\"popover-notebooks\" ng-hide = tooltip>\n" +
    "            <span class=\"popover-notebooks-copy\">Save {{currentMode}} in</span>\n" +
    "            <pnd-select\n" +
    "                    options=\"availableNotebooks\"\n" +
    "                    selected-value=\"$parent.selectedNotebookId\"\n" +
    "                    deferred-action=\"doCreateNewNotebook\"\n" +
    "                    label-action=\"'Create new notebook'\"\n" +
    "                    placeholder-action=\"'Type new notebook name here'\"\n" +
    "                    expanded=\"false\"></pnd-select>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Footer with buttons -->\n" +
    "        <div class=\"popover-footer\" ng-hide = tooltip>\n" +
    "            <button\n" +
    "                    class=\"pnd-btn pnd-btn-small\"\n" +
    "                    ng-click=\"cancel()\">\n" +
    "                Cancel\n" +
    "            </button><button\n" +
    "                class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "                ng-class=\"{disabled: $parent.literalText == '' && currentMode == 'comment'}\"\n" +
    "                ng-click=\"save()\">\n" +
    "                Save\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"popover-content-wrapper\"\n" +
    "         ng-show=\"!savingAnnotation && errorSaving\">\n" +
    "        <span class=\"pnd-icon-exclamation\"></span>\n" +
    "        <br />\n" +
    "        There was an error saving your annotation, please try again later\n" +
    "        <br />\n" +
    "        <button\n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-click=\"cancel()\">\n" +
    "            Cancel\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"popover-content-wrapper pnd-pulse\"\n" +
    "         ng-show=\"savingAnnotation\">\n" +
    "        Saving your annotation\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.commenting.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.commenting.dir.tmpl.html",
    "<div class=\"pnd-annotation-details-wrap pnd-annotation-comment pnd-ignore\"\n" +
    "     ng-class=\"{'pnd-annotation-has-social': social}\">\n" +
    "\n" +
    "    <!-- Collapsed view of the annotation -->\n" +
    "    <div class=\"pnd-annotation-collapsed pnd-annotation-details-header pnd-annotation-details-top\"\n" +
    "         ng-click=\"toggleAnnotation()\"\n" +
    "         ng-if=\"!annotation.expanded\"\n" +
    "         ng-class=\"{'pnd-annotation-details-broken': annotation.broken, 'pnd-annotation-details-ghosted': annotation.ghosted}\">\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-subject\"\n" +
    "             ng-class=\"{'pnd-annotation-annotated-fragment': (annotation.mainItem.typeLabel == 'Text fragment'),\n" +
    "                        'pnd-annotation-annotated-resource': (annotation.mainItem.typeLabel == 'resource'),\n" +
    "                        'pnd-annotation-page': (annotation.mainItem.typeLabel == 'WebPage')}\">\n" +
    "            <span>{{ annotation.mainItem.label }}</span> <!-- TODO For images instead of \"label\" we should use the ALT attribute if present -->\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-caret\"></div>\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-object\">\n" +
    "            <span>{{ annotation.comment }}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<div class=\"pnd-annotation-collapsed-social-footer pnd-annotation-social-buttons\"-->\n" +
    "             <!--ng-include=\"'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html'\"-->\n" +
    "             <!--replace=\"true\">-->\n" +
    "        <!--</div>-->\n" +
    "        <div class=\"annotation-details-social-buttons pnd-annotation-collapsed-social-footer pnd-annotation-social-buttons\"\n" +
    "             id=\"{{::annotation.id}}\"\n" +
    "             data=\"annotation\"\n" +
    "             options=\"options\"\n" +
    "             ng-show=\"social\"\n" +
    "             ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Annotation functions buttons (Edit, Cancel, Share, Reply, Like...) -->\n" +
    "    <!--\n" +
    "    <div class=\"pnd-annotation-collapsed pnd-annotation-details-buttons\"\n" +
    "         ng-if=\"!annotation.expanded\">\n" +
    "        <div ng-include=\"'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html'\"\n" +
    "             replace=\"true\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    -->\n" +
    "    <!-- END // Collapsed view of the annotation -->\n" +
    "\n" +
    "    <!-- Expanded view of the annotation -->\n" +
    "    <div class=\"pnd-annotation-expanded pnd-annotation-details-container\"\n" +
    "         ng-click=\"toggleAnnotation()\"\n" +
    "         ng-if=\"annotation.expanded\">\n" +
    "\n" +
    "        <!-- Metadata -->\n" +
    "        <div class=\"pnd-annotation-details-meta\"\n" +
    "             ng-class=\"{ 'pnd-annotation-details-meta-edit':( isUserToolShowed() ) }\"\n" +
    "             ng-init=\"meta = false\">\n" +
    "\n" +
    "            <!-- Default user's thumb -->\n" +
    "            <div class=\"pnd-annotation-user-thumb-default\"\n" +
    "                 ng-show=\"annotation.defaultThumb\"></div>\n" +
    "\n" +
    "            <!-- User's thumb -->\n" +
    "            <img class=\"pnd-annotation-user-thumb\"\n" +
    "                 ng-src=\"{{annotation.thumbnail}}\" width=\"30\" height=\"30\"\n" +
    "                 ng-hide=\"annotation.defaultThumb\"\n" +
    "                 alt=\"{{::annotation.creatorName}}\"/>\n" +
    "\n" +
    "            <!-- Edit Menu -->\n" +
    "            <div class=\"pnd-icon-angle-down pnd-annotation-edit-toggle\"\n" +
    "                 ng-click=\"menuEdit($event);\"\n" +
    "                 ng-if=\"isUserToolShowed()\">\n" +
    "            </div>\n" +
    "\n" +
    "            <span class=\"pnd-annotation-user-name\">\n" +
    "                {{::annotation.creatorName}}\n" +
    "            </span>\n" +
    "            <span class=\"pnd-annotation-metadata\">\n" +
    "                <time-ago from-time='{{ annotation.created }}' format='HH:mm dd MMM yyyy'></time-ago> · in\n" +
    "                <span\n" +
    "                    ng-if=\"!isUserToolShowed() || !homePundit\">\n" +
    "                    {{annotation.notebookName}}\n" +
    "                </span>\n" +
    "                <a\n" +
    "                        href=\"#\"\n" +
    "                        ng-if=\"isUserToolShowed() && homePundit\"\n" +
    "                        ng-click=\"openNotebook($event, annotation.notebookId)\">\n" +
    "                    {{annotation.notebookName}}\n" +
    "                </a>\n" +
    "                <br>\n" +
    "                <span class=\"pnd-annotation-edited\" ng-if=\"annotation.edited\">\n" +
    "                    Edited\n" +
    "                    <span>\n" +
    "                        <time-ago class=\"pnd-annotation-reply-date\" from-time='{{ annotation.modified }}' format='HH:mm dd MMM yyyy'></time-ago>\n" +
    "                    </span>\n" +
    "                </span>\n" +
    "            </span>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Annotation data -->\n" +
    "        <div class=\"pnd-annotation-details-data\">\n" +
    "\n" +
    "            <!-- Annotated text fragment || Resource -->\n" +
    "            <div ng-if=\"annotation.mainItem.typeLabel != 'WebPage' &&\n" +
    "                        annotation.mainItem.typeLabel != 'resource'\"\n" +
    "                 ng-class=\"{'pnd-annotation-annotated-fragment': annotation.mainItem.typeLabel == 'Text fragment'}\">\n" +
    "                <span>{{annotation.mainItem.description}}</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Annotated web page -->\n" +
    "            <div class=\"pnd-annotation-details-subject pnd-annotation-entity-details\"\n" +
    "                 ng-if=\"annotation.mainItem.typeLabel == 'WebPage'\">\n" +
    "                <!-- Label -->\n" +
    "                <span class=\"pnd-annotation-entity-label\">\n" +
    "                    {{ annotation.mainItem.label }}\n" +
    "                </span>\n" +
    "                <!-- Type -->\n" +
    "                <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                    {{ annotation.mainItem.typeLabel }}\n" +
    "                </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Annotated resource (i.e. Europeana Sounds CHO) -->\n" +
    "            <div class=\"pnd-annotation-details-subject pnd-annotation-entity-details\"\n" +
    "                 ng-if=\"annotation.mainItem.typeLabel == 'resource'\">\n" +
    "                <!-- Label -->\n" +
    "                <span class=\"pnd-annotation-entity-label\">\n" +
    "                    {{ annotation.mainItem.description }}\n" +
    "                </span>\n" +
    "                <!-- Type -->\n" +
    "                <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                    {{ annotation.mainItem.typeLabel }}\n" +
    "                </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pnd-annotation-comment-caret\"></div>\n" +
    "\n" +
    "            <!-- Comment read mode-->\n" +
    "            <div\n" +
    "                    class=\"pnd-annotation-comment-text\"\n" +
    "                    ng-if=\"!editMode\">\n" +
    "                <span ng-bind-html=\"annotation.comment | linky:'_blank'\"></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Comment edit mode-->\n" +
    "            <div\n" +
    "                    class=\"pnd-annotation-comment-text-edit\"\n" +
    "                    ng-if=\"editMode\">\n" +
    "\n" +
    "                <textarea\n" +
    "                        class=\"form-control pnd-popover-literal-textarea\"\n" +
    "                        rows=\"6\"\n" +
    "                        ng-click=\"areaClick($event)\"\n" +
    "                        ng-model=\"annotation.comment\">\n" +
    "                </textarea>\n" +
    "            </div>\n" +
    "            <!-- Save or cancel of comment in Edit mode -->\n" +
    "            <div\n" +
    "                    class=\"pnd-annotation-comment-text-edit-buttons\"\n" +
    "                    ng-show=\"isUserToolShowed()\"\n" +
    "                    ng-if=\"editMode\">\n" +
    "                <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"pnd-btn pnd-btn-small\"\n" +
    "                        ng-click=\"cancelEdit($event)\">\n" +
    "                    Cancel\n" +
    "                </button>\n" +
    "                <button\n" +
    "                        type=\"button\"\n" +
    "                        class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "                        ng-click=\"saveEdit($event)\">\n" +
    "                    Save\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Annotation functions buttons (Edit, Cancel, Share, Reply, Like...) -->\n" +
    "\n" +
    "        <div class=\"annotation-details-social-buttons pnd-annotation-social-buttons\"\n" +
    "             id=\"{{::annotation.id}}\"\n" +
    "             data=\"annotation\"\n" +
    "             options=\"options\"\n" +
    "             ng-show=\"social\"\n" +
    "             ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Displayed while loading replies -->\n" +
    "        <div ng-show = \"checkLoaded()\"\n" +
    "            class=\"pnd-annotation-loading-replies\">\n" +
    "            <p class=\"pnd-pulse\">\n" +
    "                Loading Replies\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- List of replies to comment -->\n" +
    "        <annotation-details-reply\n" +
    "                class=\"pnd-annotation-details\"\n" +
    "                id=\"{{::annotation.id}}\"\n" +
    "                data=\"annotation\"\n" +
    "                options=\"optionsReplyes\"\n" +
    "                ng-repeat=\"annotation in replyTree track by annotation.id\"\n" +
    "                style=\"position:relative\"\n" +
    "                ng-if=\"reply\"\n" +
    "                ng-show=\"social\"\n" +
    "                ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </annotation-details-reply>\n" +
    "\n" +
    "        <!-- Displayed while saving replies -->\n" +
    "        <div ng-show = \"isSaving\"\n" +
    "             class=\"pnd-annotation-loading-replies\">\n" +
    "            <p class=\"pnd-pulse\">\n" +
    "                Saving Replies\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Metadata social comment box -->\n" +
    "        <div ng-include=\"'src/AnnotationSidebar/AnnotationDetails.replyTextArea.tmpl.html'\"\n" +
    "             replace=\"true\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- END // Expanded view of the annotation -->\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.dir.tmpl.html",
    "<!-- TODO: check performance -->\n" +
    "<div \n" +
    "    ng-include \n" +
    "    include-replace \n" +
    "    src=\"'src/AnnotationSidebar/AnnotationDetails.' + (motivation || 'linking') + '.dir.tmpl.html'\">\n" +
    "</div>");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.highlighting.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.highlighting.dir.tmpl.html",
    "<div class=\"pnd-annotation-details-wrap pnd-annotation-highlight pnd-ignore\"\n" +
    "     ng-class=\"{'pnd-annotation-has-social': social}\">\n" +
    "\n" +
    "    <!-- Collapsed view of the annotation -->\n" +
    "    <div class=\"pnd-annotation-collapsed pnd-annotation-details-header pnd-annotation-details-top\"\n" +
    "         ng-click=\"toggleAnnotation()\"\n" +
    "         ng-if=\"!annotation.expanded\"\n" +
    "         ng-class=\"{'pnd-annotation-details-broken': annotation.broken, 'pnd-annotation-details-ghosted': annotation.ghosted}\">\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-subject\"\n" +
    "             ng-class=\"{'pnd-annotation-annotated-fragment': (annotation.mainItem.typeLabel == 'Text fragment')}\">\n" +
    "            <span>{{annotation.mainItem.label}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<div class=\"pnd-annotation-collapsed-social-footer pnd-annotation-social-buttons\"-->\n" +
    "             <!--ng-include=\"'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html'\"-->\n" +
    "             <!--replace=\"true\">-->\n" +
    "        <!--</div>-->\n" +
    "        <div class=\"annotation-details-social-buttons pnd-annotation-collapsed-social-footer pnd-annotation-social-buttons\"\n" +
    "             id=\"{{::annotation.id}}\"\n" +
    "             data=\"annotation\"\n" +
    "             options=\"options\"\n" +
    "             ng-show=\"social\"\n" +
    "             ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- END // Collapsed view of the annotation -->\n" +
    "\n" +
    "    <!-- Expanded view of the annotation -->\n" +
    "    <div class=\"pnd-annotation-expanded pnd-annotation-details-container\"\n" +
    "         ng-click=\"toggleAnnotation()\"\n" +
    "         ng-if=\"annotation.expanded\">\n" +
    "\n" +
    "        <!-- Metadata -->\n" +
    "        <div class=\"pnd-annotation-details-meta\"\n" +
    "             ng-class=\"{ 'pnd-annotation-details-meta-edit':( isUserToolShowed() ) }\"\n" +
    "             ng-init=\"meta = false\">\n" +
    "\n" +
    "            <!-- Default user's thumb -->\n" +
    "            <div class=\"pnd-annotation-user-thumb-default\"\n" +
    "                 ng-show=\"annotation.defaultThumb\"></div>\n" +
    "\n" +
    "            <!-- User's thumb -->\n" +
    "            <img class=\"pnd-annotation-user-thumb\"\n" +
    "                 ng-src=\"{{annotation.thumbnail}}\" width=\"30\" height=\"30\"\n" +
    "                 ng-hide=\"annotation.defaultThumb\"\n" +
    "                 alt=\"{{::annotation.creatorName}}\"/>\n" +
    "\n" +
    "            <!-- Edit Menu -->\n" +
    "            <div class=\"pnd-icon-angle-down pnd-annotation-edit-toggle\"\n" +
    "                 ng-click=\"menuEdit($event);\"\n" +
    "                 style=\"float:right\"\n" +
    "                 ng-if=\"isUserToolShowed()\">\n" +
    "            </div>\n" +
    "\n" +
    "            <span class=\"pnd-annotation-user-name\">\n" +
    "                {{::annotation.creatorName}}\n" +
    "            </span>\n" +
    "            <span class=\"pnd-annotation-metadata\">\n" +
    "                <time-ago from-time='{{ annotation.created }}' format='dd MMM yyyy'></time-ago> · in\n" +
    "                <span \n" +
    "                    ng-if=\"!isUserToolShowed() || !homePundit\">\n" +
    "                    {{annotation.notebookName}}\n" +
    "                </span>\n" +
    "                <a \n" +
    "                    href=\"#\" \n" +
    "                    ng-if=\"isUserToolShowed() && homePundit\"\n" +
    "                    ng-click=\"openNotebook($event, annotation.notebookId)\">\n" +
    "                    {{annotation.notebookName}}\n" +
    "                </a>\n" +
    "                <br>\n" +
    "            </span>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Annotation data -->\n" +
    "        <div class=\"pnd-annotation-details-data\">\n" +
    "\n" +
    "            <!-- Annotated text fragment -->\n" +
    "            <div class=\"pnd-annotation-annotated-fragment\">\n" +
    "                <span>{{annotation.mainItem.description}}</span>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Annotation functions buttons (Edit, Cancel, Share, Reply, Like...) -->\n" +
    "        <!--<div class=\"pnd-annotation-details-buttons\">-->\n" +
    "            <!--<div ng-include=\"'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html'\"-->\n" +
    "                 <!--replace=\"true\"-->\n" +
    "                    <!-->\n" +
    "            <!--</div>-->\n" +
    "        <!--</div>-->\n" +
    "        <div class=\"annotation-details-social-buttons pnd-annotation-social-buttons\"\n" +
    "             id=\"{{::annotation.id}}\"\n" +
    "             data=\"annotation\"\n" +
    "             options=\"options\"\n" +
    "             ng-show=\"social\"\n" +
    "             ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Displayed while loading replies -->\n" +
    "        <div ng-show = \"checkLoaded()\"\n" +
    "             class=\"pnd-annotation-loading-replies\">\n" +
    "            <p class=\"pnd-pulse\">\n" +
    "                Loading Replies\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- List of replyes to comment -->\n" +
    "        <annotation-details-reply\n" +
    "                class=\"pnd-annotation-details \"\n" +
    "                id=\"{{::annotation.id}}\"\n" +
    "                data=\"annotation\"\n" +
    "                options=\"optionsReplyes\"\n" +
    "                ng-repeat=\"annotation in replyTree track by annotation.id\"\n" +
    "                style=\"position:relative\"\n" +
    "                ng-if=\"reply\"\n" +
    "                ng-show=\"social\"\n" +
    "                ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </annotation-details-reply>\n" +
    "\n" +
    "        <!-- Displayed while saving replies -->\n" +
    "        <div ng-show = \"isSaving\"\n" +
    "             class=\"pnd-annotation-loading-replies\">\n" +
    "            <p class=\"pnd-pulse\">\n" +
    "                Saving Replies\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Metadata social comment box -->\n" +
    "        <div ng-include=\"'src/AnnotationSidebar/AnnotationDetails.replyTextArea.tmpl.html'\"\n" +
    "             replace=\"true\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- END // Expanded view of the annotation -->\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.linking.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.linking.dir.tmpl.html",
    "<div class=\"pnd-annotation-details-wrap pnd-annotation-semantic pnd-ignore\"\n" +
    "     ng-class=\"{'pnd-annotation-has-social': social}\">\n" +
    "\n" +
    "    <!-- Collapsed view of the annotation -->\n" +
    "    <div class=\"pnd-annotation-collapsed pnd-annotation-details-header pnd-annotation-details-top\"\n" +
    "         ng-click=\"toggleAnnotation()\"\n" +
    "         ng-if=\"!annotation.expanded\"\n" +
    "         ng-class=\"{'pnd-annotation-details-broken': annotation.broken, 'pnd-annotation-details-ghosted': annotation.ghosted}\">\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-subject\"\n" +
    "             ng-class=\"{'pnd-annotation-annotated-fragment': (annotation.mainItem.typeLabel == 'Text fragment'),\n" +
    "                        'pnd-annotation-annotated-fragment-external': (annotation.mainItem.isExternal),\n" +
    "                        'pnd-annotation-annotated-resource': (annotation.mainItem.typeLabel == 'resource'),\n" +
    "                        'pnd-annotation-page': (annotation.mainItem.typeLabel == 'WebPage')}\">\n" +
    "            <span>{{ annotation.mainItem.label }}</span> <!-- TODO For images instead of \"label\" we should use the ALT attribute if present -->\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-caret\"></div>\n" +
    "\n" +
    "        <div class=\"pnd-annotation-collapsed-object\">\n" +
    "            <span>{{ annotation.itemsArray[0].objects[0].label }}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<div class=\"pnd-annotation-collapsed-social-footer pnd-annotation-social-buttons\"-->\n" +
    "             <!--ng-include=\"'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html'\"-->\n" +
    "             <!--replace=\"true\">-->\n" +
    "        <!--</div>-->\n" +
    "        <div class=\"annotation-details-social-buttons pnd-annotation-collapsed-social-footer pnd-annotation-social-buttons\"\n" +
    "             id=\"{{::annotation.id}}\"\n" +
    "             data=\"annotation\"\n" +
    "             options=\"options\"\n" +
    "             ng-show=\"social\"\n" +
    "             ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Annotation functions buttons (Edit, Cancel, Share, Reply, Like...) -->\n" +
    "    <!--\n" +
    "    <div class=\"pnd-annotation-collapsed pnd-annotation-details-buttons\"\n" +
    "         ng-if=\"!annotation.expanded\">\n" +
    "        <div ng-include=\"'src/AnnotationSidebar/AnnotationDetails.footerButtons.tmpl.html'\"\n" +
    "             replace=\"true\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    -->\n" +
    "    <!-- END // Collapsed view of the annotation -->\n" +
    "\n" +
    "    <!-- Expanded view of the annotation -->\n" +
    "    <div class=\"pnd-annotation-expanded pnd-annotation-details-container\"\n" +
    "         ng-click=\"toggleAnnotation()\"\n" +
    "         ng-if=\"annotation.expanded\">\n" +
    "\n" +
    "        <!-- Metadata -->\n" +
    "        <div class=\"pnd-annotation-details-meta\"\n" +
    "             ng-class=\"{ 'pnd-annotation-details-meta-edit':( isUserToolShowed() ) }\"\n" +
    "             ng-init=\"meta = false\">\n" +
    "\n" +
    "            <!-- Default user's thumb -->\n" +
    "            <div class=\"pnd-annotation-user-thumb-default\"\n" +
    "                 ng-show=\"annotation.defaultThumb\"></div>\n" +
    "\n" +
    "            <!-- User's thumb -->\n" +
    "            <img class=\"pnd-annotation-user-thumb\"\n" +
    "                 ng-src=\"{{annotation.thumbnail}}\" width=\"30\" height=\"30\"\n" +
    "                 ng-hide=\"annotation.defaultThumb\"\n" +
    "                 alt=\"{{::annotation.creatorName}}\"/>\n" +
    "\n" +
    "            <!-- Edit Menu -->\n" +
    "            <div class=\"pnd-icon-angle-down pnd-annotation-edit-toggle\"\n" +
    "                 ng-click=\"menuEdit($event);\"\n" +
    "                 ng-if=\"isUserToolShowed()\">\n" +
    "            </div>\n" +
    "\n" +
    "            <span class=\"pnd-annotation-user-name\">\n" +
    "                {{ ::annotation.creatorName }}\n" +
    "            </span>\n" +
    "            <span class=\"pnd-annotation-metadata\">\n" +
    "                <time-ago from-time='{{ annotation.created }}' format='d MMM y'></time-ago> · in\n" +
    "                <span class=\"pnd-annotation-notebook-name\">\n" +
    "                    <span \n" +
    "                        ng-if=\"!isUserToolShowed() || !homePundit\">\n" +
    "                        {{annotation.notebookName}}\n" +
    "                    </span>\n" +
    "                    <a \n" +
    "                        href=\"#\" \n" +
    "                        ng-if=\"isUserToolShowed() && homePundit\"\n" +
    "                        ng-click=\"openNotebook($event, annotation.notebookId)\">\n" +
    "                        {{annotation.notebookName}}\n" +
    "                    </a>\n" +
    "                    <br>\n" +
    "                    <span class=\"pnd-annotation-edited\" ng-if=\"annotation.edited\">\n" +
    "                        Edited\n" +
    "                        <span>\n" +
    "                            <time-ago class=\"pnd-annotation-reply-date\" from-time='{{ annotation.modified }}' format='HH:mm dd MMM yyyy'></time-ago>\n" +
    "                        </span>\n" +
    "                    </span>\n" +
    "                </span>\n" +
    "            </span>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Annotation data -->\n" +
    "        <div class=\"pnd-annotation-details-data\">\n" +
    "\n" +
    "            <!-- Single Triple -->\n" +
    "            <!-- TODO Fare una modifica qui e togliere la logica di accorpamento degli object se viene utlizzato stesso subject-predicate -->\n" +
    "            <div class=\"pnd-annotation-details-triple\" ng-repeat=\"item in annotation.itemsArray\">\n" +
    "\n" +
    "                <!-- Subject -->\n" +
    "                <!-- Text fragment || resource -->\n" +
    "                <div ng-if=\"item.subject.typeLabel != 'WebPage' &&\n" +
    "                            item.subject.typeLabel != 'resource' &&\n" +
    "                            item.subject.typeLabel != 'Image' &&\n" +
    "                            item.subject.typeLabel != 'Image fragment'\"\n" +
    "                     ng-class=\"{'pnd-annotation-annotated-fragment': annotation.mainItem.typeLabel == 'Text fragment',\n" +
    "                     'pnd-annotation-annotated-fragment-external': item.subject.isExternal}\">\n" +
    "                    <span>\n" +
    "                        {{ item.subject.description }}\n" +
    "                    </span>\n" +
    "\n" +
    "                    <div class=\"pnd-annotation-original-page\"\n" +
    "                         ng-if=\"item.subject.isExternal\">\n" +
    "                        <a href=\"{{item.subject.pageContext}}\" target=\"_blank\">Open in original page</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Web page -->\n" +
    "                <div class=\"pnd-annotation-details-subject pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.subject.typeLabel == 'WebPage'\">\n" +
    "\n" +
    "                    <!-- Label -->\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        {{ item.subject.label }}\n" +
    "                    </span>\n" +
    "                    <!-- Type -->\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.subject.typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Resource (i.e. Europeana Sounds CHO) -->\n" +
    "                <div class=\"pnd-annotation-details-subject pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.subject.typeLabel == 'resource'\">\n" +
    "\n" +
    "                    <!-- Label -->\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        {{ item.subject.label }}\n" +
    "                    </span>\n" +
    "                    <!-- Type -->\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.subject.typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Image -->\n" +
    "                <div class=\"pnd-annotation-details-subject pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.subject.typeLabel == 'Image'\">\n" +
    "                    <!-- Thumb -->\n" +
    "                    <span class=\"pnd-annotation-entity-image\"\n" +
    "                          ng-if=\"item.subject.image!='null'\">\n" +
    "                        <img ng-src=\"{{ item.subject.image }}\" alt=\"{{ item.subject.label }}\"/> <!-- TODO Instead of \"label\" we shoudl use the ALT attribute if present -->\n" +
    "                    </span>\n" +
    "                    <!-- Label -->\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.subject.description }}\" target=\"_blank\">\n" +
    "                            {{ item.subject.label }} <!-- TODO Instead of \"label\" we shoudl use the ALT attribute if present -->\n" +
    "                            <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <!-- Type -->\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.subject.typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Image fragment -->\n" +
    "                <div class=\"pnd-annotation-details-subject pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.subject.typeLabel == 'Image fragment'\">\n" +
    "                    <!-- Thumb -->\n" +
    "                    <span class=\"pnd-annotation-entity-image\"\n" +
    "                          ng-if=\"item.subject.image!='null'\">\n" +
    "                        <img ng-src=\"{{ item.subject.image }}\" alt=\"{{ item.subject.label }}\"/>\n" +
    "                    </span>\n" +
    "                    <!-- Label -->\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.subject.uri }}\" target=\"_blank\">\n" +
    "                            {{ item.subcjet.label }} <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <!-- Type -->\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.subcjet.typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Predicate -->\n" +
    "                <!-- TODO There's a problem with the positioning of the tooltip on \"top\" -->\n" +
    "                <div class=\"pnd-annotation-details-predicate\"\n" +
    "                     data-trigger=\"hover\"\n" +
    "                     data-type=\"success\"\n" +
    "                     data-placement=\"left\"\n" +
    "                     data-title=\"{{ item.predicate.description }}\"\n" +
    "                     bs-tooltip>\n" +
    "                    {{ item.predicate.label }}\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Object -->\n" +
    "                <!-- Text fragment || resource -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-annotated-fragment pnd-annotation-entity-details\"\n" +
    "                     ng-class=\"{'pnd-annotation-annotated-fragment-external': item.objects[0].isExternal}\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel == 'Text fragment'\">\n" +
    "                    <span>\n" +
    "                        <!-- {{ item.objects[0].description | limitTo:200 }} -->\n" +
    "                        {{ item.objects[0].description }}\n" +
    "                    </span>\n" +
    "\n" +
    "                    <div class=\"pnd-annotation-original-page\"\n" +
    "                         ng-if=\"item.objects[0].isExternal\">\n" +
    "                        <a href=\"{{item.objects[0].pageContext}}\" target=\"_blank\">Open in original page</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Literal -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-annotated-literal pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel == 'literal'\">\n" +
    "                    <span>\n" +
    "                        <!-- {{ item.objects[0].description | limitTo:200 }} -->\n" +
    "                        <span ng-bind-html=\"item.objects[0].description | linky:'_blank'\"></span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- WebPage -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel == 'WebPage'\">\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.objects[0].uri }}\" target=\"_blank\">\n" +
    "                            {{ item.objects[0].label }} <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.objects[0].typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Resource (i.e. Europeana Sounds CHO) -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel == 'resource'\">\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.objects[0].uri }}\" target=\"_blank\">\n" +
    "                            {{ item.objects[0].label }} <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.objects[0].typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Image -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel == 'Image'\">\n" +
    "                    <span class=\"pnd-annotation-entity-image\"\n" +
    "                          ng-if=\"item.objects[0].image!='null'\">\n" +
    "                        <img ng-src=\"{{ item.objects[0].image }}\" alt=\"{{ item.objects[0].label }}\"/>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.objects[0].description }}\" target=\"_blank\">\n" +
    "                            {{ item.objects[0].label }} <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.objects[0].typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Image fragment -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel == 'Image fragment'\">\n" +
    "                    <span class=\"pnd-annotation-entity-image\"\n" +
    "                          ng-if=\"item.objects[0].image!='null'\">\n" +
    "                        <img ng-src=\"{{ item.objects[0].image }}\" alt=\"{{ item.objects[0].label }}\"/>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.objects[0].description }}\" target=\"_blank\">\n" +
    "                            {{ item.objects[0].label }} <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.objects[0].typeLabel }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Anything else -->\n" +
    "                <div class=\"pnd-annotation-details-object pnd-annotation-entity-details\"\n" +
    "                     ng-if=\"item.objects[0].typeLabel != 'Text fragment' &&\n" +
    "                             item.objects[0].typeLabel != 'literal' &&\n" +
    "                             item.objects[0].typeLabel != 'WebPage' &&\n" +
    "                             item.objects[0].typeLabel != 'Image' &&\n" +
    "                             item.objects[0].typeLabel != 'Image fragment' &&\n" +
    "                             item.objects[0].typeLabel != 'Resource'\">\n" +
    "                    <span class=\"pnd-annotation-entity-image\"\n" +
    "                          ng-if=\"item.objects[0].image!='null'\">\n" +
    "                        <img ng-src=\"{{ item.objects[0].image }}\" alt=\"{{ item.objects[0].label }}\"/>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-label\">\n" +
    "                        <a href=\"{{ item.objects[0].uri }}\" target=\"_blank\">\n" +
    "                            {{ item.objects[0].label }} <span class=\"pnd-icon-arrow-right\"></span>\n" +
    "                        </a>\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-type pnd-type\">\n" +
    "                        {{ item.objects[0].typeLabel }}\n" +
    "                    </span>\n" +
    "                    <span class=\"pnd-annotation-entity-description\">\n" +
    "                        {{ item.objects[0].description | limitTo:200 }}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <!-- END // Single Triple -->\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Annotation functions buttons (Edit, Cancel, Share, Reply, Like...) -->\n" +
    "        <div class=\"annotation-details-social-buttons  pnd-annotation-social-buttons\"\n" +
    "             id=\"{{::annotation.id}}\"\n" +
    "             data=\"annotation\"\n" +
    "             options=\"options\"\n" +
    "             ng-show=\"social\"\n" +
    "             ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Displayed while loading replies -->\n" +
    "        <div ng-show = \"checkLoaded()\"\n" +
    "             class=\"pnd-annotation-loading-replies\">\n" +
    "            <p class=\"pnd-pulse\">\n" +
    "                Loading Replies\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- List of replies to comment -->\n" +
    "        <annotation-details-reply\n" +
    "                class=\"pnd-annotation-details \"\n" +
    "                id=\"{{::annotation.id}}\"\n" +
    "                data=\"annotation\"\n" +
    "                options=\"optionsReplyes\"\n" +
    "                ng-repeat=\"annotation in replyTree track by annotation.id\"\n" +
    "                style=\"position:relative\"\n" +
    "                ng-if=\"reply\"\n" +
    "                ng-show=\"social\"\n" +
    "                ng-class=\"{'pnd-no-social': !social}\">\n" +
    "        </annotation-details-reply>\n" +
    "\n" +
    "        <!-- Displayed while saving replies -->\n" +
    "        <div ng-show = \"isSaving\"\n" +
    "             class=\"pnd-annotation-loading-replies\">\n" +
    "            <p class=\"pnd-pulse\">\n" +
    "                Saving Replies\n" +
    "            </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Metadata social comment box -->\n" +
    "        <div ng-include=\"'src/AnnotationSidebar/AnnotationDetails.replyTextArea.tmpl.html'\"\n" +
    "             replace=\"true\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- END // Expanded view of the annotation -->\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.reply.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.reply.dir.tmpl.html",
    "<!-- Reply read mode -->\n" +
    "<div class=\"pnd-annotation-reply\"\n" +
    "     ng-show=\"data.showReply\"\n" +
    "     ng-if=\"!editMode\">\n" +
    "\n" +
    "    <!-- Default user's thumb -->\n" +
    "    <div class=\"pnd-annotation-user-thumb-default\"\n" +
    "            ng-show=\"data.defaultThumb\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- User's thumb -->\n" +
    "    <img class=\"pnd-annotation-user-thumb\"\n" +
    "         ng-hide=\"data.defaultThumb\"\n" +
    "         ng-src=\"{{::data.thumbnail}}\" width=\"20\" height=\"20\"\n" +
    "         alt=\"{{::data.creatorName}}\"/>\n" +
    "\n" +
    "    <!-- Edit Menu -->\n" +
    "    <div class=\"pnd-icon-angle-down pnd-annotation-edit-toggle\"\n" +
    "         ng-click=\"menuEdit($event);\"\n" +
    "         style=\"float:right\"\n" +
    "         ng-if=\"isUserToolShowed()\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Reply content -->\n" +
    "    <div class=\"pnd-annotation-reply-content\">\n" +
    "\n" +
    "        <!-- Username + reply text -->\n" +
    "        <div class=\"pnd-annotation-reply-text\">\n" +
    "            <span class=\"pnd-annotation-user\">{{::data.creatorName}}</span> <span ng-bind-html=\"data.content | linky:'_blank'\"></span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Creation data and social buttons -->\n" +
    "        <div class=\"pnd-annotation-reply-footer\">\n" +
    "            <time-ago class=\"pnd-annotation-reply-date\" from-time='{{ data.created }}' format='HH:mm dd MMM yyyy'></time-ago>\n" +
    "             <div class=\"annotation-details-social-buttons pnd-annotation-social-buttons\"\n" +
    "                 id=\"{{::annotation.id}}\"\n" +
    "                 data=\"data\"\n" +
    "                 options=\"options\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Details about edit date... only if edited -->\n" +
    "        <div \n" +
    "            class=\"pnd-annotation-reply-edited\"\n" +
    "            ng-if=\"data.edited\">\n" +
    "            Edited \n" +
    "            <span>\n" +
    "                <time-ago class=\"pnd-annotation-reply-date\" from-time='{{ data.modified }}' format='HH:mm dd MMM yyyy'></time-ago>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "<!-- END // Reply read mode -->\n" +
    "\n" +
    "<!-- Reply edit mode -->\n" +
    "<div class=\"pnd-annotation-reply-text-edit\"\n" +
    "     ng-if=\"editMode\">\n" +
    "\n" +
    "    <textarea\n" +
    "            class=\"form-control pnd-popover-literal-textarea\"\n" +
    "            rows=\"6\"\n" +
    "            ng-click=\"areaClick($event)\"\n" +
    "            ng-model=\"data.content\">\n" +
    "    </textarea>\n" +
    "\n" +
    "</div>\n" +
    "<!-- Save or cancel of reply in Edit mode -->\n" +
    "<div\n" +
    "        class=\"pnd-annotation-reply-buttons\"\n" +
    "        ng-show=\"isUserToolShowed()\"\n" +
    "        ng-if=\"editMode\">\n" +
    "    <button\n" +
    "            type=\"button\"\n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-click=\"cancelEdit($event)\">\n" +
    "        Cancel\n" +
    "    </button>\n" +
    "    <button\n" +
    "            type=\"button\"\n" +
    "            class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "            ng-click=\"saveEdit($event)\">\n" +
    "        Save\n" +
    "    </button>\n" +
    "</div>\n" +
    "<!-- END // Reply edit mode -->\n" +
    "");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.replyTextArea.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.replyTextArea.tmpl.html",
    "<!-- Comment reply mode-->\n" +
    "\n" +
    "<!--\n" +
    "TODO What is this empty DIV doing?\n" +
    "<div class=\"pnd-annotation-comment-text\"\n" +
    "    ng-show=\"replyDialog\">\n" +
    "</div>\n" +
    "-->\n" +
    "\n" +
    "<div class=\"pnd-annotation-reply-textarea\"\n" +
    "    ng-show=\"annotation.replyDialog\">\n" +
    "\n" +
    "    <textarea\n" +
    "        class=\"form-control\"\n" +
    "        rows=\"6\"\n" +
    "        ng-click=\"areaClick($event)\"\n" +
    "        ng-model=\"annotation.replyCommentValue\"\n" +
    "        placeholder=\"Reply to the annotation...\">\n" +
    "    </textarea>\n" +
    "</div>\n" +
    "<!-- Save or cancel of comment in reply mode -->\n" +
    "\n" +
    "<div\n" +
    "    class=\"pnd-annotation-reply-buttons\"\n" +
    "    ng-show=\"annotation.replyDialog\">\n" +
    "\n" +
    "    <button\n" +
    "        type=\"button\"\n" +
    "        class=\"pnd-btn pnd-btn-small\"\n" +
    "        ng-click=\"cancelReply($event)\">\n" +
    "        Cancel\n" +
    "    </button>\n" +
    "    <button\n" +
    "        type=\"button\"\n" +
    "        class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "        ng-click=\"socialEvent($event, 'comment')\"\n" +
    "        ng-disabled=\"isEmpty($event)\">\n" +
    "        Reply\n" +
    "        <!--ng-click=\"socialEvent($event, 'comment')\">-->\n" +
    "\n" +
    "    </button>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/AnnotationSidebar/AnnotationDetails.socialButtons.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationDetails.socialButtons.tmpl.html",
    "<!-- TODO: add global wrapper? -->\n" +
    "\n" +
    "<button type=\"button\"\n" +
    "        class=\"pnd-reply\"\n" +
    "        ng-if=\"options.reply\"\n" +
    "        ng-click=\"replyAnnotation($event)\"\n" +
    "        ng-class=\"{'pnd-annotation-details-social-activate': data.social.status.comment, 'pnd-annotation-details-social-zero': data.social.counting.comment==0 }\"\n" +
    "        bs-tooltip\n" +
    "        placement=\"left\"\n" +
    "        data-title=\"Reply\">\n" +
    "    <span class=\"pnd-icon-comment\"></span>\n" +
    "    {{data.social.counting.comment }}\n" +
    "</button>\n" +
    "\n" +
    "<!-- TODO: avoid use of mouseenter/mouseleave -->\n" +
    "\n" +
    "<button\n" +
    "        type=\"button\"\n" +
    "        class=\"pnd-like\"\n" +
    "        ng-show=\"options.like\"\n" +
    "        ng-click=\"socialEvent($event, 'like')\"\n" +
    "        ng-class=\"{'pnd-annotation-details-social-activate': data.social.status.like, 'pnd-annotation-details-social-zero': data.social.counting.like==0 }\"\n" +
    "        bs-tooltip\n" +
    "        placement=\"left\"\n" +
    "        data-title=\"{{data.social.status.like ? 'Undo like' : 'Like'}}\">\n" +
    "    <span class=\"pnd-icon-thumb-o-up\"></span>\n" +
    "    {{data.social.counting.like}}\n" +
    "</button>\n" +
    "\n" +
    "<button\n" +
    "        type=\"button\"\n" +
    "        class=\"pnd-dislike\"\n" +
    "        ng-show=\"options.dislike\"\n" +
    "        ng-click=\"socialEvent($event, 'dislike')\"\n" +
    "        ng-class=\"{'pnd-annotation-details-social-activate': data.social.status.dislike, 'pnd-annotation-details-social-zero': data.social.counting.dislike==0 }\"\n" +
    "        bs-tooltip\n" +
    "        placement=\"left\"\n" +
    "        data-title=\"{{data.social.status.dislike ? 'Undo dislike' : 'Dislike'}}\">\n" +
    "    <span class=\"pnd-icon-thumb-o-down\"></span>\n" +
    "    {{data.social.counting.dislike}}\n" +
    "</button>\n" +
    "\n" +
    "<button\n" +
    "        type=\"button\"\n" +
    "        class=\"pnd-endorse\"\n" +
    "        ng-show=\"options.endorse\"\n" +
    "        ng-click=\"socialEvent($event, 'endorse')\"\n" +
    "        ng-class=\"{'pnd-annotation-details-social-activate': data.social.status.endorse, 'pnd-annotation-details-social-zero': data.social.counting.endorse==0 }\"\n" +
    "        bs-tooltip\n" +
    "        placement=\"left\"\n" +
    "        data-title=\"{{data.social.status.endorse ? 'Undo endorse' : 'Endorse'}}\">\n" +
    "    <span class=\"pnd-icon-check\"></span>\n" +
    "    {{data.social.counting.endorse}}\n" +
    "</button>\n" +
    "\n" +
    "<button\n" +
    "        type=\"button\"\n" +
    "        class=\"pnd-report\"\n" +
    "        ng-if=\"options.report\"\n" +
    "        ng-click=\"socialEvent($event, 'report')\"\n" +
    "        ng-class=\"{'pnd-annotation-details-social-activate': data.social.status.report, 'pnd-annotation-details-social-zero': data.social.counting.report==0 }\"\n" +
    "        bs-tooltip\n" +
    "        placement=\"left\"\n" +
    "        data-title=\"{{data.social.status.report ? 'Undo report' : 'Report'}}\">\n" +
    "    <span class=\"pnd-icon-exclamation\"></span>\n" +
    "    {{data.social.counting.report}}\n" +
    "</button>");
}]);

angular.module("src/AnnotationSidebar/AnnotationSidebar.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/AnnotationSidebar.dir.tmpl.html",
    "<div class=\"pnd-annotation-sidebar-container pnd-ignore\">\n" +
    "    <!-- <div class=\"pnd-annotation-sidebar-content\" ng-show=\"isAnnotationSidebarExpanded\"> -->\n" +
    "    <div class=\"pnd-annotation-sidebar-content\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"pnd-annotation-sidebar-content-exp\" ng-show=\"isAnnotationSidebarExpanded\">\n" +
    "\n" +
    "            <div class=\"pnd-annotation-sidebar-header\">\n" +
    "\n" +
    "                <!-- Buttons Anno-o-matic and annotations -->\n" +
    "                <div ng-if=\"isAnnomaticActive\"\n" +
    "                     class=\"pnd-annotation-sidebar-modes-buttons\">\n" +
    "\n" +
    "                    <ul class=\"pnd-tab-header\" ng-class=\"{'pnd-hidden-tabs': hiddenTabsToShow()}\" style=\"overflow-y: visible; height: auto;\">\n" +
    "                        <li ng-class=\"{'active': isAnnotationsPanelActive()}\"\n" +
    "                            ng-click=\"activateAnnotationsPanel()\"\n" +
    "                            ng-disabled=\"isLoading || isAnnotationsPanelActive()\">\n" +
    "                            <a>Annotations ({{annotationsLength}}/{{allAnnotationsLength}})</a>\n" +
    "                        </li>\n" +
    "                        <li ng-class=\"{'active': isSuggestionsPanelActive()}\"\n" +
    "                            ng-click=\"activateSuggestionsPanel()\"\n" +
    "                            ng-disabled=\"isLoadingData || isLoading || isSuggestionsPanelActive()\">\n" +
    "                            <a>Ann-o-matic</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "\n" +
    "                    <!--\n" +
    "                    OLD STUFF\n" +
    "                    <button type=\"button\"\n" +
    "                            class=\"pnd-btn pnd-btn-sidebar pnd-btn-fill-width\"\n" +
    "                            ng-class=\"{'pnd-active': isSuggestionsPanelActive()}\"\n" +
    "                            ng-click=\"activateSuggestionsPanel()\"\n" +
    "                            ng-disabled=\"isLoadingData || isLoading || isSuggestionsPanelActive()\">\n" +
    "                        Ann-o-matic\n" +
    "                    </button><button type=\"button\"\n" +
    "                            ng-click=\"activateAnnotationsPanel()\"\n" +
    "                            ng-class=\"{\n" +
    "                                'pnd-active': isAnnotationsPanelActive()\n" +
    "                            }\"\n" +
    "                            class=\"pnd-btn pnd-btn-sidebar pnd-btn-fill-width\"\n" +
    "                            ng-disabled=\"isLoading || isAnnotationsPanelActive()\">\n" +
    "                        Annotations ({{annotationsLength}}/{{allAnnotationsLength}})\n" +
    "                    </button>\n" +
    "                    -->\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button to show filters -->\n" +
    "                <div \n" +
    "                    class=\"pnd-annotation-sidebar-filter-content\" \n" +
    "                    ng-show=\"isAnnotationsPanelActive()\"\n" +
    "                    ng-if=\"proMode\">\n" +
    "                    <div ng-class=\"{'pnd-btn-sidebar-full': !annotationSidebar.needToFilter()}\">\n" +
    "\n" +
    "                        <button\n" +
    "                            ng-click=\"annotationSidebar.toggleFiltersContent()\"\n" +
    "                            ng-show=\"!isFiltersShowed\"\n" +
    "                            class=\"pnd-annotation-sidebar-btn-show-filter\">\n" +
    "                                Filter annotations ({{annotationsLength}}/{{allAnnotationsLength}})\n" +
    "                                <span class=\"pnd-icon-caret-down\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!-- Button to close filters -->\n" +
    "                    <div ng-show=\"isFiltersShowed\">\n" +
    "                        <button\n" +
    "                                ng-click=\"annotationSidebar.toggleFiltersContent()\"\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-annotation-sidebar-btn-close-filters\">\n" +
    "                                Filter annotations ({{annotationsLength}}/{{allAnnotationsLength}})\n" +
    "                            <span class=\"pnd-icon-caret-up\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"pnd-annotation-sidebar-filters-list\" ng-show=\"isFiltersShowed\">\n" +
    "                    <!-- buttons -->\n" +
    "                    <!-- // end buttons -->\n" +
    "\n" +
    "                        <!-- Free text -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter-input-contains\">\n" +
    "                            <span\n" +
    "                                class=\"pnd-icon\"\n" +
    "                                ng-class=\"setSearchIcon(annotationSidebar.filters.freeText.expression)\"\n" +
    "                                ng-click=\"freeText = ''; updateSearch(freeText)\"></span>\n" +
    "                            <input class=\"form-control\" type=\"text\" ng-model=\"freeText\" ng-change=\"updateSearch(freeText)\" ng-model-options=\"{debounce: 1000}\" placeholder=\"Contains\">\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Authors -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter\">\n" +
    "                            <div class=\"pnd-panel\" ng-click=\"toggleFilterList($event, 'authors')\">\n" +
    "                                <div class=\"pnd-annotation-sidebar-filter-label\">Annotation author</div>\n" +
    "                                <span class=\"pnd-icon\" ng-class=\"{true:'pnd-icon-caret-up', false:'pnd-icon-caret-down'}[filterTypeExpanded === 'authors']\"></span>\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-input pnd-annotation-sidebar-filter-search\">\n" +
    "                                <span\n" +
    "                                    class=\"pnd-icon\"\n" +
    "                                    ng-class=\"setFilterIcon(searchAuthors.label)\"\n" +
    "                                    ng-click=\"searchAuthors.label = ''\"></span>\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"searchAuthors.label\" placeholder=\"Filter\">\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-sidebar-filter-scroll\">\n" +
    "                                <div\n" +
    "                                    ng-repeat=\"elem in filters.authors | orderObjectBy:'partial':'dsc' | filter:searchAuthors\"\n" +
    "                                    ng-class=\"{'pnd-annotation-sidebar-current-filter-active': elem.active && elem.partial !== 0, 'pnd-annotation-sidebar-current-filter-empt-red': elem.active && elem.partial === 0}\"\n" +
    "                                    class=\"pnd-annotation-sidebar-filter-element\">\n" +
    "                                        <div\n" +
    "                                            class=\"pnd-annotation-sidebar-filter-element-label\"\n" +
    "                                            ng-click=\"toggleFilter('authors', elem.uri)\">\n" +
    "                                                <span class=\"pnd-icon pnd-icon-check\"\n" +
    "                                                    ng-show=\"elem.active\"></span>\n" +
    "                                                {{elem.label}} ({{elem.partial}})\n" +
    "                                        </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Notebooks -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter\">\n" +
    "                            <div class=\"pnd-panel\" ng-click=\"toggleFilterList($event, 'notebooks')\">\n" +
    "                                <div class=\"pnd-annotation-sidebar-filter-label\">Notebook</div>\n" +
    "                                <span class=\"pnd-icon\" ng-class=\"{true:'pnd-icon-caret-up', false:'pnd-icon-caret-down'}[filterTypeExpanded === 'notebooks']\"></span>\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-input pnd-annotation-sidebar-filter-search\">\n" +
    "                                <span\n" +
    "                                    class=\"pnd-icon\"\n" +
    "                                    ng-class=\"setFilterIcon(searchNotebooks.label)\"\n" +
    "                                    ng-click=\"searchNotebooks.label = ''\"></span>\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"searchNotebooks.label\" placeholder=\"Filter\">\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-sidebar-filter-scroll\">\n" +
    "                                <div\n" +
    "                                    ng-repeat=\"elem in filters.notebooks | orderObjectBy:'partial':'dsc' | filter:searchNotebooks\"\n" +
    "                                    ng-class=\"{'pnd-annotation-sidebar-current-filter-active': elem.active && elem.partial !== 0, 'pnd-annotation-sidebar-current-filter-empt-red': elem.active && elem.partial === 0}\"\n" +
    "                                    class=\"pnd-annotation-sidebar-filter-element\">\n" +
    "                                        <div\n" +
    "                                            class=\"pnd-annotation-sidebar-filter-element-label\"\n" +
    "                                            ng-click=\"toggleFilter('notebooks', elem.uri)\">\n" +
    "                                                <span class=\"pnd-icon pnd-icon-check\"\n" +
    "                                                    ng-show=\"elem.active\"></span>\n" +
    "                                                {{elem.label}} ({{elem.partial}})\n" +
    "                                        </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Types -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter\">\n" +
    "                            <div class=\"pnd-panel\" ng-click=\"toggleFilterList($event, 'types')\">\n" +
    "                                <div class=\"pnd-annotation-sidebar-filter-label\">Entity type</div>\n" +
    "                                <span class=\"pnd-icon\" ng-class=\"{true:'pnd-icon-caret-up', false:'pnd-icon-caret-down'}[filterTypeExpanded === 'types']\"></span>\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-input pnd-annotation-sidebar-filter-search\">\n" +
    "                                <span\n" +
    "                                    class=\"pnd-icon\"\n" +
    "                                    ng-class=\"setFilterIcon(searchTypes.label)\"\n" +
    "                                    ng-click=\"searchTypes.label = ''\"></span>\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"searchTypes.label\" placeholder=\"Filter\">\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-sidebar-filter-scroll\">\n" +
    "                                <div ng-repeat=\"elem in filters.types | orderObjectBy:'partial':'dsc' | filter:searchTypes\"\n" +
    "                                    ng-class=\"{'pnd-annotation-sidebar-current-filter-active': elem.active && elem.partial !== 0, 'pnd-annotation-sidebar-current-filter-empt-red': elem.active && elem.partial === 0}\"\n" +
    "                                    class=\"pnd-annotation-sidebar-filter-element\">\n" +
    "                                        <div\n" +
    "                                            class=\"pnd-annotation-sidebar-filter-element-label\"\n" +
    "                                            ng-click=\"toggleFilter('types', elem.uri)\">\n" +
    "                                                <span class=\"pnd-icon pnd-icon-check\"\n" +
    "                                                      ng-show=\"elem.active\"></span>\n" +
    "                                            {{elem.label}} ({{elem.partial}})\n" +
    "                                        </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Used predicate -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter\">\n" +
    "                            <div class=\"pnd-panel\"\n" +
    "                                ng-click=\"toggleFilterList($event, 'predicates')\">\n" +
    "                                <div class=\"pnd-annotation-sidebar-filter-label\">Used predicate</div>\n" +
    "                                <span class=\"pnd-icon\" ng-class=\"{true:'pnd-icon-caret-up', false:'pnd-icon-caret-down'}[filterTypeExpanded === 'predicates']\"></span>\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-input pnd-annotation-sidebar-filter-search\">\n" +
    "                                <span\n" +
    "                                    class=\"pnd-icon\"\n" +
    "                                    ng-class=\"setFilterIcon(searchPredicates.label)\"\n" +
    "                                    ng-click=\"searchPredicates.label = ''\"></span>\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"searchPredicates.label\" placeholder=\"Filter\">\n" +
    "                            </div>\n" +
    "                            <div\n" +
    "                                ng-repeat=\"elem in filters.predicates | orderObjectBy:'partial':'dsc' | filter:searchPredicates\"\n" +
    "                                ng-class=\"{'pnd-annotation-sidebar-current-filter-active': elem.active && elem.partial !== 0, 'pnd-annotation-sidebar-current-filter-empt-red': elem.active && elem.partial === 0}\"\n" +
    "                                class=\"pnd-annotation-sidebar-filter-element\">\n" +
    "                                    <div\n" +
    "                                        class=\"pnd-annotation-sidebar-filter-element-label\"\n" +
    "                                        ng-click=\"toggleFilter('predicates', elem.uri)\">\n" +
    "                                            <span class=\"pnd-icon pnd-icon-check\"\n" +
    "                                                  ng-show=\"elem.active\"></span>\n" +
    "                                        {{elem.label}} ({{elem.partial}})\n" +
    "                                    </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Page items -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter\" ng-if=\"annotationSidebar.isEntitesActive\">\n" +
    "                            <div class=\"pnd-panel\" ng-click=\"toggleFilterList($event, 'entities')\">\n" +
    "                                <div class=\"pnd-annotation-sidebar-filter-label\">Page items</div>\n" +
    "                                <span class=\"pnd-icon\" ng-class=\"{true:'pnd-icon-caret-up', false:'pnd-icon-caret-down'}[filterTypeExpanded === 'entities']\"></span>\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-input pnd-annotation-sidebar-filter-search\">\n" +
    "                                <span\n" +
    "                                    class=\"pnd-icon\"\n" +
    "                                    ng-class=\"setFilterIcon(searchEntities.label)\"\n" +
    "                                    ng-click=\"searchEntities.label = ''\"></span>\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"searchEntities.label\" placeholder=\"Filter\">\n" +
    "                            </div>\n" +
    "                            <div class=\"pnd-sidebar-filter-scroll\">\n" +
    "                                <div\n" +
    "                                    ng-repeat=\"elem in filters.entities | orderObjectBy:'partial':'dsc' | filter:searchEntities\"\n" +
    "                                    ng-class=\"{'pnd-annotation-sidebar-current-filter-active': elem.active && elem.partial !== 0, 'pnd-annotation-sidebar-current-filter-empt-red': elem.active && elem.partial === 0}\"\n" +
    "                                    class=\"pnd-annotation-sidebar-filter-element\">\n" +
    "                                        <div\n" +
    "                                            class=\"pnd-annotation-sidebar-filter-element-label\"\n" +
    "                                            ng-click=\"toggleFilter('entities', elem.uri)\">\n" +
    "                                                <span class=\"pnd-icon pnd-icon-check\"\n" +
    "                                                      ng-show=\"elem.active\"></span>\n" +
    "                                            {{elem.label}} ({{elem.partial}})\n" +
    "                                        </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Date -->\n" +
    "                        <div class=\"pnd-annotation-sidebar-filter\">\n" +
    "                            <div class=\"pnd-panel\" ng-click=\"toggleFilterList($event, 'date')\">\n" +
    "                                <div class=\"pnd-annotation-sidebar-filter-label\">Date</div>\n" +
    "                                <span class=\"pnd-icon\" ng-class=\"{true:'pnd-icon-caret-up', false:'pnd-icon-caret-down'}[filterTypeExpanded === 'date']\"></span>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-date\">\n" +
    "                                <span\n" +
    "                                        ng-show=\"isFilterLabelShowed(annotationSidebar.filters.fromDate.expression)\">\n" +
    "                                        <strong>From</strong> {{annotationSidebar.filters.fromDate.expression}}\n" +
    "                                </span>\n" +
    "                                <span\n" +
    "                                        ng-show=\"isFilterLabelShowed(annotationSidebar.filters.fromDate.expression) && isFilterLabelShowed(annotationSidebar.filters.toDate.expression)\">\n" +
    "                                     -\n" +
    "                                </span>\n" +
    "                                <span\n" +
    "                                        ng-show=\"isFilterLabelShowed(annotationSidebar.filters.toDate.expression)\">\n" +
    "                                        <strong>To</strong> {{annotationSidebar.filters.toDate.expression}}\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"pnd-annotation-sidebar-filter-input\">\n" +
    "                                <!-- From Date -->\n" +
    "                                <input\n" +
    "                                    type=\"text\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"annotationSidebar.filters.fromDate.expression\"\n" +
    "                                    ng-change=\"updateDate(annotationSidebar.filters.fromDate.expression, 'from')\"\n" +
    "                                    data-min-date=\"{{fromMinDate}}\"\n" +
    "                                    data-max-date=\"{{fromMaxDate}}\"\n" +
    "                                    placeholder=\"From\"\n" +
    "                                    data-autoclose=\"1\"\n" +
    "                                    data-date-type=\"string\"\n" +
    "                                    data-date-format=\"yyyy-MM-dd\"\n" +
    "                                    bs-datepicker\n" +
    "                                >\n" +
    "\n" +
    "                                <!-- To Date -->\n" +
    "                                <input\n" +
    "                                    type=\"text\"\n" +
    "                                    class=\"form-control\"\n" +
    "                                    ng-model=\"annotationSidebar.filters.toDate.expression\"\n" +
    "                                    ng-change=\"updateDate(annotationSidebar.filters.toDate.expression, 'to')\"\n" +
    "                                    data-min-date=\"{{toMinDate}}\"\n" +
    "                                    data-max-date=\"{{toMaxDate}}\"\n" +
    "                                    placeholder=\"To\"\n" +
    "                                    data-autoclose=\"1\"\n" +
    "                                    data-date-type=\"string\"\n" +
    "                                    data-date-format=\"yyyy-MM-dd\"\n" +
    "                                    bs-datepicker\n" +
    "                                >\n" +
    "                                </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Broken -->\n" +
    "                        <div\n" +
    "                            class=\"pnd-annotation-sidebar-filter-broken\"\n" +
    "                            ng-class=\"{'pnd-annotation-sidebar-current-filter-active': annotationSidebar.filters.broken.expression.length > 0}\"\n" +
    "                            ng-click=\"toggleBrokenAnnotations()\">\n" +
    "                            <span\n" +
    "                                ng-show=\"annotationSidebar.filters.broken.expression.length > 0\">\n" +
    "                                    Show broken annotations\n" +
    "                            </span>\n" +
    "                            <span\n" +
    "                                ng-show=\"annotationSidebar.filters.broken.expression.length == 0\">\n" +
    "                                    Hide broken annotations\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- buttons -->\n" +
    "                        <div class=\"pnd-annotation-footer-sidebar-filter\">\n" +
    "\n" +
    "                            <button\n" +
    "                                    ng-click=\"annotationSidebar.resetFilters()\"\n" +
    "                                    type=\"button\"\n" +
    "                                    class=\"pnd-btn pnd-btn-xsmall pnd-annotation-sidebar-btn-remove-filters\"\n" +
    "                                    ng-disabled=\"!annotationSidebar.needToFilter()\">\n" +
    "                                Reset filters\n" +
    "                            </button>\n" +
    "\n" +
    "                            <!--\n" +
    "                            <button\n" +
    "                                ng-click=\"annotationSidebar.toggleFiltersContent()\"\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn pnd-btn-dark pnd-btn-fill-width pnd-annotation-sidebar-btn-close-filters\">\n" +
    "                                Hide annotations filters ({{annotations.length}}/{{allAnnotations.length}})\n" +
    "                                <span class=\"pnd-icon-caret-up\"></span>\n" +
    "                            </button><button\n" +
    "                                ng-click=\"annotationSidebar.resetFilters()\"\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn pnd-btn-dark pnd-btn-fill-width pnd-annotation-sidebar-btn-remove-filters\"\n" +
    "                                ng-disabled=\"!annotationSidebar.needToFilter()\">\n" +
    "                                Reset filters\n" +
    "                            </button>-->\n" +
    "                        </div>\n" +
    "                        <!-- // end buttons -->\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pnd-annotation-details-opacity\" ng-show=\"isFiltersShowed\" ng-click=\"annotationSidebar.toggleFiltersContent()\">\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "        \n" +
    "        <!-- Suggestions panel -->\n" +
    "        <div ng-if=\"isSuggestionsPanelActive()\">\n" +
    "            <div class=\"pnd-annotation-sidebar-annomatic\" ng-show=\"isAnnotationSidebarExpanded\">\n" +
    "                <annomatic-panel></annomatic-panel>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Loading -->\n" +
    "        <div \n" +
    "            class=\"pnd-saving-content\" \n" +
    "            ng-show=\"isLoading || consolidationInProgress && isAnnotationSidebarExpanded\">\n" +
    "            <div>\n" +
    "\n" +
    "                <span class=\"pnd-message pnd-pulse\">\n" +
    "                    Hold on a second...\n" +
    "                </span>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- List of annotations -->\n" +
    "        <div \n" +
    "            ng-show=\"isAnnotationsPanelActive()\"\n" +
    "            class=\"pnd-annotation-sidebar-annotations\">         \n" +
    "            <annotation-details\n" +
    "                class=\"pnd-annotation-details\"\n" +
    "                id=\"{{::ann.id}}\"\n" +
    "                motivation=\"{{ann.motivatedBy}}\"\n" +
    "                broken=\"ann.broken\"\n" +
    "                ng-style=\"{'top': ann.realTop}\"\n" +
    "                ng-repeat=\"ann in annotations track by ann.id\">\n" +
    "            </annotation-details>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/AnnotationSidebar/ClientAnnotationSidebar.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/AnnotationSidebar/ClientAnnotationSidebar.tmpl.html",
    "<annotation-sidebar></annotation-sidebar>");
}]);

angular.module("src/Annotators/ImgMenu.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annotators/ImgMenu.dir.tmpl.html",
    "<div\n" +
    "    ng-click=\"clickHandler($event)\" \n" +
    "    ng-mouseover=\"onMouseOver($event)\" \n" +
    "    ng-mouseleave=\"onMouseLeave($event)\"\n" +
    "    >\n" +
    "        <span\n" +
    "            ng-show=\"visible\"\n" +
    "            class=\"pnd-image-icon {{icon}}\">\n" +
    "        </span>\n" +
    "</div>");
}]);

angular.module("src/Annotators/ResourceMenu.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annotators/ResourceMenu.dir.tmpl.html",
    "<div\n" +
    "        ng-click=\"clickHandler($event)\"\n" +
    "        ng-class=\"{'pnd-resource-selected': isSelected(), 'pnd-resource-has-label': annotationButton }\">\n" +
    "\n" +
    "       <span class=\"label\" ng-show=\"annotationButton\">{{resourceLabel}}</span>\n" +
    "       <span class=\"pnd-icon-pundit-logo\"></span>\n" +
    "\n" +
    "       <span class=\"badge\">{{number}}</span>\n" +
    "</div>");
}]);

angular.module("src/Annotators/TextFragmentIcon.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Annotators/TextFragmentIcon.dir.tmpl.html",
    "<span\n" +
    "    ng-mouseover=\"mouseoverHandler()\"\n" +
    "    ng-mouseout=\"mouseoutHandler()\"\n" +
    "    ng-click=\"clickHandler($event)\"\n" +
    "    class=\"{{textFragmentIconClass}} {{iconClass}}\"></span>");
}]);

angular.module("src/Breadcrumbs/Breadcrumbs.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Breadcrumbs/Breadcrumbs.dir.tmpl.html",
    "<div class=\"pnd-breadcrumbs-container\"\n" +
    "     ng-show=\"isVisible()\">\n" +
    "    <div class=\"placeholder\" ng-if=\"isPlaceholderVisible()\">\n" +
    "        {{emptyPlaceholder}}\n" +
    "    </div>\n" +
    "    <ol class=\"breadcrumb\" ng-if=\"!isPlaceholderVisible()\">\n" +
    "        <li ng-repeat=\"item in getItems()\">\n" +
    "            <i ng-if=\"$index == 0\">\n" +
    "                {{getFirstItemPrefix()}}\n" +
    "            </i>\n" +
    "            <span ng-if=\"$last\">\n" +
    "                {{item.label}}\n" +
    "            </span>\n" +
    "            <span ng-if=\"!$last\">\n" +
    "                <a href=\"#\"\n" +
    "                   ng-click=\"itemSelect($index, $event)\">\n" +
    "                    {{item.label}}\n" +
    "                </a>\n" +
    "            </span>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</div>");
}]);

angular.module("src/ContextualMenu/dropdown.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ContextualMenu/dropdown.tmpl.html",
    "<ul \n" +
    "    class=\"pnd-dropdown-contextual-menu dropdown-menu pnd-ignore\" \n" +
    "    role=\"menu\">\n" +
    "    <li \n" +
    "        role=\"presentation\" \n" +
    "        ng-class=\"{\n" +
    "            'current-notebook': item.currentNotebook, divider: item.divider, \n" +
    "            'disabled': item.disable, \n" +
    "            'dropdown-submenu': item.submenu, \n" +
    "            'active': item.isActive, \n" +
    "            'dropdown-header': item.header\n" +
    "        }\" \n" +
    "        ng-repeat=\"item in content\">\n" +
    "        <span \n" +
    "            ng-if=\"item.header\" \n" +
    "            ng-bind=\"item.text\"></span>\n" +
    "        <a \n" +
    "            role=\"menuitem\" \n" +
    "            tabindex=\"-1\" \n" +
    "            ng-href=\"{{item.href}}\" \n" +
    "            ng-if=\"!item.divider && !item.header && item.href\" \n" +
    "            ng-bind=\"item.text\"></a>\n" +
    "        <a \n" +
    "            role=\"menuitem\" \n" +
    "            tabindex=\"-1\" \n" +
    "            href=\"javascript:void(0)\" \n" +
    "            ng-if=\"!item.divider && !item.header && item.click\" \n" +
    "            ng-click=\"$eval(item.click);$hide()\" \n" +
    "            ng-bind=\"item.text\"></a>\n" +
    "        <a \n" +
    "            role=\"menuitem\" \n" +
    "            tabindex=\"-1\" \n" +
    "            href=\"javascript:void(0)\" \n" +
    "            ng-if=\"item.submenu\" \n" +
    "            ng-mouseover=\"$eval(item.hover);\" \n" +
    "            ng-mouseleave=\"$eval(item.leave);\" \n" +
    "            ng-bind=\"item.text\"></a>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/Core/Templates/confirm.modal.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Core/Templates/confirm.modal.tmpl.html",
    "<div class=\"pnd-modal modal pnd-confirm-modal-container pnd-ignore\" tabindex=\"-1\" role=\"dialog\">\n" +
    "\n" +
    "    <div class=\"pnd-modal-dialog modal-dialog\">\n" +
    "\n" +
    "        <!-- Modal content-->\n" +
    "        <div class=\"pnd-modal-content modal-content\">\n" +
    "\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h4 class=\"modal-title\"> {{titleMessage}} </h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body pnd-confirm-modal-body\">\n" +
    "                {{notifyMessage}}\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Modal-footer -->\n" +
    "            <div class=\"pnd-modal-footer pnd-confirm-modal-footer\">\n" +
    "                <button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-confirm-modal-cancel\" ng-click=\"cancel()\">\n" +
    "                    Cancel\n" +
    "                </button><button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction pnd-confirm-modal-confirm\" ng-click=\"confirm()\">\n" +
    "                    Confirm\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <!-- END // modal-footer -->\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- END // Modal content-->\n" +
    "\n" +
    "    </div> <!-- end modal dialog-->\n" +
    "\n" +
    "</div> <!-- end modal -->");
}]);

angular.module("src/Core/Templates/info.modal.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Core/Templates/info.modal.tmpl.html",
    "<div class=\"pnd-modal modal pnd-info-modal-container pnd-ignore\" tabindex=\"-1\" role=\"dialog\">\n" +
    "\n" +
    "    <div class=\"pnd-modal-dialog modal-dialog\">\n" +
    "\n" +
    "        <!-- Modal content-->\n" +
    "        <div class=\"pnd-modal-content modal-content\">\n" +
    "\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h4 class=\"modal-title\"> {{titleMessage}} </h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body pnd-info-modal-body\">\n" +
    "                <table class=\"table table-condensed pnd-table pnd-table-about\">\n" +
    "                    <tr ng-repeat=\"field in info\">\n" +
    "                        <td class=\"modal-field-label\">{{field.label}}</td>\n" +
    "                        <td class=\"modal-field-value\">{{field.value}}</td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-repeat=\"link in links\">\n" +
    "                        <td class=\"modal-field-label\">{{link.label}}</td>\n" +
    "                        <td class=\"modal-field-value\"><a target=\"_blank\" href=\"{{link.ref}}\">{{link.linkLabel}}</a></td>\n" +
    "                    </tr>\n" +
    "                </table>                \n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Modal-footer -->\n" +
    "            <div class=\"pnd-modal-footer pnd-info-modal-footer\">\n" +
    "                <button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-info-modal-close\" ng-click=\"close()\">Cancel</button>\n" +
    "                <!-- <button type=\"button\" class=\"btn btn-default pnd-info-modal-tell\" ng-click=\"send()\">Found a bug? tell us!</button> -->\n" +
    "            </div>\n" +
    "            <!-- END // modal-footer -->\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- END // Modal content-->\n" +
    "\n" +
    "    </div> <!-- end modal dialog-->\n" +
    "\n" +
    "</div> <!-- end modal -->");
}]);

angular.module("src/Core/Templates/login.popover.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Core/Templates/login.popover.tmpl.html",
    "<div class=\"popover pnd-popover pnd-login-popover-container pnd-ignore\" tabindex=\"-1\">\n" +
    "\n" +
    "    <div class=\"arrow arrow-top\"></div>\n" +
    "\n" +
    "    <!-- iFrame -->\n" +
    "    <div class=\"iframe-container\">\n" +
    "    </div>\n" +
    "    <!-- END // iFrame -->\n" +
    "\n" +
    "    <!-- Displayed while loading -->\n" +
    "    <div class=\"popover-login-pane popover-loading\"\n" +
    "         ng-show=\"isLoading\">\n" +
    "        <div class=\"popover-login-pane-content\">\n" +
    "            <h1>Hold on</h1>\n" +
    "            <small ng-show=\"!postLoginPreCheck\">Pundit is loading the log in form</small>\n" +
    "            <small ng-show=\"postLoginPreCheck\">Pundit is completing log in procedure</small>\n" +
    "            <span class=\"pnd-icon pnd-icon-refresh pnd-icon-spin\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- END // Displayed while loading -->\n" +
    "\n" +
    "    <!-- Error message -->\n" +
    "    <div class=\"popover-login-pane popover-login-error\"\n" +
    "         ng-show=\"loginSomeError\">\n" +
    "        <div class=\"popover-login-pane-content\">\n" +
    "            <span class=\"pnd-icon pnd-icon-exclamation\"></span>\n" +
    "            <h1>Ops, something went wrong</h1>\n" +
    "            <p>Unfortunately there was an error while trying to process your request... please try again later</p>\n" +
    "            <small>Click <a href=\"#\" ng-click=\"loginRetry()\">here</a> to try again</small>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- END // Error message -->\n" +
    "\n" +
    "    <!-- Success message -->\n" +
    "    <div class=\"popover-login-pane popover-login-success\"\n" +
    "         ng-show=\"loginSuccess\">\n" +
    "        <div class=\"popover-login-pane-content\">\n" +
    "            <span class=\"pnd-icon pnd-icon-hand-peace-o\"></span>\n" +
    "\n" +
    "            <h1>Welcome to Pundit!</h1>\n" +
    "\n" +
    "            <p>Now you can start browsing and creating annotations</p>\n" +
    "            <!-- (autoclose in {{autoCloseIn}}) -->\n" +
    "            <small><a href=\"#\" ng-click=\"closePopover()\">Close this window</a></small>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- END // Success message -->\n" +
    "\n" +
    "    <!--\n" +
    "    <div class=\"popover-footer pnd-login-popover-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default pnd-login-popover-close\" ng-click=\"closePopover()\">Close</button>\n" +
    "    </div>\n" +
    "    -->\n" +
    "\n" +
    "    <!-- end modal-footer -->\n" +
    "</div> <!-- end popover -->\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("src/Core/Templates/pndSelect.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Core/Templates/pndSelect.dir.tmpl.html",
    "<div class=\"pnd-select\">\n" +
    "\n" +
    "    <div ng-show=\"!actionInProgress\">\n" +
    "\n" +
    "        <!-- Label of selected element -->\n" +
    "        <div class=\"pnd-select-label-selected\"\n" +
    "             title=\"{{optionSelected.title}}\"\n" +
    "             data-value=\"{{optionSelected.value}}\"\n" +
    "             ng-click=\"toggleExpand()\">\n" +
    "            {{optionSelected.label}}\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Toggle for opening the select -->\n" +
    "        <div class=\"pnd-select-open-options\"\n" +
    "             ng-click=\"toggleExpand()\">\n" +
    "            <span class=\"pnd-icon pnd-icon-caret-down\"></span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- List with elements to select from -->\n" +
    "        <div class=\"pnd-select-option-container\"\n" +
    "             ng-class=\"{'expanded':expanded, 'move-top': moveTop}\">\n" +
    "            <div class=\"option\"\n" +
    "                 title=\"{{option.title}}\"\n" +
    "                 data-value=\"{{option.value}}\"\n" +
    "                 ng-repeat=\"option in optionList\"\n" +
    "                 ng-click=\"selectOption(option)\"\n" +
    "                 ng-class=\"{'selected': isOptionSelected(option), 'custom-action': option.isAction}\">\n" +
    "                {{option.label}}\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"divider\"></div>\n" +
    "\n" +
    "            <div class=\"option custom-action\"\n" +
    "                 ng-if=\"optionAction\"\n" +
    "                 data-value=\"{{optionAction.value}}\"\n" +
    "                 ng-click=\"showAction()\">\n" +
    "                {{optionAction.label}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- New element creation -->\n" +
    "    <div ng-show=\"actionInProgress\">\n" +
    "\n" +
    "        <div class=\"pnd-select-item-creation\"\n" +
    "             ng-show=\"!savingInProgress\">\n" +
    "            <input type=\"text\"\n" +
    "                   class=\"creation-input form-control\"\n" +
    "                   ng-model=\"inputAction\"\n" +
    "                   placeholder=\"{{placeholderAction}}\"/>\n" +
    "            <div class=\"pnd-select-item-creation-button\">\n" +
    "                <button class=\"pnd-btn pnd-btn-small\" ng-click=\"abortAction()\">\n" +
    "                    Cancel\n" +
    "                </button><button class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "                                 ng-class=\"{disabled: inputAction == ''}\"\n" +
    "                                 ng-click=\"runAction(inputAction)\">\n" +
    "                    Save new notebook\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Displayed while saving -->\n" +
    "        <div ng-show=\"savingInProgress\"\n" +
    "             class=\"pnd-select-item-saving pnd-pulse\">\n" +
    "            ..hold on...saving your notebook\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/Core/Templates/send.modal.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Core/Templates/send.modal.tmpl.html",
    "<div class=\"pnd-modal modal pnd-send-modal-container pnd-ignore\" tabindex=\"-1\" role=\"dialog\">\n" +
    "\n" +
    "    <div class=\"pnd-modal-dialog modal-dialog\">\n" +
    "\n" +
    "        <!-- Modal content-->\n" +
    "        <div class=\"pnd-modal-content modal-content\">\n" +
    "\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h4 class=\"modal-title\"> {{titleMessage}} </h4>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body pnd-send-modal-body\">\n" +
    "                <p>\n" +
    "                    Send us your comments, suggestions or report a bug you encountered.\n" +
    "                    <br />\n" +
    "                    Thank you for your support.\n" +
    "                </p>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"exampleInputEmail1\">Subject<span class=\"pnd-mandatory-field\">*</span></label>\n" +
    "                    <input placeholder=\"Enter the subject here\" ng-model=\"text.subject\" class=\"form-control\" id=\"exampleInputEmail1\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label for=\"exampleInputPassword1\">Description</label>\n" +
    "                    <textarea ng-model=\"text.msg\" class=\"form-control\" rows=\"5\" id=\"exampleInputPassword1\" placeholder=\"Enter the full description here\">\n" +
    "                    </textarea>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Modal-footer -->\n" +
    "            <div class=\"pnd-modal-footer pnd-send-modal-footer\">\n" +
    "                <button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-send-modal-close\" ng-click=\"cancel()\">\n" +
    "                    Cancel\n" +
    "                </button><button type=\"button\" class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction disabled pnd-send-modal-send\"\n" +
    "                        ng-click=\"send()\">\n" +
    "                    Send\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <!-- END // modal-footer -->\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- END // Modal content-->\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- end modal dialog-->\n" +
    "\n" +
    "</div> <!-- end modal -->");
}]);

angular.module("src/Dashboard/ClientDashboard.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Dashboard/ClientDashboard.tmpl.html",
    "<dashboard></dashboard>");
}]);

angular.module("src/Dashboard/Dashboard.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Dashboard/Dashboard.dir.tmpl.html",
    "<div class=\"pnd-ignore\">\n" +
    "    <div class=\"pnd-dashboard-container\" ng-show=\"isDashboardVisible\">\n" +
    "        <!--footer-->\n" +
    "        <div class=\"pnd-dashboard-footer\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/Dashboard/DashboardPanel.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Dashboard/DashboardPanel.dir.tmpl.html",
    "<div \n" +
    "    class=\"pnd-dashboard-panel\" \n" +
    "    ng-class=\"{'pnd-dashboard-panel-not-last': !isLast}\"\n" +
    "    ng-style=\"{'width': width, 'left': left, 'bottom': bottom}\">\n" +
    "\n" +
    "    <div class=\"pnd-dashboard-panel-expanded\" ng-hide=\"isCollapsed\">\n" +
    "        <!--<div class=\"pnd-dashboard-panel-nav\"></div>-->\n" +
    "        <div class=\"pnd-dashboard-panel-content\" pnd-tabs=\"tabs\">\n" +
    "            <!-- the content comes from outside-->\n" +
    "        </div>\n" +
    "        <div class=\"pnd-dashboard-footer-handler\" ng-mousedown=\"footerMouseDownHandler($event)\"></div>\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-dashboard-panel-toggle\"\n" +
    "            ng-click=\"toggleCollapse()\" \n" +
    "            ng-disabled=\"!canCollapsePanel\">\n" +
    "            <span class=\"pnd-icon pnd-icon-close\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div \n" +
    "        class=\"pnd-dashboard-panel-collapsed\" \n" +
    "        ng-show=\"isCollapsed\" \n" +
    "        ng-style=\"{'width': collapsedWidth}\">\n" +
    "        <div class=\"pnd-dashboard-panel-collapsed-content\"></div>\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            class=\"pnd-dashboard-panel-toggle\"\n" +
    "            ng-click=\"toggleCollapse()\">\n" +
    "            <span class=\"pnd-icon pnd-icon-expand\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-dashboard-panel-separator\"\n" +
    "         ng-mousedown=\"mouseDownHandler($event)\"\n" +
    "         ng-show=\"!isLast\">\n" +
    "     </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/Dashboard/pndTabs.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Dashboard/pndTabs.dir.tmpl.html",
    "<ul \n" +
    "    class=\"pnd-tab-header\" \n" +
    "    ng-class=\"{'pnd-hidden-tabs': hiddenTabsToShow()}\">\n" +
    "    <li \n" +
    "        ng-repeat=\"pane in ::panes\" \n" +
    "        ng-class=\"{active: $index == active}\" \n" +
    "        ng-show=\"pane.isVisible\">\n" +
    "        <a \n" +
    "            data-toggle=\"tab\" \n" +
    "            data-index=\"{{$index}}\" \n" +
    "            ng-click=\"setActive($index, $event)\" \n" +
    "            ng-bind-html=\"::pane.title\"></a>\n" +
    "    </li>\n" +
    "    <li \n" +
    "        class=\"pull-right show-tabs\" \n" +
    "        placement=\"bottom-right\" \n" +
    "        ng-class=\"{active: hiddenTabIsActive}\" \n" +
    "        template-rl=\"{{hiddenTabsDropdownTemplate}}\"\n" +
    "        bs-dropdown=\"hiddenTabs\" \n" +
    "        ng-show=\"hiddenTabsToShow()\">\n" +
    "        <a>\n" +
    "            <span class=\"pnd-icon pnd-icon-dots\"></span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<div class=\"pnd-tab-content\">\n" +
    "    <div \n" +
    "        class=\"pnd-tab-pane\" \n" +
    "        ng-repeat=\"pane in ::panes\" \n" +
    "        ng-class=\"[$index == active ? 'active' : '']\" \n" +
    "        ng-include=\"::pane.template\" \n" +
    "        ng-show=\"$index == active\"></div>\n" +
    "</div>");
}]);

angular.module("src/FragmentPopover/FragmentPopover.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/FragmentPopover/FragmentPopover.tmpl.html",
    "<div class=\"popover pnd-popover pnd-fragment-popover\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "\n" +
    "    <div class=\"popover-content-wrapper\">\n" +
    "        <span class=\"pnd-fragment-popover-label\">\n" +
    "            Choose an annotation to open\n" +
    "        </span>\n" +
    "        <ul class=\"pnd-fragment-popover-list\">\n" +
    "            <li ng-repeat=\"annotation in annotations\"\n" +
    "                ng-click=\"showAnnotation(annotation)\"\n" +
    "                ng-mouseover=\"mouseenter(annotation)\" \n" +
    "                ng-mouseleave=\"mouseleave()\">\n" +
    "                <span>\n" +
    "                    {{annotation.description}}\n" +
    "                </span>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div ng-if=\"hasLink\"\n" +
    "             class=\"pnd-fragment-popover-link\">\n" +
    "            <span ng-class=\"{'external-link': link.target=='_blank', 'normal-link': link.target!='_blank'}\">\n" +
    "                Open link\n" +
    "            </span>\n" +
    "            <a href=\"{{link.url}}\"\n" +
    "               target=\"{{link.target}}\">\n" +
    "                {{link.title}}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/Item/Item.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Item/Item.dir.tmpl.html",
    "<div \n" +
    "    class=\"pnd-item\" \n" +
    "    ng-class=\"{'pnd-select-item': isSelected, 'pnd-sticky-item': isSticky() && forceSticky}\"\n" +
    "    ng-click=\"setStickInForceMode()\"\n" +
    "    ng-mouseover=\"onItemMouseOver()\" \n" +
    "    ng-mouseleave=\"onItemMouseLeave()\">\n" +
    "    \n" +
    "    <div class=\"pnd-item-text\" ng-if=\"itemType !== 'notebook'\">\n" +
    "        <span \n" +
    "            class=\"pnd-type\"\n" +
    "            ng-show=\"item.type.length > 0\">\n" +
    "            {{itemTypeLabel}}\n" +
    "        </span>\n" +
    "        <span class=\"pnd-item-label\">\n" +
    "            {{item.label}}\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-item-text\" ng-if=\"itemType === 'notebook'\">\n" +
    "        <!-- <span class=\"pnd-item-typeLabel\">{{notebook.visibility}}</span> -->\n" +
    "        <span ng-if=\"!item.isPublic()\" class=\"pnd-icon pnd-icon-lock\"  title=\"Private\"></span>\n" +
    "        <span ng-if=\"item.isPublic()\" class=\"pnd-icon pnd-icon-group\" title=\"Public\"></span>\n" +
    "        <span ng-if=\"item.isCurrent()\" class=\"pnd-icon pnd-icon-pencil\" title=\"Current\"></span>\n" +
    "        <span class=\"pnd-item-label\">{{item.label}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-item-buttons\">\n" +
    "        <button\n" +
    "                type=\"button\"\n" +
    "                class=\"pnd-btn pnd-btn-transparent\"\n" +
    "                title=\"Options\"\n" +
    "                ng-hide=\"hideOptions\"\n" +
    "                ng-click=\"onClickMenu($event)\">\n" +
    "            <span class=\"pnd-icon pnd-icon-dots\" ng-if=\"itemType !== 'notebook'\"></span>\n" +
    "            <span class=\"pnd-icon pnd-icon-dots\" ng-if=\"itemType === 'notebook'\"></span>\n" +
    "        </button>\n" +
    "        <!-- The following code is relative to the deprecated sticky button -->\n" +
    "        <!--\n" +
    "        <button\n" +
    "            type=\"button\"\n" +
    "            class=\"btn btn-xs btn-link pnd-btn-stick\"\n" +
    "            title=\"Sticky\"\n" +
    "            ng-hide=\"hideStickyButton\"\n" +
    "            ng-click=\"onClickSticky($event)\">\n" +
    "            <span class=\"pnd-icon pnd-icon-thumb-tack\"></span>\n" +
    "        </button>\n" +
    "\n" +
    "        <span ng-if=\"isSelect\" class=\"pnd-icon pnd-icon-check\"></span>\n" +
    "        -->\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/Item/KorboItem.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Item/KorboItem.dir.tmpl.html",
    "<div class=\"pnd-item\" ng-class=\"{'pnd-sticky-item': isSticky()}\" ng-show=\"useInKorbo\">\n" +
    "\n" +
    "    <div class=\"pnd-item-buttons\">\n" +
    "        <button ng-hide=\"hideOptions\" type=\"button\" ng-click=\"onClickMenu($event)\" class=\"pnd-btn pnd-btn-xsmall pnd-btn-link\" title=\"Options\"><span class=\"pnd-icon pnd-icon-dots\"></span></button>\n" +
    "        <button ng-hide=\"hideStickyButton\" type=\"button\" ng-click=\"onClickSticky($event)\" class=\"pnd-btn pnd-btn-xs pnd-btn-link\" title=\"Sticky\"><span class=\"pnd-icon pnd-icon-thumb-tack\"></span></button>\n" +
    "        <span ng-if=\"isSelected\" class=\"pnd-icon pnd-icon-check\"></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-item-text\">\n" +
    "        <span ng-show=\"item.type.length > 0\" class=\"pnd-item-typeLabel\">{{itemTypeLabel}}</span>\n" +
    "        <span class=\"pnd-item-label\">{{item.label}}</span>\n" +
    "        \n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

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

angular.module("src/Lists/GeneralItemsContainer/ClientGeneralItemsContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/GeneralItemsContainer/ClientGeneralItemsContainer.tmpl.html",
    "<general-items-container></general-items-container>");
}]);

angular.module("src/Lists/GeneralItemsContainer/GeneralItemsContainer.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/GeneralItemsContainer/GeneralItemsContainer.dir.tmpl.html",
    "<div class=\"pnd-panel-tab-content\">\n" +
    "    <div ng-if=\"!(isMyNotebooks || isPredicates)\">\n" +
    "        <ng-include src=\"'src/Lists/itemsContainer.tmpl.html'\"></ng-include>\n" +
    "    </div>\n" +
    "    <div ng-if=\"(isMyNotebooks || isPredicates)\">\n" +
    "    <!-- HEADER for myNotebooks and Predicates-->\n" +
    "        <div class=\"pnd-panel-tab-content-header pnd-panel-tab-content-header-border\">\n" +
    "            <div class=\"left-inner-icon pnd-panel-tab-search pnd-has-options\">\n" +
    "                <span\n" +
    "                        class=\"pnd-icon {{search.icon}}\"\n" +
    "                        ng-click=\"search.term = ''\"></span>\n" +
    "                <input\n" +
    "                        type=\"text\"\n" +
    "                        ng-model=\"search.term\"\n" +
    "                        placeholder=\"{{search.placeholder}}\"\n" +
    "                        class=\"form-control\">\n" +
    "            </div>\n" +
    "            <button\n" +
    "                    type=\"button\"\n" +
    "                    class=\"{{isPredicates?'predicates-items-btn-order':''}} pnd-panel-tab-icon {{search.additionalClass}}\"\n" +
    "                    template-url=\"{{dropdownTemplate}}\"\n" +
    "                    bs-dropdown=\"dropdownOrdering\"\n" +
    "                    title=\"{{search.orderLabel}}\">\n" +
    "                <span\n" +
    "                        class=\"pnd-icon pnd-icon-caret-down\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <!-- end pnd-panel-tab-content-header -->\n" +
    "\n" +
    "        <!-- CONTENT for myNotebooks and Predicates-->\n" +
    "        <div class=\"pnd-panel-tab-content-content pnd-inner-scrollable pnd-inner-no-tabs\">\n" +
    "            <ul\n" +
    "                    class=\"list-group\"\n" +
    "                    ng-if=\"!message.flag\">\n" +
    "                <li\n" +
    "                        class=\"list-group-item\"\n" +
    "                        ng-repeat=\"item in displayedItems | orderBy:getOrderProperty:reverse\">\n" +
    "                    <item ng-if=\"isMyNotebooks\"\n" +
    "                          nid=\"{{item.id}}\"\n" +
    "                          menu-type=\"{{itemMenuType}}\"\n" +
    "                          item-type=\"notebook\"\n" +
    "                          hide-sticky-button=\"true\"\n" +
    "                          is-selected=\"isSelected(item)\"\n" +
    "                          ng-click=\"select(item, $event)\"></item>\n" +
    "                    <item ng-if=\"isPredicates\"\n" +
    "                          uri=\"{{item.uri}}\"\n" +
    "                          menu-type=\"{{itemMenuType}}\"\n" +
    "                          hide-sticky-button=\"true\"\n" +
    "                          hide-options=\"true\"\n" +
    "                          is-selected=\"isSelected(item)\"\n" +
    "                          ng-click=\"select(item, $event)\"></item>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div\n" +
    "                    class=\"pnd-dashboard-welcome pnd-ui-message\"\n" +
    "                    ng-if=\"message.flag\">{{message.text}}</div>\n" +
    "        </div>\n" +
    "        <!-- end pnd-panel-tab-content-content -->\n" +
    "    </div>\n" +
    "    <!-- FOOTER -->\n" +
    "    <div class=\"pnd-panel-tab-content-footer\">\n" +
    "        <button\n" +
    "                class=\"{{actionButton.btnClass}} pnd-btn-small\"\n" +
    "                title=\"{{actionButton.title}}\"\n" +
    "                ng-disabled=\"isMyNotebooks? false :\n" +
    "                            isPredicates? (!isUseActive || !canBeUseAsPredicate) :\n" +
    "                            actionButton.requireLoggedUser? (!isUseActive || !isUserLogged) : !isUseActive\"\n" +
    "                ng-click=\"onClickAction()\">\n" +
    "            {{actionButton.text}}\n" +
    "        </button><button\n" +
    "                ng-if=\"!(isMyNotebooks || isPredicates)\"\n" +
    "                class=\"pnd-btn pnd-btn-subject pnd-btn-small\"\n" +
    "                title=\"Use as subject\"\n" +
    "                ng-disabled=\"!isUseActive || !canAddItemAsSubject\"\n" +
    "                ng-click=\"onClickUseSubject()\">\n" +
    "            Set subject\n" +
    "        </button><button\n" +
    "                ng-if=\"!(isMyNotebooks || isPredicates)\"\n" +
    "                class=\"pnd-btn pnd-btn-object pnd-btn-small \"\n" +
    "                title=\"Use as object\"\n" +
    "                ng-disabled=\"!isUseActive || !canAddItemAsObject\"\n" +
    "                ng-click=\"onClickUseObject()\">\n" +
    "            Set object\n" +
    "        </button>\n" +
    "    </div> <!-- end pnd-panel-tab-content-footer -->\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/Lists/MyItemsContainer/ClientMyItemsContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/MyItemsContainer/ClientMyItemsContainer.tmpl.html",
    "<general-items-container type=\"myItems\"></general-items-container>");
}]);

angular.module("src/Lists/MyNotebooksContainer/ClientMyNotebooksContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/MyNotebooksContainer/ClientMyNotebooksContainer.tmpl.html",
    "<general-items-container type=\"myNotebooks\"></general-items-container>");
}]);

angular.module("src/Lists/PageItemsContainer/ClientPageItemsContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/PageItemsContainer/ClientPageItemsContainer.tmpl.html",
    "<general-items-container type=\"pageItems\"></general-items-container>");
}]);

angular.module("src/Lists/PredicatesContainer/ClientPredicatesContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/PredicatesContainer/ClientPredicatesContainer.tmpl.html",
    "<general-items-container type=\"predicates\"></general-items-container>");
}]);

angular.module("src/Lists/VocabulariesContainer/ClientVocabulariesContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/VocabulariesContainer/ClientVocabulariesContainer.tmpl.html",
    "<general-items-container type=\"vocabularies\"></general-items-container>");
}]);

angular.module("src/Lists/itemList.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/itemList.tmpl.html",
    "<ul \n" +
    "    class=\"list-group\" \n" +
    "    ng-if=\"!message.flag\">\n" +
    "    <li \n" +
    "        class=\"list-group-item\" \n" +
    "        ng-repeat=\"pndItem in displayedItems | orderBy:getOrderProperty:reverse\">\n" +
    "        <item \n" +
    "            uri=\"{{pndItem.uri}}\" \n" +
    "            menu-type=\"{{itemMenuType}}\"\n" +
    "            hide-sticky-button=\"true\"\n" +
    "            hide-options=\"true\"\n" +
    "            is-selected=\"isSelected(pndItem)\" \n" +
    "            ng-click=\"select(pndItem, $event)\"></item>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<div \n" +
    "    class=\"pnd-dashboard-welcome pnd-ui-message\"\n" +
    "    ng-if=\"message.flag\">\n" +
    "    {{message.text}}\n" +
    "</div>");
}]);

angular.module("src/Lists/itemsContainer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Lists/itemsContainer.tmpl.html",
    "<!-- TODO: generalize MyItemsContainer, MyNotebookContainer, PageItemsContainer, PredicateContainer, VocabulariesContainer (!!!) -->\n" +
    "\n" +
    "<!-- HEADER -->\n" +
    "<div \n" +
    "    class=\"pnd-panel-tab-content-header pnd-panel-tab-content-header-no-border\">\n" +
    "\n" +
    "    <div class=\"left-inner-icon pnd-panel-tab-search pnd-has-options\">\n" +
    "        <span \n" +
    "            class=\"pnd-icon {{search.icon}}\" \n" +
    "            ng-click=\"search.term = ''\"></span>\n" +
    "        <input \n" +
    "            type=\"text\" \n" +
    "            ng-model=\"search.term\" \n" +
    "            placeholder=\"Search items\"\n" +
    "            class=\"form-control\">\n" +
    "    </div>\n" +
    "\n" +
    "    <button\n" +
    "            type=\"button\"\n" +
    "            class=\"pnd-panel-tab-icon {{search.additionalClass}}\"\n" +
    "            template-url=\"{{dropdownTemplate}}\"\n" +
    "            bs-dropdown=\"dropdownOrdering\"\n" +
    "            title=\"{{search.orderLabel}}\">\n" +
    "            <span\n" +
    "                    class=\"pnd-icon pnd-icon-caret-down\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "</div> <!-- end pnd-panel-tab-content-header -->\n" +
    "\n" +
    "<!-- CONTENT -->\n" +
    "<div class=\"pnd-panel-tab-content-content pnd-inner\">\n" +
    "    <div \n" +
    "        ng-model=\"tabs.activeTab\" \n" +
    "        pnd-tabs=\"tabs\"></div>\n" +
    "</div> <!-- end pnd-panel-tab-content-content -->");
}]);

angular.module("src/LiteTool/ClientLiteTool.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/LiteTool/ClientLiteTool.tmpl.html",
    "<lite-tool></lite-tool>");
}]);

angular.module("src/LiteTool/LiteTool.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/LiteTool/LiteTool.dir.tmpl.html",
    "<div class=\"pnd-lite-tool pnd-ignore\"\n" +
    "     ng-class=\"{'pnd-lite-tool-open': (isAnnotationSidebarExpanded || isContextualMenuOpen || isUserPopoupOpen)}\">\n" +
    "\n" +
    "    <!-- Pundit icon or user thumb -->\n" +
    "    <div\n" +
    "            class=\"pnd-icon pnd-icon-pundit-logo\"\n" +
    "            ng-class=\"{\n" +
    "            'pnd-lite-tool-user-not-logged': !isUserLogged,\n" +
    "            'pnd-lite-tool-user-logged': isUserLogged}\"\n" +
    "            ng-click=\"annotationsClickHandler()\">\n" +
    "    </div>\n" +
    "    <!-- END // Pundit icon or user thumb -->\n" +
    "\n" +
    "    <div class=\"pnd-lite-tool-wrap\">\n" +
    "        <div class=\"pnd-lite-tool-content\">\n" +
    "\n" +
    "            <!-- User name or 'login' button -->\n" +
    "            <div class=\"pnd-lite-tool-user\">\n" +
    "                <div \n" +
    "                    class=\"pnd-lite-tool-user-logged pnd-user-button\" \n" +
    "                    ng-show=\"isUserLogged\" \n" +
    "                    ng-click=\"closePopover($event)\" bs-dropdown=\"userLoggedInDropdown\" data-container=\".pnd-lite-tool\" template-url=\"{{dropdownTemplate}}\">\n" +
    "                    {{userData.fullName}}\n" +
    "                </div>\n" +
    "                <div \n" +
    "                    class=\"pnd-lite-tool-user-not-logged pnd-login-button\" \n" +
    "                    ng-if=\"!isUserLogged\" \n" +
    "                    ng-click=\"login()\">\n" +
    "                    Login\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Sidebar toggle -->\n" +
    "            <div \n" +
    "                class=\"pnd-lite-tool-sidebar-toggle\" \n" +
    "                ng-click=\"annotationsClickHandler()\">\n" +
    "                <div \n" +
    "                    class=\"pnd-lite-tool-sidebar-toggle-open\" \n" +
    "                    ng-if=\"!isAnnotationSidebarExpanded\">\n" +
    "                    <span class=\"pnd-icon pnd-icon-angle-left\"></span>\n" +
    "                    Open sidebar\n" +
    "                </div>\n" +
    "                <div \n" +
    "                    class=\"pnd-lite-tool-sidebar-toggle-close\" \n" +
    "                    ng-if=\"isAnnotationSidebarExpanded\">\n" +
    "                    Close sidebar \n" +
    "                    <span class=\"pnd-icon pnd-icon-angle-right\"></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/Preview/ClientDashboardPreview.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Preview/ClientDashboardPreview.tmpl.html",
    "<preview></preview>");
}]);

angular.module("src/Preview/DashboardPreview.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Preview/DashboardPreview.dir.tmpl.html",
    "<div class=\"pnd-panel-tab-content pnd-preview {{getItemClass()}}\">\n" +
    "\n" +
    "    <!-- HEADER -->\n" +
    "\n" +
    "    <div class=\"pnd-panel-tab-content-header pnd-panel-tab-content-header-border\" ng-if=\"!useInKorbo || (useInKorbo && !isItemEmpty())\">\n" +
    "        <!--\n" +
    "        <span ng-if=\"!isItemEmpty()\" class=\"{{getItemIcon()}}\"></span> -->\n" +
    "        <h1 class=\"pnd-dashboard-preview-panel-heading\" ng-if=\"isItemEmpty() && !useInKorbo\">{{getWelcomeHeaderMessage()}}</h1>\n" +
    "        <h1 class=\"pnd-dashboard-preview-panel-label\" ng-if=\"!isItemEmpty()\">{{itemDashboardPreview.label}}</h1>\n" +
    "    </div> <!-- end pnd-panel-tab-content-header -->\n" +
    "\n" +
    "    <!-- CONTENT -->\n" +
    "\n" +
    "    <!-- show welcome content when preview is empty -->\n" +
    "    <div class=\"pnd-panel-tab-content-content pnd-inner-scrollable\">\n" +
    "        <div>\n" +
    "            <span class=\"pnd-dashboard-welcome pnd-ui-message\" ng-if=\"isItemEmpty() && !useInKorbo\">{{getWelcomeBodyMessage()}}</span>\n" +
    "            <item-preview ng-if=\"!isItemEmpty() && !isNotebook()\" uri=\"{{itemDashboardPreview.uri}}\" sticking=\"true\"></item-preview>\n" +
    "            <notebook-preview ng-if=\"!isItemEmpty() && isNotebook()\" id=\"{{itemDashboardPreview.id}}\"></notebook-preview>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- loading preview in korboEE -->\n" +
    "        <div class=\"kee-server-searching\" ng-show=\"isLoading\"><span class=\"pnd-icon pnd-icon-refresh pnd-icon-spin \"></span></div>\n" +
    "        <!-- / end loading preview in korboEE -->\n" +
    "\n" +
    "        <!-- error loading preview in korboEE -->\n" +
    "        <div class=\"kee-server-error\" ng-show=\"errorLoading\">Impossible loading preview...</div>\n" +
    "        <!-- / end error loading preview in korboEE -->\n" +
    "\n" +
    "    </div> <!-- end pnd-panel-tab-content-content -->\n" +
    "\n" +
    "    <!-- FOOTER -->\n" +
    "\n" +
    "    <div class=\"pnd-panel-tab-content-footer\" ng-hide=\"useInKorbo\">\n" +
    "        <button\n" +
    "            class=\"pnd-btn pnd-btn-small pnd-dashboard-preview-clear-sticky-button\"\n" +
    "            ng-click=\"clearSticky()\" \n" +
    "            ng-class=\"{disabled: !isStickyItem()}\">\n" +
    "            Clear preview\n" +
    "        </button><button\n" +
    "            class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction pnd-dashboard-preview-more-info-button\"\n" +
    "            ng-if=\"itemDashboardPreview.isProperty() || itemDashboardPreview.isEntity()\" \n" +
    "            ng-click=\"openUrl(itemDashboardPreview.uri)\" \n" +
    "            ng-class=\"{disabled: !isStickyItem()}\">\n" +
    "            More info\n" +
    "        </button><button\n" +
    "            class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "            ng-if=\"itemDashboardPreview.isWebPage()\"\n" +
    "            ng-click=\"openUrl(itemDashboardPreview.uri)\"\n" +
    "            ng-class=\"{disabled: !isStickyItem()}\">\n" +
    "            Go to page\n" +
    "        </button><button\n" +
    "            class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction pnd-dashboard-preview-more-info-button\"\n" +
    "            ng-if=\"homePundit && isNotebook() && isUser()\" \n" +
    "            ng-click=\"openNotebookUrl(itemDashboardPreview.id)\" \n" +
    "            ng-class=\"{disabled: !isStickyItem()}\">\n" +
    "            More info\n" +
    "        </button>\n" +
    "\n" +
    "        <!-- Open image -->\n" +
    "        <!-- <button \n" +
    "            class=\"btn btn-link btn-xs pnd-btn-full pnd-dashboard-preview-external-modal-button\" \n" +
    "            ng-class=\"{disabled: !isStickyItem()}\" \n" +
    "            ng-if=\"itemIsAnImage\">\n" +
    "            <span class=\"pnd-icon pnd-icon-external-link\"></span>\n" +
    "        </button> -->\n" +
    "\n" +
    "    </div> <!-- end pnd-panel-tab-content-footer -->\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/Preview/ItemPreview.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Preview/ItemPreview.dir.tmpl.html",
    "<!-- TODO: Need some refactoring -->\n" +
    "<div class=\"pnd-annotation-preview-item-container pnd-ignore\">\n" +
    "\n" +
    "    <div class=\"pnd-preview-item-types\">\n" +
    "        <ul class=\"pnd-preview-item-types-ul\">\n" +
    "            <li class=\"pnd-type\" ng-class=\"{'pnd-is-sticky': isSticky}\" ng-repeat=\"type in item.type\">{{getTypeLabel(type)}}</li>\n" +
    "        </ul>\n" +
    "        <div ng-show=\"typeHiddenPresent\" ng-class=\"{'pnd-icon-caret-down': typeHidden, 'pnd-icon-caret-up': !typeHidden}\" class=\"pnd-icon pnd-type\" ng-click=\"showAlltypes()\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"item.isImage() && item.image!=null\" class=\"pnd-preview-item-image\">\n" +
    "        <img ng-src=\"{{item.image}}\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.isImageFragment() && item.image!=null\" class=\"pnd-preview-item-image\">\n" +
    "        <img ng-src=\"{{item.image}}\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <div \n" +
    "        class=\"pnd-preview-item-image\" \n" +
    "        ng-if=\"!item.isImage() && !item.isImageFragment() && hasImage\">\n" +
    "            <img class=\"pnd-annotation-preview-item-image\" ng-src=\"{{item.image}}\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-preview-item-description\">\n" +
    "        <p>{{item.description}}</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-preview-item-allLables\" ng-if=\"item.mergedLabel\">\n" +
    "        <strong>All labels:</strong>\n" +
    "        <span>{{item.mergedLabel.split('_').join(', ')}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--\n" +
    "    This is redundant since the URL is available clicking on the \"Go to page\" button\n" +
    "    <div ng-if=\"item.isWebPage()\" class=\"pnd-preview-item-webpage\">\n" +
    "        <ul>\n" +
    "            <li>\n" +
    "                <strong>URL:</strong> <a href=\"{{item.uri}}\" target=\"_blank\">{{item.uri}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    -->\n" +
    "\n" +
    "    <!-- Technical details for predicates -->\n" +
    "    <div ng-if=\"item.isProperty()\" class=\"pnd-preview-item-predicate\">\n" +
    "        <h1>Technical details</h1>\n" +
    "        <ul>\n" +
    "            <li class=\"pnd-preview-item-vocab pnd-preview-detail\" ng-if=\"!item.mergedVocabulary && item.vocabulary\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Vocabulary:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\">{{item.vocabulary}}</span>\n" +
    "            </li>\n" +
    "            <li class=\"pnd-preview-item-vocab pnd-preview-detail\" ng-if=\"item.mergedVocabulary\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Vocabulary:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\" ng-repeat=\"vocab in item.mergedVocabulary\">{{vocab}}</span>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"pnd-preview-item-domain pnd-preview-detail\" ng-if=\"item.suggestedSubjectTypes.length !== 0\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Suggested Subject Types:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\" ng-repeat=\"suggestedSubjectType in item.suggestedSubjectTypes\">{{suggestedSubjectType}}</span>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"pnd-preview-item-domain pnd-preview-detail\" ng-if=\"item.suggestedSubjectTypes.length === 0\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Suggested Subject Types:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\">All subjects can be used</span>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"pnd-preview-item-range pnd-preview-detail\" ng-if=\"item.suggestedObjectTypes.length !== 0\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Suggested Object Types:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\" ng-repeat=\"suggestedObjectType in item.suggestedObjectTypes\">{{suggestedObjectType}}</span>\n" +
    "            </li>\n" +
    "            <li class=\"pnd-preview-item-range pnd-preview-detail\" ng-if=\"item.suggestedObjectTypes.length === 0\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Suggested Object Types:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\">All objects can be used</span>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"pnd-preview-detail\" ng-if=\"item.uri\">\n" +
    "                <strong class=\"pnd-preview-detail-label\">Uri:</strong>\n" +
    "                <span class=\"pnd-preview-detail-content\">{{item.uri}}</span>\n" +
    "            </li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>\n" +
    "");
}]);

angular.module("src/Preview/NotebookPreview.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Preview/NotebookPreview.dir.tmpl.html",
    "<div class=\"pnd-dashboard-welcome pnd-preview-notebook\">\n" +
    "\n" +
    "    <div class=\"pnd-preview-notebook-current pnd-preview-detail\" ng-show=\"isCurrent\">\n" +
    "        <span class=\"pnd-preview-detail-content\">\n" +
    "            This is your current notebook, that's where all the annotations you will create will be stored.\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-preview-notebook-visibility pnd-preview-detail\">\n" +
    "        <span>\n" +
    "            <strong class=\"pnd-preview-detail-label\">Visibility:</strong>\n" +
    "            <span class=\"pnd-preview-detail-content\" ng-if=\"notebook.isPublic()\">Public (visible to all users)</span>\n" +
    "            <span class=\"pnd-preview-detail-content\" ng-if=\"!notebook.isPublic()\">Private (only visible to you)</span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-preview-notebook-annotations pnd-preview-detail\">\n" +
    "        <span>\n" +
    "            <strong class=\"pnd-preview-detail-label\">Annotations in the notebook:</strong>\n" +
    "        </span>\n" +
    "        <span class=\"pnd-preview-detail-content\">{{notebook.includes.length}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-preview-notebook-creator pnd-preview-detail\">\n" +
    "        <span>\n" +
    "            <strong class=\"pnd-preview-detail-label\">Creator:</strong>\n" +
    "        </span>\n" +
    "        <span class=\"pnd-preview-detail-content\">{{notebook.creatorName}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-preview-notebook-date pnd-preview-detail\">\n" +
    "        <span>\n" +
    "            <strong class=\"pnd-preview-detail-label\">Creation date:</strong>\n" +
    "        </span>\n" +
    "        <span class=\"pnd-preview-detail-content\">\n" +
    "            {{notebook.created | amDateFormat:'YYYY-MM-DD'}}\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("src/ResourcePanel/ResourcePanel.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/ResourcePanel.tmpl.html",
    "<!-- TODO: split Korbo template to solve this code soup -->\n" +
    "\n" +
    "<div class=\"tabbable tabs-left\"> <!-- tabs left -->\n" +
    "   <!-- header -->\n" +
    "   <div \n" +
    "        class=\"pnd-panel-tab-content-header pnd-panel-tab-content-header-border\"\n" +
    "        ng-if=\"showHeader\">\n" +
    "\n" +
    "       <!-- TODO: please remember that class \"pnd-vertical-tab-header-content\" was removed -->\n" +
    "        \n" +
    "        <!-- Search Input div -->\n" +
    "        <div class=\"left-inner-icon pnd-panel-tab-search\">\n" +
    "            <span \n" +
    "                class=\"pnd-icon {{subjectIcon}}\" \n" +
    "                ng-click=\"clearSearch()\"></span>\n" +
    "            <input \n" +
    "                type=\"text\" \n" +
    "                class=\"pnd-rsp-input input-sm form-control\" \n" +
    "                placeholder=\"Type at least 3 characters ...\" \n" +
    "                ng-model=\"$parent.$parent.label\"\n" +
    "                ng-change=\"updateSearch($parent.$parent.label)\"\n" +
    "                ng-minlength=\"3\"\n" +
    "                >\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- // end header -->\n" +
    "\n" +
    "    <div ng-include=\"'src/ResourcePanel/verticalTabs.tmpl.html'\" replace=\"true\"></div>\n" +
    "\n" +
    "</div> <!-- / tabs left -->");
}]);

angular.module("src/ResourcePanel/datepicker.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/datepicker.tmpl.html",
    "<div class=\"dropdown-menu datepicker pnd-date-picker\" ng-class=\"'datepicker-mode-' + $mode\" >\n" +
    "  <table class=\"pnd-date-picker-table\">\n" +
    "    <thead>\n" +
    "      <tr class=\"text-center\">\n" +
    "        <th>\n" +
    "          <button id=\"arrow-left\" tabindex=\"-1\" type=\"button\" class=\"pnd-btn pull-left\" ng-click=\"$selectPane(-1)\">\n" +
    "            <i class=\"glyphicon glyphicon-chevron-left\"></i>\n" +
    "          </button>\n" +
    "        </th>\n" +
    "        <th colspan=\"{{ rows[0].length - 2 }}\">\n" +
    "          <button id=\"button-date\" tabindex=\"-1\" type=\"button\" class=\"pnd-btn pnd-btn-block text-strong\"  ng-click=\"$toggleMode()\">\n" +
    "            <strong class=\"pnd-date-picker-str-bnt\" ng-bind=\"title\"></strong>\n" +
    "          </button>\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          <button id=\"arrow-right\" tabindex=\"-1\" type=\"button\" class=\"pnd-btn pull-right\" ng-click=\"$selectPane(+1)\">\n" +
    "            <i class=\"glyphicon glyphicon-chevron-right\"></i>\n" +
    "          </button>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      <tr ng-show=\"showLabels\" ng-bind-html=\"labels\"></tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"(i, row) in rows\" height=\"{{ 100 / rows.length }}%\">\n" +
    "        <td class=\"text-center\" ng-repeat=\"(j, el) in row\">\n" +
    "          <button tabindex=\"-1\" type=\"button\" class=\"pnd-btn pnd-date-picker-cntr-btn\" ng-class=\"{'pnd-btn-primary': el.selected}\" ng-click=\"$select(el.date)\" ng-dblclick=\"$parent.save()\" ng-disabled=\"el.disabled\">\n" +
    "            <span ng-class=\"{'text-muted': el.muted}\" ng-bind=\"el.label\"></span>\n" +
    "          </button>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "  <!-- <button class=\"btn btn-sm btn-success\"  ng-click=\"save()\">Save</button>\n" +
    "  <button class=\"btn btn-sm btn-success\" ng-click=\"cancel()\">Cancel</button> -->\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/ResourcePanel/popoverCalendar.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/popoverCalendar.tmpl.html",
    "<div class=\"popover pnd-popover popover-datepicker pnd-popover-calendar\">\n" +
    "    <div class=\"arrow\" ng-style=\"{'margin-left': arrowLeft}\"></div>\n" +
    "    <!--\n" +
    "    <h3 class=\"popover-title\">\n" +
    "        Calendar\n" +
    "    </h3>\n" +
    "    -->\n" +
    "    <div class=\"popover-content\">\n" +
    "        <!-- <div class=\"form-group\">\n" +
    "            <label class=\"control-label\"><i class=\"fa fa-calendar\"></i> Date </label>\n" +
    "            <input  type=\"text\" \n" +
    "                    class=\"form-control\"\n" +
    "                    data-date-format=\"dd/MM/yyyy\" \n" +
    "                    ng-model=\"selectedDate\"\n" +
    "                    ng-keyup=\"escapeEvent($event)\"\n" +
    "                    calendar-date-format>\n" +
    "            <input  type=\"text\" \n" +
    "                    ng-model=\"selectedDate\"\n" +
    "                    ng-show=\"false\"\n" +
    "                    class=\"form-control pnd-input-calendar\"\n" +
    "                    trigger=\"click\" \n" +
    "                    data-date-format=\"dd/MM/yyyy\" \n" +
    "                    template=\"src/ResourcePanel/datepicker.tmpl.html\" \n" +
    "                    bs-datepicker>\n" +
    "        </div> -->\n" +
    "\n" +
    "        <resource-calendar date=\"modelDate\"></resource-calendar>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"popover-footer\">\n" +
    "        <button\n" +
    "            class=\"pnd-btn pnd-btn-small\"\n" +
    "            ng-click=\"cancel()\">\n" +
    "            Cancel\n" +
    "        </button>\n" +
    "        <button\n" +
    "                class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "                ng-click=\"save()\"\n" +
    "                ng-show=\"showSaveButton(this)\"\n" +
    "                ng-disabled=\"!modelDate.valid\">\n" +
    "            Save date\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/ResourcePanel/popoverLiteralText.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/popoverLiteralText.tmpl.html",
    "<div class=\"popover pnd-popover pnd-popover-literal\">\n" +
    "    <div class=\"arrow\" ng-style=\"{'margin-left': arrowLeft}\"></div>\n" +
    "\n" +
    "    <div class=\"popover-content\">\n" +
    "        <!-- TODO Remove this DIV -->\n" +
    "        <!-- <div class=\"form-group\"> -->\n" +
    "        <textarea\n" +
    "            class=\"form-control pnd-popover-literal-textarea\"\n" +
    "            rows=\"6\"\n" +
    "            ng-model=\"literalText\"\n" +
    "            ></textarea>\n" +
    "        <!-- </div> -->\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"popover-footer\">\n" +
    "        <button\n" +
    "                class=\"pnd-btn pnd-btn-small\"\n" +
    "                ng-click=\"cancel()\">\n" +
    "            Cancel\n" +
    "        </button>\n" +
    "        <button\n" +
    "            class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "            ng-class=\"{disabled: literalText == ''}\"\n" +
    "            ng-show=\"showSaveButton(this)\"\n" +
    "            ng-click=\"save()\">\n" +
    "            Save\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/ResourcePanel/popoverResourcePanel.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/popoverResourcePanel.tmpl.html",
    "<div class=\"popover pnd-popover pnd-resource-panel-popover pnd-ignore\" ng-controller=\"ResourcePanelCtrl\">\n" +
    "    <div \n" +
    "        class=\"arrow\"\n" +
    "        ng-style=\"{'margin-left': arrowLeft}\"></div>\n" +
    "    <div \n" +
    "        ng-model=\"contentTabs.activeTab\" \n" +
    "        bs-tabs=\"contentTabs\" \n" +
    "        data-template=\"src/ResourcePanel/ResourcePanel.tmpl.html\">\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/ResourcePanel/resourceCalendar.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/resourceCalendar.dir.tmpl.html",
    "<div class=\"pnd-resource-calendar-container pnd-ignore\">\n" +
    "    <div class=\"pnd-date-inputs\" >\n" +
    "        <span class=\"pnd-date-year-input\">\n" +
    "            Year\n" +
    "            <input  type=\"text\"\n" +
    "                    class=\"form-control pnd-resource-calendar-input-year\"\n" +
    "                    ng-class=\"{'pnd-input-current': focus == 'year'}\"\n" +
    "                    ng-model=\"inputDate.year\"\n" +
    "                    ng-keyup=\"updateYear()\"\n" +
    "                    focus-on=\"switchFocus('year')\"\n" +
    "                    focus-on-change=\"activeFocus\"\n" +
    "                    focus-set=\"focus == 'year'\">\n" +
    "        </span>\n" +
    "        <span class=\"pnd-date-month-input\" ng-show=\"mode == 'month' || mode == 'day' || mode == 'time'\">\n" +
    "            Month\n" +
    "            <input  type=\"text\"\n" +
    "                    class=\"form-control\"\n" +
    "                    ng-class=\"{'pnd-input-current': focus == 'month'}\"\n" +
    "                    ng-model=\"inputDate.month\"\n" +
    "                    ng-keyup=\"updateMonth()\"\n" +
    "                    focus-on=\"switchFocus('month')\"\n" +
    "                    focus-on-change=\"activeFocus\"\n" +
    "                    focus-set=\"focus == 'month'\">\n" +
    "        </span>\n" +
    "        <span class=\"pnd-date-day-input\" ng-show=\"mode == 'day' || mode == 'time'\">\n" +
    "            Day\n" +
    "            <input  type=\"text\"\n" +
    "                    class=\"form-control\"\n" +
    "                    ng-class=\"{'pnd-input-current': focus == 'day'}\"\n" +
    "                    ng-model=\"inputDate.day\"\n" +
    "                    ng-keyup=\"updateDay()\"\n" +
    "                    focus-on=\"switchFocus('day')\"\n" +
    "                    focus-on-change=\"activeFocus\"\n" +
    "                    focus-set=\"focus == 'day'\">\n" +
    "        </span>\n" +
    "        <span class=\"pnd-date-time-input\" ng-show=\"mode == 'time'\">\n" +
    "            Time\n" +
    "            <input  type=\"text\"\n" +
    "                    class=\"form-control\"\n" +
    "                    ng-class=\"{'pnd-input-current': focus == 'time'}\"\n" +
    "                    ng-model=\"inputDate.time\"\n" +
    "                    ng-keyup=\"updateTime()\"\n" +
    "                    focus-on=\"switchFocus('time')\"\n" +
    "                    focus-on-change=\"activeFocus\"\n" +
    "                    focus-set=\"focus == 'time'\">\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-date-picker\" >\n" +
    "        <div ng-if=\"focus == 'year'\" class=\"pnd-date-year-selector\">\n" +
    "            <span date-picker=\"$parent.currentDate\" max-view=\"year\" min-view=\"year\"></span>\n" +
    "        </div>\n" +
    "        <div ng-if=\"focus == 'month'\" class=\"pnd-date-month-selector\">\n" +
    "            <span date-picker=\"$parent.currentDate\" max-view=\"month\" min-view=\"month\"></span>\n" +
    "        </div>\n" +
    "        <div ng-if=\"focus == 'day'\" class=\"pnd-date-day-selector\">\n" +
    "            <span date-picker=\"$parent.currentDate\" max-view=\"date\" min-view=\"date\"></span>\n" +
    "        </div>\n" +
    "        <div ng-if=\"focus == 'time'\" class=\"pnd-date-time-selector\">\n" +
    "            <span date-picker=\"$parent.currentDate\" max-view=\"hours\" min-view=\"minutes\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pnd-format-selector\">\n" +
    "        <p>Change date format</p>\n" +
    "        <span\n" +
    "            ng-class=\"{'pnd-format-current': mode == 'year'}\"\n" +
    "            ng-click=\"switchMode('year')\"\n" +
    "            ng-disabled=\"mode == 'year'\">Year</span> -\n" +
    "        <span\n" +
    "            ng-class=\"{'pnd-format-current': mode == 'month'}\"\n" +
    "            ng-click=\"switchMode('month')\"\n" +
    "            ng-disabled=\"mode == 'month'\">Month</span> -\n" +
    "        <span\n" +
    "            ng-class=\"{'pnd-format-current': mode == 'day'}\"\n" +
    "            ng-click=\"switchMode('day')\"\n" +
    "            ng-disabled=\"mode == 'day'\">Day</span> -\n" +
    "        <span\n" +
    "            ng-class=\"{'pnd-format-current': mode == 'time'}\"\n" +
    "            ng-click=\"switchMode('time')\"\n" +
    "            ng-disabled=\"mode == 'time'\">Time</span>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>");
}]);

angular.module("src/ResourcePanel/verticalTabs.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/ResourcePanel/verticalTabs.tmpl.html",
    "<!-- List -->\n" +
    "<ul\n" +
    "    class=\"pnd-vertical-tabs\">\n" +
    "    <li\n" +
    "        ng-repeat=\"pane in contentTabs\"\n" +
    "        ng-class=\"{active: $index == active}\">\n" +
    "        <a\n" +
    "            data-toggle=\"tab\"\n" +
    "            ng-click=\"setActive($index, $event)\"\n" +
    "            data-index=\"{{$index}}\" >\n" +
    "            <span\n" +
    "                class=\"badge pull-right\"\n" +
    "                ng-show=\"showFilteredResults && !pane.isLoading && pane.isStarted\">\n" +
    "                {{ contentTabs[$index].selector.config.infiniteScrolling ? (contentTabs[$index].remoteItemCount || 0) : tabItemsFiltered[$index].length ? tabItemsFiltered[$index].length : 0}}\n" +
    "            </span>\n" +
    "            <span\n" +
    "                class=\"badge pull-right\"\n" +
    "                ng-show=\"!showFilteredResults && !pane.isLoading && pane.isStarted\">\n" +
    "                {{pane.items.length}}\n" +
    "            </span>\n" +
    "            <span\n" +
    "                class=\"pnd-icon pnd-icon-refresh pnd-icon-spin pull-right\"\n" +
    "                ng-show=\"pane.isLoading\"></span>\n" +
    "            {{pane.title}}\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<div>\n" +
    "    <div class=\"pnd-vertical-tab-content\">\n" +
    "        <div \n" +
    "            ng-repeat=\"pane in contentTabs\" \n" +
    "            class=\"tab-pane pnd-vertical-tab-list-content\" \n" +
    "            ng-class=\"[$index == active ? 'active' : '']\" unlimited-scroll=\"infiniteScroll(pane, label)\">\n" +
    "            <div \n" +
    "                class=\"kee-server-messages\" \n" +
    "                ng-if=\"showContentMessage1 && !contentTabs[$index].serverError\">\n" +
    "                <!-- messages 1 -->\n" +
    "                <div \n" +
    "                    ng-show=\"!contentTabs[$index].isLoading && contentTabs[$index].items.length === 0 && elemToSearch !== ''\">\n" +
    "                    No results found\n" +
    "                </div>\n" +
    "                <!-- / end messages 1 -->\n" +
    "                \n" +
    "                <!-- messages 2 -->\n" +
    "                <div \n" +
    "                    class=\"kee-server-searching\" \n" +
    "                    ng-show=\"contentTabs[$index].isLoading && elemToSearch !== ''\">\n" +
    "                    <span class=\"pnd-icon pnd-icon-refresh pnd-icon-spin \"></span>\n" +
    "                </div>\n" +
    "                <!-- / end messages 2 -->\n" +
    "\n" +
    "                <!-- messages 3 -->\n" +
    "                <div \n" +
    "                    ng-show=\"!contentTabs[$index].isLoading && contentTabs[$index].items.length === 0 && elemToSearch === ''\">\n" +
    "                    Type a label to search...\n" +
    "                </div>\n" +
    "                <!-- / end messages 3 -->\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- messages 4 -->\n" +
    "            <div \n" +
    "                class=\"kee-server-messages\" \n" +
    "                ng-if=\"showContentMessage4 && contentTabs[$index].serverError\">\n" +
    "                <div ng-show=\"contentTabs[$index].serverError\">\n" +
    "                    Server error\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- TODO: find a better way to show partial counting -->\n" +
    "            <ul class=\"list-group\" ng-init=\"$parent.tabItemsFiltered = $parent.tabItemsFiltered || []; initTabItemsFiltered()\">\n" +
    "                <li \n" +
    "                    class=\"list-group-item\"\n" +
    "                    ng-repeat=\"mi in $parent.tabItemsFiltered[$index] = contentTabs[$index].isLocal ? (contentTabs[$index].items | filter:{label: label}) : contentTabs[$index].items\"\n" +
    "                    ng-init=\"ok = false\"\n" +
    "                    ng-if=\"showFilteredResults && !resetSearch || !ok\">\n" +
    "                    <item \n" +
    "                        uri=\"{{mi.uri}}\" \n" +
    "                        is-selected=\"isSelected(mi)\" \n" +
    "                        ng-click=\"select(mi, $event)\"\n" +
    "                        ng-dblclick=\"save(mi)\"\n" +
    "                        hide-options=\"true\" \n" +
    "                        hide-sticky-button=\"true\"></item>\n" +
    "                </li>\n" +
    "\n" +
    "                <li ng-if=\"showContentMessage5\">\n" +
    "                    <span class=\"pnd-ui-message\">\n" +
    "                        {{getMessageText(contentTabs[$index].title, contentTabs[$index].items, $parent.tabItemsFiltered[$index], label, showContentMessage5, pane.isLoading)}}\n" +
    "                    </span>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Korbo -->\n" +
    "                <li \n" +
    "                    class=\"list-group-item\" \n" +
    "                    ng-repeat=\"mi in contentTabs[$index].items | orderBy:getOrderProperty\" \n" +
    "                    ng-if=\"!showFilteredResults\"\n" +
    "                    ng-mouseenter=\"getItem(mi);$event.stopPropagation()\"\n" +
    "                    ng-init=\"customTemplate = useCustomTemplate\"\n" +
    "                    ng-mouseleave=\"onMouseLeave()\">\n" +
    "                    <item \n" +
    "                        uri=\"{{mi.uri}}\"\n" +
    "                        is-selected=\"isSelected(mi)\"\n" +
    "                        hide-options=\"true\"\n" +
    "                        hide-sticky-button=\"true\" \n" +
    "                        ng-click=\"select(mi, $event)\"\n" +
    "                        use-in-korbo=\"true\"></item>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div \n" +
    "            class=\"pnd-vertical-tab-footer-content pnd-panel-tab-content-footer\"\n" +
    "            ng-if=\"showVerticalTabFooterContent\">\n" +
    "            <button\n" +
    "                class=\"pnd-resource-panel-use-button pnd-btn pnd-btn-small pnd-btn-transparent\"\n" +
    "                ng-click=\"cancel()\">\n" +
    "                Cancel\n" +
    "            </button><button\n" +
    "                class=\"pnd-resource-panel-copy-button pnd-btn pnd-btn-small\"\n" +
    "                ng-class=\"{'disabled': !isUseActive}\" \n" +
    "                ng-show=\"showUseAndCopyButton()\"\n" +
    "                ng-click=\"useAndCopy(itemSelected)\">\n" +
    "                Copy and Use\n" +
    "            </button><button\n" +
    "                class=\"pnd-resource-panel-new-button pnd-btn pnd-btn-small\"\n" +
    "                ng-class=\"{'disabled': !isUseActive}\" \n" +
    "                ng-show=\"showCopyInEditorButton()\" \n" +
    "                ng-click=\"copyInEditor()\">\n" +
    "                Copy in editor\n" +
    "            </button><button\n" +
    "                class=\"pnd-resource-panel-new-button pnd-btn pnd-btn-small\" ng-show=\"showNewButton()\"\n" +
    "                ng-click=\"createNew()\">\n" +
    "                Create new\n" +
    "            </button><button\n" +
    "                class=\"pnd-resource-panel-use-button pnd-btn pnd-btn-small\"\n" +
    "                ng-show=\"showUseFullPageButton\"\n" +
    "                ng-click=\"useFullPage()\">\n" +
    "                Use web page\n" +
    "            </button><button\n" +
    "                class=\"pnd-resource-panel-use-button pnd-btn pnd-btn-small pnd-btn-calltoaction pnd-use\"\n" +
    "                ng-show=\"showSaveButton(this)\"\n" +
    "                ng-class=\"{'disabled': !isUseActive}\"\n" +
    "                ng-click=\"save(itemSelected)\">\n" +
    "                Use\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/SimplifiedClient/ItemPopover.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/SimplifiedClient/ItemPopover.tmpl.html",
    "<div class=\"popover pnd-item-popover pnd-simplified-popover\" ng-controller=\"ItemPopoverCtrl\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <h3 class=\"popover-title\">\n" +
    "        {{title}}\n" +
    "        <span \n" +
    "            class=\"pull-right pnd-icon pnd-icon-close\"\n" +
    "            ng-click=\"hide()\">\n" +
    "        </span>\n" +
    "    </h3>\n" +
    "\n" +
    "    <div \n" +
    "        class=\"popover-content pnd-simplified-popover-content\" \n" +
    "        ng-click=\"onContentClick()\">\n" +
    "        <annotation-details ng-repeat=\"ann in annotations\" id=\"{{ann.id}}\"></annotation-details>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/Toolbar/ClientToolbar.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Toolbar/ClientToolbar.tmpl.html",
    "<toolbar></toolbar>");
}]);

angular.module("src/Toolbar/Toolbar.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Toolbar/Toolbar.dir.tmpl.html",
    "<nav class=\"pnd-toolbar-navbar pnd-ignore\" role=\"navigation\" ng-controller=\"ToolbarCtrl\">\n" +
    "    <div \n" +
    "        class=\"pnd-toolbar-navbar-container\"\n" +
    "        ng-click=\"toolbarClik($event)\">\n" +
    "    \n" +
    "        <div class=\"pnd-toolbar-navbar-collapse\">\n" +
    "            <ul class=\"pnd-inner-nav pnd-toolbar-inner-nav pnd-toolbar-navbar-left\">\n" +
    "                \n" +
    "                <!-- Error button -->\n" +
    "                <!--\n" +
    "                <li ng-show=\"showStatusButtonError()\" class=\"pnd-toolbar-error-button pnd-toolbar-first-button\">\n" +
    "                    <a \n" +
    "                        href=\"javascript:void(0)\" \n" +
    "                        template-url=\"{{dropdownTemplate}}\" \n" +
    "                        bs-dropdown=\"errorMessageDropdown\"\n" +
    "                        ng-click=\"infoClickHandler()\">\n" +
    "                        <span class=\"pnd-icon pnd-icon-exclamation\"></span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                -->\n" +
    "                \n" +
    "                <!-- OK button -->\n" +
    "                <li ng-show=\"showStatusButtonOk()\" class=\"pnd-toolbar-status-button-ok pnd-toolbar-first-button\">\n" +
    "                    <a \n" +
    "                        href=\"javascript:void(0)\" \n" +
    "                        template-url=\"{{dropdownTemplate}}\" \n" +
    "                        bs-dropdown=\"infoDropdown\"\n" +
    "                        ng-click=\"infoClickHandler()\">\n" +
    "                        <span class=\"pnd-icon pnd-icon-pundit-logo\"></span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Loading button -->\n" +
    "                <li ng-show=\"showStatusButtonLoading()\" class=\"pnd-toolbar-status-button-ok pnd-toolbar-first-button\">\n" +
    "                    <a \n" +
    "                        href=\"javascript:void(0)\" \n" +
    "                        template-url=\"{{dropdownTemplate}}\" \n" +
    "                        bs-dropdown=\"infoDropdown\"\n" +
    "                        ng-click=\"infoClickHandler()\">\n" +
    "                        <!-- <span></span> -->\n" +
    "                        <span class=\"pnd-icon pnd-icon-pundit-logo pnd-pulse\"></span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Login button -->\n" +
    "                <li ng-show=\"showLogin()\" class=\"pnd-toolbar-login-button pnd-login-button pnd-toolbar-button-active pnd-calltoaction-btn\">\n" +
    "                    <!-- <a href=\"javascript:void(0)\" template-url=\"{{dropdownTemplate}}\" bs-dropdown=\"userNotLoggedDropdown\"><span>Login</span></a> -->\n" +
    "                    <a href=\"javascript:void(0)\" ng-click=\"loginButtonClick($event)\">\n" +
    "                        <span>Log in</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- User button -->\n" +
    "                <li ng-show=\"showUserButton()\" class=\"pnd-toolbar-user-button pnd-user-button pnd-toolbar-button-active\">\n" +
    "                    <a href=\"javascript:void(0)\" bs-dropdown=\"userLoggedInDropdown\" template-url=\"{{dropdownTemplate}}\" ng-click=\"closePopover($event)\">\n" +
    "                        <span>{{userData.fullName}}</span>\n" +
    "                        <span class=\"pnd-icon pnd-icon-angle-down\"></span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Dashboard button -->\n" +
    "                <li class=\"pnd-toolbar-dashboard-toogle-button pnd-toolbar-toggle-button\"\n" +
    "                    ng-if=\"dashboard\"\n" +
    "                    ng-class=\"{'pnd-not-clickable':isAnnomaticRunning, 'pnd-toolbar-button-active': isDashboardVisible}\">\n" +
    "                    <a href=\"javascript:void(0)\" ng-click=\"dashboardClickHandler()\">\n" +
    "                        <span class=\"pnd-toolbar-active-element\">\n" +
    "                            Dashboard\n" +
    "                            <span class=\"pnd-icon pnd-icon-dashboard-toggle\"></span>\n" +
    "                        </span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "            </ul> <!-- pnd-navbar-left -->\n" +
    "\n" +
    "            <ul class=\"pnd-inner-nav pnd-toolbar-inner-nav pnd-toolbar-navbar-right\">\n" +
    "                <!-- Annotate page button -->\n" +
    "\n" +
    "                <!--\n" +
    "                <li class=\"pnd-toolbar-annotate-page-button\"\n" +
    "                    ng-click=\"annotateWebPage()\"\n" +
    "                    ng-class=\"{'pnd-not-clickable':!canUsePageAsSubject, 'disabled':!canUsePageAsSubject}\">\n" +
    "                    <a href=\"javascript:void(0)\">\n" +
    "                        <span>Annotate web page</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                -->\n" +
    "\n" +
    "                <!-- Template mode button -->\n" +
    "                <li class=\"pnd-toolbar-template-mode-button\" ng-class=\"{'pnd-not-clickable':isAnnomaticRunning}\" ng-show=\"useTemplates\" ng-click=\"toggleTemplateMode()\">\n" +
    "                    <a href=\"javascript:void(0)\">\n" +
    "                        <span class=\"pnd-icon pnd-icon-pencil\"></span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                \n" +
    "                <!-- Template menu -->\n" +
    "                <li class=\"pnd-toolbar-template-menu-button\" ng-click=\"onClickTemplateDropdown()\" ng-class=\"{'pnd-not-clickable':isAnnomaticRunning}\" ng-show=\"useTemplates\">\n" +
    "                    <a href=\"javascript:void(0)\" template-url=\"{{dropdownTemplateTemplates}}\" bs-dropdown=\"userTemplateDropdown\">\n" +
    "                        <span>{{currentTemplateLabel}}</span>\n" +
    "                        <span class=\"pnd-icon pnd-icon-circle\" style=\"color: {{currentTemplateColor}};\"></span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                \n" +
    "                <!-- Notebooks menu -->\n" +
    "                <li class=\"pnd-toolbar-notebook-menu-button\" ng-if=\"myNotebooks\" ng-click=\"onClickNotebookDropdown()\">\n" +
    "                    <a ng-show=\"isUserLogged\" href=\"javascript:void(0)\" placement=\"bottom-right\" template-url=\"{{dropdownTemplateMyNotebook}}\" bs-dropdown=\"userNotebooksDropdown\">\n" +
    "                        <span class=\"pnd-icon pnd-icon-book\"> </span> <span class=\"pnd-toolbar-active-element\">{{currentNotebookLabel}}</span>\n" +
    "                    </a>\n" +
    "                    <a ng-show=\"!isUserLogged\" href=\"javascript:void(0)\" placement=\"bottom-right\" template-url=\"{{dropdownTemplate}}\" bs-dropdown=\"userNotLoggedDropdown\" class=\"disabled\">\n" +
    "                        <span class=\"pnd-toolbar-not-active-element\">Log in to select a notebook</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Custom menu -->\n" +
    "                <li class=\"pnd-toolbar-custom-menu-button\" ng-if=\"menuCustom && menuCustomDropdown.length > 0\">\n" +
    "                    <a href=\"javascript:void(0)\" template-url=\"{{dropdownTemplate}}\" bs-dropdown=\"menuCustomDropdown\">\n" +
    "                        <span class=\"pnd-toolbar-active-element\">Advanced menu</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Sidebar -->\n" +
    "                <li class=\"pnd-toolbar-annotations-button pnd-toolbar-toggle-button\" ng-if=\"sidebar\" ng-class=\"{'pnd-toolbar-button-active': isAnnotationSidebarExpanded}\">\n" +
    "                    <a href=\"javascript:void(0)\" ng-click=\"annotationsClickHandler()\">\n" +
    "                        <span class=\"pnd-toolbar-active-element\">\n" +
    "                            Sidebar \n" +
    "                            <!--\n" +
    "                            <span\n" +
    "                                class=\"pnd-icon pnd-icon-filter\"\n" +
    "                                ng-class=\"{'pnd-filter-active': isAnnotationFiltersActive}\">\n" +
    "                            </span>\n" +
    "                            -->\n" +
    "                            <span class=\"pnd-icon pnd-icon-sidebar-toggle\"></span>\n" +
    "                        </span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "\n" +
    "                <!-- Active filters -->\n" +
    "                <li class=\"\" ng-if=\"isAnnotationFiltersActive\">\n" +
    "                    <span class=\"pnd-icon pnd-icon-filter pnd-filter-active\">\n" +
    "                    </span>\n" +
    "                </li>\n" +
    "\n" +
    "            </ul> <!-- pnd-toolbar-navbar-right -->\n" +
    "    \n" +
    "        </div><!-- pnd-toolbar-navbar-collapse -->\n" +
    "    </div><!-- pnd-toolbar-navbar-container -->\n" +
    "    <div class=\"pnd-progress-bar\"\n" +
    "         ng-show=\"needsProgressBar\"\n" +
    "         ng-style=\"{width: progress}\">\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "\n" +
    "              \n" +
    "");
}]);

angular.module("src/Toolbar/myNotebooksDropdown.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Toolbar/myNotebooksDropdown.tmpl.html",
    "<ul class=\"pnd-dropdown-contextual-menu dropdown-menu pnd-ignore\" role=\"menu\">\n" +
    "    <li role=\"presentation\" ng-class=\"{'current-notebook active': item.currentNotebook, divider: item.divider, 'disabled': item.disable, 'dropdown-submenu': item.submenu, active: item.isActive, 'dropdown-header': item.header}\" ng-repeat=\"item in content\">\n" +
    "        <span ng-if=\"item.header\" ng-bind=\"item.text\">dksad</span>\n" +
    "        <a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" ng-if=\"!item.divider && item.click\" ng-click=\"$eval(item.click);$hide()\">\n" +
    "        <span ng-if=\"item.visibility == 'private'\" class=\"pnd-icon pnd-icon-lock\"></span>\n" +
    "        <span ng-if=\"item.visibility == 'public'\" class=\"pnd-icon pnd-icon-group\"></span>\n" +
    "        <span ng-if=\"item.currentNotebook\" class=\"pnd-icon pnd-icon-pencil\"></span>\n" +
    "        {{item.text}}</a>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/Toolbar/templatesDropdown.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Toolbar/templatesDropdown.tmpl.html",
    "<ul class=\"pnd-dropdown-contextual-menu dropdown-menu pnd-ignore\" role=\"menu\">\n" +
    "    <li role=\"presentation\" ng-class=\"{'current-template active': item.currentTemplate, divider: item.divider, 'disabled': item.disable, active: item.isActive, 'dropdown-header': item.header}\" ng-repeat=\"item in content\">\n" +
    "        <span ng-if=\"item.header\" ng-bind=\"item.text\">dksad</span>\n" +
    "        <a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" ng-if=\"!item.divider && item.click\" ng-click=\"$eval(item.click);$hide()\">\n" +
    "        <span class=\"pnd-icon pnd-icon-circle pull-right\" style=\"color: {{item.hasColor}};\"></span>\n" +
    "        <span ng-if=\"item.currentTemplate\" class=\"pnd-icon pnd-icon-check\"></span>\n" +
    "        {{item.text}}</a>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/Tools/NotebookComposer/ClientNotebookComposer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Tools/NotebookComposer/ClientNotebookComposer.tmpl.html",
    "<notebook-composer></notebook-composer>");
}]);

angular.module("src/Tools/NotebookComposer/NotebookComposer.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Tools/NotebookComposer/NotebookComposer.dir.tmpl.html",
    "<!-- HEADER -->\n" +
    "<div class=\"pnd-panel-tab-content-header\">\n" +
    "    <h1>\n" +
    "        {{notebookComposerHeader}}\n" +
    "    </h1>\n" +
    "</div> \n" +
    "<!-- end pnd-panel-tab-content-header -->\n" +
    "\n" +
    "<!-- CONTENT -->\n" +
    "<div class=\"pnd-panel-tab-content-content\">\n" +
    "\n" +
    "    <div \n" +
    "        class=\"form-group pnd-notebook-composer-container\" \n" +
    "        ng-hide=\"saving\">\n" +
    "\n" +
    "        <p>\n" +
    "            <input \n" +
    "                type=\"text\" \n" +
    "                class=\"form-control\" \n" +
    "                placeholder=\"Enter notebook name\" \n" +
    "                ng-model=\"notebook.name\">\n" +
    "        </p>\n" +
    "\n" +
    "        <div \n" +
    "            class=\"checkbox\" \n" +
    "            ng-class=\"{'pnd-notebook-composer-element-active': notebook.current}\">\n" +
    "            <label>\n" +
    "                <input \n" +
    "                    type=\"checkbox\" \n" +
    "                    ng-model=\"notebook.current\" \n" +
    "                    ng-disabled=\"editMode && isCurrentNotebook\">\n" +
    "                <span \n" +
    "                    class=\"pnd-icon pnd-icon-pencil\"></span>\n" +
    "                Set as current\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div \n" +
    "            class=\"radio\" \n" +
    "            ng-class=\"{'pnd-notebook-composer-element-active': notebook.visibility == 'public'}\">\n" +
    "            <label>\n" +
    "                <input \n" +
    "                    type=\"radio\" \n" +
    "                    name=\"visibility\" \n" +
    "                    value=\"public\" \n" +
    "                    ng-model=\"notebook.visibility\">\n" +
    "                <span \n" +
    "                    class=\"pnd-icon pnd-icon-group\"></span> \n" +
    "                Public\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div \n" +
    "            class=\"radio\" \n" +
    "            ng-class=\"{'pnd-notebook-composer-element-active': notebook.visibility == 'private'}\">\n" +
    "            <label>\n" +
    "                <input \n" +
    "                    type=\"radio\" \n" +
    "                    name=\"visibility\" \n" +
    "                    value=\"private\" \n" +
    "                    ng-model=\"notebook.visibility\">\n" +
    "                <span \n" +
    "                    class=\"pnd-icon pnd-icon-lock\"></span> \n" +
    "                Private\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- message-->\n" +
    "    <div \n" +
    "        class=\"pnd-notebook-saving-content\" \n" +
    "        ng-if=\"saving\">\n" +
    "        <span class=\"pnd-icon {{savingIcon}} pnd-icon-2x\"></span>\n" +
    "        <span class=\"{{shortMessageClass}}\">\n" +
    "            {{shortMessagge}}\n" +
    "        </span>\n" +
    "        {{textMessage}}\n" +
    "    </div>\n" +
    "    <!-- // end message-->\n" +
    "\n" +
    "</div> \n" +
    "<!-- end pnd-panel-tab-content-content -->\n" +
    "\n" +
    "<!-- FOOTER -->\n" +
    "<div class=\"pnd-panel-tab-content-footer\">\n" +
    "    <button\n" +
    "        class=\"pnd-btn pnd-btn-small\"\n" +
    "        ng-class=\"{disabled: notebook.name == ''}\"\n" +
    "        ng-click=\"clear(true)\">\n" +
    "        Reset\n" +
    "    </button><button\n" +
    "        class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "        ng-if=\"!editMode\" \n" +
    "        ng-class=\"{disabled: notebook.name == ''}\" \n" +
    "        ng-click=\"save()\">\n" +
    "        Save\n" +
    "    </button><button\n" +
    "        class=\"pnd-btn pnd-btn-small pnd-btn-calltoaction\"\n" +
    "        ng-if=\"editMode\" \n" +
    "        ng-class=\"{disabled: notebook.name == ''}\" \n" +
    "        ng-click=\"edit()\">\n" +
    "        Save\n" +
    "    </button>\n" +
    "</div> \n" +
    "<!-- end pnd-panel-tab-content-footer -->");
}]);

angular.module("src/Tools/TripleComposer/ClientTripleComposer.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Tools/TripleComposer/ClientTripleComposer.tmpl.html",
    "<triple-composer tc-name=\"'dashboardTripleComposer'\"></triple-composer>");
}]);

angular.module("src/Tools/TripleComposer/Statement.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Tools/TripleComposer/Statement.dir.tmpl.html",
    "<div class=\"pnd-statement-row clearfix\">\n" +
    "    <div class=\"pnd-statement-widget\">\n" +
    "\n" +
    "        <!-- Subject -->\n" +
    "        <div class=\"pnd-statement-subject\">\n" +
    "            <div>\n" +
    "                <!-- Subject buttons -->\n" +
    "                <div class=\"pnd-row-button-subject\" ng-if=\"!subjectFound\">\n" +
    "                    <span \n" +
    "                        ng-if=\"templateMode\"\n" +
    "                        class=\"pnd-statement-label pnd-statement-subject-text pnd-statement-tmpl-mode\">\n" +
    "                            Select some text on the page\n" +
    "                    </span>\n" +
    "                    <span\n" +
    "                        ng-if=\"!templateMode\" \n" +
    "                        class=\"pnd-statement-label\" \n" +
    "                        ng-click=\"onClickSubject($event)\">\n" +
    "                            Add a subject\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <div \n" +
    "                    class=\"pnd-row-button-subject pnd-statement-found\"\n" +
    "                    ng-class=\"{'pnd-statement-icon-one': !templateMode && !subjectFixed}\"\n" +
    "                    ng-if=\"subjectFound\">\n" +
    "                    <span \n" +
    "                        class=\"pnd-statement-label\" \n" +
    "                        ng-mouseover=\"onSubjectMouseOver()\" \n" +
    "                        ng-mouseleave=\"onItemMouseOut()\"\n" +
    "                        ng-click=\"onClickSubject($event)\">\n" +
    "                            {{subjectLabel}}\n" +
    "                    </span>\n" +
    "\n" +
    "                    <div class=\"pnd-row-button-rightbuttons\">\n" +
    "                        <button\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn-link\"\n" +
    "                                ng-if=\"!templateMode && !subjectFixed\"\n" +
    "                                title=\"delete\"\n" +
    "                                ng-click=\"wipeSubject()\">\n" +
    "                            <span class=\"pnd-icon pnd-icon-trash\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <!-- <span>\n" +
    "                        {{subjectTypeLabel}}\n" +
    "                    </span> -->\n" +
    "                </div>\n" +
    "                <!-- // end Subject buttons -->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Predicate -->\n" +
    "        <div class=\"pnd-statement-predicate\">\n" +
    "            <div>\n" +
    "                <!-- Predicate Buttons div (not found)-->\n" +
    "                <div\n" +
    "                    class=\"pnd-row-button-predicate\"\n" +
    "                    ng-if=\"!predicateFound\">\n" +
    "                        <span \n" +
    "                            class=\"pnd-statement-label\" \n" +
    "                            ng-click=\"onClickPredicate($event)\">\n" +
    "                                Add a predicate\n" +
    "                        </span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Predicate buttons (found) -->\n" +
    "                <div class=\"pnd-row-button-predicate pnd-statement-found\" ng-if=\"predicateFound\">\n" +
    "                    <span \n" +
    "                        class=\"pnd-statement-label\" \n" +
    "                        ng-mouseover=\"onPredicateMouseOver()\" \n" +
    "                        ng-mouseleave=\"onItemMouseOut()\"\n" +
    "                        ng-click=\"onClickPredicate($event)\">\n" +
    "                            {{predicateLabel}}\n" +
    "                    </span>\n" +
    "\n" +
    "                    <div class=\"pnd-row-button-rightbuttons\">\n" +
    "                        <button\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn-link\"\n" +
    "                                ng-if=\"!predicateFixed\"\n" +
    "                                title=\"delete\"\n" +
    "                                ng-click=\"wipePredicate()\">\n" +
    "                            <span class=\"pnd-icon pnd-icon-trash\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- // end Predicate buttons -->            \n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Object -->\n" +
    "        <div class=\"pnd-statement-object\">\n" +
    "            <div>\n" +
    "                <!-- Object buttons !found -->\n" +
    "                <div\n" +
    "                    class=\"pnd-row-button-object\"\n" +
    "                    ng-if=\"!objectFound\"\n" +
    "                    ng-class=\"{\n" +
    "                        'pnd-statement-mandatory-object':isMandatory && templateMode,\n" +
    "                        'pnd-statement-icon-one': !canBeObjectLiteral && canBeObjectDate || !canBeObjectDate && canBeObjectLiteral,\n" +
    "                        'pnd-statement-icon-two': canBeObjectDate && canBeObjectLiteral\n" +
    "                    }\">\n" +
    "                    <span\n" +
    "                        class=\"pnd-statement-label\"\n" +
    "                        ng-click=\"onClickObject($event)\">\n" +
    "                            Add an object<span ng-show=\"templateMode && isMandatory\">*</span>\n" +
    "                    </span>\n" +
    "\n" +
    "                    <div \n" +
    "                        class=\"pnd-row-button-rightbuttons\">\n" +
    "                        <!--Calendar Icon-->\n" +
    "                        <button\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn-link\"\n" +
    "                                ng-if=\"canBeObjectDate\"\n" +
    "                                ng-click=\"onClickObjectCalendar($event)\"\n" +
    "                                title=\"calendar\">\n" +
    "                            <span class=\"pnd-icon pnd-icon-calendar\"></span>\n" +
    "                        </button>\n" +
    "                        <!--Pen Icon-->\n" +
    "                        <button\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn-link\"\n" +
    "                                ng-if=\"canBeObjectLiteral\"\n" +
    "                                ng-click=\"onClickObjectLiteral($event)\"\n" +
    "                                title=\"text\">\n" +
    "                            <span class=\"pnd-icon pnd-icon-pencil\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Object buttons found -->\n" +
    "                <div \n" +
    "                    class=\"pnd-row-button-object pnd-statement-found\"\n" +
    "                    ng-class=\"{'pnd-statement-icon-one': !templateMode || !objectFixed}\"\n" +
    "                    ng-if=\"objectFound\">\n" +
    "                    <span \n" +
    "                        class=\"pnd-statement-label\"\n" +
    "                        ng-mouseover=\"onObjectMouseOver()\" \n" +
    "                        ng-mouseleave=\"onItemMouseOut()\"\n" +
    "                        ng-click=\"onClickObject($event)\"\n" +
    "                        ng-if=\"!dateWithTime\">\n" +
    "                        {{objectLabel}}\n" +
    "                    </span>\n" +
    "                    <span \n" +
    "                        class=\"pnd-statement-label\"\n" +
    "                        ng-mouseover=\"onObjectMouseOver()\" \n" +
    "                        ng-mouseleave=\"onItemMouseOut()\"\n" +
    "                        ng-click=\"onClickObject($event)\"\n" +
    "                        ng-if=\"dateWithTime\">\n" +
    "                        {{objectLabel | amDateFormat:'YYYY-MM-DD  HH:mm'}}\n" +
    "                    </span>\n" +
    "\n" +
    "                    <div \n" +
    "                        class=\"pnd-row-button-rightbuttons\">\n" +
    "                        <button\n" +
    "                                type=\"button\"\n" +
    "                                class=\"pnd-btn-link\"\n" +
    "                                ng-if=\"!objectFixed\"\n" +
    "                                title=\"delete\"\n" +
    "                                ng-click=\"wipeObject()\">\n" +
    "                            <span class=\"pnd-icon pnd-icon-trash\"></span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!-- // end Object buttons -->\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div><!-- // end widget -->\n" +
    "\n" +
    "    <!-- Right buttons -->\n" +
    "    <div class=\"pnd-statement-buttons\">\n" +
    "        <button \n" +
    "            type=\"button\" \n" +
    "            ng-click=\"showDropdown($event)\"\n" +
    "            title=\"Triple menu\"\n" +
    "            ng-disabled=\"templateMode\">\n" +
    "                <span class=\"pnd-icon pnd-icon-dots\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/Tools/TripleComposer/TripleComposer.dir.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/Tools/TripleComposer/TripleComposer.dir.tmpl.html",
    "<!-- Header -->\n" +
    "<div class=\"pnd-panel-tab-content-header pnd-panel-tab-content-header-border\"\n" +
    "     ng-show=\"showHeader()\">\n" +
    "    <h1>\n" +
    "        {{headerMessage}}\n" +
    "    </h1>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Content -->\n" +
    "<div class=\"pnd-panel-tab-content-content\">\n" +
    "    <div \n" +
    "        class=\"pnd-triplecomposer-statements-container pnd-inner-scrollable\" \n" +
    "        ng-hide=\"saving\">\n" +
    "        <statement \n" +
    "            ng-repeat=\"s in statements\" \n" +
    "            id=\"{{s.id}}\" \n" +
    "            duplicated=\"s.scope.duplicated\"></statement>\n" +
    "    </div>\n" +
    "\n" +
    "    <div \n" +
    "        class=\"pnd-triplecomposer-saving-content\" \n" +
    "        ng-if=\"saving\">\n" +
    "        <span \n" +
    "            class=\"pnd-icon {{savingIcon}} pnd-icon-3x\"></span>\n" +
    "        <span \n" +
    "            class=\"{{shortMessageClass}}\">{{shortMessagge}}</span>\n" +
    "        {{textMessage}}\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Footer -->\n" +
    "<div class=\"pnd-panel-tab-content-footer\"\n" +
    "     ng-show=\"showFooter()\">\n" +
    "    <!-- TODO: use ng-disabled -->\n" +
    "    <button\n" +
    "        class=\"pnd-triplecomposer-cancel pnd-btn pnd-btn-small\"\n" +
    "        ng-if=\"editMode\"\n" +
    "        ng-click=\"cancel()\">\n" +
    "        Cancel\n" +
    "    </button>\n" +
    "    <button\n" +
    "        class=\"pnd-triplecomposer-cancel pnd-btn pnd-btn-small\"\n" +
    "        ng-if=\"!editMode\"\n" +
    "        ng-disabled=\"!isAnnotationErasable()\"\n" +
    "        ng-click=\"resetComposer()\">\n" +
    "        Reset\n" +
    "    </button><button\n" +
    "        class=\"pnd-triplecomposer-save pnd-btn pnd-btn-small pnd-btn-calltoaction disabled\"\n" +
    "        ng-hide=\"editMode\" \n" +
    "        ng-click=\"saveAnnotation()\">\n" +
    "        Save annotation\n" +
    "    </button><button\n" +
    "        class=\"pnd-triplecomposer-save pnd-btn pnd-btn-small pnd-btn-calltoaction disabled\"\n" +
    "        ng-show=\"editMode\" \n" +
    "        ng-click=\"editAnnotation()\">\n" +
    "        Update Annotation\n" +
    "    </button>\n" +
    "    <!-- <button class=\"pnd-triplecomposer-add-blank btn btn-info btn-xs pnd-btn-full\" ng-hide=\"templateMode\" ng-click=\"onClickAddStatement()\">Add blank statement</button> -->\n" +
    "</div>");
}]);
