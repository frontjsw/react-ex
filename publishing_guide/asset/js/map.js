$(window).on('load',function () {
    layoutSize()

    $(document).on('click', '.source', function () {
        $('body').append('<div class="sourceDim"></div>');
        $('body').append('<div class="sourceWindow"><div class="sourceWindow_close">X</div><div class="sourceView"></div></div>');
        $('body').find('.sourceView').append('<pre class="brush: js;"></pre>');
        var tempSource = $(this).parent().next('dd').html();
        $('.sourceWindow .sourceView pre').text(tempSource);
        SyntaxHighlighter.highlight();
    });

    $(document).on('click', '.sourceWindow .sourceWindow_close, .sourceDim', function () {
        $('.sourceWindow, .sourceDim').remove();
    });

    // // 첫번째타이틀컬러
    // $('.big_title').eq(2).css({ 'background' : '#646464' });

    // // 첫번째버튼컬러
    // $('.category').eq(0).css({ 'background' : '#646464' });

    // 새창 버튼 만들기
    $('.page_title').append('<button type="button" class="new_window">새창</button>');

    // 완료리스트(page_data체크)
    $('.contents').each(function () {
        $(this)
            .find('li')
            .each(function () {
                var page_date = $(this).find('.page_date').html();

                // console.log(page_date + ':::' + page_date.indexOf('완료'));

                if (page_date == '' || page_date == '작업중') {
                    $(this).find('button').addClass('workingOn');
                    $(this).show();
                } else if (page_date == '검수요청') {
                    $(this).find('button').addClass('undone');
                    $(this).show();
                } else if (page_date == '보류') {
                    $(this).find('button').addClass('holding');
                    $(this).show();
                } else if (page_date.indexOf('배포') !==  -1) {
                    $(this).find('button').addClass('done');
                    $(this).show();
                } else if (page_date.indexOf('완료') !== -1) {
                    $(this).find('button').addClass('finalDone');
                    $(this).show();
                }
            });
    });

    // 1depth 기본열림
    // $('.depth1, .ia_list, .contents').addClass('open');
    $('.ia_list').addClass('open');

    // 3depth 가 있는 경우
    $('.page_id').each(function () {
        var subfolder = $(this).parent().parent().parent().parent().parent().find('.subfolder').html();
        if (subfolder != undefined) {
            $(this).prepend(subfolder + '/');
        }
    });

    // 현재선택 리스트 표시
    $('.contents a').click(function () {
        $(document).find('li').removeClass('on');
        $(this).parents().addClass('on');
    });

    // 새창 버튼 링크 연결
    $('.new_window').click(function () {
        var new_href = $(this).parent('.page_title').find('a').attr('href');
        window.open(new_href, 'new_window');
    });

    // main title 클릭이벤트
    $('h2.main_title').on('click', function () {
        if ($(this).next('.ia_list').hasClass('open')) {
            $(this).next('.ia_list').removeClass('open');
        } else {
            $(this).next('.ia_list').addClass('open');
        }
    });

    // 1depth title 클릭이벤트
    $('h2.big_title').on('click', function () {
        if ($(this).next('.depth1').hasClass('open')) {
            $(this).next('.depth1').removeClass('open');
        } else {
            $(this).next('.depth1').addClass('open');
        }
    });

    // 2depth title 클릭이벤트
    $('h2.small_title').on('click', function () {
        if ($(this).next('.contents').hasClass('open')) {
            $(this).next('.contents').removeClass('open');
        } else {
            $(this).next('.contents').addClass('open');
        }
    });
    // 3depth title 클릭이벤트
    $('.contents > table > tbody > tr:nth-child(2n+1)').on('click', function () {
        if ($(this).next('tr').hasClass('open')) {
            $(this).next('tr').removeClass('open');
            $(this).next('tr').find('.history').removeClass('open');
        } else {
            $(this).next('tr').addClass('open');
        }
    });

    // allview
    $('.allview').on('click', function () {
        if ($(this).html() == '전체열기') {
            $(this).html('전체닫기');
            $('.depth1').addClass('open');
            $('.contents > table > tbody > tr:nth-child(2n+1)').next('tr').addClass('open');
        } else if ($(this).html() == '전체닫기') {
            $(this).html('전체열기');
            $('.depth1').removeClass('open');
            $('.contents > table > tobdy > tr:nth-child(2n+1)').next('tr').removeClass('open');
            $('.history').removeClass('open');
        }
    });

    // 페이지갯수
    $('.ia_list').each(function () {
        var _this = $(this);
        var pageDefault = $('body').find('.default').length,
            bodyAll = $('body').find('a').length - pageDefault;
        var pageAll = _this.find('a').length,
            pageDone = $('body').find('.done').length + $('body').find('.finalDone').length,
            pageTotal = pageAll - pageDefault;

        // 헤더 상단 페이지 갯수
        $('body')
            .find('div.TotalCount')
            .html(' 총 페이지 ' + pageDone + ' / ' + bodyAll + '');

        // h2.big_title 페이지 갯수
        _this
            .prev()
            .find('.TotalCount')
            .html(' ( ' + pageDone + ' / ' + pageAll + ' )');
    });

    $('.ia_list .big_title').append('<span class="page_num"></span>');
    $('.big_title').each(function () {
        var li_num = $(this).next('.depth1').find('.done').length + $(this).next('.depth1').find('.finalDone').length;
        var li_num_total = $(this).next('.depth1').find('td').find('li').length;
        $(this)
            .find('.page_num')
            .html(' ( ' + li_num + ' / ' + li_num_total + ' )');
    });

    // $('.ia_list .small_title').append('<span class="page_num"></span>');
    // $('.small_title').each(function () {
    //     var li_num = $(this).next('.contents').find('.done').length;
    //     var li_num_total = $(this).next('.contents').find('td').find('li').length;
    //     $(this)
    //         .find('.page_num')
    //         .html(' ( ' + li_num + ' / ' + li_num_total + ' )');
    // });

    $('.ia_list .contents > table > tbody > tr > th').append('<span class="page_num"></span>');

    $('.ia_list .contents > table > tbody > tr:nth-child(2n-1) ').each(function () {
        var li_num = $(this).next('tr').find('.done').length + $(this).next('tr').find('.finalDone').length;
        var li_num_total = $(this).next('tr').find('td').find('li').length;
        $(this)
            .find('.page_num')
            .html('( ' + li_num + ' / ' + li_num_total + ' )');
    });

    $('.page_num').each(function () {
        if ($(this).html() == '(0)') {
            $(this).hide();
        }
    });

    // 버전
    $('#footer').append($('.version').html('Version 1.9 / 2018-05-30'));

    //히스토리 토글 이벤트 22-09-14
    $('.history_btn').on('click', function () {
        if ($(this).parent('.page_title').siblings('.history').hasClass('open')) {
            $(this).parent('.page_title').siblings('.history').removeClass('open');
        } else {
            $(this).parent('.page_title').siblings('.history').addClass('open');
        }
    });

    $('.history').parent().addClass('has_history');

    $('.has_history .history td .cate').each(function () {
        const historyCate = $(this).html();

        if (historyCate.indexOf('ETT') != -1) {
            $(this).addClass('edit');
            $(this).parent().attr('title', 'Edit Text');
        } else if (historyCate.indexOf('ECLA') != -1) {
            $(this).addClass('edit');
            $(this).parent().attr('title', 'Edit Class');
        } else if (historyCate.indexOf('ELAY') != -1) {
            $(this).addClass('edit');
            $(this).parent().attr('title', 'Edit Layout');
        } else if (historyCate.indexOf('EIMG') != -1) {
            $(this).addClass('edit');
            $(this).parent().attr('title', 'Edit Img');
        } else if (historyCate.indexOf('EJS') != -1) {
            $(this).addClass('edit');
            $(this).parent().attr('title', 'Edit Script');
        } else if (historyCate.indexOf('EBUG') != -1) {
            $(this).addClass('edit');
            $(this).parent().attr('title', 'Edit Bug');
        } else if (historyCate.indexOf('ATT') != -1) {
            $(this).addClass('add');
            $(this).parent().attr('title', 'Add Text');
        } else if (historyCate.indexOf('ACLA') != -1) {
            $(this).addClass('add');
            $(this).parent().attr('title', 'Add Class');
        } else if (historyCate.indexOf('ALAY') != -1) {
            $(this).addClass('add');
            $(this).parent().attr('title', 'Add Layout');
        } else if (historyCate.indexOf('AIMG') != -1) {
            $(this).addClass('add');
            $(this).parent().attr('title', 'Add Img');
        } else if (historyCate.indexOf('AJS') != -1) {
            $(this).addClass('add');
            $(this).parent().attr('title', 'Add Sctipt');
        } else if (historyCate.indexOf('ATET') != -1) {
            $(this).addClass('add');
            $(this).parent().attr('title', 'Add TestCode');
        } else if (historyCate.indexOf('DTT') != -1) {
            $(this).addClass('del');
            $(this).parent().attr('title', 'Delete Text');
        } else if (historyCate.indexOf('DCLA') != -1) {
            $(this).addClass('del');
            $(this).parent().attr('title', 'Delete Class');
        } else if (historyCate.indexOf('DLAY') != -1) {
            $(this).addClass('del');
            $(this).parent().attr('title', 'Delete Layout');
        } else if (historyCate.indexOf('DIMG') != -1) {
            $(this).addClass('del');
            $(this).parent().attr('title', 'Delete Img');
        } else if (historyCate.indexOf('DJS') != -1) {
            $(this).addClass('del');
            $(this).parent().attr('title', 'Delete Script');
        } else if (historyCate.indexOf('DTET') != -1) {
            $(this).addClass('del');
            $(this).parent().attr('title', 'Delete TestCode');
        } else if (historyCate.indexOf('RNEW') != -1) {
            $(this).addClass('renewal');
            $(this).parent().attr('title', 'Renewal');
        }
    });
});

function layoutSize(){
    var headerH = $('#header').outerHeight();
    $('#container').css('padding-top',headerH)
}

$('.contents').each(function () {
    var folder = $(this).parent().prev().find('.folder').html();
    $(this)
        .find('li')
        .each(function () {
            var page_id = $(this).find('.page_id').html();
            var aLink = $(this).find('a').attr('href');
            if (aLink == '#') {
                $(this)
                    .find('a')
                    .attr('href', '../' + page_id + '.html');
            }
        });
});

// 모바일 페이지 리스트 a 태그 target 수정 js 코드

// window.onload = function () {
//     const link = document.getElementsByTagName('a');
//     // 페이지 접속 시 스크린 width 확인 하여 변경 코드
//     if (matchMedia('screen and (max-width: 768px)').matches) {
//         //화면 크기가 768px이하일때
//         for (let i = 0; i < link.length; i++) {
//             link[i].setAttribute('target', '_blank');
//         }
//     }
//     // 페이지 resize 시 스크린 width 확인 하여 변경 코드
//     window.addEventListener('resize', function () {
//         if (matchMedia('screen and (max-width: 768px)').matches) {
//             //화면 크기가 768px이하일때
//             for (let i = 0; i < link.length; i++) {
//                 link[i].setAttribute('target', '_blank');
//             }
//         } else if (matchMedia('screen and (min-width: 769px)').matches) {
//             //화면 크기가 769px 이상일때
//             for (let i = 0; i < link.length; i++) {
//                 link[i].setAttribute('target', 'mainFrame');
//             }
//         }
//     });
// };

// 모바일 페이지 리스트 a 태그 target 수정 jQuery 코드
const $link = $('a');

if (window.outerWidth < 768) {
    //화면 크기가 768px이하일때
    $link.each(function () {
        $(this).attr('target', '_blank');
    });
}
$(window).resize(function () {
    if (window.outerWidth < 768) {
        //화면 크기가 768px이하일때
        $link.each(function () {
            $(this).attr('target', '_blank');
        });
    } else {
        //화면 크기가 769px이상일때
        $link.each(function () {
            $(this).attr('target', 'mainFrame');
        });
    }
});



	
	



