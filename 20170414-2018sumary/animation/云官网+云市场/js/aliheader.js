 var Header = {
     init: function() {
         var that = this;
         that.tabHover();
         that.tabContent();
         that.navMoveLine();
         // that.astopOpen();
         that.topSearch();
     },
     tabHover: function() {
         $('#headTab li').on('mouseenter mouseleave', function(e) {
             if ($(this).attr('id') == undefined) {
                 $('.toptab-content').addClass('dn')
             }
             //防止不断刷新打开同一个toptab
             if (!$('#con' + $(this).attr('id')).hasClass('dn')) {
                 return false;
             }
             var w = $(this).innerWidth(),
                 h = $(this).innerHeight(),
                 eventType = e.type;

             if (e.type == 'mouseover' || e.type == 'mouseenter') {
                 var toptabID = $(this).attr('id');
                 $('.toptab-content').css('height', '0px').addClass('dn');
                 $('.toptab-content').each(function() {
                         if ($(this).attr('id') == 'con' + toptabID) {
                             $(this).removeClass('dn').animate({ height: "200px" }, 300);

                             /*默认情况下，只选中一三级菜单的第一个，三级菜单都有多个ul*/
                             $(this).find('.toptab-content_left li').eq(0).addClass('active').siblings().removeClass('active');
                             $(this).find('.toptab-ul_right').eq(0).removeClass('dn').siblings().addClass('dn');

                         }
                     })
                     //鼠标向下移动时候
             } else if (e.clientY >= $(this).offset().top + h) {
                 return false;
             }
         })
         $('.toptab-content').on('mouseenter mouseleave', function(e) {
             //console.log(e.clientX);
             var headLeft = $('#headTab').offset().left;
             var headWidth = $('#headTab').innerWidth();
             if (e.type == 'mouseover' || e.type == 'mouseenter') {
                 return false;
             } else {
                 //添加条件判断，当鼠标划到headTab最左侧或者最右侧的时候面板消失
                 if (e.clientY > 165 || e.clientY < 60 && e.clientX > headLeft + headWidth - 60 || e.clientX < headLeft) {
                     $(this).removeClass('active');
                     $('.toptab-content').css('height', '0px').addClass('dn');
                     //reset焦点
                     Header.resetFocus();
                 }
             }
         });
         $("#topTabArrow").on("click", function() {
             $('.toptab-content').css('height', '0px').addClass('dn');
         });
         $("#topTabArrow2").on("click", function() {
             $('.toptab-content').css('height', '0px').addClass('dn');
         });
     },
     tabContent: function() {

         $('.toptab-ul_left li').on('mouseenter mouseleave', function() {
             /* 改变toptab-content的高度*/
             if ($(this).attr('aria-height') != undefined) {
                 $(this).parents('.toptab-content').stop().animate({ height: $(this).attr('aria-height') }, 200)
             }

             $(this).addClass('active').siblings().removeClass('active');
             var firstTab = $(this).find('a').attr('index');

             /*重新选中一级菜单li，重置三级菜单*/
             $('.toptab-content_right ul').each(function() {
                 if ('#' + $(this).attr('id') == firstTab) {
                     /*此处确定只有一三级菜单*/
                     $(this).removeClass('dn').siblings().addClass('dn');
                 }
             })

         })
     },
     navMoveLine: function() {
         var timerin = false;
         var dnLength = $('.toptab-content').length;
         $('#headTab a').hover(function(e) {
             clearTimeout(timerin); // 清除未执行的代码，重置回初始化状态
             timerin = setTimeout(function() {
                 //console.log('show');
                 var ele = Header.handleEvent(e);
                 if (!ele) return;
                 var parentLeft = $('.topmiddle').offset().left;
                 var width = ele.width(),
                     left = ele.offset().left,
                     rLeft = left - parentLeft;
                 $('.line').animate({ 'left': rLeft, 'width': width }, 200);
                 timerin = false;
             }, 100);
         }, function(e) {
             var ele = e.toElement || e.relatedTarget || e.fromElement;
             if (ele.nodeName === 'A') {
                 return;
             }
             if (dnLength == $('.toptab-content.dn').length) {
                 Header.resetFocus();
             }
         });
     },
     resetFocus: function() {
         $('.line').animate({ 'width': 0 }, 200);

     },
     topSearch: function() {
         $('#headerSearch').on('click', function() {
                 //是放大镜的状态下
                 if ($('#headerSearch').hasClass('uf-search-light-2')) {
                     $('.topsearch-content').removeClass('dn').animate({ 'height': "117px" }, 200);;
                     $(this).removeClass('uf-search-light-2').addClass('uf-close');
                 } else {
                     //是打开的状态下
                     $('.topsearch-content').css('height', '0px').addClass('dn');
                     $(this).removeClass('uf-close').addClass('uf-search-light-2');
                 }

             })
             //是打开的状态下
         $("#topSearchArrow").on("click", function() {
             $('.topsearch-content').css('height', '0px').addClass('dn');
             $('#headerSearch').removeClass('uf-close').addClass('uf-search-light-2');
         });
     },
     handleEvent: function(event) {
         var target = null;
         if (event.target.nodeName === 'A') {
             target = $(event.target).parent();
         } else if (event.target.nodeName === 'LI') {
             //target = $(event.target);
         }
         return target;
     }

 }
 Header.init();
