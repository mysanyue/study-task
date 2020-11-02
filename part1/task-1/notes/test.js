async function a() {
  await b();
  return new Error('error');
}

function b() {
  console.log(1);
}

a().then(res => {
  console.log(2);
}).catch(err => {
  console.log(3);
})
