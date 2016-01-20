<div class="container home">
    <h1>BlackJack</h1>


    <section id="mainTable">

        <div class="row dealer">
            <h2>Dealer</h2>
            <div class="col-xs-12">


                <div class="card1 col-md-2" ng-repeat="data in dealersShownCards">

                    <img ng-src="assets/img/{{data.image}}.png"/>

                    <p>{{data.name}} {{data.suit}} </p>

                </div>

            </div>


        </div>
        <h1>

            {{message}}</h1>
        <div class="row player">
            <h2>Player</h2>
            <div class="col-xs-12">

                <div class="card1 col-md-2" ng-repeat="data in playersShownCards">

                    <img ng-src="assets/img/{{data.image}}.png"/>
                    <p>{{data.name}} {{data.suit}} </p>

                </div>


            </div>
            <div class="col-xs-12">
                <div class="col-md-2">
                    <h3>Value of Cards: {{showPlayerTotal}}</h3><span></span>
                </div>
            </div>
        </div>

        <div class="row bank">
            <br/>
            <br/>
            <div class="col-md-8">
                <button class="btn btn-lg">Bet Amount: {{betAmount}}</button>
            </div>

            <div class="col-md-4">
                <button class="btn btn-lg">Current Balance: {{startingBalance}}</button>
            </div>

        </div>

        <div class="row buttons">
            <div class="col-md-3">
                <button ng-disabled="betChange == 1" class="btn btn-lg" ng-click="startGame()">Bet</button>
            </div>

            <div class="col-md-3">
                <button class="btn btn-lg" ng-click="hitForCard('Player')" ng-disabled="buttonDisabled == 1">Hit
                </button>
            </div>

            <div class="col-md-3">
                <button class="btn btn-lg" ng-click="stand()">Stand</button>
            </div>

            <div class="col-md-3">
                <button class="btn btn-lg" ng-click="getNewDeck()">New Deck</button>
            </div>

        </div>

    </section>


</div>