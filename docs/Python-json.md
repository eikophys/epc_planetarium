# Python3を用いたJSON APIの読み込み
Pyrhon3を用いてWikipediaのJsonAPIを読もうとしたのですが、ちょっとだけ詰まったので、対処法を記録しておきます。  

今回はGoogle Colaboratelyを利用してコードを実行します。

``` Python
import requests

param = {
    "action": "parse",
    "pageid": "10007",
    "format": "json"
}
url = 'http://ja.wikipedia.org/w/api.php?'

session = requests.Session()
readObj = session.get(url=url, params=param)
json = readObj.json()

print(json)
```

URLを開くためのライブラリをライブラリ（rquests）を利用します。  

[WikipediaのAPIドキュメント](https://www.mediawiki.org/wiki/API:Main_page/ja)によればエンドポイントURLは`http://ja.wikipedia.org/w/api.php?`ですね。