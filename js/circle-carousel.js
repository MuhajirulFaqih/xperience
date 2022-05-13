initSlider();

function initSlider() {
    var block = $(".circle-slider .circle-slider-block").not('.active');
    var rotateVariable = 80 / Number(block.length);

    for (let index = 0; index < block.length; index++) {
        var single_block = block[index];
        var single_block_inner = $(single_block).find('.circle-slider-icon');
        var rotateValue = rotateVariable * (index + .5) - 40;
        $(single_block).css('transform', `translateX(-50%) rotate(${rotateValue}deg)`);
        $(single_block_inner).css('transform', `rotate(${ - (rotateValue)}deg)`);
    }
}

$('.circle-slider-arrow-right').click(function () {
    var blockAll = $(".circle-slider .circle-slider-block");
    var block = $(".circle-slider .circle-slider-block").not('.active');
    var elementActive;

    for (let indexAll = 0; indexAll < blockAll.length; indexAll++) {
        if ($(blockAll[indexAll]).hasClass('active')) {
            elementActive = blockAll[indexAll]
            var indexActive = indexAll;
        }
    }
    var indexNew = typeof indexActive == 'undefined' || (indexActive <= 0)
        ? (block.length - 1)
        : (indexActive - 1)
    if (typeof indexActive == 'undefined' || (indexActive <= 0)) {
        var indexNew = (block.length - 1);
        var indexTo = 4;
    } else {
        var indexNew = (indexActive - 1);
        var indexTo = (indexActive - 1);
    }
    $(block[indexNew]).addClass('active');
    $(elementActive).removeClass('active');
    initSliderReverse(indexTo, 'right')
})

$('.circle-slider-arrow-left').click(function () {
    var blockAll = $(".circle-slider .circle-slider-block");
    var block = $(".circle-slider .circle-slider-block").not('.active');
    var elementActive;

    for (let indexAll = 0; indexAll < blockAll.length; indexAll++) {
        if ($(blockAll[indexAll]).hasClass('active')) {
            elementActive = blockAll[indexAll]
            var indexActive = indexAll;
        }
    }
    if (typeof indexActive == 'undefined' || (indexActive >= block.length)) {
        var indexNew = 0;
        var indexTo = 4;
    } else {
        var indexNew = indexActive;
        var indexTo = indexActive;
    }
    $(block[indexNew]).addClass('active');
    $(elementActive).removeClass('active');
    initSliderReverse(indexTo, 'left')
})

function initSliderReverse(indexPage, type) {
    var block = $(".circle-slider .circle-slider-block").not('.active');
    var rotateVariable = 80 / Number(block.length);
    for (let index = 0; index < block.length; index++) {
        var single_block = block[index];
        var single_block_inner = $(single_block).find('.circle-slider-icon');
        if (type == 'left') {
            var valInit = initLeft(indexPage, index);
        } else {
            var valInit = initRight(indexPage, index);
        }
        var rotateValue = rotateVariable * (valInit + .5) - 40;
        $(single_block).css('transform', `translateX(-50%) rotate(${rotateValue}deg)`);
        $(single_block_inner).css('transform', `rotate(${ - (rotateValue)}deg)`);
    }
}

function initLeft(indexPage, index) {
    if (indexPage == 0) {
        if (index == 0) {
            var val = 3;
        } else {
            var val = index - 1;
        }
    } else if (indexPage == 1) {
        if (index == 2) {
            var val = 0;
        } else if (index == 3) {
            var val = 1;
        } else {
            var val = index + 2;
        }
    } else if (indexPage == 2) {
        if (index == 3) {
            var val = 0;
        } else {
            var val = index + 1
        }
    } else if (indexPage == 3) {
        var val = index;
    } else if (indexPage == 4) {
        var val = index;
    }

    return val;
}

function initRight(indexPage, index) {
    console.log(indexPage, index)
    if (indexPage == 4) {
        var val = index;
    } else if (indexPage == 3) {
        if (index == 3) {
            var val = 0;
        } else {
            var val = index + 1;
        }
    } else if (indexPage == 2) {
        if (index == 2) {
            var val = 0;
        } else if (index == 3) {
            var val = 1;
        } else {
            var val = index + 2;
        }
    } else if (indexPage == 1) {
        if (index == 0) {
            var val = 3;
        } else {
            var val = index - 1;
        }
    } else if (indexPage == 0) {
        var val = index;
    }

    return val;
}