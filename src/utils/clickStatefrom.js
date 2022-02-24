export default {
  install(Vue) {
    // 防止重复点击
    Vue.directive('preventClick', {
      inserted(el) {
        el.addEventListener('click', () => {
          console.log(el);

          if (!el.disabled) {
            el.style.backgroundColor = '#ccc';
            el.style.borderColor = '#ccc';
            el.disabled = true;
            setTimeout(() => {
              el.style.backgroundColor = '#3d81fa';
              el.style.borderColor = '#3d81fa';
              el.disabled = false
            }, 3000)
          }
        })
      }
    })
  }
}