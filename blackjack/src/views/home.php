<div class="container home">


    <section id="mainTable">

        <div class="row dealer">
            <h2>Dealer</h2>
            <div class="col-xs-12">


                <div class="card1 col-md-1" ng-repeat="data in dealersShownCards">

                    <img ng-src="assets/img/{{data.image}}.png"/>

                    <p>{{data.name}} {{data.suit}} </p>

                </div>
                <h3>Total Card Value: <span class="playersTotal">{{showDealerTotal}}</span></h3>
            </div>


        </div>
        <h1 class="message">{{message}}</h1>
        <div class="row player">
            <h2>Player</h2>
            <div class="col-xs-12">

                <div class="card1 col-md-2" ng-repeat="data in playersShownCards">

                    <img ng-src="assets/img/{{data.image}}.png"/>
                    <p>{{data.name}} {{data.suit}} </p>

                </div>

            </div>

        </div>

        <div class="row bank">

            <div class="col-md-4">
                <h3>Total Card Value: <span class="playersTotal">{{showPlayerTotal}}</span></h3>
            </div>

            <div class="col-md-2">
                <button class="btn btn-lg">Bet Amount: {{betAmount}}</button>
            </div>

            <div class="col-md-4">
                <button class="btn btn-lg">Current Balance: {{startingBalance}}</button>
            </div>

        </div>

        <div class="row buttons">
            <div class="col-md-3">
                <button ng-disabled="betDisabled == 1" class="btn btn-lg" ng-click="startGame(); betDisabled = 1; hitDisabled = 0; standDisabled = 0">Bet</button>
            </div>

            <div class="col-md-3">
                <button class="btn btn-lg" ng-click="hitForCard('Player')" ng-disabled="hitDisabled == 1">Hit
                </button>
            </div>

            <div class="col-md-3">
                <button ng-disabled="standDisabled == 1" class="btn btn-lg" ng-click="stand(); standDisabled = 1; hitDisabled = 1; betDisabled = 0">Stand</button>
            </div>

            <div class="col-md-3">
                <button class="btn btn-lg" ng-click="getNewDeck()">New Deck</button>
            </div>

        </div>

    </section>

<audio ng-src="{{playSound}}" autoplay></audio>
</div>