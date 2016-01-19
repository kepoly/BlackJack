<div class="container home">
    <h1>BlackJack</h1>


    <section id="mainTable">

        <div class="row dealer">
<h2>Dealer</h2>
            <div class="col-xs-12">


                <div class="card1 col-md-2" ng-repeat="data in dealersShownCards">

                    <img ng-src="img/{{data.image}}.png" />

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

                    <img ng-src="img/{{data.image}}.png" />
                    <p>{{data.name}} {{data.suit}} </p>

                </div>



            </div>
            <div class="col-xs-12">
                <div class="col-md-2">
                    <h3>Value of Cards:</h3><span></span>
                </div>
            </div>
        </div>

        <div class="row bank">
<br />
            <br />
            <div class="col-md-8">
                <button class="btn btn-lg">Bet Amount: {{betAmount}}</button>
            </div>

            <div class="col-md-4">
                <button class="btn btn-lg">Current Balance: {{startingBalance}}</button>
            </div>

        </div>

        <div class="row buttons">
            <div class="col-md-2">
                <button ng-disabled="betChange == 1" class="btn btn-lg" ng-click="hitForCard('Player')">Bet</button>
            </div>

            <div class="col-md-2">
                <button class="btn btn-lg" ng-click="hitForCard('Player')" ng-disabled="buttonDisabled == 1">Hit</button>
            </div>

            <div class="col-md-2">
                <button class="btn btn-lg">Double</button>
            </div>

            <div class="col-md-2">
                <button class="btn btn-lg">Split</button>
            </div>

            <div class="col-md-2">
                <button class="btn btn-lg" ng-click="doDealer()">Stand</button>
            </div>

            <div class="col-md-2">
                <button ng-disabled="betChange == 0" class="btn btn-lg" ng-click="anotherGame(); betChange = 0;">Rebet</button>
            </div>

        </div>

    </section>


</div>