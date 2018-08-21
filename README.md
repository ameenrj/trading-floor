# trading-floor

## Problem

A user needs a simple web application to allow them to manage a fake stock portfolio and balance. Real stock data 
should be used, fetched from service such as Alpha Vantage or Quandl. At a minimum, the user needs to be able to add and 
withdraw funds and buy and sell stocks. A database is not required, however data should persist across state refreshes.

## Proposed Solution

Meteor - a full-stack Javascript framework - and AngularJS will be used to create the web app. Meteor has been chosen
because it allows for rapid prototyping. Benefits include quick-setup, cross-platform code, uses entirely JavaScript, 
in-memory MongoDB instance, easy deployment, etc. (See more: https://www.meteor.com/, http://whymeteor.com/).

Alpha Vantage has been chosen as the stock information provider as it has less limitations than Quandl. Quandl has 
recently taken down some free apis and may take down more in the near future (See more: 
https://backtest-rookies.com/2018/04/20/replacing-quandl-wiki-data-with-alpha-vantage/). Additionally, Alpha Vantage
provides a batch fetch API to grab up to 50 stocks at once - a feature hard to come by nowadays. A single GET request
is needed to fetch up to 50 stocks as opposed to 50 individual ones (albeit it does return less detailed data - not an 
issue for the problem being solved here however).

## Assumptions

- To be completed in 6-8 hours
- Stock can be bought in units of up to three decimal places (0.001 increments)
- US only stocks are enough
- Data does not need to persist across server restarts and thus a database is not needed

## Installation and Running the app

Using: Meteor 1.7.0.4

First, clone the project:
```
git clone --recursive git@github.com:ameenrj/trading-floor.git
```
Then cd into the directory of the project:
```
cd trading-floor
```

You will need your own Alpha Vantage API key to retrieve stocks. Get one here 
https://www.Alpha Vantage.co/support/#api-key and then add your key to the apikeyQuery in *imports\api\Alpha Vantage.js*.

Finally, run the app:
```
meteor run
```

## Concerns

- Currently there are no error messages shown to the user!! e.g. Insufficient funds to purchase, insufficient funds to 
withdraw, no recognised stock symbol when buying or selling, unable to fetch stocks, loading indicator while fetching 
stocks *TODO:* Show error messages to the user
-Initially using the $parent scope to store the fetched stock data seems like a worthwhile shortcut however it caused 
more headaches than it was worth. Additionally, using $parent scope tightly couples the code/components together as the 
child is dependant on the parent and not a truly reusable component. Proper method would have been to inject a 
service containing the data needed into the various components. *TODO:* Implement service containing stock data to be 
injected
- Under the current implementation, the stock list is only updated on a page refresh rather than at a reasonable 
interval (e.g. every minute - of course, real world stock data is sensitive to milliseconds). *TODO:* Implement interval
requests to fetch stock data
- Also under the current implementation, the prices of assets in the user's asset list is not updated with newly 
fetched stock prices. Solution would be to either call an update method and loop through the list to update the 
prices, or perhaps better - to share the same data source as the stock list and thus does not need manual updating 
*TODO:*: Fix out of date prices
- There is no unit testing..! *TODO:* Add unit tests

## Known bugs/"bugs"

- Under some cases it is impossible to withdraw the last cent of the user's balance (most likely something to do with 
the decimal place restrictions imposed on the withdraw input vs. the true balance rather than the formatted balance 
shown on the screen)
- No error messages shown to the user
- UI not fully responsive to resizing the window, notably the buy/sell stock rows