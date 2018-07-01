
## open API for RMS

*   provide document to lihaiping
*   check email see if there is issue RMS call IRIS

## report page

*   development env*   plugin echart
*   day-on-day week-on-week

## blueprint
* pages to be update
  + 页面趋势， 全站趋势页面重构 风格和整个站点保持一致
  + 新增 任务执行情况统计页面
        - 某个任务 在 某一段时间内 检查URL数据 统计
        - 首屏时间（FMP）， 页面时间（DOM Ready）， 首包时间（TTFB）
  + 新增月度统计 页面
        - 需要根据月度统计的详情来设计页面
  
* issues in iris
  + 邮件通知接入
  + CAT接入
  + apollo接入
* new monthly report
   提供平均数据
    首屏时间， 页面时间， TTFB，页面大小，请求数，domain数，cookie大小等
   
    按地域统计
    首屏时间， 页面时间， TTFB，页面大小，请求数，domain数，cookie大小等

    按部门 分别统计 现在有信用卡和 网金的数据
    
    
 
 ## 月度报表

* KPI 覆盖比较有参考意义的指标：
   + TTFB（延迟）
   + FMP(首屏)
   + pageSize （页面大小）, 
   + 页面请求数,
   + 页面请求总量
   + ...
* 纵向 ： 月度环比 KPI
* 横向 
    + 按部门 统计URL KPI数据比较
    + 按地域检测地域 统计URL KPI数据比较
 * 可以考虑抓一部分阿里系应用的URL，检查统计一下 和我们做对比
    
{"workerNodeId":"0","type":0,"payload":[{"url":"https://cardmall.pingan.com.cn/appemall/modules/index/index.html?saleChannelPhoneMall=xykapp&channelType=cc2b&v=20171222&source=sa0000436&outersource=os0000002&rd=0.8207109559062555#index","benchmarkId":"USER144c04ac059a15f0555ec1aebab63d58","detailedReportUrl":"output/cardmall.pingan.com.cn_2018-07-01_16-41-11.report.html","responseCode":0,"networkType":"","performance":{"ttfb":null,"domready":259.027,"fmp":962,"tti":962,"loaded":522.628,"fps":22.7,"psi":4230,"inputLatency":16},"quality":{"cookies":597,"doms":671,"transfers":{"css":27855,"image":1281383,"js":215613,"html":9404,"total":1594011},"requests":{"css":4,"image":61,"js":12,"html":1,"total":82},"errors":0,"inaccessibles":0,"domains":5},"pageSize":9404,"validationInfo":{"unknownCookies":["WEBTRENDS_ID","WT-FPC","mallDeviceId","PAEBANK_PARAM_N","sdc_PABankParam","PAEBANK_PARAM_W","BIGipServerPOOL_PACLOUD_PRDR2016061308834","BIGipServerpaces-emall_DMZ_PrdPool","JSESSIONID"],"illegalCookies":[],"jsOfDeprecatedList":[],"jsOfBlackList":["https://bank-static.pingan.com.cn/creditcard/mall/js/jquery/jquery-1.9.1.min.js?1.95.2","https://bank-static.pingan.com.cn/creditcard/mall/js/jquery-lazyload/jquery.lazyload.min.js?1.95.2","https://rsb.pingan.com.cn/brop/cmp/cust/cmpsf/mgm/share/createTokenId.do?&callback=jQuery17108712448191088786_1530434459823&_=1530434460183","https://rsb.pingan.com.cn/brop/cmp/cust/cmpsf/mgm/share/createTokenId.do?&callback=jQuery17108712448191088786_1530434459824&_=1530434460187"]}}]}
