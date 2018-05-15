/*** an util class help draw charts **/

var drawer = {
	reactors : {"echarts" : echartReactor, "chartjs" : chartjsReactor},
	getReactor : function(ctx) {
			var reactor = ctx["_mode"]
			if (reactor) {
				return reactor
			}
			return chartjsReactor;
	},
	linear : function(ctx) {
			drawer.getReactor(ctx).linear(ctx);
	}
	bar : function (ctx) {
		drawer.getReactor(ctx).bar(ctx);
	},
	pie : function (ctx) {
		drawer.getReactor(ctx).pie(ctx);
	},
}
var chartjsReactor = {}

var echartReactor = {
	linear : function (ctx) {
		 var myChart = echarts.init(document.getElementById(ctx.destiDivId));
		 myChart.setOption(option = {
        title: {
            text: ctx.titleTxt
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
           data : ctx.chartData.xAxisData
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue:  ctx.chartData.xAxisData[0]
        }, {
            type: 'inside'
        }],
        series:   ctx.chartData.series /**[ 
         {
            name: 'Beijing AQI',
            type: 'line',
            data:[100,233,888,9920],
        },
        {
            name: 'CAT mobile',
            type: 'line',
            data:[200,312,"N/A",569],
        } 
        ]*/
    });


	}
}