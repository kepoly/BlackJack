<div class="container home">
    <h1>BlackJack</h1>


    <section id="mainTable">

        <div class="row dealer">
<h2>Dealer</h2>
            <div class="col-xs-12">


                <div class="card1 col-md-3">
                    <img src="img/{{dealersCard1}}.png" />
                    {{dealersCard1Value}}

                </div>
                <div class="card2 col-md-3">
                    <img src="img/{{dealersCard2}}.png" />
                    {{dealersCard2Value}}
                </div>


            </div>


        </div>
        <h1>

{{message}}</h1>
        <div class="row player">
<h2>Player</h2>
            <div class="col-xs-12">


                <div class="card1 col-md-2">
                    <img src="img/{{playersCard1}}.png" />
                    {{playersCard1Value}}

                </div>
                <div class="card2 col-md-2">
                    <img src="img/{{playersCard2}}.png" />
                    {{playersCard2Value}}
                </div>
                <div class="card3 col-md-2">
                    <img src="img/{{playersHitCards[0]}}.png" />
                    {{playersHitCardsValues[0]}}
                </div>
                <div class="card4 col-md-2">
                    <img src="img/{{playersHitCards[1]}}.png" />
                    {{playersHitCardsValues[1]}}
                </div>
                <div class="card5 col-md-2">
                    <img src="img/{{playersHitCards[2]}}.png" />
                    {{playersHitCardsValues[2]}}
                </div>
                <div class="card6 col-md-2">
                    <img src="img/{{playersHitCards[3]}}.png" />
                    {{playersHitCardsValues[3]}}
                </div>

            </div>
            <div class="col-xs-12">
                <div class="col-md-2">
                    <h3>Value of Cards:</h3><span> {{playersCard1Value + playersCard2Value + (playersHitCardsValues | sumByArray)}}</span>
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
                <button ng-disabled="betChange == 1" class="btn btn-lg" ng-click="betAndStart(); betChange = 1;">Bet</button>
            </div>

            <div class="col-md-2">
                <button class="btn btn-lg" ng-click="playerHits()" ng-disabled="buttonDisabled == 1">Hit</button>
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