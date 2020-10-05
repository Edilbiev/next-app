import uuid from "short-uuid";

export default function save(req, res) {
  if (req.method === "POST") {
    //забираем только нужные ключи, вместо того, чтобы весь req.body
    //пересылать на сервер
    const { name, mail, phone } = req.body;

    fetch("http://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token-access": uuid.generate(),
      },

      body: JSON.stringify({ name, mail, phone }),
    }).then(() => {
      //в случайном порядке возвращаем true или false,
      //чтобы проверить оба варианта ответа на фронтенде
      return res.json({
        success: Boolean(Math.random() > 0.5),
      });
    });
  }
}
