window.addEventListener('load', () => {
   const hour = document.querySelector(".hour>span");
   const minute = document.querySelector(".minute>span");
   const second = document.querySelector(".second>span");
   const running = document.querySelector(".running>span");
   const paused = document.querySelector(".paused>span");
   const toast = document.querySelector(".toast");

   const getTime = () => {
      // 获取当前的时间
      const nowTime = new Date();
      // 获取当前的小时
      const hours = nowTime.getHours();
      // 更新页面的时间 所有都是小于10前面加个0小时 分钟同理
      hour.innerHTML = hours < 10 ? "0" + hours : hours;
      // 获取当前的分钟
      const minutes = nowTime.getMinutes();
      minute.innerHTML = minutes < 10 ? "0" + minutes : minutes;
      // 获取当前的秒钟
      const seconds = nowTime.getSeconds();
      second.innerHTML = seconds < 10 ? "0" + seconds : seconds;
   };
   getTime();

   // 定义定时器 更新时间
   let timer = setInterval(() => {
      getTime();
   }, 1000)

   // 定义一个变量 控制定时器是否需要开启 若同时开启多个则无法关闭
   let flag = false;

   let opacity = 0;

   // 定义一个函数来弹出提示框
   const showToast = () => {
      const toastTimer = setInterval(() => {
         opacity += 0.1;
         toast.style.opacity = opacity;
         if (opacity >= 1) {
            setTimeout(() => {
               opacity = 0;
               toast.style.opacity = opacity;
               clearInterval(toastTimer);
            }, 1500);
         }
      }, 30)
   };

   paused.addEventListener('click', () => {
      toast.innerHTML = '时钟已经暂停~';
      showToast();

      clearInterval(timer);
      // 暂停之后 就赋新值给flag
      flag = true;
   });

   running.addEventListener('click', () => {
      if (flag == true) {
         toast.innerHTML = "时钟已经开启~"
         showToast();

         timer = setInterval(() => {
            getTime();
         }, 1000)
         flag = false;
      } else {
         // 如果时钟已经开启 就提示已经开启
         toast.innerHTML = "时钟已经在开启状态~";
         showToast();
      }
   })
})