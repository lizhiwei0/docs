var mychart = function(viewx, rowIndex, flag) {
    var tbody = viewx.parentNode.parentNode.parentNode;
    var tr = viewx.parentNode.parentNode
    var divId = "div"+viewx.id;
    var destDiv = document.getElementById(divId)
    if (destDiv) {
     tbody.removeChild(destDiv.parentNode.parentNode);
     viewx.textContent="View..."
     return;
    }
    viewx.textContent="View"
    var tmpTr = document.createElement("TR")
    var tmpTd = document.createElement("TD")
    tmpTr.appendChild(tmpTd)
    tmpTd.setAttribute("colspan",3+vContext["payload"]["datesItems"].length)
    tmpTd.setAttribute("style","width:"+(tr.offsetWidth-50)+"px;height:"+(tr.offsetWidth/4)+"px;")
    var chart = document.createElement("DIV")
    //chart.setAttribute("style","width:"+(tr.offsetWidth-50)+"px;height:"+(tr.offsetWidth/2)+"px;position: relative;top: -30px;")
    chart.setAttribute("style","width:100%;height:100%")
    tmpTd.appendChild(chart)

    chart.setAttribute("id", divId);
    tbody.insertBefore(tmpTr,tr);
   
    
    var record =  vContext["payload"].datas[rowIndex]
    var prevRecord;
    if (rowIndex > 0)  {
      prevRecord = vContext["payload"].datas[rowIndex-1]
    }
    var nextRecord;
    if (rowIndex < vContext["payload"].datas.length-1) {
      nextRecord = vContext["payload"].datas[rowIndex+1]
    }

    var destRecord;

    if (prevRecord && prevRecord.url == record.url) {
      destRecord = prevRecord
    } else if (nextRecord && nextRecord.url == record.url) {
      destRecord = nextRecord
    }
  
    var chartData = {
          xAxisData: [],
          series: []
        };

    
    chartData.xAxisData = vContext["payload"].dates;

    var titleConverter = dimensions.titleConverter("")

    

    for(var i=0;i < vContext["selectedDimensions"].length; i++) {
  
     var vlabel = record.os ? record.os : ""
     var seriesRecord = {
             name: vlabel + "."+titleConverter(vContext["selectedDimensions"][i]),
             type: 'line',
             data:[],
     }


      chartData.series.push(seriesRecord);

      for (var j = 0; j < chartData.xAxisData.length; j++) {
          if ( record.days[chartData.xAxisData[j]] == undefined) {
             seriesRecord.data.push("N/A")
             continue
          }
          seriesRecord.data.push(record.days[chartData.xAxisData[j]][i])
      } 
    }

    var titleTxt = "";
    drawer.linear( {
          'destiDivId' : divId,
          'chartData' : chartData,
          'titleTxt' : titleTxt
        })
 }

 var loadDataLastWeek = function() {
 	/** var vData = {
        urls : vUrl,
        startDate : dates[0],
        endDate : dates[1],
        source : "catMobile",
        //domain : vdomain
       // group : vgroup

      };*/

   var  vData = vContext["_lastQueryParam"];
   var intersect = 7 * 24 * 60 * 60 * 1000;
   vData.startDate = moment(vData.startDate,"yyyy-MM-dd HH:mm").subtract(7,"days)
 }