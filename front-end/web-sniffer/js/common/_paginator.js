var pageInator= window.pageInator ||{}

window.pageInator =pageInator

      var  _dom,//选中的分页元素
        _domId,//页面中元素ID
        _html = '',//动态创建页面时使用
        _offset = 2,//间隔页数
        _page = 0,//从第几页开始
        _pages = 0,//总页数
        _start = 0,//中间显示的开始页
        _end = 0,//中间显示的结束页
        _callback,//回调函数
        i = 0;
        /**
         * 计算总页数
         * total 记录总数
         * size 每页显示的记录个数
         */
        pageInator.pageCount=function(total, size) {
            var count = Math.floor(total / size),
                vod = total % size;
            if (vod > 0) {
                count += 1;
            }
            return count;
        },
        pageInator.caculatePage=function () {
            _start = 0;
            _end = 0;

            if (_pages > 10) {
                //开始页
                if (_page > 4) {
                    _start = _page - _offset;
                }

                //结束页
                if (_pages > 7 && _page < (_pages - 4)) {
                    _end = _page + _offset;
                }
            }
        },
        pageInator.generateHtml= function () {
            if (_page === 0 || _pages <= 1) {
                return '';
            }

            s = [];
            s.push('<div class="wraper"><ul class="pagination pagination-default">');

            //分页从第一页开始时，上一页处于不能点击状态，否则可以点击
            if (_page === 1) {
                s.push('<li class="disabled"><a href="javascript:void(0);" aria-label="上一页">上一页</a></li>');
            } else {
                s.push('<li data-page="' + (_page - 1) + '" class="js-page"><a href="javascript:void(0);" aria-label="上一页">上一页</a></li>');
            }

            if (_start > 0) {
                s.push('<li data-page="1" class="' + (1 === _page ? 'active' : 'js-page') + '"><a href="javascript:void(0);">1</a></li>');
                s.push('<li><a href="javascript:void(0);" class="none-border"><em>...</em></a></li>');
            } else {
                for (i = 1; i < _page; i++) {
                    s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
                }
            }

            if (_start > 0 && _end > 0) {
                for (i = _start; i < (_end + 1); i++) {
                    s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
                }
            } else if (_start === 0 && _end > 0) {
                for (i = _page; i < 7; i++) {
                    s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
                }
            }

            if (_end > 0) {
                s.push('<li><a href="javascript:void(0);" class="none-border"><em>...</em></a></li>');
                s.push('<li data-page="' + _pages + '" class="js-page"><a href="javascript:void(0);">' + _pages + '</a></li>');
            } else {
                var temp = _page;
                if (_start > 0) {
                    temp = _start;
                }
                for (i = temp; i <= _pages; i++) {
                    s.push('<li class="' + (i === _page ? 'active' : 'js-page') + '" data-page="' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
                }
            }

            if (_page === _pages) {
                s.push('<li class="disabled"><a href="javasctipt:void(0);" aria-label="下一页">下一页</a></li>');
            } else {
                s.push('<li data-page="' + (_page + 1) + '" class="js-page"><a href="javasctipt:void(0);" aria-label="下一页">下一页</a></li>');
            }

            s.push('</ul>');
            // s.push(' <div class="total">共 0 页， </div> <div class="form"> <span class="text">到第</span> ' +
            //     '<input class="input J_Input" value="1" type="number" min="1" max="100" aria-label="页码输入框"><span class="text">&nbsp;页</span>' +
            //     ' <span class="btn J_Submit" role="button" tabindex="0">确定</span> </div>')
            return s.join('\n');
        },
        pageInator.construct= function () {
            pageInator.caculatePage();
            _dom.html(pageInator.generateHtml());

            $('#' + _domId + ' .js-page').click(function (event) {
                event.preventDefault();
                var page = parseInt($(this).data('page'));
                _dom.hide();
                _callback(page);
                _page = page;
                pageInator.construct(pageInator.generateHtml());
                //当前显示的是第几页
                $(".J_Input").val(_page);
            });
            $(".J_Submit").click(function(event){
                event.preventDefault();
                var page = parseInt($(".J_Input").val());
                _dom.hide();
                _callback(page);
                _page = page;
                pageInator.construct(pageInator.generateHtml());
                //当前显示的是第几页
                $(".J_Input").val(_page);
            });
            //给生成的页面设置总页数和最大查找限制
            $(".total").html("共 "+_pages+" 页，");
            $(".J_Input").attr("max",_pages);
        },
        //隐藏分页
        pageInator.hidePaginator= function() {
            $('#paginator').hide();
        },
        //显示分页
        pageInator.showPaginator= function() {
            $('#paginator').show();
        },
        pageInator.init= function (domId, page, pages, callback) {
            _domId = domId;
            _dom = $('#' + _domId);
            if (_dom.length !== 1 || callback === undefined) {
                return;
            }
            _callback = callback || function () {
                };
            _page = Math.max(1, page);
            _pages = Math.max(_page, pages);
            pageInator.construct();
        },
        pageInator.pageInit= function (domId, page, pages, callback) {
            pageInator.init(domId, parseInt(page), parseInt(pages), callback);
        },
        /*
         * 分页
         * totalCount 总记录数
         * 每页显示多少个
         */
        pageInator.initPaginator= function(totalCount, pageNum, callback) {
            if (parseInt(totalCount) > pageNum) {
                pageInator.pageInit('paginator', 1, pageInator.pageCount(totalCount,pageNum), callback);
                $('#paginator').show();
            } else {
                $('#paginator').empty();
            }
        }

