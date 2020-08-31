 //el是dom对象  className是要添加的类名
export function addClass(el, className) {
  //如果有该className则不做操作
  if(hasClass(el, className)){
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className){
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
  //判断该dom节点是否有该className
  return reg.test(el.className)
}