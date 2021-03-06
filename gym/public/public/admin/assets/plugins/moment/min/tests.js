
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
        assert.equal(moment(a).add({d: 1}).calendar(),       'M??re om 02:00',    'tomorrow at the same time');
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
        var tests = '??????????:??????????_????????????:????????????_????????:????????_??????????:??????????_??????:??????_??????????:??????????_????????????:????????????_??????:??????_??????????:??????????_????????????:????????????_??????????:??????????_??????????:??????????'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '??????????, ???????????? 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            '??????, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 ???????????? ????????????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 ?????????? ?????? ??'],
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
                ['LL',                                 '14 ???????????? 2010'],
                ['LLL',                                '14 ???????????? 2010 15:25'],
                ['LLLL',                               '?????????? 14 ???????????? 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 ???????????? 2010'],
                ['lll',                                '14 ???????????? 2010 15:25'],
                ['llll',                               '?????? 14 ???????????? 2010 15:25']
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
        var expected = '?????????? ??????????_???????????? ????????????_???????? ????????_?????????? ??????????_?????? ??????_?????????? ??????????_???????????? ????????????_?????? ??????_?????????? ??????????_???????????? ????????????_?????????? ??????????_?????????? ??????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????? ?????? ??_?????????????? ?????????? ??_???????????????? ???????????? ??_???????????????? ???????????? ??_???????????? ???????? ??_???????????? ???????? ??_?????????? ?????? ??'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ??????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ??????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ??????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ??????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ??????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '??????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '??????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '??????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '??????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '??????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ??????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '??????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ????????',  'prefix');
        assert.equal(moment(0).from(30000), '?????? ????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????? ????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???? ????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???? 5 ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????? ?????? ???????????? 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? ?????? ???????????? 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? ?????? ???????????? 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????? ?????? ???????????? 02:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? ?????? ???????????? 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????? ?????? ???????????? 02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days end of day');
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
        var tests = '??????????:??????????_????????????:????????????_????????:????????_??????????:??????????_????????:????????_??????????:??????????_??????????:??????????_??????????:??????????_????????????:????????????_????????????:????????????_????????????:????????????_????????????:????????????'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '???????????? ???????????? ???? ?????????? ??:????:???? ??'],
                ['ddd, hA',                            '???????? ????'],
                ['M Mo MM MMMM MMM',                   '?? ?? ???? ???????????? ????????????'],
                ['YYYY YY',                            '???????? ????'],
                ['D Do DD',                            '???? ???? ????'],
                ['d do dddd ddd dd',                   '?? ?? ?????????? ?????? ??'],
                ['DDD DDDo DDDD',                      '???? ???? ??????'],
                ['w wo ww',                            '?? ?? ????'],
                ['h hh',                               '?? ????'],
                ['H HH',                               '???? ????'],
                ['m mm',                               '???? ????'],
                ['s ss',                               '???? ????'],
                ['a A',                                '?? ??'],
                ['[the] DDDo [day of the year]',       'the ???? day of the year'],
                ['LT',                                 '????:????'],
                ['LTS',                                '????:????:????'],
                ['L',                                  '????/????/????????'],
                ['LL',                                 '???? ???????????? ????????'],
                ['LLL',                                '???? ???????????? ???????? ????:????'],
                ['LLLL',                               '?????????? ???? ???????????? ???????? ????:????'],
                ['l',                                  '????/??/????????'],
                ['ll',                                 '???? ???????????? ????????'],
                ['lll',                                '???? ???????????? ???????? ????:????'],
                ['llll',                               '?????? ???? ???????????? ???????? ????:????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '??', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '??', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '??', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '??', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '??', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '??', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '??', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '??', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '??', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '????', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '????', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '????', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '????', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '????', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '????', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '????', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '????', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '????', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '????', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '????', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '????', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '????', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '????', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '????', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '????', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '????', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '????', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '????', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '????', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '????', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '????', '31');
    });

    test('format month', function (assert) {
        var expected = '?????????? ??????????_???????????? ????????????_???????? ????????_?????????? ??????????_???????? ????????_?????????? ??????????_?????????? ??????????_?????????? ??????????_???????????? ????????????_???????????? ????????????_???????????? ????????????_???????????? ????????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????? ?????? ??_?????????????? ?????????? ??_???????????????? ???????????? ??_???????????????? ???????????? ??_???????????? ???????? ??_???????????? ???????? ??_?????????? ?????? ??'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '?? ??????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '???? ??????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '?? ??????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '?? ??????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '???? ??????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '?? ????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '?? ????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '???? ????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '??????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '??????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '??????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '?? ????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '?? ????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '?? ????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '??????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '?? ????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '??????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '?? ??????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '??????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '?? ??????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ????????',  'prefix');
        assert.equal(moment(0).from(30000), '?????? ????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????? ????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???? ????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???? ?? ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????? ?????? ???????????? ????:????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? ?????? ???????????? ????:????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? ?????? ???????????? ????:????',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????? ?????? ???????????? ????:????',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? ?????? ???????????? ????:????',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????? ?????? ???????????? ????:????', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days end of day');
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

        assert.equal(moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'), '????????-????-????', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'), '????????-????-????', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 6', 'gggg w d').format('gggg w d'), '???????? ?? ??', 'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6');
        assert.equal(moment('2003 1 0', 'gggg w e').format('gggg w e'), '???????? ?? ??', '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0');
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
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '?? ???? ??', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '?? ???? ??', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '?? ???? ??', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '?? ???? ??', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '?? ???? ??', 'Jan 14 2012 should be week 3');
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
        var tests = '??????????:??????????_??????????:??????????_????????:????????_??????????:??????????_??????:??????_????????:????????_????????????:????????????_??????:??????_????????????:????????????_????????????:????????????_????????????:????????????_????????????:????????????'.split('_'),
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
                ['dddd, MMMM Do YYYY, h:mm:ss a', '??????????, ?????????? 14 2010, 3:25:50 pm'],
                ['ddd, hA', '??????, 3PM'],
                ['M Mo MM MMMM MMM', '2 2 02 ?????????? ??????????'],
                ['YYYY YY', '2010 10'],
                ['D Do DD', '14 14 14'],
                ['d do dddd ddd dd', '0 0 ?????????? ?????? ??'],
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
                ['LL', '14 ?????????? 2010'],
                ['LLL', '14 ?????????? 2010 15:25'],
                ['LLLL', '?????????? 14 ?????????? 2010 15:25'],
                ['l', '14/2/2010'],
                ['ll', '14 ?????????? 2010'],
                ['lll', '14 ?????????? 2010 15:25'],
                ['llll', '?????? 14 ?????????? 2010 15:25']
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
        var expected = '?????????? ??????????_?????????? ??????????_???????? ????????_?????????? ??????????_?????? ??????_???????? ????????_???????????? ????????????_?????? ??????_???????????? ????????????_???????????? ????????????_???????????? ????????????_???????????? ????????????'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????? ?????? ??_?????????????? ?????????? ??_???????????????? ???????????? ??_???????????????? ???????????? ??_???????????? ???????? ??_???????????? ???????? ??_?????????? ?????? ??'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 44
        }), true), '????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 45
        }), true), '??????????', '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 89
        }), true), '??????????', '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            s: 90
        }), true), '2 ??????????', '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 44
        }), true), '44 ??????????', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 45
        }), true), '????????', '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 89
        }), true), '????????', '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            m: 90
        }), true), '2 ??????????', '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 5
        }), true), '5 ??????????', '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 21
        }), true), '21 ??????????', '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 22
        }), true), '??????', '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 35
        }), true), '??????', '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            h: 36
        }), true), '2 ????????', '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 1
        }), true), '??????', '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 5
        }), true), '5 ????????', '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 25
        }), true), '25 ????????', '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 26
        }), true), '??????', '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 30
        }), true), '??????', '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 43
        }), true), '??????', '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 46
        }), true), '2 ????????', '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 74
        }), true), '2 ????????', '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 76
        }), true), '3 ????????', '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            M: 1
        }), true), '??????', '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            M: 5
        }), true), '5 ????????', '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 345
        }), true), '??????', '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            d: 548
        }), true), '2 ??????????', '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            y: 1
        }), true), '??????', '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({
            y: 5
        }), true), '5 ??????????', '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ????????', 'prefix');
        assert.equal(moment(0).from(30000), '?????? ????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????? ????????', 'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({
            s: 30
        }).fromNow(), '???? ????????', 'in a few seconds');
        assert.equal(moment().add({
            d: 5
        }).fromNow(), '???? 5 ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(), '?????????? ?????? ???????????? 02:00', 'today at the same time');
        assert.equal(moment(a).add({
            m: 25
        }).calendar(), '?????????? ?????? ???????????? 02:25', 'Now plus 25 min');
        assert.equal(moment(a).add({
            h: 1
        }).calendar(), '?????????? ?????? ???????????? 03:00', 'Now plus 1 hour');
        assert.equal(moment(a).add({
            d: 1
        }).calendar(), '?????? ?????? ???????????? 02:00', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({
            h: 1
        }).calendar(), '?????????? ?????? ???????????? 01:00', 'Now minus 1 hour');
        assert.equal(moment(a).subtract({
            d: 1
        }).calendar(), '?????? ?????? ???????????? 02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({
                d: i
            });
            assert.equal(m.calendar(), m.format('dddd [?????? ????????????] LT'), 'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format('dddd [?????? ????????????] LT'), 'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format('dddd [?????? ????????????] LT'), 'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format('dddd [?????? ????????????] LT'), 'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format('dddd [?????? ????????????] LT'), 'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format('dddd [?????? ????????????] LT'), 'Today - ' + i + ' days end of day');
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
        '?????????? ???????????? ??????????',
        '???????? ????????????',
        '???????? ????????',
        '?????????? ??????????',
        '???????? ????????',
        '???????????? ??????????',
        '???????? ??????????',
        '???? ??????????',
        '?????????? ????????????',
        '?????????? ?????????? ????????????',
        '?????????? ???????????? ????????????',
        '?????????? ?????????? ????????????'
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '???????????? ???????? ???????????? ???? ?????????? ??:????:???? ??'],
                ['ddd, hA',                            '???????? ????'],
                ['M Mo MM MMMM MMM',                   '?? ?? ???? ???????? ???????????? ???????? ????????????'],
                ['YYYY YY',                            '???????? ????'],
                ['D Do DD',                            '???? ???? ????'],
                ['d do dddd ddd dd',                   '?? ?? ?????????? ?????? ??'],
                ['DDD DDDo DDDD',                      '???? ???? ??????'],
                ['w wo ww',                            '?? ?? ????'],
                ['h hh',                               '?? ????'],
                ['H HH',                               '???? ????'],
                ['m mm',                               '???? ????'],
                ['s ss',                               '???? ????'],
                ['a A',                                '?? ??'],
                ['[the] DDDo [day of the year]',       'the ???? day of the year'],
                ['LT',                                 '????:????'],
                ['LTS',                                '????:????:????'],
                ['L',                                  '????/\u200f??/\u200f????????'],
                ['LL',                                 '???? ???????? ???????????? ????????'],
                ['LLL',                                '???? ???????? ???????????? ???????? ????:????'],
                ['LLLL',                               '?????????? ???? ???????? ???????????? ???????? ????:????'],
                ['l',                                  '????/\u200f??/\u200f????????'],
                ['ll',                                 '???? ???????? ???????????? ????????'],
                ['lll',                                '???? ???????? ???????????? ???????? ????:????'],
                ['llll',                               '?????? ???? ???????? ???????????? ???????? ????:????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '??', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '??', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '??', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '??', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '??', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '??', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '??', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '??', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '??', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '????', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '????', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '????', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '????', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '????', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '????', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '????', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '????', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '????', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '????', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '????', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '????', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '????', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '????', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '????', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '????', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '????', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '????', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '????', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '????', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '????', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '????', '31');
    });

    test('format month', function (assert) {
        var expected = months, i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM'), expected[i], expected[i]);
            assert.equal(moment([2011, i, 1]).format('MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????? ?????? ??_?????????????? ?????????? ??_???????????????? ???????????? ??_???????????????? ???????????? ??_???????????? ???????? ??_???????????? ???????? ??_?????????? ?????? ??'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '???? ??????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '?????????? ??????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '?????????? ??????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '??????????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '???? ??????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '???????? ??????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '???????? ??????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '????????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '?? ??????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '???? ????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '?????? ????????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '?????? ????????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '??????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '?????? ????????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '?? ????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '???? ??????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '?????? ????????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '?????? ????????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '?????? ????????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '??????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '??????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '?? ????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '?????? ????????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '?? ????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '?????? ????????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '??????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '?????? ????????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '?? ??????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '?????? ???? ??????????',  'prefix');
        assert.equal(moment(0).from(30000), '?????? ???? ??????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????? ?????????? ??????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '?????? ???? ??????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '?????? ?? ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????? ?????? ???????????? ????:????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? ?????? ???????????? ????:????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? ?????? ???????????? ????:????',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????? ?????? ???????????? ????:????',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? ?????? ???????????? ????:????',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????? ?????? ???????????? ????:????', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days end of day');
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

        assert.equal(moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'), '????????-????-????', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'), '????????-????-????', 'Week 1 of 2003 should be Dec 28 2002');
        assert.equal(moment('2003 1 6', 'gggg w d').format('gggg w d'), '???????? ?? ??', 'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6');
        assert.equal(moment('2003 1 0', 'gggg w e').format('gggg w e'), '???????? ?? ??', '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0');
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
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '?? ???? ??', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '?? ???? ??', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '?? ???? ??', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '?? ???? ??', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '?? ???? ??', 'Jan 14 2012 should be week 3');
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
                ['ddd, A h',                           'Baz, g??nd??z 3'],
                ['M Mo MM MMMM MMM',                   '2 2-nci 02 fevral fev'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-??nc?? 14'],
                ['d do dddd ddd dd',                   '0 0-??nc?? Bazar Baz Bz'],
                ['DDD DDDo DDDD',                      '45 45-inci 045'],
                ['w wo ww',                            '7 7-nci 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'g??nd??z g??nd??z'],
                ['[ilin] DDDo [g??n??]',                 'ilin 45-inci g??n??'],
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
                [359, '360-??nc??'],
                [199, '200-??nc??'],
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
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-??nc??', '3rd');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-??nc??', '4th');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-inci', '5th');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-nc??', '6th');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-nci', '7th');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-inci', '8th');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-uncu', '9th');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-uncu', '10th');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-inci', '11th');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-nci', '12th');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-??nc??', '13th');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-??nc??', '14th');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-inci', '15th');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-nc??', '16th');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-nci', '17th');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-inci', '18th');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-uncu', '19th');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-nci', '20th');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-inci', '21th');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-nci', '22th');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-??nc??', '23th');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-??nc??', '24th');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-inci', '25th');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-nc??', '26th');
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
        var expected = 'Bazar Baz Bz_Bazar ert??si BzE BE_????r????nb?? ax??am?? ??Ax ??A_????r????nb?? ????r ????_C??m?? ax??am?? CAx CA_C??m?? C??m C??_????nb?? ????n ????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'birne???? saniyy??', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'bir d??qiq??',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'bir d??qiq??',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 d??qiq??',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 d??qiq??',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'bir saat',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'bir saat',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 saat',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 saat',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 saat',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'bir g??n',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'bir g??n',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 g??n',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'bir g??n',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 g??n',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 g??n',       '25 days = 25 days');
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
        assert.equal(moment(30000).from(0), 'birne???? saniyy?? sonra',  'prefix');
        assert.equal(moment(0).from(30000), 'birne???? saniyy?? ??vv??l', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'birne???? saniyy?? ??vv??l',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'birne???? saniyy?? sonra', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 g??n sonra', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'bug??n saat 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'bug??n saat 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'bug??n saat 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'sabah saat 02:00',     'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'bug??n saat 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'd??n??n 02:00',          'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[g??l??n h??ft??] dddd [saat] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[g??l??n h??ft??] dddd [saat] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[g??l??n h??ft??] dddd [saat] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[ke????n h??ft??] dddd [saat] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[ke????n h??ft??] dddd [saat] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[ke????n h??ft??] dddd [saat] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-??nc??', 'Jan  9 2012 should be week 3');
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
        var tests = '???????????????? ????????_???????? ??????_?????????????? ??????_???????????????? ????????_?????????????? ????????_?????????????? ????????_???????????? ??????_?????????????? ????????_???????????????? ??????_???????????????????? ????????_???????????????? ????????_?????????????? ????????'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, HH:mm:ss',       '??????????????, 14-???? ???????????? 2010, 15:25:50'],
                ['ddd, h A',                           '????, 3 ??????'],
                ['M Mo MM MMMM MMM',                   '2 2-?? 02 ???????? ??????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-???? 14'],
                ['d do dddd ddd dd',                   '0 0-?? ?????????????? ???? ????'],
                ['DDD DDDo DDDD',                      '45 45-?? 045'],
                ['w wo ww',                            '7 7-?? 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '?????? ??????'],
                ['DDDo [?????????? ????????]',                   '45-?? ?????????? ????????'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 ???????????? 2010 ??.'],
                ['LLL',                                '14 ???????????? 2010 ??., 15:25'],
                ['LLLL',                               '??????????????, 14 ???????????? 2010 ??., 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 ?????? 2010 ??.'],
                ['lll',                                '14 ?????? 2010 ??., 15:25'],
                ['llll',                               '????, 14 ?????? 2010 ??., 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format meridiem', function (assert) {
        assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), '????????', 'night');
        assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), '????????', 'night');
        assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), '????????????', 'morning');
        assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), '????????????', 'morning');
        assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), '??????', 'afternoon');
        assert.equal(moment([2012, 11, 28, 16, 59]).format('A'), '??????', 'afternoon');
        assert.equal(moment([2012, 11, 28, 17, 0]).format('A'), '????????????', 'evening');
        assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), '????????????', 'evening');
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-??', '1-??');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-??', '2-??');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-??', '3-??');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-??', '4-??');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-??', '5-??');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-??', '6-??');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-??', '7-??');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-??', '8-??');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-??', '9-??');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-??', '10-??');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-??', '11-??');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-??', '12-??');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-??', '13-??');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-??', '14-??');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-??', '15-??');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-??', '16-??');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-??', '17-??');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-??', '18-??');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-??', '19-??');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-??', '20-??');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-??', '21-??');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-??', '22-??');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-??', '23-??');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-??', '24-??');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-??', '25-??');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-??', '26-??');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-??', '27-??');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-??', '28-??');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-??', '29-??');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-??', '30-??');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-??', '31-??');
    });

    test('format month', function (assert) {
        var expected = '???????????????? ????????_???????? ??????_?????????????? ??????_???????????????? ????????_?????????????? ????????_?????????????? ????????_???????????? ??????_?????????????? ????????_???????????????? ??????_???????????????????? ????????_???????????????? ????????_?????????????? ????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format month case', function (assert) {
        var months = {
            'nominative': '????????????????_????????_??????????????_????????????????_??????????????_??????????????_????????????_??????????????_????????????????_????????????????????_????????????????_??????????????'.split('_'),
            'accusative': '????????????????_????????????_????????????????_??????????????????_????????????_??????????????_????????????_????????????_??????????????_??????????????????????_??????????????????_????????????'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
        }
    });

    test('format month case with escaped symbols', function (assert) {
        var months = {
            'nominative': '????????????????_????????_??????????????_????????????????_??????????????_??????????????_????????????_??????????????_????????????????_????????????????????_????????????????_??????????????'.split('_'),
            'accusative': '????????????????_????????????_????????????????_??????????????????_????????????_??????????????_????????????_????????????_??????????????_??????????????????????_??????????????????_????????????'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2013, i, 1]).format('D[] MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'), '<i>1</i> <b>' + months.accusative[i] + '</b>', '1 <b>' + months.accusative[i] + '</b>');
            assert.equal(moment([2013, i, 1]).format('D[-?? ??????????] MMMM'), '1-?? ?????????? ' + months.accusative[i], '1-?? ?????????? ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('D, MMMM'), '1, ' + months.nominative[i], '1, ' + months.nominative[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????????? ???? ????_???????????????????? ???? ????_?????????????? ???? ????_???????????? ???? ????_???????????? ???? ????_?????????????? ???? ????_???????????? ???? ????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '???????????????? ????????????',    '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??????????????',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??????????????',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ??????????????',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 31}), true),  '31 ??????????????',  '31 minutes = 31 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ??????????????', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '??????????????',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '??????????????',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ??????????????',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ????????????',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ??????????????',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??????????',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??????????',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ??????',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??????????',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ????????',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 11}), true),  '11 ????????',     '11 days = 11 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 21}), true),  '21 ??????????',     '21 days = 21 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ????????',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '??????????',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '??????????',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '??????????',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ????????????',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ????????????',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????????',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '??????????',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ??????????????',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '??????',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ????????',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '??????',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??????????',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???????? ???????????????? ????????????', 'prefix');
        assert.equal(moment(0).from(30000), '???????????????? ???????????? ????????', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???????? ???????????????? ????????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???????? 5 ????????', 'in 5 days');
        assert.equal(moment().add({m: 31}).fromNow(), '???????? 31 ??????????????', 'in 31 minutes = in 31 minutes');
        assert.equal(moment().subtract({m: 31}).fromNow(), '31 ?????????????? ????????', '31 minutes ago = 31 minutes ago');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????? ?? 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? ?? 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? ?? 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????????? ?? 02:00',      'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? ?? 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????????? ?? 02:00',       'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        function makeFormat(d) {
            return '[??] dddd [??] LT';
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
                return '[?? ??????????????] dddd [??] LT';
            case 1:
            case 2:
            case 4:
                return '[?? ????????????] dddd [??] LT';
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
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-??', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-??', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-??', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-??', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-??', 'Jan  9 2012 should be week 3');
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
        var tests = '???????????? ??????_???????????????? ??????_???????? ??????_?????????? ??????_?????? ??????_?????? ??????_?????? ??????_???????????? ??????_?????????????????? ??????_???????????????? ??????_?????????????? ??????_???????????????? ??????'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, H:mm:ss',        '????????????, ???????????????? 14-???? 2010, 15:25:50'],
                ['ddd, hA',                            '??????, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2-???? 02 ???????????????? ??????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-???? 14'],
                ['d do dddd ddd dd',                   '0 0-???? ???????????? ?????? ????'],
                ['DDD DDDo DDDD',                      '45 45-???? 045'],
                ['w wo ww',                            '7 7-???? 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45-???? day of the year'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 ???????????????? 2010'],
                ['LLL',                                '14 ???????????????? 2010 15:25'],
                ['LLLL',                               '????????????, 14 ???????????????? 2010 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 ?????? 2010'],
                ['lll',                                '14 ?????? 2010 15:25'],
                ['llll',                               '??????, 14 ?????? 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-????', '1-????');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-????', '2-????');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-????', '3-????');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-????', '4-????');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-????', '5-????');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-????', '6-????');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-????', '7-????');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-????', '8-????');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-????', '9-????');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-????', '10-????');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-????', '11-????');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-????', '12-????');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-????', '13-????');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-????', '14-????');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-????', '15-????');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-????', '16-????');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-????', '17-????');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-????', '18-????');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-????', '19-????');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-????', '20-????');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-????', '21-????');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-????', '22-????');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-????', '23-????');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-????', '24-????');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-????', '25-????');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-????', '26-????');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-????', '27-????');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-????', '28-????');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-????', '29-????');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-????', '30-????');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-????', '31-????');
    });

    test('format month', function (assert) {
        var expected = '???????????? ??????_???????????????? ??????_???????? ??????_?????????? ??????_?????? ??????_?????? ??????_?????? ??????_???????????? ??????_?????????????????? ??????_???????????????? ??????_?????????????? ??????_???????????????? ??????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '???????????? ?????? ????_???????????????????? ?????? ????_?????????????? ?????? ????_?????????? ?????? ????_?????????????????? ?????? ????_?????????? ?????? ????_???????????? ?????? ????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '?????????????? ??????????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '????????????',          '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '????????????',          '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ????????????',        '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ????????????',       '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '??????',             '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '??????',             '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ????????',          '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ????????',          '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ????????',         '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??????',             '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??????',             '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ??????',           '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??????',             '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ??????',           '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ??????',          '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '??????????',           '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '??????????',           '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '??????????',           '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ????????????',        '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ????????????',        '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????????',        '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '??????????',           '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ????????????',        '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '????????????',          '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ????????????',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '????????????',          '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ????????????',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???????? ?????????????? ??????????????',  'prefix');
        assert.equal(moment(0).from(30000), '?????????? ?????????????? ??????????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????????? ?????????????? ??????????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???????? ?????????????? ??????????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???????? 5 ??????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '???????? ?? 2:00',  'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '???????? ?? 2:25',  'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '???????? ?? 3:00',  'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????? ?? 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '???????? ?? 1:00',  'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????????? ?? 2:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
            case 3:
            case 6:
                return '[?? ????????????????????] dddd [??] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[?? ??????????????????] dddd [??] LT';
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
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-????', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-????', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-????', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-????', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-????', 'Jan  9 2012 should be week 3');
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
        var tests = '???????????????????????? ????????????_???????????????????????? ?????????_??????????????? ???????????????_?????????????????? ?????????_?????? ??????_????????? ?????????_??????????????? ?????????_?????????????????? ??????_?????????????????????????????? ???????????????_????????????????????? ???????????????_????????????????????? ??????_???????????????????????? ??????????????????'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, a h:mm:ss ?????????',  '??????????????????, ?????? ???????????????????????? ????????????, ??????????????? ???:??????:?????? ?????????'],
                ['ddd, a h ?????????',                       '?????????, ??????????????? ??? ?????????'],
                ['M Mo MM MMMM MMM',                   '??? ??? ?????? ???????????????????????? ?????????'],
                ['YYYY YY',                            '???????????? ??????'],
                ['D Do DD',                            '?????? ?????? ??????'],
                ['d do dddd ddd dd',                   '??? ??? ?????????????????? ????????? ??????'],
                ['DDD DDDo DDDD',                      '?????? ?????? ?????????'],
                ['w wo ww',                            '??? ??? ??????'],
                ['h hh',                               '??? ??????'],
                ['H HH',                               '?????? ??????'],
                ['m mm',                               '?????? ??????'],
                ['s ss',                               '?????? ??????'],
                ['a A',                                '??????????????? ???????????????'],
                ['LT',                                 '??????????????? ???:?????? ?????????'],
                ['LTS',                                '??????????????? ???:??????:?????? ?????????'],
                ['L',                                  '??????/??????/????????????'],
                ['LL',                                 '?????? ???????????????????????? ????????????'],
                ['LLL',                                '?????? ???????????????????????? ????????????, ??????????????? ???:?????? ?????????'],
                ['LLLL',                               '??????????????????, ?????? ???????????????????????? ????????????, ??????????????? ???:?????? ?????????'],
                ['l',                                  '??????/???/????????????'],
                ['ll',                                 '?????? ????????? ????????????'],
                ['lll',                                '?????? ????????? ????????????, ??????????????? ???:?????? ?????????'],
                ['llll',                               '?????????, ?????? ????????? ????????????, ??????????????? ???:?????? ?????????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '??????', '??????');
    });

    test('format month', function (assert) {
        var expected = '???????????????????????? ????????????_???????????????????????? ?????????_??????????????? ???????????????_?????????????????? ?????????_?????? ??????_????????? ?????????_??????????????? ?????????_?????????????????? ??????_?????????????????????????????? ???????????????_????????????????????? ???????????????_????????????????????? ??????_???????????????????????? ??????????????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????????????? ????????? ??????_?????????????????? ????????? ??????_???????????????????????? ??????????????? ????????????_?????????????????? ????????? ??????_??????????????????????????????????????? ?????????????????????????????? ???????????????_??????????????????????????? ?????????????????? ??????_?????????????????? ????????? ?????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '????????? ?????????????????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '?????? ???????????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '?????? ???????????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '??? ???????????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '?????? ???????????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '?????? ???????????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '?????? ???????????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '??? ???????????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '??? ???????????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '?????? ???????????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '?????? ?????????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '?????? ?????????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '??? ?????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '?????? ?????????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '??? ?????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '?????? ?????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '?????? ?????????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '?????? ?????????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '??? ?????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '??? ?????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '??? ?????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '?????? ?????????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '??? ?????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '?????? ?????????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '??? ?????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '?????? ?????????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '??? ?????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '????????? ????????????????????? ?????????',  'prefix');
        assert.equal(moment(0).from(30000), '????????? ????????????????????? ?????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '????????? ????????????????????? ?????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '????????? ????????????????????? ?????????', '????????? ????????????????????? ?????????');
        assert.equal(moment().add({d: 5}).fromNow(), '??? ????????? ?????????', '??? ????????? ?????????');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????? ????????? ???:?????? ?????????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????? ????????? ???:?????? ?????????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 3}).calendar(),       '?????? ???????????? ???:?????? ?????????',     'Now plus 3 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????????????????????? ????????? ???:?????? ?????????',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????? ????????? ???:?????? ?????????',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '??????????????? ????????? ???:?????? ?????????', 'yesterday at the same time');
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
            assert.equal(m.calendar(),       m.format('[??????] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[??????] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[??????] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), '?????????', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), '????????????', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), '???????????????', 'during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), '???????????????', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), '???????????????', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), '?????????', 'night');

        assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), '?????????', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), '????????????', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), '???????????????', ' during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), '???????????????', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), '???????????????', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), '?????????', 'night');
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
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '??? ?????? ???', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '??? ?????? ???', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '??? ?????? ???', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '??? ?????? ???', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '??? ?????? ???', 'Jan 15 2012 should be week 3');
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
        var tests = '?????????????????????????????? ??????????????????????????????._????????????????????????????????? ?????????????????????????????????_????????????????????????????????? ?????????????????????????????????_?????????????????????????????? ??????????????????????????????_??????????????????????????? ???????????????????????????_????????????????????????????????? ?????????????????????????????????_????????????????????????????????? ?????????????????????????????????_???????????????????????????????????? ????????????????????????????????????_?????????????????????????????? ??????????????????????????????_?????????????????????????????? ??????????????????????????????_????????????????????????????????????????????? ?????????????????????????????????????????????_????????????????????????????????????????????? ?????????????????????????????????????????????'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, a h:mm:ss ??????',  '???????????????????????????, ?????? ????????????????????????????????? ????????????, ????????????????????? ???:??????:?????? ??????'],
                ['ddd, a h ??????',                       '???????????????, ????????????????????? ??? ??????'],
                ['M Mo MM MMMM MMM',                   '??? ??? ?????? ????????????????????????????????? ?????????????????????????????????'],
                ['YYYY YY',                            '???????????? ??????'],
                ['D Do DD',                            '?????? ?????? ??????'],
                ['d do dddd ddd dd',                   '??? ??? ??????????????????????????? ??????????????? ???????????????'],
                ['DDD DDDo DDDD',                      '?????? ?????? ?????????'],
                ['w wo ww',                            '??? ??? ??????'],
                ['h hh',                               '??? ??????'],
                ['H HH',                               '?????? ??????'],
                ['m mm',                               '?????? ??????'],
                ['s ss',                               '?????? ??????'],
                ['a A',                                '????????????????????? ?????????????????????'],
                ['LT',                                 '????????????????????? ???:??????'],
                ['LTS',                                '????????????????????? ???:??????:??????'],
                ['L',                                  '??????/??????/????????????'],
                ['LL',                                 '?????? ????????????????????????????????? ????????????'],
                ['LLL',                                '?????? ????????????????????????????????? ????????????, ????????????????????? ???:??????'],
                ['LLLL',                               '???????????????????????????, ?????? ????????????????????????????????? ????????????, ????????????????????? ???:??????'],
                ['l',                                  '??????/???/????????????'],
                ['ll',                                 '?????? ????????????????????????????????? ????????????'],
                ['lll',                                '?????? ????????????????????????????????? ????????????, ????????????????????? ???:??????'],
                ['llll',                               '???????????????, ?????? ????????????????????????????????? ????????????, ????????????????????? ???:??????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '??????', '??????');
    });

    test('format month', function (assert) {
        var expected = '?????????????????????????????? ??????????????????????????????_????????????????????????????????? ?????????????????????????????????_????????????????????????????????? ?????????????????????????????????_?????????????????????????????? ??????????????????????????????_??????????????????????????? ???????????????????????????_????????????????????????????????? ?????????????????????????????????_????????????????????????????????? ?????????????????????????????????_???????????????????????????????????? ????????????????????????????????????_?????????????????????????????? ??????????????????????????????_?????????????????????????????? ??????????????????????????????_????????????????????????????????????????????? ?????????????????????????????????????????????_????????????????????????????????????????????? ?????????????????????????????????????????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '??????????????????????????? ??????????????? ???????????????_??????????????????????????? ??????????????? ???????????????_???????????????????????????????????? ???????????????????????? ????????????????????????_?????????????????????????????? ?????????????????? ??????????????????_?????????????????????????????? ?????????????????? ??????????????????_?????????????????????????????? ?????????????????? ??????????????????_????????????????????????????????? ????????????????????? ?????????????????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '???????????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??????????????????????????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??????????????????????????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '??? ???????????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '?????? ???????????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '?????????????????????????????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '?????????????????????????????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '??? ??????????????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '??? ??????????????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '?????? ??????????????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '????????????????????????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '????????????????????????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '??? ????????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '????????????????????????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '??? ????????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '?????? ????????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '???????????????????????????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '???????????????????????????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '???????????????????????????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '??? ????????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '??? ????????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '??? ????????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '???????????????????????????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '??? ????????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '?????????????????????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '??? ??????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '?????????????????????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '??? ??????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '??????????????? ??????',  'prefix');
        assert.equal(moment(0).from(30000), '??????????????? ???????????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '??????????????? ???????????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '??????????????? ??????', '??????????????? ??????');
        assert.equal(moment().add({d: 5}).fromNow(), '??? ???????????? ??????', '??? ???????????? ??????');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????????????? ?????????????????? ???:??????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????????????? ?????????????????? ???:??????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 3}).calendar(),       '?????????????????? ????????????????????? ???:??????',     'Now plus 3 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????????????????? ?????????????????? ???:??????',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????????????? ?????????????????? ???:??????',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '???????????? ?????????????????? ???:??????', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[?????????????????????????????????????????????][,] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[?????????????????????????????????????????????][,] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[?????????????????????????????????????????????][,] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[??????????????????????????????????????????] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[??????????????????????????????????????????] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[??????????????????????????????????????????] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), '??????????????????', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), '?????????????????????', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), '?????????????????????', 'during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), '?????????????????????', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), '?????????????????????', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), '??????????????????', 'night');

        assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), '??????????????????', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), '?????????????????????', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), '?????????????????????', ' during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), '?????????????????????', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), '?????????????????????', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), '??????????????????', 'night');
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
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '??? ?????? ???', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '??? ?????? ???', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '??? ?????? ???', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '??? ?????? ???', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '??? ?????? ???', 'Jan 15 2012 should be week 3');
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
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1a??', '1a??');
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
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'un nebeud segondenno??', '44 seconds = a few seconds');
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
        assert.equal(moment(30000).from(0), 'a-benn un nebeud segondenno??',  'prefix');
        assert.equal(moment(0).from(30000), 'un nebeud segondenno?? \'zo', 'suffix');
    });

    test('now from now', function (assert) {
        moment.locale('br');
        assert.equal(moment().fromNow(), 'un nebeud segondenno?? \'zo',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        moment.locale('br');
        assert.equal(moment().add({s: 30}).fromNow(), 'a-benn un nebeud segondenno??', 'in a few seconds');
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
        var expected = 'nedjelja ned. ne_ponedjeljak pon. po_utorak uto. ut_srijeda sri. sr_??etvrtak ??et. ??e_petak pet. pe_subota sub. su'.split('_'), i;
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
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'ju??er u 2:00', 'yesterday at the same time');
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
                return '[pro??lu] dddd [u] LT';
            case 6:
                return '[pro??le] [subote] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[pro??li] dddd [u] LT';
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
        var tests = 'gener gen._febrer febr._mar?? mar._abril abr._maig mai._juny jun._juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'diumenge, 14?? febrer 2010, 3:25:50 pm'],
                ['ddd, hA',                            'dg., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2n 02 febrer febr.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14?? 14'],
                ['d do dddd ddd dd',                   '0 0?? diumenge dg. Dg'],
                ['DDD DDDo DDDD',                      '45 45?? 045'],
                ['w wo ww',                            '6 6a 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45?? day of the year'],
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
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5??', '5??');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6??', '6??');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7??', '7??');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8??', '8??');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9??', '9??');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10??', '10??');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11??', '11??');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12??', '12??');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13??', '13??');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14??', '14??');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15??', '15??');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16??', '16??');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17??', '17??');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18??', '18??');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19??', '19??');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20??', '20??');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21??', '21??');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22??', '22??');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23??', '23??');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24??', '24??');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25??', '25??');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26??', '26??');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27??', '27??');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28??', '28??');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29??', '29??');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30??', '30??');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31??', '31??');
    });

    test('format month', function (assert) {
        var expected = 'gener gen._febrer febr._mar?? mar._abril abr._maig mai._juny jun._juliol jul._agost ag._setembre set._octubre oct._novembre nov._desembre des.'.split('_'), i;
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
        assert.equal(moment(a).add({d: 1}).calendar(),           'dem?? a les 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'dem?? a la 1:00',   'tomorrow minus 1 hour');
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
        var tests = 'leden led_??nor ??no_b??ezen b??e_duben dub_kv??ten kv??_??erven ??vn_??ervenec ??vc_srpen srp_z?????? z????_????jen ????j_listopad lis_prosinec pro'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss',  'ned??le, ??nor 14. 2010, 3:25:50'],
                ['ddd, h',                       'ne, 3'],
                ['M Mo MM MMMM MMM',             '2 2. 02 ??nor ??no'],
                ['YYYY YY',                      '2010 10'],
                ['D Do DD',                      '14 14. 14'],
                ['d do dddd ddd dd',             '0 0. ned??le ne ne'],
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
                ['LL',                           '14. ??nor 2010'],
                ['LLL',                          '14. ??nor 2010 15:25'],
                ['LLLL',                         'ned??le 14. ??nor 2010 15:25'],
                ['l',                            '14.2.2010'],
                ['ll',                           '14. ??no 2010'],
                ['lll',                          '14. ??no 2010 15:25'],
                ['llll',                         'ne 14. ??no 2010 15:25']
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
        var expected = 'leden led_??nor ??no_b??ezen b??e_duben dub_kv??ten kv??_??erven ??vn_??ervenec ??vc_srpen srp_z?????? z????_????jen ????j_listopad lis_prosinec pro'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'ned??le ne ne_pond??l?? po po_??ter?? ??t ??t_st??eda st st_??tvrtek ??t ??t_p??tek p?? p??_sobota so so'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'p??r sekund',  '44 seconds = a few seconds');
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
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dn??',         '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dn??',        '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'm??s??c',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'm??s??c',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'm??s??c',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 m??s??ce',    '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 m??s??ce',    '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 m??s??ce',    '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'm??s??c',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 m??s??c??',    '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'rok',           '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 roky',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'rok',           '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 let',         '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'za p??r sekund',  'prefix');
        assert.equal(moment(0).from(30000), 'p??ed p??r sekundami', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'p??ed p??r sekundami',  'now from now should display as in the past');
    });

    test('fromNow (future)', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'za p??r sekund', 'in a few seconds');
        assert.equal(moment().add({m: 1}).fromNow(), 'za minutu', 'in a minute');
        assert.equal(moment().add({m: 3}).fromNow(), 'za 3 minuty', 'in 3 minutes');
        assert.equal(moment().add({m: 10}).fromNow(), 'za 10 minut', 'in 10 minutes');
        assert.equal(moment().add({h: 1}).fromNow(), 'za hodinu', 'in an hour');
        assert.equal(moment().add({h: 3}).fromNow(), 'za 3 hodiny', 'in 3 hours');
        assert.equal(moment().add({h: 10}).fromNow(), 'za 10 hodin', 'in 10 hours');
        assert.equal(moment().add({d: 1}).fromNow(), 'za den', 'in a day');
        assert.equal(moment().add({d: 3}).fromNow(), 'za 3 dny', 'in 3 days');
        assert.equal(moment().add({d: 10}).fromNow(), 'za 10 dn??', 'in 10 days');
        assert.equal(moment().add({M: 1}).fromNow(), 'za m??s??c', 'in a month');
        assert.equal(moment().add({M: 3}).fromNow(), 'za 3 m??s??ce', 'in 3 months');
        assert.equal(moment().add({M: 10}).fromNow(), 'za 10 m??s??c??', 'in 10 months');
        assert.equal(moment().add({y: 1}).fromNow(), 'za rok', 'in a year');
        assert.equal(moment().add({y: 3}).fromNow(), 'za 3 roky', 'in 3 years');
        assert.equal(moment().add({y: 10}).fromNow(), 'za 10 let', 'in 10 years');
    });

    test('fromNow (past)', function (assert) {
        assert.equal(moment().subtract({s: 30}).fromNow(), 'p??ed p??r sekundami', 'a few seconds ago');
        assert.equal(moment().subtract({m: 1}).fromNow(), 'p??ed minutou', 'a minute ago');
        assert.equal(moment().subtract({m: 3}).fromNow(), 'p??ed 3 minutami', '3 minutes ago');
        assert.equal(moment().subtract({m: 10}).fromNow(), 'p??ed 10 minutami', '10 minutes ago');
        assert.equal(moment().subtract({h: 1}).fromNow(), 'p??ed hodinou', 'an hour ago');
        assert.equal(moment().subtract({h: 3}).fromNow(), 'p??ed 3 hodinami', '3 hours ago');
        assert.equal(moment().subtract({h: 10}).fromNow(), 'p??ed 10 hodinami', '10 hours ago');
        assert.equal(moment().subtract({d: 1}).fromNow(), 'p??ed dnem', 'a day ago');
        assert.equal(moment().subtract({d: 3}).fromNow(), 'p??ed 3 dny', '3 days ago');
        assert.equal(moment().subtract({d: 10}).fromNow(), 'p??ed 10 dny', '10 days ago');
        assert.equal(moment().subtract({M: 1}).fromNow(), 'p??ed m??s??cem', 'a month ago');
        assert.equal(moment().subtract({M: 3}).fromNow(), 'p??ed 3 m??s??ci', '3 months ago');
        assert.equal(moment().subtract({M: 10}).fromNow(), 'p??ed 10 m??s??ci', '10 months ago');
        assert.equal(moment().subtract({y: 1}).fromNow(), 'p??ed rokem', 'a year ago');
        assert.equal(moment().subtract({y: 3}).fromNow(), 'p??ed 3 lety', '3 years ago');
        assert.equal(moment().subtract({y: 10}).fromNow(), 'p??ed 10 lety', '10 years ago');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'dnes v 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'dnes v 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'dnes v 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'z??tra v 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'dnes v 1:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'v??era v 2:00',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m, nextDay;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            nextDay = '';
            switch (m.day()) {
            case 0:
                nextDay = 'v ned??li';
                break;
            case 1:
                nextDay = 'v pond??l??';
                break;
            case 2:
                nextDay = 'v ??ter??';
                break;
            case 3:
                nextDay = 've st??edu';
                break;
            case 4:
                nextDay = 've ??tvrtek';
                break;
            case 5:
                nextDay = 'v p??tek';
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
                lastDay = 'minulou ned??li';
                break;
            case 1:
                lastDay = 'minul?? pond??l??';
                break;
            case 2:
                lastDay = 'minul?? ??ter??';
                break;
            case 3:
                lastDay = 'minulou st??edu';
                break;
            case 4:
                lastDay = 'minul?? ??tvrtek';
                break;
            case 5:
                lastDay = 'minul?? p??tek';
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
        assert.equal(moment.duration(-1, 'minutes').humanize(true), 'p??ed minutou', 'a minute ago');
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
        var tests = '???????????? ??????_?????????? ??????_?????? ??????_?????? ??????_?????? ??????_???????????? ??????_?????? ??????_?????????? ??????_???????? ??????_?????? ??????_?????? ??????_???????????? ??????'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '??????????????????????, ?????????? 14-?????? 2010, 3:25:50 pm'],
                ['ddd, hA',                            '??????, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2-?????? 02 ?????????? ??????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-?????? 14'],
                ['d do dddd ddd dd',                   '0 0-?????? ?????????????????????? ?????? ????'],
                ['DDD DDDo DDDD',                      '45 45-?????? 045'],
                ['w wo ww',                            '7 7-?????? 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['?????????? DDDo ????????',                    '?????????? 45-?????? ????????'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14-02-2010'],
                ['LL',                                 '2010 ?????????? ?????????? ???????????? 14-????????'],
                ['LLL',                                '2010 ?????????? ?????????? ???????????? 14-????????, 15:25'],
                ['LLLL',                               '??????????????????????, 2010 ?????????? ?????????? ???????????? 14-????????, 15:25'],
                ['l',                                  '14-2-2010'],
                ['ll',                                 '2010 ?????????? ?????? ???????????? 14-????????'],
                ['lll',                                '2010 ?????????? ?????? ???????????? 14-????????, 15:25'],
                ['llll',                               '??????, 2010 ?????????? ?????? ???????????? 14-????????, 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-??????', '1-??????');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-??????', '2-??????');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-??????', '3-??????');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-??????', '4-??????');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-??????', '5-??????');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-??????', '6-??????');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-??????', '7-??????');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-??????', '8-??????');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-??????', '9-??????');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-??????', '10-??????');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-??????', '11-??????');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-??????', '12-??????');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-??????', '13-??????');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-??????', '14-??????');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-??????', '15-??????');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-??????', '16-??????');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-??????', '17-??????');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-??????', '18-??????');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-??????', '19-??????');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-??????', '20-??????');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-??????', '21-??????');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-??????', '22-??????');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-??????', '23-??????');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-??????', '24-??????');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-??????', '25-??????');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-??????', '26-??????');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-??????', '27-??????');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-??????', '28-??????');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-??????', '29-??????');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-??????', '30-??????');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-??????', '31-??????');
    });

    test('format month', function (assert) {
        var expected = '???????????? ??????_?????????? ??????_?????? ??????_?????? ??????_?????? ??????_???????????? ??????_?????? ??????_?????????? ??????_???????? ??????_?????? ??????_?????? ??????_???????????? ??????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????????????????? ?????? ????_???????????????? ?????? ????_?????????????????? ?????? ????_?????????? ???? ????_?????????????????????? ?????? ????_?????????????? ?????? ????_???????????????? ?????? ????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '??????-???? ??????????????', '44 sekunder = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '?????? ??????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '?????? ??????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ??????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ??????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '?????? ??????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '?????? ??????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ??????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ??????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ??????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '?????? ??????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '?????? ??????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ??????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '?????? ??????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ??????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ??????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '?????? ????????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '?????? ????????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '?????? ????????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '?????? ????????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '?????? ??????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ??????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '?????? ??????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '??????-???? ????????????????????',  'prefix');
        assert.equal(moment(0).from(30000), '??????-???? ?????????????? ????????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '??????-???? ?????????????? ????????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '??????-???? ????????????????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 ????????????', 'in 5 days');
        assert.equal(moment().add({h: 2}).fromNow(), '2 ????????????????', 'in 2 hours, the right suffix!');
        assert.equal(moment().add({y: 3}).fromNow(), '3 ????????????', 'in 3 years, the right suffix!');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);
        assert.equal(moment(a).calendar(),                   '???????? 02:00 ??????????????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '???????? 02:25 ??????????????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '???????? 03:00 ??????????????',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????? 02:00 ??????????????',     'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '???????? 01:00 ??????????????',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '???????? 02:00 ??????????????',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[??????????] dddd LT [??????????????]'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[??????????] dddd LT [??????????????]'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[??????????] dddd LT [??????????????]'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[??????????] dddd LT [??????????????]'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[??????????] dddd LT [??????????????]'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[??????????] dddd LT [??????????????]'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-??????', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-??????', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-??????', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-??????', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-??????', 'Jan  9 2012 should be week 3');
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
        assert.equal(moment(0).from(30000), 'ychydig eiliadau yn ??l', 'suffix');
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
                ['dddd [den] Do MMMM YYYY, h:mm:ss a', 's??ndag den 14. februar 2010, 3:25:50 pm'],
                ['ddd hA',                             's??n 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 februar feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. s??ndag s??n s??'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '6 6. 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[den] DDDo [dag p?? ??ret]',           'den 45. dag p?? ??ret'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14. februar 2010'],
                ['LLL',                                '14. februar 2010 15:25'],
                ['LLLL',                               's??ndag d. 14. februar 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14. feb 2010'],
                ['lll',                                '14. feb 2010 15:25'],
                ['llll',                               's??n d. 14. feb 2010 15:25']
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
        var expected = 's??ndag s??n s??_mandag man ma_tirsdag tir ti_onsdag ons on_torsdag tor to_fredag fre fr_l??rdag l??r l??'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'f?? sekunder', '44 seconds = a few seconds');
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
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'en m??ned',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'en m??ned',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'en m??ned',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 m??neder',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 m??neder',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 m??neder',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'en m??ned',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 m??neder',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'et ??r',       '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ??r',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'et ??r',       '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??r',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'om f?? sekunder',  'prefix');
        assert.equal(moment(0).from(30000), 'f?? sekunder siden', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'f?? sekunder siden',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'om f?? sekunder', 'in a few seconds');
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
        var tests = 'J??nner J??n._Februar Febr._M??rz Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;

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
        var expected = 'J??nner J??n._Februar Febr._M??rz Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
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
        var tests = 'Januar Jan._Februar Febr._M??rz Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
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
        var expected = 'Januar Jan._Februar Febr._M??rz Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split('_'), i;
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
            tests = '???????????????????? ??????_?????????????????????? ??????_?????????????? ??????_???????????????? ??????_?????????? ??????_?????????????? ????????_?????????????? ????????_?????????????????? ??????_?????????????????????? ??????_?????????????????? ??????_?????????????????? ??????_???????????????????? ??????'.split('_');

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
                ['10 ????',   10, true],
                ['10 ????',   22, true],
                ['10 ??.??.', 10, true],
                ['10 ??.??.', 22, true],
                ['10 ??',    10, true],
                ['10 ??',    22, true],
                ['10 ????',   10, true],
                ['10 ????',   22, true],
                ['10 ??.??.', 10, true],
                ['10 ??.??.', 22, true],
                ['10 ??',    10, true],
                ['10 ??',    22, true],
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '??????????????, ?????????????????????? 14?? 2010, 3:25:50 ????'],
                ['dddd, D MMMM YYYY, h:mm:ss a',       '??????????????, 14 ?????????????????????? 2010, 3:25:50 ????'],
                ['ddd, hA',                            '??????, 3????'],
                ['dddd, MMMM YYYY',                    '??????????????, ?????????????????????? 2010'],
                ['M Mo MM MMMM MMM',                   '2 2?? 02 ?????????????????????? ??????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14?? 14'],
                ['d do dddd ddd dd',                   '0 0?? ?????????????? ?????? ????'],
                ['DDD DDDo DDDD',                      '45 45?? 045'],
                ['w wo ww',                            '6 6?? 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '???? ????'],
                ['[the] DDDo [day of the year]',       'the 45?? day of the year'],
                ['LTS',                                '3:25:50 ????'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 ?????????????????????? 2010'],
                ['LLL',                                '14 ?????????????????????? 2010 3:25 ????'],
                ['LLLL',                               '??????????????, 14 ?????????????????????? 2010 3:25 ????'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 ?????? 2010'],
                ['lll',                                '14 ?????? 2010 3:25 ????'],
                ['llll',                               '??????, 14 ?????? 2010 3:25 ????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1??', '1??');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2??', '2??');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3??', '3??');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4??', '4??');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5??', '5??');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6??', '6??');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7??', '7??');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8??', '8??');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9??', '9??');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10??', '10??');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11??', '11??');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12??', '12??');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13??', '13??');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14??', '14??');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15??', '15??');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16??', '16??');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17??', '17??');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18??', '18??');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19??', '19??');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20??', '20??');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21??', '21??');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22??', '22??');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23??', '23??');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24??', '24??');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25??', '25??');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26??', '26??');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27??', '27??');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28??', '28??');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29??', '29??');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30??', '30??');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31??', '31??');
    });

    test('format month', function (assert) {
        var i,
            expected = '???????????????????? ??????_?????????????????????? ??????_?????????????? ??????_???????????????? ??????_?????????? ??????_?????????????? ????????_?????????????? ????????_?????????????????? ??????_?????????????????????? ??????_?????????????????? ??????_?????????????????? ??????_???????????????????? ??????'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var i,
            expected = '?????????????? ?????? ????_?????????????? ?????? ????_?????????? ?????? ????_?????????????? ?????? ????_???????????? ?????? ????_?????????????????? ?????? ????_?????????????? ?????? ????'.split('_');

        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);

        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '???????? ????????????????????????',   '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '?????? ??????????',           '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '?????? ??????????',           '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ??????????',             '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ??????????',            '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '?????? ??????',             '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '?????? ??????',             '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ????????',              '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ????????',              '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ????????',             '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '?????? ????????',            '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '?????? ????????',            '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ??????????',             '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '?????? ????????',            '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ??????????',             '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ??????????',            '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '???????? ??????????',          '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '???????? ??????????',          '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '???????? ??????????',          '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ??????????',             '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ??????????',             '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ??????????',             '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '???????? ??????????',          '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ??????????',             '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '???????? ????????????',         '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ????????????',            '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '???????? ????????????',         '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ????????????',            '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ???????? ????????????????????????',  'prefix');
        assert.equal(moment(0).from(30000), '???????? ???????????????????????? ????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '???????? ???????????????????????? ????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???? ???????? ????????????????????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???? 5 ??????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '???????????? ???????? 2:00 ????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '???????????? ???????? 2:25 ????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '???????????? ???????? 3:00 ????',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????????? ???????? 2:00 ????',      'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '???????????? ?????? 1:00 ????',        'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '???????? ???????? 2:00 ????',       'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [' + (m.hours() % 12 === 1 ? '??????' : '????????') + '] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m, dayString;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            dayString = m.day() === 6 ? '[???? ?????????????????????? ??????????????]' : '[?????? ??????????????????????] dddd';
            assert.equal(m.calendar(),       m.format(dayString + ' [' + (m.hours() % 12 === 1 ? '??????' : '????????') + '] LT'),  'Today - ' + i + ' days current time');
            m.hours(1).minutes(30).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(dayString + ' [??????] LT'),  'Today - ' + i + ' days one o clock');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format(dayString + ' [????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format(dayString + ' [????????] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52??', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'),   '1 01 1??', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1??', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'),   '2 02 2??', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2??', 'Jan 15 2012 should be week 2');
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
        var tests = 'januaro jan_februaro feb_marto mar_aprilo apr_majo maj_junio jun_julio jul_a??gusto a??g_septembro sep_oktobro okt_novembro nov_decembro dec'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Diman??o, februaro 14a 2010, 3:25:50 p.t.m.'],
                ['ddd, hA',                            'Dim, 3P.T.M.'],
                ['M Mo MM MMMM MMM',                   '2 2a 02 februaro feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14a 14'],
                ['d do dddd ddd dd',                   '0 0a Diman??o Dim Di'],
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
                ['LLLL',                               'Diman??o, la 14-an de februaro, 2010 15:25'],
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
        var expected = 'januaro jan_februaro feb_marto mar_aprilo apr_majo maj_junio jun_julio jul_a??gusto a??g_septembro sep_oktobro okt_novembro nov_decembro dec'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Diman??o Dim Di_Lundo Lun Lu_Mardo Mard Ma_Merkredo Merk Me_??a??do ??a?? ??a_Vendredo Ven Ve_Sabato Sab Sa'.split('_'), i;
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
        assert.equal(moment(0).from(30000), 'anta?? sekundoj', 'anta?? prefix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'anta?? sekundoj',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'je sekundoj', 'je sekundoj');
        assert.equal(moment().add({d: 5}).fromNow(), 'je 5 tagoj', 'je 5 tagoj');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'Hodia?? je 02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Hodia?? je 02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Hodia?? je 03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Morga?? je 02:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Hodia?? je 01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Hiera?? je 02:00', 'yesterday at the same time');
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Febrero 14?? 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Dom., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2?? 02 Febrero Feb.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14?? 14'],
                ['d do dddd ddd dd',                   '0 0?? Domingo Dom. Do'],
                ['DDD DDDo DDDD',                      '45 45?? 045'],
                ['w wo ww',                            '6 6?? 06'],
                ['YYYY-MMM-DD',                        '2010-Feb-14'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45?? day of the year'],
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
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1??', '1??');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2??', '2??');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3??', '3??');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4??', '4??');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5??', '5??');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6??', '6??');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7??', '7??');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8??', '8??');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9??', '9??');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10??', '10??');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11??', '11??');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12??', '12??');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13??', '13??');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14??', '14??');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15??', '15??');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16??', '16??');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17??', '17??');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18??', '18??');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19??', '19??');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20??', '20??');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21??', '21??');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22??', '22??');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23??', '23??');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24??', '24??');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25??', '25??');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26??', '26??');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27??', '27??');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28??', '28??');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29??', '29??');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30??', '30??');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31??', '31??');
    });

    test('format month', function (assert) {
        var expected = 'Enero Ene._Febrero Feb._Marzo Mar._Abril Abr._Mayo May._Junio Jun._Julio Jul._Agosto Ago._Septiembre Sep._Octubre Oct._Noviembre Nov._Diciembre Dic.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Domingo Dom. Do_Lunes Lun. Lu_Martes Mar. Ma_Mi??rcoles Mi??. Mi_Jueves Jue. Ju_Viernes Vie. Vi_S??bado S??b. S??'.split('_'), i;
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
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un d??a',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un d??a',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 d??as',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un d??a',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 d??as',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 d??as',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'un mes',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'un mes',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'un mes',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 meses',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 meses',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 meses',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'un mes',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 meses',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'un a??o',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 a??os',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'un a??o',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 a??os',       '5 years = 5 years');
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
        assert.equal(moment().add({d: 5}).fromNow(), 'en 5 d??as', 'en 5 d??as');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                         'hoy a las 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),          'hoy a las 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),           'hoy a las 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),           'ma??ana a las 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'ma??ana a la 1:00',   'tomorrow minus 1 hour');
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
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52??', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1??', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1??', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2??', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2??', 'Jan 15 2012 should be week 2');
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
        var tests = 'jaanuar jaan_veebruar veebr_m??rts m??rts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, H:mm:ss',      'p??hap??ev, 14. veebruar 2010, 15:25:50'],
                ['ddd, h',                           'P, 3'],
                ['M Mo MM MMMM MMM',                 '2 2. 02 veebruar veebr'],
                ['YYYY YY',                          '2010 10'],
                ['D Do DD',                          '14 14. 14'],
                ['d do dddd ddd dd',                 '0 0. p??hap??ev P P'],
                ['DDD DDDo DDDD',                    '45 45. 045'],
                ['w wo ww',                          '6 6. 06'],
                ['h hh',                             '3 03'],
                ['H HH',                             '15 15'],
                ['m mm',                             '25 25'],
                ['s ss',                             '50 50'],
                ['a A',                              'pm PM'],
                ['[aasta] DDDo [p??ev]',              'aasta 45. p??ev'],
                ['LTS',                              '15:25:50'],
                ['L',                                '14.02.2010'],
                ['LL',                               '14. veebruar 2010'],
                ['LLL',                              '14. veebruar 2010 15:25'],
                ['LLLL',                             'p??hap??ev, 14. veebruar 2010 15:25'],
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
        var expected = 'jaanuar jaan_veebruar veebr_m??rts m??rts_aprill apr_mai mai_juuni juuni_juuli juuli_august aug_september sept_oktoober okt_november nov_detsember dets'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'p??hap??ev P P_esmasp??ev E E_teisip??ev T T_kolmap??ev K K_neljap??ev N N_reede R R_laup??ev L L'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'paar sekundit',  '44 seconds = paar sekundit');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??ks minut',      '45 seconds = ??ks minut');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??ks minut',      '89 seconds = ??ks minut');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutit',      '90 seconds = 2 minutit');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutit',     '44 minutes = 44 minutit');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '??ks tund',       '45 minutes = tund aega');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '??ks tund',       '89 minutes = ??ks tund');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 tundi',        '90 minutes = 2 tundi');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 tundi',        '5 hours = 5 tundi');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 tundi',       '21 hours = 21 tundi');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??ks p??ev',       '22 hours = ??ks p??ev');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??ks p??ev',       '35 hours = ??ks p??ev');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 p??eva',        '36 hours = 2 p??eva');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??ks p??ev',       '1 day = ??ks p??ev');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 p??eva',        '5 days = 5 p??eva');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 p??eva',       '25 days = 25 p??eva');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '??ks kuu',        '26 days = ??ks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '??ks kuu',        '30 days = ??ks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '??ks kuu',        '43 days = ??ks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 kuud',         '46 days = 2 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 kuud',         '75 days = 2 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 kuud',         '76 days = 3 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '??ks kuu',        '1 month = ??ks kuu');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 kuud',         '5 months = 5 kuud');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '??ks aasta',      '345 days = ??ks aasta');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 aastat',       '548 days = 2 aastat');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '??ks aasta',      '1 year = ??ks aasta');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 aastat',       '5 years = 5 aastat');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'm??ne sekundi p??rast',  'prefix');
        assert.equal(moment(0).from(30000), 'm??ni sekund tagasi', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'm??ni sekund tagasi',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'm??ne sekundi p??rast', 'in a few seconds');
        assert.equal(moment().subtract({s: 30}).fromNow(), 'm??ni sekund tagasi', 'a few seconds ago');

        assert.equal(moment().add({m: 1}).fromNow(), '??he minuti p??rast', 'in a minute');
        assert.equal(moment().subtract({m: 1}).fromNow(), '??ks minut tagasi', 'a minute ago');

        assert.equal(moment().add({m: 5}).fromNow(), '5 minuti p??rast', 'in 5 minutes');
        assert.equal(moment().subtract({m: 5}).fromNow(), '5 minutit tagasi', '5 minutes ago');

        assert.equal(moment().add({d: 1}).fromNow(), '??he p??eva p??rast', 'in one day');
        assert.equal(moment().subtract({d: 1}).fromNow(), '??ks p??ev tagasi', 'one day ago');

        assert.equal(moment().add({d: 5}).fromNow(), '5 p??eva p??rast', 'in 5 days');
        assert.equal(moment().subtract({d: 5}).fromNow(), '5 p??eva tagasi', '5 days ago');

        assert.equal(moment().add({M: 1}).fromNow(), 'kuu aja p??rast', 'in a month');
        assert.equal(moment().subtract({M: 1}).fromNow(), 'kuu aega tagasi', 'a month ago');

        assert.equal(moment().add({M: 5}).fromNow(), '5 kuu p??rast', 'in 5 months');
        assert.equal(moment().subtract({M: 5}).fromNow(), '5 kuud tagasi', '5 months ago');

        assert.equal(moment().add({y: 1}).fromNow(), '??he aasta p??rast', 'in a year');
        assert.equal(moment().subtract({y: 1}).fromNow(), 'aasta tagasi', 'a year ago');

        assert.equal(moment().add({y: 5}).fromNow(), '5 aasta p??rast', 'in 5 years');
        assert.equal(moment().subtract({y: 5}).fromNow(), '5 aastat tagasi', '5 years ago');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     'T??na, 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'T??na, 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'T??na, 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Homme, 2:00',    'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'T??na, 1:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Eile, 2:00',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('[J??rgmine] dddd LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[J??rgmine] dddd LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[J??rgmine] dddd LT'),  'Today + ' + i + ' days end of day');
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

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 n??dal tagasi');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '1 n??dala p??rast');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 n??dalat tagasi');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '2 n??dala p??rast');
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
        var tests = '????????????_??????????_????????_??????????_????_????????_??????????_??????_??????????????_??????????_????????????_????????????'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '????\u200c?????????? ?????????? ?????? ?????????? ??:????:???? ?????? ???? ??????'],
                ['ddd, hA',                            '????\u200c?????????? ???????? ???? ??????'],
                ['M Mo MM MMMM MMM',                   '?? ???? ???? ?????????? ??????????'],
                ['YYYY YY',                            '???????? ????'],
                ['D Do DD',                            '???? ?????? ????'],
                ['d do dddd ddd dd',                   '?? ???? ????\u200c???????? ????\u200c???????? ??'],
                ['DDD DDDo DDDD',                      '???? ?????? ??????'],
                ['w wo ww',                            '?? ???? ????'],
                ['h hh',                               '?? ????'],
                ['H HH',                               '???? ????'],
                ['m mm',                               '???? ????'],
                ['s ss',                               '???? ????'],
                ['a A',                                '?????? ???? ?????? ?????? ???? ??????'],
                ['DDDo [?????? ??????]',             '?????? ?????? ??????'],
                ['LTS',                                '????:????:????'],
                ['L',                                  '????/????/????????'],
                ['LL',                                 '???? ?????????? ????????'],
                ['LLL',                                '???? ?????????? ???????? ????:????'],
                ['LLLL',                               '????\u200c?????????? ???? ?????????? ???????? ????:????'],
                ['l',                                  '????/??/????????'],
                ['ll',                                 '???? ?????????? ????????'],
                ['lll',                                '???? ?????????? ???????? ????:????'],
                ['llll',                               '????\u200c?????????? ???? ?????????? ???????? ????:????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '????', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '????', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '????', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '????', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '????', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '????', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '????', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '????', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '????', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '??????', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '??????', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '??????', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '??????', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '??????', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '??????', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '??????', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '??????', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '??????', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '??????', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '??????', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '??????', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '??????', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '??????', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '??????', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '??????', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '??????', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '??????', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '??????', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '??????', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '??????', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '??????', '31');
    });

    test('format month', function (assert) {
        var expected = '???????????? ????????????_?????????? ??????????_???????? ????????_?????????? ??????????_???? ????_???????? ????????_?????????? ??????????_?????? ??????_?????????????? ??????????????_?????????? ??????????_???????????? ????????????_???????????? ????????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '????\u200c???????? ????\u200c???????? ??_???????????? ???????????? ??_????\u200c???????? ????\u200c???????? ??_???????????????? ???????????????? ??_??????\u200c???????? ??????\u200c???????? ??_???????? ???????? ??_???????? ???????? ??'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '?????????? ??????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '???? ??????????',       '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '???? ??????????',       '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '?? ??????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '???? ??????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '???? ????????',     '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '???? ????????',     '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '?? ????????',      '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '?? ????????',      '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '???? ????????',     '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '???? ??????',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '???? ??????',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '?? ??????',       '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '???? ??????',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '?? ??????',       '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '???? ??????',      '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '???? ??????',      '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '???? ??????',      '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '???? ??????',      '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '?? ??????',       '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '?? ??????',       '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '?? ??????',       '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '???? ??????',      '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '?? ??????',       '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '???? ??????',      '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '?? ??????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '???? ??????',      '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '?? ??????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ?????????? ??????????', 'prefix');
        assert.equal(moment(0).from(30000), '?????????? ?????????? ??????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????????? ?????????? ??????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???? ?????????? ??????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???? ?? ??????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????? ???????? ????:????', 'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? ???????? ????:????', 'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? ???????? ????:????', 'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????? ???????? ????:????', 'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? ???????? ????:????', 'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????????? ???????? ????:????', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '?? ???? ????', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '?? ???? ????', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '?? ???? ????', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '?? ???? ????', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '?? ???? ????', 'Jan 14 2012 should be week 3');
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
        var tests = 'tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kes??kuu kes??_hein??kuu hein??_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu'.split('_'), i;
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
                ['[vuoden] DDDo [p??iv??]',              'vuoden 45. p??iv??'],
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
        var expected = 'tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kes??kuu kes??_hein??kuu hein??_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu'.split('_'), i;
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
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'p??iv??',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'p??iv??',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  'kaksi p??iv????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'p??iv??',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   'viisi p??iv????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 p??iv????',       '25 days = 25 days');
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
        assert.equal(moment(30000).from(0), 'muutaman sekunnin p????st??',  'prefix');
        assert.equal(moment(0).from(30000), 'muutama sekunti sitten', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'muutama sekunti sitten',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'muutaman sekunnin p????st??', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'viiden p??iv??n p????st??', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     't??n????n klo 02.00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      't??n????n klo 02.25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       't??n????n klo 03.00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'huomenna klo 02.00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  't??n????n klo 01.00',     'Now minus 1 hour');
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
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'yhden viikon p????st??');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  'kaksi viikkoa sitten');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'kaden viikon p????st??');
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
        var tests = 'januar jan_februar feb_mars mar_apr??l apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split('_'), i;
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
                ['[tann] DDDo [dagin ?? ??rinum]',       'tann 45. dagin ?? ??rinum'],
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
        var expected = 'januar jan_februar feb_mars mar_apr??l apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'sunnudagur sun su_m??nadagur m??n m??_t??sdagur t??s t??_mikudagur mik mi_h??sdagur h??s h??_fr??ggjadagur fr?? fr_leygardagur ley le'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'f?? sekund', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ein minutt',    '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ein minutt',    '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minuttir',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minuttir', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ein t??mi',     '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ein t??mi',     '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 t??mar',     '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 t??mar',     '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 t??mar',    '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'ein dagur',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'ein dagur',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dagar',      '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'ein dagur',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dagar',      '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dagar',     '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'ein m??na??i',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'ein m??na??i',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'ein m??na??i',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 m??na??ir',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 m??na??ir',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 m??na??ir',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'ein m??na??i',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 m??na??ir',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'eitt ??r',       '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ??r',        '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'eitt ??r',       '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??r',        '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'um f?? sekund',  'prefix');
        assert.equal(moment(0).from(30000), 'f?? sekund s????ani', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'f?? sekund s????ani',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'um f?? sekund', 'in a few seconds');
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
            tests = 'janvier janv._f??vrier f??vr._mars mars_avril avr._mai mai_juin juin_juillet juil._ao??t ao??t_septembre sept._octobre oct._novembre nov._d??cembre d??c.'.split('_');

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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, f??vrier 14e 2010, 3:25:50 pm'],
                ['ddd, hA',                            'dim., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2e 02 f??vrier f??vr.'],
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
                ['LL',                                 '14 f??vrier 2010'],
                ['LLL',                                '14 f??vrier 2010 15:25'],
                ['LLLL',                               'dimanche 14 f??vrier 2010 15:25'],
                ['l',                                  '2010-2-14'],
                ['ll',                                 '14 f??vr. 2010'],
                ['lll',                                '14 f??vr. 2010 15:25'],
                ['llll',                               'dim. 14 f??vr. 2010 15:25']
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
            expected = 'janvier janv._f??vrier f??vr._mars mars_avril avr._mai mai_juin juin_juillet juil._ao??t ao??t_septembre sept._octobre oct._novembre nov._d??cembre d??c.'.split('_');

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

        assert.equal(moment(a).calendar(),                     'Aujourd\'hui ?? 02:00',    'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Aujourd\'hui ?? 02:25',    'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Aujourd\'hui ?? 03:00',    'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Demain ?? 02:00',         'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Aujourd\'hui ?? 01:00',    'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Hier ?? 02:00',           'yesterday at the same time');
    });

    test('same next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('same last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [dernier ??] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [dernier ??] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [dernier ??] LT'),  'Today - ' + i + ' days end of day');
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
        var tests = 'janvier janv._f??vrier f??vr._mars mars_avril avr._mai mai_juin juin_juillet juil._ao??t ao??t_septembre sept._octobre oct._novembre nov._d??cembre d??c.'.split('_'),
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, f??vrier 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            'dim., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 f??vrier f??vr.'],
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
                ['LL',                                 '14 f??vrier 2010'],
                ['LLL',                                '14 f??vrier 2010 15:25'],
                ['LLLL',                               'dimanche 14 f??vrier 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 f??vr. 2010'],
                ['lll',                                '14 f??vr. 2010 15:25'],
                ['llll',                               'dim. 14 f??vr. 2010 15:25']
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
        var expected = 'janvier janv._f??vrier f??vr._mars mars_avril avr._mai mai_juin juin_juillet juil._ao??t ao??t_septembre sept._octobre oct._novembre nov._d??cembre d??c.'.split('_'), i;
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

        assert.equal(moment(a).calendar(),                     'Aujourd\'hui ?? 02:00',    'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Aujourd\'hui ?? 02:25',    'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Aujourd\'hui ?? 03:00',    'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'Demain ?? 02:00',         'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Aujourd\'hui ?? 01:00',    'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Hier ?? 02:00',           'yesterday at the same time');
    });

    test('same next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [??] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('same last week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [dernier ??] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [dernier ??] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [dernier ??] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'ien min??t',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'ien min??t',      '89 seconds = a minute');
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
            assert.equal(m.calendar(),       m.format('[??fr??ne] dddd [om] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[??fr??ne] dddd [om] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[??fr??ne] dddd [om] LT'),  'Today - ' + i + ' days end of day');
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
        var tests = 'Xaneiro Xan._Febreiro Feb._Marzo Mar._Abril Abr._Maio Mai._Xu??o Xu??._Xullo Xul._Agosto Ago._Setembro Set._Outubro Out._Novembro Nov._Decembro Dec.'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Febreiro 14?? 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Dom., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2?? 02 Febreiro Feb.'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14?? 14'],
                ['d do dddd ddd dd',                   '0 0?? Domingo Dom. Do'],
                ['DDD DDDo DDDD',                      '45 45?? 045'],
                ['w wo ww',                            '7 7?? 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45?? day of the year'],
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
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1??', '1??');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2??', '2??');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3??', '3??');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4??', '4??');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5??', '5??');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6??', '6??');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7??', '7??');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8??', '8??');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9??', '9??');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10??', '10??');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11??', '11??');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12??', '12??');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13??', '13??');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14??', '14??');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15??', '15??');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16??', '16??');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17??', '17??');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18??', '18??');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19??', '19??');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20??', '20??');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21??', '21??');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22??', '22??');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23??', '23??');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24??', '24??');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25??', '25??');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26??', '26??');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27??', '27??');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28??', '28??');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29??', '29??');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30??', '30??');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31??', '31??');
    });

    test('format month', function (assert) {
        var expected = 'Xaneiro Xan._Febreiro Feb._Marzo Mar._Abril Abr._Maio Mai._Xu??o Xu??._Xullo Xul._Agosto Ago._Setembro Set._Outubro Out._Novembro Nov._Decembro Dec.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Domingo Dom. Do_Luns Lun. Lu_Martes Mar. Ma_M??rcores M??r. M??_Xoves Xov. Xo_Venres Ven. Ve_S??bado S??b. S??'.split('_'),
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
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'un d??a',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'un d??a',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 d??as',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'un d??a',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 d??as',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 d??as',       '25 days = 25 days');
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
        assert.equal(moment().add({d: 5}).fromNow(), 'en 5 d??as', 'en 5 d??as');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                         'hoxe ??s 2:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),          'hoxe ??s 2:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),           'hoxe ??s 3:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),           'ma???? ??s 2:00',  'tomorrow at the same time');
        assert.equal(moment(a).add({d: 1, h : -1}).calendar(),   'ma???? ?? 1:00',   'tomorrow minus 1 hour');
        assert.equal(moment(a).subtract({h: 1}).calendar(),      'hoxe ?? 1:00',      'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),      'onte ?? 2:00',    'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? '??s' : 'a') + '] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? '??s' : 'a') + '] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? '??s' : 'a') + '] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? '??s' : 'a') + '] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? '??s' : 'a') + '] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? '??s' : 'a') + '] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1??', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1??', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2??', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2??', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3??', 'Jan  9 2012 should be week 3');
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
        var tests = '?????????? ????????_???????????? ????????_?????? ??????_?????????? ????????_?????? ??????_???????? ????????_???????? ????????_???????????? ????????_???????????? ????????_?????????????? ????????_???????????? ????????_?????????? ????????'.split('_'), i;
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '??????????, ???????????? 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            '????, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 ???????????? ????????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 ?????????? ???? ??'],
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
                ['LL',                                 '14 ?????????????? 2010'],
                ['LLL',                                '14 ?????????????? 2010 15:25'],
                ['LLLL',                               '??????????, 14 ?????????????? 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 ???????? 2010'],
                ['lll',                                '14 ???????? 2010 15:25'],
                ['llll',                               '????, 14 ???????? 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format month', function (assert) {
        var expected = '?????????? ????????_???????????? ????????_?????? ??????_?????????? ????????_?????? ??????_???????? ????????_???????? ????????_???????????? ????????_???????????? ????????_?????????????? ????????_???????????? ????????_?????????? ????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????? ???? ??|?????? ???? ??|?????????? ???? ??|?????????? ???? ??|?????????? ???? ??|???????? ???? ??|?????? ???? ??'.split('|'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '???????? ??????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '??????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '??????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '????????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '????????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '????????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '????????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '????????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '??????????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '??????????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '????????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ????????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '??????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '????????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 3699}), true), '10 ????????',        '345 days = 10 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 7340}), true), '20 ??????',       '548 days = 20 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '??????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???????? ???????? ??????????',  'prefix');
        assert.equal(moment(0).from(30000), '???????? ???????? ??????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '???????? ???????? ??????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???????? ???????? ??????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???????? 5 ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '???????? ????02:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '???????? ????02:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '???????? ????03:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????? ????02:00',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '???????? ????01:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????????? ????02:00', 'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[????????] dddd [???????????? ????????] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[????????] dddd [???????????? ????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[????????] dddd [???????????? ????????] LT'),  'Today - ' + i + ' days end of day');
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
        var tests = '??????????????? ??????._?????????????????? ?????????._??????????????? ???????????????_?????????????????? ???????????????._?????? ??????_????????? ?????????_??????????????? ?????????._??????????????? ??????._????????????????????? ?????????._????????????????????? ???????????????._?????????????????? ??????._????????????????????? ?????????.'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, a h:mm:ss ?????????',  '??????????????????, ?????? ?????????????????? ????????????, ??????????????? ???:??????:?????? ?????????'],
                ['ddd, a h ?????????',                       '?????????, ??????????????? ??? ?????????'],
                ['M Mo MM MMMM MMM',                   '??? ??? ?????? ?????????????????? ?????????.'],
                ['YYYY YY',                            '???????????? ??????'],
                ['D Do DD',                            '?????? ?????? ??????'],
                ['d do dddd ddd dd',                   '??? ??? ?????????????????? ????????? ???'],
                ['DDD DDDo DDDD',                      '?????? ?????? ?????????'],
                ['w wo ww',                            '??? ??? ??????'],
                ['h hh',                               '??? ??????'],
                ['H HH',                               '?????? ??????'],
                ['m mm',                               '?????? ??????'],
                ['s ss',                               '?????? ??????'],
                ['a A',                                '??????????????? ???????????????'],
                ['LTS',                                '??????????????? ???:??????:?????? ?????????'],
                ['L',                                  '??????/??????/????????????'],
                ['LL',                                 '?????? ?????????????????? ????????????'],
                ['LLL',                                '?????? ?????????????????? ????????????, ??????????????? ???:?????? ?????????'],
                ['LLLL',                               '??????????????????, ?????? ?????????????????? ????????????, ??????????????? ???:?????? ?????????'],
                ['l',                                  '??????/???/????????????'],
                ['ll',                                 '?????? ?????????. ????????????'],
                ['lll',                                '?????? ?????????. ????????????, ??????????????? ???:?????? ?????????'],
                ['llll',                               '?????????, ?????? ?????????. ????????????, ??????????????? ???:?????? ?????????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '???', '???');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '??????', '??????');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '??????', '??????');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '??????', '??????');
    });

    test('format month', function (assert) {
        var expected = '??????????????? ??????._?????????????????? ?????????._??????????????? ???????????????_?????????????????? ???????????????._?????? ??????_????????? ?????????_??????????????? ?????????._??????????????? ??????._????????????????????? ?????????._????????????????????? ???????????????._?????????????????? ??????._????????????????????? ?????????.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????????????? ????????? ???_?????????????????? ????????? ??????_????????????????????? ???????????? ??????_?????????????????? ????????? ??????_????????????????????? ???????????? ??????_???????????????????????? ??????????????? ??????_?????????????????? ????????? ???'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '????????? ?????? ????????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '?????? ????????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '?????? ????????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '??? ????????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '?????? ????????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '?????? ????????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '?????? ????????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '??? ????????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '??? ????????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '?????? ????????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '?????? ?????????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '?????? ?????????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '??? ?????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '?????? ?????????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '??? ?????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '?????? ?????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '?????? ???????????????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '?????? ???????????????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '?????? ???????????????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '??? ???????????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '??? ???????????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '??? ???????????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '?????? ???????????????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '??? ???????????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '?????? ????????????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '??? ????????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '?????? ????????????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '??? ????????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '????????? ?????? ???????????? ?????????',  'prefix');
        assert.equal(moment(0).from(30000), '????????? ?????? ???????????? ????????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '????????? ?????? ???????????? ????????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '????????? ?????? ???????????? ?????????', '????????? ?????? ???????????? ?????????');
        assert.equal(moment().add({d: 5}).fromNow(), '??? ????????? ?????????', '??? ????????? ?????????');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????? ????????? ???:?????? ?????????',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????? ????????? ???:?????? ?????????',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 3}).calendar(),       '?????? ???????????? ???:?????? ?????????',     'Now plus 3 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????? ????????? ???:?????? ?????????',  'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????? ????????? ???:?????? ?????????',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????? ????????? ???:?????? ?????????', 'yesterday at the same time');
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
            assert.equal(m.calendar(),       m.format('[???????????????] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[???????????????] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[???????????????] dddd[,] LT'),  'Today - ' + i + ' days end of day');
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
        assert.equal(moment([2011, 2, 23,  2, 30]).format('a'), '?????????', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('a'), '????????????', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('a'), '???????????????', 'during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('a'), '?????????', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('a'), '?????????', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('a'), '?????????', 'night');

        assert.equal(moment([2011, 2, 23,  2, 30]).format('A'), '?????????', 'before dawn');
        assert.equal(moment([2011, 2, 23,  9, 30]).format('A'), '????????????', 'morning');
        assert.equal(moment([2011, 2, 23, 14, 30]).format('A'), '???????????????', ' during day');
        assert.equal(moment([2011, 2, 23, 17, 30]).format('A'), '?????????', 'evening');
        assert.equal(moment([2011, 2, 23, 19, 30]).format('A'), '?????????', 'late evening');
        assert.equal(moment([2011, 2, 23, 21, 20]).format('A'), '?????????', 'night');
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
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '??? ?????? ???', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012, 0,  7]).format('w ww wo'), '??? ?????? ???', 'Jan  7 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'), '??? ?????? ???', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012, 0, 14]).format('w ww wo'), '??? ?????? ???', 'Jan 14 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'), '??? ?????? ???', 'Jan 15 2012 should be week 3');
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
        var tests = 'sije??anj sij._velja??a velj._o??ujak o??u._travanj tra._svibanj svi._lipanj lip._srpanj srp._kolovoz kol._rujan ruj._listopad lis._studeni stu._prosinac pro.'.split('_'), i;
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
                ['dddd, Do MMMM YYYY, h:mm:ss a',      'nedjelja, 14. velja??a 2010, 3:25:50 pm'],
                ['ddd, hA',                            'ned., 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 velja??a velj.'],
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
                ['LL',                                 '14. velja??a 2010'],
                ['LLL',                                '14. velja??a 2010 15:25'],
                ['LLLL',                               'nedjelja, 14. velja??a 2010 15:25'],
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
        var expected = 'sije??anj sij._velja??a velj._o??ujak o??u._travanj tra._svibanj svi._lipanj lip._srpanj srp._kolovoz kol._rujan ruj._listopad lis._studeni stu._prosinac pro.'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'nedjelja ned. ne_ponedjeljak pon. po_utorak uto. ut_srijeda sri. sr_??etvrtak ??et. ??e_petak pet. pe_subota sub. su'.split('_'), i;
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
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'ju??er u 2:00', 'yesterday at the same time');
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
                return '[pro??lu] dddd [u] LT';
            case 6:
                return '[pro??le] [subote] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[pro??li] dddd [u] LT';
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
        var tests = 'janu??r jan_febru??r feb_m??rcius m??rc_??prilis ??pr_m??jus m??j_j??nius j??n_j??lius j??l_augusztus aug_szeptember szept_okt??ber okt_november nov_december dec'.split('_'),
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
                ['dddd, MMMM Do YYYY, HH:mm:ss',      'vas??rnap, febru??r 14. 2010, 15:25:50'],
                ['ddd, HH',                            'vas, 15'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 febru??r feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. vas??rnap vas v'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '7 7. 07'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['[az ??v] DDDo [napja]',               'az ??v 45. napja'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '2010.02.14.'],
                ['LL',                                 '2010. febru??r 14.'],
                ['LLL',                                '2010. febru??r 14. 15:25'],
                ['LLLL',                               '2010. febru??r 14., vas??rnap 15:25'],
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
        var expected = 'janu??r jan_febru??r feb_m??rcius m??rc_??prilis ??pr_m??jus m??j_j??nius j??n_j??lius j??l_augusztus aug_szeptember szept_okt??ber okt_november nov_december dec'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'vas??rnap vas_h??tf?? h??t_kedd kedd_szerda sze_cs??t??rt??k cs??t_p??ntek p??n_szombat szo'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'n??h??ny m??sodperc', '44 m??sodperc = n??h??ny m??sodperc');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'egy perc',         '45 m??sodperc = egy perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'egy perc',         '89 m??sodperc = egy perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 perc',           '90 m??sodperc = 2 perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 perc',          '44 perc = 44 perc');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'egy ??ra',          '45 perc = egy ??ra');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'egy ??ra',          '89 perc = egy ??ra');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ??ra',            '90 perc = 2 ??ra');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ??ra',            '5 ??ra = 5 ??ra');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ??ra',           '21 ??ra = 21 ??ra');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'egy nap',          '22 ??ra = egy nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'egy nap',          '35 ??ra = egy nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 nap',            '36 ??ra = 2 nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'egy nap',          '1 nap = egy nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 nap',            '5 nap = 5 nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 nap',           '25 nap = 25 nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'egy h??nap',        '26 nap = egy h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'egy h??nap',        '30 nap = egy h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'egy h??nap',        '45 nap = egy h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 h??nap',          '46 nap = 2 h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 h??nap',          '75 nap = 2 h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 h??nap',          '76 nap = 3 h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'egy h??nap',        '1 h??nap = egy h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 h??nap',          '5 h??nap = 5 h??nap');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'egy ??v',           '345 nap = egy ??v');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ??v',             '548 nap = 2 ??v');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'egy ??v',           '1 ??v = egy ??v');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??v',             '5 ??v = 5 ??v');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'n??h??ny m??sodperc m??lva',  'prefix');
        assert.equal(moment(0).from(30000), 'n??h??ny m??sodperce', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), 'n??h??ny m??sodperce',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'n??h??ny m??sodperc m??lva', 'n??h??ny m??sodperc m??lva');
        assert.equal(moment().add({d: 5}).fromNow(), '5 nap m??lva', '5 nap m??lva');
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
        var i, m, days = 'vas??rnap_h??tf??n_kedden_szerd??n_cs??t??rt??k??n_p??nteken_szombaton'.split('_');
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
        var i, m, days = 'vas??rnap_h??tf??n_kedden_szerd??n_cs??t??rt??k??n_p??nteken_szombaton'.split('_');

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[m??lt ' + days[m.day()] + '] LT[-kor]'),  'today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[m??lt ' + days[m.day()] + '] LT[-kor]'),  'today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[m??lt ' + days[m.day()] + '] LT[-kor]'),  'today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  'egy h??te');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'egy h??t m??lva');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 hete');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '2 h??t m??lva');
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
        var tests = '?????????????? ??????_?????????????? ??????_???????? ??????_?????????? ??????_?????????? ??????_???????????? ??????_???????????? ??????_?????????????? ??????_?????????????????? ??????_?????????????????? ??????_???????????????? ??????_?????????????????? ??????'.split('_'), i;
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
        assert.equal(moment('11 ???????????? 1989', ['DD MMMM YYYY']).format('DD-MM-YYYY'), '11-05-1989');
    });

    test('format', function (assert) {
        var a = [
                ['dddd, Do MMMM YYYY, HH:mm:ss',       '????????????, 14 ???????????????? 2010, 15:25:50'],
                ['ddd, h A',                           '??????, 3 ??????????????'],
                ['M Mo MM MMMM MMM',                   '2 2 02 ?????????????? ??????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 ???????????? ?????? ??????'],
                ['DDD DDDo DDDD',                      '45 45-???? 045'],
                ['w wo ww',                            '7 7-???? 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '?????????????? ??????????????'],
                ['[??????????] DDDo [??????]',                 '?????????? 45-???? ??????'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 ???????????????? 2010 ??.'],
                ['LLL',                                '14 ???????????????? 2010 ??., 15:25'],
                ['LLLL',                               '????????????, 14 ???????????????? 2010 ??., 15:25'],
                ['l',                                  '14.2.2010'],
                ['ll',                                 '14 ?????? 2010 ??.'],
                ['lll',                                '14 ?????? 2010 ??., 15:25'],
                ['llll',                               '??????, 14 ?????? 2010 ??., 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format meridiem', function (assert) {
        assert.equal(moment([2012, 11, 28, 0, 0]).format('A'), '??????????????', 'night');
        assert.equal(moment([2012, 11, 28, 3, 59]).format('A'), '??????????????', 'night');
        assert.equal(moment([2012, 11, 28, 4, 0]).format('A'), '????????????????', 'morning');
        assert.equal(moment([2012, 11, 28, 11, 59]).format('A'), '????????????????', 'morning');
        assert.equal(moment([2012, 11, 28, 12, 0]).format('A'), '??????????????', 'afternoon');
        assert.equal(moment([2012, 11, 28, 16, 59]).format('A'), '??????????????', 'afternoon');
        assert.equal(moment([2012, 11, 28, 17, 0]).format('A'), '????????????????', 'evening');
        assert.equal(moment([2012, 11, 28, 23, 59]).format('A'), '????????????????', 'evening');
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1-????', '1-????');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2-????', '2-????');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3-????', '3-????');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4-????', '4-????');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5-????', '5-????');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6-????', '6-????');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7-????', '7-????');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8-????', '8-????');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9-????', '9-????');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10-????', '10-????');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11-????', '11-????');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12-????', '12-????');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13-????', '13-????');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14-????', '14-????');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15-????', '15-????');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16-????', '16-????');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17-????', '17-????');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18-????', '18-????');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19-????', '19-????');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20-????', '20-????');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-????', '21-????');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-????', '22-????');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-????', '23-????');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-????', '24-????');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-????', '25-????');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-????', '26-????');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-????', '27-????');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-????', '28-????');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-????', '29-????');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-????', '30-????');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31-????', '31-????');
    });

    test('format month', function (assert) {
        var expected = '?????????????? ??????_?????????????? ??????_???????? ??????_?????????? ??????_?????????? ??????_???????????? ??????_???????????? ??????_?????????????? ??????_?????????????????? ??????_?????????????????? ??????_???????????????? ??????_?????????????????? ??????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format month case', function (assert) {
        var months = {
            'nominative': '??????????????_??????????????_????????_??????????_??????????_????????????_????????????_??????????????_??????????????????_??????????????????_????????????????_??????????????????'.split('_'),
            'accusative': '????????????????_????????????????_??????????_????????????_????????????_??????????????_??????????????_????????????????_????????????????????_????????????????????_??????????????????_????????????????????'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
        }
    });

    test('format month short case', function (assert) {
        var monthsShort = {
            'nominative': '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????'.split('_'),
            'accusative': '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2011, i, 1]).format('D MMM'), '1 ' + monthsShort.accusative[i], '1 ' + monthsShort.accusative[i]);
            assert.equal(moment([2011, i, 1]).format('MMM'), monthsShort.nominative[i], '1 ' + monthsShort.nominative[i]);
        }
    });

    test('format month case with escaped symbols', function (assert) {
        var months = {
            'nominative': '??????????????_??????????????_????????_??????????_??????????_????????????_????????????_??????????????_??????????????????_??????????????????_????????????????_??????????????????'.split('_'),
            'accusative': '????????????????_????????????????_??????????_????????????_????????????_??????????????_??????????????_????????????????_????????????????????_????????????????????_??????????????????_????????????????????'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2013, i, 1]).format('D[] MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMMM[</b>]'), '<i>1</i> <b>' + months.accusative[i] + '</b>', '1 <b>' + months.accusative[i] + '</b>');
            assert.equal(moment([2013, i, 1]).format('D[-???? ??????] MMMM'), '1-???? ?????? ' + months.accusative[i], '1-???? ?????? ' + months.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('D, MMMM'), '1, ' + months.nominative[i], '1, ' + months.nominative[i]);
        }
    });

    test('format month short case with escaped symbols', function (assert) {
        var monthsShort = {
            'nominative': '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????'.split('_'),
            'accusative': '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_??????'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            assert.equal(moment([2013, i, 1]).format('D[] MMM'), '1 ' + monthsShort.accusative[i], '1 ' + monthsShort.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('[<i>]D[</i>] [<b>]MMM[</b>]'), '<i>1</i> <b>' + monthsShort.accusative[i] + '</b>', '1 <b>' + monthsShort.accusative[i] + '</b>');
            assert.equal(moment([2013, i, 1]).format('D[-???? ??????] MMM'), '1-???? ?????? ' + monthsShort.accusative[i], '1-???? ?????? ' + monthsShort.accusative[i]);
            assert.equal(moment([2013, i, 1]).format('D, MMM'), '1, ' + monthsShort.nominative[i], '1, ' + monthsShort.nominative[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '???????????? ?????? ??????_???????????????????? ?????? ??????_?????????????????? ?????? ??????_???????????????????? ?????? ??????_?????????????????? ?????? ??????_???????????? ???????? ????????_?????????? ?????? ??????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '???? ???????? ????????????????',    '44 seconds = seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '????????',   '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '????????',   '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ????????',  '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ????????', '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '??????',    '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '??????',    '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ??????',    '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ??????',    '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ??????',   '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '????',      '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '????',      '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ????',     '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '????',      '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ????',     '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 11}), true),  '11 ????',     '11 days = 11 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 21}), true),  '21 ????',     '21 days = 21 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ????',    '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '????????',    '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '????????',    '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '????????',    '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ????????',   '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ????????',   '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????',   '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '????????',    '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ????????',   '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '????????',     '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ????????',    '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '????????',     '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ????????',    '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ???????? ???????????????? ????????', 'prefix');
        assert.equal(moment(0).from(30000), '???? ???????? ???????????????? ????????', 'suffix');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???? ???????? ???????????????? ????????', 'in seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '5 ???? ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(2).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                     '?????????? 02:00',   'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? 02:25',   'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? 03:00',   'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '???????? 02:00',   'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? 01:00',   'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '???????? 02:00',   'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        function makeFormat(d) {
            return 'dddd [?????? ????????] LT';
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
            return '[??????????] dddd [?????? ????????] LT';
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
        assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-????', 'Dec 26 2011 should be week 1');
        assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-????', 'Jan  1 2012 should be week 1');
        assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-????', 'Jan  2 2012 should be week 2');
        assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-????', 'Jan  8 2012 should be week 2');
        assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-????', 'Jan  9 2012 should be week 3');
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