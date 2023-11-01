# life-game-museum.ts

🎏🎏🎏 TypeScriptでライフゲームを実装してみる！  

## 環境構築

DevContainerに入り、以下のコマンドを実行します。  

```shell
yarn dev
```

## 本番用実行

```shell
docker build -t my-image .
docker run -d --rm -p 8000:80 --name my-container my-image
```
