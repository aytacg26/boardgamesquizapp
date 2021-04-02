window.onload = async () => {
  console.error('Document Object Model  Manipulation Error');
  const timer = document.querySelector('#restart-count');
  let counter = 5;
  timer.innerHTML = counter;
  const countDown = setInterval(() => {
    counter--;
    timer.innerHTML = counter;

    if (counter === 0) {
      location.replace('/');
      clearInterval(countDown);
    }
  }, 1000);
};
