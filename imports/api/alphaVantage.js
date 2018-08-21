import { Meteor } from 'meteor/meteor';

const STOCK_QUOTES = "Stock Quotes";
const baseUrl = 'https://www.alphavantage.co';
const batchStockQuery = '/query?function=BATCH_STOCK_QUOTES';
const symbols = '&symbols=AAPL,GOOGL,MSFT,AMZN,FB,JPM,JNJ,XOM,BAC,WFC';
/**
 * ADD YOUR API KEY HERE
 */
// TODO: Get apikey from environment variables
const apikey = '&apikey=ADDYOURAPIKEYHERE';

Meteor.methods({
    'stocks.get': function () {
        const url = baseUrl + batchStockQuery + symbols + apikey;
        let result = HTTP.get(url);
        console.log(result.statusCode);
        if(result.statusCode === 200) {
            return result.data[STOCK_QUOTES];
        } else {
            const errorJson = JSON.parse(result.content);
            // TODO: Handle error properly
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }
    }
});