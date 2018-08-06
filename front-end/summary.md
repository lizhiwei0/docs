
#前端优化

##前端性能指标
 * 首字节时间   首字节时间是从发起请求到 得到的一个字节响应的时. 是体现网络和服务器性能的一个重要指标
 * 首屏时间     发起请求到首屏有效渲染出现的时间 也是指代开一个页面的白屏时间. 如果白屏时间太长对用户体验来讲是不可忍受的
 * DomReady时间  dom全部加载完毕的时间
 * loaded 时间 页面全部加载完毕的时间
 
  
针对这个性能指标 客户端和服务器端应该针对性的进行优化尽量缩短这些时间

 * 针对首字节 的优化 手段 
   + DNS 服务将用户请求就近分发到最近的服务器
   + CDN 服务 将静态资源发布到 客户密集的地区,这样客户端可以就近访问
   + DNS 预解析 DNS解析时间也会包含在 首字节时间里,可以先启动后台进程 预解析 DNS,这样就可以省去DNS解析时间
   
 * 首屏时间
   + 将页面针对性的分成首屏区域和非首屏区域,首屏区域尽量用精简的内容.
   + 精简压缩 js/css文件, 精简压缩js和css能够减少传输数量
   + 合并图片资源   图片合并能够减少请求数, 每个请求都是一个TCP的链接,而TCP为了避免拥塞使用慢启动的方式,所以当请求数量很多的时候会造成很多链接,都用比较慢的网速去请求数据性能比较差
   
  * domready 时间
   + 精简dom数量
   + 减少dom操作
   
   * loaded 时间
    +减少cookie数量
    +精简 压缩js/css文件
    +合并图片资源
   
   ###服务器端:
    * 服务器端渲染 对于主要页面可以在服务器端渲染完毕,然后cache住,客户端请求是只要拿渲染完毕的页面,无需本地渲染. (template 渲染成html)
    * 增加并发连接数支持
    * 保证带宽
    
    
    
    
   
  
