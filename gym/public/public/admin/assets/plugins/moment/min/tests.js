
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('af');

    test('parse', function (assert) {
        var tests = 'Januarie Jan_Februarie Feb_Maart Mar_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sondag, Februarie 14de 2010, 3:25:50 nm'],
                ['ddd, hA',                            'Son, 3NM'],
                ['M Mo MM MMMM MMM',                   '2 2de 02 Februarie Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14de 14'],
                ['d do dddd ddd dd',                   '0 0de Sondag Son So'],
                ['DDD DDDo DDDD',                      '45 45ste 045'],
                ['w wo ww',                            '6 6de 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'nm NM'],
                ['[the] DDDo [day of the year]',       'the 45ste day of the year'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Februarie 2010'],
                ['LLL',                                '14 Februarie 2010 15:25'],
                ['LLLL',                               'Sondag, 14 Februarie 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb 2010'],
                ['lll',                                '14 Feb 2010 15:25'],
                ['llll',                               'Son, 14 Feb 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
    });

    test('format month', function (assert) {
        var expected = 'Januarie Jan_Februarie Feb_Maart Mar_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Sondag Son So_Maandag Maa Ma_Dinsdag Din Di_Woensdag Woe Wo_Donderdag Don Do_Vrydag Vry Vr_Saterdag Sat Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '\'n paar sekondes', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '\'n minuut',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '\'n minuut',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minute',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '\'n uur',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '\'n uur',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ure',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ure',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ure',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '\'n dag',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '\'n dag',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dae',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '\'n dag',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dae',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dae',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '\'n maand',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '\'n maand',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '\'n maand',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 maande',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 maande',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 maande',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '\'n maand',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 maande',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '\'n jaar',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 jaar',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '\'n jaar',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 jaar',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'oor \'n paar sekondes',  'prefix');
        assert.equal(moment(0).from(30000), '\'n paar sekondes gelede', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '\'n paar sekondes gelede',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'oor \'n paar sekondes', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'oor 5 dae', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                   'Vandag om 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Vandag om 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Vandag om 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Môre om 02:00',    'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Vandag om 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Gister om 02:00',   'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52ste', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1ste', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1ste', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),    '2 02 2de', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),    '2 02 2de', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('ar-ma');

    test('parse', function (assert) {
        var tests = 'يناير:يناير_فبراير:فبراير_مارس:مارس_أبريل:أبريل_ماي:ماي_يونيو:يونيو_يوليوز:يوليوز_غشت:غشت_شتنبر:شتنبر_أكتوبر:أكتوبر_نونبر:نونبر_دجنبر:دجنبر'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(':');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'الأحد, فبراير 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            'احد, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 فبراير فبراير'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 الأحد احد ح'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '8 8 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45 day of the year'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 فبراير 2010'],
                ['LLL',                                '14 فبراير 2010 15:25'],
                ['LLLL',                               'الأحد 14 فبراير 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 فبراير 2010'],
                ['lll',                                '14 فبراير 2010 15:25'],
                ['llll',                               'احد 14 فبراير 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
    });

    test('format month', function (assert) {
        var expected = 'يناير يناير_فبراير فبراير_مارس مارس_أبريل أبريل_ماي ماي_يونيو يونيو_يوليوز يوليوز_غشت غشت_شتنبر شتنبر_أكتوبر أكتوبر_نونبر نونبر_دجنبر دجنبر'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'الأحد احد ح_الإتنين اتنين ن_الثلاثاء ثلاثاء ث_الأربعاء اربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ثوان', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'دقيقة',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'دقيقة',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 دقائق',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 دقائق',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ساعة',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ساعة',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ساعات',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ساعات',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ساعات',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'يوم',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'يوم',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 أيام',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'يوم',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 أيام',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 أيام',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'شهر',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'شهر',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'شهر',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 أشهر',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 أشهر',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 أشهر',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'شهر',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 أشهر',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'سنة',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 سنوات',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'سنة',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 سنوات',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'في ثوان',  'prefix');
        assert.equal(moment(0).from(30000), 'منذ ثوان', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'منذ ثوان',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'في ثوان', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'في 5 أيام', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'اليوم على الساعة 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'اليوم على الساعة 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'اليوم على الساعة 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'غدا على الساعة 02:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'اليوم على الساعة 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'أمس على الساعة 02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
        assert.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
        assert.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
        assert.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
        assert.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
        assert.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
        assert.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
        assert.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
        assert.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '1 01 1', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '1 01 1', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '2 02 2', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '2 02 2', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '3 03 3', 'Jan 14 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('ar-sa');

    test('parse', function (assert) {
        var tests = 'يناير:يناير_فبراير:فبراير_مارس:مارس_أبريل:أبريل_مايو:مايو_يونيو:يونيو_يوليو:يوليو_أغسطس:أغسطس_سبتمبر:سبتمبر_أكتوبر:أكتوبر_نوفمبر:نوفمبر_ديسمبر:ديسمبر'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(':');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'الأحد، فبراير ١٤ ٢٠١٠، ٣:٢٥:٥٠ م'],
                ['ddd, hA',                            'أحد، ٣م'],
                ['M Mo MM MMMM MMM',                   '٢ ٢ ٠٢ فبراير فبراير'],
                ['YYYY YY',                            '٢٠١٠ ١٠'],
                ['D Do DD',                            '١٤ ١٤ ١٤'],
                ['d do dddd ddd dd',                   '٠ ٠ الأحد أحد ح'],
                ['DDD DDDo DDDD',                      '٤٥ ٤٥ ٠٤٥'],
                ['w wo ww',                            '٨ ٨ ٠٨'],
                ['h hh',                               '٣ ٠٣'],
                ['H HH',                               '١٥ ١٥'],
                ['m mm',                               '٢٥ ٢٥'],
                ['s ss',                               '٥٠ ٥٠'],
                ['a A',                                'م م'],
                ['[the] DDDo [day of the year]',       'the ٤٥ day of the year'],
                ['LT',                                 '١٥:٢٥'],
                ['LTS',                                '١٥:٢٥:٥٠'],
                ['L',                                  '١٤/٠٢/٢٠١٠'],
                ['LL',                                 '١٤ فبراير ٢٠١٠'],
                ['LLL',                                '١٤ فبراير ٢٠١٠ ١٥:٢٥'],
                ['LLLL',                               'الأحد ١٤ فبراير ٢٠١٠ ١٥:٢٥'],
                ['l',                                  '١٤/٢/٢٠١٠'],
                ['ll',                                 '١٤ فبراير ٢٠١٠'],
                ['lll',                                '١٤ فبراير ٢٠١٠ ١٥:٢٥'],
                ['llll',                               'أحد ١٤ فبراير ٢٠١٠ ١٥:٢٥']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '١', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '٢', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '٣', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '٤', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '٥', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '٦', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '٧', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '٨', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '٩', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '١٠', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '١١', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '١٢', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '١٣', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '١٤', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '١٥', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '١٦', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '١٧', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '١٨', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '١٩', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '٢٠', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '٢١', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '٢٢', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '٢٣', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '٢٤', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '٢٥', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '٢٦', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '٢٧', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '٢٨', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '٢٩', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '٣٠', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '٣١', '31');
    });

    test('format month', function (assert) {
        var expected = 'يناير يناير_فبراير فبراير_مارس مارس_أبريل أبريل_مايو مايو_يونيو يونيو_يوليو يوليو_أغسطس أغسطس_سبتمبر سبتمبر_أكتوبر أكتوبر_نوفمبر نوفمبر_ديسمبر ديسمبر'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ثوان', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'دقيقة',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'دقيقة',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '٢ دقائق',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '٤٤ دقائق',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ساعة',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ساعة',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '٢ ساعات',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '٥ ساعات',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '٢١ ساعات',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'يوم',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'يوم',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '٢ أيام',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'يوم',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '٥ أيام',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '٢٥ أيام',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'شهر',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'شهر',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'شهر',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '٢ أشهر',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '٢ أشهر',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '٣ أشهر',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'شهر',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '٥ أشهر',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'سنة',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '٢ سنوات',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'سنة',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '٥ سنوات',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'في ثوان',  'prefix');
        assert.equal(moment(0).from(30000), 'منذ ثوان', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'منذ ثوان',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'في ثوان', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'في ٥ أيام', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'اليوم على الساعة ٠٢:٠٠',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'اليوم على الساعة ٠٢:٢٥',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'اليوم على الساعة ٠٣:٠٠',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'غدا على الساعة ٠٢:٠٠',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'اليوم على الساعة ٠١:٠٠',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'أمس على الساعة ٠٢:٠٠', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
        assert.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
        assert.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
        assert.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
        assert.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');

        assert.equal(moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 6', 'gggg w d').format('gggg w d'), '٢٠٠٣ ١ ٦', 'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6');
        assert.equal(moment('2003 1 0', 'gggg w e').format('gggg w e'), '٢٠٠٣ ١ ٠', '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
        assert.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
        assert.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
        assert.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
        assert.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '١ ٠١ ١', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '١ ٠١ ١', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '٣ ٠٣ ٣', 'Jan 14 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('ar-tn');

    test('parse', function (assert) {
        var tests = 'جانفي:جانفي_فيفري:فيفري_مارس:مارس_أفريل:أفريل_ماي:ماي_جوان:جوان_جويلية:جويلية_أوت:أوت_سبتمبر:سبتمبر_أكتوبر:أكتوبر_نوفمبر:نوفمبر_ديسمبر:ديسمبر'.split('_'),
            i;

        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(':');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a', 'الأحد, فيفري 14 2010, 3:25:50 pm'],
                ['ddd, hA', 'أحد, 3PM'],
                ['M Mo MM MMMM MMM', '2 2 02 فيفري فيفري'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 الأحد أحد ح'],
                ['DDD DDDo DDDD', '45 45 045'],
                ['w wo ww', '6 6 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45 day of the year'],
                ['LT', '15:25'],
                ['LTS', '15:25:50'],
                ['L', '14/02/2010'],
                ['LL', '14 فيفري 2010'],
                ['LLL', '14 فيفري 2010 15:25'],
                ['LLLL', 'الأحد 14 فيفري 2010 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 فيفري 2010'],
                ['lll', '14 فيفري 2010 15:25'],
                ['llll', 'أحد 14 فيفري 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
    });

    test('format month', function (assert) {
        var expected = 'جانفي جانفي_فيفري فيفري_مارس مارس_أفريل أفريل_ماي ماي_جوان جوان_جويلية جويلية_أوت أوت_سبتمبر سبتمبر_أكتوبر أكتوبر_نوفمبر نوفمبر_ديسمبر ديسمبر'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 44
        }), true), 'ثوان', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 45
        }), true), 'دقيقة', '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 89
        }), true), 'دقيقة', '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 90
        }), true), '2 دقائق', '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 44
        }), true), '44 دقائق', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 45
        }), true), 'ساعة', '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 89
        }), true), 'ساعة', '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 90
        }), true), '2 ساعات', '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 5
        }), true), '5 ساعات', '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 21
        }), true), '21 ساعات', '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 22
        }), true), 'يوم', '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 35
        }), true), 'يوم', '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 36
        }), true), '2 أيام', '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 1
        }), true), 'يوم', '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 5
        }), true), '5 أيام', '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 25
        }), true), '25 أيام', '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 26
        }), true), 'شهر', '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 30
        }), true), 'شهر', '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 43
        }), true), 'شهر', '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 46
        }), true), '2 أشهر', '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 74
        }), true), '2 أشهر', '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 76
        }), true), '3 أشهر', '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            M: 1
        }), true), 'شهر', '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            M: 5
        }), true), '5 أشهر', '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 345
        }), true), 'سنة', '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 548
        }), true), '2 سنوات', '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            y: 1
        }), true), 'سنة', '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            y: 5
        }), true), '5 سنوات', '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'في ثوان', 'prefix');
        assert.equal(moment(0).from(30000), 'منذ ثوان', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'منذ ثوان', 'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({
            s: 30
        }).fromNow(), 'في ثوان', 'in a few seconds');
        assert.equal(moment().add({
            d: 5
        }).fromNow(), 'في 5 أيام', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(), 'اليوم على الساعة 02:00', 'today at the same time');
        assert.equal(moment(a).add({
            m: 25
        }).calendar(), 'اليوم على الساعة 02:25', 'Now plus 25 min');
        assert.equal(moment(a).add({
            h: 1
        }).calendar(), 'اليوم على الساعة 03:00', 'Now plus 1 hour');
        assert.equal(moment(a).add({
            d: 1
        }).calendar(), 'غدا على الساعة 02:00', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({
            h: 1
        }).calendar(), 'اليوم على الساعة 01:00', 'Now minus 1 hour');
        assert.equal(moment(a).subtract({
            d: 1
        }).calendar(), 'أمس على الساعة 02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({
                d: i
            });
            assert.equal(m.calendar(), m.format('dddd [على الساعة] LT'), 'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format('dddd [على الساعة] LT'), 'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format('dddd [على الساعة] LT'), 'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format('dddd [على الساعة] LT'), 'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format('dddd [على الساعة] LT'), 'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format('dddd [على الساعة] LT'), 'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({
                w: 1
            }),
            weeksFromNow = moment().add({
                w: 1
            });

        assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

        weeksAgo = moment().subtract({
            w: 2
        });
        weeksFromNow = moment().add({
            w: 2
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'), '1 01 1', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '1 01 1', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('ar');

    var months = [
        'كانون الثاني يناير',
        'شباط فبراير',
        'آذار مارس',
        'نيسان أبريل',
        'أيار مايو',
        'حزيران يونيو',
        'تموز يوليو',
        'آب أغسطس',
        'أيلول سبتمبر',
        'تشرين الأول أكتوبر',
        'تشرين الثاني نوفمبر',
        'كانون الأول ديسمبر'
    ];

    test('parse', function (assert) {
        var tests = months, i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
        }
        for (i = 0; i < 12; i++) {
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i], 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'الأحد، شباط فبراير ١٤ ٢٠١٠، ٣:٢٥:٥٠ م'],
                ['ddd, hA',                            'أحد، ٣م'],
                ['M Mo MM MMMM MMM',                   '٢ ٢ ٠٢ شباط فبراير شباط فبراير'],
                ['YYYY YY',                            '٢٠١٠ ١٠'],
                ['D Do DD',                            '١٤ ١٤ ١٤'],
                ['d do dddd ddd dd',                   '٠ ٠ الأحد أحد ح'],
                ['DDD DDDo DDDD',                      '٤٥ ٤٥ ٠٤٥'],
                ['w wo ww',                            '٨ ٨ ٠٨'],
                ['h hh',                               '٣ ٠٣'],
                ['H HH',                               '١٥ ١٥'],
                ['m mm',                               '٢٥ ٢٥'],
                ['s ss',                               '٥٠ ٥٠'],
                ['a A',                                'م م'],
                ['[the] DDDo [day of the year]',       'the ٤٥ day of the year'],
                ['LT',                                 '١٥:٢٥'],
                ['LTS',                                '١٥:٢٥:٥٠'],
                ['L',                                  '١٤/\u200f٢/\u200f٢٠١٠'],
                ['LL',                                 '١٤ شباط فبراير ٢٠١٠'],
                ['LLL',                                '١٤ شباط فبراير ٢٠١٠ ١٥:٢٥'],
                ['LLLL',                               'الأحد ١٤ شباط فبراير ٢٠١٠ ١٥:٢٥'],
                ['l',                                  '١٤/\u200f٢/\u200f٢٠١٠'],
                ['ll',                                 '١٤ شباط فبراير ٢٠١٠'],
                ['lll',                                '١٤ شباط فبراير ٢٠١٠ ١٥:٢٥'],
                ['llll',                               'أحد ١٤ شباط فبراير ٢٠١٠ ١٥:٢٥']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '١', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '٢', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '٣', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '٤', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '٥', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '٦', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '٧', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '٨', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '٩', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '١٠', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '١١', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '١٢', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '١٣', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '١٤', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '١٥', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '١٦', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '١٧', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '١٨', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '١٩', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '٢٠', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '٢١', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '٢٢', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '٢٣', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '٢٤', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '٢٥', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '٢٦', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '٢٧', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '٢٨', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '٢٩', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '٣٠', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '٣١', '31');
    });

    test('format month', function (assert) {
        var expected = months, i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM'), expected[i], expected[i]);
            assert.equal(moment([2011, i, 1]).format('MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '٤٤ ثانية', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'دقيقة واحدة',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'دقيقة واحدة',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  'دقيقتان',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '٤٤ دقيقة',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ساعة واحدة',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ساعة واحدة',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  'ساعتان',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '٥ ساعات',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '٢١ ساعة',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'يوم واحد',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'يوم واحد',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  'يومان',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'يوم واحد',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '٥ أيام',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '٢٥ يومًا',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'شهر واحد',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'شهر واحد',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'شهر واحد',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  'شهران',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  'شهران',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '٣ أشهر',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'شهر واحد',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '٥ أشهر',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'عام واحد',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), 'عامان',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'عام واحد',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '٥ أعوام',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'بعد ٣٠ ثانية',  'prefix');
        assert.equal(moment(0).from(30000), 'منذ ٣٠ ثانية', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'منذ ثانية واحدة',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'بعد ٣٠ ثانية', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'بعد ٥ أيام', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'اليوم عند الساعة ٠٢:٠٠',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'اليوم عند الساعة ٠٢:٢٥',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'اليوم عند الساعة ٠٣:٠٠',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'غدًا عند الساعة ٠٢:٠٠',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'اليوم عند الساعة ٠١:٠٠',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'أمس عند الساعة ٠٢:٠٠', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [عند الساعة] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [عند الساعة] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [عند الساعة] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [عند الساعة] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [عند الساعة] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [عند الساعة] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
        assert.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
        assert.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
        assert.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
        assert.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');

        assert.equal(moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 6', 'gggg w d').format('gggg w d'), '٢٠٠٣ ١ ٦', 'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6');
        assert.equal(moment('2003 1 0', 'gggg w e').format('gggg w e'), '٢٠٠٣ ١ ٠', '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
        assert.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
        assert.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
        assert.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
        assert.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '١ ٠١ ١', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '١ ٠١ ١', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '٣ ٠٣ ٣', 'Jan 14 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

    test('no leading zeros in long date formats', function (assert) {
        var i, j, longDateStr, shortDateStr;
        for (i = 1; i <= 9; ++i) {
            for (j = 1; j <= 9; ++j) {
                longDateStr = moment([2014, i, j]).format('L');
                shortDateStr = moment([2014, i, j]).format('l');
                assert.equal(longDateStr, shortDateStr, 'should not have leading zeros in month or day');
            }
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('az');

    test('parse', function (assert) {
        var tests = 'yanvar yan_fevral fev_mart mar_Aprel apr_may may_iyun iyn_iyul iyl_Avqust avq_sentyabr sen_oktyabr okt_noyabr noy_dekabr dek'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, D MMMM YYYY, HH:mm:ss',        'Bazar, 14 fevral 2010, 15:25:50'],
                ['ddd, A h',                           'Baz, gündüz 3'],
                ['M Mo MM MMMM MMM',                   '2 2-nci 02 fevral fev'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-üncü 14'],
                ['d do dddd ddd dd',                   '0 0-ıncı Bazar Baz Bz'],
                ['DDD DDDo DDDD',                      '45 45-inci 045'],
                ['w wo ww',                            '7 7-nci 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'gündüz gündüz'],
                ['[ilin] DDDo [günü]',                 'ilin 45-inci günü'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 fevral 2010'],
                ['LLL',                                '14 fevral 2010 15:25'],
                ['LLLL',                               'Bazar, 14 fevral 2010 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 fev 2010'],
                ['lll',                                '14 fev 2010 15:25'],
                ['llll',                               'Baz, 14 fev 2010 15:25']
            ],
            DDDo = [
                [359, '360-ıncı'],
                [199, '200-üncü'],
                [149, '150-nci']
            ],
            dt = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            DDDoDt,
            i;

        for (i = 0; i < a.length; i++) {
            assert.equal(dt.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        for (i = 0; i < DDDo.length; i++) {
            DDDoDt = moment([2010]);
            assert.equal(DDDoDt.add(DDDo[i][0], 'days').format('DDDo'), DDDo[i][1], DDDo[i][0] + ' ---> ' + DDDo[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-inci', '1st');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-nci', '2nd');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-üncü', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-üncü', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-inci', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-ncı', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-nci', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-inci', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-uncu', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-uncu', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-inci', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-nci', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-üncü', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-üncü', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-inci', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-ncı', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-nci', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-inci', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-uncu', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-nci', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-inci', '21th');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-nci', '22th');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-üncü', '23th');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-üncü', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-inci', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-ncı', '26th');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-nci', '27th');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-inci', '28th');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-uncu', '29th');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-uncu', '30th');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-inci', '31st');
    });

    test('format month', function (assert) {
        var expected = 'yanvar yan_fevral fev_mart mar_aprel apr_may may_iyun iyn_iyul iyl_avqust avq_sentyabr sen_oktyabr okt_noyabr noy_dekabr dek'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Bazar Baz Bz_Bazar ertəsi BzE BE_Çərşənbə axşamı ÇAx ÇA_Çərşənbə Çər Çə_Cümə axşamı CAx CA_Cümə Cüm Cü_Şənbə Şən Şə'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'birneçə saniyyə', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'bir dəqiqə',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'bir dəqiqə',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 dəqiqə',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 dəqiqə',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'bir saat',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'bir saat',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 saat',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 saat',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 saat',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'bir gün',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'bir gün',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 gün',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'bir gün',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 gün',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 gün',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'bir ay',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'bir ay',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ay',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ay',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ay',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'bir ay',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ay',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'bir il',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 il',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'bir il',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 il',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'birneçə saniyyə sonra',  'prefix');
        assert.equal(moment(0).from(30000), 'birneçə saniyyə əvvəl', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'birneçə saniyyə əvvəl',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'birneçə saniyyə sonra', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 gün sonra', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'bugün saat 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'bugün saat 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'bugün saat 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'sabah saat 02:00',     'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'bugün saat 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'dünən 02:00',          'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[gələn həftə] dddd [saat] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[gələn həftə] dddd [saat] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[gələn həftə] dddd [saat] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[keçən həftə] dddd [saat] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[keçən həftə] dddd [saat] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[keçən həftə] dddd [saat] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-inci', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-inci', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-nci', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-nci', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-üncü', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('be');

    test('parse', function (assert) {
        var tests = 'студзень студ_люты лют_сакавік сак_красавік крас_травень трав_чэрвень чэрв_ліпень ліп_жнівень жнів_верасень вер_кастрычнік каст_лістапад ліст_снежань снеж'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, HH:mm:ss',       'нядзеля, 14-га лютага 2010, 15:25:50'],
                ['ddd, h A',                           'нд, 3 дня'],
                ['M Mo MM MMMM MMM',                   '2 2-і 02 люты лют'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-га 14'],
                ['d do dddd ddd dd',                   '0 0-ы нядзеля нд нд'],
                ['DDD DDDo DDDD',                      '45 45-ы 045'],
                ['w wo ww',                            '7 7-ы 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'дня дня'],
                ['DDDo [дзень года]',                   '45-ы дзень года'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 лютага 2010 г.'],
                ['LLL',                                '14 лютага 2010 г., 15:25'],
                ['LLLL',                               'нядзеля, 14 лютага 2010 г., 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 лют 2010 г.'],
                ['lll',                                '14 лют 2010 г., 15:25'],
                ['llll',                               'нд, 14 лют 2010 г., 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format meridiem', function (assert) {
        assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), 'ночы', 'night');
        assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), 'ночы', 'night');
        assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), 'раніцы', 'morning');
        assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), 'раніцы', 'morning');
        assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), 'дня', 'afternoon');
        assert.equal(moment([2012, 11, 28, 16, 59]).format('A'), 'дня', 'afternoon');
        assert.equal(moment([2012, 11, 28, 17, 0]).format('A'), 'вечара', 'evening');
        assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), 'вечара', 'evening');
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-ы', '1-ы');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-і', '2-і');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-і', '3-і');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-ы', '4-ы');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-ы', '5-ы');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-ы', '6-ы');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-ы', '7-ы');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-ы', '8-ы');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-ы', '9-ы');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-ы', '10-ы');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-ы', '11-ы');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-ы', '12-ы');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-ы', '13-ы');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-ы', '14-ы');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-ы', '15-ы');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-ы', '16-ы');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-ы', '17-ы');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-ы', '18-ы');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-ы', '19-ы');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-ы', '20-ы');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-ы', '21-ы');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-і', '22-і');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-і', '23-і');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-ы', '24-ы');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-ы', '25-ы');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-ы', '26-ы');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-ы', '27-ы');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-ы', '28-ы');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-ы', '29-ы');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-ы', '30-ы');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-ы', '31-ы');
    });

    test('format month', function (assert) {
        var expected = 'студзень студ_люты лют_сакавік сак_красавік крас_травень трав_чэрвень чэрв_ліпень ліп_жнівень жнів_верасень вер_кастрычнік каст_лістапад ліст_снежань снеж'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format month case', function (assert) {
        var months = {
            'nominative': 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_'),
            'accusative': 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
        }
    });

    test('format month case with escaped symbols', function (assert) {
        var months = {
            'nominative': 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_'),
            'accusative': 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2013, i, 1]).format('D[] MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'), '<i>1</i> <b>' + months.accusative[i] + '</b>', '1 <b>' + months.accusative[i] + '</b>');
            assert.equal(moment([2013, i, 1]).format('D[-ы дзень] MMMM'), '1-ы дзень ' + months.accusative[i], '1-ы дзень ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('D, MMMM'), '1, ' + months.nominative[i], '1, ' + months.nominative[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'нядзеля нд нд_панядзелак пн пн_аўторак ат ат_серада ср ср_чацвер чц чц_пятніца пт пт_субота сб сб'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'некалькі секунд',    '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'хвіліна',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'хвіліна',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 хвіліны',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 31}), true),  '31 хвіліна',  '31 minutes = 31 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 хвіліны', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'гадзіна',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'гадзіна',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 гадзіны',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 гадзін',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 гадзіна',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'дзень',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'дзень',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 дні',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'дзень',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 дзён',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 11}), true),  '11 дзён',     '11 days = 11 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 21}), true),  '21 дзень',     '21 days = 21 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 дзён',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'месяц',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'месяц',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'месяц',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 месяцы',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 месяцы',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 месяцы',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'месяц',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 месяцаў',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'год',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 гады',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'год',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 гадоў',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'праз некалькі секунд', 'prefix');
        assert.equal(moment(0).from(30000), 'некалькі секунд таму', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'праз некалькі секунд', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'праз 5 дзён', 'in 5 days');
        assert.equal(moment().add({m: 31}).fromNow(), 'праз 31 хвіліну', 'in 31 minutes = in 31 minutes');
        assert.equal(moment().subtract({m: 31}).fromNow(), '31 хвіліну таму', '31 minutes ago = 31 minutes ago');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Сёння ў 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Сёння ў 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Сёння ў 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Заўтра ў 02:00',      'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Сёння ў 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Учора ў 02:00',       'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        function makeFormat(d) {
            return '[У] dddd [ў] LT';
        }

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
            case 3:
            case 5:
            case 6:
                return '[У мінулую] dddd [ў] LT';
            case 1:
            case 2:
            case 4:
                return '[У мінулы] dddd [ў] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-ы', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-ы', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-і', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-і', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-і', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('bg');

    test('parse', function (assert) {
        var tests = 'януари янр_февруари фев_март мар_април апр_май май_юни юни_юли юли_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, H:mm:ss',        'неделя, февруари 14-ти 2010, 15:25:50'],
                ['ddd, hA',                            'нед, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2-ри 02 февруари фев'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-ти 14'],
                ['d do dddd ddd dd',                   '0 0-ев неделя нед нд'],
                ['DDD DDDo DDDD',                      '45 45-ти 045'],
                ['w wo ww',                            '7 7-ми 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45-ти day of the year'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 февруари 2010'],
                ['LLL',                                '14 февруари 2010 15:25'],
                ['LLLL',                               'неделя, 14 февруари 2010 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 фев 2010'],
                ['lll',                                '14 фев 2010 15:25'],
                ['llll',                               'нед, 14 фев 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-ви', '1-ви');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-ри', '2-ри');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-ти', '3-ти');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-ти', '4-ти');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-ти', '5-ти');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-ти', '6-ти');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-ми', '7-ми');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-ми', '8-ми');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-ти', '9-ти');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-ти', '10-ти');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-ти', '11-ти');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-ти', '12-ти');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-ти', '13-ти');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-ти', '14-ти');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-ти', '15-ти');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-ти', '16-ти');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-ти', '17-ти');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-ти', '18-ти');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-ти', '19-ти');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-ти', '20-ти');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-ви', '21-ви');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-ри', '22-ри');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-ти', '23-ти');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-ти', '24-ти');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-ти', '25-ти');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-ти', '26-ти');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-ми', '27-ми');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-ми', '28-ми');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-ти', '29-ти');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-ти', '30-ти');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-ви', '31-ви');
    });

    test('format month', function (assert) {
        var expected = 'януари янр_февруари фев_март мар_април апр_май май_юни юни_юли юли_август авг_септември сеп_октомври окт_ноември ное_декември дек'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'неделя нед нд_понеделник пон пн_вторник вто вт_сряда сря ср_четвъртък чет чт_петък пет пт_събота съб сб'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'няколко секунди', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'минута',          '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'минута',          '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 минути',        '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 минути',       '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'час',             '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'час',             '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 часа',          '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 часа',          '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 часа',         '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ден',             '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ден',             '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 дни',           '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ден',             '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 дни',           '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 дни',          '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'месец',           '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'месец',           '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'месец',           '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 месеца',        '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 месеца',        '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 месеца',        '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'месец',           '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 месеца',        '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'година',          '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 години',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'година',          '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 години',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'след няколко секунди',  'prefix');
        assert.equal(moment(0).from(30000), 'преди няколко секунди', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'преди няколко секунди',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'след няколко секунди', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'след 5 дни', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Днес в 2:00',  'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Днес в 2:25',  'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Днес в 3:00',  'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Утре в 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Днес в 1:00',  'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Вчера в 2:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [в] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [в] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [в] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
            case 3:
            case 6:
                return '[В изминалата] dddd [в] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[В изминалия] dddd [в] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-ви', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-ви', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-ри', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-ри', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-ти', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('bn');

    test('parse', function (assert) {
        var tests = 'জানুয়ারী জানু_ফেবুয়ারী ফেব_মার্চ মার্চ_এপ্রিল এপর_মে মে_জুন জুন_জুলাই জুল_অগাস্ট অগ_সেপ্টেম্বর সেপ্ট_অক্টোবর অক্টো_নভেম্বর নভ_ডিসেম্বর ডিসেম্'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, a h:mm:ss সময়',  'রবিবার, ১৪ ফেবুয়ারী ২০১০, দুপুর ৩:২৫:৫০ সময়'],
                ['ddd, a h সময়',                       'রবি, দুপুর ৩ সময়'],
                ['M Mo MM MMMM MMM',                   '২ ২ ০২ ফেবুয়ারী ফেব'],
                ['YYYY YY',                            '২০১০ ১০'],
                ['D Do DD',                            '১৪ ১৪ ১৪'],
                ['d do dddd ddd dd',                   '০ ০ রবিবার রবি রব'],
                ['DDD DDDo DDDD',                      '৪৫ ৪৫ ০৪৫'],
                ['w wo ww',                            '৮ ৮ ০৮'],
                ['h hh',                               '৩ ০৩'],
                ['H HH',                               '১৫ ১৫'],
                ['m mm',                               '২৫ ২৫'],
                ['s ss',                               '৫০ ৫০'],
                ['a A',                                'দুপুর দুপুর'],
                ['LT',                                 'দুপুর ৩:২৫ সময়'],
                ['LTS',                                'দুপুর ৩:২৫:৫০ সময়'],
                ['L',                                  '১৪/০২/২০১০'],
                ['LL',                                 '১৪ ফেবুয়ারী ২০১০'],
                ['LLL',                                '১৪ ফেবুয়ারী ২০১০, দুপুর ৩:২৫ সময়'],
                ['LLLL',                               'রবিবার, ১৪ ফেবুয়ারী ২০১০, দুপুর ৩:২৫ সময়'],
                ['l',                                  '১৪/২/২০১০'],
                ['ll',                                 '১৪ ফেব ২০১০'],
                ['lll',                                '১৪ ফেব ২০১০, দুপুর ৩:২৫ সময়'],
                ['llll',                               'রবি, ১৪ ফেব ২০১০, দুপুর ৩:২৫ সময়']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '১', '১');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '২', '২');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '৩', '৩');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '৪', '৪');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '৫', '৫');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '৬', '৬');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '৭', '৭');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '৮', '৮');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '৯', '৯');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '১০', '১০');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '১১', '১১');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '১২', '১২');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '১৩', '১৩');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '১৪', '১৪');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '১৫', '১৫');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '১৬', '১৬');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '১৭', '১৭');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '১৮', '১৮');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '১৯', '১৯');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '২০', '২০');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '২১', '২১');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '২২', '২২');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '২৩', '২৩');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '২৪', '২৪');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '২৫', '২৫');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '২৬', '২৬');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '২৭', '২৭');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '২৮', '२৮');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '২৯', '২৯');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '৩০', '৩০');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '৩১', '৩১');
    });

    test('format month', function (assert) {
        var expected = 'জানুয়ারী জানু_ফেবুয়ারী ফেব_মার্চ মার্চ_এপ্রিল এপর_মে মে_জুন জুন_জুলাই জুল_অগাস্ট অগ_সেপ্টেম্বর সেপ্ট_অক্টোবর অক্টো_নভেম্বর নভ_ডিসেম্বর ডিসেম্'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'রবিবার রবি রব_সোমবার সোম সম_মঙ্গলবার মঙ্গল মঙ্গ_বুধবার বুধ বু_বৃহস্পত্তিবার বৃহস্পত্তি ব্রিহ_শুক্রুবার শুক্রু শু_শনিবার শনি শনি'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'কএক সেকেন্ড', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'এক মিনিট',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'এক মিনিট',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '২ মিনিট',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '৪৪ মিনিট',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'এক ঘন্টা',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'এক ঘন্টা',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '২ ঘন্টা',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '৫ ঘন্টা',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '২১ ঘন্টা',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'এক দিন',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'এক দিন',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '২ দিন',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'এক দিন',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '৫ দিন',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '২৫ দিন',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'এক মাস',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'এক মাস',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '২ মাস',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '২ মাস',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '৩ মাস',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'এক মাস',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '৫ মাস',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'এক বছর',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '২ বছর',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'এক বছর',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '৫ বছর',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'কএক সেকেন্ড পরে',  'prefix');
        assert.equal(moment(0).from(30000), 'কএক সেকেন্ড আগে', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'কএক সেকেন্ড আগে',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'কএক সেকেন্ড পরে', 'কএক সেকেন্ড পরে');
        assert.equal(moment().add({d: 5}).fromNow(), '৫ দিন পরে', '৫ দিন পরে');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'আজ রাত ২:০০ সময়',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'আজ রাত ২:২৫ সময়',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 3}).calendar(),       'আজ সকাল ৫:০০ সময়',     'Now plus 3 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'আগামীকাল রাত ২:০০ সময়',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'আজ রাত ১:০০ সময়',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'গতকাল রাত ২:০০ সময়', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[গত] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[গত] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[গত] dddd[,] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('meridiem', function (assert) {
        assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'রাত', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'সকাল', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'দুপুর', 'during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'বিকেল', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'বিকেল', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'রাত', 'night');

        assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'রাত', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'সকাল', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'দুপুর', ' during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'বিকেল', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'বিকেল', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'রাত', 'night');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '১ ০১ ১', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '১ ০১ ১', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '২ ০২ ২', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '২ ০২ ২', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '৩ ০৩ ৩', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('bo');

    test('parse', function (assert) {
        var tests = 'ཟླ་བ་དང་པོ ཟླ་བ་དང་པོ._ཟླ་བ་གཉིས་པ ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་བ་བཅུ་གཉིས་པ'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, a h:mm:ss ལ་',  'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥:༥༠ ལ་'],
                ['ddd, a h ལ་',                       'ཉི་མ་, ཉིན་གུང ༣ ལ་'],
                ['M Mo MM MMMM MMM',                   '༢ ༢ ༠༢ ཟླ་བ་གཉིས་པ ཟླ་བ་གཉིས་པ'],
                ['YYYY YY',                            '༢༠༡༠ ༡༠'],
                ['D Do DD',                            '༡༤ ༡༤ ༡༤'],
                ['d do dddd ddd dd',                   '༠ ༠ གཟའ་ཉི་མ་ ཉི་མ་ ཉི་མ་'],
                ['DDD DDDo DDDD',                      '༤༥ ༤༥ ༠༤༥'],
                ['w wo ww',                            '༨ ༨ ༠༨'],
                ['h hh',                               '༣ ༠༣'],
                ['H HH',                               '༡༥ ༡༥'],
                ['m mm',                               '༢༥ ༢༥'],
                ['s ss',                               '༥༠ ༥༠'],
                ['a A',                                'ཉིན་གུང ཉིན་གུང'],
                ['LT',                                 'ཉིན་གུང ༣:༢༥'],
                ['LTS',                                'ཉིན་གུང ༣:༢༥:༥༠'],
                ['L',                                  '༡༤/༠༢/༢༠༡༠'],
                ['LL',                                 '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠'],
                ['LLL',                                '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['LLLL',                               'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['l',                                  '༡༤/༢/༢༠༡༠'],
                ['ll',                                 '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠'],
                ['lll',                                '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['llll',                               'ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '༡', '༡');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '༢', '༢');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '༣', '༣');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '༤', '༤');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '༥', '༥');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '༦', '༦');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '༧', '༧');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '༨', '༨');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '༩', '༩');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '༡༠', '༡༠');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '༡༡', '༡༡');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '༡༢', '༡༢');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '༡༣', '༡༣');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '༡༤', '༡༤');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '༡༥', '༡༥');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '༡༦', '༡༦');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '༡༧', '༡༧');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '༡༨', '༡༨');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '༡༩', '༡༩');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '༢༠', '༢༠');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '༢༡', '༢༡');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '༢༢', '༢༢');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '༢༣', '༢༣');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '༢༤', '༢༤');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '༢༥', '༢༥');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '༢༦', '༢༦');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '༢༧', '༢༧');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '༢༨', '༢༨');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '༢༩', '༢༩');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '༣༠', '༣༠');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '༣༡', '༣༡');
    });

    test('format month', function (assert) {
        var expected = 'ཟླ་བ་དང་པོ ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་བ་བཅུ་གཉིས་པ'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'གཟའ་ཉི་མ་ ཉི་མ་ ཉི་མ་_གཟའ་ཟླ་བ་ ཟླ་བ་ ཟླ་བ་_གཟའ་མིག་དམར་ མིག་དམར་ མིག་དམར་_གཟའ་ལྷག་པ་ ལྷག་པ་ ལྷག་པ་_གཟའ་ཕུར་བུ ཕུར་བུ ཕུར་བུ_གཟའ་པ་སངས་ པ་སངས་ པ་སངས་_གཟའ་སྤེན་པ་ སྤེན་པ་ སྤེན་པ་'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ལམ་སང', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'སྐར་མ་གཅིག',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'སྐར་མ་གཅིག',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '༢ སྐར་མ',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '༤༤ སྐར་མ',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ཆུ་ཚོད་གཅིག',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ཆུ་ཚོད་གཅིག',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '༢ ཆུ་ཚོད',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '༥ ཆུ་ཚོད',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '༢༡ ཆུ་ཚོད',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ཉིན་གཅིག',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ཉིན་གཅིག',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '༢ ཉིན་',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ཉིན་གཅིག',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '༥ ཉིན་',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '༢༥ ཉིན་',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ཟླ་བ་གཅིག',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ཟླ་བ་གཅིག',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ཟླ་བ་གཅིག',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '༢ ཟླ་བ',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '༢ ཟླ་བ',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '༣ ཟླ་བ',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ཟླ་བ་གཅིག',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '༥ ཟླ་བ',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ལོ་གཅིག',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '༢ ལོ',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ལོ་གཅིག',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '༥ ལོ',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'ལམ་སང ལ་',  'prefix');
        assert.equal(moment(0).from(30000), 'ལམ་སང སྔན་ལ', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'ལམ་སང སྔན་ལ',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'ལམ་སང ལ་', 'ལམ་སང ལ་');
        assert.equal(moment().add({d: 5}).fromNow(), '༥ ཉིན་ ལ་', '༥ ཉིན་ ལ་');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'དི་རིང མཚན་མོ ༢:༠༠',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'དི་རིང མཚན་མོ ༢:༢༥',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 3}).calendar(),       'དི་རིང ཞོགས་ཀས ༥:༠༠',     'Now plus 3 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'སང་ཉིན མཚན་མོ ༢:༠༠',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'དི་རིང མཚན་མོ ༡:༠༠',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'ཁ་སང མཚན་མོ ༢:༠༠', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('meridiem', function (assert) {
        assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'མཚན་མོ', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'ཞོགས་ཀས', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'ཉིན་གུང', 'during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'དགོང་དག', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'དགོང་དག', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'མཚན་མོ', 'night');

        assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'མཚན་མོ', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'ཞོགས་ཀས', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'ཉིན་གུང', ' during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'དགོང་དག', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'དགོང་དག', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'མཚན་མོ', 'night');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '༡ ༠༡ ༡', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '༡ ༠༡ ༡', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '༢ ༠༢ ༢', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '༢ ༠༢ ༢', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '༣ ༠༣ ༣', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('br');

    test('parse', function (assert) {
        var tests = 'Genver Gen_C\'hwevrer C\'hwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        moment.locale('br');
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sul, C\'hwevrer 14vet 2010, 3:25:50 pm'],
                ['ddd, h A',                            'Sul, 3 PM'],
                ['M Mo MM MMMM MMM',                   '2 2vet 02 C\'hwevrer C\'hwe'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14vet 14'],
                ['d do dddd ddd dd',                   '0 0vet Sul Sul Su'],
                ['DDD DDDo DDDD',                      '45 45vet 045'],
                ['w wo ww',                            '6 6vet 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['DDDo [devezh] [ar] [vloaz]',       '45vet devezh ar vloaz'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 a viz C\'hwevrer 2010'],
                ['LLL',                                '14 a viz C\'hwevrer 2010 3e25 PM'],
                ['LLLL',                               'Sul, 14 a viz C\'hwevrer 2010 3e25 PM']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        moment.locale('br');
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1añ', '1añ');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2vet', '2vet');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3vet', '3vet');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4vet', '4vet');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5vet', '5vet');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6vet', '6vet');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7vet', '7vet');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8vet', '8vet');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9vet', '9vet');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10vet', '10vet');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11vet', '11vet');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12vet', '12vet');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13vet', '13vet');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14vet', '14vet');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15vet', '15vet');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16vet', '16vet');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17vet', '17vet');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18vet', '18vet');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19vet', '19vet');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20vet', '20vet');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21vet', '21vet');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22vet', '22vet');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23vet', '23vet');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24vet', '24vet');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25vet', '25vet');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26vet', '26vet');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27vet', '27vet');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28vet', '28vet');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29vet', '29vet');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30vet', '30vet');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31vet', '31vet');
    });

    test('format month', function (assert) {
        moment.locale('br');
        var expected = 'Genver Gen_C\'hwevrer C\'hwe_Meurzh Meu_Ebrel Ebr_Mae Mae_Mezheven Eve_Gouere Gou_Eost Eos_Gwengolo Gwe_Here Her_Du Du_Kerzu Ker'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        moment.locale('br');
        var expected = 'Sul Sul Su_Lun Lun Lu_Meurzh Meu Me_Merc\'her Mer Mer_Yaou Yao Ya_Gwener Gwe Gw_Sadorn Sad Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        moment.locale('br');
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'un nebeud segondennoù', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ur vunutenn',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ur vunutenn',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 vunutenn',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 munutenn',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'un eur',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'un eur',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 eur',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 eur',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 eur',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un devezh',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un devezh',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 zevezh',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un devezh',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 devezh',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 devezh',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ur miz',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ur miz',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ur miz',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 viz',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 viz',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 miz',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ur miz',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 miz',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ur bloaz',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 vloaz',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ur bloaz',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 bloaz',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        moment.locale('br');
        assert.equal(moment(30000).from(0), 'a-benn un nebeud segondennoù',  'prefix');
        assert.equal(moment(0).from(30000), 'un nebeud segondennoù \'zo', 'suffix');
    });

    test('now from now', function (assert) {
        moment.locale('br');
        assert.equal(moment().fromNow(), 'un nebeud segondennoù \'zo',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        moment.locale('br');
        assert.equal(moment().add({s: 30}).fromNow(), 'a-benn un nebeud segondennoù', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'a-benn 5 devezh', 'in 5 days');
    });

    test('calendar day', function (assert) {
        moment.locale('br');

        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Hiziv da 2e00 AM',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Hiziv da 2e25 AM',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Hiziv da 3e00 AM',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Warc\'hoazh da 2e00 AM',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Hiziv da 1e00 AM',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Dec\'h da 2e00 AM', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        moment.locale('br');

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [da] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [da] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [da] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        moment.locale('br');

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [paset da] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [paset da] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [paset da] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        moment.locale('br');
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('special mutations for years', function (assert) {
        moment.locale('br');
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true), 'ur bloaz', 'mutation 1 year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 2}), true), '2 vloaz', 'mutation 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 3}), true), '3 bloaz', 'mutation 3 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 4}), true), '4 bloaz', 'mutation 4 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true), '5 bloaz', 'mutation 5 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 9}), true), '9 bloaz', 'mutation 9 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 10}), true), '10 vloaz', 'mutation 10 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 21}), true), '21 bloaz', 'mutation 21 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 22}), true), '22 vloaz', 'mutation 22 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 133}), true), '133 bloaz', 'mutation 133 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 148}), true), '148 vloaz', 'mutation 148 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 261}), true), '261 bloaz', 'mutation 261 years');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('bs');

    test('parse', function (assert) {
        var tests = 'januar jan._februar feb._mart mar._april apr._maj maj._juni jun._juli jul._august aug._septembar sep._oktobar okt._novembar nov._decembar dec.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'nedjelja, 14. februar 2010, 3:25:50 pm'],
                ['ddd, hA',                            'ned., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 februar feb.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. nedjelja ned. ne'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '7 7. 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45. day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14. 02. 2010'],
                ['LL',                                 '14. februar 2010'],
                ['LLL',                                '14. februar 2010 15:25'],
                ['LLLL',                               'nedjelja, 14. februar 2010 15:25'],
                ['l',                                  '14. 2. 2010'],
                ['ll',                                 '14. feb. 2010'],
                ['lll',                                '14. feb. 2010 15:25'],
                ['llll',                               'ned., 14. feb. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'januar jan._februar feb._mart mar._april apr._maj maj._juni jun._juli jul._august aug._septembar sep._oktobar okt._novembar nov._decembar dec.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'nedjelja ned. ne_ponedjeljak pon. po_utorak uto. ut_srijeda sri. sr_četvrtak čet. če_petak pet. pe_subota sub. su'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'par sekundi', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'jedna minuta',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'jedna minuta',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuta',     '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'jedan sat',      '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'jedan sat',      '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 sata',        '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 sati',         '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 sati',        '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'dan',       '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'dan',       '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dana',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'dan',       '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dana',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dana',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'mjesec',     '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'mjesec',     '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'mjesec',     '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mjeseca',     '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mjeseca',     '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mjeseca',     '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'mjesec',     '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mjeseci',    '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'godinu',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 godine',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'godinu',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 godina',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'za par sekundi',  'prefix');
        assert.equal(moment(0).from(30000), 'prije par sekundi', 'prefix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'prije par sekundi',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'za par sekundi', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'za 5 dana', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'danas u 2:00',  'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'danas u 2:25',  'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'danas u 3:00',  'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'sutra u 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'danas u 1:00',  'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'jučer u 2:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
                return '[u] [nedjelju] [u] LT';
            case 3:
                return '[u] [srijedu] [u] LT';
            case 6:
                return '[u] [subotu] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[u] dddd [u] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
            case 3:
                return '[prošlu] dddd [u] LT';
            case 6:
                return '[prošle] [subote] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[prošli] dddd [u] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1.', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1.', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2.', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2.', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3.', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('ca');

    test('parse', function (assert) {
        var tests = 'gener gen._febrer febr._març mar._abril abr._maig mai._juny jun._juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'diumenge, 14è febrer 2010, 3:25:50 pm'],
                ['ddd, hA',                            'dg., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2n 02 febrer febr.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14è 14'],
                ['d do dddd ddd dd',                   '0 0è diumenge dg. Dg'],
                ['DDD DDDo DDDD',                      '45 45è 045'],
                ['w wo ww',                            '6 6a 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45è day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 febrer 2010'],
                ['LLL',                                '14 febrer 2010 15:25'],
                ['LLLL',                               'diumenge 14 febrer 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 febr. 2010'],
                ['lll',                                '14 febr. 2010 15:25'],
                ['llll',                               'dg. 14 febr. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1r', '1r');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2n', '2n');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3r', '3r');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4t', '4t');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5è', '5è');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6è', '6è');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7è', '7è');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8è', '8è');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9è', '9è');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10è', '10è');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11è', '11è');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12è', '12è');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13è', '13è');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14è', '14è');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15è', '15è');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16è', '16è');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17è', '17è');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18è', '18è');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19è', '19è');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20è', '20è');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21è', '21è');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22è', '22è');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23è', '23è');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24è', '24è');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25è', '25è');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26è', '26è');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27è', '27è');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28è', '28è');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29è', '29è');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30è', '30è');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31è', '31è');
    });

    test('format month', function (assert) {
        var expected = 'gener gen._febrer febr._març mar._abril abr._maig mai._juny jun._juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'diumenge dg. Dg_dilluns dl. Dl_dimarts dt. Dt_dimecres dc. Dc_dijous dj. Dj_divendres dv. Dv_dissabte ds. Ds'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'uns segons', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'un minut',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'un minut',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minuts',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuts',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'una hora',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'una hora',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hores',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hores',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hores',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un dia',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un dia',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dies',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un dia',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dies',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dies',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mes',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mes',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mes',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mesos',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mesos',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mesos',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mes',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mesos',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un any',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 anys',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un any',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 anys',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'en uns segons',  'prefix');
        assert.equal(moment(0).from(30000), 'fa uns segons', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'fa uns segons',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'en uns segons', 'en uns segons');
        assert.equal(moment().add({d: 5}).fromNow(), 'en 5 dies', 'en 5 dies');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                         'avui a les 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),          'avui a les 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),           'avui a les 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),           'demà a les 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'demà a la 1:00',   'tomorrow minus 1 hour');
        assert.equal(moment(a).subtract({h: 1}).calendar(),      'avui a la 1:00',      'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),      'ahir a les 2:00',    'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[el] dddd [passat a ' + ((m.hours() !== 1) ? 'les' : 'la') + '] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52a', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1a', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1a', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2a', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2a', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('cs');

    test('parse', function (assert) {
        var tests = 'leden led_únor úno_březen bře_duben dub_květen kvě_červen čvn_červenec čvc_srpen srp_září zář_říjen říj_listopad lis_prosinec pro'.split('_'), i;
        function equalTest(input, mmm, monthIndex) {
            assert.equal(moment(input, mmm).month(), monthIndex, input + ' should be month ' + (monthIndex + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss',  'neděle, únor 14. 2010, 3:25:50'],
                ['ddd, h',                       'ne, 3'],
                ['M Mo MM MMMM MMM',             '2 2. 02 únor úno'],
                ['YYYY YY',                      '2010 10'],
                ['D Do DD',                      '14 14. 14'],
                ['d do dddd ddd dd',             '0 0. neděle ne ne'],
                ['DDD DDDo DDDD',                '45 45. 045'],
                ['w wo ww',                      '6 6. 06'],
                ['h hh',                         '3 03'],
                ['H HH',                         '15 15'],
                ['m mm',                         '25 25'],
                ['s ss',                         '50 50'],
                ['a A',                          'pm PM'],
                ['DDDo [den v roce]',            '45. den v roce'],
                ['LTS',                          '15:25:50'],
                ['L',                            '14.02.2010'],
                ['LL',                           '14. únor 2010'],
                ['LLL',                          '14. únor 2010 15:25'],
                ['LLLL',                         'neděle 14. únor 2010 15:25'],
                ['l',                            '14.2.2010'],
                ['ll',                           '14. úno 2010'],
                ['lll',                          '14. úno 2010 15:25'],
                ['llll',                         'ne 14. úno 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'leden led_únor úno_březen bře_duben dub_květen kvě_červen čvn_červenec čvc_srpen srp_září zář_říjen říj_listopad lis_prosinec pro'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'neděle ne ne_pondělí po po_úterý út út_středa st st_čtvrtek čt čt_pátek pá pá_sobota so so'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'pár sekund',  '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'minuta',        '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'minuta',        '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minuty',      '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minut',     '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'hodina',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'hodina',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hodiny',     '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hodin',      '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hodin',     '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'den',       '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'den',       '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dny',         '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'den',       '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dní',         '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dní',        '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'měsíc',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'měsíc',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'měsíc',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 měsíce',    '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 měsíce',    '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 měsíce',    '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'měsíc',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 měsíců',    '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'rok',           '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 roky',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'rok',           '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 let',         '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'za pár sekund',  'prefix');
        assert.equal(moment(0).from(30000), 'před pár sekundami', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'před pár sekundami',  'now from now should display as in the past');
    });

    test('fromNow (future)', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'za pár sekund', 'in a few seconds');
        assert.equal(moment().add({m: 1}).fromNow(), 'za minutu', 'in a minute');
        assert.equal(moment().add({m: 3}).fromNow(), 'za 3 minuty', 'in 3 minutes');
        assert.equal(moment().add({m: 10}).fromNow(), 'za 10 minut', 'in 10 minutes');
        assert.equal(moment().add({h: 1}).fromNow(), 'za hodinu', 'in an hour');
        assert.equal(moment().add({h: 3}).fromNow(), 'za 3 hodiny', 'in 3 hours');
        assert.equal(moment().add({h: 10}).fromNow(), 'za 10 hodin', 'in 10 hours');
        assert.equal(moment().add({d: 1}).fromNow(), 'za den', 'in a day');
        assert.equal(moment().add({d: 3}).fromNow(), 'za 3 dny', 'in 3 days');
        assert.equal(moment().add({d: 10}).fromNow(), 'za 10 dní', 'in 10 days');
        assert.equal(moment().add({M: 1}).fromNow(), 'za měsíc', 'in a month');
        assert.equal(moment().add({M: 3}).fromNow(), 'za 3 měsíce', 'in 3 months');
        assert.equal(moment().add({M: 10}).fromNow(), 'za 10 měsíců', 'in 10 months');
        assert.equal(moment().add({y: 1}).fromNow(), 'za rok', 'in a year');
        assert.equal(moment().add({y: 3}).fromNow(), 'za 3 roky', 'in 3 years');
        assert.equal(moment().add({y: 10}).fromNow(), 'za 10 let', 'in 10 years');
    });

    test('fromNow (past)', function (assert) {
        assert.equal(moment().subtract({s: 30}).fromNow(), 'před pár sekundami', 'a few seconds ago');
        assert.equal(moment().subtract({m: 1}).fromNow(), 'před minutou', 'a minute ago');
        assert.equal(moment().subtract({m: 3}).fromNow(), 'před 3 minutami', '3 minutes ago');
        assert.equal(moment().subtract({m: 10}).fromNow(), 'před 10 minutami', '10 minutes ago');
        assert.equal(moment().subtract({h: 1}).fromNow(), 'před hodinou', 'an hour ago');
        assert.equal(moment().subtract({h: 3}).fromNow(), 'před 3 hodinami', '3 hours ago');
        assert.equal(moment().subtract({h: 10}).fromNow(), 'před 10 hodinami', '10 hours ago');
        assert.equal(moment().subtract({d: 1}).fromNow(), 'před dnem', 'a day ago');
        assert.equal(moment().subtract({d: 3}).fromNow(), 'před 3 dny', '3 days ago');
        assert.equal(moment().subtract({d: 10}).fromNow(), 'před 10 dny', '10 days ago');
        assert.equal(moment().subtract({M: 1}).fromNow(), 'před měsícem', 'a month ago');
        assert.equal(moment().subtract({M: 3}).fromNow(), 'před 3 měsíci', '3 months ago');
        assert.equal(moment().subtract({M: 10}).fromNow(), 'před 10 měsíci', '10 months ago');
        assert.equal(moment().subtract({y: 1}).fromNow(), 'před rokem', 'a year ago');
        assert.equal(moment().subtract({y: 3}).fromNow(), 'před 3 lety', '3 years ago');
        assert.equal(moment().subtract({y: 10}).fromNow(), 'před 10 lety', '10 years ago');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'dnes v 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'dnes v 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'dnes v 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'zítra v 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'dnes v 1:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'včera v 2:00',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m, nextDay;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            nextDay = '';
            switch (m.day()) {
            case 0:
                nextDay = 'v neděli';
                break;
            case 1:
                nextDay = 'v pondělí';
                break;
            case 2:
                nextDay = 'v úterý';
                break;
            case 3:
                nextDay = 've středu';
                break;
            case 4:
                nextDay = 've čtvrtek';
                break;
            case 5:
                nextDay = 'v pátek';
                break;
            case 6:
                nextDay = 'v sobotu';
                break;
            }
            assert.equal(m.calendar(),       m.format('[' + nextDay + '] [v] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[' + nextDay + '] [v] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[' + nextDay + '] [v] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m, lastDay;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            lastDay = '';
            switch (m.day()) {
            case 0:
                lastDay = 'minulou neděli';
                break;
            case 1:
                lastDay = 'minulé pondělí';
                break;
            case 2:
                lastDay = 'minulé úterý';
                break;
            case 3:
                lastDay = 'minulou středu';
                break;
            case 4:
                lastDay = 'minulý čtvrtek';
                break;
            case 5:
                lastDay = 'minulý pátek';
                break;
            case 6:
                lastDay = 'minulou sobotu';
                break;
            }
            assert.equal(m.calendar(),       m.format('[' + lastDay + '] [v] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[' + lastDay + '] [v] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[' + lastDay + '] [v] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('humanize duration', function (assert) {
        assert.equal(moment.duration(1, 'minutes').humanize(), 'minuta', 'a minute (future)');
        assert.equal(moment.duration(1, 'minutes').humanize(true), 'za minutu', 'in a minute');
        assert.equal(moment.duration(-1, 'minutes').humanize(), 'minuta', 'a minute (past)');
        assert.equal(moment.duration(-1, 'minutes').humanize(true), 'před minutou', 'a minute ago');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('cv');

    test('parse', function (assert) {
        var tests = 'кӑрлач кӑр_нарӑс нар_пуш пуш_ака ака_май май_ҫӗртме ҫӗр_утӑ утӑ_ҫурла ҫур_авӑн авн_юпа юпа_чӳк чӳк_раштав раш'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'вырсарникун, нарӑс 14-мӗш 2010, 3:25:50 pm'],
                ['ddd, hA',                            'выр, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2-мӗш 02 нарӑс нар'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-мӗш 14'],
                ['d do dddd ddd dd',                   '0 0-мӗш вырсарникун выр вр'],
                ['DDD DDDo DDDD',                      '45 45-мӗш 045'],
                ['w wo ww',                            '7 7-мӗш 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['Ҫулӑн DDDo кунӗ',                    'Ҫулӑн 45-мӗш кунӗ'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14-02-2010'],
                ['LL',                                 '2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ'],
                ['LLL',                                '2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ, 15:25'],
                ['LLLL',                               'вырсарникун, 2010 ҫулхи нарӑс уйӑхӗн 14-мӗшӗ, 15:25'],
                ['l',                                  '14-2-2010'],
                ['ll',                                 '2010 ҫулхи нар уйӑхӗн 14-мӗшӗ'],
                ['lll',                                '2010 ҫулхи нар уйӑхӗн 14-мӗшӗ, 15:25'],
                ['llll',                               'выр, 2010 ҫулхи нар уйӑхӗн 14-мӗшӗ, 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-мӗш', '1-мӗш');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-мӗш', '2-мӗш');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-мӗш', '3-мӗш');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-мӗш', '4-мӗш');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-мӗш', '5-мӗш');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-мӗш', '6-мӗш');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-мӗш', '7-мӗш');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-мӗш', '8-мӗш');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-мӗш', '9-мӗш');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-мӗш', '10-мӗш');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-мӗш', '11-мӗш');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-мӗш', '12-мӗш');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-мӗш', '13-мӗш');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-мӗш', '14-мӗш');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-мӗш', '15-мӗш');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-мӗш', '16-мӗш');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-мӗш', '17-мӗш');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-мӗш', '18-мӗш');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-мӗш', '19-мӗш');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-мӗш', '20-мӗш');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-мӗш', '21-мӗш');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-мӗш', '22-мӗш');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-мӗш', '23-мӗш');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-мӗш', '24-мӗш');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-мӗш', '25-мӗш');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-мӗш', '26-мӗш');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-мӗш', '27-мӗш');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-мӗш', '28-мӗш');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-мӗш', '29-мӗш');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-мӗш', '30-мӗш');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-мӗш', '31-мӗш');
    });

    test('format month', function (assert) {
        var expected = 'кӑрлач кӑр_нарӑс нар_пуш пуш_ака ака_май май_ҫӗртме ҫӗр_утӑ утӑ_ҫурла ҫур_авӑн авн_юпа юпа_чӳк чӳк_раштав раш'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'вырсарникун выр вр_тунтикун тун тн_ытларикун ытл ыт_юнкун юн юн_кӗҫнерникун кӗҫ кҫ_эрнекун эрн эр_шӑматкун шӑм шм'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'пӗр-ик ҫеккунт', '44 sekunder = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'пӗр минут',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'пӗр минут',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 минут',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 минут',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'пӗр сехет',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'пӗр сехет',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 сехет',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 сехет',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 сехет',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'пӗр кун',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'пӗр кун',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 кун',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'пӗр кун',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 кун',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 кун',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'пӗр уйӑх',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'пӗр уйӑх',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'пӗр уйӑх',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 уйӑх',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 уйӑх',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 уйӑх',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'пӗр уйӑх',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 уйӑх',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'пӗр ҫул',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ҫул',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'пӗр ҫул',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ҫул',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'пӗр-ик ҫеккунтран',  'prefix');
        assert.equal(moment(0).from(30000), 'пӗр-ик ҫеккунт каялла', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'пӗр-ик ҫеккунт каялла',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'пӗр-ик ҫеккунтран', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 кунран', 'in 5 days');
        assert.equal(moment().add({h: 2}).fromNow(), '2 сехетрен', 'in 2 hours, the right suffix!');
        assert.equal(moment().add({y: 3}).fromNow(), '3 ҫултан', 'in 3 years, the right suffix!');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);
        assert.equal(moment(a).calendar(),                   'Паян 02:00 сехетре',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Паян 02:25 сехетре',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Паян 03:00 сехетре',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Ыран 02:00 сехетре',     'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Паян 01:00 сехетре',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Ӗнер 02:00 сехетре',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[Ҫитес] dddd LT [сехетре]'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Ҫитес] dddd LT [сехетре]'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Ҫитес] dddd LT [сехетре]'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Иртнӗ] dddd LT [сехетре]'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Иртнӗ] dddd LT [сехетре]'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Иртнӗ] dddd LT [сехетре]'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    // Monday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-мӗш', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-мӗш', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-мӗш', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-мӗш', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-мӗш', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('cy');

    test('parse', function (assert) {
        var tests = 'Ionawr Ion_Chwefror Chwe_Mawrth Maw_Ebrill Ebr_Mai Mai_Mehefin Meh_Gorffennaf Gor_Awst Aws_Medi Med_Hydref Hyd_Tachwedd Tach_Rhagfyr Rhag'.split('_'),
            i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Dydd Sul, Chwefror 14eg 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Sul, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2il 02 Chwefror Chwe'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14eg 14'],
                ['d do dddd ddd dd',                   '0 0 Dydd Sul Sul Su'],
                ['DDD DDDo DDDD',                      '45 45ain 045'],
                ['w wo ww',                            '6 6ed 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45ain day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Chwefror 2010'],
                ['LLL',                                '14 Chwefror 2010 15:25'],
                ['LLLL',                               'Dydd Sul, 14 Chwefror 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Chwe 2010'],
                ['lll',                                '14 Chwe 2010 15:25'],
                ['llll',                               'Sul, 14 Chwe 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1af', '1af');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2il', '2il');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3ydd', '3ydd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4ydd', '4ydd');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5ed', '5ed');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6ed', '6ed');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7ed', '7ed');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8fed', '8fed');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9fed', '9fed');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10fed', '10fed');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11eg', '11eg');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12fed', '12fed');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13eg', '13eg');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14eg', '14eg');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15fed', '15fed');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16eg', '16eg');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17eg', '17eg');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18fed', '18fed');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19eg', '19eg');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20fed', '20fed');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ain', '21ain');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ain', '22ain');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ain', '23ain');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ain', '24ain');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ain', '25ain');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ain', '26ain');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ain', '27ain');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ain', '28ain');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ain', '29ain');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ain', '30ain');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ain', '31ain');
    });

    test('format month', function (assert) {
        var expected = 'Ionawr Ion_Chwefror Chwe_Mawrth Maw_Ebrill Ebr_Mai Mai_Mehefin Meh_Gorffennaf Gor_Awst Aws_Medi Med_Hydref Hyd_Tachwedd Tach_Rhagfyr Rhag'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Dydd Sul Sul Su_Dydd Llun Llun Ll_Dydd Mawrth Maw Ma_Dydd Mercher Mer Me_Dydd Iau Iau Ia_Dydd Gwener Gwe Gw_Dydd Sadwrn Sad Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ychydig eiliadau', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'munud',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'munud',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 munud',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 munud', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'awr',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'awr',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 awr',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 awr',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 awr',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'diwrnod',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'diwrnod',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 diwrnod',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'diwrnod',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 diwrnod',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 diwrnod',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'mis',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'mis',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'mis',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mis',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mis',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mis',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'mis',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mis',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'blwyddyn',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 flynedd',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'blwyddyn',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 flynedd',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'mewn ychydig eiliadau', 'prefix');
        assert.equal(moment(0).from(30000), 'ychydig eiliadau yn ôl', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'mewn ychydig eiliadau', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'mewn 5 diwrnod', 'in 5 days');
    });

    test('same day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Heddiw am 02:00',    'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Heddiw am 02:25',    'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Heddiw am 03:00',    'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Yfory am 02:00',         'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Heddiw am 01:00',    'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Ddoe am 02:00',           'yesterday at the same time');
    });

    test('same next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [am] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [am] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [am] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('same last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [diwethaf am] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [diwethaf am] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [diwethaf am] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('same all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52ain', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'), '1 01 1af', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '1 01 1af', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2il', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2il', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('da');

    test('parse', function (assert) {
        var tests = 'januar jan_februar feb_marts mar_april apr_maj maj_juni jun_juli jul_august aug_september sep_oktober okt_november nov_december dec'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd [den] Do MMMM YYYY, h:mm:ss a', 'søndag den 14. februar 2010, 3:25:50 pm'],
                ['ddd hA',                             'søn 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 februar feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. søndag søn sø'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '6 6. 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[den] DDDo [dag på året]',           'den 45. dag på året'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14. februar 2010'],
                ['LLL',                                '14. februar 2010 15:25'],
                ['LLLL',                               'søndag d. 14. februar 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14. feb 2010'],
                ['lll',                                '14. feb 2010 15:25'],
                ['llll',                               'søn d. 14. feb 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'januar jan_februar feb_marts mar_april apr_maj maj_juni jun_juli jul_august aug_september sep_oktober okt_november nov_december dec'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'søndag søn sø_mandag man ma_tirsdag tir ti_onsdag ons on_torsdag tor to_fredag fre fr_lørdag lør lø'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'få sekunder', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'et minut',    '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'et minut',    '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutter',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutter', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'en time',     '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'en time',     '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 timer',     '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 timer',     '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 timer',    '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'en dag',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'en dag',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dage',      '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'en dag',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dage',      '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dage',     '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'en måned',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'en måned',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'en måned',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 måneder',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 måneder',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 måneder',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'en måned',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 måneder',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'et år',       '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 år',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'et år',       '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 år',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'om få sekunder',  'prefix');
        assert.equal(moment(0).from(30000), 'få sekunder siden', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'få sekunder siden',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'om få sekunder', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'om 5 dage', 'in 5 days');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('de-at');

    test('parse', function (assert) {
        var tests = 'Jänner Jän._Februar Febr._März Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;

        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, h:mm:ss a', 'Sonntag, 14. Februar 2010, 3:25:50 pm'],
                ['ddd, hA', 'So., 3PM'],
                ['M Mo MM MMMM MMM', '2 2. 02 Februar Febr.'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14. 14'],
                ['d do dddd ddd dd', '0 0. Sonntag So. So'],
                ['DDD DDDo DDDD', '45 45. 045'],
                ['w wo ww', '6 6. 06'],
                ['h hh', '3 03'],
                ['H HH', '15 15'],
                ['m mm', '25 25'],
                ['s ss', '50 50'],
                ['a A', 'pm PM'],
                ['[the] DDDo [day of the year]', 'the 45. day of the year'],
                ['LTS', '15:25:50'],
                ['L', '14.02.2010'],
                ['LL', '14. Februar 2010'],
                ['LLL', '14. Februar 2010 15:25'],
                ['LLLL', 'Sonntag, 14. Februar 2010 15:25'],
                ['l', '14.2.2010'],
                ['ll', '14. Febr. 2010'],
                ['lll', '14. Febr. 2010 15:25'],
                ['llll', 'So., 14. Febr. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'Jänner Jän._Februar Febr._März Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Sonntag So. So_Montag Mo. Mo_Dienstag Di. Di_Mittwoch Mi. Mi_Donnerstag Do. Do_Freitag Fr. Fr_Samstag Sa. Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true), 'ein paar Sekunden', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true), 'eine Minute', '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true), 'eine Minute', '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true), '2 Minuten', '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true), '44 Minuten', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true), 'eine Stunde', '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true), 'eine Stunde', '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true), '2 Stunden', '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true), '5 Stunden', '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true), '21 Stunden', '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true), 'ein Tag', '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true), 'ein Tag', '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true), '2 Tage', '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true), 'ein Tag', '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true), '5 Tage', '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true), '25 Tage', '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true), 'ein Monat', '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true), 'ein Monat', '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true), '2 Monate', '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true), '2 Monate', '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true), '3 Monate', '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true), 'ein Monat', '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true), '5 Monate', '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ein Jahr', '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 Jahre', '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true), 'ein Jahr', '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true), '5 Jahre', '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'in ein paar Sekunden', 'prefix');
        assert.equal(moment(0).from(30000), 'vor ein paar Sekunden', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'in ein paar Sekunden', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'in 5 Tagen', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(), 'Heute um 02:00 Uhr', 'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(), 'Heute um 02:25 Uhr', 'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(), 'Heute um 03:00 Uhr', 'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(), 'Morgen um 02:00 Uhr', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(), 'Heute um 01:00 Uhr', 'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(), 'Gestern um 02:00 Uhr', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(), m.format('dddd [um] LT [Uhr]'), 'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format('dddd [um] LT [Uhr]'), 'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format('dddd [um] LT [Uhr]'), 'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(), m.format('[letzten] dddd [um] LT [Uhr]'), 'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format('[letzten] dddd [um] LT [Uhr]'), 'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format('[letzten] dddd [um] LT [Uhr]'), 'Today + ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(), 1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(), 1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(), 2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(), 1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(), 2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008, 0, 1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008, 0, 6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008, 0, 7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008, 0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008, 0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003, 0, 1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003, 0, 5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003, 0, 6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003, 0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003, 0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009, 0, 1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009, 0, 4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009, 0, 5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009, 0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009, 0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010, 0, 1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010, 0, 3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010, 0, 4]).week(), 1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010, 0, 10]).week(), 1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010, 0, 11]).week(), 2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011, 0, 1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011, 0, 2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011, 0, 3]).week(), 1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011, 0, 9]).week(), 1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011, 0, 10]).week(), 2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0, 1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).format('w ww wo'), '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).format('w ww wo'), '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).format('w ww wo'), '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('de');

    test('parse', function (assert) {
        var tests = 'Januar Jan._Februar Febr._März Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'Sonntag, 14. Februar 2010, 3:25:50 pm'],
                ['ddd, hA',                            'So., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 Februar Febr.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. Sonntag So. So'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '6 6. 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45. day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14. Februar 2010'],
                ['LLL',                                '14. Februar 2010 15:25'],
                ['LLLL',                               'Sonntag, 14. Februar 2010 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14. Febr. 2010'],
                ['lll',                                '14. Febr. 2010 15:25'],
                ['llll',                               'So., 14. Febr. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'Januar Jan._Februar Febr._März Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Sonntag So. So_Montag Mo. Mo_Dienstag Di. Di_Mittwoch Mi. Mi_Donnerstag Do. Do_Freitag Fr. Fr_Samstag Sa. Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ein paar Sekunden',  '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'eine Minute',       '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'eine Minute',       '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 Minuten',          '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 Minuten',         '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'eine Stunde',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'eine Stunde',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 Stunden',          '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 Stunden',          '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 Stunden',         '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ein Tag',          '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ein Tag',          '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 Tage',            '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ein Tag',          '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 Tage',            '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 Tage',           '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ein Monat',        '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ein Monat',        '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ein Monat',        '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 Monate',          '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 Monate',          '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 Monate',          '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ein Monat',        '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 Monate',          '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ein Jahr',         '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 Jahre',           '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ein Jahr',         '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 Jahre',           '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'in ein paar Sekunden', 'prefix');
        assert.equal(moment(0).from(30000), 'vor ein paar Sekunden', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'in ein paar Sekunden', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'in 5 Tagen', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Heute um 02:00 Uhr',   'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Heute um 02:25 Uhr',   'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Heute um 03:00 Uhr',   'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Morgen um 02:00 Uhr',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Heute um 01:00 Uhr',   'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Gestern um 02:00 Uhr', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [um] LT [Uhr]'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [um] LT [Uhr]'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [um] LT [Uhr]'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[letzten] dddd [um] LT [Uhr]'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[letzten] dddd [um] LT [Uhr]'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[letzten] dddd [um] LT [Uhr]'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('el');

    test('parse', function (assert) {
        var i,
            tests = 'Ιανουάριος Ιαν_Φεβρουάριος Φεβ_Μάρτιος Μαρ_Απρίλιος Απρ_Μάιος Μαϊ_Ιούνιος Ιουν_Ιούλιος Ιουλ_Αύγουστος Αυγ_Σεπτέμβριος Σεπ_Οκτώβριος Οκτ_Νοέμβριος Νοε_Δεκέμβριος Δεκ'.split('_');

        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('parse meridiem', function (assert) {
        var i,
            b = moment(),
            meridiemTests = [
                // h a patterns, expected hours, isValid
                ['10 πμ',   10, true],
                ['10 μμ',   22, true],
                ['10 π.μ.', 10, true],
                ['10 μ.μ.', 22, true],
                ['10 π',    10, true],
                ['10 μ',    22, true],
                ['10 ΠΜ',   10, true],
                ['10 ΜΜ',   22, true],
                ['10 Π.Μ.', 10, true],
                ['10 Μ.Μ.', 22, true],
                ['10 Π',    10, true],
                ['10 Μ',    22, true],
                ['10 am',   10, false],
                ['10 pm',   10, false]
            ];

        // test that a formatted moment including meridiem string can be parsed back to the same moment
        assert.ok(b.isSame(moment(b.format('h:mm:ss a'), 'h:mm:ss a', 'el', true), 'seconds'), b.format('h:mm:ss a') + ' should be equal to ' + moment(b.format('h:mm:ss a'), 'h:mm:ss a', 'el', true).format('h:mm:ss a'));

        // test that a formatted moment having a meridiem string can be parsed with strict flag
        assert.ok(moment(b.format('h:mm:ss a'), 'h:mm:ss a', 'el', true).isValid(), b.format('h:mm:ss a') + ' should be parsed as valid');

        for (i = 0; i < meridiemTests.length; i++) {
            assert.equal(moment(meridiemTests[i][0], 'h a', 'el', true).hours(), meridiemTests[i][1], moment(meridiemTests[i][0], 'h a', 'el', true).hours() + ' should be ' + meridiemTests[i][1]);
            assert.ok(moment(meridiemTests[i][0], 'h a', 'el', true).isValid() === meridiemTests[i][2], meridiemTests[i][0] + ' ----> ' + meridiemTests[i][2]);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Κυριακή, Φεβρουάριος 14η 2010, 3:25:50 μμ'],
                ['dddd, D MMMM YYYY, h:mm:ss a',       'Κυριακή, 14 Φεβρουαρίου 2010, 3:25:50 μμ'],
                ['ddd, hA',                            'Κυρ, 3ΜΜ'],
                ['dddd, MMMM YYYY',                    'Κυριακή, Φεβρουάριος 2010'],
                ['M Mo MM MMMM MMM',                   '2 2η 02 Φεβρουάριος Φεβ'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14η 14'],
                ['d do dddd ddd dd',                   '0 0η Κυριακή Κυρ Κυ'],
                ['DDD DDDo DDDD',                      '45 45η 045'],
                ['w wo ww',                            '6 6η 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'μμ ΜΜ'],
                ['[the] DDDo [day of the year]',       'the 45η day of the year'],
                ['LTS',                                '3:25:50 ΜΜ'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Φεβρουαρίου 2010'],
                ['LLL',                                '14 Φεβρουαρίου 2010 3:25 ΜΜ'],
                ['LLLL',                               'Κυριακή, 14 Φεβρουαρίου 2010 3:25 ΜΜ'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Φεβ 2010'],
                ['lll',                                '14 Φεβ 2010 3:25 ΜΜ'],
                ['llll',                               'Κυρ, 14 Φεβ 2010 3:25 ΜΜ']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1η', '1η');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2η', '2η');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3η', '3η');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4η', '4η');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5η', '5η');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6η', '6η');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7η', '7η');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8η', '8η');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9η', '9η');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10η', '10η');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11η', '11η');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12η', '12η');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13η', '13η');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14η', '14η');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15η', '15η');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16η', '16η');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17η', '17η');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18η', '18η');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19η', '19η');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20η', '20η');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21η', '21η');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22η', '22η');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23η', '23η');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24η', '24η');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25η', '25η');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26η', '26η');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27η', '27η');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28η', '28η');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29η', '29η');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30η', '30η');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31η', '31η');
    });

    test('format month', function (assert) {
        var i,
            expected = 'Ιανουάριος Ιαν_Φεβρουάριος Φεβ_Μάρτιος Μαρ_Απρίλιος Απρ_Μάιος Μαϊ_Ιούνιος Ιουν_Ιούλιος Ιουλ_Αύγουστος Αυγ_Σεπτέμβριος Σεπ_Οκτώβριος Οκτ_Νοέμβριος Νοε_Δεκέμβριος Δεκ'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var i,
            expected = 'Κυριακή Κυρ Κυ_Δευτέρα Δευ Δε_Τρίτη Τρι Τρ_Τετάρτη Τετ Τε_Πέμπτη Πεμ Πε_Παρασκευή Παρ Πα_Σάββατο Σαβ Σα'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);

        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'λίγα δευτερόλεπτα',   '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ένα λεπτό',           '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ένα λεπτό',           '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 λεπτά',             '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 λεπτά',            '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'μία ώρα',             '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'μία ώρα',             '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ώρες',              '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ώρες',              '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ώρες',             '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'μία μέρα',            '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'μία μέρα',            '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 μέρες',             '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'μία μέρα',            '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 μέρες',             '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 μέρες',            '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ένας μήνας',          '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ένας μήνας',          '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ένας μήνας',          '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 μήνες',             '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 μήνες',             '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 μήνες',             '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ένας μήνας',          '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 μήνες',             '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ένας χρόνος',         '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 χρόνια',            '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ένας χρόνος',         '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 χρόνια',            '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'σε λίγα δευτερόλεπτα',  'prefix');
        assert.equal(moment(0).from(30000), 'λίγα δευτερόλεπτα πριν', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'λίγα δευτερόλεπτα πριν',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'σε λίγα δευτερόλεπτα', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'σε 5 μέρες', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Σήμερα στις 2:00 ΠΜ',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Σήμερα στις 2:25 ΠΜ',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Σήμερα στις 3:00 ΠΜ',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Αύριο στις 2:00 ΠΜ',      'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Σήμερα στη 1:00 ΠΜ',        'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Χθες στις 2:00 ΠΜ',       'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [' + (m.hours() % 12 === 1 ? 'στη' : 'στις') + '] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [στις] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [στις] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m, dayString;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            dayString = m.day() === 6 ? '[το προηγούμενο Σάββατο]' : '[την προηγούμενη] dddd';
            assert.equal(m.calendar(),       m.format(dayString + ' [' + (m.hours() % 12 === 1 ? 'στη' : 'στις') + '] LT'),  'Today - ' + i + ' days current time');
            m.hours(1).minutes(30).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(dayString + ' [στη] LT'),  'Today - ' + i + ' days one o clock');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(dayString + ' [στις] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(dayString + ' [στις] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 52, 'Dec 31 2006 should be week 52');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 30]).week(), 52, 'Dec 30 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 52, 'Dec 29 2002 should be week 52');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 52, 'Dec 28 2008 should be week 52');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 52, 'Dec 27 2009 should be week 52');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  2]).week(), 53, 'Jan  2 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  9]).week(), 1, 'Jan  9 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(), 1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(), 2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 51, 'Dec 26 2010 should be week 51');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  8]).week(), 1, 'Jan  8 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(), 1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(), 2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday format', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52η', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'),   '1 01 1η', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1η', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'),   '2 02 2η', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2η', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('en-au');

    test('parse', function (assert) {
        var tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Sun, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14th 14'],
                ['d do dddd ddd dd',                   '0 0th Sunday Sun Su'],
                ['DDD DDDo DDDD',                      '45 45th 045'],
                ['w wo ww',                            '6 6th 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45th day of the year'],
                ['LTS',                                '3:25:50 PM'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 February 2010'],
                ['LLL',                                '14 February 2010 3:25 PM'],
                ['LLLL',                               'Sunday, 14 February 2010 3:25 PM'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb 2010'],
                ['lll',                                '14 Feb 2010 3:25 PM'],
                ['llll',                               'Sun, 14 Feb 2010 3:25 PM']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
    });

    test('format month', function (assert) {
        var expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'a few seconds', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'a minute',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'a minute',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'an hour',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'an hour',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hours',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hours',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hours',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'a day',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'a day',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 days',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'a day',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 days',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 days',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'a month',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'a month',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'a month',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 months',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 months',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 months',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'a month',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 months',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'a year',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 years',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'a year',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 years',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'in a few seconds',  'prefix');
        assert.equal(moment(0).from(30000), 'a few seconds ago', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'a few seconds ago',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'in a few seconds', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'in 5 days', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Today at 2:00 AM',      'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Today at 2:25 AM',      'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Today at 3:00 AM',      'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at 2:00 AM',   'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at 1:00 AM',      'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at 2:00 AM',  'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52nd', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1st', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1st', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2nd', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2nd', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testStr;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testStr = moment(ordinalStr, 'YYYY MM Do').format('YYYY MM D');
            assert.equal(testStr, '2014 01 ' + i, 'lenient ordinal parsing ' + i);
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testStr;
        for (i = 1; i <= 31; ++i) {
            testStr = moment('2014 01 ' + i, 'YYYY MM Do').format('YYYY MM D');
            assert.equal(testStr, '2014 01 ' + i,
                    'lenient ordinal parsing of number ' + i);
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MMM Do');
            testMoment = moment(ordinalStr, 'YYYY MMM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('en-ca');

    test('parse', function (assert) {
        var i,
            tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Sun, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14th 14'],
                ['d do dddd ddd dd',                   '0 0th Sunday Sun Su'],
                ['DDD DDDo DDDD',                      '45 45th 045'],
                ['w wo ww',                            '8 8th 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45th day of the year'],
                ['L',                                  '2010-02-14'],
                ['LTS',                                '3:25:50 PM'],
                ['LL',                                 '14 February, 2010'],
                ['LLL',                                '14 February, 2010 3:25 PM'],
                ['LLLL',                               'Sunday, 14 February, 2010 3:25 PM'],
                ['l',                                  '2010-2-14'],
                ['ll',                                 '14 Feb, 2010'],
                ['lll',                                '14 Feb, 2010 3:25 PM'],
                ['llll',                               'Sun, 14 Feb, 2010 3:25 PM']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
    });

    test('format month', function (assert) {
        var i,
            expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var i,
            expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'a few seconds', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'a minute',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'a minute',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'an hour',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'an hour',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hours',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hours',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hours',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'a day',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'a day',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 days',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'a day',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 days',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 days',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'a month',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'a month',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'a month',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 months',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 months',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 months',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'a month',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 months',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'a year',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 years',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'a year',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 years',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'in a few seconds',  'prefix');
        assert.equal(moment(0).from(30000), 'a few seconds ago', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'a few seconds ago',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'in a few seconds', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'in 5 days', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Today at 2:00 AM',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Today at 2:25 AM',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Today at 3:00 AM',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at 2:00 AM',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at 1:00 AM',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at 2:00 AM', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday format', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1st', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1st', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2nd', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2nd', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3rd', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('en-gb');

    test('parse', function (assert) {
        var tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Sun, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14th 14'],
                ['d do dddd ddd dd',                   '0 0th Sunday Sun Su'],
                ['DDD DDDo DDDD',                      '45 45th 045'],
                ['w wo ww',                            '6 6th 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45th day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 February 2010'],
                ['LLL',                                '14 February 2010 15:25'],
                ['LLLL',                               'Sunday, 14 February 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb 2010'],
                ['lll',                                '14 Feb 2010 15:25'],
                ['llll',                               'Sun, 14 Feb 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
    });

    test('format month', function (assert) {
        var expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'a few seconds', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'a minute',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'a minute',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'an hour',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'an hour',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hours',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hours',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hours',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'a day',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'a day',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 days',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'a day',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 days',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 days',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'a month',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'a month',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'a month',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 months',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 months',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 months',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'a month',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 months',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'a year',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 years',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'a year',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 years',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'in a few seconds',  'prefix');
        assert.equal(moment(0).from(30000), 'a few seconds ago', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'a few seconds ago',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'in a few seconds', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'in 5 days', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Today at 02:00',      'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Today at 02:25',      'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Today at 03:00',      'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at 02:00',   'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at 01:00',      'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at 02:00',  'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52nd', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1st', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1st', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2nd', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2nd', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('en');

    test('parse', function (assert) {
        var i,
            tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Sun, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14th 14'],
                ['d do dddd ddd dd',                   '0 0th Sunday Sun Su'],
                ['DDD DDDo DDDD',                      '45 45th 045'],
                ['w wo ww',                            '8 8th 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45th day of the year'],
                ['LTS',                                '3:25:50 PM'],
                ['L',                                  '02/14/2010'],
                ['LL',                                 'February 14, 2010'],
                ['LLL',                                'February 14, 2010 3:25 PM'],
                ['LLLL',                               'Sunday, February 14, 2010 3:25 PM'],
                ['l',                                  '2/14/2010'],
                ['ll',                                 'Feb 14, 2010'],
                ['lll',                                'Feb 14, 2010 3:25 PM'],
                ['llll',                               'Sun, Feb 14, 2010 3:25 PM']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
    });

    test('format month', function (assert) {
        var i,
            expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var i,
            expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);

        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'a few seconds', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'a minute',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'a minute',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'an hour',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'an hour',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hours',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hours',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hours',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'a day',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'a day',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 days',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'a day',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 days',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 days',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'a month',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'a month',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'a month',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 months',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 months',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 months',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'a month',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 months',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'a year',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 years',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'a year',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 years',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'in a few seconds',  'prefix');
        assert.equal(moment(0).from(30000), 'a few seconds ago', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'a few seconds ago',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'in a few seconds', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'in 5 days', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Today at 2:00 AM',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Today at 2:25 AM',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Today at 3:00 AM',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at 2:00 AM',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at 1:00 AM',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at 2:00 AM', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday format', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1st', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1st', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2nd', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2nd', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3rd', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('eo');

    test('parse', function (assert) {
        var tests = 'januaro jan_februaro feb_marto mar_aprilo apr_majo maj_junio jun_julio jul_aŭgusto aŭg_septembro sep_oktobro okt_novembro nov_decembro dec'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Dimanĉo, februaro 14a 2010, 3:25:50 p.t.m.'],
                ['ddd, hA',                            'Dim, 3P.T.M.'],
                ['M Mo MM MMMM MMM',                   '2 2a 02 februaro feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14a 14'],
                ['d do dddd ddd dd',                   '0 0a Dimanĉo Dim Di'],
                ['DDD DDDo DDDD',                      '45 45a 045'],
                ['w wo ww',                            '7 7a 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'p.t.m. P.T.M.'],
                ['[la] DDDo [tago] [de] [la] [jaro]',  'la 45a tago de la jaro'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '2010-02-14'],
                ['LL',                                 '14-an de februaro, 2010'],
                ['LLL',                                '14-an de februaro, 2010 15:25'],
                ['LLLL',                               'Dimanĉo, la 14-an de februaro, 2010 15:25'],
                ['l',                                  '2010-2-14'],
                ['ll',                                 '14-an de feb, 2010'],
                ['lll',                                '14-an de feb, 2010 15:25'],
                ['llll',                               'Dim, la 14-an de feb, 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1a', '1a');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2a', '2a');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3a', '3a');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4a', '4a');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5a', '5a');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6a', '6a');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7a', '7a');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8a', '8a');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9a', '9a');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10a', '10a');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11a', '11a');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12a', '12a');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13a', '13a');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14a', '14a');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15a', '15a');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16a', '16a');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17a', '17a');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18a', '18a');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19a', '19a');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20a', '20a');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21a', '21a');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22a', '22a');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23a', '23a');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24a', '24a');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25a', '25a');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26a', '26a');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27a', '27a');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28a', '28a');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29a', '29a');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30a', '30a');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31a', '31a');
    });

    test('format month', function (assert) {
        var expected = 'januaro jan_februaro feb_marto mar_aprilo apr_majo maj_junio jun_julio jul_aŭgusto aŭg_septembro sep_oktobro okt_novembro nov_decembro dec'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Dimanĉo Dim Di_Lundo Lun Lu_Mardo Mard Ma_Merkredo Merk Me_Ĵaŭdo Ĵaŭ Ĵa_Vendredo Ven Ve_Sabato Sab Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'sekundoj', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'minuto',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'minuto',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutoj',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutoj',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'horo',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'horo',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 horoj',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 horoj',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 horoj',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'tago',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'tago',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 tagoj',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'tago',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 tagoj',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 tagoj',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'monato',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'monato',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'monato',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 monatoj',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 monatoj',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 monatoj',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'monato',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 monatoj',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'jaro',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 jaroj',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'jaro',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 jaroj',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'je sekundoj',  'je prefix');
        assert.equal(moment(0).from(30000), 'antaŭ sekundoj', 'antaŭ prefix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'antaŭ sekundoj',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'je sekundoj', 'je sekundoj');
        assert.equal(moment().add({d: 5}).fromNow(), 'je 5 tagoj', 'je 5 tagoj');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Hodiaŭ je 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Hodiaŭ je 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Hodiaŭ je 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Morgaŭ je 02:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Hodiaŭ je 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Hieraŭ je 02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [je] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [je] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [je] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[pasinta] dddd [je] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[pasinta] dddd [je] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[pasinta] dddd [je] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1a', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1a', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2a', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2a', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3a', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('es');

    test('parse', function (assert) {
        var tests = 'enero ene._febrero feb._marzo mar._abril abr._mayo may._junio jun._julio jul._agosto ago._septiembre sep._octubre oct._noviembre nov._diciembre dic.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Febrero 14º 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Dom., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2º 02 Febrero Feb.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14º 14'],
                ['d do dddd ddd dd',                   '0 0º Domingo Dom. Do'],
                ['DDD DDDo DDDD',                      '45 45º 045'],
                ['w wo ww',                            '6 6º 06'],
                ['YYYY-MMM-DD',                        '2010-Feb-14'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45º day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 de Febrero de 2010'],
                ['LLL',                                '14 de Febrero de 2010 15:25'],
                ['LLLL',                               'Domingo, 14 de Febrero de 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 de Feb. de 2010'],
                ['lll',                                '14 de Feb. de 2010 15:25'],
                ['llll',                               'Dom., 14 de Feb. de 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
    });

    test('format month', function (assert) {
        var expected = 'Enero Ene._Febrero Feb._Marzo Mar._Abril Abr._Mayo May._Junio Jun._Julio Jul._Agosto Ago._Septiembre Sep._Octubre Oct._Noviembre Nov._Diciembre Dic.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Domingo Dom. Do_Lunes Lun. Lu_Martes Mar. Ma_Miércoles Mié. Mi_Jueves Jue. Ju_Viernes Vie. Vi_Sábado Sáb. Sá'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'unos segundos', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'un minuto',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'un minuto',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutos',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutos',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'una hora',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'una hora',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 horas',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 horas',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 horas',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un día',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un día',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 días',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un día',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 días',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 días',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mes',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mes',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mes',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 meses',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 meses',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 meses',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mes',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 meses',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un año',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 años',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un año',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 años',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'en unos segundos',  'prefix');
        assert.equal(moment(0).from(30000), 'hace unos segundos', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'hace unos segundos',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'en unos segundos', 'en unos segundos');
        assert.equal(moment().add({d: 5}).fromNow(), 'en 5 días', 'en 5 días');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                         'hoy a las 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),          'hoy a las 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),           'hoy a las 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),           'mañana a las 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'mañana a la 1:00',   'tomorrow minus 1 hour');
        assert.equal(moment(a).subtract({h: 1}).calendar(),      'hoy a la 1:00',      'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),      'ayer a las 2:00',    'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[el] dddd [pasado a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[el] dddd [pasado a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[el] dddd [pasado a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52º', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1º', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1º', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2º', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2º', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('et');

    test('parse', function (assert) {
        var tests = 'jaanuar jaan_veebruar veebr_märts märts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' peaks olema kuu ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, H:mm:ss',      'pühapäev, 14. veebruar 2010, 15:25:50'],
                ['ddd, h',                           'P, 3'],
                ['M Mo MM MMMM MMM',                 '2 2. 02 veebruar veebr'],
                ['YYYY YY',                          '2010 10'],
                ['D Do DD',                          '14 14. 14'],
                ['d do dddd ddd dd',                 '0 0. pühapäev P P'],
                ['DDD DDDo DDDD',                    '45 45. 045'],
                ['w wo ww',                          '6 6. 06'],
                ['h hh',                             '3 03'],
                ['H HH',                             '15 15'],
                ['m mm',                             '25 25'],
                ['s ss',                             '50 50'],
                ['a A',                              'pm PM'],
                ['[aasta] DDDo [päev]',              'aasta 45. päev'],
                ['LTS',                              '15:25:50'],
                ['L',                                '14.02.2010'],
                ['LL',                               '14. veebruar 2010'],
                ['LLL',                              '14. veebruar 2010 15:25'],
                ['LLLL',                             'pühapäev, 14. veebruar 2010 15:25'],
                ['l',                                '14.2.2010'],
                ['ll',                               '14. veebr 2010'],
                ['lll',                              '14. veebr 2010 15:25'],
                ['llll',                             'P, 14. veebr 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'jaanuar jaan_veebruar veebr_märts märts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'pühapäev P P_esmaspäev E E_teisipäev T T_kolmapäev K K_neljapäev N N_reede R R_laupäev L L'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'paar sekundit',  '44 seconds = paar sekundit');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'üks minut',      '45 seconds = üks minut');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'üks minut',      '89 seconds = üks minut');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutit',      '90 seconds = 2 minutit');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutit',     '44 minutes = 44 minutit');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'üks tund',       '45 minutes = tund aega');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'üks tund',       '89 minutes = üks tund');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 tundi',        '90 minutes = 2 tundi');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 tundi',        '5 hours = 5 tundi');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 tundi',       '21 hours = 21 tundi');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'üks päev',       '22 hours = üks päev');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'üks päev',       '35 hours = üks päev');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 päeva',        '36 hours = 2 päeva');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'üks päev',       '1 day = üks päev');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 päeva',        '5 days = 5 päeva');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 päeva',       '25 days = 25 päeva');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'üks kuu',        '26 days = üks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'üks kuu',        '30 days = üks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'üks kuu',        '43 days = üks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 kuud',         '46 days = 2 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 kuud',         '75 days = 2 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 kuud',         '76 days = 3 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'üks kuu',        '1 month = üks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 kuud',         '5 months = 5 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'üks aasta',      '345 days = üks aasta');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 aastat',       '548 days = 2 aastat');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'üks aasta',      '1 year = üks aasta');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 aastat',       '5 years = 5 aastat');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'mõne sekundi pärast',  'prefix');
        assert.equal(moment(0).from(30000), 'mõni sekund tagasi', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'mõni sekund tagasi',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'mõne sekundi pärast', 'in a few seconds');
        assert.equal(moment().subtract({s: 30}).fromNow(), 'mõni sekund tagasi', 'a few seconds ago');

        assert.equal(moment().add({m: 1}).fromNow(), 'ühe minuti pärast', 'in a minute');
        assert.equal(moment().subtract({m: 1}).fromNow(), 'üks minut tagasi', 'a minute ago');

        assert.equal(moment().add({m: 5}).fromNow(), '5 minuti pärast', 'in 5 minutes');
        assert.equal(moment().subtract({m: 5}).fromNow(), '5 minutit tagasi', '5 minutes ago');

        assert.equal(moment().add({d: 1}).fromNow(), 'ühe päeva pärast', 'in one day');
        assert.equal(moment().subtract({d: 1}).fromNow(), 'üks päev tagasi', 'one day ago');

        assert.equal(moment().add({d: 5}).fromNow(), '5 päeva pärast', 'in 5 days');
        assert.equal(moment().subtract({d: 5}).fromNow(), '5 päeva tagasi', '5 days ago');

        assert.equal(moment().add({M: 1}).fromNow(), 'kuu aja pärast', 'in a month');
        assert.equal(moment().subtract({M: 1}).fromNow(), 'kuu aega tagasi', 'a month ago');

        assert.equal(moment().add({M: 5}).fromNow(), '5 kuu pärast', 'in 5 months');
        assert.equal(moment().subtract({M: 5}).fromNow(), '5 kuud tagasi', '5 months ago');

        assert.equal(moment().add({y: 1}).fromNow(), 'ühe aasta pärast', 'in a year');
        assert.equal(moment().subtract({y: 1}).fromNow(), 'aasta tagasi', 'a year ago');

        assert.equal(moment().add({y: 5}).fromNow(), '5 aasta pärast', 'in 5 years');
        assert.equal(moment().subtract({y: 5}).fromNow(), '5 aastat tagasi', '5 years ago');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Täna, 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Täna, 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Täna, 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Homme, 2:00',    'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Täna, 1:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Eile, 2:00',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[Järgmine] dddd LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Järgmine] dddd LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Järgmine] dddd LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Eelmine] dddd LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Eelmine] dddd LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Eelmine] dddd LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 nädal tagasi');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '1 nädala pärast');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 nädalat tagasi');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '2 nädala pärast');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('eu');

    test('parse', function (assert) {
        var tests = 'urtarrila urt._otsaila ots._martxoa mar._apirila api._maiatza mai._ekaina eka._uztaila uzt._abuztua abu._iraila ira._urria urr._azaroa aza._abendua abe.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'igandea, otsaila 14. 2010, 3:25:50 pm'],
                ['ddd, hA',                            'ig., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 otsaila ots.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. igandea ig. ig'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '7 7. 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45. day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '2010-02-14'],
                ['LL',                                 '2010ko otsailaren 14a'],
                ['LLL',                                '2010ko otsailaren 14a 15:25'],
                ['LLLL',                               'igandea, 2010ko otsailaren 14a 15:25'],
                ['l',                                  '2010-2-14'],
                ['ll',                                 '2010ko ots. 14a'],
                ['lll',                                '2010ko ots. 14a 15:25'],
                ['llll',                               'ig., 2010ko ots. 14a 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'urtarrila urt._otsaila ots._martxoa mar._apirila api._maiatza mai._ekaina eka._uztaila uzt._abuztua abu._iraila ira._urria urr._azaroa aza._abendua abe.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'igandea ig. ig_astelehena al. al_asteartea ar. ar_asteazkena az. az_osteguna og. og_ostirala ol. ol_larunbata lr. lr'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'segundo batzuk', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'minutu bat',     '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'minutu bat',     '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutu',       '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutu',      '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ordu bat',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ordu bat',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ordu',         '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ordu',         '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ordu',        '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'egun bat',       '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'egun bat',       '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 egun',         '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'egun bat',       '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 egun',         '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 egun',        '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'hilabete bat',   '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'hilabete bat',   '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'hilabete bat',   '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 hilabete',     '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 hilabete',     '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 hilabete',     '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'hilabete bat',   '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 hilabete',     '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'urte bat',       '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 urte',         '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'urte bat',       '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 urte',         '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'segundo batzuk barru',  'prefix');
        assert.equal(moment(0).from(30000), 'duela segundo batzuk', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'duela segundo batzuk',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'segundo batzuk barru', 'in seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 egun barru', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'gaur 02:00etan',  'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'gaur 02:25etan',  'now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'gaur 03:00etan',  'now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'bihar 02:00etan', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'gaur 01:00etan',  'now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'atzo 02:00etan',  'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd LT[etan]'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd LT[etan]'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd LT[etan]'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[aurreko] dddd LT[etan]'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[aurreko] dddd LT[etan]'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[aurreko] dddd LT[etan]'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1.', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1.', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2.', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2.', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3.', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('fa');

    test('parse', function (assert) {
        var tests = 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
        }
        for (i = 0; i < 12; i++) {
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'یک\u200cشنبه، فوریه ۱۴م ۲۰۱۰، ۳:۲۵:۵۰ بعد از ظهر'],
                ['ddd, hA',                            'یک\u200cشنبه، ۳بعد از ظهر'],
                ['M Mo MM MMMM MMM',                   '۲ ۲م ۰۲ فوریه فوریه'],
                ['YYYY YY',                            '۲۰۱۰ ۱۰'],
                ['D Do DD',                            '۱۴ ۱۴م ۱۴'],
                ['d do dddd ddd dd',                   '۰ ۰م یک\u200cشنبه یک\u200cشنبه ی'],
                ['DDD DDDo DDDD',                      '۴۵ ۴۵م ۰۴۵'],
                ['w wo ww',                            '۸ ۸م ۰۸'],
                ['h hh',                               '۳ ۰۳'],
                ['H HH',                               '۱۵ ۱۵'],
                ['m mm',                               '۲۵ ۲۵'],
                ['s ss',                               '۵۰ ۵۰'],
                ['a A',                                'بعد از ظهر بعد از ظهر'],
                ['DDDo [روز سال]',             '۴۵م روز سال'],
                ['LTS',                                '۱۵:۲۵:۵۰'],
                ['L',                                  '۱۴/۰۲/۲۰۱۰'],
                ['LL',                                 '۱۴ فوریه ۲۰۱۰'],
                ['LLL',                                '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['LLLL',                               'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['l',                                  '۱۴/۲/۲۰۱۰'],
                ['ll',                                 '۱۴ فوریه ۲۰۱۰'],
                ['lll',                                '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['llll',                               'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '۱م', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '۲م', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '۳م', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '۴م', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '۵م', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '۶م', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '۷م', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '۸م', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '۹م', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '۱۰م', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '۱۱م', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '۱۲م', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '۱۳م', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '۱۴م', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '۱۵م', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '۱۶م', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '۱۷م', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '۱۸م', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '۱۹م', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '۲۰م', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '۲۱م', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '۲۲م', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '۲۳م', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '۲۴م', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '۲۵م', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '۲۶م', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '۲۷م', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '۲۸م', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '۲۹م', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '۳۰م', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '۳۱م', '31');
    });

    test('format month', function (assert) {
        var expected = 'ژانویه ژانویه_فوریه فوریه_مارس مارس_آوریل آوریل_مه مه_ژوئن ژوئن_ژوئیه ژوئیه_اوت اوت_سپتامبر سپتامبر_اکتبر اکتبر_نوامبر نوامبر_دسامبر دسامبر'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'یک\u200cشنبه یک\u200cشنبه ی_دوشنبه دوشنبه د_سه\u200cشنبه سه\u200cشنبه س_چهارشنبه چهارشنبه چ_پنج\u200cشنبه پنج\u200cشنبه پ_جمعه جمعه ج_شنبه شنبه ش'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'چندین ثانیه', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'یک دقیقه',       '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'یک دقیقه',       '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '۲ دقیقه',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '۴۴ دقیقه',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'یک ساعت',     '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'یک ساعت',     '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '۲ ساعت',      '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '۵ ساعت',      '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '۲۱ ساعت',     '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'یک روز',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'یک روز',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '۲ روز',       '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'یک روز',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '۵ روز',       '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '۲۵ روز',      '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'یک ماه',      '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'یک ماه',      '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'یک ماه',      '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '۲ ماه',       '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '۲ ماه',       '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '۳ ماه',       '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'یک ماه',      '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '۵ ماه',       '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'یک سال',      '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '۲ سال',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'یک سال',      '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '۵ سال',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'در چندین ثانیه', 'prefix');
        assert.equal(moment(0).from(30000), 'چندین ثانیه پیش', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'چندین ثانیه پیش',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'در چندین ثانیه', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'در ۵ روز', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'امروز ساعت ۰۲:۰۰', 'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'امروز ساعت ۰۲:۲۵', 'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'امروز ساعت ۰۳:۰۰', 'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'فردا ساعت ۰۲:۰۰', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'امروز ساعت ۰۱:۰۰', 'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'دیروز ساعت ۰۲:۰۰', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
        assert.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
        assert.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
        assert.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
        assert.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
        assert.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
        assert.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
        assert.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
        assert.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '۱ ۰۱ ۱م', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '۱ ۰۱ ۱م', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '۲ ۰۲ ۲م', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '۲ ۰۲ ۲م', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '۳ ۰۳ ۳م', 'Jan 14 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('fi');

    test('parse', function (assert) {
        var tests = 'tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kesäkuu kesä_heinäkuu heinä_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'sunnuntai, helmikuu 14. 2010, 3:25:50 pm'],
                ['ddd, hA',                            'su, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 helmikuu helmi'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. sunnuntai su su'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '6 6. 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[vuoden] DDDo [päivä]',              'vuoden 45. päivä'],
                ['LTS',                                '15.25.50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14. helmikuuta 2010'],
                ['LLL',                                '14. helmikuuta 2010, klo 15.25'],
                ['LLLL',                               'sunnuntai, 14. helmikuuta 2010, klo 15.25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14. helmi 2010'],
                ['lll',                                '14. helmi 2010, klo 15.25'],
                ['llll',                               'su, 14. helmi 2010, klo 15.25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1st');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2nd');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21st');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22nd');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23rd');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26th');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27th');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28th');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29th');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30th');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31st');
    });

    test('format month', function (assert) {
        var expected = 'tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kesäkuu kesä_heinäkuu heinä_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'sunnuntai su su_maanantai ma ma_tiistai ti ti_keskiviikko ke ke_torstai to to_perjantai pe pe_lauantai la la'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'muutama sekunti', '44 seconds = few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'minuutti',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'minuutti',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  'kaksi minuuttia',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuuttia',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'tunti',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'tunti',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  'kaksi tuntia',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   'viisi tuntia',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 tuntia',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'päivä',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'päivä',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  'kaksi päivää',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'päivä',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   'viisi päivää',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 päivää',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'kuukausi',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'kuukausi',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'kuukausi',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  'kaksi kuukautta',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  'kaksi kuukautta',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  'kolme kuukautta',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'kuukausi',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   'viisi kuukautta',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'vuosi',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), 'kaksi vuotta',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'vuosi',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   'viisi vuotta',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'muutaman sekunnin päästä',  'prefix');
        assert.equal(moment(0).from(30000), 'muutama sekunti sitten', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'muutama sekunti sitten',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'muutaman sekunnin päästä', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'viiden päivän päästä', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'tänään klo 02.00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'tänään klo 02.25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'tänään klo 03.00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'huomenna klo 02.00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'tänään klo 01.00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'eilen klo 02.00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [klo] LT'),  'today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [klo] LT'),  'today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [klo] LT'),  'today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  'today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  'today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[viime] dddd[na] [klo] LT'),  'today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  'yksi viikko sitten');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'yhden viikon päästä');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  'kaksi viikkoa sitten');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'kaden viikon päästä');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('fo');

    test('parse', function (assert) {
        var tests = 'januar jan_februar feb_mars mar_apríl apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd [tann] Do MMMM YYYY, h:mm:ss a', 'sunnudagur tann 14. februar 2010, 3:25:50 pm'],
                ['ddd hA',                             'sun 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 februar feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. sunnudagur sun su'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '6 6. 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[tann] DDDo [dagin á árinum]',       'tann 45. dagin á árinum'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 februar 2010'],
                ['LLL',                                '14 februar 2010 15:25'],
                ['LLLL',                               'sunnudagur 14. februar, 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 feb 2010'],
                ['lll',                                '14 feb 2010 15:25'],
                ['llll',                               'sun 14. feb, 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'januar jan_februar feb_mars mar_apríl apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'sunnudagur sun su_mánadagur mán má_týsdagur týs tý_mikudagur mik mi_hósdagur hós hó_fríggjadagur frí fr_leygardagur ley le'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'fá sekund', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ein minutt',    '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ein minutt',    '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minuttir',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuttir', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ein tími',     '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ein tími',     '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 tímar',     '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 tímar',     '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 tímar',    '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ein dagur',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ein dagur',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dagar',      '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ein dagur',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dagar',      '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dagar',     '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ein mánaði',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ein mánaði',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ein mánaði',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mánaðir',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mánaðir',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mánaðir',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ein mánaði',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mánaðir',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'eitt ár',       '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ár',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'eitt ár',       '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ár',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'um fá sekund',  'prefix');
        assert.equal(moment(0).from(30000), 'fá sekund síðani', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'fá sekund síðani',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'um fá sekund', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'um 5 dagar', 'in 5 days');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('fr-ca');

    test('parse', function (assert) {
        var i,
            tests = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split('_');

        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }

        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, février 14e 2010, 3:25:50 pm'],
                ['ddd, hA',                            'dim., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2e 02 février févr.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14e 14'],
                ['d do dddd ddd dd',                   '0 0e dimanche dim. Di'],
                ['DDD DDDo DDDD',                      '45 45e 045'],
                ['w wo ww',                            '8 8e 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45e day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '2010-02-14'],
                ['LL',                                 '14 février 2010'],
                ['LLL',                                '14 février 2010 15:25'],
                ['LLLL',                               'dimanche 14 février 2010 15:25'],
                ['l',                                  '2010-2-14'],
                ['ll',                                 '14 févr. 2010'],
                ['lll',                                '14 févr. 2010 15:25'],
                ['llll',                               'dim. 14 févr. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1er', '1er');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2e', '2e');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3e', '3e');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4e', '4e');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5e', '5e');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6e', '6e');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7e', '7e');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8e', '8e');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9e', '9e');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10e', '10e');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11e', '11e');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12e', '12e');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13e', '13e');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14e', '14e');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15e', '15e');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16e', '16e');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17e', '17e');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18e', '18e');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19e', '19e');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20e', '20e');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21e', '21e');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22e', '22e');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23e', '23e');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24e', '24e');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25e', '25e');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26e', '26e');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27e', '27e');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28e', '28e');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29e', '29e');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30e', '30e');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31e', '31e');
    });

    test('format month', function (assert) {
        var i,
            expected = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var i,
            expected = 'dimanche dim. Di_lundi lun. Lu_mardi mar. Ma_mercredi mer. Me_jeudi jeu. Je_vendredi ven. Ve_samedi sam. Sa'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);

        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'quelques secondes', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'une minute',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'une minute',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'une heure',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'une heure',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 heures',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 heures',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 heures',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un jour',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un jour',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 jours',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un jour',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 jours',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 jours',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mois',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mois',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mois',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mois',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mois',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mois',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mois',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mois',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un an',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ans',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un an',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ans',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'dans quelques secondes', 'prefix');
        assert.equal(moment(0).from(30000), 'il y a quelques secondes', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'dans quelques secondes', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'dans 5 jours', 'in 5 days');
    });

    test('same day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Aujourd\'hui à 02:00',    'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Aujourd\'hui à 02:25',    'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Aujourd\'hui à 03:00',    'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Demain à 02:00',         'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Aujourd\'hui à 01:00',    'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Hier à 02:00',           'yesterday at the same time');
    });

    test('same next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [à] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [à] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [à] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('same last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [dernier à] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [dernier à] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [dernier à] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('same all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday format', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1er', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1er', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2e', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2e', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3e', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('fr');

    test('parse', function (assert) {
        var tests = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split('_'),
            i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, février 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            'dim., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 février févr.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 dimanche dim. Di'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '6 6 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45 day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 février 2010'],
                ['LLL',                                '14 février 2010 15:25'],
                ['LLLL',                               'dimanche 14 février 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 févr. 2010'],
                ['lll',                                '14 févr. 2010 15:25'],
                ['llll',                               'dim. 14 févr. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1er', '1er');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
    });

    test('format month', function (assert) {
        var expected = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'dimanche dim. Di_lundi lun. Lu_mardi mar. Ma_mercredi mer. Me_jeudi jeu. Je_vendredi ven. Ve_samedi sam. Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'quelques secondes', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'une minute',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'une minute',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'une heure',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'une heure',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 heures',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 heures',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 heures',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un jour',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un jour',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 jours',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un jour',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 jours',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 jours',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mois',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mois',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mois',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mois',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mois',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mois',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mois',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mois',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un an',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ans',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un an',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ans',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'dans quelques secondes', 'prefix');
        assert.equal(moment(0).from(30000), 'il y a quelques secondes', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'dans quelques secondes', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'dans 5 jours', 'in 5 days');
    });

    test('same day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Aujourd\'hui à 02:00',    'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Aujourd\'hui à 02:25',    'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Aujourd\'hui à 03:00',    'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Demain à 02:00',         'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Aujourd\'hui à 01:00',    'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Hier à 02:00',           'yesterday at the same time');
    });

    test('same next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [à] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [à] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [à] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('same last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [dernier à] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [dernier à] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [dernier à] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('same all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'), '1 01 1er', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '1 01 1er', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('fy');

    test('parse', function (assert) {
        var tests = 'jannewaris jan._febrewaris feb._maart mrt._april apr._maaie mai._juny jun._july jul._augustus aug._septimber sep._oktober okt._novimber nov._desimber des.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, HH:mm:ss',       'snein, febrewaris 14de 2010, 15:25:50'],
                ['ddd, HH',                            'si., 15'],
                ['M Mo MM MMMM MMM',                   '2 2de 02 febrewaris feb.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14de 14'],
                ['d do dddd ddd dd',                   '0 0de snein si. Si'],
                ['DDD DDDo DDDD',                      '45 45ste 045'],
                ['w wo ww',                            '6 6de 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45ste day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14-02-2010'],
                ['LL',                                 '14 febrewaris 2010'],
                ['LLL',                                '14 febrewaris 2010 15:25'],
                ['LLLL',                               'snein 14 febrewaris 2010 15:25'],
                ['l',                                  '14-2-2010'],
                ['ll',                                 '14 feb. 2010'],
                ['lll',                                '14 feb. 2010 15:25'],
                ['llll',                               'si. 14 feb. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
    });

    test('format month', function (assert) {
        var expected = 'jannewaris jan._febrewaris feb._maart mrt._april apr._maaie mai_juny jun._july jul._augustus aug._septimber sep._oktober okt._novimber nov._desimber des.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'snein si. Si_moandei mo. Mo_tiisdei ti. Ti_woansdei wo. Wo_tongersdei to. To_freed fr. Fr_sneon so. So'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'in pear sekonden', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ien minút',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ien minút',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minuten',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuten',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ien oere',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ien oere',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 oeren',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 oeren',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 oeren',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ien dei',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ien dei',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dagen',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ien dei',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dagen',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dagen',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ien moanne',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ien moanne',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ien moanne',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 moannen',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 moannen',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 moannen',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ien moanne',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 moannen',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'ien jier',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 jierren',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'ien jier',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 jierren',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'oer in pear sekonden',  'prefix');
        assert.equal(moment(0).from(30000), 'in pear sekonden lyn', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'in pear sekonden lyn',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'oer in pear sekonden', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'oer 5 dagen', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'hjoed om 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'hjoed om 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'hjoed om 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'moarn om 02:00',    'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'hjoed om 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'juster om 02:00',   'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[ôfrûne] dddd [om] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[ôfrûne] dddd [om] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[ôfrûne] dddd [om] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('month abbreviation', function (assert) {
        assert.equal(moment([2012, 5, 23]).format('D-MMM-YYYY'), '23-jun-2012', 'format month abbreviation surrounded by dashes should not include a dot');
        assert.equal(moment([2012, 5, 23]).format('D MMM YYYY'), '23 jun. 2012', 'format month abbreviation not surrounded by dashes should include a dot');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
        assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
        assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
        assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
        assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
        assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
        assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
        assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
        assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52ste', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1ste', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1ste', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),    '2 02 2de', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),    '2 02 2de', 'Jan 15 2012 should be week 2');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('gl');

    test('parse', function (assert) {
        var tests = 'Xaneiro Xan._Febreiro Feb._Marzo Mar._Abril Abr._Maio Mai._Xuño Xuñ._Xullo Xul._Agosto Ago._Setembro Set._Outubro Out._Novembro Nov._Decembro Dec.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Febreiro 14º 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Dom., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2º 02 Febreiro Feb.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14º 14'],
                ['d do dddd ddd dd',                   '0 0º Domingo Dom. Do'],
                ['DDD DDDo DDDD',                      '45 45º 045'],
                ['w wo ww',                            '7 7º 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45º day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Febreiro 2010'],
                ['LLL',                                '14 Febreiro 2010 15:25'],
                ['LLLL',                               'Domingo 14 Febreiro 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb. 2010'],
                ['lll',                                '14 Feb. 2010 15:25'],
                ['llll',                               'Dom. 14 Feb. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
    });

    test('format month', function (assert) {
        var expected = 'Xaneiro Xan._Febreiro Feb._Marzo Mar._Abril Abr._Maio Mai._Xuño Xuñ._Xullo Xul._Agosto Ago._Setembro Set._Outubro Out._Novembro Nov._Decembro Dec.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Domingo Dom. Do_Luns Lun. Lu_Martes Mar. Ma_Mércores Mér. Mé_Xoves Xov. Xo_Venres Ven. Ve_Sábado Sáb. Sá'.split('_'),
        i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);

        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'uns segundos', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'un minuto',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'un minuto',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutos',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutos',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'unha hora',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'unha hora',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 horas',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 horas',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 horas',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un día',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un día',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 días',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un día',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 días',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 días',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mes',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mes',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mes',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 meses',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 meses',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 meses',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mes',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 meses',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un ano',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 anos',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un ano',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 anos',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'nuns segundos',  'prefix');
        assert.equal(moment(0).from(30000), 'hai uns segundos', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'hai uns segundos',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'nuns segundos', 'en unos segundos');
        assert.equal(moment().add({d: 5}).fromNow(), 'en 5 días', 'en 5 días');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                         'hoxe ás 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),          'hoxe ás 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),           'hoxe ás 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),           'mañá ás 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'mañá á 1:00',   'tomorrow minus 1 hour');
        assert.equal(moment(a).subtract({h: 1}).calendar(),      'hoxe á 1:00',      'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),      'onte á 2:00',    'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('regression tests', function (assert) {
        var lastWeek = moment().subtract({d: 4}).hours(1);
        assert.equal(lastWeek.calendar(), lastWeek.format('[o] dddd [pasado a] LT'), '1 o\'clock bug');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1º', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1º', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2º', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2º', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3º', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('he');

    test('parse', function (assert) {
        var tests = 'ינואר ינו׳_פברואר פבר׳_מרץ מרץ_אפריל אפר׳_מאי מאי_יוני יוני_יולי יולי_אוגוסט אוג׳_ספטמבר ספט׳_אוקטובר אוק׳_נובמבר נוב׳_דצמבר דצמ׳'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'ראשון, פברואר 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            'א׳, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 פברואר פבר׳'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 ראשון א׳ א'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '8 8 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45 day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 בפברואר 2010'],
                ['LLL',                                '14 בפברואר 2010 15:25'],
                ['LLLL',                               'ראשון, 14 בפברואר 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 פבר׳ 2010'],
                ['lll',                                '14 פבר׳ 2010 15:25'],
                ['llll',                               'א׳, 14 פבר׳ 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format month', function (assert) {
        var expected = 'ינואר ינו׳_פברואר פבר׳_מרץ מרץ_אפריל אפר׳_מאי מאי_יוני יוני_יולי יולי_אוגוסט אוג׳_ספטמבר ספט׳_אוקטובר אוק׳_נובמבר נוב׳_דצמבר דצמ׳'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'ראשון א׳ א|שני ב׳ ב|שלישי ג׳ ג|רביעי ד׳ ד|חמישי ה׳ ה|שישי ו׳ ו|שבת ש׳ ש'.split('|'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'מספר שניות', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'דקה',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'דקה',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 דקות',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 דקות',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'שעה',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'שעה',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  'שעתיים',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 שעות',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 שעות',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'יום',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'יום',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  'יומיים',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'יום',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ימים',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ימים',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'חודש',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'חודש',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'חודש',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  'חודשיים',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  'חודשיים',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 חודשים',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'חודש',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 חודשים',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'שנה',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), 'שנתיים',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 3699}), true), '10 שנים',        '345 days = 10 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 7340}), true), '20 שנה',       '548 days = 20 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'שנה',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 שנים',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'בעוד מספר שניות',  'prefix');
        assert.equal(moment(0).from(30000), 'לפני מספר שניות', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'לפני מספר שניות',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'בעוד מספר שניות', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'בעוד 5 ימים', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'היום ב־02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'היום ב־02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'היום ב־03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'מחר ב־02:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'היום ב־01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'אתמול ב־02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [בשעה] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [בשעה] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [בשעה] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[ביום] dddd [האחרון בשעה] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[ביום] dddd [האחרון בשעה] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[ביום] dddd [האחרון בשעה] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday format', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('hi');

    test('parse', function (assert) {
        var tests = 'जनवरी जन._फ़रवरी फ़र._मार्च मार्च_अप्रैल अप्रै._मई मई_जून जून_जुलाई जुल._अगस्त अग._सितम्बर सित._अक्टूबर अक्टू._नवम्बर नव._दिसम्बर दिस.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, a h:mm:ss बजे',  'रविवार, १४ फ़रवरी २०१०, दोपहर ३:२५:५० बजे'],
                ['ddd, a h बजे',                       'रवि, दोपहर ३ बजे'],
                ['M Mo MM MMMM MMM',                   '२ २ ०२ फ़रवरी फ़र.'],
                ['YYYY YY',                            '२०१० १०'],
                ['D Do DD',                            '१४ १४ १४'],
                ['d do dddd ddd dd',                   '० ० रविवार रवि र'],
                ['DDD DDDo DDDD',                      '४५ ४५ ०४५'],
                ['w wo ww',                            '८ ८ ०८'],
                ['h hh',                               '३ ०३'],
                ['H HH',                               '१५ १५'],
                ['m mm',                               '२५ २५'],
                ['s ss',                               '५० ५०'],
                ['a A',                                'दोपहर दोपहर'],
                ['LTS',                                'दोपहर ३:२५:५० बजे'],
                ['L',                                  '१४/०२/२०१०'],
                ['LL',                                 '१४ फ़रवरी २०१०'],
                ['LLL',                                '१४ फ़रवरी २०१०, दोपहर ३:२५ बजे'],
                ['LLLL',                               'रविवार, १४ फ़रवरी २०१०, दोपहर ३:२५ बजे'],
                ['l',                                  '१४/२/२०१०'],
                ['ll',                                 '१४ फ़र. २०१०'],
                ['lll',                                '१४ फ़र. २०१०, दोपहर ३:२५ बजे'],
                ['llll',                               'रवि, १४ फ़र. २०१०, दोपहर ३:२५ बजे']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '१', '१');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '२', '२');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '३', '३');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '४', '४');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '५', '५');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '६', '६');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '७', '७');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '८', '८');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '९', '९');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '१०', '१०');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '११', '११');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '१२', '१२');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '१३', '१३');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '१४', '१४');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '१५', '१५');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '१६', '१६');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '१७', '१७');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '१८', '१८');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '१९', '१९');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '२०', '२०');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '२१', '२१');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '२२', '२२');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '२३', '२३');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '२४', '२४');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '२५', '२५');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '२६', '२६');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '२७', '२७');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '२८', '२८');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '२९', '२९');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '३०', '३०');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '३१', '३१');
    });

    test('format month', function (assert) {
        var expected = 'जनवरी जन._फ़रवरी फ़र._मार्च मार्च_अप्रैल अप्रै._मई मई_जून जून_जुलाई जुल._अगस्त अग._सितम्बर सित._अक्टूबर अक्टू._नवम्बर नव._दिसम्बर दिस.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'रविवार रवि र_सोमवार सोम सो_मंगलवार मंगल मं_बुधवार बुध बु_गुरूवार गुरू गु_शुक्रवार शुक्र शु_शनिवार शनि श'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'कुछ ही क्षण', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'एक मिनट',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'एक मिनट',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '२ मिनट',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '४४ मिनट',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'एक घंटा',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'एक घंटा',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '२ घंटे',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '५ घंटे',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '२१ घंटे',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'एक दिन',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'एक दिन',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '२ दिन',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'एक दिन',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '५ दिन',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '२५ दिन',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'एक महीने',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'एक महीने',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'एक महीने',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '२ महीने',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '२ महीने',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '३ महीने',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'एक महीने',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '५ महीने',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'एक वर्ष',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '२ वर्ष',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'एक वर्ष',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '५ वर्ष',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'कुछ ही क्षण में',  'prefix');
        assert.equal(moment(0).from(30000), 'कुछ ही क्षण पहले', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'कुछ ही क्षण पहले',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'कुछ ही क्षण में', 'कुछ ही क्षण में');
        assert.equal(moment().add({d: 5}).fromNow(), '५ दिन में', '५ दिन में');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'आज रात २:०० बजे',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'आज रात २:२५ बजे',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 3}).calendar(),       'आज सुबह ५:०० बजे',     'Now plus 3 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'कल रात २:०० बजे',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'आज रात १:०० बजे',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'कल रात २:०० बजे', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[पिछले] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[पिछले] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[पिछले] dddd[,] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('meridiem invariant', function (assert) {
        assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'रात', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'सुबह', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'दोपहर', 'during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'शाम', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'शाम', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'रात', 'night');

        assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'रात', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'सुबह', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'दोपहर', ' during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'शाम', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'शाम', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'रात', 'night');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '१ ०१ १', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '१ ०१ १', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '२ ०२ २', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '२ ०२ २', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '३ ०३ ३', 'Jan 15 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('meridiem', function (assert) {
        var h, m, t1, t2;
        for (h = 0; h < 24; ++h) {
            for (m = 0; m < 60; m += 15) {
                t1 = moment.utc([2000, 0, 1, h, m]);
                t2 = moment(t1.format('A h:mm'), 'A h:mm');
                assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                        'meridiem at ' + t1.format('HH:mm'));
            }
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('hr');

    test('parse', function (assert) {
        var tests = 'siječanj sij._veljača velj._ožujak ožu._travanj tra._svibanj svi._lipanj lip._srpanj srp._kolovoz kol._rujan ruj._listopad lis._studeni stu._prosinac pro.'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'nedjelja, 14. veljača 2010, 3:25:50 pm'],
                ['ddd, hA',                            'ned., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 veljača velj.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. nedjelja ned. ne'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '7 7. 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45. day of the year'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14. 02. 2010'],
                ['LL',                                 '14. veljača 2010'],
                ['LLL',                                '14. veljača 2010 15:25'],
                ['LLLL',                               'nedjelja, 14. veljača 2010 15:25'],
                ['l',                                  '14. 2. 2010'],
                ['ll',                                 '14. velj. 2010'],
                ['lll',                                '14. velj. 2010 15:25'],
                ['llll',                               'ned., 14. velj. 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'siječanj sij._veljača velj._ožujak ožu._travanj tra._svibanj svi._lipanj lip._srpanj srp._kolovoz kol._rujan ruj._listopad lis._studeni stu._prosinac pro.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'nedjelja ned. ne_ponedjeljak pon. po_utorak uto. ut_srijeda sri. sr_četvrtak čet. če_petak pet. pe_subota sub. su'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'par sekundi', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'jedna minuta',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'jedna minuta',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuta',     '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'jedan sat',      '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'jedan sat',      '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 sata',        '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 sati',         '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 sati',        '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'dan',       '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'dan',       '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dana',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'dan',       '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dana',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dana',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'mjesec',     '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'mjesec',     '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'mjesec',     '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 mjeseca',     '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 mjeseca',     '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 mjeseca',     '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'mjesec',     '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 mjeseci',    '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'godinu',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 godine',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'godinu',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 godina',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'za par sekundi',  'prefix');
        assert.equal(moment(0).from(30000), 'prije par sekundi', 'prefix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'prije par sekundi',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'za par sekundi', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'za 5 dana', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'danas u 2:00',  'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'danas u 2:25',  'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'danas u 3:00',  'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'sutra u 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'danas u 1:00',  'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'jučer u 2:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
                return '[u] [nedjelju] [u] LT';
            case 3:
                return '[u] [srijedu] [u] LT';
            case 6:
                return '[u] [subotu] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[u] dddd [u] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
            case 3:
                return '[prošlu] dddd [u] LT';
            case 6:
                return '[prošle] [subote] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[prošli] dddd [u] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1.', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1.', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2.', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2.', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3.', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('hu');

    test('parse', function (assert) {
        var tests = 'január jan_február feb_március márc_április ápr_május máj_június jún_július júl_augusztus aug_szeptember szept_október okt_november nov_december dec'.split('_'),
            i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, HH:mm:ss',      'vasárnap, február 14. 2010, 15:25:50'],
                ['ddd, HH',                            'vas, 15'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 február feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. vasárnap vas v'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '7 7. 07'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['[az év] DDDo [napja]',               'az év 45. napja'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '2010.02.14.'],
                ['LL',                                 '2010. február 14.'],
                ['LLL',                                '2010. február 14. 15:25'],
                ['LLLL',                               '2010. február 14., vasárnap 15:25'],
                ['l',                                  '2010.2.14.'],
                ['ll',                                 '2010. feb 14.'],
                ['lll',                                '2010. feb 14. 15:25'],
                ['llll',                               '2010. feb 14., vas 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('meridiem', function (assert) {
        assert.equal(moment([2011, 2, 23,  0,  0]).format('a'), 'de', 'am');
        assert.equal(moment([2011, 2, 23, 11, 59]).format('a'), 'de', 'am');
        assert.equal(moment([2011, 2, 23, 12,  0]).format('a'), 'du', 'pm');
        assert.equal(moment([2011, 2, 23, 23, 59]).format('a'), 'du', 'pm');

        assert.equal(moment([2011, 2, 23,  0,  0]).format('A'), 'DE', 'AM');
        assert.equal(moment([2011, 2, 23, 11, 59]).format('A'), 'DE', 'AM');
        assert.equal(moment([2011, 2, 23, 12,  0]).format('A'), 'DU', 'PM');
        assert.equal(moment([2011, 2, 23, 23, 59]).format('A'), 'DU', 'PM');
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
    });

    test('format month', function (assert) {
        var expected = 'január jan_február feb_március márc_április ápr_május máj_június jún_július júl_augusztus aug_szeptember szept_október okt_november nov_december dec'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'vasárnap vas_hétfő hét_kedd kedd_szerda sze_csütörtök csüt_péntek pén_szombat szo'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'néhány másodperc', '44 másodperc = néhány másodperc');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'egy perc',         '45 másodperc = egy perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'egy perc',         '89 másodperc = egy perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 perc',           '90 másodperc = 2 perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 perc',          '44 perc = 44 perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'egy óra',          '45 perc = egy óra');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'egy óra',          '89 perc = egy óra');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 óra',            '90 perc = 2 óra');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 óra',            '5 óra = 5 óra');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 óra',           '21 óra = 21 óra');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'egy nap',          '22 óra = egy nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'egy nap',          '35 óra = egy nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 nap',            '36 óra = 2 nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'egy nap',          '1 nap = egy nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 nap',            '5 nap = 5 nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 nap',           '25 nap = 25 nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'egy hónap',        '26 nap = egy hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'egy hónap',        '30 nap = egy hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'egy hónap',        '45 nap = egy hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 hónap',          '46 nap = 2 hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 hónap',          '75 nap = 2 hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 hónap',          '76 nap = 3 hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'egy hónap',        '1 hónap = egy hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 hónap',          '5 hónap = 5 hónap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'egy év',           '345 nap = egy év');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 év',             '548 nap = 2 év');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'egy év',           '1 év = egy év');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 év',             '5 év = 5 év');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'néhány másodperc múlva',  'prefix');
        assert.equal(moment(0).from(30000), 'néhány másodperce', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'néhány másodperce',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'néhány másodperc múlva', 'néhány másodperc múlva');
        assert.equal(moment().add({d: 5}).fromNow(), '5 nap múlva', '5 nap múlva');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'ma 2:00-kor',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'ma 2:25-kor',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'ma 3:00-kor',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'holnap 2:00-kor', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'ma 1:00-kor',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'tegnap 2:00-kor', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m, days = 'vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton'.split('_');
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[' + days[m.day()] + '] LT[-kor]'),  'today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[' + days[m.day()] + '] LT[-kor]'),  'today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[' + days[m.day()] + '] LT[-kor]'),  'today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m, days = 'vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton'.split('_');

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[múlt ' + days[m.day()] + '] LT[-kor]'),  'today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[múlt ' + days[m.day()] + '] LT[-kor]'),  'today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[múlt ' + days[m.day()] + '] LT[-kor]'),  'today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  'egy héte');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'egy hét múlva');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 hete');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '2 hét múlva');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1.', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1.', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2.', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2.', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3.', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('hy-am');

    test('parse', function (assert) {
        var tests = 'հունվար հնվ_փետրվար փտր_մարտ մրտ_ապրիլ ապր_մայիս մյս_հունիս հնս_հուլիս հլս_օգոստոս օգս_սեպտեմբեր սպտ_հոկտեմբեր հկտ_նոյեմբեր նմբ_դեկտեմբեր դկտ'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('parse exceptional case', function (assert) {
        assert.equal(moment('11 մայիսի 1989', ['DD MMMM YYYY']).format('DD-MM-YYYY'), '11-05-1989');
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, HH:mm:ss',       'կիրակի, 14 փետրվարի 2010, 15:25:50'],
                ['ddd, h A',                           'կրկ, 3 ցերեկվա'],
                ['M Mo MM MMMM MMM',                   '2 2 02 փետրվար փտր'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 կիրակի կրկ կրկ'],
                ['DDD DDDo DDDD',                      '45 45-րդ 045'],
                ['w wo ww',                            '7 7-րդ 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'ցերեկվա ցերեկվա'],
                ['[տարվա] DDDo [օրը]',                 'տարվա 45-րդ օրը'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 փետրվարի 2010 թ.'],
                ['LLL',                                '14 փետրվարի 2010 թ., 15:25'],
                ['LLLL',                               'կիրակի, 14 փետրվարի 2010 թ., 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 փտր 2010 թ.'],
                ['lll',                                '14 փտր 2010 թ., 15:25'],
                ['llll',                               'կրկ, 14 փտր 2010 թ., 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format meridiem', function (assert) {
        assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), 'գիշերվա', 'night');
        assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), 'գիշերվա', 'night');
        assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), 'առավոտվա', 'morning');
        assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), 'առավոտվա', 'morning');
        assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), 'ցերեկվա', 'afternoon');
        assert.equal(moment([2012, 11, 28, 16, 59]).format('A'), 'ցերեկվա', 'afternoon');
        assert.equal(moment([2012, 11, 28, 17, 0]).format('A'), 'երեկոյան', 'evening');
        assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), 'երեկոյան', 'evening');
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-ին', '1-ին');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-րդ', '2-րդ');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-րդ', '3-րդ');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-րդ', '4-րդ');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-րդ', '5-րդ');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-րդ', '6-րդ');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-րդ', '7-րդ');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-րդ', '8-րդ');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-րդ', '9-րդ');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-րդ', '10-րդ');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-րդ', '11-րդ');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-րդ', '12-րդ');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-րդ', '13-րդ');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-րդ', '14-րդ');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-րդ', '15-րդ');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-րդ', '16-րդ');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-րդ', '17-րդ');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-րդ', '18-րդ');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-րդ', '19-րդ');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-րդ', '20-րդ');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-րդ', '21-րդ');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-րդ', '22-րդ');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-րդ', '23-րդ');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-րդ', '24-րդ');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-րդ', '25-րդ');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-րդ', '26-րդ');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-րդ', '27-րդ');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-րդ', '28-րդ');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-րդ', '29-րդ');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-րդ', '30-րդ');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-րդ', '31-րդ');
    });

    test('format month', function (assert) {
        var expected = 'հունվար հնվ_փետրվար փտր_մարտ մրտ_ապրիլ ապր_մայիս մյս_հունիս հնս_հուլիս հլս_օգոստոս օգս_սեպտեմբեր սպտ_հոկտեմբեր հկտ_նոյեմբեր նմբ_դեկտեմբեր դկտ'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format month case', function (assert) {
        var months = {
            'nominative': 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_'),
            'accusative': 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
        }
    });

    test('format month short case', function (assert) {
        var monthsShort = {
            'nominative': 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
            'accusative': 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2011, i, 1]).format('D MMM'), '1 ' + monthsShort.accusative[i], '1 ' + monthsShort.accusative[i]);
            assert.equal(moment([2011, i, 1]).format('MMM'), monthsShort.nominative[i], '1 ' + monthsShort.nominative[i]);
        }
    });

    test('format month case with escaped symbols', function (assert) {
        var months = {
            'nominative': 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_'),
            'accusative': 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2013, i, 1]).format('D[] MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'), '<i>1</i> <b>' + months.accusative[i] + '</b>', '1 <b>' + months.accusative[i] + '</b>');
            assert.equal(moment([2013, i, 1]).format('D[-ին օրը] MMMM'), '1-ին օրը ' + months.accusative[i], '1-ին օրը ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('D, MMMM'), '1, ' + months.nominative[i], '1, ' + months.nominative[i]);
        }
    });

    test('format month short case with escaped symbols', function (assert) {
        var monthsShort = {
            'nominative': 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
            'accusative': 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2013, i, 1]).format('D[] MMM'), '1 ' + monthsShort.accusative[i], '1 ' + monthsShort.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMM[</b>]'), '<i>1</i> <b>' + monthsShort.accusative[i] + '</b>', '1 <b>' + monthsShort.accusative[i] + '</b>');
            assert.equal(moment([2013, i, 1]).format('D[-ին օրը] MMM'), '1-ին օրը ' + monthsShort.accusative[i], '1-ին օրը ' + monthsShort.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('D, MMM'), '1, ' + monthsShort.nominative[i], '1, ' + monthsShort.nominative[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'կիրակի կրկ կրկ_երկուշաբթի երկ երկ_երեքշաբթի երք երք_չորեքշաբթի չրք չրք_հինգշաբթի հնգ հնգ_ուրբաթ ուրբ ուրբ_շաբաթ շբթ շբթ'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'մի քանի վայրկյան',    '44 seconds = seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'րոպե',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'րոպե',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 րոպե',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 րոպե', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ժամ',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ժամ',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ժամ',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ժամ',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ժամ',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'օր',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'օր',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 օր',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'օր',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 օր',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 11}), true),  '11 օր',     '11 days = 11 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 21}), true),  '21 օր',     '21 days = 21 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 օր',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ամիս',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ամիս',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ամիս',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ամիս',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ամիս',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ամիս',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ամիս',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ամիս',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'տարի',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 տարի',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'տարի',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 տարի',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'մի քանի վայրկյան հետո', 'prefix');
        assert.equal(moment(0).from(30000), 'մի քանի վայրկյան առաջ', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'մի քանի վայրկյան հետո', 'in seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 օր հետո', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'այսօր 02:00',   'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'այսօր 02:25',   'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'այսօր 03:00',   'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'վաղը 02:00',   'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'այսօր 01:00',   'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'երեկ 02:00',   'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        function makeFormat(d) {
            return 'dddd [օրը ժամը] LT';
        }

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        function makeFormat(d) {
            return '[անցած] dddd [օրը ժամը] LT';
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(makeFormat(m)),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday', function (assert) {
        assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    });

    test('weeks year starting monday', function (assert) {
        assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
        assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
        assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
        assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    });

    test('weeks year starting tuesday', function (assert) {
        assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
        assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
        assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    });

    test('weeks year starting wednesday', function (assert) {
        assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
        assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
        assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    });

    test('weeks year starting thursday', function (assert) {
        assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
        assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
        assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    });

    test('weeks year starting friday', function (assert) {
        assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
        assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
        assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
        assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
        assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    });

    test('weeks year starting saturday', function (assert) {
        assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
        assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
        assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
        assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
        assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-ին', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-ին', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-րդ', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-րդ', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-րդ', 'Jan  9 2012 should be week 3');
    });

    test('lenient ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
    });

    test('lenient ordinal parsing of number', function (assert) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            assert.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            assert.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            assert.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
    });

    test('strict ordinal parsing', function (assert) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
    });

}));

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    /*global QUnit:false*/

    var test = QUnit.test;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function () {
                    throw new Error('input not handled by moment');
                };
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    localeModule('id');

    test('parse', function (assert) {
        var tests = 'Januari Jan_Februari Feb_Maret Mar_April Apr_Mei Mei_Juni Jun_Juli Jul_Agustus Ags_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Minggu, Februari 14 2010, 3:25:50 sore'],
                ['