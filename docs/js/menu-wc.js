'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">ias-display documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/ActionsModule.html" data-type="entity-link">ActionsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' : 'data-target="#xs-components-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' : 'id="xs-components-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' }>
                                        <li class="link">
                                            <a href="components/AckButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AckButtonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AckComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AckComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AckTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AckTreeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ButtonsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ShelveButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShelveButtonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ShelveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShelveComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WikiButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WikiButtonComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' : 'data-target="#xs-injectables-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' : 'id="xs-injectables-links-module-ActionsModule-b437de4a7c748645a2645186d05e85ae"' }>
                                        <li class="link">
                                            <a href="injectables/SidenavService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SidenavService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AntennasModule.html" data-type="entity-link">AntennasModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' : 'data-target="#xs-components-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' : 'id="xs-components-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' }>
                                        <li class="link">
                                            <a href="components/AntennaMarkerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AntennaMarkerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AntennasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AntennasComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AntennasMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AntennasMapComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AntennasSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AntennasSidebarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AntennasSummaryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AntennasSummaryComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' : 'data-target="#xs-injectables-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' : 'id="xs-injectables-links-module-AntennasModule-d6db8fe21c9a0277489a23a5863e0e68"' }>
                                        <li class="link">
                                            <a href="injectables/AntennasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AntennasService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-69f1ad961777333ef72163b52a97477a"' : 'data-target="#xs-components-links-module-AppModule-69f1ad961777333ef72163b52a97477a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-69f1ad961777333ef72163b52a97477a"' : 'id="xs-components-links-module-AppModule-69f1ad961777333ef72163b52a97477a"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' : 'data-target="#xs-components-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' : 'id="xs-components-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' }>
                                        <li class="link">
                                            <a href="components/MaterialSandboxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaterialSandboxComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' : 'data-target="#xs-injectables-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' : 'id="xs-injectables-links-module-AppRoutingModule-68e70bf2fe269074ce291fbe19105f37"' }>
                                        <li class="link">
                                            <a href="injectables/RoutingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>RoutingService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AuthModule-0a0a613776097a5098351fded293e185"' : 'data-target="#xs-components-links-module-AuthModule-0a0a613776097a5098351fded293e185"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AuthModule-0a0a613776097a5098351fded293e185"' : 'id="xs-components-links-module-AuthModule-0a0a613776097a5098351fded293e185"' }>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DataModule.html" data-type="entity-link">DataModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-DataModule-c1072bf5b5941ba70075a069d6d279f2"' : 'data-target="#xs-injectables-links-module-DataModule-c1072bf5b5941ba70075a069d6d279f2"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-DataModule-c1072bf5b5941ba70075a069d6d279f2"' : 'id="xs-injectables-links-module-DataModule-c1072bf5b5941ba70075a069d6d279f2"' }>
                                        <li class="link">
                                            <a href="injectables/AlarmService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AlarmService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CdbService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CdbService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpClientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>HttpClientService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UserService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HealthModule.html" data-type="entity-link">HealthModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HealthModule-270e23a79a29a53bd3af0dd1bdc19a94"' : 'data-target="#xs-components-links-module-HealthModule-270e23a79a29a53bd3af0dd1bdc19a94"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HealthModule-270e23a79a29a53bd3af0dd1bdc19a94"' : 'id="xs-components-links-module-HealthModule-270e23a79a29a53bd3af0dd1bdc19a94"' }>
                                        <li class="link">
                                            <a href="components/HealthSummaryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthSummaryComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/IasMaterialModule.html" data-type="entity-link">IasMaterialModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MapModule.html" data-type="entity-link">MapModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' : 'data-target="#xs-components-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' : 'id="xs-components-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' }>
                                        <li class="link">
                                            <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' : 'data-target="#xs-injectables-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' : 'id="xs-injectables-links-module-MapModule-af6481fb19667ef768e448db685dd52b"' }>
                                        <li class="link">
                                            <a href="injectables/MapService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MapService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/OverviewModule.html" data-type="entity-link">OverviewModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-OverviewModule-ce59d4fa6379aed415518aff66aa0cf0"' : 'data-target="#xs-components-links-module-OverviewModule-ce59d4fa6379aed415518aff66aa0cf0"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-OverviewModule-ce59d4fa6379aed415518aff66aa0cf0"' : 'id="xs-components-links-module-OverviewModule-ce59d4fa6379aed415518aff66aa0cf0"' }>
                                        <li class="link">
                                            <a href="components/OverviewCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OverviewCardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/OverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OverviewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SharedModule-dcb961e5e14c1f9e5fcfe8d8f83f24eb"' : 'data-target="#xs-components-links-module-SharedModule-dcb961e5e14c1f9e5fcfe8d8f83f24eb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SharedModule-dcb961e5e14c1f9e5fcfe8d8f83f24eb"' : 'id="xs-components-links-module-SharedModule-dcb961e5e14c1f9e5fcfe8d8f83f24eb"' }>
                                        <li class="link">
                                            <a href="components/AlarmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlarmComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AlarmHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlarmHeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/StatusViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatusViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TabularModule.html" data-type="entity-link">TabularModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TabularModule-a7f1e2a42f9f4eee931bca138571a919"' : 'data-target="#xs-components-links-module-TabularModule-a7f1e2a42f9f4eee931bca138571a919"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TabularModule-a7f1e2a42f9f4eee931bca138571a919"' : 'id="xs-components-links-module-TabularModule-a7f1e2a42f9f4eee931bca138571a919"' }>
                                        <li class="link">
                                            <a href="components/LegendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LegendComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TabularViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabularViewComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/WeatherModule.html" data-type="entity-link">WeatherModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' : 'data-target="#xs-components-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' : 'id="xs-components-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' }>
                                        <li class="link">
                                            <a href="components/WeatherBackupWsMarkerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherBackupWsMarkerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherDataMarkerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherDataMarkerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherMapComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherPrimaryWsConnectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherPrimaryWsConnectorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherPrimaryWsMarkerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherPrimaryWsMarkerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherSidebarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherStationSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherStationSidebarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WeatherSummaryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WeatherSummaryComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' : 'data-target="#xs-injectables-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' : 'id="xs-injectables-links-module-WeatherModule-047e8a8774421509257e921b7a984d08"' }>
                                        <li class="link">
                                            <a href="injectables/WeatherService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>WeatherService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Alarm.html" data-type="entity-link">Alarm</a>
                    </li>
                    <li class="link">
                        <a href="classes/AlarmImageSet.html" data-type="entity-link">AlarmImageSet</a>
                    </li>
                    <li class="link">
                        <a href="classes/AlarmItemFlatNode.html" data-type="entity-link">AlarmItemFlatNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/AlarmItemNode.html" data-type="entity-link">AlarmItemNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/AlarmSounds.html" data-type="entity-link">AlarmSounds</a>
                    </li>
                    <li class="link">
                        <a href="classes/AntennaConfig.html" data-type="entity-link">AntennaConfig</a>
                    </li>
                    <li class="link">
                        <a href="classes/Iasio.html" data-type="entity-link">Iasio</a>
                    </li>
                    <li class="link">
                        <a href="classes/WeatherStationConfig.html" data-type="entity-link">WeatherStationConfig</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthLoginGuard.html" data-type="entity-link">AuthLoginGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/TimeoutOption.html" data-type="entity-link">TimeoutOption</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/User.html" data-type="entity-link">User</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
