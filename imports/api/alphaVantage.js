import { Meteor } from 'meteor/meteor';

const STOCK_QUOTES = "Stock Quotes";
const url = 'https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=AAPL,GOOGL,MSFT,AMZN&apikey=BVFDAXSS2YD3KD2O';

Meteor.methods({
    'stocks.get': function () {
        let result = HTTP.get(url);
        return result.data[STOCK_QUOTES];

        // HTTP.call('GET', url, (error, result) => {
        //     if ( error ) throw error;
        //     console.log("I ran");
        //     // const jsonResult = JSON.parse(result);
        //     // console.log(error);
        //     return result;
        //     // if (!error) {
        //     //     return result;
        //     // } else {
        //     //     console.log(error);
        //     // }
        // });
    }
});