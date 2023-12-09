# 잔디와 슬랙을 간단하게 웹 훅으로 사용하기 위해서 만든 라이브러리

## 사용설명서

1. 함수 인자에 대한 type

```typescript
  // jandi인지 slack인지 여부
  type: "jandi" | "slack";

  // webhooks의 url을 입력
  urlType: string[];

  // 응답에 대한 제목
  title: string;

  // 응답에 대한 내용
  content: string;

  // 응답에 대한 callbakc으로 필요한지 여부
  callback?: (res: Response) => {};
```

2. 사용 설명서

```javascript
webhooksSendMessage({
  type: "jandi",
  urlType: ["https://wh.jandi.com/connect-api/webhook/<webhooks>"],
  title: "message",
  content: "submessage",
});
```
