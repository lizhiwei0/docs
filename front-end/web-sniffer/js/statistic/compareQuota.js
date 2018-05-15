(function () {
    var compareQuota = {
        baseUrl: config[env.name].apiBaseURL +
            'web-sniffer/websniffer/statistic',

        PaintContext: {
            ChartHandles: {

            }
        },
        titles: [
            'performance.ttfb',
            'performance.domReady',
            'performance.loaded',
            'performance.fmp',
            'performance.tti',
            'quality.errors',
            'quality.inaccessibles',
            'quality.doms',
            'quality.transfers.total',
            'performance.inputLatency',
            'quality.pageSize',
            'quality.cookies',
            'quality.domains',
            'performance.fps',
            'performance.psi',
            'quality.requests.total'
        ],
        drawProfiles: {
            axisesTitles: function () {
                var titles = {
                    'performance.ttfb': 'TTFB',
                    'performance.domReady': 'DOMContentLoaded DomReady',
                    'performance.loaded': 'Loaded',
                    'performance.fmp': 'FirstMeaningfullPaint',
                    'performance.tti': 'TTI(time to interative)',
                    'quality.errors': 'Total JS Errors',
                    'quality.inaccessibles': 'Total Inaccessible Requests',
                    'quality.doms': 'Total DOMs',
                    'quality.transfers.total': 'Total Transfers Weight',
                    'performance.inputLatency': 'Input Latency',
                    'quality.pageSize': 'Page Size',
                    'quality.cookies': 'Total Cookies Weight',
                    'quality.domains': 'Total Domains',
                    'performance.fps': 'FPS',
                    'performance.psi': 'Perceptual Speed Index',
                    'quality.requests.total': 'Total Requests Quantity'
                }

                return function (x) {
                    return titles[x]
                }
            }
        },
        chartPaintFactory: function (pdata) {
            var data = pdata;
            return function (param) {
                param['data'] = data;
                compareQuota.doDrawChart(param);
            }
        },
        processSuccess: function (data) {
            if (data.responseCode == 1) {
                alert(data["responseMsg"]);
                return
            }
            var painter = compareQuota.chartPaintFactory(data);

            compareQuota.PaintContext["painter"] = painter;

            compareQuota.customPaint();
        },
        drawer: {
            linear: function (paintParam) {
                var previous = compareQuota.PaintContext[
                    'ChartHandles'][paintParam.destiDivId];
                if (previous) {
                    previous.destroy();
                }

                var ctx = document.getElementById(paintParam.destiDivId)
                    .getContext('2d');
                var myLine = Chart.Line(ctx, {
                    data: paintParam.chartData,
                    options: {
                        responsive: true,
                        hoverMode: 'index',
                        stacked: false,
                        title: {
                            display: true,
                            text: paintParam.titleTxt
                        },
                        scales: {
                            yAxes: [{
                                type: 'linear',
                                display: true,
                                position: 'left',
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });

                compareQuota.PaintContext['ChartHandles'][
                    paintParam.destiDivId
                ] = myLine;
            },
            bar: function (paintParam) {
                var previous = compareQuota.PaintContext[
                    'ChartHandles'][paintParam.destiDivId];
                if (previous) {
                    previous.destroy();
                }

                var ctx = document.getElementById(paintParam.destiDivId)
                    .getContext('2d');
                var myBar = new Chart(ctx, {
                    type: 'bar',
                    data: paintParam.chartData,
                    options: {
                        responsive: true,
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: paintParam.titleTxt
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });

                compareQuota.PaintContext['ChartHandles'][
                    paintParam.destiDivId
                ] = myBar;
            }
        },
        doDrawChart: function (param) {
            var data = param.data
            var interstingDimensions = param.interstingDimensions
            var destiDivId = param.destiDivId
            var titleTxt = param.titleTxt
            var chartType = param.chartType

            var payload = data.datas;
            var vlabels = [];
            for (var j = 0; j < payload.labels.length; j++) {
                var date = new Date(payload.labels[j]);
                vlabels.push(date.getFullYear() + "-" + (date.getMonth() +
                    1) + "-" + date.getDate());
            }

            var chartData = {
                labels: vlabels,
                datasets: []
            };

            var colorNames = Object.keys(window.chartColors);
            var titleConverter = compareQuota.drawProfiles["axisesTitles"]();
            
            for (var i = 0; i < interstingDimensions.length; i++) {
                dimension = payload.dimensions[interstingDimensions[
                    i]];
                var temp =compareQuota.getUpDown(dimension[0],dimension[1]);
                var newColor =compareQuota.randomColor()
                var chartDataItem = {
                    label: titleConverter(interstingDimensions[i])+"("+temp[0]+":"+temp[1]+")",
                    borderColor: newColor,
                    backgroundColor: newColor,
                    fill: false,
                    data: dimension,
                };

                chartData.datasets.push(chartDataItem);
            }

            if (!chartType) {
                chartType = 'linear'
            }

            compareQuota.drawer[chartType]({
                'destiDivId': destiDivId,
                'chartData': chartData,
                'titleTxt': titleTxt
            });
        },

        majorPaint: function () {
             var benchmarkIDList = getQueryString("benchmarkIDList").split(",")
            // var vUrl = $("#J_inputURL").val().toString()
            //     .split("\r\n");
            //var startTmie = $("#startTime").val().toString()s
            //var endTime = $("#endTime").val().toString()
            //var dates = $('#reportrange span').text().split('~');
            //var vUrl = $('#url').val().replace(/^\s+|\s+$/g, '');
           //var vUrl = "https://b.pingan.com.cn/aum/mobile/index.html";
            // if (vUrl[0] == '') {
            //     alert('请先填写url');
            //     return;
            // }
            // if (startTmie == '') {
            //     alert('请选择优化前时间');
            //     return;
            // }
            // if (endTime == '') {
            //     alert('请选择优化后时间');
            //     return;
            // }

            var vData = {
                op: 'compareScoreRecord',
                benchmarkIds:benchmarkIDList
            };


            $.ajax({
                url: compareQuota.baseUrl,
                method: 'post',
                dataType: 'jsonp',
                jsonp: 'jsonpCallback',
                data: $.param(vData,true),
                beforeSend: function () {
                    $('#J_startCheck').addClass(
                        'buttonDisabled');
                },
                success: function (data) {
                    $('#J_startCheck').removeClass(
                        'buttonDisabled');
                    compareQuota.processSuccess(data);
                },
                error: function (jqXHR, textStatus,
                    errorThrown) {
                    $('#J_startCheck').removeClass(
                        'buttonDisabled');
                }
            });
        },

        customPaint: function () {


            var contents = [];
            var customAttrs = [];
            var offset = 3;
            var titleConverter = compareQuota.titles;
            for (var i = 0; i < titleConverter.length; i++) {
                customAttrs.push(titleConverter[i])
                contents.push(
                    ' <div class="col-md-6 tile"> \
                                      <canvas id="canvas' +
                    (i + 1) +
                    '" ></canvas> \
                      </div>'
                )
            }
            var htmlContent =
                '<div class="row" style="margin: 10px 0;">';
            for (var i = 0; i < contents.length; i++) {
                if (i > 0 && i % 2 == 0) {
                    htmlContent +=
                        '</div>\
					<div class="row" style="margin: 10px 0;">';
                }
                htmlContent += contents[i];
            }
            htmlContent += '</div>'
            $('#customAttributCharts').html(htmlContent);
            for (var i = 0; i < customAttrs.length; i++) {
                var tmp = [customAttrs[i]];
                compareQuota.PaintContext['painter']({
                    interstingDimensions: tmp,
                    destiDivId: 'canvas' + (i + 1),
                    titleTxt: '',
                    chartType: 'bar'
                })
            }
        },
        randomColor: function (){  
            　　var colorStr=Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();  
            　　return"#"+"000000".substring(0,6-colorStr)+colorStr;  
            }  ,
        initialize: function () {
            this.loadPage();
             this.bindSelectData()
            this.loadEvents();
           

        },
        loadPage: function () {
            compareQuota.majorPaint();
        },
        loadEvents: function () {
            var self = this
            $(document).on("click", "#J_startCheck", compareQuota.majorPaint)
            $('#J_inputURL').on("focus",function(){
				$(".sug").css("display","block");
			});

			$('.sug').find('li').click(function () {
				var value =$(this).text().split(")")[1];
				$('#J_inputURL').val(value.trim());
				$(".sug").css("display","none");
			}).mouseenter(function () {
				$(this).parents(".sug").find("li").removeClass("sug-s")
				$(this).addClass('sug-s');
				
			}).mouseleave(function () {
				$(this).removeClass('sug-s');
			})
        },
        bindSelectData:function(){
			var data =config['commUrl']
			for (var i = 0; i < data.length; i++) {
                var html = $("<li>").text("("+data[i].name+") "+data[i].url).val(i);
                $(".sug").append(html)
			}
        },
        getUpDown:function(before,end){
            var val = end-before;
            var temp =[];
            var str='';
            if(val<0){
                str="下降了"
                val =before-end
            }else if(val>0){
                str="上升了"
            }else{
                str="保持持平"
            }
            temp.push(str);
            temp.push(val);
            return temp;
        }
    }
    compareQuota.initialize()
})()
