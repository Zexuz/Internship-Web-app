cd lib/RestApi
browserify -r ./articles/ArticleApi.js:ArticleApi -r ./stats/StatsApi.js:StatsApi -r ./cart/CartApi.js:CartApi -r ./RestApi.js:RestApi > ../../public/lib/RestApi/bundle.js