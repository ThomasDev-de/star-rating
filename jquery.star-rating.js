(function ($) {
        $.fn.starRating = function (setup) {
            let settings = $.extend(true, {
                    wrapperClasses: 'p-5 shadow',
                    starIconEmpty: 'fa fa-star-o',
                    starIconFull: 'fa fa-star',
                    starColorEmpty: 'lightgray',
                    starColorFull: '#FFC107',
                    starsSize: 4, // em
                    stars: 5,
                    showInfo: true,
                    titles: ["Sehr schlecht", "Schlecht", "Mittel", "Gut", "Sehr gut!"],
                    inputName: 'rating'
                }, setup || {}),
                wrappers = $(this).each(function(i, e){
                    return init($(e))
                });

            function init(wrapper) {
                if (!wrapper.hasClass('js-wc-star-rating')) {

                    let starWrapper = $('<div>', {
                        css: {'display': 'flex', 'flex-wrap': 'nowrap'}
                    }).appendTo(wrapper);

                    for (let i = 1; i <= settings.stars; i++) {
                        $('<input>', {
                            type: 'radio',
                            value: i,
                            name: settings.inputName,
                            css: {
                                display: 'none'
                            }
                        }).appendTo(starWrapper);

                        $('<i>', {
                            'data-index': i - 1,
                            title: settings.titles[i - 1] || i + " Sterne",
                            css: {
                                color: settings.starColorEmpty,
                                margin: '2px',
                                fontSize: settings.starsSize + 'em'
                            },
                            class: settings.starIconEmpty
                        }).appendTo(starWrapper);

                    }

                    settings.wrapperClasses.split(' ').forEach(className => {
                        wrapper.addClass(className);
                    });
                    if (settings.showInfo) {
                        $('<strong>', {
                            html: "0",
                            class: 'js-wc-rating-value',
                            css: {
                                fontSize: "5em"
                            }
                        }).insertBefore(starWrapper);

                        $('<h4>', {
                            class: 'js-wc-label',
                            css: {
                                marginTop: 0
                            },
                            html: "Bewerte uns!"
                        }).insertBefore(starWrapper);
                    }
                    wrapper.css({
                        'display': 'flex',
                        'flex-direction': 'column',
                        'justify-content': 'center',
                        'align-items': 'center'
                    })
                    wrapper.addClass('js-wc-star-rating');
                    events(wrapper);
                }

                function events(wrapper) {
                    wrapper
                        .on('click', 'i', function (e) {
                            let index = $(e.currentTarget).data('index'),
                                value = index + 1,
                                label = settings.titles[index] || value + " Sterne";
                            // select radio
                            wrapper.find('input[type="radio"][value="' + value + '"]').prop('checked', true);
                            if (settings.showInfo) {
                                wrapper.find('.js-wc-rating-value').text(value);
                                wrapper.find('.js-wc-label').text(label);
                            }

                            // set stars
                            let allStars = wrapper
                                .find('i')
                                .css('color', settings.starColorEmpty)
                                .removeClass(settings.starIconFull)
                                .addClass(settings.starIconEmpty);

                            allStars.each(function (i, e) {
                                if (i <= index) {
                                    $(e)
                                        .removeClass(settings.starIconEmpty)
                                        .addClass(settings.starIconFull)
                                        .css('color', settings.starColorFull);
                                }
                            });

                            wrapper.trigger('change', [value, index]);
                        })
                }

                return wrapper;
            }

            return init();
        };
    }(jQuery));
