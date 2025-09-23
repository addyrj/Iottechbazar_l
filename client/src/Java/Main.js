import $ from "jquery"

export const makeTimer = (timer) => {
    // Sun Jul 23 2023 05:30:00 GMT+0530
    // 21 December 2019 9:56:00 GMT+01:00
    //  2023-07-16T11:26:00.000Z
    var endTime = new Date(timer);
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");

    return timeLeft;
}

// Mobile Menu Toggle - Show & Hide
export const mobileMenuClose = () => {
    $('.mobile-menu-overlay, .mobile-menu-close').on('click', function (e) {
        $('body').removeClass('mmenu-active');
        $('.menu-toggler').removeClass('active');
        e.preventDefault();
    });
}

// Add Mobile menu icon arrows to items with children

export const mobileMenuArrow = () => {
    $('.mobile-menu').find('li').each(function () {
        var $this = $(this);

        if ($this.find('ul').length) {
            $('<span/>', {
                'class': 'mmenu-btn'
            }).appendTo($this.children('a'));
        }
    });
}

// Mobile Menu toggle children menu

export const mobileMenuToggle = () => {
    $('.mmenu-btn').on('click', function (e) {
        var $parent = $(this).closest('li'),
            $targetUl = $parent.find('ul').eq(0);

        if (!$parent.hasClass('open')) {
            $targetUl.slideDown(300, function () {
                $parent.addClass('open');
            });
        } else {
            $targetUl.slideUp(300, function () {
                $parent.removeClass('open');
            });
        }

        e.stopPropagation();
        e.preventDefault();
    });
}