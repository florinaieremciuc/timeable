const CreateUser = document.querySelector(".CreateUser");
CreateUser.addEventListener("submit", e => {
  e.preventDefault();
  const username = CreateUser.querySelector(".username").value;
  const password = CreateUser.querySelector(".password").value;
  post("/createUser", { username, password });
});

const Login = document.querySelector(".Login");
Login.addEventListener("submit", e => {
  e.preventDefault();
  const username = Login.querySelector(".username").value;
  const password = Login.querySelector(".password").value;
  post("/login", { username, password }).then(({ status }) => {
    console.log("ia un status AARRRGH", status);
    if (status === 200) alert("Login success");
    else alert("Login failed");
  });
});

const post = (path, data) => {
  return window.fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};
