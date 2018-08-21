import { Meteor } from 'meteor/meteor';

const STOCK_QUOTES = "Stock Quotes";
const baseUrl = 'https://www.alphavantage.co';
const batchStockQuery = '/query?function=BATCH_STOCK_QUOTES';
const symbolsQuery = '&symbols=AAPL,GOOGL,MSFT,AMZN,FB,JPM,JNJ,XOM,BAC,WFC';
/**
 * ADD YOUR API KEY HERE
 */
// TODO: Get apikey from environment variables
const apikeyQuery = '&apikey=ADDYOURAPIKEYHERE';

if (Meteor.isServer) {
    Meteor.methods({
        'stocks.get': function () {
            const url = baseUrl + batchStockQuery + symbolsQuery + apikeyQuery;
            let result = HTTP.get(url);
            if(result.statusCode === 200) {
                // TODO: Return a simple object containing only the data we need/with less annoying keys
                return result.data[STOCK_QUOTES];
            } else {
                const errorJson = JSON.parse(result.content);
                // TODO: Handle error properly
                throw new Meteor.Error(result.statusCode, errorJson.error);
            }
        }
    });
}
