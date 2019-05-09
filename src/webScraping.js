const https = require("https");
const util = require("util");
const jsdom = require("jsdom");
const jquery = require("jquery");

// 対象URL
const url = "https://www.uec.ac.jp/";

// スクレイピングする処理
function get_entry_titles(page){
    return new Promise((resolve) => {
        // httpsリクエスト
        const req = https.get(util.format(url, page), (res) =>{
            var html = "";
            res.setEncoding('utf8');
            res.on('data',(chunk) => html += chunk);
            res.on('end',() => {
                const dom = new jsdom.JSDOM(html);
                const $ = (jquery)(dom.window);

                // スクレイプしたい処理をJQueryで記述
                $(".foo").each((index, element) =>{
                    // スクレイプ結果を出力
                    console.log(util.format("%s\t%s\t%s"),
                        page,
                        $(element).find(".bar").attr("href"),
                        $(element).find(".hoge".text()));
                });
                // ここで処理完了なのでresolve
                resolve();
            });
        });
        req.end();
    });
}

// メインのループ処理（ページ数分繰り返し）async関数にする
async function main(){
    // 1～9ページ繰り返す
    for(var page = 1; page < 10; page++){
        // awaitを付けて、１ページづづ同期する。じゃないとページ数だけが先にインクリメントされてしまう。
        await get_entry_titles(page);
    }
}

// 処理エントリ
main();