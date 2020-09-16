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

// 判断el dom对象中是否有 className类名
export function hasClass(el, className){
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
  //判断该dom节点是否有该className
  return reg.test(el.className)
}

/**
 * @param {*} el 节点
 * @param {*} name 属性名称
 * @param {*} val 值
 * 若传入val则给el节点设置name属性且赋值为val
 * 若不传则获取el节点为name的属性的值
 */
export function getData (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}