const post = (path, data) =>
  window.fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
const get = path =>
  window
    .fetch(path)
    .then(response => response)
    .catch(err => err);
const OrgList = document.querySelector('.organization');

OrgList.addEventListener('onload', (e) => {
  e.preventDefault();
  get('/');
});
// const posts = get("/organizations");
// console.log("...", posts);
// console.log("...", posts.resolve());

const CreateOrg = document.querySelector('.CreateOrg');
CreateOrg.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = CreateOrg.querySelector('.name').value;
  console.log('check', name);
  post('/organizations/create_organization', { name });
});

const CreateUser = document.querySelector('.CreateUser');
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = CreateUser.querySelector('.username').value;
  const password = CreateUser.querySelector('.password').value;
  const first_name = CreateUser.querySelector('.firstname').value;
  const last_name = CreateUser.querySelector('.lastname').value;
  const email = CreateUser.querySelector('.email').value;
  const phone = CreateUser.querySelector('.phone').value;
  post('/users/create_user', {
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
  });
});

const Login = document.querySelector('.Login');
Login.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = Login.querySelector('.username').value;
  const password = Login.querySelector('.password').value;
  post('/users/login', { username, password }).then(({ status }) => {
    if (status === 200) alert('Login success');
    else alert('Login failed');
  });
});
